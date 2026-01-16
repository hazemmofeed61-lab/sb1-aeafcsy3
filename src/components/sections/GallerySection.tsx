import React, { useState, useEffect, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { X } from 'lucide-react';

const GallerySection: React.FC = () => {
  const { gallery } = useCMS();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  const activeGallery = gallery.filter(g => g.isActive).sort((a, b) => a.orderIndex - b.orderIndex);

  const categories = ['all', ...Array.from(new Set(activeGallery.map(img => img.category)))];

  const filteredImages = selectedCategory === 'all'
    ? activeGallery
    : activeGallery.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            أعمالنا
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            استكشف مشاريعنا المنجزة وشاهد جودة أعمالنا
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-slate-800 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {category === 'all' ? 'الكل' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-1000 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(image.imageUrl)}
            >
              <div className="aspect-square">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  <p className="text-sm text-slate-200">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
