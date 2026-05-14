import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useContexts';
import Button from '../../components/common/Button';
import AuthLayout from '../../components/layouts/AuthLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-extrabold text-textWhite mb-2">
            Welcome Back
          </h2>
          <p className="text-textGray">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-hoverGreen transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textGray mb-1">Email address</label>
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 bg-cardBg placeholder-gray-500 text-textWhite rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textGray mb-1">Password</label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 bg-cardBg placeholder-gray-500 text-textWhite rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full flex justify-center py-3 text-lg font-bold shadow-lg shadow-primary/20"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
          
          <div className="text-center text-xs text-textGray mt-6 pt-6 border-t border-gray-800">
            <p>Mock Credentials Note:</p>
            <p className="mt-1">Must be a valid @gmail.com address.</p>
            <p>Any password is accepted.</p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

