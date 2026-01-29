/**
 * Accessibility Context
 * Provides global accessibility state and actions
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AccessibilityPreferences, ThemeMode, FontSize, AudioSpeed } from '../types/accessibility';
import { DEFAULT_PREFERENCES } from '../types/accessibility';
import { savePreferences, loadPreferences } from '../utils/storage';

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updateTheme: (theme: ThemeMode) => void;
  updateFontSize: (size: FontSize) => void;
  updateAudioSpeed: (speed: AudioSpeed) => void;
  updateContrastMode: (enabled: boolean) => void;
  saveCurrentPreferences: () => void;
  resetToDefaults: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES);

  // Load preferences on mount
  useEffect(() => {
    const loaded = loadPreferences();
    setPreferences(loaded);
    applyTheme(loaded.theme);
    applyFontSize(loaded.fontSize);
  }, []);

  // Apply theme to document
  const applyTheme = (theme: ThemeMode) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  // Apply font size to document
  const applyFontSize = (size: FontSize) => {
    document.documentElement.setAttribute('data-font-size', size);
  };

  const updateTheme = (theme: ThemeMode) => {
    setPreferences(prev => ({ ...prev, theme }));
    applyTheme(theme);
  };

  const updateFontSize = (fontSize: FontSize) => {
    setPreferences(prev => ({ ...prev, fontSize }));
    applyFontSize(fontSize);
  };

  const updateAudioSpeed = (audioSpeed: AudioSpeed) => {
    setPreferences(prev => ({ ...prev, audioSpeed }));
  };

  const updateContrastMode = (contrastMode: boolean) => {
    setPreferences(prev => ({ ...prev, contrastMode }));
  };

  const saveCurrentPreferences = () => {
    savePreferences(preferences);
  };

  const resetToDefaults = () => {
    setPreferences(DEFAULT_PREFERENCES);
    applyTheme(DEFAULT_PREFERENCES.theme);
    applyFontSize(DEFAULT_PREFERENCES.fontSize);
    savePreferences(DEFAULT_PREFERENCES);
  };

  const value: AccessibilityContextType = {
    preferences,
    updateTheme,
    updateFontSize,
    updateAudioSpeed,
    updateContrastMode,
    saveCurrentPreferences,
    resetToDefaults,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
