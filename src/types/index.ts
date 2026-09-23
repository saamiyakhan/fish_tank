export interface User {
  id: string;
  name: string;
  email: string;
  householdSize: number;
  houseType: 'apartment' | 'house';
  location?: string;
  waterBudget?: number;
  conservationGoal?: number;
  fishName: string;
  fishColor: string;
  points: number;
  createdAt: Date;
}

export interface WaterUsage {
  id: string;
  userId: string;
  timestamp: Date;
  amount: number;
  room: 'bathroom' | 'kitchen' | 'laundry' | 'garden' | 'other';
  activity: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  pointsRequired: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number;
}

export interface NeighborData {
  id: string;
  name: string;
  points: number;
  conservationStreak: number;
  weeklyUsage: number;
  isCurrentUser?: boolean;
}

export interface WaterTip {
  id: string;
  title: string;
  description: string;
  category: 'bathroom' | 'kitchen' | 'laundry' | 'garden' | 'general';
  estimatedSavings: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface FishMood {
  type: 'happy' | 'neutral' | 'concerned';
  message: string;
  waterLevel: number;
}

export type Tab = 'dashboard' | 'statistics' | 'achievements' | 'neighborhood';