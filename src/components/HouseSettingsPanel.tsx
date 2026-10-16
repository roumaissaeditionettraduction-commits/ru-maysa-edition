import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  Building,
  User,
  Image,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  FileBadge,
  Share2,
  Upload,
  Trash2
} from 'lucide-react';
import { HouseSettings } from '../types';
import { DEFAULT_HOUSE_SETTINGS } from '../data/mockData';
import { FacebookIcon, WhatsAppIcon, InstagramIcon, TelegramIcon } from './SocialLinks';
import { processImageFile } from '../utils/imageUtils';

interface HouseSettingsPanelProps {
  settings: HouseSettings;
  onSave: (updated: HouseSettings) => void;
}

export const HouseSettingsPanel: React.FC<HouseSettingsPanelProps> = ({
  settings,
  onSave
}) => {
  const [formData, setFormData] = useState<HouseSettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(settings.adminPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.adminPassword !== newPasswordConfirm) {
      alert('كلمات المرور الجديدة غير متطابقة!');
      return;
    }
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleResetDefaults = () => {
    if (confirm('هل أنت متأكد من استعادة كافة بيانات دار رميساء الافتراضية؟')) {
      setFormData({ ...DEFAULT_HOUSE_SETTINGS });
      setNewPasswordConfirm(DEFAULT_HOUSE_SETTINGS.adminPassword);
      onSave(DEFAULT_HOUSE_SETTINGS);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-800">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl flex items-center gap-2.5 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="font-semibold text-sm">
            تم حفظ وتحديث كافة معلومات دار النشر والموقع بنجاح! تم تطبيق التعديلات فوراً على الموقع والكتالوج والقارئ.
          </div>
        </div>
      )}

      {/* 1. هوية الدار والشعار */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-600" />
            <span>هوية دار النشر والبيانات الأساسية</span>
          </h3>
          <span className="text-[11px] text-slate-400">تظهر في أعلى وأسفل كافة صفحات الموقع</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              اسم دار النشر الرسمي *
            </label>
            <input
              type="text"
              required
              value={formData.houseName}
              onChange={(e) => setFormData({ ...formData, houseName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              الشعار اللفظي أو العبارة التقديمية *
            </label>
            <input
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Logo Image Upload & Live Preview */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            شعار دار النشر الرسمي (صورة من الهاتف / الكمبيوتر أو رابط)
          </label>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="text"
              placeholder="ارفع صورة أو الصق رابط الشعار (اتركه فارغاً للشعار التراثي)"
              value={formData.logoUrl.startsWith('data:image') ? 'تم تحميل صورة الشعار من الجهاز بنجاح' : formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-mono text-[11px]"
              dir={formData.logoUrl.startsWith('data:image') ? 'rtl' : 'ltr'}
              readOnly={formData.logoUrl.startsWith('data:image')}
            />

            <label className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 shadow-xs">
              <Upload className="w-3.5 h-3.5 text-amber-700" />
              <span>رفع صورة الشعار من الجهاز</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const res = await processImageFile(file, 400, 400, 0.9);
                      setFormData({ ...formData, logoUrl: res.dataUrl });
                    } catch (err: any) {
                      alert(err?.message || 'فشل رفع الشعار');
                    }
                  }
                  e.target.value = '';
                }}
              />
            </label>

            {formData.logoUrl && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, logoUrl: '' })}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
                title="إزالة الشعار والعودة للرمز التراثي"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {/* Live Logo Preview Box */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg shrink-0">
              <span className="text-slate-500 text-[11px]">معاينة:</span>
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-amber-400/40 flex items-center justify-center overflow-hidden">
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt="معاينة"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="font-bold text-amber-300 text-sm">ر</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            رقم الاعتماد والإيداع القانوني بالمكتبة الوطنية (BNA)
          </label>
          <input
            type="text"
            value={formData.bnaRegistrationCode}
            onChange={(e) => setFormData({ ...formData, bnaRegistrationCode: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            نبذة تعريفية ورسالة دار النشر (تظهر في قسم "عن الدار")
          </label>
          <textarea
            rows={3}
            value={formData.aboutText}
            onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-literary text-xs"
          />
        </div>
      </div>

      {/* 2. بيانات المدير المسؤول */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span>بيانات الإدارة العامة والإشراف</span>
          </h3>
          <span className="text-[11px] text-slate-400">تظهر في الفواتير الرسمية والترويسة</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              اسم المدير العام المسؤول *
            </label>
            <input
              type="text"
              required
              value={formData.managerName}
              onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              الصفة أو المسمى الوظيفي
            </label>
            <input
              type="text"
              value={formData.managerTitle}
              onChange={(e) => setFormData({ ...formData, managerTitle: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 3. التواصل والمقر والشحن */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>بيانات المقر والتواصل وتكلفة الشحن</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              المقر والمدينة *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              البريد الإلكتروني الرسمي *
            </label>
            <input
              type="email"
              required
              value={formData.officialEmail}
              onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              تكلفة شحن الكتاب الورقي (دج)
            </label>
            <input
              type="number"
              value={formData.paperDeliveryFee}
              onChange={(e) => setFormData({ ...formData, paperDeliveryFee: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              رقم الهاتف الثابت أو الإداري
            </label>
            <input
              type="text"
              value={formData.phone1}
              onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              رقم الهاتف النقال (تنسيق وطلبات)
            </label>
            <input
              type="text"
              value={formData.phone2}
              onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* 4. ربط قنوات التواصل الاجتماعي (فيسبوك، واتساب، انستقرام، تليقرام) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-600" />
            <span>ربط قنوات التواصل الاجتماعي المباشرة (Facebook, WhatsApp, Instagram, Telegram)</span>
          </h3>
          <span className="text-[11px] text-slate-400">تظهر في أعلى وأسفل الموقع والزر العائم للتواصل الفوري</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WhatsApp */}
          <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center">
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </div>
              <span>رقم الواتساب للمحادثات الفورية (WhatsApp)</span>
            </div>
            <input
              type="text"
              placeholder="+213 550 18 92 34"
              value={formData.whatsappNumber || ''}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 border border-emerald-300 rounded-lg outline-none font-mono bg-white text-xs focus:ring-2 focus:ring-emerald-500"
              dir="ltr"
            />
            <p className="text-[10px] text-emerald-700">
              يُمكّن القراء من بدء محادثة مباشرة بنقرة واحدة عبر الزر العائم وزر الاستفسار.
            </p>
          </div>

          {/* Facebook */}
          <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
              <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
                <FacebookIcon className="w-3.5 h-3.5" />
              </div>
              <span>رابط صفحة الفيسبوك الرسمية (Facebook URL)</span>
            </div>
            <input
              type="url"
              placeholder="https://facebook.com/dar.roumaissa.edition"
              value={formData.facebookUrl || ''}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              className="w-full px-3 py-2 border border-blue-300 rounded-lg outline-none font-mono bg-white text-xs focus:ring-2 focus:ring-blue-500"
              dir="ltr"
            />
            <p className="text-[10px] text-blue-700">
              رابط صفحة دار رميساء على فيسبوك لمتابعة أحدث أخبار النشر والندوات.
            </p>
          </div>

          {/* Instagram */}
          <div className="p-3.5 rounded-xl border border-pink-200 bg-pink-50/40 space-y-2">
            <div className="flex items-center gap-2 text-pink-800 font-bold text-xs">
              <div className="w-6 h-6 rounded-md bg-pink-600 text-white flex items-center justify-center">
                <InstagramIcon className="w-3.5 h-3.5" />
              </div>
              <span>رابط حساب الانستغرام (Instagram URL)</span>
            </div>
            <input
              type="url"
              placeholder="https://instagram.com/dar_roumaissa_edition"
              value={formData.instagramUrl || ''}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              className="w-full px-3 py-2 border border-pink-300 rounded-lg outline-none font-mono bg-white text-xs focus:ring-2 focus:ring-pink-500"
              dir="ltr"
            />
            <p className="text-[10px] text-pink-700">
              رابط الحساب الرسمي لعرض صور الكتب وأغلفة الإصدارات الجديدة.
            </p>
          </div>

          {/* Telegram */}
          <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/40 space-y-2">
            <div className="flex items-center gap-2 text-sky-800 font-bold text-xs">
              <div className="w-6 h-6 rounded-md bg-sky-600 text-white flex items-center justify-center">
                <TelegramIcon className="w-3.5 h-3.5" />
              </div>
              <span>رابط قناة التليغرام (Telegram Channel)</span>
            </div>
            <input
              type="url"
              placeholder="https://t.me/roumaissa_editions"
              value={formData.telegramUrl || ''}
              onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
              className="w-full px-3 py-2 border border-sky-300 rounded-lg outline-none font-mono bg-white text-xs focus:ring-2 focus:ring-sky-500"
              dir="ltr"
            />
            <p className="text-[10px] text-sky-700">
              قناة تليغرام لبث إعلانات الكتب وتوزيع المقتطفات والمسودات المعتمدة.
            </p>
          </div>
        </div>
      </div>

      {/* 5. الأمان وكلمة المرور الخاصة للمسؤول */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-600" />
            <span>الأمان وكلمة المرور الخاصة بالمسؤول (كمال لعرابي)</span>
          </h3>
          <span className="text-[11px] text-red-600 font-semibold">منطقة سرية ومحمية</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              كلمة المرور الجديدة للوحة التحكم *
            </label>
            <input
              type="password"
              required
              value={formData.adminPassword}
              onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              تأكيد كلمة المرور الجديدة *
            </label>
            <input
              type="password"
              required
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono"
              dir="ltr"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            id="prot-active"
            type="checkbox"
            checked={formData.protectionActive}
            onChange={(e) => setFormData({ ...formData, protectionActive: e.target.checked })}
            className="w-4 h-4 text-amber-600 rounded"
          />
          <label htmlFor="prot-active" className="text-slate-700 font-medium">
            تفعيل جدار حماية المحتوى الفكري الصارم (حظر الزر الأيمن، منع التحديد، وتصفير الحافظة عند الضغط على PrintScreen)
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleResetDefaults}
          className="px-4 py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>استعادة الإعدادات الأصلية</span>
        </button>

        <button
          type="submit"
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg shadow-lg flex items-center gap-2 transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          <span>حفظ وتحديث معلومات الدار الكلية فوراً</span>
        </button>
      </div>
    </form>
  );
};
