import React from 'react';
import { Button } from '@/components/ui/button';
import { Tab } from '@/types';
import { BarChart3, Home, Trophy, Users } from 'lucide-react';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: Home },
    { id: 'statistics' as Tab, label: 'Statistics', icon: BarChart3 },
    { id: 'achievements' as Tab, label: 'Achievements', icon: Trophy },
    { id: 'neighborhood' as Tab, label: 'Neighborhood', icon: Users },
  ];

  return (
    <nav className="glass border-b">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`relative px-6 py-4 rounded-none transition-all duration-200 ${
                  isActive 
                    ? 'tab-active border-b-2 border-primary' 
                    : 'tab-inactive hover:bg-secondary/80'
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary-foreground' : ''}`} />
                  <span className={`font-medium ${isActive ? 'text-primary-foreground' : ''}`}>
                    {tab.label}
                  </span>
                </div>
                
                {/* Active Tab Indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};