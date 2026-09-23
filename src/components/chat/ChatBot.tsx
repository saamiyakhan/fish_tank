import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message:
        "Hi! I'm your water conservation assistant. I can help you reduce your water usage and answer questions about your consumption patterns. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes('sensor') || message.includes('smart') || message.includes('automatic')) {
      return "Smart water sensors can track usage in real-time! While I can't connect to physical sensors yet, I simulate how your fish would react to live data. For real sensor integration, you'd need backend connectivity! 📊";
    }

    if (message.includes('fish') && (message.includes('sad') || message.includes('unhappy') || message.includes('concerned'))) {
      return "Oh no! Your fish is concerned because water usage is high. Try these quick fixes: shorter showers, turn off taps while brushing teeth, and fix any leaks. Your fish will be happy again soon! 🐠💙";
    }

    if (message.includes('fish') && (message.includes('happy') || message.includes('good') || message.includes('swimming'))) {
      return "Fantastic! Your fish is thriving because you're doing great with water conservation! Keep up the excellent work - every litre saved helps our environment! 🐠✨";
    }

    if (message.includes('usage') || message.includes('how much')) {
      return "Based on your current data, you're using about 285 litres per week. That's 15% less than last week - great progress! Your main usage comes from the bathroom (45%) and kitchen (30%).";
    }

    if (message.includes('save') || message.includes('conserve') || message.includes('reduce')) {
      return "Excellent goal! Here are my top recommendations: 1) 5-minute showers save 25 litres, 2) Fix dripping faucets (saves 3,000 litres/year), 3) Full dishwasher loads only, 4) Turn off tap while brushing teeth. Your fish will love you for it! 💧🏆";
    }

    if (message.includes('bill') || message.includes('money') || message.includes('cost') || message.includes('expensive')) {
      return "Water conservation = money saved! A family can save $200-400 annually with simple changes. Plus, your fish stays happy, and you help the environment. It's a win-win-win! 💰🐠🌍";
    }

    if (message.includes('shower') || message.includes('bath')) {
      return "Shower smart! ⏰ Set a 5-minute timer, 🚿 use low-flow showerheads (save 2.5 litres/minute), 🎵 try shower playlists (2-3 songs = perfect shower time). Your fish will notice the difference! 🐠";
    }

    if (message.includes('points') || message.includes('score')) {
      return "You currently have 1,250 points! You earn points by: meeting daily goals (+20 pts), reducing usage compared to previous day (+10-50 pts), and completing weekly challenges (+100-500 pts). Keep up the great work!";
    }

    if (message.includes('goal') || message.includes('target')) {
      return "Your current daily goal is 300 litres, and you're at 85% of that goal today. For next week, I'd suggest aiming for 280 litres daily. Small reductions add up to big savings over time!";
    }

    if (message.includes('tip') || message.includes('advice')) {
      return "Here are my top 3 water-saving tips for you: 1) Take shorter showers (save 10 litre/day), 2) Run dishwasher only when full (save 8 litre/load), 3) Fix that small bathroom faucet leak (save 50+ litre/month). Want specific advice for any room?";
    }

    const responses = [
      "That's an interesting question! Based on your current usage patterns, I'd recommend focusing on your bathroom usage first, as that's your highest consumption area.",
      "I can help you with that! Your water usage has been trending downward this week, which is fantastic. Keep up the conservation efforts!",
      "Great question! Looking at your data, you're already doing well compared to your neighbors. Have you considered trying our weekly challenges for extra points?",
      "I'm here to help! Your fish is depending on you to keep that water level up through conservation. What specific area would you like to improve?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: generateResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-ocean hover:opacity-90 shadow-lg z-50 animate-float"
        size="sm"
        aria-label="Open chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 glass shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex justify-between items-center p-4 pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-ocean rounded-lg">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">FISHY Assistant</h3>
            <p className="text-xs text-green-600">● Online</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 p-0 hover:bg-destructive/10"
          aria-label="Close chatbot"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col p-0 flex-1 overflow-hidden">
        <ScrollArea className="flex-1 p-4" style={{ height: '100%', overflowY: 'auto' }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[85%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg ${
                      message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="h-3 w-3" />
                    ) : (
                      <Bot className="h-3 w-3" />
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-lg text-sm ${
                      message.type === 'user' ? 'bg-gradient-ocean text-white' : 'bg-card border'
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t flex flex-col">
          <div className="flex space-x-2 mb-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about water usage..."
              className="text-sm flex-grow"
              aria-label="Chat input"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-ocean hover:opacity-90"
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {['My usage today', 'Water saving tips', 'How is my fish?'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInputValue(suggestion)}
                className="px-2 py-1 bg-muted hover:bg-muted/80 rounded text-muted-foreground hover:text-foreground transition-colors"
                type="button"
                aria-label={`Insert suggestion: ${suggestion}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
