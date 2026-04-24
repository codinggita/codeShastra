import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
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
    // TODO: Connect to backend API via authService.register
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful registration
      navigate(ROUTES.DASHBOARD);
    }, 1500);
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
