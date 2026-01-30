const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../utils/database');

// Get all social links
router.get('/', (req, res) => {
  try {
    const data = db.getData();
    res.json({ links: data.socialLinks || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add new social link (admin only)
router.post('/', (req, res) => {
  try {
    const { platform, url, icon } = req.body;
    
    if (!platform || !url) {
      return res.status(400).json({ success: false, message: 'Platform and URL are required' });
    }

    const data = db.getData();
    if (!data.socialLinks) {
      data.socialLinks = [];
    }

    const newLink = {
      id: Date.now().toString(),
      platform,
      url,
      icon: icon || getDefaultIcon(platform)
    };

    data.socialLinks.push(newLink);
    db.saveData(data);

    res.json({ success: true, link: newLink });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update social link (admin only)
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { platform, url, icon } = req.body;

    const data = db.getData();
    if (!data.socialLinks) {
      return res.status(404).json({ success: false, message: 'Link not found' });
    }

    const linkIndex = data.socialLinks.findIndex(link => link.id === id);
    if (linkIndex === -1) {
      return res.status(404).json({ success: false, message: 'Link not found' });
    }

    if (platform) data.socialLinks[linkIndex].platform = platform;
    if (url) data.socialLinks[linkIndex].url = url;
    if (icon) data.socialLinks[linkIndex].icon = icon;

    db.saveData(data);
    res.json({ success: true, link: data.socialLinks[linkIndex] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete social link (admin only)
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = db.getData();

    if (!data.socialLinks) {
      return res.status(404).json({ success: false, message: 'Link not found' });
    }

    data.socialLinks = data.socialLinks.filter(link => link.id !== id);
    db.saveData(data);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Helper function to get default icon based on platform
function getDefaultIcon(platform) {
  const iconMap = {
    linkedin: 'fab fa-linkedin',
    github: 'fab fa-github',
    twitter: 'fab fa-twitter',
    portfolio: 'fas fa-briefcase',
    website: 'fas fa-globe',
    youtube: 'fab fa-youtube',
    facebook: 'fab fa-facebook'
  };
  return iconMap[platform.toLowerCase()] || 'fas fa-link';
}

module.exports = router;
