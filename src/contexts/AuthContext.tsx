import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { demoUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string; confirmPassword: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('fishy-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('fishy-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login validation
    if (email === 'demo@fishy.com' && password === 'password123') {
      setUser(demoUser);
      
      if (rememberMe) {
        localStorage.setItem('fishy-user', JSON.stringify(demoUser));
      }
      
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Partial<User> & { password: string; confirmPassword: string }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (userData.password !== userData.confirmPassword) {
      setIsLoading(false);
      return false;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || '',
      email: userData.email || '',
      householdSize: userData.householdSize || 1,
      houseType: userData.houseType || 'apartment',
      location: userData.location,
      waterBudget: 250,
      conservationGoal: 15,
      fishName: 'Buddy',
      fishColor: 'blue',
      points: 0,
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('fishy-user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fishy-user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('fishy-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};