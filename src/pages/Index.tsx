import React from 'react';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { MainApp } from '@/components/MainApp';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 via-aqua-50 to-teal-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-ocean mx-auto mb-4" />
          <p className="text-muted-foreground">Loading FISHY...</p>
        </div>
      </div>
    );
  }

  return user ? <MainApp /> : <AuthScreen />;
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
