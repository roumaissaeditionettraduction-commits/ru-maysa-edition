import React from 'react';
import { Crown, Gem, Clock, Mountain, BookOpen, ShieldCheck } from 'lucide-react';
import { Book } from '../types';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showBadge?: boolean;
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  size = 'md',
  className = '',
  showBadge = true
}) => {
  const getIcon = () => {
    switch (book.coverIcon) {
      case 'crown':
        return <Crown className="w-8 h-8 text-amber-300 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]" />;
      case 'gem':
        return <Gem className="w-8 h-8 text-emerald-300 drop-shadow-[0_2px_8px_rgba(16,185,129,0.4)]" />;
      case 'clock':
        return <Clock className="w-8 h-8 text-indigo-300 drop-shadow-[0_2px_8px_rgba(99,102,241,0.4)]" />;
      case 'mountain':
        return <Mountain className="w-8 h-8 text-amber-200 drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]" />;
      default:
        return <BookOpen className="w-8 h-8 text-amber-300" />;
    }
  };

  const dimensions = {
    sm: 'w-24 h-36 text-[10px]',
    md: 'w-48 h-72 text-xs',
    lg: 'w-64 h-96 text-sm'
  }[size];

  return (
    <div
      className={`relative select-none shrink-0 rounded-r-md rounded-l-sm shadow-xl transition-transform duration-300 hover:-translate-y-1 group ${dimensions} ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Book Spine depth effect */}
      <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-l from-black/40 via-white/10 to-black/30 z-20 pointer-events-none rounded-r-sm" />
      <div className="absolute top-0 right-2 bottom-0 w-0.5 bg-black/30 z-20" />

      {/* Main Cover Body */}
      <div
        className={`w-full h-full rounded-r-md rounded-l-sm p-3 flex flex-col justify-between overflow-hidden relative border border-amber-500/20 bg-gradient-to-br ${book.coverGradient}`}
      >
        {/* Subtle patterned gold filigree borders */}
        <div className="absolute inset-2 border border-amber-400/20 rounded pointer-events-none" />
        <div className="absolute inset-3 border border-amber-400/10 rounded pointer-events-none" />

        {/* Top Header: Publishing House Emblem */}
        <div className="relative z-10 text-center pt-1">
          <p className="text-[10px] tracking-wider text-amber-200/80 font-medium">
            دار رميساء للنشر والترجمة
          </p>
          <div className="w-8 h-0.5 bg-amber-400/30 mx-auto my-1" />
        </div>

        {/* Center Emblem & Titles */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-1">
          <div className="p-3 rounded-full bg-slate-900/40 border border-amber-400/30 mb-2 shadow-inner">
            {getIcon()}
          </div>
          <h4
            className="font-brand font-bold text-white tracking-wide leading-tight drop-shadow-md"
            style={{ fontSize: size === 'sm' ? '12px' : size === 'md' ? '18px' : '22px' }}
          >
            {book.title}
          </h4>
          {book.subtitle && size !== 'sm' && (
            <p className="text-[11px] text-amber-200/90 font-literary mt-1 line-clamp-2 px-1">
              {book.subtitle}
            </p>
          )}
        </div>

        {/* Bottom Author & Legal Stamp */}
        <div className="relative z-10 text-center pb-1">
          <div className="w-12 h-0.5 bg-amber-400/30 mx-auto mb-1" />
          <p className="text-[10px] text-slate-300 truncate font-medium">
            {book.author}
          </p>
          <p className="text-[9px] text-amber-300/70 font-mono mt-0.5">
            تيزي وزو • BNA {book.year}
          </p>
        </div>

        {/* Subtle light reflection on cover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
      </div>

      {/* Floating Security Badge */}
      {showBadge && (
        <div className="absolute -bottom-2 -left-2 bg-slate-900/90 border border-amber-400/40 text-amber-300 text-[10px] px-2 py-0.5 rounded shadow-md flex items-center gap-1 z-30">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>مؤمن / BNA</span>
        </div>
      )}
    </div>
  );
};
