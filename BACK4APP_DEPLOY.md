# Back4app Deployment Guide

## Quick Deployment Steps

### 1. Connect Your GitHub Repository

Since you've already created an app in Back4app, follow these steps:

1. **In Back4app Dashboard:**
   - Go to your app settings
   - Look for "Container" or "Deployment" section
   - Click "Connect to GitHub" or "Deploy from GitHub"

2. **Authorize GitHub:**
   - Allow Back4app to access your GitHub repositories
   - Select the repository containing your discovery-server code
   - Choose the `main` or `master` branch

### 2. Configure Build Settings

Back4app will automatically detect the `Dockerfile` in your project. Make sure these settings are configured:

- **Build Method**: Dockerfile
- **Dockerfile Path**: `./Dockerfile` (default)
- **Port**: `3000`
- **Health Check Path**: `/` (optional but recommended)

### 3. Environment Variables (Optional)

If needed, you can set environment variables:
- `PORT`: 3000 (usually auto-detected)
- `NODE_ENV`: production

### 4. Deploy

- Click "Deploy" or "Create Container"
- Back4app will:
  - Pull your code from GitHub
  - Build the Docker image using your Dockerfile
  - Deploy the container
  - Provide you with a public URL

### 5. Get Your URL

After deployment completes (usually 2-5 minutes):
- You'll see a URL like: `https://your-app-name.back4app.io`
- Or it might be: `https://your-app-name-xxxxx.back4app.app`

### 6. Test Your Deployment

Open PowerShell and test:

```powershell
# Test HTTP endpoint
curl https://YOUR-BACK4APP-URL

# Should return:
# {
#   "service": "Cession Discovery Server",
#   "status": "online",
#   "peers": 0,
#   "version": "1.0.0"
# }
```

### 7. Test WebSocket

Open your browser console and test WebSocket:

```javascript
const ws = new WebSocket('wss://YOUR-BACK4APP-URL');
ws.onopen = () => console.log('✅ WebSocket Connected!');
ws.onerror = (e) => console.error('❌ Error:', e);
```

## Alternative: Manual Upload

If GitHub connection doesn't work, you can deploy manually:

1. Create a ZIP file of your discovery-server folder (excluding node_modules and .git)
2. In Back4app, choose "Upload ZIP" option
3. Upload the ZIP file
4. Back4app will build and deploy

## Next Steps

Once deployed, you'll need to:

1. **Copy your Back4app URL** (e.g., `https://your-app.back4app.io`)

2. **Update your Cession backend** with the new URLs:
   - HTTP URL: `https://your-app.back4app.io`
   - WebSocket URL: `wss://your-app.back4app.io`

Let me know your Back4app URL once deployment is complete, and I'll help you update the backend configuration!

## Troubleshooting

**If deployment fails:**
- Check the build logs in Back4app dashboard
- Ensure Dockerfile is in the root directory
- Verify package.json has all dependencies listed

**If WebSocket doesn't work:**
- Back4app should support WebSockets by default
- Make sure you're using `wss://` (not `ws://`)
- Don't specify a port number in the WebSocket URL
