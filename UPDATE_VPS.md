# 🔄 Update Your VPS Server

To see the new dashboard with connected devices, you need to update the code on your VPS.

Run these commands on your VPS:

```bash
# 1. Stop the current container
docker stop discovery
docker rm discovery

# 2. Pull the latest changes (if you pushed to git)
# OR if you edited files locally, you might need to re-copy them or git pull
cd ~/Discovery-server
git pull

# 3. Rebuild the image
docker build -t discovery-server .

# 4. Run it again
docker run -d --restart always -p 80:3000 --name discovery discovery-server
```

## 📊 How to View Connected Devices

1. Open your browser
2. Go to: `http://YOUR_VPS_IP`
3. You will now see a **Dashboard** listing all connected devices!

## 📝 View Logs

To see the raw logs in the terminal:

```bash
docker logs -f discovery
```
