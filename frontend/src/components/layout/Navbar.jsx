import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { ROUTES } from '@/utils/constants';
import { selectIsAuthenticated, selectUser } from '@/store/slices/authSlice';
import { clearAuthData } from '@/utils/storage';

/**
 * Navbar Component
 * Responsive top navigation bar providing access to main features and user profile.
 */
export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    clearAuthData();
    window.location.href = ROUTES.LOGIN;
  };

  return (
    <nav className="w-full  dark:bg-surface border-b border-gray-200 dark:border-border z-50 h-16 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">

          {/* Brand */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg leading-none">{'</>'}</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">CodeShastra</span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex space-x-8 text-sm font-semibold text-gray-700 dark:text-gray-200">
            <Link to={ROUTES.DASHBOARD} className="hover:text-primary hover:underline underline-offset-4 decoration-2 transition-all">Dashboard</Link>
            <Link to={ROUTES.LABS} className="hover:text-primary hover:underline underline-offset-4 decoration-2 transition-all">Courses</Link>
            <Link to={ROUTES.DEBUGGING_LAB} className="hover:text-primary hover:underline underline-offset-4 decoration-2 transition-all">Debugging Lab</Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
                  Hi, {user?.name || 'Student'}
                </span>

                <button
                  onClick={() => navigate(ROUTES.DASHBOARD)}
                  className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Profile"
                >
                  <FiUser size={20} />
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  aria-label="Log out"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to={ROUTES.LOGIN}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md shadow-sm transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
