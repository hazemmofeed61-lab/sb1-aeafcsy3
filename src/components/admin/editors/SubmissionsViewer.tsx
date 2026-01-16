import React from 'react';
import { useCMS } from '../../../context/CMSContext';
import { Mail, Clock, CheckCircle } from 'lucide-react';

const SubmissionsViewer: React.FC = () => {
  const { contactSubmissions, markSubmissionAsRead } = useCMS();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">الرسائل المستلمة</h2>
        <div className="text-sm text-slate-600">
          الإجمالي: {contactSubmissions.length} |
          غير مقروءة: {contactSubmissions.filter(s => !s.isRead).length}
        </div>
      </div>

      {contactSubmissions.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Mail size={48} className="mx-auto mb-4 opacity-50" />
          <p>لا توجد رسائل بعد</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contactSubmissions.map((submission) => (
            <div
              key={submission.id}
              className={`p-6 rounded-lg border-2 ${
                submission.isRead
                  ? 'bg-white border-slate-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-slate-900">
                      {submission.name}
                    </h3>
                    {!submission.isRead && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                        جديد
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>{submission.email}</span>
                    </div>
                    {submission.phone && (
                      <div className="flex items-center gap-2">
                        <span>الهاتف: {submission.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{formatDate(submission.createdAt)}</span>
                    </div>
                  </div>
                </div>
                {!submission.isRead && (
                  <button
                    onClick={() => markSubmissionAsRead(submission.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    <CheckCircle size={16} />
                    <span>تعليم كمقروءة</span>
                  </button>
                )}
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-700 whitespace-pre-wrap">{submission.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsViewer;
