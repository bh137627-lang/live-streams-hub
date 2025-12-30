import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Heart, Share2, ThumbsUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import ChatBox from '../components/ChatBox';
import StreamInfo from '../components/StreamInfo';
import { Button } from '../components/ui/button';
import { mockStreams } from '../data/mockData';
import { toast } from 'sonner';

export default function WatchPage() {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Find the stream by ID
    const foundStream = mockStreams.find(s => s.id === parseInt(streamId));
    if (foundStream) {
      setStream(foundStream);
    } else {
      toast.error('البث غير موجود');
      navigate('/');
    }
  }, [streamId, navigate]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'تم إلغاء المتابعة' : 'تمت المتابعة بنجاح!');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'تم إلغاء الإعجاب' : 'تم الإعجاب!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('تم نسخ الرابط!');
  };

  if (!stream) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="shimmer h-8 w-64 mx-auto rounded-lg mb-4"></div>
            <div className="shimmer h-4 w-48 mx-auto rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          العودة للرئيسية
        </Button>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video player and info - 2/3 width */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            <div className="relative aspect-video bg-card rounded-lg overflow-hidden border border-border glow-hover-purple">
              <img 
                src={stream.thumbnail}
                alt={stream.title}
                className="w-full h-full object-cover"
              />
              {/* Live indicator overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-3">
                <div className="bg-red-600 text-white px-3 py-1 rounded-md font-semibold text-sm flex items-center gap-2 live-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  مباشر
                </div>
                <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-md font-medium text-sm flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {stream.viewers.toLocaleString('ar-EG')}
                </div>
              </div>
              
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm hover:bg-black/20 transition-smooth cursor-pointer group">
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-smooth glow-purple">
                  <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Stream Info */}
            <StreamInfo stream={stream} />

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleFollow}
                variant={isFollowing ? "secondary" : "default"}
                className="flex-1 sm:flex-initial btn-gaming"
              >
                <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'تمت المتابعة' : 'متابعة'}
              </Button>
              <Button 
                onClick={handleLike}
                variant="outline"
                className="flex-1 sm:flex-initial btn-gaming border-primary/50 hover:border-primary"
              >
                <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current text-primary' : ''}`} />
                إعجاب
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline"
                className="flex-1 sm:flex-initial btn-gaming border-secondary/50 hover:border-secondary"
              >
                <Share2 className="w-4 h-4 mr-2" />
                مشاركة
              </Button>
            </div>
          </div>

          {/* Chat box - 1/3 width */}
          <div className="lg:col-span-1">
            <ChatBox streamId={stream.id} streamerName={stream.streamer} />
          </div>
        </div>
      </div>
    </div>
  );
}