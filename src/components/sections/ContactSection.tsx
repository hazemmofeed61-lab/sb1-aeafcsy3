import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MapPin, Phone, Send, MessageSquare } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { contactInfo, addContactSubmission } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addContactSubmission(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('مرحباً! أود الاستفسار عن خدماتكم.');
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            تواصل معنا
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            مستعد لتحويل مساحتك؟ اتصل بنا اليوم للاستشارة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">العنوان</h3>
                  <p className="text-slate-600">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">الهاتف</h3>
                  <p className="text-slate-600">{contactInfo.phone}</p>
                </div>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <MessageSquare size={24} />
                <span>تواصل عبر واتساب</span>
              </button>
            </div>

            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
              <div dangerouslySetInnerHTML={{ __html: contactInfo.mapEmbed }} />
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  الاسم
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                  placeholder="اسمك"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  الهاتف
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                  placeholder="رقم هاتفك"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  الرسالة
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all resize-none"
                  placeholder="أخبرنا عن مشروعك..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}</span>
                <Send size={20} />
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 text-green-800 rounded-lg animate-fadeIn">
                  تم إرسال الرسالة بنجاح! سنرد عليك قريباً.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-800 rounded-lg animate-fadeIn">
                  فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
