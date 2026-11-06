import React, { useState } from 'react';
import { Wallet, X, ChevronRight } from 'lucide-react';

export default function WalletModal({ isOpen, onClose, onConnect }) {
  const [connectingProvider, setConnectingProvider] = useState(null);

  if (!isOpen) return null;

  const handleSelect = (provider) => {
    setConnectingProvider(provider);
    setTimeout(() => {
      const mockAddress =
        '0x' +
        Array.from({ length: 40 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join('');
      const shortAddr = mockAddress.slice(0, 6) + '...' + mockAddress.slice(-4);

      onConnect({
        provider,
        address: shortAddr,
        fullAddress: mockAddress
      });

      setConnectingProvider(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 max-w-md w-full border border-amber-500/40 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Wallet className="w-5 h-5 text-amber-400" />
            <h3 className="font-heading font-bold text-lg text-white">Connect Web3 Wallet</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-6">
          Select your Web3 wallet to verify on-chain membership and early platform privileges:
        </p>

        <div className="space-y-3">
          <button
            onClick={() => handleSelect('MetaMask')}
            disabled={!!connectingProvider}
            className="w-full p-3.5 rounded-xl bg-slate-900/80 hover:bg-amber-500/10 border border-white/10 hover:border-amber-400/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center font-bold text-orange-400 text-lg">
                🦊
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-white group-hover:text-amber-400">
                  MetaMask
                </span>
                <span className="block text-[10px] text-slate-400 font-mono">
                  Ethereum, Arbitrum, Base
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleSelect('Phantom')}
            disabled={!!connectingProvider}
            className="w-full p-3.5 rounded-xl bg-slate-900/80 hover:bg-amber-500/10 border border-white/10 hover:border-amber-400/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center font-bold text-purple-400 text-lg">
                👻
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-white group-hover:text-amber-400">
                  Phantom
                </span>
                <span className="block text-[10px] text-slate-400 font-mono">
                  Solana & Multi-Chain
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleSelect('WalletConnect')}
            disabled={!!connectingProvider}
            className="w-full p-3.5 rounded-xl bg-slate-900/80 hover:bg-amber-500/10 border border-white/10 hover:border-amber-400/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center font-bold text-blue-400 text-lg">
                🔗
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold text-white group-hover:text-amber-400">
                  WalletConnect
                </span>
                <span className="block text-[10px] text-slate-400 font-mono">
                  300+ Supported Mobile Wallets
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {connectingProvider && (
          <div className="mt-4 text-center text-xs font-mono text-amber-400 animate-pulse">
            Connecting to {connectingProvider}... Requesting signature...
          </div>
        )}
      </div>
    </div>
  );
}

