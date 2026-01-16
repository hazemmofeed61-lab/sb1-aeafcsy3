import React, { useEffect, useRef, useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import * as Icons from 'lucide-react';

const ServicesSection: React.FC = () => {
  const { services } = useCMS();
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

  const getIcon = (iconName: string) => {
    const iconKey = iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, x => x[1].toUpperCase());
    const IconComponent = (Icons as any)[iconKey];
    return IconComponent || Icons.Box;
  };

  const activeServices = services.filter(s => s.isActive).sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            خدماتنا
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            حلول شاملة للديكور والتشطيب مصممة خصيصاً لاحتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                className={`bg-slate-50 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
