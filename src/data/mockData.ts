import { Book, Transaction, ManuscriptSubmission, SpamLog, DiscussionComment, HouseSettings } from '../types';

export const DEFAULT_HOUSE_SETTINGS: HouseSettings = {
  houseName: "دار رميساء للنشر والترجمة",
  tagline: "حيث تلتقي أصالة الفكر الجزائري بدقة الترجمة العالمية",
  managerName: "كمال لعرابي",
  managerTitle: "المدير العام المسؤول",
  logoUrl: "",
  location: "تيزي وزو، الجمهورية الجزائرية",
  officialEmail: "roumaissaeditionettraduction@gmail.com",
  phone1: "026 21 44 80",
  phone2: "0550 18 92 34",
  bnaRegistrationCode: "BNA-DZ-2024-OFFICIAL",
  aboutText: "تأسست دار نشر وتوزيع رميساء في مدينة تيزي وزو بالجزائر كصرح ثقافي يعنى بنشر الأدب الرفيع، الترجمات الأكاديمية الدقيقة، والدراسات التاريخية التي توثق التراث الجزائري الغني. بقيادة المدير العام كمال لعرابي، نسعى دائماً لتكريس معايير الإيداع القانوني وتوفير قنوات توزيع وتجارة إلكترونية مؤمنة تخدم القارئ والمؤلف على حد سواء.",
  paperDeliveryFee: 400,
  adminPassword: "Rumaysa2026@Secure",
  protectionActive: true,
  chargilyLiveUrl: "https://chargily.net",
  chargilySecretKey: "CH_SECRET_KEY_PROD_XXXXXXXXXXXXXXXXX"
};

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'le-coq-doran',
    title: "Le Coq d'Oran",
    subtitle: 'رواية تاريخية وأدبية عن الذاكرة الجزائرية',
    author: 'دار رميساء - أدب معاصر وترجمة',
    authorRole: 'إصدار أصيل',
    category: 'literature',
    categoryLabel: 'أدب ورواية',
    priceDZD: 1400,
    paperAvailable: true,
    ebookAvailable: true,
    stockStatus: 'مستقر (تم التسجيل الوطني بـ BNA)',
    bnaStatus: 'معتمد ومودع قانونياً',
    securityStatus: 'مؤمن / للقراءة فقط',
    pageCount: 284,
    year: 2024,
    isbn: '978-9931-78-012-4',
    description: 'عمل روائي سردي متميز يوثق أزقة وهران العتيقة وتاريخها الثقافي الزاخر عبر سرد شاعري ممتع يربط بين الأجيال وعمق الهوية الوطنية الجزائرية.',
    coverGradient: 'from-amber-900 via-slate-900 to-amber-950',
    coverAccent: '#d4af37',
    coverIcon: 'crown',
    sampleChapters: [
      {
        number: 1,
        title: 'الفصل الأول: فجر المدينة العتيقة',
        content: `في الساعة الخامسة صباحاً، حين تهمس نسمات البحر الأبيض المتوسط عبر أزقة حي سيدي الهواري العتيق، كان صياح ديك وهران يوقظ المدينة النائمة تحت وهج الفجر. ليست مجرد نداءات تقليدية ليوم جديد، بل كانت نغمة عتيقة تسري في عروق الحجارة القديمة التي شهدت تعاقب الحقب وصمود الأجداد.

كان الشيخ عبد القادر يفتح نافذة مشغله الخشبي، ورائحة القهوة الممزوجة بالهيل تنتشر ببطء في فناء الدار. على طاولته العتيقة تتناثر مخطوطات نادرة ومسودات كتب تنتظر أن ترى النور. في تيزي وزو، وفي الجزائر العاصمة، وفي كل ركن من هذا الوطن الشاسع، تبقى الكلمة الصادقة المطبوعة جسراً يعبر فوق رياح النسيان.`
      },
      {
        number: 2,
        title: 'الفصل الثاني: أصداء الميناء والذاكرة',
        content: `امتد الرصيف البحري كذراع حجرية تحتضن أمواج البحر الزرقاء. السفن القادمة من وراء البحار ترسو بهدوء، بينما الصيادون يفرغون شباكهم المبللة بالملح والأمل. هنا تلتقي الحضارات، وهنا صاغ الأدباء الجزائريون ملاحمهم الإنسانية الخالدة.`
      }
    ]
  },
  {
    id: 'the-cursed-necklace',
    title: 'The Cursed Necklace',
    subtitle: 'القلادة الملعونة - رواية تشويق وأسرار مترجمة',
    author: 'ترجمة وتحقيق نخبة دار رميساء',
    authorRole: 'سلسلة الترجمات الدولية',
    category: 'mystery',
    categoryLabel: 'تشويق وترجمة',
    priceDZD: 1200,
    paperAvailable: true,
    ebookAvailable: true,
    stockStatus: 'متاح في المستودع',
    bnaStatus: 'معتمد ومودع قانونياً',
    securityStatus: 'مؤمن / للقراءة فقط',
    pageCount: 320,
    year: 2024,
    isbn: '978-9931-78-015-5',
    description: 'حبكة ألغاز تحبس الأنفاس تدور حول قلادة أثرية تناقلتها أسر أرستقراطية عبر ثلاثة قرون، حاملة معها لعنة خفية وألغازاً لا يحلها سوى فك شفرات مخطوط عثر عليه في قصر مهجور.',
    coverGradient: 'from-emerald-950 via-slate-900 to-teal-950',
    coverAccent: '#10b981',
    coverIcon: 'gem',
    sampleChapters: [
      {
        number: 1,
        title: 'Chapter I: The Velvet Box',
        content: `The rain drummed incessantly against the leaded glass windows of the family estate. In the center of the mahogany reading desk, bathed in the amber glow of a solitary banker lamp, lay a heavy, time-worn box lined with crimson velvet.

Inside, resting like a coiled serpent, the emerald pendant pulsed with an unnatural deep luminescence. Detective Mourad adjusted his glasses, consulting the translated notes from the Algiers Antiquities Bureau. The provenance was undeniable, yet every record ended with an abrupt, unexplained silence.`
      },
      {
        number: 2,
        title: 'الفصل الثاني: الظلال المتشابكة',
        content: `كل من ارتدى هذه القلادة على مدى مائتي عام واجه مصيراً غريباً ارتبط بقرارات مصيرية وأسرار عائلية دفينة. فتح مراد مذكرات الكونتيسة التي عثر عليها في أرشيف مكتبة تيزي وزو، ليجد بيتاً شعرياً غامضاً كُتب باللاتينية والعربية.`
      }
    ]
  },
  {
    id: '23h17',
    title: '23H17',
    subtitle: 'الحادية عشر وسبع عشرة دقيقة - رواية الإثارة والغموض',
    author: 'مؤلف معاصر - إصدارات الرواية البوليسية',
    authorRole: 'أدب التشويق الجزائري',
    category: 'mystery',
    categoryLabel: 'رواية بوليسية',
    priceDZD: 1100,
    paperAvailable: true,
    ebookAvailable: true,
    stockStatus: 'متاح في المستودع',
    bnaStatus: 'معتمد ومودع قانونياً',
    securityStatus: 'مؤمن / للقراءة فقط',
    pageCount: 240,
    year: 2024,
    isbn: '978-9931-78-019-3',
    description: 'في تمام الساعة 23:17، يتلقى هاتف المحقق اتصالاً غامضاً ينقطع بعد ست ثوانٍ فقط. تبدأ مطاردة فكرية معقدة عبر شوارع العاصمة، متتبعة رسائل مشفرة داخل نسخ كتب نادرة.',
    coverGradient: 'from-slate-900 via-indigo-950 to-slate-950',
    coverAccent: '#6366f1',
    coverIcon: 'clock',
    sampleChapters: [
      {
        number: 1,
        title: 'الفصل الأول: المكالمة الصامتة',
        content: `أضاءت شاشة الهاتف الرقمي في زاوية المكتب المظلم: 23:17. 
رنين وحيد، ثم صمت مطبق ملأ الغرفة. حين رفع سماعة الهاتف، لم يسمع سوى دقات ساعة ميكانيكية قديمة وشهيق خافت مصحوب بصوت تقليب صفحات ورقية سريعة.

عرف المفتش رضا على الفور أن اللعبة قد بدأت من جديد. المصادفة ليست جزءاً من قاموس هذه المدينة، وتكرار هذا التوقيت بالتحديد للمرة الثالثة خلال أسبوع واحد كان دليلاً على خطة دقيقة محكمة التنفيذ.`
      }
    ]
  },
  {
    id: 'djurdjura-memoirs',
    title: 'ذاكرة جبال جرجرة',
    subtitle: 'وثائق وتراجم تاريخية من قلب منطقة القبائل',
    author: 'أ.د. كمال بلقاسم - تقديم دار رميساء',
    authorRole: 'دراسات تاريخية',
    category: 'history',
    categoryLabel: 'تاريخ وتراث',
    priceDZD: 1650,
    paperAvailable: true,
    ebookAvailable: true,
    stockStatus: 'طبعة جديدة منقحة (BNA)',
    bnaStatus: 'معتمد ومودع قانونياً',
    securityStatus: 'مؤمن / للقراءة فقط',
    pageCount: 412,
    year: 2025,
    isbn: '978-9931-78-024-7',
    description: 'مرجع توثيقي شامل يستعرض تاريخ وثقافة وقرى جبال جرجرة الشامخة، مع وثائق أصلية تُنشر للمرة الأولى باللغتين العربية والفرنسية.',
    coverGradient: 'from-stone-900 via-amber-950 to-slate-900',
    coverAccent: '#f59e0b',
    coverIcon: 'mountain',
    sampleChapters: [
      {
        number: 1,
        title: 'الفصل الأول: قمم تلامس السحاب',
        content: `تقف قمم جرجرة كحراس أوفياء للذاكرة الجزائرية. من أعلى قمة لالة خديجة إلى الوديان الخضراء المنبسطة نحو تيزي وزو وبجاية، تختزن هذه الجبال بطولات وتاريخاً حياً تناقلته الأجيال شفهياً ومكتوباً.`
      }
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-10492',
    transactionRef: 'CHG-DZ-894102',
    customerName: 'أمين بلحاج',
    customerEmail: 'amine.belhadj@example.dz',
    customerWilaya: 'الجزائر العاصمة',
    bookId: 'le-coq-doran',
    bookTitle: "Le Coq d'Oran",
    format: 'ebook',
    amountDZD: 1400,
    paymentMethod: 'edahabia',
    status: 'completed',
    date: '2026-10-14 11:42'
  },
  {
    id: 'tx-10491',
    transactionRef: 'CHG-DZ-894088',
    customerName: 'فاطمة الزهراء مزيان',
    customerEmail: 'fatima.meziane@example.dz',
    customerWilaya: 'تيزي وزو',
    bookId: 'the-cursed-necklace',
    bookTitle: 'The Cursed Necklace',
    format: 'both',
    amountDZD: 1200,
    paymentMethod: 'edahabia',
    status: 'completed',
    date: '2026-10-14 10:15'
  },
  {
    id: 'tx-10490',
    transactionRef: 'CHG-DZ-894052',
    customerName: 'كريم قاسي',
    customerEmail: 'karim.kassi@example.dz',
    customerWilaya: 'وهران',
    bookId: '23h17',
    bookTitle: '23H17',
    format: 'paper',
    amountDZD: 1100,
    paymentMethod: 'cib',
    status: 'completed',
    date: '2026-10-13 18:30'
  },
  {
    id: 'tx-10489',
    transactionRef: 'CHG-DZ-893991',
    customerName: 'ياسمين حداد',
    customerEmail: 'yasmine.haddad@example.dz',
    customerWilaya: 'قسنطينة',
    bookId: 'djurdjura-memoirs',
    bookTitle: 'ذاكرة جبال جرجرة',
    format: 'ebook',
    amountDZD: 1650,
    paymentMethod: 'edahabia',
    status: 'completed',
    date: '2026-10-13 14:05'
  },
  {
    id: 'tx-10488',
    transactionRef: 'CHG-DZ-893910',
    customerName: 'سفيان عماروش',
    customerEmail: 'sofiane.amarouche@example.dz',
    customerWilaya: 'سطيف',
    bookId: 'le-coq-doran',
    bookTitle: "Le Coq d'Oran",
    format: 'paper',
    amountDZD: 1400,
    paymentMethod: 'cib',
    status: 'completed',
    date: '2026-10-12 16:20'
  }
];

