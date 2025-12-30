import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useStatsStore from '../store/statsStore';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Crown, LogOut, Users, Eye, TrendingUp, 
  Video, Settings, BarChart3, ArrowLeft, Download, Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { mockStreams } from '../data/mockData';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, adminEmail, logout } = useAuthStore();
  const { 
    totalInstalls, 
    totalVisits, 
    currentViewers,
    getTodayVisits,
    getWeekVisits 
  } = useStatsStore();

  useEffect(() => {
    if (!isAdmin) {
      toast.error('يجب تسجيل الدخول أولاً');
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('تم تسجيل الخروج بنجاح');
    navigate('/');
  };

  if (!isAdmin) return null;

  // Calculate stats
  const totalStreams = mockStreams.length;
  const totalViewers = mockStreams.reduce((sum, stream) => sum + stream.viewers, 0);
  const todayVisits = getTodayVisits();
  const weekVisits = getWeekVisits();
  const platformCounts = mockStreams.reduce((acc, stream) => {
    acc[stream.platform] = (acc[stream.platform] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    {
      title: 'تحميلات التطبيق',
      value: totalInstalls,
      icon: Download,
      color: 'text-primary',
      bg: 'bg-primary/10',
      description: 'إجمالي التحميلات',
    },
    {
      title: 'المشاهدين الآن',
      value: currentViewers,
      icon: Activity,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      description: 'متصلين حالياً',
    },
    {
      title: 'زوار اليوم',
      value: todayVisits,
      icon: Users,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
      description: 'خلال 24 ساعة',
    },
    {
      title: 'إجمالي الزيارات',
      value: totalVisits,
      icon: Eye,
      color: 'text-accent',
      bg: 'bg-accent/10',
      description: 'منذ الإطلاق',
    },
    {
      title: 'إجمالي البثوث',
      value: totalStreams,
      icon: Video,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      description: 'بثوث متاحة',
    },
    {
      title: 'زوار الأسبوع',
      value: weekVisits,
      icon: TrendingUp,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      description: 'آخر 7 أيام',
    },
    {
      title: 'مشاهدين البثوث',
      value: totalViewers.toLocaleString('ar-EG'),
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      description: 'على جميع البثوث',
    },
    {
      title: 'المنصات النشطة',
      value: Object.keys(platformCounts).length,
      icon: BarChart3,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      description: 'منصات متصلة',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gradient-purple-cyan flex items-center justify-center glow-purple">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">لوحة تحكم المالك</h1>
                <p className="text-sm text-muted-foreground">{adminEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="btn-gaming"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                التطبيق
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="btn-gaming"
              >
                <LogOut className="w-4 h-4 mr-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">مرحباً بك! 👑</h2>
          <p className="text-muted-foreground">
            هذه لوحة التحكم الخاصة بك كمالك للتطبيق
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-smooth glow-hover-purple">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm font-semibold text-foreground mb-1">{stat.title}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Real-time Stats Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  {currentViewers} مشاهد متصل الآن 🔴
                </h3>
                <p className="text-muted-foreground">
                  {totalInstalls} تحميل للتطبيق | {todayVisits} زيارة اليوم
                </p>
              </div>
            </div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground mb-1">معدل النمو</div>
              <div className="text-2xl font-bold text-green-500">
                +{weekVisits > 0 ? Math.round((todayVisits / weekVisits) * 100) : 0}%
              </div>
            </div>
          </div>
        </Card>

        {/* Platform Distribution */}
        <Card className="p-6 mb-8 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">توزيع المنصات</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(platformCounts).map(([platform, count]) => (
              <div key={platform} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{platform}</span>
                  </div>
                  <span className="text-foreground font-medium">{platform}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-purple-cyan"
                      style={{ width: `${(count / totalStreams) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-foreground font-semibold min-w-[3rem] text-left">
                    {count} بث
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">إجراءات سريعة</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              className="btn-gaming justify-start h-auto py-4"
              variant="outline"
              onClick={() => toast.info('هذه الميزة قيد التطوير')}
            >
              <Video className="w-5 h-5 ml-3" />
              <div className="text-right">
                <div className="font-semibold">إضافة بث جديد</div>
                <div className="text-xs text-muted-foreground">إضافة بث يدوياً</div>
              </div>
            </Button>

            <Button
              className="btn-gaming justify-start h-auto py-4"
              variant="outline"
              onClick={() => toast.info('هذه الميزة قيد التطوير')}
            >
              <BarChart3 className="w-5 h-5 ml-3" />
              <div className="text-right">
                <div className="font-semibold">الإحصائيات المتقدمة</div>
                <div className="text-xs text-muted-foreground">تقارير مفصلة</div>
              </div>
            </Button>

            <Button
              className="btn-gaming justify-start h-auto py-4"
              variant="outline"
              onClick={() => toast.info('هذه الميزة قيد التطوير')}
            >
              <Settings className="w-5 h-5 ml-3" />
              <div className="text-right">
                <div className="font-semibold">إعدادات التطبيق</div>
                <div className="text-xs text-muted-foreground">تخصيص الإعدادات</div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}