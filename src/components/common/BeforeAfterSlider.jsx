import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeView, setActiveView] = useState('exterior'); // 'exterior' | 'interior'

  const currentPair = activeView === 'exterior'
    ? {
      before: '/transformations/exterior_before.jpg',
      after: '/transformations/exterior_after.jpg',
      title: 'Exterior Foam Wash & Polish',
      beforeDesc: 'Mud, road grime & water spots',
      afterDesc: 'Deep gloss & scratch-free shine',
    }
    : {
      before: '/transformations/interior_before.jpg',
      after: '/transformations/interior_after.jpg',
      title: 'Interior Steam Sanitization',
      beforeDesc: 'Dust, crumbs & stained seats',
      afterDesc: 'Steam sanitized & fresh cabin',
    };

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6">

      {/* Category Toggle (Exterior vs Interior) - Symmetrical 2-Column Grid on Mobile >= 300px */}
      <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => {
            setActiveView('exterior');
            setSliderPosition(50);
          }}
          className={`px-2 sm:px-7 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] min-[360px]:text-xs sm:text-sm font-display font-extrabold uppercase tracking-wider transition-all cursor-pointer text-center leading-snug ${activeView === 'exterior'
              ? 'burgundy-btn shadow-md text-white'
              : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
            }`}
        >
          Exterior Transformation
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveView('interior');
            setSliderPosition(50);
          }}
          className={`px-2 sm:px-7 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] min-[360px]:text-xs sm:text-sm font-display font-extrabold uppercase tracking-wider transition-all cursor-pointer text-center leading-snug ${activeView === 'interior'
              ? 'burgundy-btn shadow-md text-white'
              : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
            }`}
        >
          Interior Transformation
        </button>
      </div>

      {/* Interactive Slider Container */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white select-none cursor-ew-resize group bg-slate-900"
        onMouseMove={(e) => {
          if (e.buttons === 1) handleSliderMove(e);
        }}
        onClick={handleSliderMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER IMAGE (Base Layer) */}
        <img
          src={currentPair.after}
          alt="After Car Wash Transformation"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* AFTER BADGE & DESC (Compact on small mobile, full on desktop) */}
        <div
          className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-20 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#8B182B] text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-1 sm:gap-1.5 transition-opacity duration-150"
          style={{ opacity: Math.max(0, Math.min(1, ((100 - sliderPosition) - 10) / 15)) }}
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="sm:hidden">AFTER</span>
          <span className="hidden sm:inline">AFTER (Clean & Shiny)</span>
        </div>
        <div
          className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-sans shadow-lg hidden sm:block transition-opacity duration-150"
          style={{ opacity: Math.max(0, Math.min(1, ((100 - sliderPosition) - 10) / 15)) }}
        >
          ✨ {currentPair.afterDesc}
        </div>

        {/* BEFORE IMAGE (Full size overlaid with clipPath for seamless pixel-perfect sliding) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={currentPair.before}
            alt="Before Car Wash Transformation"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* BEFORE BADGE & DESC (Compact on small mobile, full on desktop) */}
          <div
            className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 z-20 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-slate-200 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-lg transition-opacity duration-150"
            style={{ opacity: Math.max(0, Math.min(1, (sliderPosition - 10) / 15)) }}
          >
            <span className="sm:hidden">BEFORE</span>
            <span className="hidden sm:inline">BEFORE (Dirty)</span>
          </div>
          <div
            className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-slate-300 text-xs font-sans shadow-lg hidden sm:block border border-white/10 transition-opacity duration-150"
            style={{ opacity: Math.max(0, Math.min(1, (sliderPosition - 10) / 15)) }}
          >
            ⚠️ {currentPair.beforeDesc}
          </div>
        </div>

        {/* SPLIT DIVIDER LINE & MODERN COMPACT CAPSULE GRIP */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_15px_rgba(0,0,0,0.9)] pointer-events-none z-30 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle: Compact on mobile, standard on desktop */}
          <div className="px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#161D27] text-white shadow-[0_4px_25px_rgba(0,0,0,0.6)] border-1.5 sm:border-2 border-white/90 flex items-center gap-1 sm:gap-2 group-hover:scale-105 transition-transform duration-200 select-none">
            <span className="text-[9px] sm:text-[11px] font-mono text-white font-bold">◀</span>
            <span className="w-0.5 h-2.5 sm:h-3 bg-white/40 rounded-full"></span>
            <span className="text-[9px] sm:text-[11px] font-mono text-white font-bold">▶</span>
          </div>
        </div>

      </div>

    </div>
  );
};
