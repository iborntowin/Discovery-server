# VPS Configuration Update

## ✅ Discovery Server Running on VPS!

Your server is active on Port 80.

**Your URLs are:**
- HTTP: `http://YOUR_VPS_IP`
- WebSocket: `ws://YOUR_VPS_IP`

*(Replace `YOUR_VPS_IP` with your actual IP, e.g., `192.168.1.1`)*

---

## 📝 Update Your Backend Configuration

### Step 1: Update application.properties

Navigate to:
```
C:\Projects\Cession-App\backend\src\main\resources\application.properties
```

Find and update these lines:

```properties
# Discovery Server Configuration
discovery.server.url=http://YOUR_VPS_IP
discovery.server.ws-url=ws://YOUR_VPS_IP
```

**Important:**
- Use `http://` (NOT https)
- Use `ws://` (NOT wss)
- No port number needed (since it's on port 80)

### Step 2: Rebuild Your Backend

Open PowerShell and run:

```powershell
cd C:\Projects\Cession-App\backend
mvn clean package -DskipTests
```

### Step 3: Copy the JAR

```powershell
cd C:\Projects\Cession-App
.\copy-backend-jar.ps1
```

### Step 4: Restart Your Application

Restart your Cession app to use the new VPS discovery server!

---

## 🧪 Test the Connection

1. **Open your browser** and go to `http://YOUR_VPS_IP`
   - You should see: `{"service":"Cession Discovery Server","status":"online",...}`

2. **Open your Cession app**
   - Go to SSH Connection section
   - Check if it connects without errors

---

## ⚠️ Important Note on "Mixed Content"

Since you are using `http://` (insecure) and not `https://`:

- If your frontend app is running on `http://localhost:xxxx`, it **will work**.
- If your frontend app is deployed on `https://vercel.com` or similar, it **might fail** because secure sites (HTTPS) often block insecure (HTTP) requests.
- **Solution if that happens:** You would need a domain + SSL (HTTPS) eventually. But for local testing/development, this is perfect!
