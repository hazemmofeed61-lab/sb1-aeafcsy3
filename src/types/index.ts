export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export interface AboutSection {
  id: string;
  title: string;
  content: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  orderIndex: number;
  isActive: boolean;
}

export interface WhyChooseUs {
  id: string;
  title: string;
  description: string;
  icon: string;
  orderIndex: number;
  isActive: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  orderIndex: number;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  quote: string;
  image?: string;
  rating: number;
  orderIndex: number;
  isActive: boolean;
}

export interface ContactInfo {
  id: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapEmbed: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface FooterSettings {
  id: string;
  logoUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  copyrightText: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}
