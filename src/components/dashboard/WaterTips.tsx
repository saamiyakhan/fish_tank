import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Droplets, TrendingDown, Clock } from 'lucide-react';
import { mockWaterTips } from '@/data/mockData';

export const WaterTips: React.FC = () => {
  // Show first 3 tips
  const displayTips = mockWaterTips.slice(0, 3);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <span>Personalized Tips</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {displayTips.map((tip, index) => (
          <div key={tip.id} className="group">
            <div className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-foreground group-hover:text-ocean transition-colors">
                  {tip.title}
                </h4>
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(tip.difficulty)}
                >
                  {tip.difficulty}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {tip.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingDown className="h-4 w-4" />
                    <span>{tip.estimatedSavings} litre/day</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>2 min read</span>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Alert Section */}
        <div className="p-4 bg-gradient-to-r from-coral/10 to-orange-100 border border-coral/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-coral/20 rounded-lg">
              <Droplets className="h-4 w-4 text-coral" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Water Usage Alert</h4>
              <p className="text-sm text-muted-foreground">
                You're using 20% more water than yesterday. Consider shorter showers!
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-gradient-ocean hover:opacity-90">
          View All Tips & Challenges
        </Button>
      </CardContent>
    </Card>
  );
};