export const INITIAL_MANUSCRIPTS: ManuscriptSubmission[] = [
  {
    id: 'ms-01',
    authorName: 'د. إلياس بوجمعة',
    authorEmail: 'elias.boudjemaa@gmail.com',
    authorPhone: '0550123456',
    wilaya: 'تيزي وزو (15)',
    manuscriptTitle: 'تاريخ الترجمة في المغرب الأوسط خلال العهد الزياني',
    category: 'تاريخ وأكاديمي',
    summary: 'بحث تاريخي موثق يستند إلى وثائق أصلية يتناول حركة نقل العلوم والآداب في تلمسان وبجاية في القرنين الثالث عشر والرابع عشر الميلاديين.',
    wordCount: 78000,
    status: 'pending',
    submittedAt: '2026-10-14 09:20',
    notes: 'بانتظار موافقة المدير العام كمال لعرابي للتحكيم'
  },
  {
    id: 'ms-02',
    authorName: 'سارة لعمري',
    authorEmail: 'sarah.laamri@yahoo.fr',
    authorPhone: '0770987654',
    wilaya: 'الجزائر العاصمة (16)',
    manuscriptTitle: 'طيور السنونو لا تنام في الضباب (رواية)',
    category: 'رواية معاصرة',
    summary: 'رواية اجتماعية نفسية تتناول حياة طالبة جامعية في كلية الآداب تبحث عن مخطوطة شعرية مفقودة لجدها الذي شارك في ثورة التحرير.',
    wordCount: 52000,
    status: 'reviewing',
    submittedAt: '2026-10-13 14:45',
    notes: 'تمت القراءة الأولية وإحالتها للجنة التدقيق اللغوي'
  },
  {
    id: 'ms-03',
    authorName: 'مراد سعداوي',
    authorEmail: 'mourad.saadaoui@outlook.com',
    authorPhone: '0661223344',
    wilaya: 'بجاية (06)',
    manuscriptTitle: 'أطلس الأعشاب والطب الشعبي الأمازيغي',
    category: 'تراث وبيئة',
    summary: 'دراسة ميدانية مصورة لأكثر من 150 نبتة طبية في جبال جرجرة والبابور وتطبيقاتها العلاجية التراثية الموثقة.',
    wordCount: 64000,
    status: 'pending',
    submittedAt: '2026-10-12 11:10',
    notes: 'مشروع مميز يستحق النشر المشترك مع صور ملونة'
  }
];

