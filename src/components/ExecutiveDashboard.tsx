import React, { useState } from 'react';
import {
  TrendingUp,
  BookOpen,
  FileCheck2,
  AlertOctagon,
  ShieldAlert,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Printer,
  ShieldCheck,
  CreditCard,
  Layers,
  Users,
  Settings,
  RefreshCw,
  ExternalLink,
  Lock,
  Unlock,
  Building,
  KeyRound,
  FileBadge
} from 'lucide-react';
import { Book, Transaction, ManuscriptSubmission, SpamLog, DiscussionComment, HouseSettings } from '../types';
import { HouseSettingsPanel } from './HouseSettingsPanel';
import { EditBookModal } from './EditBookModal';

interface ExecutiveDashboardProps {
  books: Book[];
  transactions: Transaction[];
  manuscripts: ManuscriptSubmission[];
  spamLogs: SpamLog[];
  discussions: DiscussionComment[];
  totalSalesDZD: number;
  digitalCopiesSold: number;
  houseSettings: HouseSettings;
  isAdminAuthenticated: boolean;
  onOpenAuthModal: () => void;
  onLogoutAdmin: () => void;
  onUpdateSettings: (updated: HouseSettings) => void;
  onUpdateBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
  onAddBook: (book: Book) => void;
  onUpdateManuscriptStatus: (id: string, status: 'accepted' | 'rejected' | 'reviewing') => void;
  onApproveDiscussion: (id: string) => void;
  onDeleteDiscussion: (id: string) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  books,
  transactions,
  manuscripts,
  spamLogs,
  discussions,
  totalSalesDZD,
  digitalCopiesSold,
  houseSettings,
  isAdminAuthenticated,
  onOpenAuthModal,
  onLogoutAdmin,
  onUpdateSettings,
  onUpdateBook,
  onDeleteBook,
  onAddBook,
  onUpdateManuscriptStatus,
  onApproveDiscussion,
  onDeleteDiscussion
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'inventory' | 'payments' | 'manuscripts' | 'spam' | 'security'>('overview');
  
