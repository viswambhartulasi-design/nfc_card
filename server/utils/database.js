const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/database.json');
const DATA_DIR = path.dirname(DATA_FILE);

// Initialize database with default data
const defaultData = {
  name: 'Viswambhar Tulasi',
  subtitle: 'Student | SRM University',
  phone: '+91 9876543210',
  whatsapp: '+91 9876543210',
  instagram: 'https://instagram.com/yourusername',
  profilePhoto: '/uploads/default-profile.png',
  socialLinks: []
};

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize database file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
}

function getData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return defaultData;
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving database:', error);
    throw error;
  }
}

module.exports = {
  getData,
  saveData
};
