/**
 * Main App Component
 * Navigation between FlexiDesk and Accessibility Hub pages
 */

import React, { useState } from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import FlexiDeskSettings from './pages/FlexiDeskSettings';
import AccessibilityHub from './pages/AccessibilityHub';
import './assets/styles/global.css';
import './App.css';

type Page = 'hub' | 'settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('hub');

  const renderPage = () => {
    switch (currentPage) {
      case 'hub':
        return <AccessibilityHub onNavigateToSettings={() => setCurrentPage('settings')} />;
      case 'settings':
        return <FlexiDeskSettings />;
      default:
        return null;
    }
  };

  return (
    <AccessibilityProvider>
      <div className="app">
        {renderPage()}
      </div>
    </AccessibilityProvider>
  );
};

export default App;
