import React, { useState } from 'react';
import { X, Send, ShieldCheck, AlertCircle, CheckCircle, FileText, Bot } from 'lucide-react';
import { ManuscriptSubmission, SpamLog } from '../types';
import { ALGERIAN_WILAYAS } from '../data/mockData';

interface ManuscriptSubmissionModalProps {
  onClose: () => void;
  onSubmit: (submission: ManuscriptSubmission, spamLog?: SpamLog) => void;
}

export const ManuscriptSubmissionModal: React.FC<ManuscriptSubmissionModalProps> = ({
  onClose,
  onSubmit
}) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPhone, setAuthorPhone] = useState('05');
  const [wilaya, setWilaya] = useState('15 - تيزي وزو');
  const [manuscriptTitle, setManuscriptTitle] = useState('');
  const [category, setCategory] = useState('رواية أدبية');
  const [wordCount, setWordCount] = useState('45000');
  const [summary, setSummary] = useState('');
  const [sampleFileName, setSampleFileName] = useState('مخطوطة_نموذجية.pdf');
  
  // Anti-Spam Honeypot Field (Invisible to real humans, filled by crawler bots)
  const [honeypotField, setHoneypotField] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    await new Promise((res) => setTimeout(res, 600));

    // 1. فحص مصيدة السبام (Honeypot Trap) كما في الكود المقدم
    if (honeypotField && honeypotField.trim().length > 0) {
      setIsSubmitting(false);
      const spamEntry: SpamLog = {
        id: `spam-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        sourceIp: '197.200.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255),
        action: 'محاولة إرسال مسودة عبر بوت آلي',
        blockedBy: 'Honeypot Trap',
        details: `تم ملء الحقل الخفي بنص مشبوه: "${honeypotField}"`
      };
      onSubmit(
        {
          id: `ms-spam`,
          authorName: 'Bot Trapped',
          authorEmail: 'bot@spam.com',
          authorPhone: '0000',
          wilaya: 'غير محدد',
          manuscriptTitle: 'Spam Submission',
          category: 'Spam',
          summary: 'Blocked',
          wordCount: 0,
          status: 'rejected',
          submittedAt: new Date().toISOString()
        },
        spamEntry
      );
      setError('تم رصد سلوك آلي مشبوه (Honeypot Triggered). تم رفض الإرسال تلقائياً.');
      return;
    }

    // 2. إرسال ناجح للتحكيم
    const newSubmission: ManuscriptSubmission = {
      id: `ms-${Date.now().toString().slice(-4)}`,
      authorName,
      authorEmail,
      authorPhone,
      wilaya,
      manuscriptTitle,
      category,
      summary,
      wordCount: parseInt(wordCount) || 50000,
      status: 'pending',
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      notes: 'تم استلام العمل بنجاح عبر بوابة المخطوطات المؤمنة'
    };

    setIsSubmitting(false);
    onSubmit(newSubmission);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 text-slate-800 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">إيداع مخطوطة أو مسودة للنشر</h3>
              <p className="text-xs text-slate-400">
                دار نشر وتوزيع رميساء • لجنة القراءة والتحكيم
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <Bot className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                تم استلام مخطوطتك بنجاح لدى دار رميساء!
              </h4>
              <p className="text-slate-600 max-w-sm mx-auto leading-relaxed">
                تم تحويل الملف إلى مكتب المدير العام <strong>كمال لعرابي</strong> ولجنة القراءة والتحكيم الأدبي في تيزي وزو. سيتم التواصل معك عبر البريد الإلكتروني خلال 15 يوماً عمل.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg shadow"
              >
                إغلاق النافذة
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  نظام الإيداع محمي بفلترة السبام التلقائية (Honeypot + reCAPTCHA) لضمان حماية المخطوطات والملكية الفكرية.
                </span>
              </div>

              {/* INVISIBLE HONEYPOT FIELD FOR BOT PROTECTION */}
              <div
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  opacity: 0,
                  pointerEvents: 'none'
                }}
                aria-hidden="true"
              >
                <label htmlFor="website-hp">Do not fill this field</label>
                <input
                  id="website-hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypotField}
                  onChange={(e) => setHoneypotField(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    اسم المؤلف / الباحث <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="الاسم الكامل"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    الولاية <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                  >
                    {ALGERIAN_WILAYAS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="author@example.dz"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={authorPhone}
                    onChange={(e) => setAuthorPhone(e.target.value)}
                    placeholder="0550XXXXXX"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    عنوان العمل / المخطوطة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={manuscriptTitle}
                    onChange={(e) => setManuscriptTitle(e.target.value)}
                    placeholder="مثال: أصداء في الذاكرة"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">التصنيف</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                  >
                    <option value="رواية أدبية">رواية أدبية</option>
                    <option value="ترجمة وتحقيق">ترجمة وتحقيق</option>
                    <option value="دراسات تاريخية">دراسات تاريخية</option>
                    <option value="شعر ونصوص">شعر ونصوص</option>
                    <option value="كتاب علمي أو أكاديمي">كتاب علمي أو أكاديمي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  ملخص العمل والمحاور الأساسية <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="اكتب نبذة موجزة عن فكرة المخطوط والرسالة التي يحملها للجمهور الجزائري والعربي..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  إرفاق عينة أو الفصول الأولى (PDF / DOCX)
                </label>
                <div className="flex items-center gap-3 border border-dashed border-slate-300 p-3 rounded-lg bg-slate-50">
                  <FileText className="w-6 h-6 text-amber-600 shrink-0" />
                  <div className="flex-1 truncate">
                    <span className="font-semibold text-slate-700">{sampleFileName}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      جاهز للإرسال المشفر • حجم تقريبي: 2.4 MB
                    </span>
                  </div>
                  <span className="text-amber-700 font-bold text-[11px]">مرفق</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>{isSubmitting ? 'جاري الفحص الأمني والإرسال...' : 'إرسال المخطوطة للمدير العام كمال لعرابي'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
