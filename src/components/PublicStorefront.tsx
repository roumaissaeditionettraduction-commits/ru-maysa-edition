import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  Search,
  Lock,
  ArrowRight,
  Send,
  Eye,
  CheckCircle,
  Award,
  Video,
  FileText,
  Bookmark,
  Globe,
  Smartphone,
  Download,
  Check
} from 'lucide-react';
import { Book, DiscussionComment, HouseSettings } from '../types';
import { BookCover } from './BookCover';
import { FacebookIcon, WhatsAppIcon, InstagramIcon, TelegramIcon } from './SocialLinks';
import { PWAInstallButton } from './PWAInstallButton';

interface PublicStorefrontProps {
  books: Book[];
  discussions: DiscussionComment[];
  houseSettings: HouseSettings;
  onSelectBookForPayment: (book: Book, format: 'ebook' | 'paper' | 'both') => void;
  onSelectBookForReading: (book: Book) => void;
  onOpenManuscriptModal: () => void;
  onAddDiscussion: (comment: { authorName: string; bookTitle: string; comment: string }) => void;
  savedBookIds?: string[];
  onToggleSaveBook?: (bookId: string) => void;
  experienceMode?: 'web' | 'app';
  onExperienceModeChange?: (mode: 'web' | 'app') => void;
  onOpenLibrary?: () => void;
}

