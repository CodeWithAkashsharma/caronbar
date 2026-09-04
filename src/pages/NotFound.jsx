import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ShieldAlert, Car } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col relative overflow-hidden">
      <SEOHead
        title="404 Page Not Found"
        description="The requested page could not be found."
        noindex={true}
      />
      
      {/* TOP HEADER BAR */}
      <header className="bg-[#121720] border-b border-white/10 w-full shrink-0 z-20">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 select-none hover:opacity-90 transition-opacity">
            <span className="font-display font-black text-lg sm:text-2xl italic tracking-wider uppercase text-white">
              CAR<span className="text-[#8B182B] font-black">ON</span>BAR
            </span>
          </Link>
        </div>
      </header>

      {/* CENTERED 404 CONTENT */}
      <div className="flex-1 flex items-center justify-center p-4 py-12 z-10">
        <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          
          {/* Glowing Badge & Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-rose-50 border border-rose-200 text-[#8B182B] mb-6 shadow-md">
            <ShieldAlert className="w-10 h-10" />
          </div>

          {/* 404 Big Gradient Text */}
          <h1 className="text-7xl sm:text-8xl font-black font-display tracking-tight text-[#8B182B]">
            404
          </h1>

          {/* Error Message */}
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-wider text-slate-900 mt-2 mb-3">
            Page Not Found
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            The page or URL you requested does not exist or may have been typed incorrectly. Let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase burgundy-btn text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Home className="w-4 h-4" /> Return to Home
            </Link>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>

          {/* Footer brand tagline */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <Car className="w-3.5 h-3.5 text-[#8B182B]" /> CARONBAR PREMIUM CAR WASH STUDIO
          </div>
        </div>
      </div>
    </div>
  );
};
