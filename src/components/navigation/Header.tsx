import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/contexts/AuthContext';
import { Fish, Trophy, Settings, User, LogOut, Bell, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'tip' | 'goal';
  timestamp: Date;
  isRead: boolean;
}

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Great Job! 🎉',
      message: 'You saved 15% more water this week compared to last week!',
      type: 'achievement',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false
    },
    {
      id: '2',
      title: 'Water Tip 💡',
      message: 'Try taking 5-minute showers to save up to 25 litrelons per day.',
      type: 'tip',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: false
    },
    {
      id: '3',
      title: 'Daily Goal Reminder 🎯',
      message: 'You\'re 85% towards your daily water saving goal. Keep it up!',
      type: 'goal',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'tip': return '💡';
      case 'goal': return '🎯';
      default: return '📢';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <header className="glass border-b sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Fish className="h-8 w-8 text-ocean animate-float" />
              <div className="absolute -top-1 -right-1">
                <div className="w-3 h-3 bg-aqua rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                FISHY
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Water Saving Pet
              </p>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <div className="flex items-center space-x-2 glass rounded-full px-3 py-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="font-medium text-sm">{user?.points?.toLocaleString()}</span>
            </div>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              
              <PopoverContent className="w-80 p-0 glass" align="end">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Notifications</CardTitle>
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={markAllAsRead}
                          className="text-xs h-auto p-1 hover:bg-muted/50"
                        >
                          Mark all read
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No notifications yet</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 border-b last:border-b-0 hover:bg-muted/30 transition-colors ${
                                !notification.isRead ? 'bg-primary/5' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                  <span className="text-lg flex-shrink-0 mt-0.5">
                                    {getNotificationIcon(notification.type)}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium text-sm truncate">
                                        {notification.title}
                                      </h4>
                                      {!notification.isRead && (
                                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                      )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {formatTimestamp(notification.timestamp)}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex gap-1 flex-shrink-0">
                                  {!notification.isRead && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => markAsRead(notification.id)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <Check className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeNotification(notification.id)}
                                    className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-ocean text-white font-medium">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-56 glass" align="end">
                <div className="p-2">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Household Settings
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};