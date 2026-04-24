import React from 'react';
import { Card } from '@/components/ui/Card';

const GapSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            The <span className="text-gray-700">Gap</span> in Modern Education
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Fresh graduates and self-taught developers are entering the workforce with theoretical knowledge but zero practical confidence. Traditional courses focus on syntax; industry needs strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: The Syntax Trap */}
          <Card padding="xl" variant="elevated" className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center text-red-600 mb-6 font-bold text-xl">
              !
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">The "Syntax Trap"</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
              Standard platforms teach you how to write a loop, but not how to architect a scalable microservice. You end up knowing the language but not the craft.
            </p>
            {/* Blurred code mockup */}
            <div className="relative h-32 rounded-lg overflow-hidden bg-[#282c34] flex items-center justify-center border border-gray-200">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center">
                 {/* Visual effect only */}
              </div>
              <pre className="text-[10px] text-gray-500 font-mono leading-tight opacity-50 p-4 w-full">
                {`function calculate(data) {
  let result = 0;
  for(let i=0; i<data.length; i++){
    if(data[i].active) {
       result += data[i].value;
    }
  }
  return result;
}`}
              </pre>
            </div>
          </Card>

          {/* Card 2: Delayed Career Growth */}
          <Card padding="xl" variant="elevated" className="bg-[#eff2fc] border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Delayed Career Growth</h3>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
              Junior engineers spend their first 6 months just learning how to navigate a professional codebase. This delay costs billions in lost productivity and stagnant careers.
            </p>
            
            {/* Progress Bar */}
            <div className="mt-auto">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-gray-700">Industry Readiness</span>
                <span className="text-red-500">34%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '34%' }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GapSection;
