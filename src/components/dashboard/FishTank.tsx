import React, { useEffect, useState } from 'react';
import { FishMood } from '@/types';
import { Droplets } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FishTankProps {
  fishMood: FishMood;
  fishName: string;
  fishColor: string;
}

export const FishTank: React.FC<FishTankProps> = ({ fishMood, fishName, fishColor }) => {
  const { toast } = useToast();

  const [bubbles, setBubbles] = useState<number[]>([]);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  const [fishPosition, setFishPosition] = useState({ x: 50, y: 50 });
  const [fishRotation, setFishRotation] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(3000);

  const [isTricking, setIsTricking] = useState(false);
  const [hasTricked, setHasTricked] = useState(false);

  useEffect(() => {
    if (fishMood.waterLevel >= 60) {
      if (!hasTricked) {
        toast({
          title: 'Your fish is doing tricks! 🎉',
          description: 'Great job! The water level is high, and your fish is showing off some tricks.',
          duration: 5000,
        });
        setHasTricked(true);
      }
      setIsTricking(true);
    } else {
      setHasTricked(false);
      setIsTricking(false);
      setFishRotation(0);
      setFishPosition({ x: 50, y: 50 });
    }
  }, [fishMood.waterLevel, toast, hasTricked]);

  useEffect(() => {
    if (!isTricking) return;

    const animate = () => {
      const newX = 10 + Math.random() * 80;
      const newY = 20 + Math.random() * 60;
      const newRotation = -45 + Math.random() * 90;
      const newSpeed = 1000 + Math.random() * 2000;

      setFishPosition({ x: newX, y: newY });
      setFishRotation(newRotation);
      setAnimationSpeed(newSpeed);
    };

    animate();
    const interval = setInterval(animate, animationSpeed);

    return () => clearInterval(interval);
  }, [isTricking, animationSpeed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => [...prev, Date.now()].slice(-6));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setShowSpeechBubble(true);
    const timer = setTimeout(() => setShowSpeechBubble(false), 4000);
    return () => clearTimeout(timer);
  }, [fishMood.message]);

  const getFishEmoji = () => {
    switch (fishMood.type) {
      case 'happy': return '🐠';
      case 'neutral': return '🐟';
      case 'concerned': return '🐡';
      default: return '🐠';
    }
  };

  const getFishExpression = () => {
    switch (fishMood.type) {
      case 'happy': return { eyes: '◉◉', mouth: '‿', color: 'text-teal-400' };
      case 'neutral': return { eyes: '●●', mouth: '—', color: 'text-ocean-400' };
      case 'concerned': return { eyes: '◔◔', mouth: '︵', color: 'text-coral' };
      default: return { eyes: '◉◉', mouth: '‿', color: 'text-teal-400' };
    }
  };

  const getWaterColor = () => {
    switch (fishMood.type) {
      case 'happy': return 'from-teal-500 to-teal-500';
      case 'neutral': return 'from-teal-500 to-teal-500';
      case 'concerned': return 'from-teal-500 to-teal-500';
      default: return 'from-aqua-400 to-teal-500';
    }
  };

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-80 bg-gradient-to-b from-ocean-50 to-ocean-100 overflow-hidden">
          <div className="absolute inset-2 rounded-lg border-4 border-white/30 backdrop-blur-sm" />

          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getWaterColor()} transition-all duration-1000 ease-out`}
            style={{ height: `${fishMood.waterLevel}%` }}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 animate-water-wave" />

            <div
              className="absolute transition-all ease-in-out"
              style={{
                left: `${fishPosition.x}%`,
                top: `${fishPosition.y}%`,
                transform: `translate(-50%, -50%) rotate(${fishRotation}deg)`,
                transitionDuration: `${animationSpeed}ms`,
              }}
            >
              <div className="relative">
                {showSpeechBubble && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-white/30 min-w-[120px] max-w-[200px]">
                      <p className="text-xs text-gray-700 text-center font-medium">
                        {fishMood.message.split(' ').slice(0, 8).join(' ')}...
                      </p>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/90"></div>
                    </div>
                  </div>
                )}

                <div className={`relative text-4xl animate-float`}>
                  <div className={`${getFishExpression().color} transition-colors duration-500`}>
                    {getFishEmoji()}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs leading-none transform scale-75 opacity-80">
                      <div className="text-gray-800">{getFishExpression().eyes}</div>
                      <div className="text-gray-800 mt-1">{getFishExpression().mouth}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {bubbles.map((bubble, index) => (
              <div
                key={bubble}
                className="absolute w-2 h-2 bg-white/60 rounded-full animate-bubble"
                style={{
                  left: `${20 + index * 15}%`,
                  bottom: '20%',
                  animationDelay: `${index * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Tank Decorations */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex justify-center space-x-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-2 bg-stone-400 rounded-full opacity-60" />
              ))}
            </div>

            <div className="absolute left-4 bottom-4">
              <div className="w-1 h-16 bg-green-500/60 rounded-t-full transform rotate-12" />
            </div>
            <div className="absolute right-6 bottom-4">
              <div className="w-1 h-12 bg-green-600/60 rounded-t-full transform -rotate-6" />
            </div>
          </div>

          <div className="absolute right-4 top-4 glass rounded-lg p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Droplets className="h-4 w-4 text-ocean" />
              <span className="font-medium">{fishMood.waterLevel}%</span>
            </div>
          </div>

          <div className="absolute left-4 top-4 glass rounded-lg p-3">
            <div className="text-sm">
              <p className="font-medium text-foreground">{fishName}</p>
              <p className="text-muted-foreground capitalize">{fishMood.type}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-ocean-50 to-aqua-50">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{getFishEmoji()}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{fishName} says:</p>
              <p className="text-sm text-muted-foreground mt-1">{fishMood.message}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
