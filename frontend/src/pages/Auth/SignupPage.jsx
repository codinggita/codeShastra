import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiGithub, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { loginSuccess } from '@/store/slices/authSlice';
import authService from '@/services/authService';

export const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus('');
      try {
        const response = await authService.register(values);
        
        const token = response.token;
        const user = { id: response._id, name: response.name, email: response.email, role: 'student' };
        
        dispatch(loginSuccess({ user, token }));
        toast.success('Account created successfully!');
        navigate(ROUTES.DASHBOARD, { replace: true });
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
        setStatus(errorMessage);
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

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

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Error Banner */}
        {formik.status && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{formik.status}</span>
          </div>
        )}
        
        <Input
          id="name"
          label="Full Name"
          placeholder="John Doe"
          {...formik.getFieldProps('name')}
          error={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
          required
        />
        
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
          required
        />
        
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
          helperText={!formik.errors.password ? "Must be at least 8 characters long." : ""}
          required
        />

        <div className="pt-2">
          <Button type="submit" variant="primary" fullWidth size="lg" isLoading={formik.isSubmitting}>
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
