import React from 'react';
import { Radio, Key, Crosshair, Mic, Check, Send } from 'lucide-react';
import { TELEGRAM_INVITE_URL } from '../data/cryptoData';

export default function Community() {
  return (
    <section id="community" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Inside The Telegram Alpha Channel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white">
            Why Top Crypto Traders Call <span className="text-gold-gradient">ProjectX</span> Their Secret Weapon
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            While retail traders gamble on social media noise, ProjectX members receive actionable institutional flow, verified entry parameters, and risk-managed execution playbooks directly in Telegram.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Insider Tips */}
          <div className="luxury-card p-8 group">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Key className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
              Insider Tips & Whale Wallets
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
              Track smart money before public market pumps. We decode on-chain wallet clusters, liquidity migration, and exchange deposit/withdrawal anomalies in real-time.
            </p>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>OTC Whale accumulation alerts</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>DEX contract early liquidity sniffer</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CEX reserve depletion indicators</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Precision Signals */}
          <div className="luxury-card p-8 group border-amber-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Crosshair className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
              Precision Signals & Setups
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
              No guessing or vague opinions. Every single call includes exact entry ranges, multi-tier profit targets (TP1-TP4), stop-loss levels, and dynamic trailing guidelines.
            </p>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bitcoin & Ethereum swing calls</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>High-momentum breakout altcoins</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Defined risk:reward (minimum 1:3)</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Daily Live Briefs */}
          <div className="luxury-card p-8 group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Mic className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              Daily Live Market Briefings
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
              Wake up to clear, audio-visual market breakdowns from our senior quant traders. Understand key macro drivers, CPI/FOMC volatility playbooks, and funding shifts.
            </p>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Morning Asia/London/NY market opens</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Interactive Q&A in Telegram</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom TradingView chart templates</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Telegram Direct Callout Banner */}
        <div className="mt-12 rounded-3xl p-8 md:p-10 bg-gradient-to-r from-amber-500/15 via-slate-900/90 to-emerald-500/15 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl font-heading font-bold text-white">
              Ready to Receive Today's Top Crypto Alpha?
            </h4>
            <p className="text-slate-300 text-sm">
              Join over 42,000 active traders right now. Free instant access via our official invite link.
            </p>
          </div>
          <a
            href={TELEGRAM_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-shimmer px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-slate-950 flex items-center space-x-2 shrink-0"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span>Join Official Telegram Channel</span>
          </a>
        </div>

      </div>
    </section>
  );
}

