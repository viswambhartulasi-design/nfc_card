# Deployment Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```

## Deployment Options

### Option 1: Vercel (Recommended)

#### Backend Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. In root directory: `vercel`
3. Set environment variables in Vercel dashboard
4. Update `REACT_APP_API_URL` in client

#### Frontend Deployment
1. Update `.env` in client: `REACT_APP_API_URL=https://your-backend.vercel.app/api`
2. Build: `cd client && npm run build`
3. Deploy `client/build` to Vercel or use Vercel's automatic deployment

### Option 2: Render

1. Create new Web Service
2. Connect GitHub repository
3. Build command: `npm run build`
4. Start command: `npm start`
5. Add environment variables

### Option 3: Heroku

1. Create `Procfile`:
   ```
   web: node server/index.js
   ```
2. Deploy: `git push heroku main`
3. Set environment variables in Heroku dashboard

## Environment Variables

Set these in your hosting platform:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-strong-secret-key-min-32-chars
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-strong-password
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Important Notes

- Change default admin credentials before production
- Use strong JWT_SECRET (32+ characters)
- Enable HTTPS in production
- Consider MongoDB for production database
