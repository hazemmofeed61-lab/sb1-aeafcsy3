import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Lock, Mail } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login } = useCMS();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      onLoginSuccess();
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">تسجيل دخول المدير</h1>
          <p className="text-slate-300">الوصول إلى لوحة التحكم</p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="text-slate-400" size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                  placeholder="admin@decorfinishing.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="text-slate-400" size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-800 rounded-lg text-sm animate-fadeIn">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 text-center">
              <strong>بيانات الدخول التجريبية:</strong><br />
              البريد الإلكتروني: admin@decorfinishing.com<br />
              كلمة المرور: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
