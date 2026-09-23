import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Button } from '@/components/ui/button';
import { Fish } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-ocean-50 via-aqua-50 to-teal-50">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-ocean opacity-10 rounded-full animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-aqua opacity-10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Fish className="h-16 w-16 text-ocean animate-float" />
              <div className="absolute -top-1 -right-1">
                <div className="w-4 h-4 bg-aqua rounded-full animate-bubble" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-ocean bg-clip-text text-transparent mb-2">
            FISHY
          </h1>
          <p className="text-xl text-muted-foreground">
            The Water Saving Pet
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-lg p-1 flex">
            <Button
              variant="ghost"
              className={`px-6 py-2 rounded-md transition-all ${
                isLogin 
                  ? 'tab-active' 
                  : 'tab-inactive'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              className={`px-6 py-2 rounded-md transition-all ${
                !isLogin 
                  ? 'tab-active' 
                  : 'tab-inactive'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="animate-tab-slide">
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>

        {/* Demo Info */}
        <div className="mt-8 text-center">
          <div className="glass max-w-md mx-auto p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Demo Credentials:</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Email: demo@fishy.com<br />
              Password: password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};