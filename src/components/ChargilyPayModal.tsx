import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowRight, Printer, AlertCircle, FileText } from 'lucide-react';
import { Book, Transaction } from '../types';
import { ALGERIAN_WILAYAS } from '../data/mockData';

interface ChargilyPayModalProps {
  book: Book;
  format: 'ebook' | 'paper' | 'both';
  onClose: () => void;
  onSuccess: (transaction: Transaction) => void;
}

export const ChargilyPayModal: React.FC<ChargilyPayModalProps> = ({
  book,
  format,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<'details' | 'card' | 'otp' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'edahabia' | 'cib'>('edahabia');
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('05');
  const [customerWilaya, setCustomerWilaya] = useState('15 - تيزي وزو');
  const [shippingAddress, setShippingAddress] = useState('');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('12');
  const [expiryYear, setExpiryYear] = useState('28');
  const [cvv, setCvv] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [completedTx, setCompletedTx] = useState<Transaction | null>(null);

  // Price calculation
  const basePrice = book.priceDZD;
  const deliveryFee = format === 'ebook' ? 0 : 400; // 400 DZD for paper book delivery in Algeria
  const totalAmount = basePrice + deliveryFee;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || customerPhone.length < 9) {
      setErrorMsg('يرجى ملء جميع الحقول المطلوبة بشكل صحيح.');
      return;
    }
    setErrorMsg(null);
    setStep('card');
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length < 16) {
      setErrorMsg('يرجى إدخال رقم بطاقة صحيح مكون من 16 رقماً.');
      return;
    }
    setIsLoading(true);
    setErrorMsg(null);

    // Simulate Chargily Gateway API checkout request
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
      setStep('otp');
    } catch {
      setIsLoading(false);
      setErrorMsg('تعذر الاتصال ببوابة الدفع. حاول مجدداً.');
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setErrorMsg('يرجى إدخال رمز التحقق السري (OTP) المكون من 4 إلى 6 أرقام.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const newTx: Transaction = {
        id: `tx-${Date.now().toString().slice(-5)}`,
        transactionRef: `CHG-DZ-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName,
        customerEmail,
        customerWilaya: customerWilaya.split('-')[1]?.trim() || customerWilaya,
        bookId: book.id,
        bookTitle: book.title,
        format,
        amountDZD: totalAmount,
        paymentMethod,
        status: 'completed',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16)
      };

      setCompletedTx(newTx);
      onSuccess(newTx);
      setStep('success');
    }, 1000);
  };

  const formatCardInput = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16);
    return clean.replace(/(\d{4})/g, '$1 ').trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 text-slate-800 flex flex-col max-h-[92vh]">
        {/* Modal Header with Chargily Pay Branding */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-lg">
              دج
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">بوابة Chargily Pay الجزائر</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                  آمنة 100%
                </span>
              </div>
              <p className="text-xs text-slate-400">دار رميساء للنشر والترجمة • تيزي وزو</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumb */}
        {step !== 'success' && (
          <div className="flex items-center justify-between px-6 py-2.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
            <span className={step === 'details' ? 'font-bold text-amber-700' : 'text-slate-400'}>
              1. بيانات المشتري
            </span>
            <span className="text-slate-300">←</span>
            <span className={step === 'card' ? 'font-bold text-amber-700' : 'text-slate-400'}>
              2. البطاقة الذهبية / CIB
            </span>
            <span className="text-slate-300">←</span>
            <span className={step === 'otp' ? 'font-bold text-amber-700' : 'text-slate-400'}>
              3. تأكيد OTP
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Book Summary Card */}
          {step !== 'success' && (
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3.5 mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-800 font-medium">الكتاب المطلوب:</p>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">{book.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  الصيغة:{' '}
                  {format === 'ebook'
                    ? 'رقمية مشفرة (قراءة فورية)'
                    : format === 'paper'
                    ? 'نسخة ورقية مع شحن منزلي'
                    : 'ورقية + رخصة إلكترونية'}
                </p>
              </div>
              <div className="text-left font-mono">
                <p className="text-xs text-slate-500">المبلغ الإجمالي:</p>
                <p className="text-base font-bold text-slate-900 tabular-nums">
                  {totalAmount.toLocaleString()} دج
                </p>
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-slate-500">يتضمن 400 دج شحن</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 1: Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  الاسم واللقب الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: يوسف قادري"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="name@domain.dz"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    رقم الهاتف المحمول <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0550XXXXXX"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  الولاية الجزائرية <span className="text-red-500">*</span>
                </label>
                <select
                  value={customerWilaya}
                  onChange={(e) => setCustomerWilaya(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
                >
                  {ALGERIAN_WILAYAS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              {format !== 'ebook' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    عنوان التوصيل أو أقرب نقطة استلام <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="البلدية، الحي، أو مكتب بريد الجزائر"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                >
                  <span>متابعة لاختيار البطاقة البنكية</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Card selection & info */}
          {step === 'card' && (
            <form onSubmit={handleCardSubmit} className="space-y-4 text-xs">
              {/* Payment Method Switch */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  اختر وسيلة الدفع بالدينار الجزائري:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('edahabia')}
                    className={`p-3 rounded-lg border text-right transition-all flex flex-col justify-between ${
                      paymentMethod === 'edahabia'
                        ? 'border-amber-500 bg-amber-50/70 text-slate-900 ring-2 ring-amber-400/30'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-amber-800">البطاقة الذهبية</span>
                      <span className="text-[10px] bg-amber-200/60 text-amber-900 px-1 rounded font-mono">
                        بريد الجزائر
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">لجميع حاملي حسابات CCP</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cib')}
                    className={`p-3 rounded-lg border text-right transition-all flex flex-col justify-between ${
                      paymentMethod === 'cib'
                        ? 'border-blue-500 bg-blue-50/70 text-slate-900 ring-2 ring-blue-400/30'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-blue-900">بطاقة CIB</span>
                      <span className="text-[10px] bg-blue-200/60 text-blue-900 px-1 rounded font-mono">
                        البنوك الوطنية
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">BNA, BEA, BADR, CPA, BDL...</p>
                  </button>
                </div>
              </div>

              {/* Card visual rendering */}
              <div
                className={`p-4 rounded-xl text-white shadow-lg relative overflow-hidden ${
                  paymentMethod === 'edahabia'
                    ? 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950'
                    : 'bg-gradient-to-r from-blue-800 via-slate-900 to-indigo-950'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold tracking-wider text-xs">
                    {paymentMethod === 'edahabia' ? 'Edahabia Card • بريد الجزائر' : 'CIB Interbancaire DZ'}
                  </span>
                  <CreditCard className="w-6 h-6 text-amber-300 opacity-90" />
                </div>
                <div className="font-mono text-base tracking-widest mb-3 text-center" dir="ltr">
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-300">
                  <span>{customerName || 'اسم الزبون'}</span>
                  <span className="font-mono">EXP: {expiryMonth}/{expiryYear}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  رقم البطاقة (16 رقماً) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardInput(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none font-mono text-center tracking-wider"
                  maxLength={19}
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">الشهر</label>
                  <select
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg outline-none font-mono"
                  >
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(
                      (m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">السنة</label>
                  <select
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg outline-none font-mono"
                  >
                    {['25', '26', '27', '28', '29', '30'].map((y) => (
                      <option key={y} value={y}>
                        20{y}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">CVV2</label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                    className="w-full px-2 py-2 border border-slate-300 rounded-lg outline-none font-mono text-center"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-1/3 py-2 px-3 border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 transition-colors"
                >
                  الرجوع
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>جاري الاتصال بـ Chargily...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>تأكيد دفع {totalAmount.toLocaleString()} دج</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: OTP Code */}
          {step === 'otp' && (
            <form onSubmit={handleOtpVerify} className="space-y-4 text-xs text-center py-2">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">تأكيد المعاملة برمز الأمان (OTP)</h4>
              <p className="text-slate-600 max-w-xs mx-auto">
                تم إرسال رمز التحقق السري في رسالة نصية قصيرة SMS إلى هاتفك المسجل لدى بريد الجزائر أو البنك.
              </p>

              <div className="py-2">
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="أدخل رمز التحقق (مثال: 7842)"
                  className="w-48 mx-auto px-4 py-2.5 border-2 border-amber-500 rounded-lg text-center font-mono text-lg tracking-widest outline-none focus:ring-2 focus:ring-amber-400"
                  dir="ltr"
                />
                <p className="text-[11px] text-slate-400 mt-2">
                  للاختبار والمحاكاة: يمكنك إدخال أي 4 أرقام
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('card')}
                  className="w-1/3 py-2 px-3 border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 transition-colors"
                >
                  تعديل البطاقة
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? <span>جاري المصادقة...</span> : <span>إتمام عملية الشراء بنجاح</span>}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Invoice */}
          {step === 'success' && completedTx && (
            <div className="text-center py-4 space-y-4 text-xs">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  تم إتمام الدفع بنجاح عبر Chargily Pay!
                </h4>
                <p className="text-slate-600 mt-1">
                  رقم الإيصال الرسمي:{' '}
                  <span className="font-mono font-bold text-amber-700">
                    {completedTx.transactionRef}
                  </span>
                </p>
              </div>

              {/* Official Receipt Box */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 text-right space-y-2 font-mono text-[11px]">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">دار النشر:</span>
                  <span className="font-bold text-slate-800">دار رميساء للنشر والترجمة - تيزي وزو</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">المدير العام المسؤول:</span>
                  <span className="font-bold text-slate-800">كمال لعرابي</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">المشتري:</span>
                  <span>{completedTx.customerName} ({completedTx.customerWilaya})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">المصنف:</span>
                  <span className="font-bold text-amber-900">{completedTx.bookTitle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">طريقة الدفع:</span>
                  <span>{completedTx.paymentMethod === 'edahabia' ? 'البطاقة الذهبية (CCP)' : 'بطاقة CIB'}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold text-slate-900">
                  <span>المبلغ المدفوع:</span>
                  <span>{completedTx.amountDZD.toLocaleString()} دج</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-1/2 py-2 px-3 border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة الفاتورة</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg shadow"
                >
                  العودة للمنصة
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
