import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                ر
              </div>
              <h4 className="font-brand font-bold text-sm text-white">
                دار نشر وتوزيع رميساء والترجمة
              </h4>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] max-w-md">
              مؤسسة جزائرية مستقلة متخصصة في نشر وتوزيع الأعمال الأدبية، الروايات المعاصرة، والترجمات الأكاديمية. مرخصة ومسجلة رسمياً لدى المكتبة الوطنية الجزائرية (BNA).
            </p>
            <p className="text-amber-400 text-[11px] font-semibold">
              المدير العام المسؤول: الأستاذ كمال لعرابي
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h5 className="font-bold text-white text-xs">التواصل والمقر</h5>
            <div className="space-y-1.5 text-[11px] text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>تيزي وزو، الجمهورية الجزائرية</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono">roumaissaeditionettraduction@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono">026 XX XX XX / 0550 XX XX XX</span>
              </p>
            </div>
          </div>

          {/* Legal and Security Note */}
          <div className="space-y-2">
            <h5 className="font-bold text-white text-xs">الحماية والملكية الفكرية</h5>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
              <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>حماية فكرية مشددة</span>
              </p>
              <p className="text-slate-400 leading-normal">
                جميع حقوق الطبع والترجمة والنشر الإلكتروني محفوظة. تخضع المبيعات لبوابة Chargily Pay الجزائر.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} دار نشر وتوزيع رميساء - تيزي وزو. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span>التسجيل الوطني: BNA Algérie</span>
            <span>·</span>
            <span>بوابة الدفع: Chargily Pay (DZD)</span>
            <span>·</span>
            <span>نظام الحماية الفكرية v2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
