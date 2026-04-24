import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to backend API via authService.login
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login
      navigate(ROUTES.DASHBOARD);
    }, 1500);
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
