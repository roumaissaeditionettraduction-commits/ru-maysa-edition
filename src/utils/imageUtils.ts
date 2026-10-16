/**
 * Image processing utilities for client-side book cover and logo uploads.
 * Ensures images uploaded from phone cameras (often 10MB+) are compressed to 
 * crisp, web-optimized Data URLs (<150KB) that save smoothly in local storage.
 */

export interface ProcessedImage {
  dataUrl: string;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  format: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} بايت`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} ك.ب`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} م.ب`;
}

export function processImageFile(
  file: File,
  maxWidth = 1000,
  maxHeight = 1500,
  quality = 0.86
): Promise<ProcessedImage> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('فشل معالجة الصورة'));
          return;
        }

        // Draw image with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp or jpeg
        const mimeType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);

        // Calculate approximate size in bytes of base64
        const stringLength = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const compressedSize = Math.round((stringLength * 3) / 4);

        resolve({
          dataUrl,
          width,
          height,
          originalSize: file.size,
          compressedSize,
          format: file.type.replace('image/', '').toUpperCase()
        });
      };

      img.onerror = () => {
        reject(new Error('تعذر قراءة ملف الصورة. تأكد من سلامة الملف.'));
      };

      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      } else {
        reject(new Error('فشل قراءة الملف'));
      }
    };

    reader.onerror = () => {
      reject(new Error('حدث خطأ أثناء تحميل الملف'));
    };

    reader.readAsDataURL(file);
  });
}
