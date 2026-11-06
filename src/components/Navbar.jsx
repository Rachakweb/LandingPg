import React, { useState, useEffect } from 'react';
import { Wallet, Send, Menu, X } from 'lucide-react';
import { TELEGRAM_INVITE_URL } from '../data/cryptoData';

export default function Navbar({ onOpenWallet, connectedWallet, onDisconnectWallet }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Community & Tips', href: '#community' },
    { label: 'Trading News', href: '#news', badge: 'LIVE' },
    { label: 'ProjectX Platform', href: '#platform' },
    { label: 'VIP Register', href: '#register' }
  ];

  const handleWalletClick = (e) => {
    e.preventDefault();
    if (connectedWallet) {
      if (window.confirm(`Connected to ${connectedWallet.address}. Disconnect wallet?`)) {
        onDisconnectWallet();
      }
    } else {
      onOpenWallet();
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled
            ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo of ProjectX */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="font-cinzel font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 tracking-wider">
                  X
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  PROJECT<span className="text-amber-400">X</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-badge"></span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono -mt-1 font-semibold">
                Crypto Syndicate
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 px-6 py-2.5 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Wallet Button */}
            <button
              onClick={handleWalletClick}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 backdrop-blur-md flex items-center ${
                connectedWallet
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'text-slate-300 border-white/15 bg-white/5 hover:bg-white/10 hover:border-amber-400/40 hover:text-amber-300'
              }`}
            >
              {connectedWallet ? (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono text-xs">{connectedWallet.address}</span>
                </div>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>

            {/* Telegram Join CTA */}
            <a
              href={TELEGRAM_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-shimmer px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 flex items-center space-x-2"
            >
              <Send className="w-4 h-4 fill-slate-950" />
              <span>Join Telegram</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-cinzel font-bold text-lg text-amber-400">X</span>
              </div>
            </div>
            <span className="font-heading font-extrabold text-xl text-white">
              PROJECT<span className="text-amber-400">X</span>
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-heading font-bold text-slate-200 hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Mobile Drawer Actions */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleWalletClick({ preventDefault: () => {} });
            }}
            className="w-full py-3.5 rounded-xl border border-white/15 bg-white/5 text-slate-200 font-semibold flex items-center justify-center space-x-2 text-sm"
          >
            <Wallet className="w-4 h-4" />
            <span>{connectedWallet ? `Connected: ${connectedWallet.address}` : 'Connect Web3 Wallet'}</span>
          </button>

          <a
            href={TELEGRAM_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-shimmer w-full py-3.5 rounded-xl text-center font-bold text-slate-950 flex items-center justify-center space-x-2 text-sm shadow-xl"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span>Join VIP Telegram Channel</span>
          </a>
        </div>
      </div>
    </>
  );
}

