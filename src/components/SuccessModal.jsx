import React, { useEffect } from 'react';
import { Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TELEGRAM_INVITE_URL } from '../data/cryptoData';

export default function SuccessModal({ data, onClose }) {
  if (!data) return null;

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#fbbf24', '#ffffff']
      });
    } catch (e) {
      // Graceful fallback if canvas is not ready
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 max-w-md w-full border border-emerald-500/40 shadow-2xl text-center relative">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-4 pulse-badge">
          <Check className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-heading font-extrabold text-white mb-1">
          VIP Pass Approved!
        </h3>
        <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4">
          Membership Tier: Alpha Platinum
        </p>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Welcome <strong className="text-white">{data.name || 'Trader'}</strong>! Your Telegram account (
          <strong className="text-amber-400">{data.telegram || '@username'}</strong>) has been whitelisted for priority access. Enter the private channel below to unlock immediate trading signals.
        </p>

        <div className="space-y-3">
          <a
            href={TELEGRAM_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-shimmer w-full py-4 text-sm font-extrabold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-2 shadow-2xl"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span>Join Private Telegram Channel Now</span>
          </a>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}

