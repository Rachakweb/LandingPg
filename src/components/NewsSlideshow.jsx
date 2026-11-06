import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, ChevronLeft, ChevronRight, Zap, ArrowRight, Send } from 'lucide-react';
import { INITIAL_NEWS_ITEMS, NEWS_CATEGORIES } from '../data/newsData';
import { TELEGRAM_INVITE_URL } from '../data/cryptoData';

export default function NewsSlideshow({ onSelectNews }) {
  const [newsList] = useState(INITIAL_NEWS_ITEMS);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(null);

  const filteredItems = currentCategory === 'all'
    ? newsList
    : newsList.filter((item) => item.category === currentCategory);

  // Auto-slide effect
  useEffect(() => {
    if (filteredItems.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [filteredItems.length, isPaused]);

  // Restart progress bar animation on slide change
  useEffect(() => {
    if (!progressRef.current) return;
    const el = progressRef.current;
    el.style.transition = 'none';
    el.style.width = '0%';
    const timer = setTimeout(() => {
      if (!isPaused) {
        el.style.transition = 'width 5800ms linear';
        el.style.width = '100%';
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, currentCategory]);

  const handleNext = () => {
    if (filteredItems.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (filteredItems.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const activeItem = filteredItems[currentIndex] || filteredItems[0];

  return (
    <section id="news" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Real-Time Market Intelligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white">
              Crypto Trading News & <span className="text-gold-gradient">Alpha Stream</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-2">
              Curated high-impact crypto news, institutional narratives, and regulatory shifts with actionable trading setups.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              title={isPaused ? 'Resume Slideshow' : 'Pause Slideshow'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 pb-6 overflow-x-auto no-scrollbar">
          {NEWS_CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setCurrentCategory(cat.id);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all shrink-0 ${
                  isActive
                    ? 'border border-amber-400 bg-amber-500/10 text-amber-400'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Slide Card */}
        <div
          className="news-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Progress bar */}
          <div className="w-full bg-slate-800/50 h-1 overflow-hidden rounded-t-xl">
            <div ref={progressRef} className="h-full bg-amber-400 w-0"></div>
          </div>

          {activeItem ? (
            <div className="glass-panel-gold rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-500">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {activeItem.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {activeItem.time}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-slate-400">
                    Source: <strong className="text-slate-200">{activeItem.source}</strong>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Alpha Score: {activeItem.alphaScore}/100
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h3
                onClick={() => onSelectNews(activeItem)}
                className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-white mb-4 leading-snug hover:text-amber-300 transition-colors cursor-pointer"
              >
                {activeItem.title}
              </h3>

              {/* Summary */}
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                {activeItem.summary}
              </p>

              {/* Trade Setup Box & CTAs */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                      Actionable Telegram Setup
                    </span>
                    <p className="text-xs text-slate-300 font-mono mt-0.5">{activeItem.tradeSetup}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    onClick={() => onSelectNews(activeItem)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
                  >
                    <span>Full Intelligence</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={TELEGRAM_INVITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Discuss in VIP Channel</span>
                  </a>
                </div>
              </div>
            </div>
          ) : null}

          {/* Indicators */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            {filteredItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-amber-400 shadow-sm shadow-amber-400'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

