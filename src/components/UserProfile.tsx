/**
 * User Profile Component
 * Displays user preferences and allows navigation to settings
 */

import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import './UserProfile.css';

interface UserProfileProps {
  onNavigateToSettings?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onNavigateToSettings }) => {
  const { preferences } = useAccessibility();

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <div className="profile-info">
          <h2>User Profile</h2>
          <p>Manage your accessibility preferences</p>
        </div>
      </div>

      <div className="profile-preferences card">
        <h3>Current Preferences</h3>
        <div className="preference-list">
          <div className="preference-item">
            <span className="preference-icon">🎨</span>
            <div className="preference-details">
              <span className="preference-name">Theme</span>
              <span className="preference-value">{preferences.theme}</span>
            </div>
          </div>
          <div className="preference-item">
            <span className="preference-icon">📝</span>
            <div className="preference-details">
              <span className="preference-name">Font Size</span>
              <span className="preference-value">{preferences.fontSize}</span>
            </div>
          </div>
          <div className="preference-item">
            <span className="preference-icon">🔊</span>
            <div className="preference-details">
              <span className="preference-name">Audio Speed</span>
              <span className="preference-value">{preferences.audioSpeed}x</span>
            </div>
          </div>
          <div className="preference-item">
            <span className="preference-icon">⚡</span>
            <div className="preference-details">
              <span className="preference-name">Contrast Mode</span>
              <span className="preference-value">
                {preferences.contrastMode ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {onNavigateToSettings && (
        <button className="button settings-button" onClick={onNavigateToSettings}>
          ⚙️ Go to Accessibility Settings
        </button>
      )}
    </div>
  );
};

export default UserProfile;
