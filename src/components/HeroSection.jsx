import { Play, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-dark border-b border-border">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1614179524047-e1ab49a0a0cf"
          alt="Gaming Setup"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 glow-purple">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">منصة البث المباشر الأولى</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            شاهد البث المباشر
            <br />
            <span className="text-gradient-purple">من جميع المنصات</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            استمتع بمشاهدة بثوث اللاعبين المفضلين لديك من يوتيوب، تويتش، وكيك في مكان واحد بدون الحاجة للتنقل بين المنصات
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="gradient-purple-cyan btn-gaming text-base sm:text-lg px-8 glow-hover-purple group"
            >
              <Play className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              ابدأ المشاهدة الآن
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 hover:border-primary btn-gaming text-base sm:text-lg px-8"
            >
              اكتشف البثوث الشائعة
            </Button>
          </div>

          {/* Stats */}
          <div className="pt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-gradient-cyan">+10K</div>
              <div className="text-xs sm:text-sm text-muted-foreground">بث مباشر</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-gradient-purple">+50K</div>
              <div className="text-xs sm:text-sm text-muted-foreground">ستريمر نشط</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-gradient-cyan">+1M</div>
              <div className="text-xs sm:text-sm text-muted-foreground">مشاهد يومي</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}