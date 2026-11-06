import React from 'react';
import { Send, MessageSquare, Video } from 'lucide-react';
import { TELEGRAM_INVITE_URL } from '../data/cryptoData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-cinzel font-bold text-lg text-amber-400">X</span>
                </div>
              </div>
              <span className="font-heading font-extrabold text-2xl text-white">
                PROJECT<span className="text-amber-400">X</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              The premier crypto trading syndicate dedicated to empowering individual traders with institutional intelligence, verified signals, and next-generation execution technology.
            </p>

            {/* Social Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              {/* Telegram */}
              <a
                href={TELEGRAM_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-400 hover:text-slate-950 hover:scale-110 transition-all duration-300 shadow-md"
                title="Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/15 hover:text-white hover:scale-110 transition-all duration-300 shadow-md"
                title="Follow on X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/15 hover:text-white hover:scale-110 transition-all duration-300 shadow-md"
                title="Discord Community"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/15 hover:text-white hover:scale-110 transition-all duration-300 shadow-md"
                title="YouTube Market Analysis"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Ecosystem
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home & Alpha</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Telegram Community</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">Live Trading News</a></li>
              <li><a href="#platform" className="hover:text-white transition-colors">ProjectX Platform</a></li>
              <li><a href="#register" className="hover:text-white transition-colors">VIP Registration</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Resources
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href={TELEGRAM_INVITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Telegram VIP Channel
                </a>
              </li>
              <li><a href="#platform" className="hover:text-white transition-colors">Trading Terminal Docs</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Risk Management 101</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">Macro Economic Calendar</a></li>
            </ul>
          </div>

          {/* Official Channel Callout */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Official Channel
            </h5>
            <p className="text-[11px] text-slate-400 leading-normal">
              Join using the authentic secure link below to avoid impersonators:
            </p>
            <a
              href={TELEGRAM_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono hover:bg-amber-500/20 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>t.me/+Kgdr1-eDxwNhYTg1</span>
            </a>
          </div>

        </div>

        {/* Legal & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 text-[11px] text-slate-500 font-mono">
          <p>© 2026 ProjectX Syndicate. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: Cryptocurrency trading involves significant financial risk. Content provided by ProjectX is for informational and educational purposes only and is not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

