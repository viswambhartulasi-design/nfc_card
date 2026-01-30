const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const db = require('../utils/database');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// Get public profile
router.get('/', (req, res) => {
  try {
    const data = db.getData();
    res.json({
      name: data.name,
      subtitle: data.subtitle,
      phone: data.phone,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      profilePhoto: data.profilePhoto
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update profile (admin only)
router.put('/', upload.single('profilePhoto'), (req, res) => {
  try {
    const data = db.getData();
    const { name, subtitle, phone, whatsapp, instagram } = req.body;

    // Update fields
    if (name !== undefined) data.name = name;
    if (subtitle !== undefined) data.subtitle = subtitle;
    if (phone !== undefined) data.phone = phone;
    if (whatsapp !== undefined) data.whatsapp = whatsapp;
    if (instagram !== undefined) data.instagram = instagram;

    // Handle profile photo upload
    if (req.file) {
      // Delete old photo if exists
      if (data.profilePhoto && data.profilePhoto.startsWith('/uploads/')) {
        const oldPhotoPath = path.join(__dirname, '..', data.profilePhoto);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      data.profilePhoto = `/uploads/${req.file.filename}`;
    }

    db.saveData(data);
    res.json({ success: true, profile: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
