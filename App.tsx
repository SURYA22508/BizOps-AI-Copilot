import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import OpsChat from './components/OpsChat';
import StrategyBuilder from './components/StrategyBuilder';
import DocumentAnalyzer from './components/DocumentAnalyzer';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.OPERATIONS_CHAT:
        return <OpsChat />;
      case ViewState.STRATEGY_BUILDER:
        return <StrategyBuilder />;
      case ViewState.DOC_ANALYZER:
        return <DocumentAnalyzer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 h-full relative overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
};

export default App;