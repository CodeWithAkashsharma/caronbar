import React from 'react';
import { Link } from 'react-router-dom';

export const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50">
      <Link
        to="/contact"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group relative inline-flex items-center justify-center px-2.5 py-1.5 sm:px-5 sm:py-3 rounded-full bg-emerald-950/85 hover:bg-emerald-900 backdrop-blur-md text-emerald-300 hover:text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)] sm:shadow-[0_8px_25px_rgba(16,185,129,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-500/40 hover:border-emerald-500/70 text-[10px] min-[360px]:text-[11px] sm:text-sm font-display font-black tracking-wider sm:tracking-widest uppercase cursor-pointer"
        aria-label="Inquiry"
        title="Make an Inquiry"
      >
        <span>Inquiry</span>
      </Link>
    </div>
  );
};
