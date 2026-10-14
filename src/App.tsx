import React, { useState } from 'react';
import { SecurityGuard } from './components/SecurityGuard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PublicStorefront } from './components/PublicStorefront';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { ChargilyPayModal } from './components/ChargilyPayModal';
import { EbookReaderModal } from './components/EbookReaderModal';
import { ManuscriptSubmissionModal } from './components/ManuscriptSubmissionModal';
import {
  INITIAL_BOOKS,
  INITIAL_TRANSACTIONS,
  INITIAL_MANUSCRIPTS,
  INITIAL_SPAM_LOGS,
  INITIAL_DISCUSSIONS
} from './data/mockData';
import { Book, Transaction, ManuscriptSubmission, SpamLog, DiscussionComment } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  
  // App State
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
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

  const handleUpdateBook = (updated: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const handleAddBook = (created: Book) => {
    setBooks((prev) => [created, ...prev]);
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

  return (
    <SecurityGuard>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
        {/* Top Navbar */}
        <Header
          currentView={currentView}
          onViewChange={setCurrentView}
          onOpenManuscriptModal={() => setShowManuscriptModal(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'store' ? (
            <PublicStorefront
              books={books}
              discussions={discussions}
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
              onUpdateBook={handleUpdateBook}
              onAddBook={handleAddBook}
              onUpdateManuscriptStatus={handleUpdateManuscriptStatus}
              onApproveDiscussion={() => {}}
              onDeleteDiscussion={handleDeleteDiscussion}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals */}
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
