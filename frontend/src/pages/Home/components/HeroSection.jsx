import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-sm font-semibold text-primary dark:text-primary-light mb-6 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-light animate-pulse"></span>
              <span>The Future of Engineering Education</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6 transition-colors">
              Learn by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-primary-light dark:to-blue-400">Building</span>,<br />
              Not Just Studying
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-xl transition-colors">
              Escape the tutorial hell. Master high-level software engineering through an editorial learning experience designed for the next generation of architects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate(ROUTES.SIGNUP)} className="text-lg px-8 shadow-lg shadow-primary/30">
                Get Started
              </Button>
              <Button variant="ghost" size="lg" className="text-lg px-8 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors">
                Try Demo
              </Button>
            </div>
          </div>

          {/* Right Code Mockup */}
          <div className="relative w-full perspective-1000">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-400/20 blur-3xl rounded-full transform -skew-y-12 scale-110"></div>
            
            {/* Mock Editor Window */}
            <div className="relative rounded-xl overflow-hidden bg-[#1e1e1e] shadow-2xl border border-gray-800 transform rotate-y-[-2deg] rotate-x-[2deg] transition-transform duration-500 hover:rotate-y-0 hover:rotate-x-0">
              {/* Window Header */}
              <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs text-gray-400 font-mono tracking-wider">app.py — CodeCraft_Workspace</div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 overflow-x-auto text-sm md:text-base font-mono leading-relaxed text-gray-300">
                <pre className="m-0">
                  <code className="block">
                    <span className="text-purple-400">class</span> <span className="text-yellow-300">Architect</span>:
                  </code>
                  <code className="block mt-1">
                    {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-300">self</span>, <span className="text-orange-300">skills</span>):
                  </code>
                  <code className="block">
                    {'        '}<span className="text-orange-300">self</span>.skills = []
                  </code>
                  <code className="block">
                    {'        '}<span className="text-orange-300">self</span>.level = skill_level
                  </code>
                  <code className="block mt-2">
                    {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">build_real_world_app</span>(<span className="text-orange-300">self</span>):
                  </code>
                  <code className="block">
                    {'        '}<span className="text-purple-400">return</span> <span className="text-green-400">"Production ready!"</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
