# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies

```bash
npm run install-all
```

Or manually:
```bash
npm install
cd client && npm install && cd ..
```

### Step 2: Configure Environment

Copy `.env.example` to `.env` and update credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
JWT_SECRET=your-secret-key-change-this
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Step 3: Run the App

**Development Mode:**
```bash
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

**Production Mode:**
```bash
npm run build
npm start
```

## 📱 Using the App

### Public View
- Open http://localhost:3000
- View your digital business card
- Tap phone for call/WhatsApp options
- Tap Instagram to open profile
- Tap social links to visit profiles

### Admin Access

**Method 1:** Long press profile photo (2 seconds)
**Method 2:** Visit http://localhost:3000/admin

Login with credentials from `.env` file.

### Admin Features
- Edit profile information
- Upload profile photo
- Add/remove social links
- All changes reflect instantly

## 🎨 Customization

1. **Colors:** Edit `client/src/index.css` CSS variables
2. **Content:** Use admin dashboard or edit `server/data/database.json`
3. **Profile Photo:** Add image to `server/uploads/` or use admin dashboard

## 🐛 Troubleshooting

**Port in use?** Change PORT in `.env`

**Images not loading?** Ensure `server/uploads/` directory exists

**CORS errors?** Check `REACT_APP_API_URL` matches backend URL

## 📚 Full Documentation

See `README.md` for complete documentation.
