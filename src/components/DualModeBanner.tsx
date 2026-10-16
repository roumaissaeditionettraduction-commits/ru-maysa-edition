import React, { useState } from 'react';
import {
  Globe,
  Smartphone,
  Download,
  Sparkles,
  Check,
  X,
  ChevronDown,
  Layers,
  Laptop
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface DualModeBannerProps {
  mode: 'web' | 'app';
  onModeChange: (newMode: 'web' | 'app') => void;
  onOpenLibrary: () => void;
  savedBooksCount: number;
}

export const DualModeBanner: React.FC<DualModeBannerProps> = ({
  mode,
  onModeChange,
  onOpenLibrary,
  savedBooksCount
}) => {
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('roumaissa_dual_banner_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const { isInstalled, isInstallable, install } = usePWAInstall();

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('roumaissa_dual_banner_dismissed', 'true');
    } catch {}
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 border-b border-amber-500/30 text-white py-2 px-3 sm:px-6 relative text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Title & Explanation */}
        <div className="flex items-center gap-2.5 text-center md:text-right">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span className="font-bold text-amber-300">
              موقع إنترنت وتطبيق ذكي في نفس الوقت:
            </span>
            <span className="text-slate-300 hidden sm:inline text-[11px]">
              يمكنك استخدام دار رميساء كموقع ويب رسمي، أو تنصيبه فوراً واستخدامه كتطبيق مستقل على هاتفك وحاسوبك.
            </span>
          </div>
        </div>

        {/* Action Controls: Dual Mode Switcher + Install Action */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
          {/* Experience Mode Toggle */}
          <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => onModeChange('web')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                mode === 'web'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>وضع الموقع (Web)</span>
            </button>

            <button
              onClick={() => onModeChange('app')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                mode === 'app'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>وضع التطبيق (App)</span>
            </button>
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white p-1 transition-colors"
            title="إخفاء هذا الإشعار"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
