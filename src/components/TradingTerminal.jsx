import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Zap, Shield, Bot, Lock, Key } from 'lucide-react';

export default function TradingTerminal() {
  const canvasRef = useRef(null);
  const [livePrice, setLivePrice] = useState(92840.50);
  const [timeframe, setTimeframe] = useState('1H');
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });

  // Generate simulated candlestick chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    let base = 92450;
    const initialCandles = [];
    for (let i = 0; i < 40; i++) {
      const open = base;
      const change = (Math.random() - 0.47) * 220;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 95;
      const low = Math.min(open, close) - Math.random() * 95;
      initialCandles.push({ open, close, high, low, time: i });
      base = close;
    }

    let candles = [...initialCandles];

    function draw() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const width = (canvas.width = parent.clientWidth);
      const height = (canvas.height = Math.max(parent.clientHeight, 270));

      ctx.clearRect(0, 0, width, height);

      const paddingTop = 20;
      const paddingBottom = 25;
      const chartHeight = height - paddingTop - paddingBottom;
      const candleWidth = Math.max(4, (width / candles.length) * 0.65);
      const gap = width / candles.length;

      let minPrice = Infinity;
      let maxPrice = -Infinity;
      candles.forEach((c) => {
        if (c.low < minPrice) minPrice = c.low;
        if (c.high > maxPrice) maxPrice = c.high;
      });

      const priceRange = maxPrice - minPrice || 1;
      const getY = (price) =>
        paddingTop + chartHeight - ((price - minPrice) / priceRange) * chartHeight;

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = paddingTop + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        const priceVal = maxPrice - (priceRange / 4) * i;
        ctx.fillStyle = '#64748b';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(`$${priceVal.toFixed(0)}`, width - 55, y - 4);
      }

      // Moving Average (Golden SMA)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.lineWidth = 1.8;
      candles.forEach((c, i) => {
        const x = i * gap + gap / 2;
        const y = getY((c.open + c.close) / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Candlesticks
      candles.forEach((c, i) => {
        const x = i * gap + gap / 2;
        const isGreen = c.close >= c.open;
        const color = isGreen ? '#10b981' : '#ef4444';

        const yOpen = getY(c.open);
        const yClose = getY(c.close);
        const yHigh = getY(c.high);
        const yLow = getY(c.low);

        // Wick
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.moveTo(x, yHigh);
        ctx.lineTo(x, yLow);
        ctx.stroke();

        // Body
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));
        ctx.fillStyle = color;
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
      });

      // Live price dashed line
      const last = candles[candles.length - 1];
      const liveY = getY(last.close);
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(0, liveY);
      ctx.lineTo(width, liveY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Live price tag
      ctx.fillStyle = '#10b981';
      ctx.fillRect(width - 70, liveY - 10, 70, 20);
      ctx.fillStyle = '#05070c';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.fillText(`$${last.close.toFixed(0)}`, width - 65, liveY + 4);
    }

    draw();

    // Simulated ticks
    const tickInterval = setInterval(() => {
      const last = candles[candles.length - 1];
      const tick = (Math.random() - 0.49) * 45;
      last.close += tick;
      if (last.close > last.high) last.high = last.close;
      if (last.close < last.low) last.low = last.close;
      setLivePrice(last.close);
      draw();
    }, 1200);

    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(tickInterval);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [timeframe]);

  // Simulated Order Book
  useEffect(() => {
    function generateBook() {
      const base = 92450;
      const asks = [];
      const bids = [];

      for (let i = 0; i < 6; i++) {
        asks.unshift({
          price: (base + (6 - i) * 12.5).toFixed(1),
          amount: (Math.random() * 1.8 + 0.1).toFixed(3),
          total: (Math.random() * 5 + 1.2).toFixed(3)
        });
        bids.push({
          price: (base - (i + 1) * 12.5).toFixed(1),
          amount: (Math.random() * 1.8 + 0.1).toFixed(3),
          total: (Math.random() * 5 + 1.2).toFixed(3)
        });
      }
      setOrderBook({ asks, bids });
    }

    generateBook();
    const interval = setInterval(generateBook, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="platform" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>Next-Generation Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white">
            The <span className="text-gold-gradient">ProjectX</span> Trading Platform
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We are building the ultimate non-custodial decentralized trading ecosystem. Experience institutional liquidity routing, automated AI risk mitigation, and zero-latency execution.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="glass-panel-gold rounded-3xl p-4 sm:p-6 md:p-8 border border-amber-500/30 shadow-2xl relative overflow-hidden mb-16">
          
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="h-4 w-[1px] bg-white/20"></div>
              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="font-bold text-white">PROJECTX_TERMINAL v2.4</span>
                <span className="text-amber-400 font-semibold">• BTC / USD PERPETUAL</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 font-mono text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">INDEX:</span>
                <span className="text-emerald-400 font-bold">${livePrice.toFixed(2)}</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1 text-slate-400">
                <span>LATENCY:</span>
                <span className="text-emerald-400 font-bold">14ms</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40">
                LIVE SIMULATOR
              </span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Chart Area */}
            <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-950/90 border border-white/10 relative flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <div className="flex items-center space-x-2 text-slate-400">
                  <span>TF:</span>
                  {['1H', '4H', '1D', '1W'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2 py-0.5 rounded font-bold transition-colors ${
                        timeframe === tf
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-0.5 bg-amber-400 inline-block"></span> MA(20)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 inline-block rounded-sm"></span> Bull
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-rose-500 inline-block rounded-sm"></span> Bear
                  </span>
                </div>
              </div>

              {/* Canvas Chart */}
              <div className="w-full h-64 sm:h-72 relative">
                <canvas ref={canvasRef} className="w-full h-full block"></canvas>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                <span>
                  Smart Order Routing: <strong className="text-slate-200">OPTIMAL (0.00% Slippage)</strong>
                </span>
                <span className="text-amber-400">
                  AI Signal Trigger:{' '}
                  <strong className="text-emerald-400">STRONG BUY ACCUMULATION</strong>
                </span>
              </div>
            </div>

            {/* Order Book Area */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono font-bold text-slate-300">
                  <span>Price (USD)</span>
                  <span>Size (BTC)</span>
                  <span>Total</span>
                </div>

                {/* Asks */}
                <div className="space-y-0.5 mb-2">
                  {orderBook.asks.map((a, i) => (
                    <div
                      key={`ask-${i}`}
                      className="flex items-center justify-between text-[11px] font-mono py-1 px-2 rounded hover:bg-rose-500/10"
                    >
                      <span className="text-rose-400 font-semibold">${a.price}</span>
                      <span className="text-slate-300">{a.amount}</span>
                      <span className="text-slate-400">{a.total}</span>
                    </div>
                  ))}
                </div>

                {/* Spread */}
                <div className="py-1 px-2 my-1 rounded bg-slate-900 border border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Spread:</span>
                  <span className="text-amber-400 font-bold">$0.50 (0.0005%)</span>
                </div>

                {/* Bids */}
                <div className="space-y-0.5 mt-2">
                  {orderBook.bids.map((b, i) => (
                    <div
                      key={`bid-${i}`}
                      className="flex items-center justify-between text-[11px] font-mono py-1 px-2 rounded hover:bg-emerald-500/10"
                    >
                      <span className="text-emerald-400 font-semibold">${b.price}</span>
                      <span className="text-slate-300">{b.amount}</span>
                      <span className="text-slate-400">{b.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 mt-3">
                <a
                  href="#register"
                  className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Get Early Terminal Beta Access</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel rounded-2xl p-6 border-b-2 border-b-amber-400">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-white text-base mb-2">Sub-50ms Execution</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Direct bare-metal RPC infrastructure connected to top tier-1 liquidity providers for instant fills with zero front-running.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-b-2 border-b-emerald-400">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-white text-base mb-2">MEV & Sandwich Shield</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Proprietary private mempool relays shield your trades from predatory arbitrage bots, keeping 100% of your profits in your pocket.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-b-2 border-b-cyan-400">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-white text-base mb-2">AI Quantitative Scanning</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Machine learning algorithms scan 500+ pairs every second to detect volatility compression and breakout probability before it unfolds.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border-b-2 border-b-purple-400">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-heading font-bold text-white text-base mb-2">Non-Custodial Security</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Your keys, your crypto. Trade directly from your Web3 wallet or smart account without relinquishing asset control.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

