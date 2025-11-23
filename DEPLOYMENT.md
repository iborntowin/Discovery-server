# Deploy Discovery Server Without GitHub

## Option A: Render.com (Recommended - Free)

### Step 1: Prepare Files
1. Open terminal in `discovery-server/` folder
2. Run: `npm install` (to create node_modules)

### Step 2: Deploy to Render
1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Choose "Build and deploy from a Git repository"
4. Click "Public Git repository" at the bottom
5. Enter this URL: `https://github.com/YOUR-USERNAME/cession-discovery` (we'll create this)

**OR use Render's CLI:**

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy from local folder
cd discovery-server
render deploy
```

---

## Option B: Railway.app (Also Free)

### Using Railway CLI:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd discovery-server
railway init

# Deploy
railway up
```

### Using Railway Dashboard:
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Empty Project"
4. Click "Deploy from GitHub repo"
5. You can create a separate public repo just for discovery-server

---

## Option C: Heroku (Free Tier)

```bash
# Install Heroku CLI
# Download from: https://devcli.heroku.com/

# Login
heroku login

# Create app
cd discovery-server
heroku create cession-discovery

# Deploy
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a cession-discovery
git push heroku master
```

---

## Option D: Create Public Repo for Discovery Server Only

The discovery server contains **NO sensitive information**:
- ✅ No passwords
- ✅ No API keys
- ✅ No business logic
- ✅ No database credentials
- ✅ Just a simple relay server

**Safe to make public!**

### Steps:
1. Create new repo on GitHub: `cession-discovery-server` (public)
2. Copy these files:
   ```
   discovery-server/
   ├── package.json
   ├── server.js
   ├── README.md
   └── .gitignore
   ```
3. Push to GitHub
4. Deploy to Render/Railway from that repo

---

## Recommended Approach

**I recommend Option D** - Create a separate public repo for the discovery server:

1. It's the simplest
2. Free hosting works best with GitHub
3. The server code is safe to share
4. Easy to update and redeploy

Would you like me to:
1. Help you create a separate public repo?
2. Provide a deployment script for Railway/Render CLI?
3. Create a Docker container for easy deployment?

Let me know which option you prefer!
