import React from 'react';
import { ShieldCheck, BookOpen, UserCheck, LayoutDashboard, Lock, Unlock } from 'lucide-react';
import { HouseSettings } from '../types';

interface HeaderProps {
  currentView: 'store' | 'admin';
  houseSettings: HouseSettings;
  isAdminAuthenticated: boolean;
  onViewChange: (view: 'store' | 'admin') => void;
  onOpenManuscriptModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  houseSettings,
  isAdminAuthenticated,
  onViewChange,
  onOpenManuscriptModal
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

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
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

        {/* Zone 3: 1 Primary Action (Toggle between Store and Executive Dashboard) */}
        <div className="flex items-center gap-2 shrink-0">
          {currentView === 'store' ? (
            <button
              onClick={() => onViewChange('admin')}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>لوحة الإدارة الكلية</span>
            </button>
          ) : (
            <button
              onClick={() => onViewChange('store')}
              className="px-3.5 py-1.5 text-xs font-bold text-amber-300 bg-slate-800 hover:bg-slate-700 border border-amber-400/30 rounded-lg shadow transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>واجهة متجر القراء</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
