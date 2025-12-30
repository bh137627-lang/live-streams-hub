import { Button } from './ui/button';
import { Gamepad2, Youtube, Twitch, Video, Facebook } from 'lucide-react';

const platforms = [
  { id: 'all', name: 'الكل', icon: null },
  { id: 'twitch', name: 'Twitch', icon: Twitch, color: 'text-purple-500' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
  { id: 'tiktok', name: 'TikTok', icon: Video, color: 'text-pink-500' },
  { id: 'kick', name: 'Kick', icon: Video, color: 'text-green-500' },
];

const games = [
  { id: 'all', name: 'جميع الألعاب' },
  { id: 'Valorant', name: 'Valorant' },
  { id: 'League of Legends', name: 'League of Legends' },
  { id: 'Fortnite', name: 'Fortnite' },
  { id: 'Call of Duty', name: 'Call of Duty' },
  { id: 'FIFA 24', name: 'FIFA 24' },
  { id: 'Minecraft', name: 'Minecraft' },
  { id: 'CS2', name: 'Counter-Strike 2' },
  { id: 'GTA V', name: 'GTA V' },
  { id: 'Apex Legends', name: 'Apex Legends' },
  { id: 'Dota 2', name: 'Dota 2' },
  { id: 'PUBG Mobile', name: 'PUBG Mobile' },
  { id: 'Free Fire', name: 'Free Fire' },
  { id: 'Mobile Legends', name: 'Mobile Legends' },
  { id: 'Call of Duty Mobile', name: 'Call of Duty Mobile' },
  { id: 'Among Us', name: 'Among Us' },
  { id: 'Roblox', name: 'Roblox' },
  { id: 'Rocket League', name: 'Rocket League' },
  { id: 'Overwatch 2', name: 'Overwatch 2' },
  { id: 'World of Warcraft', name: 'World of Warcraft' },
];

export default function FilterBar({ selectedPlatform, setSelectedPlatform, selectedGame, setSelectedGame }) {
  return (
    <div className="space-y-6 mb-8">
      {/* Platforms */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" />
          المنصات
        </h3>
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatform === platform.id;
            return (
              <Button
                key={platform.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform(platform.id)}
                className={`btn-gaming transition-smooth ${
                  isSelected 
                    ? 'gradient-purple-cyan glow-purple' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ml-2 ${!isSelected ? platform.color : ''}`} />}
                {platform.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Games */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">الألعاب</h3>
        <div className="flex flex-wrap gap-2">
          {games.map((game) => {
            const isSelected = selectedGame === game.id;
            return (
              <Button
                key={game.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGame(game.id)}
                className={`btn-gaming transition-smooth ${
                  isSelected 
                    ? 'bg-primary hover:bg-primary/90 glow-purple' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {game.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}