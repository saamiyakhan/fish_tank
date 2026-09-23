import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { weeklyUsageData, monthlyUsageData } from '@/data/mockData';
import { TrendingDown, TrendingUp, Droplets, Calendar } from 'lucide-react';

export const Statistics: React.FC = () => {
  return (
    <div className="animate-tab-slide">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Water Usage Statistics 📊
          </h2>
          <p className="text-muted-foreground">
            Track your conservation progress with detailed analytics and insights.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">1995 litres</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>15% less</span>
                  </div>
                </div>
                <Droplets className="h-8 w-8 text-ocean" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">9,000 litres</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>8% less</span>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-teal" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Daily</p>
                  <p className="text-2xl font-bold">300 litres</p>
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>2% more</span>
                  </div>
                </div>
                <div className="h-8 w-8 bg-aqua/20 rounded-lg flex items-center justify-center">
                  <span className="text-aqua font-bold">📈</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Money Saved</p>
                  <p className="text-2xl font-bold">$24</p>
                  <div className="flex items-center text-green-600 text-sm mt-1">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>This month</span>
                  </div>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Usage Chart */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Weekly Water Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="usage" fill="hsl(var(--ocean-blue))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="goal" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend Chart */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Monthly Usage Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="hsl(var(--ocean-blue))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--ocean-blue))', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="average" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Educational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass bg-gradient-to-br from-ocean-50 to-aqua-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🚿</div>
                <h3 className="font-semibold mb-2">Shower Facts</h3>
                <p className="text-sm text-muted-foreground">
                  A 10-minute shower uses about 25 litres of water. 
                  Reducing by 2 minutes saves 5 litres per shower!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass bg-gradient-to-br from-teal-50 to-seafoam/20">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="font-semibold mb-2">Home Usage</h3>
                <p className="text-sm text-muted-foreground">
                  Average household uses 300 litres per day. 
                  You're doing great at 285 litres - keep it up!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="font-semibold mb-2">Savings Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Every litres saved is about $0.004. 
                  Your monthly savings of 200 litres = $24 saved!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};