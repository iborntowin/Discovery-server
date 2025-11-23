# Cession Discovery Server

A lightweight discovery server for Cession-App peer-to-peer connections.

## Features

- Peer registration and discovery
- Real-time updates via WebSocket
- Heartbeat mechanism to track online peers
- Signal relay for connection establishment
- Auto-cleanup of offline peers

## Deployment

### Free Hosting on Render.com

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect this repository
4. Configure:
   - **Name**: cession-discovery
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click "Create Web Service"
6. Copy the URL (e.g., `https://cession-discovery.onrender.com`)

### Alternative: Railway.app

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this repository
4. Railway auto-detects Node.js
5. Deploy and copy the URL

## API Endpoints

### POST /register
Register a new peer
```json
{
  "peerId": "uuid",
  "name": "My PC",
  "email": "user@example.com",
  "publicKey": "ssh-rsa AAAA..."
}
```

### POST /heartbeat
Keep peer alive
```json
{
  "peerId": "uuid"
}
```

### GET /peers
Get list of all online peers

### GET /peers/:peerId
Get specific peer info

### DELETE /peers/:peerId
Unregister a peer

### POST /signal
Signal connection request between peers
```json
{
  "fromPeerId": "uuid1",
  "toPeerId": "uuid2",
  "signal": { ... }
}
```

## WebSocket

Connect to `ws://server-url` for real-time peer updates.

**Messages:**
- `register`: Register WebSocket for a peer
- `heartbeat`: Keep connection alive
- `signal`: Forward signal to another peer
- `peers`: Receive updated peer list

## Local Development

```bash
npm install
npm run dev
```

Server runs on http://localhost:3000

## Environment Variables

- `PORT`: Server port (default: 3000)

## License

MIT
