import React from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { HouseSettings } from '../types';

// Custom SVG Icons for authentic brand appearance without external font dependencies
export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.179.586 4.303 1.7 6.171L0 24l6.024-1.704c1.776.974 3.791 1.492 5.992 1.492 6.64 0 12.008-5.367 12.008-11.987C24.024 5.367 18.671 0 12.031 0zm-.016 21.785c-1.849 0-3.66-.497-5.24-1.436l-.376-.223-3.89 1.1 1.042-3.774-.244-.391a9.78 9.78 0 0 1-1.497-5.074c0-5.414 4.417-9.82 9.855-9.82 2.633 0 5.107 1.026 6.967 2.887 1.86 1.86 2.884 4.333 2.884 6.967 0 5.414-4.422 9.764-9.501 9.764zm5.35-7.375c-.294-.147-1.74-.858-2.009-.956-.269-.098-.465-.147-.661.147-.196.294-.76 1.056-.932 1.252-.172.196-.343.221-.637.074-.294-.147-1.242-.458-2.366-1.46-.874-.78-1.464-1.744-1.636-2.038-.172-.294-.018-.453.129-.6.132-.132.294-.343.441-.515.147-.172.196-.294.294-.49.098-.196.049-.368-.025-.515s-.661-1.593-.907-2.181c-.239-.574-.483-.496-.662-.505l-.564-.01c-.196 0-.515.074-.784.368s-1.03 1.006-1.03 2.454 1.054 2.847 1.202 3.043c.147.196 2.073 3.165 5.022 4.44.702.304 1.25.485 1.677.621.705.224 1.347.193 1.854.117.566-.085 1.74-.711 1.986-1.397.245-.686.245-1.274.172-1.397-.074-.123-.27-.196-.564-.343z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

interface SocialLinksProps {
  settings: HouseSettings;
  variant?: 'header' | 'footer' | 'card' | 'floating';
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  settings,
  variant = 'footer',
  className = ''
}) => {
  const cleanPhone = (settings.whatsappNumber || settings.phone2 || settings.phone1 || '213550189234')
    .replace(/[^\d]/g, '');

  const whatsappHref = `https://wa.me/${cleanPhone.startsWith('0') ? '213' + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(
    `السلام عليكم، أتواصل معكم عبر منصة ${settings.houseName} للاستفسار عن الكتب والإصدارات.`
  )}`;

  const facebookHref = settings.facebookUrl || 'https://facebook.com';
  const instagramHref = settings.instagramUrl || 'https://instagram.com';
  const telegramHref = settings.telegramUrl || 'https://t.me';

  if (variant === 'floating') {
    return (
      <aside aria-label="أزرار التواصل السريع" className={`fixed bottom-6 left-6 z-40 flex flex-col gap-2.5 items-center select-none ${className}`}>
        {/* WhatsApp Floating Quick Action Button */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group relative border-2 border-white/20"
          title="تواصل مباشرة عبر واتساب مع دار رميساء"
        >
          <WhatsAppIcon className="w-6 h-6" />
          <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            واتساب دار رميساء
          </span>
        </a>

        {/* Telegram Floating Quick Action Button */}
        <a
          href={telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-sky-600 hover:bg-sky-500 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group relative border border-white/20"
          title="انضم لقناة تيليغرام الرسمية لدار رميساء"
        >
          <TelegramIcon className="w-5 h-5" />
          <span className="absolute right-12 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            قناة تيليغرام
          </span>
        </a>
      </aside>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition-colors"
          title="واتساب دار رميساء"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>
        <a
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-md transition-colors"
          title="صفحة فيسبوك الرسمية"
        >
          <FacebookIcon className="w-4 h-4" />
        </a>
        <a
          href={instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-slate-300 hover:text-pink-400 hover:bg-slate-800 rounded-md transition-colors"
          title="حساب انستغرام"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
        <a
          href={telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-slate-300 hover:text-sky-400 hover:bg-slate-800 rounded-md transition-colors"
          title="قناة تيليغرام"
        >
          <TelegramIcon className="w-4 h-4" />
        </a>
      </div>
    );
  }

  // Footer or Card layout
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all duration-200"
        title="تواصل معنا عبر واتساب"
      >
        <WhatsAppIcon className="w-4 h-4" />
      </a>

      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200"
        title="تابعنا على فيسبوك"
      >
        <FacebookIcon className="w-4 h-4" />
      </a>

      <a
        href={instagramHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-pink-950/60 border border-pink-500/30 text-pink-400 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all duration-200"
        title="تابعنا على انستغرام"
      >
        <InstagramIcon className="w-4 h-4" />
      </a>

      <a
        href={telegramHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-400 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all duration-200"
        title="انضم لقناة تيليغرام"
      >
        <TelegramIcon className="w-4 h-4" />
      </a>
    </div>
  );
};
