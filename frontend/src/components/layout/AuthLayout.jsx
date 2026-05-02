import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { ROUTES } from '@/utils/constants';

/**
 * AuthLayout
 * A split-screen layout used for authentication pages (Login, Sign-Up).
 * - Left side: Static branding, value propositions, and dynamic visuals.
 * - Right side: The dynamic form area (rendered via React Router <Outlet />).
 */
export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ── Left Panel: Branding (Hidden on mobile, takes 50% width on md+) ── */}
      <div className="hidden md:flex md:w-1/2 bg-primary flex-col justify-between p-12 text-white">
        <div>
          <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-12 cursor-pointer transition-opacity hover:opacity-80">
            {/* Placeholder for Logo, using stylized text for now */}
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <span className="text-primary font-bold text-xl leading-none">{'</>'}</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">CodeShastra</span>
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Master Code <br />
            <span className="text-indigo-200">The Industry Way</span>
          </h1>
          <p className="text-lg text-indigo-100 max-w-md mb-12">
            Bridge the gap between academic theory and real-world software engineering with our interactive, project-based curriculum.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FiCheckCircle className="w-6 h-6 text-indigo-300 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg">Curated Path</h3>
                <p className="text-indigo-200 text-sm">Follow a structured learning roadmap designed by industry veterans.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiCheckCircle className="w-6 h-6 text-indigo-300 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-lg">Expert Mentorship</h3>
                <p className="text-indigo-200 text-sm">Get 1-on-1 guidance, code reviews, and career advice from professionals.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-indigo-300/80">
          © {new Date().getFullYear()} CodeShastra. All rights reserved.
        </div>
      </div>

      {/* ── Right Panel: Dynamic Form Area ── */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <Link to={ROUTES.HOME} className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <FiArrowLeft size={16} /> Back to Home
        </Link>
        <div className="w-full max-w-md mt-8 md:mt-0">
          {/* Mobile-only logo */}
          <div className="md:hidden flex justify-center mb-8">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
               <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl leading-none">{'</>'}</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">CodeShastra</span>
            </Link>
          </div>
          
          {/* The specific page content (Login or Signup form) goes here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
