import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiGithub, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { loginSuccess } from '@/store/slices/authSlice';
import authService from '@/services/authService';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Redirect back to the page the user tried to visit, or dashboard
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setError(''); // clear error on each keystroke
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      // ── LocalStorage-based robust mock auth ────────────────────────────
      // In production: replace this block with authService.login(formData)
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const existingUsers = JSON.parse(localStorage.getItem('cs_mock_users') || '[]');
      const storedUser = existingUsers.find(u => u.email === formData.email);

      // Backwards compatibility with the single-user mock from earlier
      const oldSingleUser = JSON.parse(localStorage.getItem('cs_mock_user') || 'null');
      let targetUser = storedUser;
      
      if (!targetUser && oldSingleUser && oldSingleUser.email === formData.email) {
        targetUser = oldSingleUser;
      }

      if (!targetUser) {
        throw new Error('No account found with this email. Please sign up first.');
      }
      if (targetUser.password !== formData.password) {
        throw new Error('Incorrect password. Please try again.');
      }

      // Build a mock JWT-like token
      const mockToken = btoa(JSON.stringify({ id: targetUser.id, email: targetUser.email }));
      const user = { id: targetUser.id, name: targetUser.name, email: targetUser.email, role: 'student' };

      dispatch(loginSuccess({ user, token: mockToken }));
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="flat" padding="none" className="bg-transparent w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-sm text-gray-600">
          Log in to continue your journey with CodeShastra.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <Button variant="outline" fullWidth leftIcon={<FcGoogle size={20} />} className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400">
          Log in with Google
        </Button>
        <Button variant="outline" fullWidth leftIcon={<FiGithub size={20} />} className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400">
          Log in with GitHub
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 rounded-full">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error Banner */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Link to="#" className="text-xs font-medium text-primary hover:text-indigo-600">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            containerClassName="mt-0" // Reset margin top to avoid double spacing
          />
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" fullWidth size="lg" isLoading={isLoading}>
            Sign In
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to={ROUTES.SIGNUP} className="font-medium text-primary hover:text-indigo-600 transition-colors">
          Sign up here
        </Link>
      </p>
    </Card>
  );
};

export default LoginPage;
