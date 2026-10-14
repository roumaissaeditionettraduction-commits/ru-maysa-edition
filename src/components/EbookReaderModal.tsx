import React, { useState } from 'react';
import { X, ShieldAlert, ChevronRight, ChevronLeft, Type, Moon, Sun, BookOpen, Lock } from 'lucide-react';
import { Book } from '../types';

interface EbookReaderModalProps {
  book: Book;
  onClose: () => void;
}

export const EbookReaderModal: React.FC<EbookReaderModalProps> = ({ book, onClose }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<number>(18);
  const [theme, setTheme] = useState<'paper' | 'dark' | 'sepia'>('paper');

  const currentChapter = book.sampleChapters[currentChapterIndex] || book.sampleChapters[0];

  const themes = {
    paper: 'bg-[#faf8f5] text-[#2c2621]',
    dark: 'bg-[#0f172a] text-[#e2e8f0]',
    sepia: 'bg-[#f4ecd8] text-[#433422]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[92vh] flex flex-col overflow-hidden border border-slate-700 select-none">
        {/* Top Control Bar */}
        <header className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-400/20">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide">{book.title}</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                  قارئ دار رميساء المشفر
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                تسجيل BNA الوطني • إشراف المدير العام: كمال لعرابي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Font size control */}
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs">
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                className="px-2 py-1 hover:text-amber-400 transition-colors"
                title="تصغير الخط"
              >
                A-
              </button>
              <span className="px-1 text-slate-400 font-mono text-[11px]">{fontSize}px</span>
              <button
                onClick={() => setFontSize((s) => Math.min(26, s + 2))}
                className="px-2 py-1 hover:text-amber-400 transition-colors"
                title="تكبير الخط"
              >
                A+
              </button>
            </div>

            {/* Reading Theme selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs gap-1">
              <button
                onClick={() => setTheme('paper')}
                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                  theme === 'paper' ? 'bg-amber-100 text-slate-900 font-bold' : 'text-slate-400'
                }`}
                title="الوضع الورقي"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                  theme === 'sepia' ? 'bg-[#e8dcb9] text-[#433422] font-bold' : 'text-slate-400'
                }`}
                title="الوضع الكلاسيكي (Sepia)"
              >
                S
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                  theme === 'dark' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'
                }`}
                title="الوضع الليلي"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="إغلاق القارئ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Security watermark warning header strip */}
        <div className="bg-amber-950/40 text-amber-300/90 px-4 py-1.5 text-[11px] border-b border-amber-500/20 flex items-center justify-between shrink-0 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>نظام الحماية الرقمية الفورية نشط: النسخ، التحديد، وتصوير الشاشة محظور قانونياً.</span>
          </div>
          <span className="hidden sm:inline text-amber-400/70">دار نشر وتوزيع رميساء - تيزي وزو</span>
        </div>

        {/* Reading Canvas Area with repeating watermark */}
        <div className={`flex-1 overflow-y-auto p-6 sm:p-12 relative ${themes[theme]}`}>
          {/* Subtle repeated watermark text */}
          <div className="absolute inset-0 pointer-events-none opacity-5 flex flex-wrap content-around justify-around text-center select-none text-xs leading-relaxed z-0">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="transform -rotate-12 m-8">
                <p className="font-bold">دار نشر وتوزيع رميساء • تيزي وزو</p>
                <p className="font-mono text-[9px]">نسخة إلكترونية مؤمنة BNA - كمال لعرابي</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto relative z-10 leading-loose">
            <div className="text-center mb-8 border-b border-black/10 pb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700/80">
                {book.author}
              </span>
              <h2 className="text-2xl sm:text-3xl font-brand font-bold mt-2 mb-1">
                {book.title}
              </h2>
              <p className="text-sm font-literary italic opacity-80">{book.subtitle}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold font-literary text-amber-700 mb-4 pb-2 border-b border-amber-500/20">
                {currentChapter.title}
              </h3>
              <div
                className="font-literary whitespace-pre-line text-justify selection:bg-transparent"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
              >
                {currentChapter.content}
              </div>
            </div>

            {/* Legal Footer Note inside reader */}
            <div className="mt-12 pt-6 border-t border-black/10 text-center text-xs opacity-70">
              <p>كافة الحقوق محفوظة لدار رميساء للنشر والترجمة والمؤلفين © {book.year}</p>
              <p className="text-[10px] mt-1 font-mono">ISBN: {book.isbn} • BNA ALGIERS</p>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Navigation Footer */}
        <footer className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-t border-slate-800 shrink-0 text-xs">
          <div className="flex items-center gap-2">
            <button
              disabled={currentChapterIndex === 0}
              onClick={() => setCurrentChapterIndex((i) => Math.max(0, i - 1))}
              className={`px-3 py-1.5 rounded flex items-center gap-1 transition-colors ${
                currentChapterIndex === 0
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              <span>الفصل السابق</span>
            </button>
            <button
              disabled={currentChapterIndex >= book.sampleChapters.length - 1}
              onClick={() => setCurrentChapterIndex((i) => Math.min(book.sampleChapters.length - 1, i + 1))}
              className={`px-3 py-1.5 rounded flex items-center gap-1 transition-colors ${
                currentChapterIndex >= book.sampleChapters.length - 1
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
              }`}
            >
              <span>الفصل التالي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            فصل {currentChapterIndex + 1} من {book.sampleChapters.length} • {book.pageCount} صفحة
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded transition-colors"
          >
            إنهاء القراءة
          </button>
        </footer>
      </div>
    </div>
  );
};
