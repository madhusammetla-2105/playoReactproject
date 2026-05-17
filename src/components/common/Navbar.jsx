import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useContexts';
import Button from './Button';
import { User, Sun, Moon, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="p-4 bg-cardBg shadow-md sticky top-0 z-50 border-b border-borderColor transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-bgDark group-hover:rotate-12 transition-transform">P</div>
          <span>Playo</span>
        </Link>
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-bgDark transition-all duration-300 text-textGray hover:text-primary border border-transparent hover:border-borderColor"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-400" />}
          </button>
          {!isLoginPage && location.pathname !== '/' && (
            <Link to="/grounds" className="text-textGray hover:text-primary transition-colors font-semibold">Grounds</Link>
          )}
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-bgDark border border-borderColor hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 group-hover:bg-primary group-hover:text-bgDark transition-colors">
                  <User size={18} />
                </div>
                <span className="text-sm font-bold text-textWhite hidden md:block">{user.name || 'User'}</span>
                <ChevronDown size={16} className={`text-textGray transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 bg-cardBg border border-borderColor rounded-2xl shadow-2xl z-20 overflow-hidden">
                    <div className="p-4 border-b border-borderColor bg-bgDark/50">
                      <p className="text-xs text-textGray font-bold uppercase tracking-wider mb-1">Signed in as</p>
                      <p className="text-sm font-bold text-textWhite truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-textGray hover:bg-primary/10 hover:text-primary transition-colors font-medium"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors font-medium"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary" className="py-2 px-6 text-sm font-bold shadow-lg shadow-primary/20">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
