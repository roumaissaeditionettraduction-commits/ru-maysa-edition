import React, { useState } from 'react';
import {
  X,
  Save,
  Trash2,
  BookOpen,
  DollarSign,
  FileText,
  Palette,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Crown,
  Gem,
  Clock,
  Mountain,
  Plus,
  Image as ImageIcon
} from 'lucide-react';
import { Book } from '../types';
import { BookCover } from './BookCover';

interface EditBookModalProps {
  book: Book;
  onClose: () => void;
  onSave: (updatedBook: Book) => void;
  onDelete: (bookId: string) => void;
}

export const EditBookModal: React.FC<EditBookModalProps> = ({
  book,
  onClose,
  onSave,
  onDelete
}) => {
  const [activeSection, setActiveSection] = useState<'info' | 'pricing' | 'content' | 'appearance'>('info');

  // Form State initialized from the book
  const [title, setTitle] = useState(book.title);
  const [subtitle, setSubtitle] = useState(book.subtitle || '');
  const [author, setAuthor] = useState(book.author);
  const [authorRole, setAuthorRole] = useState(book.authorRole || 'إصدار أصيل');
  const [category, setCategory] = useState<Book['category']>(book.category);
  const [categoryLabel, setCategoryLabel] = useState(book.categoryLabel);
  const [priceDZD, setPriceDZD] = useState(book.priceDZD.toString());
  const [ebookPriceDZD, setEbookPriceDZD] = useState(
    (book.ebookPriceDZD || Math.round(book.priceDZD * 0.6)).toString()
  );
  const [paperAvailable, setPaperAvailable] = useState(book.paperAvailable);
  const [ebookAvailable, setEbookAvailable] = useState(book.ebookAvailable);
  const [stockStatus, setStockStatus] = useState(book.stockStatus);
  const [bnaStatus, setBnaStatus] = useState(book.bnaStatus);
  const [securityStatus, setSecurityStatus] = useState(book.securityStatus || 'مؤمن / للقراءة فقط');
  const [isbn, setIsbn] = useState(book.isbn);
  const [year, setYear] = useState(book.year.toString());
  const [pageCount, setPageCount] = useState(book.pageCount.toString());
  const [description, setDescription] = useState(book.description);

  // All sample chapters
  const [chapters, setChapters] = useState<{ number: number; title: string; content: string }[]>(
    book.sampleChapters && book.sampleChapters.length > 0
      ? book.sampleChapters
      : [{ number: 1, title: 'الفصل الأول', content: 'نص الفصل الأول للمصنف.' }]
  );

  // Appearance
  const [coverImageUrl, setCoverImageUrl] = useState(book.coverImageUrl || '');
  const [coverGradient, setCoverGradient] = useState(book.coverGradient);
  const [coverIcon, setCoverIcon] = useState(book.coverIcon);

  // Live preview book object
  const previewBook: Book = {
    ...book,
    title,
    subtitle,
    author,
    authorRole,
    category,
    categoryLabel,
    priceDZD: parseInt(priceDZD) || 0,
    ebookPriceDZD: parseInt(ebookPriceDZD) || 0,
    paperAvailable,
    ebookAvailable,
    stockStatus,
    bnaStatus,
    securityStatus,
    isbn,
    year: parseInt(year) || 2024,
    pageCount: parseInt(pageCount) || 100,
    description,
    coverImageUrl: coverImageUrl.trim() || undefined,
    coverGradient,
    coverIcon,
    sampleChapters: chapters
  };

  const handleCategoryChange = (newCat: Book['category']) => {
    setCategory(newCat);
    switch (newCat) {
      case 'literature':
        setCategoryLabel('أدب ورواية');
        break;
      case 'translation':
        setCategoryLabel('ترجمة وتحقيق');
        break;
      case 'mystery':
        setCategoryLabel('تشويق وترجمة');
        break;
      case 'history':
        setCategoryLabel('تاريخ وتراث');
        break;
      case 'academic':
        setCategoryLabel('دراسات أكاديمية');
        break;
    }
  };

  const handleChapterChange = (index: number, field: 'title' | 'content', value: string) => {
    setChapters((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddChapter = () => {
    const nextNum = chapters.length + 1;
    setChapters((prev) => [
      ...prev,
      {
        number: nextNum,
        title: `الفصل ${nextNum}: عنوان جديد`,
        content: `نص الفصل ${nextNum} المعتمد من دار رميساء للنشر والترجمة...`
      }
    ]);
  };

  const handleRemoveChapter = (index: number) => {
    if (chapters.length <= 1) {
      alert('يجب الإبقاء على فصل واحد على الأقل للقارئ المشفر!');
      return;
    }
    setChapters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      alert('يرجى ملء عنوان الكتاب واسم المؤلف!');
      return;
    }

    onSave(previewBook);
    onClose();
  };

  const handleDeleteClick = () => {
    if (confirm(`تنبيه أمني: هل أنت متأكد من حذف مصنف "${book.title}" نهائياً من مخزون دار رميساء؟`)) {
      onDelete(book.id);
      onClose();
    }
  };

  const gradientsList = [
    { label: 'عنابي وذهبي ملكي', value: 'from-amber-900 via-slate-900 to-amber-950' },
    { label: 'زمردي أندلسي فاخر', value: 'from-emerald-950 via-slate-900 to-teal-950' },
    { label: 'نيلي وغموض بوليسي', value: 'from-slate-900 via-indigo-950 to-slate-950' },
    { label: 'حجري وتراث جرجرة', value: 'from-stone-900 via-amber-950 to-slate-900' },
    { label: 'كحلي وذهب عتيق', value: 'from-slate-950 via-slate-900 to-amber-900' }
  ];

  const iconsList = [
    { id: 'crown', label: 'تاج مذهب', icon: Crown },
    { id: 'gem', label: 'جوهرة', icon: Gem },
    { id: 'clock', label: 'ساعة غموض', icon: Clock },
    { id: 'mountain', label: 'قمم جبال', icon: Mountain },
    { id: 'book', label: 'كتاب تراثي', icon: BookOpen }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[92vh] flex flex-col overflow-hidden border border-slate-200 text-slate-800">
        {/* Header */}
        <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">تعديل معلومات المصنف كلياً</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                  {book.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                التحكم الكامل في تفاصيل الكتاب، الأسعار، الإيداع، والمحتوى المشفر للقارئ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Section Navigation Tabs */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveSection('info')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'info'
                ? 'bg-slate-900 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. البيانات الأساسية والعناوين</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('pricing')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'pricing'
                ? 'bg-slate-900 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>2. الأسعار، الإيداع والمخزون</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('content')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'content'
                ? 'bg-slate-900 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. فصول القارئ المشفر والملخص ({chapters.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('appearance')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'appearance'
                ? 'bg-slate-900 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>4. الغلاف والختم المذهب</span>
          </button>
        </div>

        {/* Content Body: Left Preview + Right Form */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Live Book Cover Preview Column */}
          <div className="md:col-span-4 flex flex-col items-center justify-start bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
            <span className="text-[11px] font-bold text-slate-500 mb-3 block">
              معاينة الغلاف الحي كما سيظهر للقراء:
            </span>

            <div className="my-auto py-2">
              <BookCover book={previewBook} size="md" />
            </div>

            <div className="w-full mt-4 pt-3 border-t border-slate-200 text-right text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">سعر الورقي:</span>
                <span className="font-bold font-mono text-slate-900">{priceDZD} دج</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">سعر الـ E-Book:</span>
                <span className="font-bold font-mono text-amber-800">{ebookPriceDZD} دج</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">المخزون:</span>
                <span className="text-emerald-700 font-semibold">{stockStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">الفصول المتاحة:</span>
                <span className="text-blue-700 font-semibold">{chapters.length} فصول</span>
              </div>
            </div>
          </div>

          {/* Form Fields Column */}
          <form onSubmit={handleSubmit} id="edit-book-form" className="md:col-span-8 space-y-4 text-xs">
            {/* SECTION 1: INFO */}
            {activeSection === 'info' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    عنوان الكتاب بالكامل (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-brand font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    العنوان الفرعي أو التوضيحي (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="مثال: رواية تاريخية عن الذاكرة الجزائرية"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-literary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      المؤلف أو المترجم (Author) *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      صفة الإصدار أو السلسلة
                    </label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="مثال: سلسلة الترجمات الدولية"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">التصنيف الأدبي</label>
                    <select
                      value={category}
                      onChange={(e) => handleCategoryChange(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white font-medium"
                    >
                      <option value="literature">أدب ورواية</option>
                      <option value="translation">ترجمة وتحقيق</option>
                      <option value="mystery">تشويق وألغاز</option>
                      <option value="history">تاريخ وتراث</option>
                      <option value="academic">دراسات أكاديمية</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">تسمية التصنيف المعروضة</label>
                    <input
                      type="text"
                      value={categoryLabel}
                      onChange={(e) => setCategoryLabel(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: PRICING & INVENTORY */}
            {activeSection === 'pricing' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200">
                  <div>
                    <label className="block font-semibold text-amber-900 mb-1">
                      ثمن بيع النسخة الورقية (دج) *
                    </label>
                    <input
                      type="number"
                      required
                      value={priceDZD}
                      onChange={(e) => setPriceDZD(e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg outline-none font-mono font-bold text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-amber-900 mb-1">
                      ثمن نسخة الـ E-Book الرقمية (دج) *
                    </label>
                    <input
                      type="number"
                      required
                      value={ebookPriceDZD}
                      onChange={(e) => setEbookPriceDZD(e.target.value)}
                      className="w-full px-3 py-2 border border-amber-300 rounded-lg outline-none font-mono font-bold text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={paperAvailable}
                      onChange={(e) => setPaperAvailable(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span>النسخة الورقية متوفرة للشحن</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={ebookAvailable}
                      onChange={(e) => setEbookAvailable(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span>النسخة الرقمية (E-Book) مفعلة للقارئ</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      حالة إدارة المخزون والمستودع
                    </label>
                    <input
                      type="text"
                      value={stockStatus}
                      onChange={(e) => setStockStatus(e.target.value)}
                      placeholder="مثال: مستقر (تم التسجيل الوطني بـ BNA)"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      حالة التسجيل والإيداع الوطني (BNA)
                    </label>
                    <input
                      type="text"
                      value={bnaStatus}
                      onChange={(e) => setBnaStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">رقم ISBN</label>
                    <input
                      type="text"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">سنة الطبعة</label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">عدد الصفحات</label>
                    <input
                      type="number"
                      value={pageCount}
                      onChange={(e) => setPageCount(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    الرابط الأمني للخادم وحالة الحماية
                  </label>
                  <input
                    type="text"
                    value={securityStatus}
                    onChange={(e) => setSecurityStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono text-slate-700"
                    placeholder="مثال: مؤمن / للقراءة فقط"
                  />
                </div>
              </div>
            )}

            {/* SECTION 3: SYNOPSIS & MULTI-CHAPTER CONTENT */}
            {activeSection === 'content' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    نبذة ووصف الكتاب الترويجي في المتجر
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-literary"
                  />
                </div>

                {/* Multiple Chapters Manager */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">
                        فصول القارئ الرقمي المشفر ({chapters.length})
                      </span>
                      <p className="text-[11px] text-slate-500">
                        تظهر للقارئ مع العلامة المائية المشفرة لمنع النسخ والتصوير
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddChapter}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 transition-colors text-xs shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة فصل جديد</span>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {chapters.map((chap, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-mono text-[10px]">
                              {idx + 1}
                            </span>
                            <span>الفصل رقم {idx + 1}</span>
                          </span>

                          {chapters.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveChapter(idx)}
                              className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                              title="حذف هذا الفصل"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            عنوان الفصل:
                          </label>
                          <input
                            type="text"
                            value={chap.title}
                            onChange={(e) => handleChapterChange(idx, 'title', e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none font-semibold text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                            نص الفصل:
                          </label>
                          <textarea
                            rows={4}
                            value={chap.content}
                            onChange={(e) => handleChapterChange(idx, 'content', e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-literary text-xs"
                            placeholder="اكتب أو الصق نص الفصل المخصص للمعاينة والقراءة..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: APPEARANCE & COVER */}
            {activeSection === 'appearance' && (
              <div className="space-y-4 animate-in fade-in">
                {/* Custom Image Cover URL */}
                <div className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
                  <label className="block font-semibold text-amber-950 mb-1 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-700" />
                    <span>رابط صورة الغلاف المخصصة (Cover Image URL)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/cover.jpg (اتركه فارغاً لاستخدام الغلاف الجلدي التراثي المذهب)"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-amber-300 rounded-lg outline-none font-mono text-[11px] bg-white text-slate-800"
                    dir="ltr"
                  />
                  <p className="text-[10px] text-amber-800">
                    يمكنك وضع رابط صورة خارجية لغلاف الكتاب الحقيقي، وسيتم دمجه تلقائياً مع تأثيرات التجليد والعمق ورمز الإيداع.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    نمط تدرج لون الغلاف الفاخر (Cover Gradient)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {gradientsList.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setCoverGradient(g.value)}
                        className={`p-3 rounded-lg border text-right transition-all flex items-center justify-between ${
                          coverGradient === g.value
                            ? 'border-amber-500 bg-amber-50/70 text-slate-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                        }`}
                      >
                        <span className="font-semibold text-xs">{g.label}</span>
                        <div className={`w-6 h-6 rounded border border-amber-400/40 bg-gradient-to-br ${g.value}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-2">
                    الأيقونة والختم المذهب المنقوش على الغلاف
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {iconsList.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCoverIcon(item.id)}
                          className={`p-2.5 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                            coverIcon === item.id
                              ? 'border-amber-500 bg-amber-50/70 text-slate-900 ring-2 ring-amber-400/30'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                          }`}
                        >
                          <IconComp className="w-5 h-5 text-amber-600" />
                          <span className="text-[11px] font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    يتم تطبيق تأثيرات التذهيب والنقش والعمق ثلاثي الأبعاد تلقائياً على الغلاف وفق الهوية المعتمدة لدار رميساء.
                  </span>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <footer className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDeleteClick}
            className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 font-semibold rounded-lg flex items-center gap-1.5 transition-colors text-xs"
          >
            <Trash2 className="w-4 h-4" />
            <span>حذف هذا المصنف نهائياً</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg transition-colors text-xs"
            >
              إلغاء
            </button>
            <button
              type="submit"
              form="edit-book-form"
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg shadow-md transition-colors flex items-center gap-2 text-xs"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتحديث بيانات المصنف كلياً</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
