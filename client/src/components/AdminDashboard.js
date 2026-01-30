import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || `${window.location.origin}/api`;

const AdminDashboard = () => {
  const [profile, setProfile] = useState({
    name: '',
    subtitle: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    profilePhoto: ''
  });
  const [socialLinks, setSocialLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: '', url: '', icon: '' });
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, linksRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/profile`),
        axios.get(`${API_BASE_URL}/links`)
      ]);
      
      setProfile(profileRes.data);
      setSocialLinks(linksRes.data.links || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (key !== 'profilePhoto') {
          formData.append(key, profile[key]);
        }
      });
      if (profilePhotoFile) {
        formData.append('profilePhoto', profilePhotoFile);
      }

      await axios.put(`${API_BASE_URL}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Profile updated successfully!');
      fetchData();
      setProfilePhotoFile(null);
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAddLink = async () => {
    if (!newLink.platform || !newLink.url) {
      alert('Platform and URL are required');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/links`, newLink);
      setNewLink({ platform: '', url: '', icon: '' });
      fetchData();
    } catch (error) {
      alert('Error adding link');
    }
  };

  const handleDeleteLink = async (id) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/links/${id}`);
      fetchData();
    } catch (error) {
      alert('Error deleting link');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-content">
        {/* Profile Section */}
        <section className="admin-section">
          <h2>Profile Information</h2>
          
          <div className="form-group">
            <label>Profile Photo</label>
            <div className="photo-preview">
              <img
                src={profile.profilePhoto && profile.profilePhoto.startsWith('http') 
                  ? profile.profilePhoto 
                  : `${API_BASE_URL.replace('/api', '')}${profile.profilePhoto || '/uploads/default-profile.png'}`}
                alt="Profile"
                className="preview-img"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/120/667eea/ffffff?text=' + (profile.name.charAt(0) || 'P');
                }}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhotoFile(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={profile.subtitle}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>WhatsApp Number</label>
            <input
              type="tel"
              name="whatsapp"
              value={profile.whatsapp}
              onChange={handleProfileChange}
            />
          </div>

          <div className="form-group">
            <label>Instagram URL</label>
            <input
              type="url"
              name="instagram"
              value={profile.instagram}
              onChange={handleProfileChange}
            />
          </div>

          <button
            onClick={handleSaveProfile}
            className="save-btn"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </section>

        {/* Social Links Section */}
        <section className="admin-section">
          <h2>Social Links</h2>

          <div className="add-link-form">
            <input
              type="text"
              placeholder="Platform (e.g., LinkedIn, GitHub)"
              value={newLink.platform}
              onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
            />
            <input
              type="url"
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            />
            <input
              type="text"
              placeholder="Icon class (optional, e.g., fab fa-linkedin)"
              value={newLink.icon}
              onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
            />
            <button onClick={handleAddLink} className="add-btn">Add Link</button>
          </div>

          <div className="links-list">
            {socialLinks.map((link) => (
              <div key={link.id} className="link-item">
                <div className="link-info">
                  <strong>{link.platform}</strong>
                  <span className="link-url">{link.url}</span>
                </div>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
            {socialLinks.length === 0 && (
              <p className="no-links">No social links added yet.</p>
            )}
          </div>
        </section>

        <div className="preview-link">
          <a href="/" target="_blank" rel="noopener noreferrer">
            View Live Card →
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
