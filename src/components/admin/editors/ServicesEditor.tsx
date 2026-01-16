import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Service } from '../../../types';

const ServicesEditor: React.FC = () => {
  const { services, addService, updateService, deleteService } = useCMS();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'box',
    orderIndex: services.length + 1,
    isActive: true
  });

  const handleSave = () => {
    if (editingId) {
      updateService(editingId, formData);
      setEditingId(null);
    } else {
      addService(formData as Omit<Service, 'id'>);
      setIsAdding(false);
    }
    setFormData({
      title: '',
      description: '',
      icon: 'box',
      orderIndex: services.length + 1,
      isActive: true
    });
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      title: '',
      description: '',
      icon: 'box',
      orderIndex: services.length + 1,
      isActive: true
    });
  };

  const iconOptions = ['home', 'palette', 'layers', 'square', 'zap', 'hammer', 'wrench', 'box', 'briefcase'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">محرر الخدمات</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
          >
            <Plus size={20} />
            <span>إضافة خدمة</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <div className="mb-6 p-6 bg-slate-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'تعديل خدمة' : 'إضافة خدمة جديدة'}
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
              <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">الأيقونة</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
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

      <div className="grid gap-4">
        {services.sort((a, b) => a.orderIndex - b.orderIndex).map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-lg border-2 ${
              service.isActive ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-300 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-slate-900">{service.title}</h3>
                <p className="text-slate-600 mt-1">{service.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span>الأيقونة: {service.icon}</span>
                  <span>الترتيب: {service.orderIndex}</span>
                  <span className={service.isActive ? 'text-green-600' : 'text-red-600'}>
                    {service.isActive ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
                      deleteService(service.id);
                    }
                  }}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesEditor;
