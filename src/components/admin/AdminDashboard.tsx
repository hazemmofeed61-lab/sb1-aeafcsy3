import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import {
  Home,
  FileText,
  Briefcase,
  Star,
  Image,
  MessageSquare,
  Settings,
  LogOut,
  Mail
} from 'lucide-react';
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import ServicesEditor from './editors/ServicesEditor';
import WhyChooseUsEditor from './editors/WhyChooseUsEditor';
import GalleryEditor from './editors/GalleryEditor';
import ContactEditor from './editors/ContactEditor';
import SubmissionsViewer from './editors/SubmissionsViewer';
import FooterEditor from './editors/FooterEditor';

type Section =
  | 'hero'
  | 'about'
  | 'services'
  | 'why-choose-us'
  | 'gallery'
  | 'contact'
  | 'submissions'
  | 'footer';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { adminUser, contactSubmissions } = useCMS();
  const [activeSection, setActiveSection] = useState<Section>('hero');

  const unreadCount = contactSubmissions.filter(s => !s.isRead).length;

  const menuItems = [
    { id: 'hero' as Section, label: 'قسم الرئيسية', icon: Home },
    { id: 'about' as Section, label: 'قسم عن الشركة', icon: FileText },
    { id: 'services' as Section, label: 'الخدمات', icon: Briefcase },
    { id: 'why-choose-us' as Section, label: 'لماذا تختارنا', icon: Star },
    { id: 'gallery' as Section, label: 'المعرض', icon: Image },
    { id: 'contact' as Section, label: 'معلومات الاتصال', icon: Settings },
    { id: 'submissions' as Section, label: 'الرسائل المستلمة', icon: Mail, badge: unreadCount },
    { id: 'footer' as Section, label: 'إعدادات التذييل', icon: MessageSquare }
  ];

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'services':
        return <ServicesEditor />;
      case 'why-choose-us':
        return <WhyChooseUsEditor />;
      case 'gallery':
        return <GalleryEditor />;
      case 'contact':
        return <ContactEditor />;
      case 'submissions':
        return <SubmissionsViewer />;
      case 'footer':
        return <FooterEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <p className="text-slate-400 text-sm mt-1">{adminUser?.fullName}</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-colors relative ${
                activeSection === item.id
                  ? 'bg-slate-800 text-white border-l-4 border-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {renderEditor()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
