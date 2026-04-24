import React from 'react';
import { Card } from '@/components/ui/Card';

const MethodologySection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Visual Area */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0">
            {/* Background Image / Mockup Base */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800 aspect-square flex flex-col">
               {/* Minimalist browser/editor header */}
               <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
               </div>
               {/* Editor body mock */}
               <div className="flex-1 p-6 flex flex-col gap-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3 mt-4"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/3"></div>
               </div>
               
               {/* Dark overlay for aesthetic */}
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Floating Testimonial Card */}
            <Card padding="md" variant="elevated" className="absolute -bottom-10 -right-4 md:-right-10 w-80 shadow-2xl bg-white/95 backdrop-blur z-10 border border-gray-100 transform rotate-[-2deg]">
              <p className="text-gray-800 font-medium leading-snug mb-4 text-sm">
                "I learned more in 3 weeks at CodeCraft than in 4 years of University."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  A
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Alex Rivera</div>
                  <div className="text-xs text-gray-500">Full Stack</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:pl-8 pt-10 lg:pt-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              The Modern <span className="text-primary italic">Atelier</span> for Engineers.
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We replace passive watching with active building. Our challenges are ripped from real industry sprints, designed to force the problem-solving muscles required at senior levels.
            </p>

            <div className="space-y-8">
              {/* Point 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Reality-First Methodology</h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Build features that actually matter: auth flows, database migrations, and CI/CD pipelines.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Rapid Feedback Loop</h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Our automated testing suite gives you professional-grade PR reviews in seconds.
                  </p>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
