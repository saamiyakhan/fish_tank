import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockAchievements } from '@/data/mockData';
import { Trophy, Lock, Clock, Star } from 'lucide-react';

export const Achievements: React.FC = () => {
  const unlockedAchievements = mockAchievements.filter(a => a.isUnlocked);
  const lockedAchievements = mockAchievements.filter(a => !a.isUnlocked);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="animate-tab-slide">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Achievements & Badges 🏆
          </h2>
          <p className="text-muted-foreground">
            Track your water conservation milestones and unlock special rewards.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {unlockedAchievements.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Achievements Unlocked
              </div>
            </CardContent>
          </Card>

          <Card className="glass bg-gradient-to-br from-ocean-50 to-aqua-50">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-ocean mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {unlockedAchievements.reduce((sum, a) => sum + a.pointsRequired, 0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Points Earned
              </div>
            </CardContent>
          </Card>

          <Card className="glass bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((unlockedAchievements.length / mockAchievements.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Completion Rate
              </div>
              <Progress 
                value={(unlockedAchievements.length / mockAchievements.length) * 100} 
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Unlocked Achievements */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            Unlocked Achievements ({unlockedAchievements.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="glass bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl bg-green-100 p-3 rounded-lg">
                      {achievement.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">
                          {achievement.name}
                        </h4>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Unlocked
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-green-600">
                          <Trophy className="h-4 w-4 mr-1" />
                          <span>{achievement.pointsRequired} points</span>
                        </div>
                        
                        {achievement.unlockedAt && (
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{formatDate(achievement.unlockedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Achievements */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-muted-foreground" />
            In Progress ({lockedAchievements.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="glass opacity-90">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl bg-muted p-3 rounded-lg grayscale">
                      {achievement.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-muted-foreground">
                          {achievement.name}
                        </h4>
                        <Badge variant="outline" className="border-muted-foreground/50">
                          <Lock className="h-3 w-3 mr-1" />
                          Locked
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{achievement.progress}%</span>
                        </div>
                        
                        <Progress 
                          value={achievement.progress} 
                          className="h-2"
                        />
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Trophy className="h-4 w-4 mr-1" />
                            <span>{achievement.pointsRequired} points</span>
                          </div>
                          
                          <span className="text-muted-foreground">
                            {Math.round((100 - achievement.progress) / 100 * achievement.pointsRequired)} points to go
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievement Tips */}
        <Card className="glass mt-8 bg-gradient-to-r from-aqua/10 to-teal/10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-aqua" />
              How to Earn More Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🚿</div>
                <h4 className="font-medium mb-1">Reduce Daily Usage</h4>
                <p className="text-sm text-muted-foreground">
                  Take shorter showers and fix leaks to unlock conservation badges
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="text-2xl mb-2">📅</div>
                <h4 className="font-medium mb-1">Build Streaks</h4>
                <p className="text-sm text-muted-foreground">
                  Maintain consistent water saving habits for streak achievements
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="text-2xl mb-2">🏘️</div>
                <h4 className="font-medium mb-1">Community Engagement</h4>
                <p className="text-sm text-muted-foreground">
                  Compete with neighbors and participate in challenges
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};