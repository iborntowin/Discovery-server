# Backend Configuration Update

## ✅ Discovery Server Deployed Successfully!

**Your Back4app URL:** `https://discoveryserver-do3cactb.b4a.run`

---

## 📝 Update Your Backend Configuration

### Step 1: Update application.properties

Navigate to your backend configuration file:
```
C:\Projects\Cession-App\backend\src\main\resources\application.properties
```

Find and update these lines:

```properties
# Discovery Server Configuration
discovery.server.url=https://discoveryserver-do3cactb.b4a.run
discovery.server.ws-url=wss://discoveryserver-do3cactb.b4a.run
```

**Important Notes:**
- Use `https://` for the HTTP URL
- Use `wss://` for the WebSocket URL
- **Do NOT include port numbers** (Back4app handles this automatically)
- **Do NOT add trailing slashes**

### Step 2: Rebuild Your Backend

Open PowerShell and run:

```powershell
cd C:\Projects\Cession-App\backend
mvn clean package -DskipTests
```

### Step 3: Copy the JAR (if using your copy script)

```powershell
cd C:\Projects\Cession-App
.\copy-backend-jar.ps1
```

### Step 4: Restart Your Application

Restart your Cession app to use the new discovery server!

---

## 🧪 Test the Connection

After restarting your app:

1. **Open your Cession app**
2. **Go to SSH Connection section**
3. **Check if peers are discovered**
4. **Try connecting to a peer**

---

## ⚠️ About the Temporary URL

Back4app shows the URL as "temporary for 60 minutes" on the free plan, but this is just for the initial testing period. To get a permanent URL:

**Option 1: Upgrade to Permanent URL (Free)**
- In Back4app dashboard, click "Upgrade for a Permanent URL"
- You may be able to get a permanent subdomain without payment

**Option 2: Keep Using This URL**
- The URL should remain stable even on the free tier
- Monitor it and let me know if it changes

**Option 3: Use Custom Domain (Requires Upgrade)**
- You can add your own domain if you upgrade

---

## 📊 Monitoring Your Deployment

In Back4app dashboard, you can:
- **Logs**: View real-time server logs
- **Metrics**: Monitor CPU and RAM usage
- **Deployments**: See deployment history

---

## 🔧 If You Need to Redeploy

1. Push changes to your GitHub repository
2. Back4app will auto-deploy on push (if enabled)
3. Or manually trigger deployment in Back4app dashboard

---

## Next Steps

1. ✅ Update `application.properties` with the URLs above
2. ✅ Rebuild your backend
3. ✅ Test peer discovery in your app
4. ✅ Consider upgrading to permanent URL if needed

Let me know if you need help with any of these steps!
