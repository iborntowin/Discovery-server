const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store for registered peers
// Structure: { peerId: { name, email, publicKey, lastSeen, ws } }
const peers = new Map();

// Cleanup offline peers every 60 seconds
setInterval(() => {
    const now = Date.now();
    const timeout = 90000; // 90 seconds

    for (const [peerId, peer] of peers.entries()) {
        if (now - peer.lastSeen > timeout) {
            console.log(`Removing offline peer: ${peer.name} (${peerId})`);
            peers.delete(peerId);
            broadcastPeerList();
        }
    }
}, 60000);

// REST API Endpoints

// Health check
app.get('/', (req, res) => {
    res.json({
        service: 'Cession Discovery Server',
        status: 'online',
        peers: peers.size,
        version: '1.0.0'
    });
});

// Register a peer
app.post('/register', (req, res) => {
    const { peerId, name, email, publicKey } = req.body;

    if (!peerId || !name) {
        return res.status(400).json({ error: 'peerId and name are required' });
    }

    const peer = {
        peerId,
        name,
        email: email || 'unknown',
        publicKey: publicKey || '',
        lastSeen: Date.now(),
        ws: null
    };

    peers.set(peerId, peer);
    console.log(`Peer registered: ${name} (${peerId})`);

    // Broadcast updated peer list to all connected clients
    broadcastPeerList();

    res.json({ success: true, peerId });
});

// Heartbeat - keep peer alive
app.post('/heartbeat', (req, res) => {
    const { peerId } = req.body;

    if (!peerId) {
        return res.status(400).json({ error: 'peerId is required' });
    }

    const peer = peers.get(peerId);
    if (peer) {
        peer.lastSeen = Date.now();
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Peer not found' });
    }
});

// Get list of all online peers
app.get('/peers', (req, res) => {
    const peerList = Array.from(peers.values()).map(peer => ({
        peerId: peer.peerId,
        name: peer.name,
        email: peer.email,
        publicKey: peer.publicKey,
        online: true,
        lastSeen: new Date(peer.lastSeen).toISOString()
    }));

    res.json(peerList);
});

// Get specific peer info
app.get('/peers/:peerId', (req, res) => {
    const { peerId } = req.params;
    const peer = peers.get(peerId);

    if (peer) {
        res.json({
            peerId: peer.peerId,
            name: peer.name,
            email: peer.email,
            publicKey: peer.publicKey,
            online: true,
            lastSeen: new Date(peer.lastSeen).toISOString()
        });
    } else {
        res.status(404).json({ error: 'Peer not found' });
    }
});

// Unregister a peer
app.delete('/peers/:peerId', (req, res) => {
    const { peerId } = req.params;

    if (peers.delete(peerId)) {
        console.log(`Peer unregistered: ${peerId}`);
        broadcastPeerList();
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Peer not found' });
    }
});

// Signal connection request between peers
app.post('/signal', (req, res) => {
    const { fromPeerId, toPeerId, signal } = req.body;

    const toPeer = peers.get(toPeerId);

    if (!toPeer) {
        return res.status(404).json({ error: 'Target peer not found' });
    }

    // If target peer has WebSocket, send signal
    if (toPeer.ws && toPeer.ws.readyState === WebSocket.OPEN) {
        toPeer.ws.send(JSON.stringify({
            type: 'signal',
            fromPeerId,
            signal
        }));
        res.json({ success: true });
    } else {
        res.status(503).json({ error: 'Target peer not connected via WebSocket' });
    }
});

// Start HTTP server
const server = app.listen(PORT, () => {
    console.log(`🚀 Cession Discovery Server running on port ${PORT}`);
    console.log(`📡 WebSocket server ready`);
});

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');

    let peerId = null;

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            switch (data.type) {
                case 'register':
                    peerId = data.peerId;
                    const peer = peers.get(peerId);
                    if (peer) {
                        peer.ws = ws;
                        peer.lastSeen = Date.now();
                        console.log(`WebSocket registered for peer: ${peer.name}`);

                        // Send current peer list
                        ws.send(JSON.stringify({
                            type: 'peers',
                            peers: Array.from(peers.values()).map(p => ({
                                peerId: p.peerId,
                                name: p.name,
                                email: p.email,
                                publicKey: p.publicKey,
                                online: true
                            }))
                        }));
                    }
                    break;

                case 'heartbeat':
                    if (peerId) {
                        const peer = peers.get(peerId);
                        if (peer) {
                            peer.lastSeen = Date.now();
                        }
                    }
                    break;

                case 'signal':
                    // Forward signal to target peer
                    const targetPeer = peers.get(data.toPeerId);
                    if (targetPeer && targetPeer.ws && targetPeer.ws.readyState === WebSocket.OPEN) {
                        targetPeer.ws.send(JSON.stringify({
                            type: 'signal',
                            fromPeerId: peerId,
                            signal: data.signal
                        }));
                    }
                    break;
            }
        } catch (error) {
            console.error('WebSocket message error:', error);
        }
    });

    ws.on('close', () => {
        if (peerId) {
            const peer = peers.get(peerId);
            if (peer) {
                peer.ws = null;
                console.log(`WebSocket closed for peer: ${peer.name}`);
            }
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

// Broadcast peer list to all connected WebSocket clients
function broadcastPeerList() {
    const peerList = Array.from(peers.values()).map(peer => ({
        peerId: peer.peerId,
        name: peer.name,
        email: peer.email,
        publicKey: peer.publicKey,
        online: true
    }));

    const message = JSON.stringify({
        type: 'peers',
        peers: peerList
    });

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
