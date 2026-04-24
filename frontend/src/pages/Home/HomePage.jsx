import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from './components/HeroSection';
import GapSection from './components/GapSection';
import MethodologySection from './components/MethodologySection';
import FeaturesSection from './components/FeaturesSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <main className="flex flex-col min-h-screen pt-16 bg-bg text-text-primary transition-colors duration-200">
      <Navbar />
      <HeroSection />
      <GapSection />
      <MethodologySection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </main>
  );
};

export default HomePage;
