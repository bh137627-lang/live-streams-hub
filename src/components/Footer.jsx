import { Gamepad2, Mail, MessageCircle, Youtube, Twitch, Twitter, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-purple-cyan flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-purple">StreamHub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              منصة البث المباشر الشاملة - شاهد بثوث اللاعبين من جميع المنصات في مكان واحد
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <button type="button" className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth group">
                <Twitch className="w-5 h-5 text-muted-foreground group-hover:text-purple-500 transition-colors" />
              </button>
              <button type="button" className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth group">
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-red-500 transition-colors" />
              </button>
              <button type="button" className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth group">
                <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-colors" />
              </button>
              <button type="button" className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/20 flex items-center justify-center transition-smooth group">
                <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">الرئيسية</Link>
              </li>
              <li>
                <button type="button" className="text-muted-foreground hover:text-primary transition-colors">البثوث الشائعة</button>
              </li>
              <li>
                <button type="button" className="text-muted-foreground hover:text-primary transition-colors">الألعاب</button>
              </li>
              <li>
                <button type="button" className="text-muted-foreground hover:text-primary transition-colors">الستريمرز</button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">الدعم</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button type="button" className="text-muted-foreground hover:text-primary transition-colors">مركز المساعدة</button>
              </li>
              <li>
                <button type="button" className="text-muted-foreground hover:text-primary transition-colors">الأسئلة الشائعة</button>
              </li>
              <li>
                <button type="button" className="text-muted-foreground hover:text-primary transition-colors">سياسة الخصوصية</button>
              </li>
              <li>
                <button type="button" className="text-muted-foreground hover:text-primary transition-colors">الشروط والأحكام</button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">تواصل معنا</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button type="button" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  support@streamhub.com
                </button>
              </li>
              <li>
                <button type="button" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  المحادثة المباشرة
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 StreamHub. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}