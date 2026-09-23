import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Lock, Users, Home, MapPin, Loader2 } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    householdSize: '',
    houseType: '',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { register, isLoading } = useAuth();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.householdSize) {
      newErrors.householdSize = 'Household size is required';
    }
    
    if (!formData.houseType) {
      newErrors.houseType = 'House type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await register({
      ...formData,
      householdSize: parseInt(formData.householdSize),
      houseType: formData.houseType as 'apartment' | 'house',
    });
    
    if (success) {
      toast({
        title: "Welcome to FISHY! 🐠",
        description: "Your account has been created. Meet your new water-saving companion!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
      });
    }
  };

  return (
    <Card className="glass w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
          Join FISHY
        </CardTitle>
        <CardDescription>
          Create your account and get your water-saving fish companion
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`pl-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="householdSize">Household Size</Label>
              <Select 
                value={formData.householdSize} 
                onValueChange={(value) => handleInputChange('householdSize', value)}
                disabled={isLoading}
              >
                <SelectTrigger className={errors.householdSize ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} {size === 1 ? 'person' : 'people'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.householdSize && (
                <p className="text-sm text-destructive">{errors.householdSize}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="houseType">House Type</Label>
              <Select 
                value={formData.houseType} 
                onValueChange={(value) => handleInputChange('houseType', value)}
                disabled={isLoading}
              >
                <SelectTrigger className={errors.houseType ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                </SelectContent>
              </Select>
              {errors.houseType && (
                <p className="text-sm text-destructive">{errors.houseType}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="City, State"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-ocean hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-primary hover:underline font-medium"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};