import React from 'react';
import { Send, ArrowRight, Sparkles, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import TelegramSignalCard from './TelegramSignalCard';
import { KEY_METRICS, TELEGRAM_INVITE_URL } from '../data/cryptoData';

export default function Hero() {
  return (
    <section id="home" className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* VIP Status Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md shadow-lg shadow-amber-500/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3"></span>
              <span className="text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
                TELEGRAM ALPHA CHANNEL • PRIVATE ACCESS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.08]">
              Master The Crypto Markets With <span className="text-gold-gradient">ProjectX</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Gain an institutional edge in Bitcoin, Ethereum, and high-velocity altcoins. We deliver verified high-win-rate trading signals, institutional on-chain insider tips, breaking macro news, and exclusive early access to our proprietary upcoming trading terminal.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={TELEGRAM_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-shimmer w-full sm:w-auto px-8 py-4 text-base font-extrabold uppercase tracking-wider text-slate-950 flex items-center justify-center space-x-3 shadow-2xl group"
              >
                <Send className="w-5 h-5 fill-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Join Telegram Channel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#platform"
                className="btn-glass w-full sm:w-auto px-7 py-4 rounded-full text-base font-semibold flex items-center justify-center space-x-2.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Upcoming Platform</span>
              </a>
            </div>

            {/* Proof Badges */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 font-mono text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Free Community Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Zero Prior Experience Needed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Real-Time Buy/Sell Alerts</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Signal Card */}
          <div className="lg:col-span-5">
            <TelegramSignalCard />
          </div>

        </div>

        {/* Key Metrics Strip */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className={`glass-panel rounded-2xl p-6 text-center border-t-2 ${metric.border} hover:border-amber-400 transition-colors`}
            >
              <div className={`font-heading font-extrabold text-3xl sm:text-4xl font-mono ${metric.color}`}>
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-300 font-bold mt-1">
                {metric.label}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{metric.subtext}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

