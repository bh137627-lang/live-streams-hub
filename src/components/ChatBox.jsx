import { useState, useEffect, useRef } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';

// Mock chat messages
const generateMockMessages = (streamerName) => [
  { id: 1, user: 'أحمد', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed', message: 'مرحبا بالجميع! 🎮', timestamp: '10:30' },
  { id: 2, user: 'سارة', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', message: 'بث رائع يا ' + streamerName, timestamp: '10:31' },
  { id: 3, user: 'محمد', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed', message: 'كم النتيجة الآن؟', timestamp: '10:32' },
  { id: 4, user: 'فاطمة', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima', message: 'يلعب احترافي! 🔥', timestamp: '10:33' },
  { id: 5, user: 'علي', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ali', message: 'متابع جديد هنا', timestamp: '10:34' },
];

export default function ChatBox({ streamId, streamerName }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    // Load initial messages
    setMessages(generateMockMessages(streamerName));

    // Simulate new messages coming in
    const interval = setInterval(() => {
      const randomMessages = [
        'رائع! 🎯',
        'يا الله! 😱',
        'استمر! 💪',
        'لعبة قوية 🔥',
        'متابع جديد هنا 👋',
        'أحسنت! 👏',
        'كيف فعلت ذلك؟ 🤔',
      ];
      
      const randomUsers = ['خالد', 'نور', 'ياسر', 'مريم', 'عمر', 'لينا'];
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          user: randomUser,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUser}`,
          message: randomMessage,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 5000); // New message every 5 seconds

    return () => clearInterval(interval);
  }, [streamerName]);

  useEffect(() => {
    // Auto scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: 'أنت',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <Card className="flex flex-col h-[600px] bg-card border-border">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <h3 className="font-semibold text-foreground flex items-center justify-between">
          <span>المحادثة المباشرة</span>
          <span className="text-xs text-muted-foreground font-normal">
            {messages.length} رسالة
          </span>
        </h3>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={msg.avatar} alt={msg.user} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {msg.user.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={`flex-1 ${msg.isOwn ? 'text-right' : ''}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-sm font-medium ${msg.isOwn ? 'text-primary' : 'text-foreground'}`}>
                    {msg.user}
                  </span>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <div className={`inline-block px-3 py-2 rounded-lg text-sm ${
                  msg.isOwn 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}>
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-muted/30">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            placeholder="اكتب رسالتك..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-background border-border focus:border-primary text-right"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            className="flex-shrink-0 hover:bg-primary/10"
          >
            <Smile className="w-5 h-5" />
          </Button>
          <Button 
            type="submit" 
            size="icon"
            className="flex-shrink-0 gradient-purple-cyan glow-hover-purple"
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
}