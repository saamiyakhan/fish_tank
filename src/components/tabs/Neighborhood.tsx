import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockNeighborhood } from '@/data/mockData';
import { Home, Trophy, Zap, TrendingUp, Users, Target } from 'lucide-react';

export const Neighborhood: React.FC = () => {
  // Sort neighbors by points (highest first)
  const sortedNeighbors = [...mockNeighborhood].sort((a, b) => b.points - a.points);
  
  const currentUserRank = sortedNeighbors.findIndex(n => n.isCurrentUser) + 1;
  
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 15) return 'text-green-600';
    if (streak >= 10) return 'text-yellow-600';
    if (streak >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="animate-tab-slide">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Neighborhood Leaderboard 🏘️
          </h2>
          <p className="text-muted-foreground">
            See how your water conservation efforts compare with your neighbors.
          </p>
        </div>

        {/* Your Rank Card */}
        <Card className="glass mb-8 bg-gradient-to-r from-ocean-50 to-aqua-50 border-ocean-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">
                  {getMedalIcon(currentUserRank)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Your Ranking</h3>
                  <p className="text-muted-foreground">
                    You're #{currentUserRank} out of {mockNeighborhood.length} homes
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg text-ocean">1,250</div>
                    <div className="text-muted-foreground">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-green-600">12</div>
                    <div className="text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="glass mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Weekly Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedNeighbors.map((neighbor, index) => {
                const rank = index + 1;
                const isCurrentUser = neighbor.isCurrentUser;
                
                return (
                  <div
                    key={neighbor.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-ocean-50 to-aqua-50 border-ocean-200' 
                        : 'bg-card hover:bg-card/80'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="text-2xl font-bold w-12 text-center">
                        {getMedalIcon(rank)}
                      </div>
                      
                      {/* House Info */}
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isCurrentUser ? 'bg-ocean text-white' : 'bg-muted'
                        }`}>
                          <Home className="h-5 w-5" />
                        </div>
                        
                        <div>
                          <h4 className={`font-semibold ${
                            isCurrentUser ? 'text-ocean' : 'text-foreground'
                          }`}>
                            {neighbor.name}
                            {isCurrentUser && (
                              <Badge className="ml-2 bg-ocean text-white">You</Badge>
                            )}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {neighbor.weeklyUsage} litres this week
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-lg">{neighbor.points.toLocaleString()}</div>
                        <div className="text-muted-foreground">Points</div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`font-bold text-lg ${getStreakColor(neighbor.conservationStreak)}`}>
                          {neighbor.conservationStreak}
                        </div>
                        <div className="text-muted-foreground">Streak</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Community Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Challenge */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-coral" />
                Active Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-coral/10 to-orange-100 border border-coral/20 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">
                    🌊 September Water Challenge
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reduce neighborhood water usage by 25% compared to last month
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">18% reduction</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-coral h-2 rounded-full" style={{ width: '72%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground">7 days remaining</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-coral">500 pts</div>
                  <div className="text-sm text-muted-foreground">Reward per participant</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Neighborhood Stats */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-teal" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-teal/10 to-seafoam/10 rounded-lg">
                    <div className="text-2xl font-bold text-teal">6</div>
                    <div className="text-sm text-muted-foreground">Active Homes</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-r from-ocean/10 to-aqua/10 rounded-lg">
                    <div className="text-2xl font-bold text-ocean">1,850</div>
                    <div className="text-sm text-muted-foreground">Avg Usage (litres)</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium">This Week's Impact</h5>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Water Saved:</span>
                      <span className="font-medium text-green-600">450 litres</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Money Saved:</span>
                      <span className="font-medium text-green-600">$18.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CO₂ Reduced:</span>
                      <span className="font-medium text-green-600">12 kgs</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competition Actions */}
        <div className="mt-8 text-center">
          <Card className="glass bg-gradient-to-r from-aqua/10 to-teal/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Ready to climb the leaderboard?</h3>
              <p className="text-muted-foreground mb-4">
                Start a friendly competition or join community challenges to earn more points!
              </p>
              
              <div className="flex justify-center space-x-4">
                <Button className="bg-gradient-ocean hover:opacity-90">
                  <Zap className="h-4 w-4 mr-2" />
                  Start Challenge
                </Button>
                
                <Button variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};