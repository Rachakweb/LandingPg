import React, { useState, useEffect } from 'react';
import { cryptoService } from '../services/cryptoService';
import { INITIAL_TICKER_COINS } from '../data/cryptoData';

export default function CryptoTicker() {
  const [coins, setCoins] = useState(INITIAL_TICKER_COINS);

  useEffect(() => {
    // 1. Initial market fetch
    cryptoService.getMarketPrices().then((fetched) => {
      if (fetched && fetched.length > 0) {
        setCoins(fetched);
      }
    });

    // 2. Micro-tick updates for dynamic trader feel
    const interval = setInterval(() => {
      setCoins((prev) => cryptoService.simulateMicroTicks(prev));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const renderCoinCard = (coin, index) => {
    const isPositive = coin.change24h >= 0;
    const changeClass = isPositive ? 'text-emerald-400' : 'text-rose-400';
    const changeSign = isPositive ? '+' : '';
    const arrow = isPositive ? '▲' : '▼';
    const formattedPrice =
      coin.price >= 1
        ? coin.price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : coin.price.toFixed(4);

    return (
      <div
        key={`${coin.symbol}-${index}`}
        className="inline-flex items-center space-x-3 px-4 py-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-amber-500/40 transition-colors shadow-sm"
      >
        <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px] font-bold text-amber-400 font-mono">
          {coin.symbol.slice(0, 3)}
        </div>
        <span className="text-xs font-bold text-white font-mono">{coin.symbol}</span>
        <span className="text-xs text-slate-300 font-mono font-medium">${formattedPrice}</span>
        <span className={`text-[11px] font-mono font-semibold ${changeClass} flex items-center gap-0.5`}>
          <span>{arrow}</span>
          <span>
            {changeSign}
            {coin.change24h.toFixed(2)}%
          </span>
        </span>
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-950/80 border-y border-white/5 pt-24 pb-3 overflow-hidden z-20 relative">
      <div className="marquee-container">
        <div className="marquee-content flex items-center">
          {coins.map((coin, idx) => renderCoinCard(coin, idx))}
        </div>
        <div className="marquee-content flex items-center">
          {coins.map((coin, idx) => renderCoinCard(coin, `clone-${idx}`))}
        </div>
      </div>
    </div>
  );
}

