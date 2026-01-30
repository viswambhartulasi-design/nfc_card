# 🚀 How to Start the Server

## Issue Detected
There appears to be a system-level permission restriction preventing port binding in this environment. Follow these steps to start the server manually.

## Option 1: Start Manually (Recommended)

### Terminal 1 - Backend Server
```bash
cd "/Users/tulasiviswambhar/Desktop/PROJECT NFC"
PORT=5002 node server/index.js
```

You should see:
```
✅ Server running on http://localhost:5002
✅ API available at http://localhost:5002/api
```

### Terminal 2 - Frontend (React App)
```bash
cd "/Users/tulasiviswambhar/Desktop/PROJECT NFC/client"
PORT=3000 BROWSER=none npm start
```

The React app will start on http://localhost:3000

## Option 2: Use npm scripts

### Start both servers together:
```bash
cd "/Users/tulasiviswambhar/Desktop/PROJECT NFC"
npm run dev
```

## Option 3: If Port 5000 is Available

If port 5000 becomes available, update `.env`:
```
PORT=5000
```

Then start:
```bash
npm run dev
```

## Troubleshooting Permission Issues

If you see `EPERM: operation not permitted` errors:

1. **Check macOS Security Settings:**
   - System Settings → Privacy & Security
   - Ensure Terminal/Cursor has necessary permissions

2. **Check for Port Conflicts:**
   ```bash
   lsof -i :5000
   lsof -i :5002
   lsof -i :3000
   ```

3. **Try Different Ports:**
   - Update `.env` with a different PORT (e.g., 5002, 8000, 8080)
   - Update `client/src/components/LandingPage.js` API_BASE_URL if needed

4. **Run Outside Sandbox:**
   - Open Terminal.app directly
   - Navigate to project directory
   - Run commands manually

## Verify Server is Running

Test the backend:
```bash
curl http://localhost:5002/api/profile
```

You should see JSON response with profile data.

## Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5002/api
- **Admin Dashboard:** http://localhost:3000/admin

## Default Admin Credentials

Check your `.env` file for:
- Username: (from ADMIN_USERNAME)
- Password: (from ADMIN_PASSWORD)

---

**Note:** The code is syntactically correct and ready to run. The permission issue is environmental and should resolve when running in a standard terminal environment.
