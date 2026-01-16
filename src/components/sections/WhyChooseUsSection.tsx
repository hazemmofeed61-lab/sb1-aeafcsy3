import React, { useEffect, useRef, useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import * as Icons from 'lucide-react';

const WhyChooseUsSection: React.FC = () => {
  const { whyChooseUs } = useCMS();
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
    return IconComponent || Icons.Star;
  };

  const activeItems = whyChooseUs.filter(w => w.isActive).sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <section id="why-choose-us" ref={sectionRef} className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            لماذا تختارنا
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            اختبر الفرق مع التزامنا بالتميز
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeItems.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className={`text-center transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 hover:bg-white/20 transition-colors">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