export const INITIAL_SPAM_LOGS: SpamLog[] = [
  {
    id: 'spam-801',
    timestamp: '2026-10-14 11:05:22',
    sourceIp: '185.220.101.44 (Tor Exit Node)',
    action: 'محاولة إرسال استمارة منتدى المناقشات',
    blockedBy: 'Honeypot Trap',
    details: 'ملء الحقل الخفي (honeypotField) بنصوص عشوائية آلية.'
  },
  {
    id: 'spam-802',
    timestamp: '2026-10-14 08:33:14',
    sourceIp: '194.26.29.112 (DataCenter Bot)',
    action: 'محاولة إرسال مسودة وهمية (SEO Spam)',
    blockedBy: 'reCAPTCHA v3 Score (<0.5)',
    details: 'درجة السلوك الآلي: 0.12 - تم حظر الطلب قبل وصوله إلى قاعدة البيانات.'
  },
  {
    id: 'spam-803',
    timestamp: '2026-10-13 22:19:01',
    sourceIp: '45.154.255.8 (Proxy Scraper)',
    action: 'محاولة تفريغ محتوى الكتب (Scraping)',
    blockedBy: 'Rate Limiter',
    details: 'تجاوز 60 طلباً خلال دقيقة واحدة على مسارات الكتب المحمية.'
  }
];