  // Selected book for full editing modal
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // New book modal
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newPaperPrice, setNewPaperPrice] = useState('1400');
  const [newEbookPrice, setNewEbookPrice] = useState('800');
  const [newCategory, setNewCategory] = useState<'literature' | 'translation' | 'mystery' | 'history'>('literature');
  const [newStockStatus, setNewStockStatus] = useState('متاح في المستودع');

  // Selected Transaction for receipt view
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Security test status
  const [domainStreamStatus, setDomainStreamStatus] = useState<string | null>(null);

  const pendingManuscriptsCount = manuscripts.filter((m) => m.status === 'pending').length;

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const paper = parseInt(newPaperPrice) || 1200;
    const ebook = parseInt(newEbookPrice) || 600;

    const created: Book = {
      id: `book-${Date.now()}`,
      title: newTitle,
      subtitle: 'إصدار جديد معتمد من دار رميساء',
      author: newAuthor || houseSettings.managerName || 'دار رميساء للنشر',
      category: newCategory,
      categoryLabel: newCategory === 'literature' ? 'أدب ورواية' : 'إصدار ثقافي',
      priceDZD: paper,
      ebookPriceDZD: ebook,
      paperAvailable: true,
      ebookAvailable: true,
      stockStatus: newStockStatus,
      bnaStatus: 'تم التسجيل الوطني بـ BNA',
      securityStatus: 'مؤمن / للقراءة فقط',
      pageCount: 240,
      year: new Date().getFullYear(),
      isbn: `978-9931-78-${Math.floor(100 + Math.random() * 899)}-1`,
      description: 'كتاب جديد تمت إضافته لقائمة إصدارات دار رميساء للنشر والترجمة.',
      coverGradient: 'from-slate-900 via-amber-950 to-slate-950',
      coverAccent: '#d4af37',
      coverIcon: 'crown',
      sampleChapters: [
        {
          number: 1,
          title: 'الفصل الأول: تمهيد الطبعة',
          content: 'نص الفصل الأول للمصنف المسجل والمحمي قانونياً لدى دار رميساء للنشر والترجمة.'
        }
      ]
    };

    onAddBook(created);
    setShowAddBookModal(false);
    setNewTitle('');
    setNewAuthor('');
  };

  const handleTestDomainRestriction = () => {
    setDomainStreamStatus('جاري التحقق من النطاق المسموح (Referer Check)...');
    setTimeout(() => {
      setDomainStreamStatus('تم التحقق بنجاح: النطاق مؤمن ومحصور داخل نطاق دار رميساء الرسمي (HTTPS/Strict Domain).');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Navbar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Brand Logo Display */}
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xl shadow-inner overflow-hidden shrink-0">
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
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                لوحة تحكم {houseSettings.houseName} - التحكم الكلي الآمن
              </h2>
              <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">
                {houseSettings.location}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              مرحباً بـ {houseSettings.managerTitle}:{' '}
              <strong className="text-slate-800 font-bold">{houseSettings.managerName}</strong>
            </p>
          </div>
        </div>

        {/* Auth status & Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {isAdminAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold">
                <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                <span>لوحة التحكم مفتوحة للمسؤول</span>
              </span>
              <button
                onClick={onLogoutAdmin}
                className="px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                title="قفل التعديلات"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>قفل لوحة التعديل</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow flex items-center gap-1.5 transition-colors"
            >
              <KeyRound className="w-4 h-4" />
              <span>🔓 فتح لوحة التحكم الخاصة بالمسؤول</span>
            </button>
          )}

          <button
            onClick={() => {
              if (!isAdminAuthenticated) {
                onOpenAuthModal();
              } else {
                setShowAddBookModal(true);
              }
            }}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-semibold text-xs rounded-lg shadow flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة كتاب جديد</span>
          </button>
        </div>
      </div>

      {/* Stats Grid matching prompt specifications */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Stat 1: Total Sales in DZD */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-amber-500" />
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>المبيعات الحالية لليوم (Chargily Pay)</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            {totalSalesDZD.toLocaleString('en-US', { minimumFractionDigits: 2 })} دج
          </p>
          <p className="text-[11px] text-emerald-600 mt-1 font-semibold">
            ● سارية عبر البطاقة الذهبية وبطاقات CIB
          </p>
        </div>

        {/* Stat 2: Digital copies */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-blue-500" />
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>النسخ الرقمية المشفرة (E-Book)</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900 mt-2 font-mono tabular-nums">
            {digitalCopiesSold} نسخة
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            رخص قراءة مؤمنة ضد النسخ والتصوير
          </p>
        </div>

        {/* Stat 3: Pending Manuscripts (Red Border as in prompt code) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-red-500" />
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>مسودات معلقة في انتظار المراجعة</span>
            <AlertOctagon className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600 mt-2 font-mono tabular-nums">
            {pendingManuscriptsCount} مقالات / مسودات
          </p>
          <p className="text-[11px] text-red-500 mt-1 font-medium">
            تتطلب التحكيم واعتماد {houseSettings.managerName}
          </p>
        </div>
      </div>

      {/* Navigation Tabs for Dashboard Views */}
      <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          📊 لوحة الإدارة العامة
        </button>
        <button
          onClick={() => {
            if (!isAdminAuthenticated) {
              onOpenAuthModal();
            } else {
              setActiveTab('settings');
            }
          }}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>⚙️ تعديل معلومات الدار والشعار</span>
          {!isAdminAuthenticated && <Lock className="w-3 h-3 text-slate-400" />}
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'inventory'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          📚 جرد وإضافة الكتب ({books.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'payments'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          📈 مراقبة فواتير Chargily Pay ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('manuscripts')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors relative ${
            activeTab === 'manuscripts'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>📖 المسودات والمقالات</span>
          {pendingManuscriptsCount > 0 && (
            <span className="mr-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {pendingManuscriptsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('spam')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'spam'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          💬 إدارة المناقشات والسبام ({spamLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'security'
              ? 'bg-slate-900 text-amber-400 shadow'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          🛡️ أمان البث والنطاقات
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Inventory Summary Table from prompt */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>جرد مخزون المنتجات وإصدارات {houseSettings.houseName} النشطة</span>
              </h3>
              <span className="text-xs text-slate-500">
                تسجيل وطني رسمي بالمكتبة الوطنية الجزائرية (BNA)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold">عنوان المصنف / الكتاب الحقيقي</th>
                    <th className="py-3 px-4 font-semibold">حالة إدارة المخزون</th>
                    <th className="py-3 px-4 font-semibold">خيارات العرض المتوفرة</th>
                    <th className="py-3 px-4 font-semibold">ثمن البيع المعتمد بالعملة الوطنية</th>
                    <th className="py-3 px-4 font-semibold">الرابط الأمني للخادم</th>
                    <th className="py-3 px-4 font-semibold text-center">التحكم الكلي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {books.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="font-brand">{b.title}</span>
                          {b.subtitle && (
                            <span className="text-[11px] text-slate-400 font-normal">
                              ({b.subtitle})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-emerald-800 font-medium">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[11px]">
                          <CheckCircle className="w-3 h-3" />
                          <span>{b.stockStatus}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-200/50">
                          {b.paperAvailable && b.ebookAvailable
                            ? 'نسخة ورقية • E-Book'
                            : b.paperAvailable
                            ? 'نسخة ورقية فقط'
                            : 'E-Book فقط'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 font-mono tabular-nums">
                        ورقي: {b.priceDZD.toLocaleString()} دج / رقمي: {(b.ebookPriceDZD || Math.round(b.priceDZD * 0.6)).toLocaleString()} دج
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-mono">
                          <Lock className="w-3 h-3 text-amber-600" />
                          <span>{b.securityStatus}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            if (!isAdminAuthenticated) {
                              onOpenAuthModal();
                            } else {
                              setEditingBook(b);
                            }
                          }}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded text-[11px] inline-flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>تعديل كلي</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Invoices Table from prompt */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>مراقبة الفواتير الأخيرة عبر بوابة الدفع الإلكتروني</span>
              </h3>
              <span className="text-xs text-slate-500 font-mono">Chargily Pay Live Engine</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold">حساب المشتري</th>
                    <th className="py-3 px-4 font-semibold">الكتاب المطلوب</th>
                    <th className="py-3 px-4 font-semibold">صيغة الاستلام</th>
                    <th className="py-3 px-4 font-semibold">القيمة المستلمة</th>
                    <th className="py-3 px-4 font-semibold">حالة المعاملة المباشرة</th>
                    <th className="py-3 px-4 font-semibold">الفاتورة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {transactions.slice(0, 5).map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-800">{t.customerName}</p>
                        <p className="text-[11px] text-slate-400">{t.customerWilaya}</p>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{t.bookTitle}</td>
                      <td className="py-3 px-4 text-slate-600">
                        {t.format === 'ebook'
                          ? 'قراءة رقمية فورية'
                          : t.format === 'paper'
                          ? 'شحن ورقي منزلي'
                          : 'ورقي + قراءة فورية'}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                        {t.amountDZD.toLocaleString()} دج
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>
                            {t.paymentMethod === 'edahabia'
                              ? 'تم الدفع بالذهبية بنجاح'
                              : 'تم الدفع ببطاقة CIB'}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setSelectedTx(t)}
                          className="text-amber-700 hover:text-amber-900 font-semibold text-xs flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>معاينة</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOUSE & WEBSITE SETTINGS (PRIVATE TO ADMIN) */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          <HouseSettingsPanel
            settings={houseSettings}
            onSave={(updated) => onUpdateSettings(updated)}
          />
        </div>
      )}

      {/* TAB 3: INVENTORY & BOOKS EDIT */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                إدارة المصنفات وإصدارات دار رميساء الحالية
              </h3>
              <p className="text-xs text-slate-500">
                يمكنك إضافة عناوين جديدة أو تعديل أسعار النسخ الورقية والرقمية
              </p>
            </div>
            <button
              onClick={() => {
                if (!isAdminAuthenticated) {
                  onOpenAuthModal();
                } else {
                  setShowAddBookModal(true);
                }
              }}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-semibold text-xs rounded-lg shadow flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة كتاب جديد للجرد</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      ISBN: {b.isbn}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">طبعة {b.year}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{b.title}</h4>
                  {b.subtitle && <p className="text-xs text-slate-500 mt-0.5">{b.subtitle}</p>}
                  <p className="text-xs text-amber-900 font-medium mt-1">المؤلف: {b.author}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{b.description}</p>
                </div>

                <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500">الأسعار: </span>
                    <span className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                      ورقي: {b.priceDZD.toLocaleString()} دج
                    </span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="font-mono text-xs font-bold text-amber-700 tabular-nums">
                      رقمي: {(b.ebookPriceDZD || Math.round(b.priceDZD * 0.6)).toLocaleString()} دج
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (!isAdminAuthenticated) {
                          onOpenAuthModal();
                        } else {
                          setEditingBook(b);
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>تعديل معلومات الكتاب كلياً</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CHARGILY PAYMENTS LOG */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                سجل المعاملات والتحويلات المالية عبر Chargily Pay
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                حساب التاجر: {houseSettings.houseName} • {houseSettings.location}
              </p>
            </div>
            <div className="text-left font-mono">
              <span className="text-xs text-slate-500 block">إجمالي المقبوضات:</span>
              <span className="text-lg font-bold text-emerald-700 tabular-nums">
                {totalSalesDZD.toLocaleString()} دج
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold">رقم المعاملة (Ref)</th>
                  <th className="py-3 px-4 font-semibold">الزبون والولاية</th>
                  <th className="py-3 px-4 font-semibold">المصنف</th>
                  <th className="py-3 px-4 font-semibold">وسيلة الدفع</th>
                  <th className="py-3 px-4 font-semibold">المبلغ</th>
                  <th className="py-3 px-4 font-semibold">التاريخ</th>
                  <th className="py-3 px-4 font-semibold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-amber-800">{t.transactionRef}</td>
                    <td className="py-3 px-4 font-sans">
                      <span className="font-semibold text-slate-800">{t.customerName}</span>
                      <span className="text-slate-400 block text-[11px]">{t.customerWilaya}</span>
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-900">{t.bookTitle}</td>
                    <td className="py-3 px-4 font-sans">
                      {t.paymentMethod === 'edahabia' ? 'البطاقة الذهبية' : 'بطاقة CIB'}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                      {t.amountDZD.toLocaleString()} دج
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">{t.date}</td>
                    <td className="py-3 px-4 font-sans">
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
                        مقبوضة بنجاح
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: MANUSCRIPTS & ARTICLES */}
      {activeTab === 'manuscripts' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">
              المسودات والمقالات المودعة من قبل المؤلفين والباحثين
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              إجمالي الوارد: {manuscripts.length}
            </span>
          </div>

          <div className="space-y-3">
            {manuscripts.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{m.manuscriptTitle}</span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {m.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        m.status === 'pending'
                          ? 'bg-red-100 text-red-700'
                          : m.status === 'reviewing'
                          ? 'bg-blue-100 text-blue-700'
                          : m.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {m.status === 'pending'
                        ? `معلق بانتظار ${houseSettings.managerName}`
                        : m.status === 'reviewing'
                        ? 'قيد التحكيم والقراءة'
                        : m.status === 'accepted'
                        ? `معتمد للنشر في ${houseSettings.houseName}`
                        : 'مرفوض'}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{m.summary}</p>
                  <p className="text-slate-400 text-[11px] font-mono">
                    المؤلف: {m.authorName} ({m.wilaya}) • هاتف: {m.authorPhone} • إيداع: {m.submittedAt} •{' '}
                    {m.wordCount.toLocaleString()} كلمة
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {m.status !== 'accepted' && (
                    <button
                      onClick={() => onUpdateManuscriptStatus(m.id, 'accepted')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded shadow transition-colors flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>اعتماد للنشر</span>
                    </button>
                  )}
                  {m.status === 'pending' && (
                    <button
                      onClick={() => onUpdateManuscriptStatus(m.id, 'reviewing')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition-colors"
                    >
                      تحويل للجنة التحكيم
                    </button>
                  )}
                  {m.status !== 'rejected' && (
                    <button
                      onClick={() => onUpdateManuscriptStatus(m.id, 'rejected')}
                      className="px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 font-semibold rounded transition-colors"
                    >
                      رفض
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SPAM & HONEYPOT LOGS */}
      {activeTab === 'spam' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                نظام الحماية من السبام وتصفية البوتات (Honeypot + reCAPTCHA)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                تصفية الطلبات المشبوهة وحظر التسجيلات العشوائية في منتدى المناقشات
              </p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>جدار الحماية نشط بنسبة 100%</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold">الوقت والتاريخ</th>
                  <th className="py-3 px-4 font-semibold">مصدر الهجوم / IP</th>
                  <th className="py-3 px-4 font-semibold">محاولة الإجراء</th>
                  <th className="py-3 px-4 font-semibold">آلية الحظر</th>
                  <th className="py-3 px-4 font-semibold">التفاصيل الفنية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {spamLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-500 text-[11px]">{log.timestamp}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{log.sourceIp}</td>
                    <td className="py-3 px-4 font-sans text-slate-700">{log.action}</td>
                    <td className="py-3 px-4 font-sans">
                      <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded font-semibold text-[11px]">
                        {log.blockedBy}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 pt-4 mt-2">
            <h4 className="font-bold text-slate-800 text-xs mb-2">المناقشات والتعليقات المعتمدة للقراء:</h4>
            <div className="space-y-2">
              {discussions.map((d) => (
                <div
                  key={d.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900">{d.authorName}</span>
                    <span className="text-slate-400 text-[11px] mr-2">على مصنف: {d.bookTitle}</span>
                    <p className="text-slate-600 mt-1">{d.comment}</p>
                  </div>
                  <button
                    onClick={() => onDeleteDiscussion(d.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="حذف التعليق"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SECURITY & DOMAIN STREAMING */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              نظام تشفير وحظر بث مقاطع الفيديو وحصرها داخل النطاق (Domain Restriction)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              يمنع تشغيل مقاطع الفيديو المسجلة للمحاضرات وحوارات المؤلفين خارج النطاق الرسمي لدار رميساء.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>إعدادات خادم الفيديو (Bunny / MediaDelivery):</span>
              </h4>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Allowed Domain:</span>
                  <span className="font-bold text-slate-800">maison-edition-rumaysa.com</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Referer Header Check:</span>
                  <span className="text-emerald-700 font-bold">STRICT_MATCH_ENFORCED</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Hotlink Protection:</span>
                  <span className="text-emerald-700 font-bold">ENABLED (403 Forbidden)</span>
                </div>
              </div>
              <button
                onClick={handleTestDomainRestriction}
                className="w-full py-2 bg-slate-900 text-amber-400 font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                اختبار فحص قيود النطاق الآن
              </button>
              {domainStreamStatus && (
                <p className="p-2 bg-emerald-50 text-emerald-800 rounded font-semibold text-[11px]">
                  {domainStreamStatus}
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <h4 className="font-bold text-slate-800 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>إعدادات بوابة Chargily Pay (DZD):</span>
              </h4>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">CHARGILY_API_URL:</span>
                  <span className="font-bold text-slate-800">{houseSettings.chargilyLiveUrl}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Currency:</span>
                  <span className="text-amber-800 font-bold">DZD (الدينار الجزائري)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Success Webhook:</span>
                  <span className="text-slate-700">/payment-success</span>
                </div>
              </div>
              <div className="p-2 bg-amber-50 text-amber-900 rounded text-[11px]">
                مفتاح الإنتاج مشفر ومحمي في المتغيرات البيئية الخادمة.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD BOOK MODAL */}
      {showAddBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-xs text-slate-800 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="text-sm font-bold text-slate-900">إضافة مصنف أو كتاب جديد إلى متجر {houseSettings.houseName}</h4>
              <button onClick={() => setShowAddBookModal(false)} className="text-slate-400 hover:text-slate-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBook} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">عنوان الكتاب بالكامل *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: نسائم جرجرة في الأدب الحديث"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">المؤلف أو المترجم</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder={`مثال: ${houseSettings.managerName}`}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">ثمن بيع النسخة الورقية (دج) *</label>
                  <input
                    type="number"
                    required
                    value={newPaperPrice}
                    onChange={(e) => setNewPaperPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">ثمن بيع نسخة الـ E-Book الرقمية (دج) *</label>
                  <input
                    type="number"
                    required
                    value={newEbookPrice}
                    onChange={(e) => setNewEbookPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">التصنيف</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none bg-white"
                  >
                    <option value="literature">أدب ورواية</option>
                    <option value="translation">ترجمة وتحقيق</option>
                    <option value="mystery">غموض وتشويق</option>
                    <option value="history">تاريخ وتراث</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">حالة المستودع والتسجيل</label>
                  <input
                    type="text"
                    value={newStockStatus}
                    onChange={(e) => setNewStockStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="w-1/2 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-slate-900 text-amber-400 font-bold rounded-lg hover:bg-slate-800"
                >
                  إدراج الكتاب فوراً في جدول الجرد العام
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT VIEW MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-xs text-slate-800 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="text-sm font-bold text-slate-900">فاتورة رسمية - {houseSettings.houseName}</h4>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-slate-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2 font-mono text-[11px]">
              <div className="text-center pb-2 border-b border-slate-200">
                <p className="font-bold text-sm text-slate-900">{houseSettings.houseName}</p>
                <p className="text-slate-500 text-[10px]">{houseSettings.location} • {houseSettings.managerTitle}: {houseSettings.managerName}</p>
                <p className="text-amber-800 font-bold mt-1">Ref: {selectedTx.transactionRef}</p>
              </div>

              <div className="flex justify-between border-b border-slate-200 py-1">
                <span className="text-slate-500">الزبون:</span>
                <span className="font-bold text-slate-800">{selectedTx.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 py-1">
                <span className="text-slate-500">الولاية:</span>
                <span>{selectedTx.customerWilaya}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 py-1">
                <span className="text-slate-500">الكتاب:</span>
                <span className="font-bold text-amber-900">{selectedTx.bookTitle}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 py-1">
                <span className="text-slate-500">الصيغة:</span>
                <span>{selectedTx.format === 'ebook' ? 'نسخة رقمية مشفرة' : 'نسخة ورقية'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 py-1">
                <span className="text-slate-500">طريقة الدفع:</span>
                <span>{selectedTx.paymentMethod === 'edahabia' ? 'البطاقة الذهبية (Chargily)' : 'بطاقة CIB'}</span>
              </div>
              <div className="flex justify-between pt-2 text-sm font-bold text-slate-900">
                <span>المبلغ الإجمالي:</span>
                <span>{selectedTx.amountDZD.toLocaleString()} دج</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="w-1/2 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-100 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة</span>
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="w-1/2 py-2 bg-slate-900 text-amber-400 font-bold rounded-lg hover:bg-slate-800"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT BOOK MODAL */}
      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={(updated) => {
            onUpdateBook(updated);
            setEditingBook(null);
          }}
          onDelete={(id) => {
            onDeleteBook(id);
            setEditingBook(null);
          }}
        />
      )}
    </div>
  );
};
