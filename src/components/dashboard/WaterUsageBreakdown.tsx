import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Droplets, Bath, ChefHat, Shirt, Flower } from 'lucide-react';

interface RoomUsage {
  room: string;
  icon: React.ReactNode;
  usage: number;
  percentage: number;
  color: string;
}

export const WaterUsageBreakdown: React.FC = () => {
  const roomUsage: RoomUsage[] = [
    {
      room: 'Bathroom',
      icon: <Bath className="h-5 w-5" />,
      usage: 125,
      percentage: 45,
      color: 'bg-ocean',
    },
    {
      room: 'Kitchen',
      icon: <ChefHat className="h-5 w-5" />,
      usage: 85,
      percentage: 30,
      color: 'bg-teal',
    },
    {
      room: 'Laundry',
      icon: <Shirt className="h-5 w-5" />,
      usage: 50,
      percentage: 18,
      color: 'bg-aqua',
    },
    {
      room: 'Garden',
      icon: <Flower className="h-5 w-5" />,
      usage: 20,
      percentage: 7,
      color: 'bg-seafoam',
    },
  ];

  const totalUsage = roomUsage.reduce((sum, room) => sum + room.usage, 0);

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Droplets className="h-5 w-5 text-ocean" />
          <span>Today's Water Usage</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Total Usage */}
        <div className="text-center p-4 bg-gradient-ocean rounded-lg text-white">
          <div className="text-3xl font-bold">{totalUsage}</div>
          <div className="text-sm opacity-90">litres used today</div>
        </div>

        {/* Room Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Usage by Room</h4>
          
          {roomUsage.map((room, index) => (
            <div key={room.room} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${room.color} text-white`}>
                    {room.icon}
                  </div>
                  <span className="font-medium">{room.room}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">{room.usage} litres</div>
                  <div className="text-sm text-muted-foreground">{room.percentage}%</div>
                </div>
              </div>
              
              <Progress 
                value={room.percentage} 
                className="h-2"
              />
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">-15%</div>
            <div className="text-sm text-muted-foreground">vs. yesterday</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-ocean">85%</div>
            <div className="text-sm text-muted-foreground">of daily goal</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};