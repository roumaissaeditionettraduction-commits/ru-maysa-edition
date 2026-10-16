import React, { useState, useRef, useId } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  Camera,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';
import { processImageFile, formatFileSize, ProcessedImage } from '../utils/imageUtils';

interface CoverImageUploaderProps {
  value?: string;
  onChange: (dataUrlOrUrl: string | undefined) => void;
  label?: string;
  description?: string;
  compact?: boolean;
}

// Curated Algerian literary & heritage cover presets for instant 1-click selection
const PRESET_COVERS = [
  {
    name: 'تراث قسنطينة وجرجرة',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'مخطوطة أندلسية عتيقة',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'أدب ورواية متوسطية',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'فلسفة وترجمة معاصرة',
    url: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&auto=format&fit=crop&q=80'
  }
];

export const CoverImageUploader: React.FC<CoverImageUploaderProps> = ({
  value,
  onChange,
  label = 'صورة غلاف الكتاب المعتمدة',
  description = 'قم برفع صورة الغلاف مباشرة من هاتفك أو جهاز الكمبيوتر (ستُعرض كغلاف رئيسي للكتاب)',
  compact = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMeta, setLastMeta] = useState<ProcessedImage | null>(null);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('نوع الملف غير مدعوم. يرجى اختيار ملف صورة (JPG, PNG, WEBP).');
      return;
    }

    // Limit original file to 25MB to prevent browser crash
    if (file.size > 25 * 1024 * 1024) {
      setError('حجم الصورة كبير جداً (أكبر من 25 ميغابايت). اختر صورة أصغر حجماً.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const processed = await processImageFile(file, 1000, 1500, 0.88);
      setLastMeta(processed);
      onChange(processed.dataUrl);
    } catch (err: any) {
      setError(err?.message || 'حدث خطأ أثناء معالجة صورة الغلاف');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // reset input so the same file can be re-selected if wanted
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    setLastMeta(null);
    setError(null);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput('');
    setShowUrlFallback(false);
  };

  return (
    <div className="space-y-3 text-right">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-amber-600" />
          <span>{label}</span>
        </label>
        {value && (
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>تم رفع الصورة بنجاح</span>
          </span>
        )}
      </div>

      {description && !compact && (
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {description}
        </p>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* ACTIVE PREVIEW IF IMAGE EXISTS */}
      {value ? (
        <div className="p-3.5 bg-slate-50 border border-amber-300/80 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm relative overflow-hidden">
          {/* Cover Thumbnail with 3D spine visual */}
          <div className="relative w-24 h-36 rounded-lg overflow-hidden border border-amber-400/50 shadow-md shrink-0 bg-slate-900 group">
            <img
              src={value}
              alt="معاينة الغلاف"
              className="w-full h-full object-cover"
              onError={() => setError('تعذر تحميل رابط الصورة. يرجى إعادة رفع ملف صالح.')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-amber-500 text-slate-950 font-bold text-[9px] rounded">
              غلاف مخصص
            </div>
          </div>

          {/* Details & Controls */}
          <div className="flex-1 space-y-2 text-right w-full sm:w-auto">
            <div className="space-y-0.5">
              <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span>الصورة معتمدة ومحملة في النظام</span>
              </h5>
              <p className="text-[11px] text-slate-500">
                {lastMeta ? (
                  <span>
                    الأبعاد: {lastMeta.width}×{lastMeta.height} بكسل • الحجم المحسن:{' '}
                    {formatFileSize(lastMeta.compressedSize)} ({lastMeta.format})
                  </span>
                ) : value.startsWith('data:image') ? (
                  <span>صورة مدمجة ومحسنة ذاتياً ومحفوظة محلياً</span>
                ) : (
                  <span className="truncate block font-mono text-[10px] text-slate-400 dir-ltr text-left">
                    {value}
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>تغيير الصورة من الجهاز</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="إلغاء الغلاف المخصص واستخدام التصميم الجلدي التراثي"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>إلغاء الغلاف (العودة للغلاف التراثي)</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* DROPZONE / FILE SELECTOR WHEN NO IMAGE */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-amber-500 bg-amber-50/70 scale-[0.99]'
              : 'border-slate-300 hover:border-amber-400 bg-slate-50/60 hover:bg-amber-50/30'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              {isProcessing ? (
                <RefreshCw className="w-6 h-6 animate-spin text-amber-600" />
              ) : (
                <Upload className="w-6 h-6 text-amber-700" />
              )}
            </div>

            <div className="space-y-1">
              <p className="font-bold text-slate-900 text-sm">
                اضغط لاختيار صورة الغلاف من الهاتف أو الكومبيوتر
              </p>
              <p className="text-[11px] text-slate-500">
                أو اسحب ملف الصورة وأفلته هنا مباشرة (JPG, PNG, WebP)
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-900 font-medium">
              <span className="px-2 py-0.5 bg-amber-100/80 rounded-md flex items-center gap-1">
                <Camera className="w-3 h-3 text-amber-700" />
                <span>التقاط بالكاميرا أو المعرض</span>
              </span>
              <span className="text-slate-400">•</span>
              <span>ضغط ومعالجة تلقائية فائقة السرعة</span>
            </div>
          </div>
        </div>
      )}

      {/* QUICK PRESETS & OPTIONAL URL FALLBACK */}
      <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        {/* Preset Covers Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-600 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>أغلفة أدبية مقترحة:</span>
          </span>
          {PRESET_COVERS.map((preset, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChange(preset.url)}
              className="px-2 py-0.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded border border-slate-200 hover:border-amber-300 transition-colors text-[10px]"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* URL fallback toggle */}
        <button
          type="button"
          onClick={() => setShowUrlFallback(!showUrlFallback)}
          className="text-amber-700 hover:text-amber-800 underline flex items-center gap-1 text-[10px]"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlFallback ? 'إخفاء حقل الرابط' : 'أو إدخال رابط صورة خارجي'}</span>
        </button>
      </div>

      {showUrlFallback && (
        <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl space-y-2 animate-in fade-in">
          <label className="block text-[11px] font-semibold text-slate-700">
            أدخل رابط الصورة المباشر (URL):
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              dir="ltr"
              placeholder="https://example.com/cover.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg outline-none font-mono text-xs bg-white"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3 py-1.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors"
            >
              تطبيق الرابط
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
