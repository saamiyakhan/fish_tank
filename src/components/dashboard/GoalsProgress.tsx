import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, TrendingUp, Award } from 'lucide-react';

export const GoalsProgress: React.FC = () => {
  const goals = [
    {
      id: 'daily',
      title: 'Daily Goal',
      target: 290,
      current: 280,
      unit: 'litres',
      icon: <Target className="h-4 w-4" />,
      timeLeft: '5 hours left',
      color: 'text-green-600',
    },
    {
      id: 'weekly',
      title: 'Weekly Savings',
      target: 50,
      current: 32,
      unit: 'litres saved',
      icon: <Calendar className="h-4 w-4" />,
      timeLeft: '3 days left',
      color: 'text-ocean',
    },
  ];

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-ocean" />
          <span>Conservation Goals</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100);
          const isCompleted = goal.current >= goal.target;
          
          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`${goal.color}`}>
                    {goal.icon}
                  </div>
                  <span className="font-medium">{goal.title}</span>
                  {isCompleted && (
                    <Award className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {goal.timeLeft}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span className={`text-sm font-medium ${
                    isCompleted ? 'text-green-600' : goal.color
                  }`}>
                    {Math.round(percentage)}%
                  </span>
                </div>
                
                <Progress 
                  value={percentage} 
                  className={`h-3 ${
                    isCompleted ? '[&>div]:bg-green-500' : `[&>div]:bg-gradient-ocean`
                  }`}
                />
              </div>
              
              {isCompleted ? (
                <div className="flex items-center space-x-2 text-green-600 text-sm">
                  <Award className="h-4 w-4" />
                  <span className="font-medium">Goal completed! +50 points</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {goal.target - goal.current} {goal.unit} to go
                </div>
              )}
            </div>
          );
        })}

        {/* Weekly Challenge */}
        <div className="p-4 bg-gradient-to-r from-aqua/10 to-teal/10 border border-aqua/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">Weekly Challenge</h4>
            <span className="text-sm text-aqua font-medium">+200 pts</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Use 10% less water than last week
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">6/7 days</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};