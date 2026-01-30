import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LandingPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || `${window.location.origin}/api`;

const LandingPage = () => {
  const [profile, setProfile] = useState({
    name: 'Viswambhar Tulasi',
    subtitle: 'Student | SRM University',
    phone: '+91 9876543210',
    whatsapp: '+91 9876543210',
    instagram: '',
    profilePhoto: '/uploads/default-profile.png',
    socialLinks: []
  });
  const [loading, setLoading] = useState(true);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

  useEffect(() => {
    fetchProfile();
    // Poll for updates every 5 seconds to keep data real-time
    const interval = setInterval(fetchProfile, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchProfile = async () => {
    try {
      const [profileRes, linksRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/profile`),
        axios.get(`${API_BASE_URL}/links`)
      ]);
      
      setProfile({
        ...profileRes.data,
        socialLinks: linksRes.data.links || []
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLongPressStart = (e) => {
    const timer = setTimeout(() => {
      window.location.href = '/admin';
    }, 2000); // 2 second long press
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handlePhoneClick = () => {
    setShowPhoneOptions(!showPhoneOptions);
  };

  const handleCall = () => {
    window.location.href = `tel:${profile.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi ${profile.name.split(' ')[0]}!`);
    window.open(`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleInstagram = () => {
    if (profile.instagram) {
      window.open(profile.instagram, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <div className="container">
        {/* Profile Section */}
        <div className="profile-section">
          <div
            className="profile-photo-container"
            onTouchStart={handleLongPressStart}
            onTouchEnd={handleLongPressEnd}
            onMouseDown={handleLongPressStart}
            onMouseUp={handleLongPressEnd}
            onMouseLeave={handleLongPressEnd}
          >
            <img
              src={profile.profilePhoto && profile.profilePhoto.startsWith('http') 
                ? profile.profilePhoto 
                : `${API_BASE_URL.replace('/api', '')}${profile.profilePhoto || '/uploads/default-profile.png'}`}
              alt={profile.name}
              className="profile-photo"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150/667eea/ffffff?text=' + profile.name.charAt(0).toUpperCase();
              }}
            />
          </div>
          
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-subtitle">{profile.subtitle}</p>
        </div>

        {/* Contact Buttons */}
        <div className="contact-section">
          {/* Phone Button */}
          <div className="phone-container">
            <button className="contact-btn phone-btn" onClick={handlePhoneClick}>
              <i className="fas fa-phone"></i>
              <span>{profile.phone}</span>
            </button>
            
            {showPhoneOptions && (
              <div className="phone-options">
                <button className="option-btn" onClick={handleCall}>
                  <i className="fas fa-phone"></i>
                  <span>Call</span>
                </button>
                <button className="option-btn" onClick={handleWhatsApp}>
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp</span>
                </button>
              </div>
            )}
          </div>

          {/* Instagram Button */}
          {profile.instagram && (
            <button className="contact-btn instagram-btn" onClick={handleInstagram}>
              <i className="fab fa-instagram"></i>
              <span>Instagram</span>
            </button>
          )}
        </div>

        {/* Social Links */}
        {profile.socialLinks.length > 0 && (
          <div className="social-links-section">
            <h2 className="section-title">Connect</h2>
            <div className="social-links-grid">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-btn"
                >
                  <i className={link.icon || 'fas fa-link'}></i>
                  <span>{link.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
