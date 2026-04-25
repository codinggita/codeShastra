import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiGithub, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { loginSuccess } from '@/store/slices/authSlice';
import { authService } from '@/services/authService';

export const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setError('');
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.register(formData);
      
      // Assume API returns { token, user } in response.data upon successful registration
      const { user, token } = data;
      
      if (!token || !user) {
        throw new Error('Invalid response from server.');
      }

      dispatch(loginSuccess({ user, token }));
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="flat" padding="none" className="bg-transparent w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create an account</h2>
        <p className="text-sm text-gray-600">
          Join CodeShastra and start your learning journey today.
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <Button variant="outline" fullWidth leftIcon={<FcGoogle size={20} />} className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400">
          Sign up with Google
        </Button>
        <Button variant="outline" fullWidth leftIcon={<FiGithub size={20} />} className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400">
          Sign up with GitHub
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 rounded-full">Or continue with</span>
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
          id="name"
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          helperText="Must be at least 8 characters long."
          required
        />

        <div className="pt-2">
          <Button type="submit" variant="primary" fullWidth size="lg" isLoading={isLoading}>
            Create Account
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:text-indigo-600 transition-colors">
          Log in here
        </Link>
      </p>
    </Card>
  );
};

export default SignupPage;
