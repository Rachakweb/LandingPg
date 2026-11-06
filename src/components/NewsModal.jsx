import React from 'react';
import { X, Send } from 'lucide-react';
import { TELEGRAM_INVITE_URL } from '../data/cryptoData';

export default function NewsModal({ newsItem, onClose }) {
  if (!newsItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-amber-500/40 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {newsItem.badge}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2 leading-snug">
          {newsItem.title}
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-4">
          {newsItem.time} • Source: <span className="text-slate-200">{newsItem.source}</span> • Alpha Score:{' '}
          <span className="text-emerald-400 font-bold">{newsItem.alphaScore}/100</span>
        </p>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-white/5 text-slate-300 text-sm leading-relaxed mb-6 font-light">
          {newsItem.summary}
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-6">
          <span className="text-xs font-bold text-amber-400 uppercase font-mono block mb-1">
            Telegram Alpha Playbook
          </span>
          <p className="text-xs text-slate-200 font-mono">{newsItem.tradeSetup}</p>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={TELEGRAM_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-shimmer flex-1 py-3 text-xs font-bold text-slate-950 uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span>Discuss in Telegram VIP</span>
          </a>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