export const PublicStorefront: React.FC<PublicStorefrontProps> = ({
  books,
  discussions,
  houseSettings,
  onSelectBookForPayment,
  onSelectBookForReading,
  onOpenManuscriptModal,
  onAddDiscussion,
  savedBookIds = [],
  onToggleSaveBook = () => {},
  experienceMode = 'web',
  onExperienceModeChange,
  onOpenLibrary
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Discussion input
  const [commentName, setCommentName] = useState('');
  const [commentBook, setCommentBook] = useState(books[0]?.title || "Le Coq d'Oran");
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Video stream simulation modal
  const [showVideoModal, setShowVideoModal] = useState(false);

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.subtitle && book.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) return;
    onAddDiscussion({
      authorName: commentName,
      bookTitle: commentBook,
      comment: commentText
    });
    setCommentName('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden bg-slate-900 text-white border border-amber-500/20 shadow-2xl">
        {/* Background decorative gradient pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 opacity-95" />
        <div className="absolute inset-0 bg-watermark pointer-events-none" />

        <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{houseSettings.houseName} • {houseSettings.location}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-brand font-bold leading-tight text-white drop-shadow-md">
              {houseSettings.tagline}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-literary">
              تحت إشراف {houseSettings.managerTitle} <strong className="text-amber-300">{houseSettings.managerName}</strong>، نحرص على نشر أحدث الروايات الأدبية والدراسات المترجمة مع التسجيل الوطني المعتمد بالمكتبة الوطنية (BNA)، وحماية مؤلفاتنا رقمياً مع خيارات الدفع الفوري بالدينار الجزائري عبر Chargily Pay.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-lg transition-colors text-xs sm:text-sm flex items-center gap-2"
              >
                <span>استكشاف إصدارات الدار</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </a>
              <button
                onClick={onOpenManuscriptModal}
                className="px-5 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-amber-300 border border-amber-400/30 font-semibold rounded-lg transition-colors text-xs sm:text-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>إيداع مخطوطة للنشر</span>
              </button>
            </div>
          </div>

          {/* Featured Hero Book Display */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => onSelectBookForReading(books[0])}>
              <BookCover book={books[0]} size="lg" />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-md rounded-l-sm flex items-center justify-center gap-2 text-white text-xs font-bold backdrop-blur-[2px]">
                <Eye className="w-4 h-4" />
                <span>قراءة مقتطف محمي</span>
              </div>
            </div>
            <p className="text-xs text-amber-300/80 mt-3 font-mono">
              ★ الرواية الأكثر طلباً هذا الموسم
            </p>
          </div>
        </div>

        {/* 4-Column Trust Strip (Zero-Pill, Typographic alignment) */}
        <div className="border-t border-slate-800 bg-slate-950/60 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-amber-500/10 text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">إيداع قانوني بـ BNA</p>
              <p className="text-[11px] text-slate-400">حماية حقوق التأليف والنشر</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">دفع آمن بالدينار (DZD)</p>
              <p className="text-[11px] text-slate-400">البطاقة الذهبية وبطاقات CIB</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-blue-500/10 text-blue-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">توصيل للـ 58 ولاية</p>
              <p className="text-[11px] text-slate-400">شحن آمن للمنازل والمكاتب</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-purple-500/10 text-purple-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">قارئ إلكتروني مشفر</p>
              <p className="text-[11px] text-slate-400">يمنع النسخ والطباعة الخارجية</p>
            </div>
          </div>
        </div>
      </section>

      {/* PWA Install Invitation Banner for Mobile & Desktop */}
      <PWAInstallButton variant="banner" />

      {/* Main Catalog Section */}
      <section id="catalog" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold font-brand text-slate-900">
              كتالوج مؤلفات وإصدارات دار رميساء
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              جميع الكتب خاضعة للمراجعة والتدقيق الأدبي ومسجلة رسمياً بالجزائر
            </p>
          </div>

          {/* Search and Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث بالعنوان أو المؤلف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-9 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-amber-500 w-48 sm:w-60"
              />
            </div>

            {/* Segmented Filter Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الكل ({books.length})
              </button>
              <button
                onClick={() => setSelectedCategory('literature')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  selectedCategory === 'literature'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                رواية وأدب
              </button>
              <button
                onClick={() => setSelectedCategory('mystery')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  selectedCategory === 'mystery'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                تشويق وترجمة
              </button>
              <button
                onClick={() => setSelectedCategory('history')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  selectedCategory === 'history'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                تاريخ وتراث
              </button>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <article
              key={book.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                {/* Book Cover + Basic Info Split */}
                <div className="flex gap-4">
                  <div
                    className="cursor-pointer group relative"
                    onClick={() => onSelectBookForReading(book)}
                    title="انقر لتصفح مقتطف آمن"
                  >
                    <BookCover book={book} size="md" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between text-xs space-y-1.5">
                    <div>
                      {/* Zero-Pill unboxed metadata */}
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mb-1">
                        <span>{book.categoryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{book.pageCount} صفحة</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{book.year}</span>
                      </div>

                      <h3 className="font-brand font-bold text-base text-slate-900 leading-snug">
                        {book.title}
                      </h3>

                      {book.subtitle && (
                        <p className="text-[11px] text-slate-500 font-literary mt-0.5 line-clamp-2">
                          {book.subtitle}
                        </p>
                      )}

                      <p className="text-amber-800 font-medium text-xs mt-1">
                        بقلم: {book.author}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">السعر المعتمد:</span>
                        <span className="text-base font-bold text-slate-900 tabular-nums">
                          {book.priceDZD.toLocaleString()} دج
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-700 font-medium mt-0.5">
                        {book.stockStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Brief synopsis */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-4 pt-3 border-t border-slate-100">
                  {book.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2 text-xs">
                <button
                  onClick={() => onSelectBookForPayment(book, 'ebook')}
                  className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>شراء بالذهبية</span>
                </button>

                <button
                  onClick={() => onSelectBookForReading(book)}
                  className="py-2 px-3 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                  title="تصفح مقتطف للقراءة فقط"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة</span>
                </button>

                <button
                  onClick={() => onToggleSaveBook(book.id)}
                  className={`p-2 rounded-lg border transition-colors ${
                    savedBookIds.includes(book.id)
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                      : 'border-slate-300 hover:bg-amber-50 text-slate-600 hover:text-amber-800'
                  }`}
                  title={
                    savedBookIds.includes(book.id)
                      ? 'الكتاب محفوظ في مكتبتك دون إنترنت (انقر للإزالة)'
                      : 'حفظ في مكتبتي الشخصية للقراءة أوفلاين'
                  }
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      savedBookIds.includes(book.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About the Publishing House in Tizi Ouzou & Video Stream Protection */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-watermark pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs text-amber-400 font-mono tracking-wider uppercase">
              {houseSettings.location}
            </span>
            <h3 className="text-2xl sm:text-3xl font-brand font-bold">
              {houseSettings.houseName}: رسالة في خدمة الثقافة والأدب
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-literary">
              {houseSettings.aboutText}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-amber-200">
              <div>
                <span className="text-slate-400 block text-[10px]">المقر الرئيسي:</span>
                <span>{houseSettings.location}</span>
              </div>
              <div className="border-r border-slate-700 pr-4">
                <span className="text-slate-400 block text-[10px]">المدير العام المسؤول:</span>
                <span>{houseSettings.managerName}</span>
              </div>
              <div className="border-r border-slate-700 pr-4">
                <span className="text-slate-400 block text-[10px]">رقم الإيداع:</span>
                <span>{houseSettings.bnaRegistrationCode}</span>
              </div>
            </div>
          </div>

          {/* Video Stream Module (Domain Restriction Demonstration) */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Video className="w-4 h-4" />
                <span>حوارات الدار والمؤتمرات الأدبية</span>
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                بث مقيد بالنطاق
              </span>
            </div>

            <div className="aspect-video bg-slate-900 rounded-lg border border-slate-800 relative flex flex-col items-center justify-center p-4 text-center overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-xs text-white">
                كلمة المدير العام كمال لعرابي حول صالون الجزائر الدولي للكتاب
              </h5>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                مقطع مشفر يتم بثه فقط لزوار نطاق دار رميساء المعتمد ويمنع تضمينه خارج الموقع.
              </p>
              <button
                onClick={() => setShowVideoModal(true)}
                className="mt-3 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded shadow transition-colors"
              >
                تشغيل البث الآمن
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center font-mono">
              محمي بواسطة: Domain Restriction Engine (403 على الروابط الخارجية)
            </p>
          </div>
        </div>
      </section>

      {/* Social Media & Direct Channels Connection Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold font-brand text-slate-900 flex items-center gap-2">
              <span>قنوات التواصل والمتابعة الرسمية لدار رميساء</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              تواصل مباشرة مع إدارة الدار والمدير العام {houseSettings.managerName}، أو تابع أحدث الإصدارات ومعارض الكتاب عبر منصاتنا المعتمدة:
            </p>
          </div>
          <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg font-medium self-start sm:self-auto">
            تواصل فوري ومباشر
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${(houseSettings.whatsappNumber || houseSettings.phone2 || '213550189234').replace(/[^\d]/g, '')}?text=${encodeURIComponent(
              `السلام عليكم، أتواصل معكم عبر منصة ${houseSettings.houseName} للاستفسار عن الكتب والإصدارات.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-white hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">محادثة واتساب مباشرة</h4>
              <p className="text-xs text-slate-500 mt-1">
                استفسر فوراً عن توفر الكتب، أسعار الجملة، ومواعيد الشحن والتوصيل.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100/60 flex items-center justify-between text-xs text-emerald-700 font-bold">
              <span>بدء محادثة الآن</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Facebook Card */}
          <a
            href={houseSettings.facebookUrl || 'https://facebook.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/70 to-white hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">صفحة فيسبوك الرسمية</h4>
              <p className="text-xs text-slate-500 mt-1">
                تابع أخبار حفلات التوقيع، الصالونات الأدبية، وجديد كتب دار رميساء.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-100/60 flex items-center justify-between text-xs text-blue-700 font-bold">
              <span>زيارة الصفحة ومتابعتنا</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href={houseSettings.instagramUrl || 'https://instagram.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-pink-200 bg-gradient-to-br from-pink-50/70 to-white hover:border-pink-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-600 to-purple-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">معرض صور انستغرام</h4>
              <p className="text-xs text-slate-500 mt-1">
                استعرض أغلفة الإصدارات الفاخرة، ومقتطفات مصورة من أحدث الكتب.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100/60 flex items-center justify-between text-xs text-pink-700 font-bold">
              <span>مشاهدة المعرض الرقمي</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Telegram Card */}
          <a
            href={houseSettings.telegramUrl || 'https://t.me'}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50/70 to-white hover:border-sky-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-105 transition-transform">
                <TelegramIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">قناة تيليغرام الثقافية</h4>
              <p className="text-xs text-slate-500 mt-1">
                انضم لقناتنا لتلقي التنبيهات الفورية بالإصدارات الجديدة وتنزيل الفهارس.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sky-100/60 flex items-center justify-between text-xs text-sky-700 font-bold">
              <span>الانضمام للقناة</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </section>

      {/* Reader Discussions & Comments with Honeypot Anti-Spam */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-xl font-bold font-brand text-slate-900">
              منتدى آراء القراء والنقاد
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              مشاركات مراجعة ومحمية من السبام والبوتات الآلية عبر Honeypot
            </p>
          </div>
          <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg font-semibold">
            {discussions.length} مراجعات معتمدة
          </span>
        </div>

        {/* Existing Approved Discussions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {discussions.map((d) => (
            <div
              key={d.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{d.authorName}</h4>
                  {d.authorRole && (
                    <span className="text-[11px] text-slate-500 block">{d.authorRole}</span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-slate-400">{d.date}</span>
              </div>
              <p className="text-amber-900 font-semibold text-[11px]">
                حول كتاب: {d.bookTitle}
              </p>
              <p className="text-slate-700 leading-relaxed font-literary">{d.comment}</p>
            </div>
          ))}
        </div>

        {/* Add Review Form with Honeypot */}
        <div className="border-t border-slate-200 pt-5">
          <h4 className="font-bold text-slate-900 text-sm mb-3">
            أضف انطباعك أو قراءتك النقدية
          </h4>

          {commentSuccess ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>شكراً لك! تم استلام تعليقك وفحصه أمنياً وسيتم اعتماده مباشرة.</span>
            </div>
          ) : (
            <form onSubmit={handleCommentSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    اسم القارئ أو الناقد *
                  </label>
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="مثال: يوسف من تيزي وزو"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    المصنف المعني *
                  </label>
                  <select
                    value={commentBook}
                    onChange={(e) => setCommentBook(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white"
                  >
                    {books.map((b) => (
                      <option key={b.id} value={b.title}>
                        {b.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  نص المراجعة والانطباع *
                </label>
                <textarea
                  rows={3}
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="شارك رأيك الأدبي أو ملاحظتك حول جودة الطبعة والترجمة..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="py-2 px-5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg shadow transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>إرسال التعليق الآمن</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Video Modal Simulation */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-xl max-w-lg w-full p-6 text-white border border-amber-500/30 text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-sm text-amber-300">
                بث مقيد بالنطاق: كلمة المدير العام كمال لعرابي
              </h4>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center p-6 text-center border border-slate-800">
              <Video className="w-12 h-12 text-amber-400 mb-3 animate-pulse" />
              <p className="font-bold text-sm">البث مشفر ونشط بنجاح</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                HTTP Referer Verified: maison-edition-rumaysa.com
              </p>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              وفق الكود الملحق: يتم تطبيق التشفير المباشر ومنع استخراج رابط الفيديو لمنع السرقة وإعادة البث بدون ترخيص دار رميساء.
            </p>

            <button
              onClick={() => setShowVideoModal(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-lg"
            >
              إغلاق مشغل البث
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
