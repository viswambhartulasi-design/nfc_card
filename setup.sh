#!/bin/bash

echo "🚀 Setting up NFC Digital Business Card..."

# Install root dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install client dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your credentials!"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p server/uploads
mkdir -p server/data

# Create default database if it doesn't exist
if [ ! -f server/data/database.json ]; then
    echo "📄 Creating default database..."
    echo '{
  "name": "Viswambhar Tulasi",
  "subtitle": "Student | SRM University",
  "phone": "+91 9876543210",
  "whatsapp": "+91 9876543210",
  "instagram": "https://instagram.com/yourusername",
  "profilePhoto": "/uploads/default-profile.png",
  "socialLinks": []
}' > server/data/database.json
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your credentials"
echo "2. Add a default profile image to server/uploads/default-profile.png (optional)"
echo "3. Run 'npm run dev' to start development server"
echo ""
