import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Save } from 'lucide-react';

const ContactEditor: React.FC = () => {
  const { contactInfo, updateContactInfo } = useCMS();
  const [formData, setFormData] = useState(contactInfo);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateContactInfo(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">محرر معلومات الاتصال</h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
        >
          <Save size={20} />
          <span>حفظ التغييرات</span>
        </button>
      </div>

      {isSaved && (
        <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-lg animate-fadeIn">
          تم حفظ التغييرات بنجاح!
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            العنوان
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="عنوان العمل"
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
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="+971 XX XXX XXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            واتساب
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="+971 XX XXX XXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="info@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            كود خريطة جوجل
          </label>
          <textarea
            value={formData.mapEmbed}
            onChange={(e) => setFormData({ ...formData, mapEmbed: e.target.value })}
            rows={5}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent resize-none font-mono text-sm"
            placeholder='<iframe src="..." ...></iframe>'
          />
          <p className="text-sm text-slate-500 mt-2">
            احصل على كود التضمين من خرائط جوجل (مشاركة → تضمين خريطة)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
