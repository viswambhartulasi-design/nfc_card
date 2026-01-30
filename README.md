# NFC Digital Business Card

A modern, premium, production-ready NFC Digital Business Card website with admin dashboard for easy management.

## 🚀 Features

- **Beautiful Landing Page**: Modern, responsive design with smooth animations
- **Contact Actions**: Direct call and WhatsApp messaging
- **Dynamic Social Links**: Add/remove social media and portfolio links
- **Hidden Admin Access**: Long press on profile photo to access admin dashboard
- **Admin Dashboard**: Full CRUD operations for profile and links
- **NFC Optimized**: Fast loading, SEO-friendly, mobile-first design
- **Production Ready**: Clean code structure, ready for deployment

## 📋 Tech Stack

- **Frontend**: React 18, CSS3 (Modern)
- **Backend**: Node.js + Express
- **Database**: JSON file (easily migratable to MongoDB)
- **Authentication**: JWT-based admin authentication

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Dependencies

```bash
# Install root dependencies (backend)
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

Or use the convenience script:

```bash
npm run install-all
```

### Step 2: Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and update the values:

```
PORT=5000
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

**⚠️ Important**: Change the `JWT_SECRET` and admin credentials before deploying to production!

### Step 3: Create Default Profile Image

Create a default profile image at `server/uploads/default-profile.png` (or update the path in `server/utils/database.js`).

### Step 4: Run the Application

#### Development Mode (with hot reload)

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

#### Production Mode

```bash
# Build the React app
npm run build

# Start the server
npm start
```

The app will be available at `http://localhost:5000`

## 📱 Usage

### Public Access

1. Open the website in your browser
2. View the beautiful landing page with your profile
3. Tap phone number to call or message via WhatsApp
4. Tap Instagram button to open Instagram profile
5. Tap social links to visit external profiles

### Admin Access

**Method 1: Long Press on Profile Photo**
- Long press (hold for 2 seconds) on the profile photo on the landing page
- You'll be redirected to `/admin`

**Method 2: Direct URL**
- Navigate to `http://localhost:3000/admin` (or your domain/admin)
- Login with your admin credentials

### Admin Dashboard Features

- **Edit Profile**:
  - Update name, subtitle, phone, WhatsApp, Instagram
  - Upload new profile photo
  - Changes reflect instantly on the main page

- **Manage Social Links**:
  - Add new links (LinkedIn, GitHub, Portfolio, etc.)
  - Delete existing links
  - Each link appears as a button on the landing page

## 📁 Project Structure

```
nfc-digital-business-card/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.js
│   │   │   ├── LandingPage.css
│   │   │   ├── AdminDashboard.js
│   │   │   └── AdminDashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── routes/
│   │   ├── auth.js
│   │   ├── profile.js
│   │   └── links.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── database.js
│   ├── uploads/            # Profile photos storage
│   ├── data/
│   │   └── database.json   # JSON database
│   └── index.js
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Backend Deployment**:
   - Install Vercel CLI: `npm i -g vercel`
   - In root directory: `vercel`
   - Set environment variables in Vercel dashboard

2. **Frontend Deployment**:
   - Update `REACT_APP_API_URL` in client build
   - Deploy client folder to Vercel

### Netlify

1. Build the React app: `npm run build`
2. Deploy `client/build` folder to Netlify
3. Deploy backend separately or use Netlify Functions

### Render

1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables

### Environment Variables for Production

Make sure to set these in your hosting platform:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-strong-secret-key-here
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-strong-password
REACT_APP_API_URL=https://your-backend-url.com/api
```

## 🔒 Security Notes

- Change default admin credentials before production
- Use a strong JWT_SECRET (at least 32 characters)
- Consider rate limiting for API endpoints (already included)
- Add HTTPS in production
- Consider migrating to MongoDB for better security

## 🎨 Customization

### Colors & Theme

Edit CSS variables in `client/src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #8b5cf6;
  /* ... */
}
```

### Gradient Background

Edit the gradient in `client/src/components/LandingPage.css`:

```css
.landing-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 📊 Database Schema

The JSON database structure:

```json
{
  "name": "Viswambhar Tulasi",
  "subtitle": "Student | SRM University",
  "phone": "+91 9876543210",
  "whatsapp": "+91 9876543210",
  "instagram": "https://instagram.com/yourusername",
  "profilePhoto": "/uploads/profile-1234567890.jpg",
  "socialLinks": [
    {
      "id": "1234567890",
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/username",
      "icon": "fab fa-linkedin"
    }
  ]
}
```

## 🔄 Migrating to MongoDB

To migrate from JSON to MongoDB:

1. Install mongoose: `npm install mongoose`
2. Create MongoDB connection in `server/utils/database.js`
3. Replace file operations with MongoDB queries
4. Update routes to use async/await with MongoDB

## 📝 API Endpoints

### Public Endpoints

- `GET /api/profile` - Get public profile data
- `GET /api/links` - Get all social links

### Admin Endpoints (Require Authentication)

- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify admin token
- `PUT /api/profile` - Update profile
- `POST /api/links` - Add social link
- `PUT /api/links/:id` - Update social link
- `DELETE /api/links/:id` - Delete social link

## 🐛 Troubleshooting

### Port Already in Use

Change the port in `.env` file or kill the process using the port.

### Image Upload Issues

Ensure `server/uploads/` directory exists and has write permissions.

### CORS Errors

Make sure `REACT_APP_API_URL` matches your backend URL.

## 📄 License

MIT License - feel free to use this project for your own business card!

## 👤 Author

Viswambhar Tulasi - Student at SRM University

---

**Built with ❤️ for modern digital networking**
