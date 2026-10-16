import React from 'react';
import { Bookmark, BookOpen, Trash2, X, Download, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { Book } from '../types';
import { BookCover } from './BookCover';

interface MyLibraryModalProps {
  savedBookIds: string[];
  allBooks: Book[];
  onClose: () => void;
  onRemoveBook: (bookId: string) => void;
  onSelectBookForReading: (book: Book) => void;
  onSelectBookForPayment: (book: Book, format: 'ebook' | 'paper' | 'both') => void;
}

export const MyLibraryModal: React.FC<MyLibraryModalProps> = ({
  savedBookIds,
  allBooks,
  onClose,
  onRemoveBook,
  onSelectBookForReading,
  onSelectBookForPayment
}) => {
  const savedBooks = allBooks.filter((b) => savedBookIds.includes(b.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 text-slate-800">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">مكتبتي الخاصة للقراءة والتصفح</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                  {savedBooks.length} كتب
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                الكتب والمؤلفات المحفوظة محلياً على جهازك للقراءة والمطالعة حتى دون اتصال بالإنترنت
              </p>
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedBooks.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm">مكتبتك فارغة حالياً</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                اضغط على أيقونة الإضافة إلى مكتبتي (🔖) على أي كتاب في المتجر لحفظه هنا للقراءة والمطالعة السريعة دون اتصال بالإنترنت.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                تصفح كتالوج الكتب الآن
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedBooks.map((book) => (
                <div
                  key={book.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-400/50 flex gap-3 items-center justify-between transition-all group shadow-xs"
                >
                  <div className="shrink-0">
                    <BookCover book={book} size="sm" showBadge={false} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1 text-right">
                    <span className="text-[10px] text-amber-800 font-semibold bg-amber-100/70 px-1.5 py-0.5 rounded">
                      {book.categoryLabel}
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs truncate" title={book.title}>
                      {book.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate">{book.author}</p>

                    <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectBookForReading(book);
                        }}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>قراءة</span>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectBookForPayment(book, 'ebook');
                        }}
                        className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[10px] rounded-lg transition-colors flex items-center gap-1"
                        title="شراء فوري عبر البطاقة الذهبية / CIB"
                      >
                        <ShoppingBag className="w-3 h-3 text-amber-400" />
                        <span>شراء</span>
                      </button>

                      <button
                        onClick={() => onRemoveBook(book.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        title="إزالة من مكتبتي"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>مزامنة مشفرة ومحفوظة على جهازك للوصول الفوري</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors text-xs"
          >
            إغلاق المكتبة
          </button>
        </div>
      </div>
    </div>
  );
};
