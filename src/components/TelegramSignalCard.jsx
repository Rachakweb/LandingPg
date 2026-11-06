import React from 'react';
import { BadgeCheck, TrendingUp, Send } from 'lucide-react';
import { TELEGRAM_INVITE_URL } from '../data/cryptoData';

export default function TelegramSignalCard() {
  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-emerald-500/10 to-cyan-500/20 rounded-3xl blur-2xl -z-10"></div>

      {/* Main Glassmorphic Card */}
      <div className="glass-panel-gold rounded-3xl p-6 md:p-7 relative border border-amber-500/30 shadow-2xl backdrop-blur-2xl">
        
        {/* Telegram Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-cinzel font-bold text-slate-950 text-sm">
                PX
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-heading font-bold text-sm text-white">ProjectX • VIP Alpha Signals</h4>
                <BadgeCheck className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              </div>
              <span className="text-[11px] text-emerald-400 font-mono">● 42,890 subscribers online</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-400 font-bold uppercase">
            PINNED ALPHA
          </span>
        </div>

        {/* Signal Body */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 relative">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40">
                🟢 LONG: BTC / USDT
              </span>
              <span className="text-slate-400">12:48 UTC • Verified Signal</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Leverage:</span>
                <span className="text-amber-400 font-bold">Cross 20x (Isolated Safe)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Entry Range:</span>
                <span className="text-white font-semibold">$91,850 - $92,400</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Take Profit 1:</span>
                <span className="text-emerald-400 font-bold">$94,200 (+52%) ✅ HIT</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Take Profit 2:</span>
                <span className="text-emerald-400 font-bold">$97,500 (+124%) ✅ HIT</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Moon Target:</span>
                <span className="text-emerald-300 font-bold">$103,000 (+242%) 🚀 IN PLAY</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Stop Loss:</span>
                <span className="text-rose-400 font-bold">$90,200 (Strict Risk 1.8%)</span>
              </div>
            </div>

            {/* Verified Win Ribbon */}
            <div className="mt-3.5 p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-bold font-mono">Net Gain: +186.4% ROI</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Execution: 4h 12m</span>
            </div>
          </div>

          {/* Instant Join CTA */}
          <div className="pt-2">
            <a
              href={TELEGRAM_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-heading font-extrabold text-sm tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-300"
            >
              <Send className="w-4 h-4 fill-slate-950" />
              <span>Unlock Next Live Signal on Telegram</span>
            </a>
            <p className="text-center text-[10px] text-slate-400 mt-2 font-mono">
              Direct invite link:{' '}
              <span className="text-amber-400 underline">t.me/+Kgdr1-eDxwNhYTg1</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

