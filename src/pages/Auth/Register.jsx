import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import AuthLayout from '../../components/layouts/AuthLayout';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, call register service. For mock, just redirect to login.
    alert("Mock Registration Successful! Please login.");
    navigate('/login');
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-extrabold text-textWhite mb-2">
            Create an account
          </h2>
          <p className="text-textGray">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-hoverGreen transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textGray mb-1">Full Name</label>
              <input
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 bg-cardBg placeholder-gray-500 text-textWhite rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

