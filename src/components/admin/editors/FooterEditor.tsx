import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Save } from 'lucide-react';

const FooterEditor: React.FC = () => {
  const { footer, updateFooter } = useCMS();
  const [formData, setFormData] = useState(footer);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateFooter(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">محرر إعدادات التذييل</h2>
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
            نص حقوق النشر
          </label>
          <input
            type="text"
            value={formData.copyrightText}
            onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="© 2026 Company Name. All rights reserved."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              رابط فيسبوك
            </label>
            <input
              type="url"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              placeholder="https://facebook.com/yourpage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              رابط انستغرام
            </label>
            <input
              type="url"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              placeholder="https://instagram.com/yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              رابط تويتر
            </label>
            <input
              type="url"
              value={formData.twitterUrl}
              onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              placeholder="https://twitter.com/yourprofile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              رابط لينكد إن
            </label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>
        </div>

        <p className="text-sm text-slate-500">
          اترك حقول وسائل التواصل فارغة لإخفائها من التذييل
        </p>
      </div>
    </div>
  );
};

export default FooterEditor;
