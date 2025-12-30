import { useState } from 'react';
import { Search, Menu, X, Gamepad2, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Navbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg gradient-purple-cyan flex items-center justify-center glow-hover-purple">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-purple hidden sm:block">StreamHub</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن بث أو لعبة..."
                value={searchValue}
                onChange={handleSearch}
                className="w-full pr-10 bg-background border-border focus:border-primary transition-smooth text-right"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="btn-gaming">الرئيسية</Button>
            </Link>
            <Button variant="ghost" className="btn-gaming">المتابعين</Button>
            {isAdmin && (
              <Link to="/admin/dashboard">
                <Button variant="outline" className="btn-gaming border-primary/50 hover:border-primary">
                  <Crown className="w-4 h-4 ml-2" />
                  لوحة التحكم
                </Button>
              </Link>
            )}
            {!isAdmin && (
              <Link to="/admin/login">
                <Button className="gradient-purple-cyan btn-gaming glow-hover-purple">تسجيل الدخول</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن بث أو لعبة..."
                value={searchValue}
                onChange={handleSearch}
                className="w-full pr-10 bg-background border-border text-right"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">الرئيسية</Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start">المتابعين</Button>
            <Button className="w-full gradient-purple-cyan glow-hover-purple">تسجيل الدخول</Button>
          </div>
        </div>
      )}
    </nav>
  );
}