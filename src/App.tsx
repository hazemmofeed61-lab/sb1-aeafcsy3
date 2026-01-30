import React from 'react';
import { CMSProvider } from './context/CMSContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import WhyChooseUsSection from './components/sections/WhyChooseUsSection';
import GallerySection from './components/sections/GallerySection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <CMSProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <WhyChooseUsSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingWhatsAppButton />
      </div>
    </CMSProvider>
  );
}

export default App;
