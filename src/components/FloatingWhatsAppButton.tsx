import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsAppButton: React.FC = () => {
  const handleClick = () => {
    window.open('https://wa.me/971545400778', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} className="text-white" />
    </button>
  );
};

export default FloatingWhatsAppButton;
