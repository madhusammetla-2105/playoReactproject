import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useContexts';
import Loader from '../components/common/Loader';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!user) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    // If route requires admin but user is not admin, redirect to standard dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
