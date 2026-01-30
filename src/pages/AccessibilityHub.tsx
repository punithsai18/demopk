/**
 * Accessibility Hub Profile Page
 * Matches design from assets/screen1.png
 */

import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import './AccessibilityHub.css';

interface AccessibilityHubProps {
  onNavigateToSettings?: () => void;
  showHeader?: boolean;
}

const AccessibilityHub: React.FC<AccessibilityHubProps> = ({ 
  onNavigateToSettings,
  showHeader = false 
}) => {
  const { preferences } = useAccessibility();
  const [highContrastEnabled, setHighContrastEnabled] = React.useState(false);

  const getFontSizeLabel = () => {
    const sizeMap = { small: '14px', medium: '16px', large: '20px' };
    return `${preferences.fontSize.charAt(0).toUpperCase() + preferences.fontSize.slice(1)} (${sizeMap[preferences.fontSize]})`;
  };

  const getThemeLabel = () => {
    return preferences.theme.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleNavigateToAccessibility = () => {
    if (onNavigateToSettings) {
      onNavigateToSettings();
    }
  };

  return (
    <div className="accessibility-hub">
      {/* Header - only show if showHeader is true */}
      {showHeader && (
        <header className="hub-header">
          <div className="hub-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 10L16 16L28 10L16 4Z" fill="#2563EB"/>
              <path d="M4 16L16 22L28 16" stroke="#2563EB" strokeWidth="2" fill="none"/>
              <path d="M4 22L16 28L28 22" stroke="#2563EB" strokeWidth="2" fill="none"/>
            </svg>
            <span className="hub-title">Accessibility Hub</span>
          </div>
          <div className="hub-actions">
            <button className="btn-logout">Logout</button>
            <div className="user-avatar-small">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23DBEAFE'/%3E%3Cpath d='M20 12a4 4 0 110 8 4 4 0 010-8zM12 28a8 8 0 0116 0' fill='%232563EB'/%3E%3C/svg%3E" alt="User" />
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="hub-content">
        {/* Profile Card */}
        <section className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23CBD5E1'/%3E%3Cpath d='M40 25a8 8 0 110 16 8 8 0 010-16zM24 55a16 16 0 0132 0' fill='%23475569'/%3E%3C/svg%3E" alt="Alex Johnson" />
            </div>
            <div className="profile-info">
              <h1 className="profile-name">Alex Johnson</h1>
              <p className="profile-email">alex.j@example.com</p>
              <p className="profile-member">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#2563EB">
                  <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 11a5 5 0 110-10 5 5 0 010 10z"/>
                  <path d="M8 4a.5.5 0 01.5.5v3.793l2.146 2.147a.5.5 0 01-.707.707l-2.5-2.5A.5.5 0 017 8V4.5A.5.5 0 018 4z"/>
                </svg>
                Member since Jan 2023
              </p>
            </div>
          </div>
          <button className="btn-edit-profile">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.146.854a.5.5 0 01.708 0l2.292 2.292a.5.5 0 010 .708l-9 9a.5.5 0 01-.168.11l-5 2a.5.5 0 01-.65-.65l2-5a.5.5 0 01.11-.168l9-9zM11.207 2L2 11.207V13h1.793L13 3.793 11.207 2z"/>
            </svg>
            Edit Profile
          </button>
        </section>

        {/* Preferences Summary */}
        <h2 className="section-heading">Preferences Summary</h2>

        {/* Account Info */}
        <section className="info-card">
          <div className="info-header">
            <h3 className="info-title">Account Info</h3>
            <button className="info-icon-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#2563EB">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
              </svg>
            </button>
          </div>
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon email-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#2563EB">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div className="info-details">
                <span className="info-label">EMAIL</span>
                <span className="info-value">alex.j@example.com</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon role-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#2563EB">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
              </div>
              <div className="info-details">
                <span className="info-label">ROLE</span>
                <span className="info-value">Administrator</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon security-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#2563EB">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
                </svg>
              </div>
              <div className="info-details">
                <span className="info-label">SECURITY</span>
                <span className="info-value">Two-Factor Enabled</span>
              </div>
            </div>
          </div>
        </section>

        {/* Active Accessibility */}
        <section className="info-card">
          <div className="info-header">
            <h3 className="info-title">Active Accessibility</h3>
            <span className="customized-badge">Customized</span>
          </div>
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon accessibility-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#2563EB">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5a1 1 0 012 0v4a1 1 0 01-2 0zm1 6a1 1 0 100-2 1 1 0 000 2z"/>
                </svg>
              </div>
              <div className="info-details">
                <span className="info-label">FONT SIZE</span>
                <span className="info-value">{getFontSizeLabel()}</span>
              </div>
              <span className="default-badge">DEFAULT</span>
            </div>
            <div className="info-item">
              <div className="info-icon theme-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#2563EB">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
              </div>
              <div className="info-details">
                <span className="info-label">COLOR THEME</span>
                <span className="info-value">{getThemeLabel()}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon speed-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="#2563EB">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                </svg>
              </div>
              <div className="info-details">
                <span className="info-label">AUDIO SPEED</span>
                <span className="info-value">{preferences.audioSpeed}x Playback</span>
              </div>
              <span className="custom-badge">CUSTOM</span>
            </div>
          </div>
        </section>

        {/* Quick Settings */}
        <div className="quick-settings">
          <div className="quick-setting-card">
            <div className="quick-setting-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563EB">
                <path d="M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z"/>
              </svg>
            </div>
            <div className="quick-setting-info">
              <h4 className="quick-setting-title">High Contrast Mode</h4>
              <p className="quick-setting-desc">Boost visibility of UI elements</p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={highContrastEnabled}
                onChange={(e) => setHighContrastEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="quick-setting-card clickable" onClick={handleNavigateToAccessibility}>
            <div className="quick-setting-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563EB">
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zM9 9V5a1 1 0 012 0v4a1 1 0 01-2 0zm1 6a1 1 0 100-2 1 1 0 000 2z"/>
              </svg>
            </div>
            <div className="quick-setting-info">
              <h4 className="quick-setting-title">All Settings</h4>
              <p className="quick-setting-desc">Fine-tune your experience</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#6B7280">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
            </svg>
          </div>
        </div>

        {/* Manage Button */}
        <button className="btn-manage" onClick={handleNavigateToAccessibility}>
          Manage All Accessibility Settings
        </button>

        {/* Footer Note */}
        <p className="footer-note">
          These settings are saved to your profile and will follow you across devices.
        </p>
      </main>
    </div>
  );
};

export default AccessibilityHub;
