import React from 'react';
import {
  Home,
  BookOpen,
  Bookmark,
  FileEdit,
  LayoutDashboard,
  Lock,
  Unlock
} from 'lucide-react';

interface MobileBottomNavProps {
  currentView: 'store' | 'admin';
  onViewChange: (view: 'store' | 'admin') => void;
  onOpenManuscriptModal: () => void;
  onOpenLibrary: () => void;
  savedBooksCount: number;
  isAdminAuthenticated: boolean;
  onScrollToCatalog?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onViewChange,
  onOpenManuscriptModal,
  onOpenLibrary,
  savedBooksCount,
  isAdminAuthenticated,
  onScrollToCatalog
}) => {
  return (
    <nav
      aria-label="شريط تنقل التطبيق السفلي"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-amber-500/30 text-slate-300 shadow-2xl pb-safe transition-all"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. الرئيسية / المتجر */}
        <button
          onClick={() => {
            onViewChange('store');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
            currentView === 'store'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px]">الرئيسية</span>
        </button>

        {/* 2. كتالوج الكتب */}
        <button
          onClick={() => {
            onViewChange('store');
            if (onScrollToCatalog) {
              onScrollToCatalog();
            } else {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center justify-center gap-1 py-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px]">الكتالوج</span>
        </button>

        {/* 3. مكتبتي المحفوظة */}
        <button
          onClick={onOpenLibrary}
          className="flex flex-col items-center justify-center gap-1 py-1 text-slate-400 hover:text-amber-300 transition-colors relative"
        >
          <div className="relative">
            <Bookmark className="w-4 h-4" />
            {savedBooksCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {savedBooksCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">مكتبتي</span>
        </button>

        {/* 4. تقديم مخطوطة */}
        <button
          onClick={onOpenManuscriptModal}
          className="flex flex-col items-center justify-center gap-1 py-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <FileEdit className="w-4 h-4" />
          <span className="text-[10px]">مخطوطة</span>
        </button>

        {/* 5. لوحة الإدارة */}
        <button
          onClick={() => onViewChange('admin')}
          className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
            currentView === 'admin'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <LayoutDashboard className="w-4 h-4" />
            {isAdminAuthenticated ? (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
            ) : null}
          </div>
          <span className="text-[10px]">الإدارة</span>
        </button>
      </div>
    </nav>
  );
};
