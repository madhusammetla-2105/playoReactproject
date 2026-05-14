import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useContexts';
import Button from './Button';
import { User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="p-4 bg-cardBg shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <span>Playo</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/grounds" className="text-textGray hover:text-primary transition-colors">Grounds</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-textGray hover:text-primary transition-colors flex items-center">
                <User size={22} />
              </Link>
              <Button variant="outline" onClick={handleLogout} className="py-1 px-3 text-sm">Logout</Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="primary" className="py-1 px-3 text-sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
