# Deploying to Your Dedicated VPS

This guide will help you deploy the discovery server to your VPS using Docker. This is the most reliable method.

## Prerequisites

- **VPS IP Address** (e.g., `192.168.1.1`)
- **SSH Access** (Username usually `root`)
- **Git** installed on VPS (usually pre-installed)

---

## Step 1: Connect to Your VPS

Open PowerShell or Terminal on your computer:

```powershell
ssh root@YOUR_VPS_IP
# Enter password when prompted
```

## Step 2: Install Docker (One-Command Setup)

Run this command on your VPS to install Docker automatically:

```bash
curl -fsSL https://get.docker.com | sh
```

## Step 3: Deploy the Discovery Server

Run these commands on your VPS one by one:

1.  **Clone your repository** (Replace with your actual repo URL):
    ```bash
    git clone https://github.com/iborntowin/Discovery-server.git
    cd Discovery-server
    ```

2.  **Build the Docker Image**:
    ```bash
    docker build -t discovery-server .
    ```

3.  **Run the Container**:
    *   **Option A: Run on Port 80 (Standard HTTP)** - *Recommended for IP access*
        ```bash
        docker run -d --restart always -p 80:3000 --name discovery discovery-server
        ```
        *URL will be:* `http://YOUR_VPS_IP`

    *   **Option B: Run on Port 3000 (Custom Port)**
        ```bash
        docker run -d --restart always -p 3000:3000 --name discovery discovery-server
        ```
        *URL will be:* `http://YOUR_VPS_IP:3000`

## Step 4: Check if it's running

```bash
docker ps
# You should see your container listed
```

## Step 5: Important - HTTPS/SSL (Read Carefully)

Since you are using a raw IP address, you will have **HTTP (ws://)**, not **HTTPS (wss://)**.

- **If your main app is running on localhost:** This is fine.
- **If your main app is on HTTPS (e.g., Vercel/Netlify):** You **MUST** have HTTPS on your VPS too, or the browser will block the connection ("Mixed Content Error").

### How to get HTTPS on VPS?
You need a **Domain Name** (e.g., `api.yourdomain.com`) pointing to your VPS IP.
1.  Buy a domain (Namecheap, GoDaddy, etc.).
2.  Point an "A Record" to your VPS IP.
3.  Use Nginx + Certbot (Let's Encrypt) on the VPS to get free SSL.

---

## Step 6: Update Your Backend Configuration

Once deployed, update your `application.properties` locally:

**If you used Option A (Port 80):**
```properties
discovery.server.url=http://YOUR_VPS_IP
discovery.server.ws-url=ws://YOUR_VPS_IP
```

**If you used Option B (Port 3000):**
```properties
discovery.server.url=http://YOUR_VPS_IP:3000
discovery.server.ws-url=ws://YOUR_VPS_IP:3000
```

*Note: Use `ws://` instead of `wss://` unless you set up a domain with SSL.*
