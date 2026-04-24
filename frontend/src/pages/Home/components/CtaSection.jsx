import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50 pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to master the craft?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
              Join 10,000+ engineers who have bridged the gap between student and professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate(ROUTES.SIGNUP)} 
                className="text-primary bg-white hover:bg-gray-50 border-white hover:border-gray-50 text-lg px-8 shadow-lg"
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-blue-400 hover:bg-white/10 text-lg px-8"
              >
                View Curriculum
              </Button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
