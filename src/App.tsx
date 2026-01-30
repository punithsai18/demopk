/**
 * Main App Component
 * Navigation between Profile (AccessibilityHub) and Settings pages with sidebar
 */

import React, { useState } from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import FlexiDeskSettings from './pages/FlexiDeskSettings';
import AccessibilityHub from './pages/AccessibilityHub';
import './assets/styles/global.css';
import './App.css';

type Page = 'profile' | 'accessibility' | 'security' | 'notifications';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('profile');

  const handleNavigateToAccessibility = () => {
    setCurrentPage('accessibility');
  };

  return (
    <AccessibilityProvider>
      <div className="app">
        <FlexiDeskSettings 
          currentPage={currentPage} 
          onNavigate={setCurrentPage}
          profileContent={<AccessibilityHub onNavigateToSettings={handleNavigateToAccessibility} />}
        />
      </div>
    </AccessibilityProvider>
  );
};

export default App;
