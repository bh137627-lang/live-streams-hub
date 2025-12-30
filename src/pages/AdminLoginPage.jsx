import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Lock, Mail, Crown } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    setLoading(true);
    
    // محاكاة تأخير بسيط
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const result = login(email.trim(), password.trim());
      
      if (result && result.success) {
        toast.success('مرحباً بك! تم تسجيل الدخول بنجاح 👑');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 800);
      } else {
        toast.error('بيانات الدخول غير صحيحة. جرب: admin@streamhub.com / admin123');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('حدث خطأ. جرب مرة أخرى');
      setLoading(false);
    }
  };

  const quickLogin = async () => {
    setLoading(true);
    setEmail('admin@streamhub.com');
    setPassword('admin123');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const result = login('admin@streamhub.com', 'admin123');
      
      if (result && result.success) {
        toast.success('مرحباً بك! تم تسجيل الدخول بنجاح 👑');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 800);
      } else {
        toast.error('حدث خطأ في تسجيل الدخول');
        setLoading(false);
      }
    } catch (error) {
      console.error('Quick login error:', error);
      toast.error('حدث خطأ. جرب مرة أخرى');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card border-border">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full gradient-purple-cyan flex items-center justify-center glow-purple">
            <Crown className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gradient-purple">
            لوحة تحكم المالك
          </h1>
          <p className="text-muted-foreground">
            سجل دخول للوصول إلى إعدادات التطبيق
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="admin@streamhub.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-10 text-right"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 text-right"
                disabled={loading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full gradient-purple-cyan glow-hover-purple btn-gaming"
            size="lg"
            disabled={loading}
          >
            <Lock className="w-5 h-5 ml-2" />
            {loading ? 'جاري التسجيل...' : 'تسجيل الدخول'}
          </Button>

          {/* Quick Login Button */}
          <Button
            type="button"
            onClick={quickLogin}
            className="w-full bg-secondary hover:bg-secondary/90 text-background btn-gaming"
            size="lg"
            disabled={loading}
          >
            <Crown className="w-5 h-5 ml-2" />
            دخول سريع للمالك (بنقرة واحدة)
          </Button>
        </form>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
            disabled={loading}
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
          <p className="text-xs text-center text-muted-foreground">
            💡 بيانات الدخول:
            <br />
            <span className="font-mono text-primary font-bold text-sm">admin@streamhub.com</span>
            <br />
            <span className="font-mono text-primary font-bold text-sm">admin123</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
