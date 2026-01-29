/**
 * Accessibility Settings Page
 * Main hub for all accessibility controls
 */

import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import type { ThemeMode, FontSize, AudioSpeed } from '../types/accessibility';
import './AccessibilitySettings.css';

const AccessibilitySettings: React.FC = () => {
  const {
    preferences,
    updateTheme,
    updateFontSize,
    updateAudioSpeed,
    updateContrastMode,
    saveCurrentPreferences,
    resetToDefaults,
  } = useAccessibility();

  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);

  const handleSave = () => {
    saveCurrentPreferences();
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all accessibility settings to defaults?')) {
      resetToDefaults();
      setShowResetMessage(true);
      setTimeout(() => setShowResetMessage(false), 3000);
    }
  };

  const themeOptions: { value: ThemeMode; label: string }[] = [
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'high-contrast', label: 'High Contrast Mode' },
  ];

  const fontSizeOptions: { value: FontSize; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const audioSpeedOptions: AudioSpeed[] = [0.75, 1.0, 1.25, 1.5];

  return (
    <div className="accessibility-settings">
      <header className="settings-header">
        <h1>Accessibility Settings</h1>
        <p>Customize your experience with visual and audio preferences</p>
      </header>

      {/* Theme Selection */}
      <section className="settings-section card">
        <h2>Theme Selection</h2>
        <p className="section-description">
          Choose a theme that works best for your visual needs
        </p>
        <div className="theme-options">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              className={`theme-button ${preferences.theme === option.value ? 'active' : ''}`}
              onClick={() => updateTheme(option.value)}
              aria-pressed={preferences.theme === option.value}
            >
              <span className="theme-icon">{getThemeIcon(option.value)}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Font Size Controls */}
      <section className="settings-section card">
        <h2>Font Size</h2>
        <p className="section-description">
          Adjust text size for better readability
        </p>
        <div className="font-size-controls">
          {fontSizeOptions.map((option) => (
            <button
              key={option.value}
              className={`font-button ${preferences.fontSize === option.value ? 'active' : ''}`}
              onClick={() => updateFontSize(option.value)}
              aria-pressed={preferences.fontSize === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="preview-text">
          <p className="preview-sample">
            Preview: The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </section>

      {/* Audio Speed Controls */}
      <section className="settings-section card">
        <h2>Audio Speed</h2>
        <p className="section-description">
          Control playback speed for audio content
        </p>
        <div className="audio-speed-controls">
          {audioSpeedOptions.map((speed) => (
            <button
              key={speed}
              className={`speed-button ${preferences.audioSpeed === speed ? 'active' : ''}`}
              onClick={() => updateAudioSpeed(speed)}
              aria-pressed={preferences.audioSpeed === speed}
            >
              {speed}x
            </button>
          ))}
        </div>
        <div className="speed-slider">
          <input
            type="range"
            min="0.75"
            max="1.5"
            step="0.25"
            value={preferences.audioSpeed}
            onChange={(e) => updateAudioSpeed(parseFloat(e.target.value) as AudioSpeed)}
            aria-label="Audio speed slider"
          />
          <span className="slider-value">{preferences.audioSpeed}x</span>
        </div>
      </section>

      {/* Contrast Mode Toggle */}
      <section className="settings-section card">
        <h2>Contrast Mode</h2>
        <p className="section-description">
          Enable enhanced contrast for better visibility
        </p>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={preferences.contrastMode}
            onChange={(e) => updateContrastMode(e.target.checked)}
            aria-label="Toggle contrast mode"
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">
            {preferences.contrastMode ? 'Enabled' : 'Disabled'}
          </span>
        </label>
      </section>

      {/* Action Buttons */}
      <div className="settings-actions">
        <button className="button" onClick={handleSave}>
          💾 Save Preferences
        </button>
        <button className="button button-secondary" onClick={handleReset}>
          🔄 Reset to Default
        </button>
      </div>

      {/* Status Messages */}
      {showSaveMessage && (
        <div className="status-message success">
          ✓ Preferences saved successfully!
        </div>
      )}
      {showResetMessage && (
        <div className="status-message info">
          ✓ Settings reset to defaults!
        </div>
      )}

      {/* Current Settings Summary */}
      <section className="settings-summary card">
        <h3>Current Settings</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Theme:</span>
            <span className="summary-value">{preferences.theme}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Font Size:</span>
            <span className="summary-value">{preferences.fontSize}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Audio Speed:</span>
            <span className="summary-value">{preferences.audioSpeed}x</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Contrast Mode:</span>
            <span className="summary-value">{preferences.contrastMode ? 'On' : 'Off'}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

const getThemeIcon = (theme: ThemeMode): string => {
  switch (theme) {
    case 'light':
      return '☀️';
    case 'dark':
      return '🌙';
    case 'high-contrast':
      return '⚡';
    default:
      return '🎨';
  }
};

export default AccessibilitySettings;
