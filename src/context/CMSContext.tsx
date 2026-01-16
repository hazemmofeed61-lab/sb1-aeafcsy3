import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  HeroSection,
  AboutSection,
  Service,
  WhyChooseUs,
  GalleryImage,
  Testimonial,
  ContactInfo,
  ContactSubmission,
  FooterSettings,
  AdminUser
} from '../types';
import {
  initialHeroData,
  initialAboutData,
  initialServices,
  initialWhyChooseUs,
  initialGalleryImages,
  initialContactInfo,
  initialFooterSettings
} from '../data/mockData';

interface CMSContextType {
  hero: HeroSection;
  about: AboutSection;
  services: Service[];
  whyChooseUs: WhyChooseUs[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo;
  contactSubmissions: ContactSubmission[];
  footer: FooterSettings;
  isAuthenticated: boolean;
  adminUser: AdminUser | null;

  updateHero: (data: Partial<HeroSection>) => void;
  updateAbout: (data: Partial<AboutSection>) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addWhyChooseUs: (item: Omit<WhyChooseUs, 'id'>) => void;
  updateWhyChooseUs: (id: string, data: Partial<WhyChooseUs>) => void;
  deleteWhyChooseUs: (id: string) => void;
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateGalleryImage: (id: string, data: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  updateContactInfo: (data: Partial<ContactInfo>) => void;
  addContactSubmission: (submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'isRead'>) => void;
  markSubmissionAsRead: (id: string) => void;
  updateFooter: (data: Partial<FooterSettings>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY = 'cms_data';
const AUTH_KEY = 'cms_auth';

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hero, setHero] = useState<HeroSection>(initialHeroData);
  const [about, setAbout] = useState<AboutSection>(initialAboutData);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUs[]>(initialWhyChooseUs);
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGalleryImages);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [footer, setFooter] = useState<FooterSettings>(initialFooterSettings);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.hero) setHero(parsed.hero);
        if (parsed.about) setAbout(parsed.about);
        if (parsed.services) setServices(parsed.services);
        if (parsed.whyChooseUs) setWhyChooseUs(parsed.whyChooseUs);
        if (parsed.gallery) setGallery(parsed.gallery);
        if (parsed.testimonials) setTestimonials(parsed.testimonials);
        if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
        if (parsed.contactSubmissions) setContactSubmissions(parsed.contactSubmissions);
        if (parsed.footer) setFooter(parsed.footer);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }

    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setIsAuthenticated(true);
        setAdminUser(parsed);
      } catch (error) {
        console.error('Error loading auth data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      hero,
      about,
      services,
      whyChooseUs,
      gallery,
      testimonials,
      contactInfo,
      contactSubmissions,
      footer
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [hero, about, services, whyChooseUs, gallery, testimonials, contactInfo, contactSubmissions, footer]);

  const updateHero = (data: Partial<HeroSection>) => {
    setHero(prev => ({ ...prev, ...data }));
  };

  const updateAbout = (data: Partial<AboutSection>) => {
    setAbout(prev => ({ ...prev, ...data }));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: Date.now().toString() };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, data: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addWhyChooseUs = (item: Omit<WhyChooseUs, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setWhyChooseUs(prev => [...prev, newItem]);
  };

  const updateWhyChooseUs = (id: string, data: Partial<WhyChooseUs>) => {
    setWhyChooseUs(prev => prev.map(w => w.id === id ? { ...w, ...data } : w));
  };

  const deleteWhyChooseUs = (id: string) => {
    setWhyChooseUs(prev => prev.filter(w => w.id !== id));
  };

  const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
    const newImage = { ...image, id: Date.now().toString() };
    setGallery(prev => [...prev, newImage]);
  };

  const updateGalleryImage = (id: string, data: Partial<GalleryImage>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...data } : g));
  };

  const deleteGalleryImage = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial = { ...testimonial, id: Date.now().toString() };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, data: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const updateContactInfo = (data: Partial<ContactInfo>) => {
    setContactInfo(prev => ({ ...prev, ...data }));
  };

  const addContactSubmission = (submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'isRead'>) => {
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Date.now().toString(),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setContactSubmissions(prev => [newSubmission, ...prev]);
  };

  const markSubmissionAsRead = (id: string) => {
    setContactSubmissions(prev =>
      prev.map(s => s.id === id ? { ...s, isRead: true } : s)
    );
  };

  const updateFooter = (data: Partial<FooterSettings>) => {
    setFooter(prev => ({ ...prev, ...data }));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === 'admin@decorfinishing.com' && password === 'admin123') {
      const user: AdminUser = {
        id: '1',
        email,
        fullName: 'Admin User',
        role: 'admin'
      };
      setIsAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <CMSContext.Provider
      value={{
        hero,
        about,
        services,
        whyChooseUs,
        gallery,
        testimonials,
        contactInfo,
        contactSubmissions,
        footer,
        isAuthenticated,
        adminUser,
        updateHero,
        updateAbout,
        addService,
        updateService,
        deleteService,
        addWhyChooseUs,
        updateWhyChooseUs,
        deleteWhyChooseUs,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateContactInfo,
        addContactSubmission,
        markSubmissionAsRead,
        updateFooter,
        login,
        logout
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
