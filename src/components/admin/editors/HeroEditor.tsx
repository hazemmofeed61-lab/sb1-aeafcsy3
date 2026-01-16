import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Save, Eye } from 'lucide-react';

const HeroEditor: React.FC = () => {
  const { hero, updateHero } = useCMS();
  const [formData, setFormData] = useState(hero);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateHero(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">محرر قسم الرئيسية</h2>
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
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="العنوان الرئيسي"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            العنوان الفرعي
          </label>
          <textarea
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent resize-none"
            placeholder="النص الداعم"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            رابط صورة الخلفية
          </label>
          <input
            type="url"
            value={formData.backgroundImage}
            onChange={(e) => setFormData({ ...formData, backgroundImage: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          {formData.backgroundImage && (
            <div className="mt-3">
              <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                <Eye size={16} />
                <span>معاينة:</span>
              </p>
              <img
                src={formData.backgroundImage}
                alt="Hero background preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            نص زر الإجراء
          </label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="ابدأ الآن"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            رابط زر الإجراء
          </label>
          <input
            type="text"
            value={formData.ctaLink}
            onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="/اتصل-بنا أو #contact"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;
