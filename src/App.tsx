/**
 * Main App Component
 * Navigation and routing between different pages
 */

import React, { useState } from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import AccessibilitySettings from './pages/AccessibilitySettings';
import UserProfile from './components/UserProfile';
import PreviewModal from './components/PreviewModal';
import OnboardingSetup from './components/OnboardingSetup';
import './assets/styles/global.css';
import './App.css';

type Page = 'onboarding' | 'profile' | 'settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed');
    return hasCompletedOnboarding ? 'profile' : 'onboarding';
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setCurrentPage('profile');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'onboarding':
        return <OnboardingSetup onComplete={handleOnboardingComplete} />;
      case 'profile':
        return <UserProfile onNavigateToSettings={() => setCurrentPage('settings')} />;
      case 'settings':
        return <AccessibilitySettings />;
      default:
        return null;
    }
  };

  return (
    <AccessibilityProvider>
      <div className="app">
        {currentPage !== 'onboarding' && (
          <nav className="app-nav">
            <div className="nav-container">
              <h1 className="nav-logo">♿ Accessibility App</h1>
              <div className="nav-links">
                <button
                  className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('profile')}
                >
                  👤 Profile
                </button>
                <button
                  className={`nav-link ${currentPage === 'settings' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('settings')}
                >
                  ⚙️ Settings
                </button>
                <button className="nav-link" onClick={() => setShowPreview(true)}>
                  👁️ Preview
                </button>
              </div>
            </div>
          </nav>
        )}

        <main className="app-main">{renderPage()}</main>

        <PreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} />

        {currentPage !== 'onboarding' && (
          <footer className="app-footer">
            <p>© 2024 Accessibility App | Making the web accessible for everyone</p>
          </footer>
        )}
      </div>
    </AccessibilityProvider>
  );
};

export default App;
