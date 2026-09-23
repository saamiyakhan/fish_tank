import { User, WaterUsage, Achievement, NeighborData, WaterTip, FishMood } from '@/types';

export const demoUser: User = {
  id: 'demo-user-1',
  name: 'Demo User',
  email: 'demo@fishy.com',
  householdSize: 4,
  houseType: 'house',
  location: 'Singapore',
  waterBudget: 300,
  conservationGoal: 20,
  fishName: 'Splash',
  fishColor: 'blue',
  points: 1250,
  createdAt: new Date('2024-01-15'),
};

export const mockWaterUsage: WaterUsage[] = [
  { id: '1', userId: 'demo-user-1', timestamp: new Date(), amount: 15, room: 'bathroom', activity: 'shower' },
  { id: '2', userId: 'demo-user-1', timestamp: new Date(), amount: 8, room: 'kitchen', activity: 'dishes' },
  { id: '3', userId: 'demo-user-1', timestamp: new Date(), amount: 12, room: 'laundry', activity: 'washing machine' },
  { id: '4', userId: 'demo-user-1', timestamp: new Date(), amount: 5, room: 'bathroom', activity: 'hand washing' },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    name: 'Water Warrior',
    description: 'Save 50 litres in a week',
    icon: '⚔️',
    pointsRequired: 500,
    isUnlocked: true,
    unlockedAt: new Date('2024-09-15'),
    progress: 100,
  },
  {
    id: '2',
    name: 'Conservation Champion',
    description: 'Maintain a 7-day conservation streak',
    icon: '🏆',
    pointsRequired: 1000,
    isUnlocked: true,
    unlockedAt: new Date('2024-09-20'),
    progress: 100,
  },
  {
    id: '3',
    name: 'Neighbor\'s Choice',
    description: 'Rank #1 in neighborhood for a month',
    icon: '⭐',
    pointsRequired: 2000,
    isUnlocked: false,
    progress: 65,
  },
  {
    id: '4',
    name: 'Eco Master',
    description: 'Reduce usage by 50% from baseline',
    icon: '🌱',
    pointsRequired: 3000,
    isUnlocked: false,
    progress: 30,
  },
];

export const mockNeighborhood: NeighborData[] = [
  { id: 'demo-user-1', name: 'Your Home', points: 1250, conservationStreak: 12, weeklyUsage: 285, isCurrentUser: true },
  { id: 'neighbor-1', name: 'House A', points: 1180, conservationStreak: 8, weeklyUsage: 310 },
  { id: 'neighbor-2', name: 'House B', points: 1320, conservationStreak: 15, weeklyUsage: 265 },
  { id: 'neighbor-3', name: 'House C', points: 890, conservationStreak: 5, weeklyUsage: 425 },
  { id: 'neighbor-4', name: 'House D', points: 1420, conservationStreak: 18, weeklyUsage: 240 },
  { id: 'neighbor-5', name: 'House E', points: 1050, conservationStreak: 10, weeklyUsage: 350 },
];

export const mockWaterTips: WaterTip[] = [
  {
    id: '1',
    title: 'Take Shorter Showers',
    description: 'Reduce shower time by 2 minutes to save 10 litres per shower.',
    category: 'bathroom',
    estimatedSavings: 10,
    difficulty: 'easy',
  },
  {
    id: '2',
    title: 'Fix Leaky Faucets',
    description: 'A dripping faucet can waste over 3,000 litres per year.',
    category: 'general',
    estimatedSavings: 50,
    difficulty: 'medium',
  },
  {
    id: '3',
    title: 'Run Full Dishwasher Loads',
    description: 'Only run your dishwasher when it\'s completely full to maximize efficiency.',
    category: 'kitchen',
    estimatedSavings: 8,
    difficulty: 'easy',
  },
  {
    id: '4',
    title: 'Install Low-Flow Showerheads',
    description: 'Upgrade to water-efficient fixtures for long-term savings.',
    category: 'bathroom',
    estimatedSavings: 25,
    difficulty: 'hard',
  },
];

export const getFishMood = (weeklyUsage: number, goal: number): FishMood => {
  const usagePercentage = (weeklyUsage / goal) * 100;
  
  if (usagePercentage <= 50) {
    return {
      type: 'happy',
      message: 'Wow! You\'re an amazing water saver! I\'m swimming in crystal clear water and feeling fantastic! Keep up the incredible work! 🌟💧',
      waterLevel: 90,
    };
  } else if (usagePercentage <= 60 ) {
    return {
      type: 'happy',
      message: 'Great job! I\'m swimming happily in plenty of clean water! You\'re doing wonderful things for our planet! 🐠💙',
      waterLevel: 80,
    };
  } else if (usagePercentage <= 70) {
    return {
      type: 'neutral',
      message: 'We\'re doing okay, but I believe we can do even better together! Every drop saved makes me happier! 🌊',
      waterLevel: 60,
    };
  } else if (usagePercentage <= 80) {
    return {
      type: 'concerned',
      message: 'My tank is getting a bit low... Could you help me by saving some water? I know you can do it! 💪💧',
      waterLevel: 40,
    };
  } else {
    return {
      type: 'concerned',
      message: 'Oh no! My tank is really low and I\'m worried! Please help save water urgently - shorter showers and fixing leaks would help so much! 🆘💧',
      waterLevel: 25,
    };
  }
};

export const weeklyUsageData = [
  { day: 'Mon', usage: 45, goal: 40 },
  { day: 'Tue', usage: 38, goal: 40 },
  { day: 'Wed', usage: 42, goal: 40 },
  { day: 'Thu', usage: 35, goal: 40 },
  { day: 'Fri', usage: 48, goal: 40 },
  { day: 'Sat', usage: 52, goal: 40 },
  { day: 'Sun', usage: 44, goal: 40 },
];

export const monthlyUsageData = [
  { month: 'Jan', usage: 1250, average: 1400 },
  { month: 'Feb', usage: 1180, average: 1350 },
  { month: 'Mar', usage: 1320, average: 1380 },
  { month: 'Apr', usage: 1150, average: 1300 },
  { month: 'May', usage: 1280, average: 1420 },
  { month: 'Jun', usage: 1200, average: 1380 },
];