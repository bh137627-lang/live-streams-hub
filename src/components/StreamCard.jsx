import { Users, Eye, Youtube, Twitch, Video, Facebook } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';

const platformIcons = {
  'Twitch': { icon: Twitch, color: 'text-purple-500' },
  'YouTube': { icon: Youtube, color: 'text-red-500' },
  'Facebook': { icon: Facebook, color: 'text-blue-500' },
  'TikTok': { icon: Video, color: 'text-pink-500' },
  'Kick': { icon: Video, color: 'text-green-500' },
};

export default function StreamCard({ stream }) {
  const PlatformIcon = platformIcons[stream.platform]?.icon;
  const platformColor = platformIcons[stream.platform]?.color;

  return (
    <Link to={`/watch/${stream.id}`}>
      <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer glow-hover-purple">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img 
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Live badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-red-600 hover:bg-red-600 text-white font-semibold live-pulse">
              <span className="w-2 h-2 bg-white rounded-full ml-1 animate-pulse"></span>
              مباشر
            </Badge>
          </div>
          
          {/* Viewers count */}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
            <Users className="w-3 h-3" />
            {stream.viewers.toLocaleString('ar-EG')}
          </div>
          
          {/* Platform icon */}
          <div className="absolute top-3 right-3">
            {PlatformIcon && (
              <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center">
                <PlatformIcon className={`w-4 h-4 ${platformColor}`} />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Streamer info */}
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="w-10 h-10 border-2 border-primary/30">
              <AvatarImage src={stream.avatar} alt={stream.streamer} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {stream.streamer.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug text-base">
                {stream.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{stream.streamer}</p>
            </div>
          </div>

          {/* Game and category */}
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
              {stream.game}
            </Badge>
            <span className="text-muted-foreground text-xs">{stream.category}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}