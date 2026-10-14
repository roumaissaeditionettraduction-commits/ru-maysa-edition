import React, { useState, useEffect } from 'react';
import { SecurityGuard } from './components/SecurityGuard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PublicStorefront } from './components/PublicStorefront';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { ChargilyPayModal } from './components/ChargilyPayModal';
import { EbookReaderModal } from './components/EbookReaderModal';
import { ManuscriptSubmissionModal } from './components/ManuscriptSubmissionModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import {
  INITIAL_BOOKS,
  INITIAL_TRANSACTIONS,
  INITIAL_MANUSCRIPTS,
  INITIAL_SPAM_LOGS,
  INITIAL_DISCUSSIONS,
  DEFAULT_HOUSE_SETTINGS
} from './data/mockData';
import { Book, Transaction, ManuscriptSubmission, SpamLog, DiscussionComment, HouseSettings } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  
  // House & Website Settings (saved in localStorage for permanent persistence)
  const [houseSettings, setHouseSettings] = useState<HouseSettings>(() => {
    try {
      const saved = localStorage.getItem('roumaissa_house_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_HOUSE_SETTINGS;
  });

  // Admin authentication state (saved in sessionStorage)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('roumaissa_admin_auth') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // App State
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('roumaissa_books_inventory');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_BOOKS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [manuscripts, setManuscripts] = useState<ManuscriptSubmission[]>(INITIAL_MANUSCRIPTS);
  const [spamLogs, setSpamLogs] = useState<SpamLog[]>(INITIAL_SPAM_LOGS);
  const [discussions, setDiscussions] = useState<DiscussionComment[]>(INITIAL_DISCUSSIONS);

  // Modals state
  const [paymentTarget, setPaymentTarget] = useState<{
    book: Book;
    format: 'ebook' | 'paper' | 'both';
  } | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [showManuscriptModal, setShowManuscriptModal] = useState<boolean>(false);

  // Save settings when changed
  const handleUpdateSettings = (updated: HouseSettings) => {
    setHouseSettings(updated);
    try {
      localStorage.setItem('roumaissa_house_settings', JSON.stringify(updated));
    } catch (e) {}
  };

  // Save books inventory when changed
  const handleUpdateBook = (updated: Book) => {
    setBooks((prev) => {
      const next = prev.map((b) => (b.id === updated.id ? updated : b));
      try {
        localStorage.setItem('roumaissa_books_inventory', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleAddBook = (created: Book) => {
    setBooks((prev) => {
      const next = [created, ...prev];
      try {
        localStorage.setItem('roumaissa_books_inventory', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks((prev) => {
      const next = prev.filter((b) => b.id !== bookId);
      try {
        localStorage.setItem('roumaissa_books_inventory', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Dynamic KPI Calculations starting from prompt baseline
  const baseSalesFromInitial = 184500;
  const recentAddedSales = transactions
    .filter((t) => !INITIAL_TRANSACTIONS.some((init) => init.id === t.id))
    .reduce((acc, t) => acc + t.amountDZD, 0);
  const totalSalesDZD = baseSalesFromInitial + recentAddedSales;

  const baseDigitalCopies = 312;
  const recentDigitalPurchases = transactions
    .filter(
      (t) =>
        (t.format === 'ebook' || t.format === 'both') &&
        !INITIAL_TRANSACTIONS.some((init) => init.id === t.id)
    ).length;
  const totalDigitalCopies = baseDigitalCopies + recentDigitalPurchases;

  // Handlers
  const handlePaymentSuccess = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleManuscriptSubmit = (
    newSubmission: ManuscriptSubmission,
    detectedSpam?: SpamLog
  ) => {
    if (detectedSpam) {
      setSpamLogs((prev) => [detectedSpam, ...prev]);
    } else {
      setManuscripts((prev) => [newSubmission, ...prev]);
    }
  };

  const handleUpdateManuscriptStatus = (
    id: string,
    status: 'accepted' | 'rejected' | 'reviewing'
  ) => {
    setManuscripts((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const handleAddDiscussion = (commentData: {
    authorName: string;
    bookTitle: string;
    comment: string;
  }) => {
    const newComment: DiscussionComment = {
      id: `d-${Date.now()}`,
      authorName: commentData.authorName,
      authorRole: 'قارئ موثق',
      bookTitle: commentData.bookTitle,
      comment: commentData.comment,
      date: new Date().toISOString().slice(0, 10),
      isApproved: true
    };
    setDiscussions((prev) => [newComment, ...prev]);
  };

  const handleDeleteDiscussion = (id: string) => {
    setDiscussions((prev) => prev.filter((d) => d.id !== id));
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAuthModal(false);
    try {
      sessionStorage.setItem('roumaissa_admin_auth', 'true');
    } catch (e) {}
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('roumaissa_admin_auth');
    } catch (e) {}
  };

  return (
    <SecurityGuard>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
        {/* Top Navbar */}
        <Header
          currentView={currentView}
          houseSettings={houseSettings}
          isAdminAuthenticated={isAdminAuthenticated}
          onViewChange={setCurrentView}
          onOpenManuscriptModal={() => setShowManuscriptModal(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'store' ? (
            <PublicStorefront
              books={books}
              discussions={discussions}
              houseSettings={houseSettings}
              onSelectBookForPayment={(book, format) => setPaymentTarget({ book, format })}
              onSelectBookForReading={(book) => setReadingBook(book)}
              onOpenManuscriptModal={() => setShowManuscriptModal(true)}
              onAddDiscussion={handleAddDiscussion}
            />
          ) : (
            <ExecutiveDashboard
              books={books}
              transactions={transactions}
              manuscripts={manuscripts}
              spamLogs={spamLogs}
              discussions={discussions}
              totalSalesDZD={totalSalesDZD}
              digitalCopiesSold={totalDigitalCopies}
              houseSettings={houseSettings}
              isAdminAuthenticated={isAdminAuthenticated}
              onOpenAuthModal={() => setShowAuthModal(true)}
              onLogoutAdmin={handleAdminLogout}
              onUpdateSettings={handleUpdateSettings}
              onUpdateBook={handleUpdateBook}
              onDeleteBook={handleDeleteBook}
              onAddBook={handleAddBook}
              onUpdateManuscriptStatus={handleUpdateManuscriptStatus}
              onApproveDiscussion={() => {}}
              onDeleteDiscussion={handleDeleteDiscussion}
            />
          )}
        </main>

        {/* Footer */}
        <Footer houseSettings={houseSettings} />

        {/* Modals */}
        {showAuthModal && (
          <AdminAuthModal
            currentPassword={houseSettings.adminPassword}
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleAdminAuthSuccess}
          />
        )}

        {paymentTarget && (
          <ChargilyPayModal
            book={paymentTarget.book}
            format={paymentTarget.format}
            onClose={() => setPaymentTarget(null)}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {readingBook && (
          <EbookReaderModal
            book={readingBook}
            onClose={() => setReadingBook(null)}
          />
        )}

        {showManuscriptModal && (
          <ManuscriptSubmissionModal
            onClose={() => setShowManuscriptModal(false)}
            onSubmit={handleManuscriptSubmit}
          />
        )}
      </div>
    </SecurityGuard>
  );
}
