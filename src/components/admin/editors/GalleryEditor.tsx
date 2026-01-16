import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Plus, Edit2, Trash2, Save, X, Eye } from 'lucide-react';
import { GalleryImage } from '../../../types';

const GalleryEditor: React.FC = () => {
  const { gallery, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    title: '',
    imageUrl: '',
    category: 'residential',
    orderIndex: gallery.length + 1,
    isActive: true
  });

  const handleSave = () => {
    if (editingId) {
      updateGalleryImage(editingId, formData);
      setEditingId(null);
    } else {
      addGalleryImage(formData as Omit<GalleryImage, 'id'>);
      setIsAdding(false);
    }
    setFormData({
      title: '',
      imageUrl: '',
      category: 'residential',
      orderIndex: gallery.length + 1,
      isActive: true
    });
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setFormData(image);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      title: '',
      imageUrl: '',
      category: 'residential',
      orderIndex: gallery.length + 1,
      isActive: true
    });
  };

  const categories = ['residential', 'commercial', 'administrative', 'general'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">محرر المعرض</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            <Plus size={20} />
            <span>إضافة صورة</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="mb-6 p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'تعديل صورة' : 'إضافة صورة جديدة'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">العنوان</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">رابط الصورة</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-slate-600 mb-2 flex items-center gap-2">
                    <Eye size={16} />
                    <span>معاينة:</span>
                  </p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">الفئة</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-slate-800 rounded focus:ring-slate-800"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                نشط (ظاهر على الموقع)
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
              >
                <Save size={20} />
                <span>حفظ</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                <X size={20} />
                <span>إلغاء</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.sort((a, b) => a.orderIndex - b.orderIndex).map((image) => (
          <div
            key={image.id}
            className={`rounded-lg overflow-hidden border-2 ${
              image.isActive ? 'border-slate-200' : 'border-slate-300 opacity-60'
            }`}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-slate-900">{image.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-slate-500">{image.category}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(image)}
                    className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
                        deleteGalleryImage(image.id);
                      }
                    }}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryEditor;
