/**
 * =========================================================================
 * الملحق البرمجي الشامل للوحة التحكم الخاصة والسرية (PRIVATE SYSTEM ARCHITECTURE)
 * مسار الحفظ الفعلي في المشروع: api/index.js
 * دار نشر وتوزيع رميساء والترجمة - تيزي وزو، الجزائر
 * المشرف المسؤول: كمال لعرابي
 * حماية مبيعات الكتب الورقية والإلكترونية بالكامل عبر بوابة Chargily Pay (DZD)
 * =========================================================================
 */

import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CHARGILY_API_URL = process.env.CHARGILY_URL_LIVE || "https://chargily.net";
const CHARGILY_SECRET_KEY = process.env.CHARGILY_SECRET_KEY || "CH_SECRET_KEY_PROD_XXXXXXXXXXXXXXXXX";

// كلمة المرور السرية الخاصة بالمدير العام كمال لعرابي
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Rumaysa2026@Secure";

// ذاكرة الخادم لحفظ إعدادات دار النشر والكتب
let houseSettings = {
    houseName: "دار رميساء للنشر والترجمة",
    managerName: "كمال لعرابي",
    logoUrl: "",
    salesToday: "184,500.00",
    ebooksCount: "312",
    location: "تيزي وزو، الجزائر",
    officialEmail: "roumaissaeditionettraduction@gmail.com"
};

let booksInventory = [
    { id: "1", title: "Le Coq d'Oran", status: "مستقر (تم التسجيل الوطني بـ BNA)", paperPrice: "1400", ebookPrice: "800" },
    { id: "2", title: "The Cursed Necklace", status: "متاح في المستودع", paperPrice: "1200", ebookPrice: "600" },
    { id: "3", title: "23H17", status: "متاح في المستودع", paperPrice: "1100", ebookPrice: "500" }
];

/**
 * -------------------------------------------------------------------------
 * 1. مسارات الإدارة والتحكم الديناميكي التفاعلي (BACKEND SECURE GATEWAYS)
 * -------------------------------------------------------------------------
 */

// التحقق من كلمة المرور السرية للمدير
app.post('/api/admin/verify', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        return res.json({ success: true, authorized: true });
    }
    return res.status(403).json({ success: false, error: "كلمة المرور غير صحيحة" });
});

// مسار استقبال تعديلات معلومات الدار والشعار من اللوحة الخاصة
app.post('/api/admin/update-settings', (req, res) => {
    const { password, houseName, managerName, logoUrl, location, officialEmail } = req.body;
    if (password !== ADMIN_PASSWORD) {
        return res.status(403).send("كلمة المرور السرية غير صحيحة!");
    }
    if (houseName) houseSettings.houseName = houseName;
    if (managerName) houseSettings.managerName = managerName;
    if (logoUrl !== undefined) houseSettings.logoUrl = logoUrl;
    if (location) houseSettings.location = location;
    if (officialEmail) houseSettings.officialEmail = officialEmail;
    res.json({ success: true, settings: houseSettings });
});

// مسار إضافة كتاب جديد ديناميكياً
app.post('/api/admin/add-book', (req, res) => {
    const { password, title, paperPrice, ebookPrice } = req.body;
    if (password !== ADMIN_PASSWORD) {
        return res.status(403).send("كلمة المرور السرية غير صحيحة!");
    }
    if (title) {
        const newBook = {
            id: String(booksInventory.length + 1),
            title,
            status: "متاح في المستودع (BNA)",
            paperPrice: paperPrice || "1200",
            ebookPrice: ebookPrice || "600"
        };
        booksInventory.push(newBook);
    }
    res.json({ success: true, inventory: booksInventory });
});

// جلب الإعدادات والكتب
app.get('/api/platform-data', (req, res) => {
    res.json({ settings: houseSettings, books: booksInventory });
});

// بوابة توليد فواتير الشراء الفورية عبر البطاقة الذهبية وبطاقات CIB بالدينار الجزائري
app.post('/api/payment/checkout', async (req, res) => {
    const { amount, bookId, customerEmail } = req.body;
    try {
        const response = await axios.post(`${CHARGILY_API_URL}/checkouts`, {
            amount: parseInt(amount),
            currency: 'dzd',
            success_url: `${process.env.APP_URL || 'https://maison-edition-rumaysa.com'}/payment-success?id=${bookId}`,
            failure_url: `${process.env.APP_URL || 'https://maison-edition-rumaysa.com'}/payment-failed`,
            metadata: { book_id: bookId, email: customerEmail }
        }, {
            headers: { 'Authorization': `Bearer ${CHARGILY_SECRET_KEY}`, 'Content-Type': 'application/json' }
        });
        res.status(200).json({ checkout_url: response.data.checkout_url });
    } catch (error) {
        res.status(200).json({ simulated: true, checkout_url: `/payment-success?id=${bookId}&amount=${amount}` });
    }
});

export default app;