import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle, X, KeyRound } from 'lucide-react';

interface AdminAuthModalProps {
  currentPassword: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  currentPassword,
  onClose,
  onSuccess
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      if (passwordInput === currentPassword) {
        onSuccess();
      } else {
        setErrorMsg('كلمة المرور السرية غير صحيحة! يرجى التحقق وإعادة المحاولة.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 text-slate-800">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">التحقق الأمني للمسؤول</h3>
              <p className="text-xs text-slate-400">
                لوحة التحكم الخاصة بالمدير العام: كمال لعرابي
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              هذه المنطقة مخصصة حصرياً للمدير العام كمال لعرابي لإدارة إعدادات الدار، الأسعار، والمبيعات.
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              أدخل كلمة المرور السرية <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="أدخل كلمة المرور الخاصة..."
                className="w-full px-3 py-2.5 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-sm"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              كلمة المرور الافتراضية للنظام: <code className="font-mono text-amber-800 font-bold bg-amber-50 px-1 rounded">Rumaysa2026@Secure</code>
            </p>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-2/3 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoading ? 'جاري التحقق...' : 'فتح لوحة التحكم الخاصة'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
