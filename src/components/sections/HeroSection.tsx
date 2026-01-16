import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { hero } = useCMS();

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeInUp">
          {hero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {hero.subtitle}
        </p>
        <a
          href={hero.ctaLink}
          className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 animate-fadeInUp shadow-lg"
          style={{ animationDelay: '0.4s' }}
        >
          <span>{hero.ctaText}</span>
          <ArrowRight size={20} />
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
