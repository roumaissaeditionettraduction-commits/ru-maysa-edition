import { ShieldCheck, BookOpen, UserCheck, LayoutDashboard, Lock, Unlock, Bookmark, Globe, Smartphone } from 'lucide-react';
import { HouseSettings } from '../types';
import { SocialLinks } from './SocialLinks';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentView: 'store' | 'admin';
  houseSettings: HouseSettings;
  isAdminAuthenticated: boolean;
  onViewChange: (view: 'store' | 'admin') => void;
  onOpenManuscriptModal: () => void;
  onOpenLibrary: () => void;
  savedBooksCount: number;
  experienceMode: 'web' | 'app';
  onExperienceModeChange: (mode: 'web' | 'app') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  houseSettings,
  isAdminAuthenticated,
  onViewChange,
  onOpenManuscriptModal,
  onOpenLibrary,
  savedBooksCount,
  experienceMode,
  onExperienceModeChange
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/25 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <div
          onClick={() => onViewChange('store')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-amber-500/30 transition-colors overflow-hidden">
            {houseSettings.logoUrl ? (
              <img
                src={houseSettings.logoUrl}
                alt={houseSettings.houseName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <span>ر</span>
            )}
          </div>
          <span className="font-brand font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
            {houseSettings.houseName}
          </span>
        </div>

        {/* Zone 2: Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={() => onViewChange('store')}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'store' ? 'text-amber-400 font-bold' : ''
            }`}
          >
            الرئيسية
          </button>
          <a
            href="#catalog"
            onClick={() => onViewChange('store')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            كتالوج الكتب
          </a>
          <button
            onClick={onOpenLibrary}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            title="الكتب المحفوظة للقراءة دون اتصال"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>مكتبتي</span>
            {savedBooksCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full font-mono">
                {savedBooksCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenManuscriptModal}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            إيداع مخطوطة
          </button>
          <button
            onClick={() => onViewChange('admin')}
            className={`hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              currentView === 'admin' ? 'text-amber-400 font-bold' : ''
            }`}
          >
            <span>إدارة {houseSettings.managerName}</span>
            {isAdminAuthenticated ? (
              <Unlock className="w-3 h-3 text-emerald-400" />
            ) : (
              <Lock className="w-3 h-3 text-slate-400" />
            )}
          </button>
        </nav>

        {/* Zone 3: Mode Switcher + PWA Install + Library (Mobile) + Admin Action */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Dual Mode Pill (Web vs App) */}
          <div className="hidden sm:flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700 text-xs">
            <button
              onClick={() => onExperienceModeChange('web')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                experienceMode === 'web'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="تفعيل وضع موقع الويب الرسمي"
            >
              <Globe className="w-3 h-3" />
              <span>موقع</span>
            </button>
            <button
              onClick={() => onExperienceModeChange('app')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                experienceMode === 'app'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="تفعيل وضع التطبيق الذكي للهاتف والكمبيوتر"
            >
              <Smartphone className="w-3 h-3" />
              <span>تطبيق</span>
            </button>
          </div>

          {/* Mobile Library Button */}
          <button
            onClick={onOpenLibrary}
            className="md:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 hover:text-white relative"
            title="مكتبتي المحفوظة"
          >
            <Bookmark className="w-4 h-4" />
            {savedBooksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {savedBooksCount}
              </span>
            )}
          </button>

          <PWAInstallButton variant="header" />
          <SocialLinks settings={houseSettings} variant="header" className="hidden xl:flex pl-2 border-l border-slate-700/80" />
          {currentView === 'store' ? (
            <button
              onClick={() => onViewChange('admin')}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">لوحة الإدارة</span>
              <span className="sm:hidden">الإدارة</span>
            </button>
          ) : (
            <button
              onClick={() => onViewChange('store')}
              className="px-3.5 py-1.5 text-xs font-bold text-amber-300 bg-slate-800 hover:bg-slate-700 border border-amber-400/30 rounded-lg shadow transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">واجهة المتجر</span>
              <span className="sm:hidden">المتجر</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
