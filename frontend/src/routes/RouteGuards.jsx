import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectRole } from '@/store/slices/authSlice';
import { ROUTES } from '@/utils/constants';

/**
 * ProtectedRoute
 * Requires user to be authenticated.
 * Optionally accepts a `requiredRole` prop for role-based access control.
 * Saves the attempted URL in state for redirect-after-login.
 */
export function ProtectedRoute({ requiredRole = null }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectRole);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}

/**
 * PublicOnlyRoute
 * Redirects authenticated users away from /login and /signup.
 * Prevents logged-in users from accessing auth pages.
 */
export function PublicOnlyRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}
