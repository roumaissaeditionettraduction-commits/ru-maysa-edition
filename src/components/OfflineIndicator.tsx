import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-4 sm:left-6 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 text-amber-300 border border-amber-400/40 px-3.5 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>وضع القراءة دون اتصال (Offline) — البيانات وفهارس الكتب المخزنة متاحة للقراءة.</span>
    </div>
  );
};
