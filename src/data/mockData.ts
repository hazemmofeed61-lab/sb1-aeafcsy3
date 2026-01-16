import {
  HeroSection,
  AboutSection,
  Service,
  WhyChooseUs,
  GalleryImage,
  ContactInfo,
  FooterSettings
} from '../types';

export const initialHeroData: HeroSection = {
  id: '1',
  title: 'نصمم كل لحظة لتدوم ذكرياتها',
  subtitle: 'حول مساحتك مع خدمات الديكور والتشطيب الاحترافية',
  backgroundImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920',
  ctaText: 'ابدأ الآن',
  ctaLink: '#contact'
};

export const initialAboutData: AboutSection = {
  id: '1',
  title: 'التميز في التشطيبات الداخلية',
  content: 'نحن فريق متخصص من محترفي الديكور والتشطيبات ملتزمون بتحقيق رؤيتك. مع سنوات من الخبرة في المشاريع السكنية والتجارية والإدارية، نقدم جودة استثنائية مع تنفيذ دقيق وجداول زمنية محددة. نهجنا المتكامل يضمن إتقان كل التفاصيل لخلق مساحات ملهمة.',
  image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800'
};

export const initialServices: Service[] = [
  {
    id: '1',
    title: 'أعمال التشطيب الكاملة',
    description: 'خدمات تشطيب شاملة للمشاريع السكنية والتجارية والإدارية مع الاهتمام بكل التفاصيل.',
    icon: 'home',
    orderIndex: 1,
    isActive: true
  },
  {
    id: '2',
    title: 'التصميم الداخلي',
    description: 'حلول تصميم داخلي مخصصة تمزج بين الوظيفة والجمال للشقق والفلل والمكاتب.',
    icon: 'palette',
    orderIndex: 2,
    isActive: true
  },
  {
    id: '3',
    title: 'أعمال الجبس والأسقف',
    description: 'تركيب احترافي لألواح الجبس وأنظمة الأسقف المعلقة بتصاميم عصرية وتنفيذ مثالي.',
    icon: 'layers',
    orderIndex: 3,
    isActive: true
  },
  {
    id: '4',
    title: 'تركيب الأرضيات',
    description: 'تركيب خبير للسيراميك والبورسلان والرخام والباركيه وجميع أنواع الأرضيات الفاخرة.',
    icon: 'square',
    orderIndex: 4,
    isActive: true
  },
  {
    id: '5',
    title: 'الأعمال الكهربائية والسباكة',
    description: 'حلول كهربائية وسباكة متكاملة مع محترفين معتمدين لضمان السلامة والموثوقية.',
    icon: 'zap',
    orderIndex: 5,
    isActive: true
  },
  {
    id: '6',
    title: 'خدمات النجارة',
    description: 'أعمال نجارة مخصصة تشمل خزائن مدمجة وخزائن مطبخ وحلول خشبية حسب الطلب.',
    icon: 'hammer',
    orderIndex: 6,
    isActive: true
  }
];

export const initialWhyChooseUs: WhyChooseUs[] = [
  {
    id: '1',
    title: 'ضمان الجودة',
    description: 'نحافظ على أعلى المعايير في المواد والصنعة، لضمان تميز كل مشروع.',
    icon: 'badge-check',
    orderIndex: 1,
    isActive: true
  },
  {
    id: '2',
    title: 'التسليم في الموعد',
    description: 'ملتزمون بالجداول الزمنية المحددة مع إدارة فعالة للمشاريع وفرق تنفيذ متفانية.',
    icon: 'clock',
    orderIndex: 2,
    isActive: true
  },
  {
    id: '3',
    title: 'أسعار شفافة',
    description: 'علاقات مباشرة مع الموردين وأسعار صادقة مع خيارات اقتصادية وقياسية وفاخرة.',
    icon: 'receipt',
    orderIndex: 3,
    isActive: true
  },
  {
    id: '4',
    title: 'فريق خبير',
    description: 'فرق متكاملة من المحترفين المتخصصين مع سنوات من الخبرة في الديكور والتشطيبات.',
    icon: 'users',
    orderIndex: 4,
    isActive: true
  }
];

export const initialGalleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'صالة معيشة عصرية',
    imageUrl: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'سكني',
    orderIndex: 1,
    isActive: true
  },
  {
    id: '2',
    title: 'غرفة نوم فاخرة',
    imageUrl: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'سكني',
    orderIndex: 2,
    isActive: true
  },
  {
    id: '3',
    title: 'مطبخ معاصر',
    imageUrl: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'سكني',
    orderIndex: 3,
    isActive: true
  },
  {
    id: '4',
    title: 'مساحة مكتبية',
    imageUrl: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'تجاري',
    orderIndex: 4,
    isActive: true
  },
  {
    id: '5',
    title: 'تصميم مطعم',
    imageUrl: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'تجاري',
    orderIndex: 5,
    isActive: true
  },
  {
    id: '6',
    title: 'تصميم حمام',
    imageUrl: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'سكني',
    orderIndex: 6,
    isActive: true
  }
];

export const initialContactInfo: ContactInfo = {
  id: '1',
  address: 'دبي، الإمارات العربية المتحدة',
  phone: '+971545400778',
  whatsapp: '+971545400778',
  email: 'info@decorfinishing.com',
  mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.6828492846!2d54.89782993346944!3d25.076280472533937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1234567890" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
};

export const initialFooterSettings: FooterSettings = {
  id: '1',
  logoUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  twitterUrl: '',
  linkedinUrl: '',
  copyrightText: '© 2026 اللمسات للديكور. جميع الحقوق محفوظة.'
};
