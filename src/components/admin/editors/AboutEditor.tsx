import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Save, Eye } from 'lucide-react';

const AboutEditor: React.FC = () => {
  const { about, updateAbout } = useCMS();
  const [formData, setFormData] = useState(about);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateAbout(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">محرر قسم عن الشركة</h2>
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
            عنوان القسم
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="عنوان القسم"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            المحتوى
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent resize-none"
            placeholder="محتوى قسم عن الشركة"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            رابط الصورة
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          {formData.image && (
            <div className="mt-3">
              <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                <Eye size={16} />
                <span>معاينة:</span>
              </p>
              <img
                src={formData.image}
                alt="About section preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;
