/**
 * FlexiDesk Accessibility Settings Page
 * Matches design from assets/screen.png
 */

import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import type { ThemeMode, FontSize, AudioSpeed } from '../types/accessibility';
import './FlexiDeskSettings.css';

const FlexiDeskSettings: React.FC = () => {
  const {
    preferences,
    updateTheme,
    updateFontSize,
    updateAudioSpeed,
    saveCurrentPreferences,
    resetToDefaults,
  } = useAccessibility();

  const [activeNav, setActiveNav] = React.useState('accessibility');

  const handleSave = () => {
    saveCurrentPreferences();
    alert('Preferences saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default settings?')) {
      resetToDefaults();
    }
  };

  const getFontSizePosition = (): number => {
    const sizeMap = { small: 0, medium: 33.33, large: 66.66 };
    return sizeMap[preferences.fontSize];
  };

  return (
    <div className="flexidesk-container">
      {/* Header */}
      <header className="flexidesk-header">
        <div className="flexidesk-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#2563EB"/>
            <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" fill="white"/>
          </svg>
          <span className="logo-text">FlexiDesk</span>
        </div>
        <div className="header-icons">
          <button className="icon-btn" aria-label="Settings">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Help">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/>
            </svg>
          </button>
          <button className="icon-btn" aria-label="User Profile">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="flexidesk-main">
        {/* Sidebar */}
        <aside className="flexidesk-sidebar">
          <div className="user-card">
            <div className="user-avatar">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23E5E7EB'/%3E%3Cpath d='M32 20a6 6 0 110 12 6 6 0 010-12zM20 44a12 12 0 0124 0' fill='%236B7280'/%3E%3C/svg%3E" alt="User Avatar" />
            </div>
            <div className="user-info">
              <h3 className="user-name">John Doe</h3>
              <p className="user-plan">Free Plan</p>
            </div>
          </div>

          <nav className="sidebar-nav" role="tablist" aria-label="Settings navigation">
            <button 
              className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveNav('profile')}
              role="tab"
              aria-selected={activeNav === 'profile'}
              id="profile-tab"
              aria-controls="profile-panel"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
              </svg>
              <span>Profile</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'accessibility' ? 'active' : ''}`}
              onClick={() => setActiveNav('accessibility')}
              role="tab"
              aria-selected={activeNav === 'accessibility'}
              id="accessibility-tab"
              aria-controls="accessibility-panel"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5a1 1 0 012 0v4a1 1 0 01-2 0zm1 6a1 1 0 100-2 1 1 0 000 2z"/>
              </svg>
              <span>Accessibility</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'security' ? 'active' : ''}`}
              onClick={() => setActiveNav('security')}
              role="tab"
              aria-selected={activeNav === 'security'}
              id="security-tab"
              aria-controls="security-panel"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
              <span>Security</span>
            </button>
            <button 
              className={`nav-item ${activeNav === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveNav('notifications')}
              role="tab"
              aria-selected={activeNav === 'notifications'}
              id="notifications-tab"
              aria-controls="notifications-panel"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <span>Notifications</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flexidesk-content" role="tabpanel" id={`${activeNav}-panel`} aria-labelledby={`${activeNav}-tab`}>
          {activeNav === 'profile' && (
            <>
              <div className="content-header">
                <h1 className="content-title">Profile Settings</h1>
                <p className="content-subtitle">Manage your personal information and account details.</p>
              </div>
              <section className="preferences-section">
                <h2 className="section-title">Profile Information</h2>
                <p>Profile settings content coming soon...</p>
              </section>
            </>
          )}

          {activeNav === 'accessibility' && (
            <>
              <div className="content-header">
                <h1 className="content-title">Accessibility Settings</h1>
                <p className="content-subtitle">Customize your visual and audio experience for better usability.</p>
              </div>

              {/* Visual Preferences */}
              <section className="preferences-section">
            <h2 className="section-title">Visual Preferences</h2>

            {/* Color Theme */}
            <div className="preference-group">
              <label className="preference-label">COLOR THEME</label>
              <div className="theme-cards">
                <button
                  className={`theme-card ${preferences.theme === 'light' ? 'selected' : ''}`}
                  onClick={() => updateTheme('light')}
                >
                  <div className="theme-preview light-preview"></div>
                  <span className="theme-name">Light Mode</span>
                  {preferences.theme === 'light' && (
                    <span className="theme-radio selected"></span>
                  )}
                  {preferences.theme !== 'light' && (
                    <span className="theme-radio"></span>
                  )}
                </button>
                <button
                  className={`theme-card ${preferences.theme === 'dark' ? 'selected' : ''}`}
                  onClick={() => updateTheme('dark')}
                >
                  <div className="theme-preview dark-preview"></div>
                  <span className="theme-name">Dark Mode</span>
                  {preferences.theme === 'dark' && (
                    <span className="theme-radio selected"></span>
                  )}
                  {preferences.theme !== 'dark' && (
                    <span className="theme-radio"></span>
                  )}
                </button>
                <button
                  className={`theme-card ${preferences.theme === 'high-contrast' ? 'selected' : ''}`}
                  onClick={() => updateTheme('high-contrast')}
                >
                  <div className="theme-preview contrast-preview">
                    <span className="contrast-text">CONTRAST</span>
                  </div>
                  <span className="theme-name">High Contrast</span>
                  {preferences.theme === 'high-contrast' && (
                    <span className="theme-radio selected"></span>
                  )}
                  {preferences.theme !== 'high-contrast' && (
                    <span className="theme-radio"></span>
                  )}
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div className="preference-group">
              <label className="preference-label">FONT SIZE</label>
              <div className="font-size-control">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="33.33"
                  value={getFontSizePosition()}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (val < 20) updateFontSize('small');
                    else if (val < 50) updateFontSize('medium');
                    else updateFontSize('large');
                  }}
                  className="font-slider"
                />
                <div className="font-labels">
                  <span className={preferences.fontSize === 'small' ? 'active' : ''}>Small</span>
                  <span className={preferences.fontSize === 'medium' ? 'active' : ''}>Medium</span>
                  <span className={preferences.fontSize === 'large' ? 'active' : ''}>Large</span>
                  <span>Extra Large</span>
                </div>
              </div>

              {/* Live Preview */}
              <div className="live-preview">
                <span className="preview-label">LIVE PREVIEW</span>
                <p className="preview-text">
                  The quick brown fox jumps over the lazy dog. <strong>Typography check</strong> for optimal reading experience.
                </p>
              </div>
            </div>
          </section>

          {/* Audio Preferences */}
          <section className="preferences-section">
            <h2 className="section-title">Audio Preferences</h2>

            <div className="preference-group">
              <label className="preference-label">PLAYBACK SPEED</label>
              <div className="speed-buttons">
                <button
                  className={`speed-btn ${preferences.audioSpeed === 0.75 ? 'selected' : ''}`}
                  onClick={() => updateAudioSpeed(0.75)}
                >
                  0.75x
                </button>
                <button
                  className={`speed-btn ${preferences.audioSpeed === 1.0 ? 'selected' : ''}`}
                  onClick={() => updateAudioSpeed(1.0)}
                >
                  1x
                </button>
                <button
                  className={`speed-btn ${preferences.audioSpeed === 1.25 ? 'selected' : ''}`}
                  onClick={() => updateAudioSpeed(1.25)}
                >
                  1.25x
                </button>
                <button
                  className={`speed-btn ${preferences.audioSpeed === 1.5 ? 'selected' : ''}`}
                  onClick={() => updateAudioSpeed(1.5)}
                >
                  1.5x
                </button>
              </div>
              <p className="speed-description">Adjust how fast screen readers and audio prompts are played back.</p>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-reset" onClick={handleReset}>
              Reset to Default
            </button>
            <button className="btn-save" onClick={handleSave}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z"/>
              </svg>
              Save Preferences
            </button>
          </div>
            </>
          )}

          {activeNav === 'security' && (
            <>
              <div className="content-header">
                <h1 className="content-title">Security Settings</h1>
                <p className="content-subtitle">Manage your account security and privacy preferences.</p>
              </div>
              <section className="preferences-section">
                <h2 className="section-title">Security Options</h2>
                <p>Security settings content coming soon...</p>
              </section>
            </>
          )}

          {activeNav === 'notifications' && (
            <>
              <div className="content-header">
                <h1 className="content-title">Notification Settings</h1>
                <p className="content-subtitle">Configure how you receive updates and alerts.</p>
              </div>
              <section className="preferences-section">
                <h2 className="section-title">Notification Preferences</h2>
                <p>Notification settings content coming soon...</p>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default FlexiDeskSettings;
