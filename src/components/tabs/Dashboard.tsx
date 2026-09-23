import React, { useState } from 'react';
import { FishTank } from '@/components/dashboard/FishTank';
import { WaterUsageBreakdown } from '@/components/dashboard/WaterUsageBreakdown';
import { WaterTips } from '@/components/dashboard/WaterTips';
import { GoalsProgress } from '@/components/dashboard/GoalsProgress';
import { useAuth } from '@/contexts/AuthContext';
import { getFishMood } from '@/data/mockData';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const fishMood = getFishMood(285, 300); // Current usage vs goal

  // State and handlers for personal goals
  const [personalGoals, setPersonalGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState<string>('');

  const addGoal = () => {
    if (newGoal.trim() === '') return;
    setPersonalGoals((prev) => [...prev, newGoal.trim()]);
    setNewGoal('');
  };

  return (
    <div className="animate-tab-slide">
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-muted-foreground">
            Let's check on your water conservation progress and see how {user?.fishName} is doing.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Fish Tank */}
          <div className="lg:col-span-2">
            <FishTank
              fishMood={fishMood}
              fishName={user?.fishName || 'Buddy'}
              fishColor={user?.fishColor || 'blue'}
            />
          </div>

          {/* Right Column - Goals */}
          <div>
            <GoalsProgress />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Water Usage Breakdown */}
          <div>
            <WaterUsageBreakdown />
          </div>

          {/* Water Tips */}
          <div>
            <WaterTips />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 p-6 glass rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 rounded-lg bg-gradient-to-r from-ocean/10 to-aqua/10 border border-ocean/20 hover:from-ocean/20 hover:to-aqua/20 transition-colors text-left">
              <div className="font-medium text-foreground">Add Water Usage</div>
              <div className="text-sm text-muted-foreground mt-1">
                Record your water consumption
              </div>
            </button>

            <button className="p-4 rounded-lg bg-gradient-to-r from-teal/10 to-seafoam/10 border border-teal/20 hover:from-teal/20 hover:to-seafoam/20 transition-colors text-left">
              <div className="font-medium text-foreground">Set New Goal</div>
              <div className="text-sm text-muted-foreground mt-1">
                Update your conservation targets
              </div>
            </button>

            <button className="p-4 rounded-lg bg-gradient-to-r from-coral/10 to-orange-100 border border-coral/20 hover:from-coral/20 hover:to-orange-200 transition-colors text-left">
              <div className="font-medium text-foreground">View Reports</div>
              <div className="text-sm text-muted-foreground mt-1">
                See detailed usage analytics
              </div>
            </button>
          </div>

          {/* Personal Goals Section */}
          <div className="mt-8">
            <h4 className="text-md font-semibold mb-2">Personal Goals</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add a new personal goal"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="flex-grow rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={addGoal}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded px-4 py-2 transition"
              >
                Add
              </button>
            </div>

            <ul className="mt-4 list-disc list-inside space-y-1">
              {personalGoals.length === 0 && (
                <li className="text-muted-foreground">No personal goals added yet.</li>
              )}
              {personalGoals.map((goal, index) => (
                <li key={index} className="text-foreground">
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
