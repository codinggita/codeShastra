import React from 'react';
import HeroSection from './components/HeroSection';
import GapSection from './components/GapSection';
import MethodologySection from './components/MethodologySection';
import FeaturesSection from './components/FeaturesSection';
import CtaSection from './components/CtaSection';

const HomePage = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <GapSection />
      <MethodologySection />
      <FeaturesSection />
      <CtaSection />
    </main>
  );
};

export default HomePage;
