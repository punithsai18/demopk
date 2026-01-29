/**
 * Onboarding Accessibility Setup
 * First-time user experience for setting accessibility preferences
 */

import React, { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import type { ThemeMode, FontSize, AudioSpeed } from '../types/accessibility';
import './OnboardingSetup.css';

interface OnboardingSetupProps {
  onComplete: () => void;
}

const OnboardingSetup: React.FC<OnboardingSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const { updateTheme, updateFontSize, updateAudioSpeed, saveCurrentPreferences } = useAccessibility();

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    saveCurrentPreferences();
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <ThemeStep onSelectTheme={updateTheme} />;
      case 3:
        return <FontSizeStep onSelectFontSize={updateFontSize} />;
      case 4:
        return <AudioSpeedStep onSelectAudioSpeed={updateAudioSpeed} />;
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-setup">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className="step-indicator">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="onboarding-content">{renderStep()}</div>

        <div className="onboarding-actions">
          {step > 1 && (
            <button className="button button-secondary" onClick={handleBack}>
              ← Back
            </button>
          )}
          <button className="button button-secondary" onClick={handleSkip}>
            Skip Setup
          </button>
          <button className="button" onClick={handleNext}>
            {step === totalSteps ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

const WelcomeStep: React.FC = () => (
  <div className="onboarding-step">
    <div className="step-icon">🎯</div>
    <h2>Welcome to Accessibility Setup</h2>
    <p>
      Let's personalize your experience! We'll help you set up your accessibility preferences
      to ensure the best experience for your needs.
    </p>
    <ul className="feature-list">
      <li>✨ Choose your preferred theme</li>
      <li>📝 Adjust text size for better readability</li>
      <li>🔊 Set audio playback speed</li>
      <li>⚡ Enable high contrast mode if needed</li>
    </ul>
    <p className="note">You can change these settings anytime from your profile.</p>
  </div>
);

interface ThemeStepProps {
  onSelectTheme: (theme: ThemeMode) => void;
}

const ThemeStep: React.FC<ThemeStepProps> = ({ onSelectTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>('light');

  const handleSelect = (theme: ThemeMode) => {
    setSelectedTheme(theme);
    onSelectTheme(theme);
  };

  const themes: { value: ThemeMode; label: string; icon: string; description: string }[] = [
    {
      value: 'light',
      label: 'Light Mode',
      icon: '☀️',
      description: 'Bright and clear for daytime use',
    },
    {
      value: 'dark',
      label: 'Dark Mode',
      icon: '🌙',
      description: 'Easy on the eyes for low-light environments',
    },
    {
      value: 'high-contrast',
      label: 'High Contrast',
      icon: '⚡',
      description: 'Maximum visibility with strong contrasts',
    },
  ];

  return (
    <div className="onboarding-step">
      <h2>Choose Your Theme</h2>
      <p>Select a theme that's comfortable for your eyes</p>
      <div className="theme-selection">
        {themes.map((theme) => (
          <button
            key={theme.value}
            className={`theme-card ${selectedTheme === theme.value ? 'selected' : ''}`}
            onClick={() => handleSelect(theme.value)}
          >
            <span className="theme-card-icon">{theme.icon}</span>
            <h3>{theme.label}</h3>
            <p>{theme.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

interface FontSizeStepProps {
  onSelectFontSize: (size: FontSize) => void;
}

const FontSizeStep: React.FC<FontSizeStepProps> = ({ onSelectFontSize }) => {
  const [selectedSize, setSelectedSize] = useState<FontSize>('medium');

  const handleSelect = (size: FontSize) => {
    setSelectedSize(size);
    onSelectFontSize(size);
  };

  const sizes: { value: FontSize; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <div className="onboarding-step">
      <h2>Select Font Size</h2>
      <p>Choose a text size that's easy to read</p>
      <div className="font-size-selection">
        {sizes.map((size) => (
          <button
            key={size.value}
            className={`size-card ${selectedSize === size.value ? 'selected' : ''}`}
            onClick={() => handleSelect(size.value)}
          >
            <span className="size-label">{size.label}</span>
          </button>
        ))}
      </div>
      <div className="preview-box">
        <p>Preview: The quick brown fox jumps over the lazy dog.</p>
      </div>
    </div>
  );
};

interface AudioSpeedStepProps {
  onSelectAudioSpeed: (speed: AudioSpeed) => void;
}

const AudioSpeedStep: React.FC<AudioSpeedStepProps> = ({ onSelectAudioSpeed }) => {
  const [selectedSpeed, setSelectedSpeed] = useState<AudioSpeed>(1.0);

  const handleSelect = (speed: AudioSpeed) => {
    setSelectedSpeed(speed);
    onSelectAudioSpeed(speed);
  };

  const speeds: AudioSpeed[] = [0.75, 1.0, 1.25, 1.5];

  return (
    <div className="onboarding-step">
      <h2>Audio Playback Speed</h2>
      <p>Set your preferred speed for audio content</p>
      <div className="speed-selection">
        {speeds.map((speed) => (
          <button
            key={speed}
            className={`speed-card ${selectedSpeed === speed ? 'selected' : ''}`}
            onClick={() => handleSelect(speed)}
          >
            {speed}x
          </button>
        ))}
      </div>
      <div className="info-box">
        <p>
          💡 <strong>Tip:</strong> You can adjust this later based on the content you're listening to.
        </p>
      </div>
    </div>
  );
};

export default OnboardingSetup;
