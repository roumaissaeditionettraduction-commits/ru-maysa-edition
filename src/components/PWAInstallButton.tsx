import React, { useState } from 'react';
import {
  Download,
  Smartphone,
  Laptop,
  CheckCircle2,
  X,
  Share2,
  PlusSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner' | 'floating';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = ''
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, isDesktop, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already installed and running standalone, do not show button
  if (isInstalled && !justInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setJustInstalled(true);
        setTimeout(() => setJustInstalled(false), 5000);
      }
    } else {
      // Show guided instructions for iOS, Chrome/Edge desktop address bar, or Android manual add
      setShowGuideModal(true);
    }
  };

  // 1. Banner Variant (Used in Storefront or Welcome section)
  if (variant === 'banner') {
    return (
      <>
        <div className={`p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white border border-amber-500/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">تطبيق دار رميساء للهواتف والكمبيوتر (PWA)</h4>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                  تثبيت فوري
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                ثبّت المنصة مباشرة كتطبيق مستقل على هاتفك (أندرويد/آيفون) أو جهاز الكمبيوتر بدون متجر تطبيقات، لتصفح الكتب وقراءتها حتى بدون اتصال.
              </p>
            </div>
          </div>

          <button
            onClick={handleInstallClick}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow transition-colors flex items-center gap-2 text-xs shrink-0 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>تنصيب التطبيق الآن</span>
          </button>
        </div>

        {showGuideModal && <InstallGuideModal onClose={() => setShowGuideModal(false)} isIOS={isIOS} />}
      </>
    );
  }

  // 2. Header Variant (Compact top navigation button)
  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/90 border border-amber-500/30 rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap group ${className}`}
        title="تثبيت منصة دار رميساء على هاتفك أو حاسوبك"
      >
        <Download className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">تنصيب التطبيق</span>
        <span className="sm:hidden">تنصيب</span>
      </button>

      {showGuideModal && <InstallGuideModal onClose={() => setShowGuideModal(false)} isIOS={isIOS} />}
    </>
  );
};

// Modal providing step-by-step guidance for iOS Safari, Android, and Desktop
const InstallGuideModal: React.FC<{ onClose: () => void; isIOS: boolean }> = ({ onClose, isIOS }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 text-slate-800 text-xs">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">تنصيب تطبيق دار رميساء</h3>
              <p className="text-[11px] text-slate-400">على هاتفك الذكي أو جهاز الكمبيوتر</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px] flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              يعمل التطبيق بتقنية Progressive Web App (PWA) المعتمدة عالمياً، ويعمل بدون استهلاك مساحة الذاكرة مع سرعة فائقة.
            </span>
          </div>

          {/* Option A: iOS Safari Guide */}
          {isIOS ? (
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>خطوات التثبيت على أجهزة iPhone / iPad (متصفح Safari):</span>
              </div>
              <ol className="space-y-2 text-[11px] text-slate-600 pr-4 list-decimal leading-relaxed">
                <li className="flex items-center gap-2">
                  <span>اضغط على زر المشاركة</span>
                  <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-1.5 py-0.5 rounded text-blue-600 font-bold">
                    <Share2 className="w-3 h-3" /> Share
                  </span>
                  <span>في أسفل شاشة سفاري.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>مرر للأسفل واضغط على</span>
                  <span className="inline-flex items-center gap-1 bg-white border border-slate-300 px-1.5 py-0.5 rounded text-slate-900 font-bold">
                    <PlusSquare className="w-3 h-3" /> إضافة إلى الصفحة الرئيسية (Add to Home Screen)
                  </span>
                </li>
                <li>
                  <span>اضغط على <strong>إضافة (Add)</strong> في الزاوية العلوية، وسيظهر تطبيق دار رميساء على شاشتك فوراً!</span>
                </li>
              </ol>
            </div>
          ) : (
            /* Option B: Android & Desktop Guide */
            <div className="space-y-3">
              {/* Android */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>على هواتف أندرويد (Chrome / Edge):</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  اضغط على خيارات المتصفح (الثلاث نقاط <strong>⋮</strong> أعلى الشاشة) ثم اختر <strong>"تثبيت التطبيق" (Install app)</strong> أو <strong>"إضافة إلى الشاشة الرئيسية"</strong>.
                </p>
              </div>

              {/* Desktop / Computer */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                  <Laptop className="w-4 h-4 text-slate-700" />
                  <span>على أجهزة الكمبيوتر (Windows / Mac):</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  ستجد أيقونة تثبيت صغيرة <strong>(Install Icon 💻)</strong> في شريط عنوان المتصفح (URL Bar) بجانب زر المفضلة، انقر عليها لفتح المنصة كتطبيق مستقل وسريع على سطح المكتب.
                </p>
              </div>
            </div>
          )}

          {/* Features note */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>قراءة وحفظ دون إنترنت</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>دفع آمن بالدينار (BNA)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg transition-colors text-xs text-center"
          >
            حسناً، فهمت
          </button>
        </div>
      </div>
    </div>
  );
};
