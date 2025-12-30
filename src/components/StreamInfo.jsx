import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Users, Clock } from 'lucide-react';

export default function StreamInfo({ stream }) {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar className="w-16 h-16 border-2 border-primary/30">
          <AvatarImage src={stream.avatar} alt={stream.streamer} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            {stream.streamer.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {stream.title}
          </h1>

          {/* Streamer name */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary">{stream.streamer}</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              {stream.platform}
            </Badge>
          </div>

          {/* Stats and info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{stream.viewers.toLocaleString('ar-EG')} مشاهد</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{stream.duration}</span>
            </div>
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0">
              {stream.game}
            </Badge>
            <span className="text-muted-foreground">{stream.category}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}