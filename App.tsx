
import React from 'react';
import AIPanel from './components/AIPanel';
import SidebarContent from './components/SidebarContent';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="w-1/2 lg:w-2/5 xl:w-1/3 h-screen overflow-y-auto p-8 border-r border-gray-700/50 prose prose-invert prose-sm md:prose-base">
        <SidebarContent />
      </div>
      <main className="w-1/2 lg:w-3/5 xl:w-2/3 h-screen">
        <AIPanel />
      </main>
    </div>
  );
};

export default App;
