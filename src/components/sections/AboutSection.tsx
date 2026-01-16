import React, { useEffect, useRef, useState } from 'react';
import { useCMS } from '../../context/CMSContext';

const AboutSection: React.FC = () => {
  const { about } = useCMS();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <img
              src={about.image}
              alt={about.title}
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>

          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {about.title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
              {about.content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
