export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorRole?: string;
  category: 'literature' | 'translation' | 'mystery' | 'history' | 'academic';
  categoryLabel: string;
  priceDZD: number;
  ebookPriceDZD?: number;
  paperAvailable: boolean;
  ebookAvailable: boolean;
  stockStatus: string; // e.g. "مستقر (تم التسجيل الوطني بـ BNA)" or "متاح في المستودع"
  bnaStatus: string;
  securityStatus: string; // "مؤمن / للقراءة فقط"
  pageCount: number;
  year: number;
  isbn: string;
  description: string;
  coverGradient: string;
  coverAccent: string;
  coverIcon: string;
  sampleChapters: {
    number: number;
    title: string;
    content: string;
  }[];
}

export interface Transaction {
  id: string;
  transactionRef: string;
  customerName: string;
  customerEmail: string;
  customerWilaya: string;
  bookId: string;
  bookTitle: string;
  format: 'ebook' | 'paper' | 'both';
  amountDZD: number;
  paymentMethod: 'edahabia' | 'cib';
  status: 'completed' | 'processing' | 'failed';
  date: string;
  chargilyCheckoutUrl?: string;
}

export interface ManuscriptSubmission {
  id: string;
  authorName: string;
  authorEmail: string;
  authorPhone: string;
  wilaya: string;
  manuscriptTitle: string;
  category: string;
  summary: string;
  wordCount: number;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  submittedAt: string;
  notes?: string;
}

export interface SpamLog {
  id: string;
  timestamp: string;
  sourceIp: string;
  action: string;
  blockedBy: 'Honeypot Trap' | 'reCAPTCHA v3 Score (<0.5)' | 'Rate Limiter';
  details: string;
}

export interface DiscussionComment {
  id: string;
  authorName: string;
  authorRole?: string;
  bookTitle: string;
  comment: string;
  date: string;
  isApproved: boolean;
  wilaya?: string;
}

export interface HouseSettings {
  houseName: string;
  tagline: string;
  managerName: string;
  managerTitle: string;
  logoUrl: string;
  location: string;
  officialEmail: string;
  phone1: string;
  phone2: string;
  bnaRegistrationCode: string;
  aboutText: string;
  paperDeliveryFee: number;
  adminPassword: string;
  protectionActive: boolean;
  chargilyLiveUrl: string;
  chargilySecretKey: string;
}
