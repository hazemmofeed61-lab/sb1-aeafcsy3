import React from 'react';
import { Phone, MapPin, MessageSquare } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const Footer: React.FC = () => {
  const { footer, contactInfo } = useCMS();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/971545400778`, '_blank');
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">اللمسات للديكور</h3>
            <p className="text-slate-300 mb-4">
              التميز في خدمات التشطيب والديكور الداخلي للمشاريع السكنية والتجارية.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-slate-300 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#about" className="text-slate-300 hover:text-white transition-colors">عن الشركة</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-white transition-colors">الخدمات</a></li>
              <li><a href="#gallery" className="text-slate-300 hover:text-white transition-colors">المعرض</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">معلومات الاتصال</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <span>+971545400778</span>
              </li>
            </ul>
            <button
              onClick={handleWhatsApp}
              className="mt-4 flex items-center justify-center gap-3 w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <MessageSquare size={20} />
              <span>تواصل عبر واتساب</span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>{footer.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
