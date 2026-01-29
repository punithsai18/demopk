/**
 * Local Storage Utilities
 * Handles saving and loading accessibility preferences
 */

import type { AccessibilityPreferences } from '../types/accessibility';
import { DEFAULT_PREFERENCES } from '../types/accessibility';

const STORAGE_KEY = 'accessibility-preferences';

/**
 * Save preferences to localStorage
 */
export const savePreferences = (preferences: AccessibilityPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

/**
 * Load preferences from localStorage
 */
export const loadPreferences = (): AccessibilityPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as AccessibilityPreferences;
    }
  } catch (error) {
    console.error('Failed to load preferences:', error);
  }
  return DEFAULT_PREFERENCES;
};

/**
 * Clear all preferences
 */
export const clearPreferences = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear preferences:', error);
  }
};
