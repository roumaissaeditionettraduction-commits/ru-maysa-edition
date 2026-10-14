import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, Lock } from 'lucide-react';

interface SecurityGuardProps {
  children?: React.ReactNode;
}

export const SecurityGuard: React.FC<SecurityGuardProps> = ({ children }) => {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    // 1. حظر الزر الأيمن للفأرة وحماية المقالات من النسخ والتحديد الفوري
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerWarning('حظر النقر بالزر الأيمن: تم تفعيل حماية حقوق الملكية الفكرية لدار رميساء.');
    };

    // 2. حظر اختصارات لوحة التحكم لمنع سرقة الأكواد والمحتوى (Ctrl+C, Ctrl+X, Ctrl+U, F12)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        triggerWarning('حظر النسخ: محتوى الكتب والمقالات محمي رسمياً ومسجل لدى المكتبة الوطنية (BNA).');
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j'))) {
        e.preventDefault();
        triggerWarning('تنبيه أمني: أدوات الفحص والتطوير محظورة على النطاق المشفر.');
      }
    };

    // 3. تصفير وتجميد الحافظة عند محاولة استخدام مفتاح تصوير الشاشة (PrintScreen)
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
        triggerWarning('تنبيه أمني صارم: تصوير أو نسخ المحتوى الفكري ممنوع بتاتاً لحماية حقوق دار النشر ومؤلفي رميساء.');
      }
    };

    // تطبيق منع التحديد على المستند
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const triggerWarning = (msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => {
      setWarningMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  return (
    <>
      {warningMessage && (
        <div
          role="alert"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] max-w-lg w-11/12 bg-slate-900/95 text-amber-300 border border-amber-500/40 px-5 py-3.5 rounded-lg shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="p-2 rounded-full bg-amber-500/10 text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-relaxed text-amber-200">{warningMessage}</p>
          </div>
          <button
            onClick={() => setWarningMessage(null)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded"
          >
            إغلاق
          </button>
        </div>
      )}
      {children}
    </>
  );
};
