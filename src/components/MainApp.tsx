import React, { useState } from 'react';
import { Header } from '@/components/navigation/Header';
import { TabNavigation } from '@/components/navigation/TabNavigation';
import { Dashboard } from '@/components/tabs/Dashboard';
import { Statistics } from '@/components/tabs/Statistics';
import { Achievements } from '@/components/tabs/Achievements';
import { Neighborhood } from '@/components/tabs/Neighborhood';
import { ChatBot } from '@/components/chat/ChatBot';
import { Tab } from '@/types';

export const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'statistics':
        return <Statistics />;
      case 'achievements':
        return <Achievements />;
      case 'neighborhood':
        return <Neighborhood />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-ocean-50">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pb-20">
        {renderTabContent()}
      </main>
      
      <ChatBot />
    </div>
  );
};