export const INITIAL_DISCUSSIONS: DiscussionComment[] = [
  {
    id: 'd-1',
    authorName: 'الأستاذ رشيد آيت حمودة',
    authorRole: 'أستاذ أدب بجامعة مولود معمري تيزي وزو',
    bookTitle: "Le Coq d'Oran",
    comment: 'عمل أدبي استثنائي يجمع بين عمق التوثيق التاريخي وسلاسة التعبير الروائي الراقي. دار رميساء تقدم إضافة نوعية للمكتبة الجزائرية.',
    date: '2026-10-13',
    isApproved: true,
    wilaya: 'تيزي وزو'
  },
  {
    id: 'd-2',
    authorName: 'نادية بن عيسى',
    authorRole: 'قارئة وباحثة',
    bookTitle: 'The Cursed Necklace',
    comment: 'الترجمة العربية بالغة الدقة وتحافظ على الروح التشويقية الأصلية للعمل دون أي إخلال. تجربة القارئ الإلكتروني المحمي مريحة وسلسة جداً.',
    date: '2026-10-12',
    isApproved: true,
    wilaya: 'وهران'
  }
];

export const ALGERIAN_WILAYAS = [
  '01 - أدرار', '02 - الشلف', '03 - الأغواط', '04 - أم البواقي', '05 - باتنة',
  '06 - بجاية', '07 - بسكرة', '08 - بشار', '09 - البليدة', '10 - البويرة',
  '11 - تمنراست', '12 - تبسة', '13 - تلمسان', '14 - تيارت', '15 - تيزي وزو',
  '16 - الجزائر العاصمة', '17 - الجلفة', '18 - جيجل', '19 - سطيف', '20 - سعيدة',
  '21 - سكيكدة', '22 - سيدي بلعباس', '23 - عنابة', '24 - قالمة', '25 - قسنطينة',
  '26 - المدية', '27 - مستغانم', '28 - المسيلة', '29 - معسكر', '30 - ورقلة',
  '31 - وهران', '32 - البيض', '33 - إليزي', '34 - برج بوعريريج', '35 - بومرداس',
  '36 - الطارف', '37 - تندوف', '38 - تسمسيلت', '39 - الوادي', '40 - خنشلة',
  '41 - سوق أهراس', '42 - تيبازة', '43 - ميلة', '44 - عين الدفلى', '45 - النعامة',
  '46 - عين تموشنت', '47 - غرداية', '48 - غليزان', '49 - تيميمون', '50 - برج باجي مختار',
  '51 - أولاد جلال', '52 - بني عباس', '53 - عين صالح', '54 - عين قزام', '55 - توقرت',
  '56 - جانت', '57 - المغير', '58 - المنيعة'
];
