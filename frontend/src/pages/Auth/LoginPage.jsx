import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiGithub, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

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

  // Redirect back to the page the user tried to visit, or dashboard
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus('');
      try {
        const response = await authService.login(values);
        
        const token = response.token;
        const user = { id: response._id, name: response.name, email: response.email, role: 'student' };
        
        dispatch(loginSuccess({ user, token }));
        toast.success('Successfully logged in!');
        navigate(from, { replace: true });
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please try again.';
        setStatus(errorMessage);
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card variant="flat" padding="none" className="bg-transparent w-full">
      <Helmet>
        <title>Log In | CodeShastra</title>
        <meta name="description" content="Log in to continue your journey with CodeShastra." />
      </Helmet>

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

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Error Banner */}
        {formik.status && (
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <FiAlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{formik.status}</span>
          </div>
        )}
        
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="you@example.com"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
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
            {...formik.getFieldProps('password')}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
            required
            containerClassName="mt-0"
          />
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" fullWidth size="lg" isLoading={formik.isSubmitting}>
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
