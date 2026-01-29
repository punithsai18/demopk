/**
 * Accessibility Preview Modal
 * Shows a preview of accessibility changes
 */

import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import './PreviewModal.css';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose }) => {
  const { preferences } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Accessibility Preview</h2>
          <button className="close-button" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="preview-section">
            <h3>Sample Text</h3>
            <p className="sample-text">
              The quick brown fox jumps over the lazy dog. This is how your text will appear with
              the current settings.
            </p>
          </div>

          <div className="preview-section">
            <h3>Button Styles</h3>
            <div className="button-preview">
              <button className="button">Primary Button</button>
              <button className="button button-secondary">Secondary Button</button>
            </div>
          </div>

          <div className="preview-section">
            <h3>Icon Visibility</h3>
            <div className="icon-preview">
              <span className="icon">🏠 Home</span>
              <span className="icon">⚙️ Settings</span>
              <span className="icon">👤 Profile</span>
              <span className="icon">🔔 Notifications</span>
            </div>
          </div>

          <div className="preview-section">
            <h3>Contrast Preview</h3>
            <div className="contrast-demo">
              <div className="contrast-item">
                <span className="contrast-text">Normal Text</span>
              </div>
              <div className="contrast-item highlight">
                <span className="contrast-text">Highlighted Text</span>
              </div>
              <div className="contrast-item accent">
                <span className="contrast-text">Accent Text</span>
              </div>
            </div>
          </div>

          <div className="preview-summary">
            <h3>Current Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <span className="setting-label">Theme:</span>
                <span className="setting-value">{preferences.theme}</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">Font Size:</span>
                <span className="setting-value">{preferences.fontSize}</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">Audio Speed:</span>
                <span className="setting-value">{preferences.audioSpeed}x</span>
              </div>
              <div className="setting-item">
                <span className="setting-label">Contrast:</span>
                <span className="setting-value">
                  {preferences.contrastMode ? 'Enhanced' : 'Normal'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="button" onClick={onClose}>
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
