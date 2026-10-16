import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Minimal standalone PNG encoder using Node's built-in zlib
function createPNG(width, height, getPixel) {
  // RGBA buffer: height rows, each row has 1 filter byte (0) + width * 4 bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Header: 89 50 4E 47 0D 0A 1A 0A
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// Brand color generator: luxury deep navy background #0f172a, gold borders and medallion #d4af37
function getBrandPixel(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background gradient: radial deep slate/navy
  const bgFactor = Math.min(1, dist / (w * 0.7));
  let r = Math.round(15 * (1 - bgFactor) + 2 * bgFactor);
  let g = Math.round(23 * (1 - bgFactor) + 6 * bgFactor);
  let b = Math.round(42 * (1 - bgFactor) + 23 * bgFactor);
  let a = 255;

  const radius = w * (isMaskable ? 0.38 : 0.44);

  // Outer gold circle ring
  if (Math.abs(dist - radius) < w * 0.015) {
    // Gold ring
    return [212, 175, 55, 255];
  }
  if (Math.abs(dist - (radius - w * 0.025)) < w * 0.008) {
    // Inner dashed gold ring
    const angle = Math.atan2(dy, dx);
    if ((angle * 10) % 2 > 0) {
      return [234, 179, 8, 240];
    }
  }

  // Inside medallion book & 'R' monogram area
  if (dist < radius - w * 0.04) {
    // Center emblem
    // Crown area: near top of center
    if (dy < -radius * 0.3 && dy > -radius * 0.7 && Math.abs(dx) < radius * 0.35) {
      const crownY = (dy + radius * 0.5) / (radius * 0.2);
      if (Math.abs(dx) < (radius * 0.35) * (1 - crownY * 0.3)) {
        return [254, 240, 138, 255]; // Bright Gold
      }
    }

    // Calligraphic curved strokes of letter 'ر' (Roumaissa)
    const normX = dx / (radius * 0.6);
    const normY = dy / (radius * 0.6);
    const curveDist = Math.abs((normX - 0.2) + Math.sin(normY * 2.2) * 0.5);
    if (curveDist < 0.25 && normY > -0.4 && normY < 0.7) {
      return [245, 158, 11, 255]; // Warm Gold
    }

    // Book base
    if (dy > radius * 0.4 && dy < radius * 0.65 && Math.abs(dx) < radius * 0.7) {
      const bookCurve = Math.abs(Math.sin((dx / radius) * 3.14)) * 0.1;
      if (dy > radius * (0.45 + bookCurve)) {
        return [212, 175, 55, 230];
      }
    }
  }

  return [r, g, b, a];
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate PWA icons
const sizes = [
  { file: 'pwa-192x192.png', size: 192, maskable: false },
  { file: 'pwa-512x512.png', size: 512, maskable: false },
  { file: 'pwa-maskable-512x512.png', size: 512, maskable: true },
  { file: 'apple-touch-icon.png', size: 180, maskable: false },
  { file: 'favicon-32x32.png', size: 32, maskable: false },
];

for (const { file, size, maskable } of sizes) {
  const buf = createPNG(size, size, (x, y, w, h) => getBrandPixel(x, y, w, h, maskable));
  fs.writeFileSync(path.join(publicDir, file), buf);
  console.log(`Generated ${file} (${size}x${size})`);
}

// Create favicon.ico using 32x32 PNG buffer
const png32 = fs.readFileSync(path.join(publicDir, 'favicon-32x32.png'));
// Minimal ICO header wrapping PNG
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
icoHeader.writeUInt16LE(1, 4); // 1 Image

const icoDir = Buffer.alloc(16);
icoDir[0] = 32; // Width
icoDir[1] = 32; // Height
icoDir[2] = 0;  // Colors
icoDir[3] = 0;  // Reserved
icoDir.writeUInt16LE(1, 4);  // Color planes
icoDir.writeUInt16LE(32, 6); // Bits per pixel
icoDir.writeUInt32LE(png32.length, 8); // Size
icoDir.writeUInt32LE(22, 12); // Offset (6 + 16 = 22)

const icoBuf = Buffer.concat([icoHeader, icoDir, png32]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
console.log('Generated favicon.ico');
