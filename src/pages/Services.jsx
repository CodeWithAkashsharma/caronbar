import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { SERVICES_DATA } from '../data/servicesData';
import { BIKE_PACKAGES_DATA } from '../data/packagesData';
import { VideoCardMedia } from '../components/common/VideoCardMedia';
import { VehicleSelector } from '../components/common/VehicleSelector';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/formatters';
import { CheckCircle2, ChevronRight, Sparkles, Clock, Shield, Check, Zap, Bike, RotateCcw } from 'lucide-react';

export const Services = () => {
  const { currentVehicle, selectedVehicleId, setSelectedVehicleId, selectServiceForBooking, selectPackageForBooking, updateDraftBooking } = useBooking();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Sync vehicle=2wheeler from URL query params
  useEffect(() => {
    const vehicleParam = searchParams.get('vehicle') || searchParams.get('category');
    if (vehicleParam === '2wheeler' || vehicleParam === 'bike' || vehicleParam === 'scooter') {
      setSelectedVehicleId('2wheeler');
      updateDraftBooking({ vehicleTypeId: '2wheeler' });
    }
  }, [searchParams]);

  const isBikeSelected = selectedVehicleId === '2wheeler';

  return (
    <>
      <SEOHead
        title="Car Wash Services & Doorstep Wash Rates | CARONBAR"
        description="Transparent car wash pricing & doorstep car wash services. High-pressure foam wash, interior steam cleaning, paint wax, and 9H ceramic coating."
        keywords="car wash services, car wash price, doorstep car wash cost, foam car wash rates, interior car cleaning price, doorstep car wash delhi"
        canonicalPath="/services"
      />

      <div className="pt-20 sm:pt-32 pb-6 sm:pb-20 bg-[#F8FAFC] min-h-screen text-slate-800 relative">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-3">
            <h1 className="font-display font-black text-2xl min-[360px]:text-3xl sm:text-5xl italic uppercase text-slate-900 tracking-wider">
              {isBikeSelected ? '2-Wheeler Wash & Care' : 'Services & Pricing'}
            </h1>
            <p className="font-sans text-[11px] sm:text-sm text-slate-600 leading-tight sm:leading-relaxed max-w-xl mx-auto">
              {isBikeSelected
                ? 'Exclusive doorstep snow foam wash & Teflon chain maintenance packages for all bikes, scooters & superbikes.'
                : 'Clear, upfront doorstep wash pricing with no hidden charges. Select your vehicle to see exact rates.'}
            </p>
          </div>

          {/* Unified Top Control Center: Vehicle Selector with highlights */}
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-3xl p-2 sm:p-7 max-w-4xl mx-auto shadow-xs sm:shadow-sm space-y-3 sm:space-y-5">
            {/* Value Highlights: Hidden on mobile, visible on desktop */}
            <div className="hidden sm:grid grid-cols-3 gap-3 text-center text-xs pb-4 border-b border-slate-100">
              <div className="flex items-center justify-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="font-semibold leading-tight">We Bring Our Own Water & Power</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                <span className="font-semibold leading-tight">Scratch-Free Foam Wash</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#8B182B] shrink-0"></span>
                <span className="font-semibold leading-tight">Service Right at Your Doorstep</span>
              </div>
            </div>

            {/* Merged Vehicle Type Selector (Hatchback, Sedan, SUV, 2-Wheeler) */}
            <VehicleSelector />
          </div>

          {/* IF 2-WHEELER SELECTED: DISPLAY ONLY THE 1 2-WHEELER MONTHLY PACKAGE */}
          {isBikeSelected ? (
            <div className="space-y-6">
              {/* 2-Wheeler Only Package Grid (1 Card: ₹399 Monthly) */}
              <div className="grid grid-cols-1 max-w-xl mx-auto">
                {BIKE_PACKAGES_DATA.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`bg-white border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-7 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 shadow-sm relative ${
                      pkg.popular ? 'border-[#8B182B] ring-2 ring-[#8B182B]/10' : 'border-slate-200/90'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#8B182B] text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                        ★ Most Popular for Daily Commuters
                      </span>
                    )}

                    <div className="space-y-3 sm:space-y-5">
                      {/* Top Image Preview */}
                      <div className="relative rounded-xl overflow-hidden h-36 sm:h-48 bg-slate-900 border border-slate-100">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <span className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-full bg-[#161D27]/90 backdrop-blur-sm text-white text-[9px] sm:text-xs font-mono font-bold border border-white/10 shadow-md">
                          🏍️ {pkg.badge}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] sm:text-xs font-mono font-bold">
                            <Clock className="w-3 h-3 text-emerald-600" /> {pkg.duration}
                          </span>
                        </div>
                        <h3 className="font-display font-black text-base sm:text-2xl text-slate-900 group-hover:text-[#8B182B] transition-colors leading-tight">
                          {pkg.name}
                        </h3>
                        <p className="font-sans text-[10.5px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Features Checklist */}
                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase font-mono block">
                          Included In This Package:
                        </span>
                        <ul className="space-y-1.5 text-[10px] sm:text-xs text-slate-700">
                          {pkg.servicesIncluded.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span className="font-medium leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Price & Book Action */}
                    <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                          <span className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10px] text-slate-500 font-mono uppercase font-bold truncate">
                            2-WHEELER LIVE RATE
                          </span>
                          <span className="text-[6.5px] min-[360px]:text-[7.5px] sm:text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded-full uppercase whitespace-nowrap shrink-0">
                            SPECIAL OFFER
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-3xl font-black font-mono text-slate-900">
                            {formatCurrency(pkg.basePrice)}
                          </span>
                          <span className="text-xs sm:text-sm text-slate-400 font-mono line-through">
                            {formatCurrency(pkg.originalBasePrice)}
                          </span>
                          <span className="text-[10px] sm:text-xs text-slate-500 font-mono">
                            {pkg.period}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          selectPackageForBooking(pkg.id);
                          updateDraftBooking({ vehicleTypeId: '2wheeler', itemType: 'package', selectedItemId: pkg.id, step: 2 });
                          navigate('/booking');
                        }}
                        className="burgundy-btn px-2.5 py-1.5 min-[360px]:px-3.5 min-[360px]:py-2 sm:px-7 sm:py-3.5 rounded-lg sm:rounded-xl text-[10px] min-[360px]:text-[11px] sm:text-sm font-black italic uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-0.5 sm:gap-1 cursor-pointer shrink-0"
                      >
                        <span>BOOK NOW</span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* STANDARD 4-WHEELER CAR SERVICES GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 max-w-6xl mx-auto items-stretch">
              {SERVICES_DATA.map((service) => {
                const calculatedPrice = (service.prices && (service.prices[currentVehicle.id] ?? service.prices['hatchback-sedan'])) ?? Math.round(service.basePrice * (currentVehicle?.multiplier || 1));
                const ratio = (service.originalBasePrice && service.basePrice) ? (service.originalBasePrice / service.basePrice) : 1.35;
                const originalPrice = Math.max(Math.round(calculatedPrice * Math.max(ratio, 1.35)), calculatedPrice + 150);
                const percentOff = Math.max(5, Math.round(((originalPrice - calculatedPrice) / originalPrice) * 100));

                return (
                  <div
                    key={service.id}
                    className="bg-white border border-slate-200 hover:border-[#8B182B] rounded-xl sm:rounded-2xl p-2.5 min-[360px]:p-3.5 sm:p-4 flex flex-col justify-between group hover:shadow-lg transition-all duration-300 shadow-xs relative h-full"
                  >
                    <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col">
                      {/* Media Card Preview */}
                      <div className="relative rounded-lg sm:rounded-xl overflow-hidden">
                        <VideoCardMedia
                          image={service.image}
                          video={service.video}
                          alt={service.name}
                          className="h-28 min-[360px]:h-32 sm:h-36 w-full rounded-lg sm:rounded-xl shadow-inner object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-50 border border-rose-200/90 text-[#8B182B] text-[8.5px] sm:text-[10.5px] font-mono font-bold shadow-xs whitespace-nowrap">
                            <span>⏱️ {service.duration.replace(/hours?/gi, 'hr').replace(/minutes?|mins?/gi, 'min')}</span>
                          </span>
                          <span className="text-[8.5px] sm:text-[10.5px] font-mono font-bold uppercase text-slate-400">
                            {currentVehicle.name.split('/')[0].split('(')[0].trim()}
                          </span>
                        </div>
                        <h3 className="font-display font-black text-xs min-[360px]:text-sm sm:text-base text-slate-900 group-hover:text-[#8B182B] transition-colors leading-tight sm:leading-snug">
                          {service.name}
                        </h3>
                        <p className="font-sans text-[8.5px] min-[360px]:text-[9.5px] sm:text-xs text-slate-600 mt-0.5 leading-tight sm:leading-snug">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Features Checklist */}
                      <ul className="space-y-0.5 sm:space-y-1 pt-1.5 sm:pt-2 border-t border-slate-100 text-[8.5px] min-[360px]:text-[9.5px] sm:text-xs text-slate-700 flex-1">
                        {service.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                              <Check className="w-2 h-2 stroke-[3]" />
                            </div>
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price & Book Action */}
                    <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-slate-100 space-y-2">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-1">
                        <div className="flex items-baseline gap-1.5 sm:gap-2 flex-nowrap">
                          <span className="text-base min-[360px]:text-lg sm:text-2xl font-black font-mono text-[#8B182B] whitespace-nowrap">
                            {formatCurrency(calculatedPrice)}
                          </span>
                          <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-slate-400 font-mono line-through whitespace-nowrap">
                            {formatCurrency(originalPrice)}
                          </span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[7px] min-[360px]:text-[8px] sm:text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full uppercase shrink-0">
                          {percentOff}% OFF
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          selectServiceForBooking(service.slug || service.id);
                          navigate('/booking');
                        }}
                        className="burgundy-btn w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] min-[360px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>BOOK {service.name.toUpperCase()}</span>
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VALUE ADDED SERVICES & AUTOMOTIVE SOLUTIONS: 3x2 GRID ON MOBILE (300px+), 2/3 Cols on Desktop */}
          <div className="mt-10 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-200 space-y-4 sm:space-y-8">
            <div>
              <h2 className="font-display font-black text-xl sm:text-4xl italic text-[#0F172A] uppercase tracking-wider">
                <span className="sm:hidden">WASH & VEHICLE CARE</span>
                <span className="hidden sm:inline">DOORSTEP WASH & VEHICLE CARE</span>
              </h2>
              <p className="text-[11px] sm:text-sm text-slate-600 mt-0.5 sm:mt-1">
                From doorstep car & bike washing to interior steam sanitization, underbody wash, and monthly plans across Delhi NCR.
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 min-[360px]:gap-2 sm:gap-6">
              
              {/* VAS 0: Bike Wash */}
              <button
                type="button"
                onClick={() => {
                  setSelectedVehicleId('2wheeler');
                  updateDraftBooking({ vehicleTypeId: '2wheeler' });
                  window.scrollTo({ top: 100, behavior: 'smooth' });
                }}
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2.5 sm:p-6 space-y-1 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer text-left w-full"
              >
                <div>
                  <div className="w-6 h-6 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[10px] min-[360px]:text-xs sm:text-base text-emerald-700 font-bold mb-1 sm:mb-2">
                    🏍️
                  </div>
                  <h3 className="font-display font-black text-[8.5px] min-[360px]:text-[10px] sm:text-lg text-slate-900 group-hover:text-[#8B182B] transition-colors leading-tight truncate">
                    Bike Wash
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                    High-pressure snow foam wash, chain degreasing & lubrication, tire shine, and deep gloss polish for all two-wheelers.
                  </p>
                </div>
                <div className="pt-0 sm:pt-2">
                  <span className="text-[7.5px] min-[360px]:text-[9px] sm:text-xs font-bold text-[#8B182B] group-hover:underline flex items-center gap-0.5">
                    <span className="hidden sm:inline">View Bike Packages</span>
                    <span className="sm:hidden">View</span>
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </button>

              {/* VAS 1: Pressure Foam Wash */}
              <Link
                to="/booking"
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2.5 sm:p-6 space-y-1 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-6 h-6 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[10px] min-[360px]:text-xs sm:text-base text-cyan-700 font-bold mb-1 sm:mb-2">
                    🚿
                  </div>
                  <h3 className="font-display font-black text-[8.5px] min-[360px]:text-[10px] sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight truncate">
                    Foam Wash
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                    De-ionized soft water pressure rinse, thick pH-neutral foam wash, wheel de-griming, and scratch-free microfiber drying.
                  </p>
                </div>
                <div className="pt-0 sm:pt-2">
                  <span className="text-[7.5px] min-[360px]:text-[9px] sm:text-xs font-bold text-[#8B182B] group-hover:underline flex items-center gap-0.5">
                    <span className="hidden sm:inline">Book Foam Wash</span>
                    <span className="sm:hidden">Book</span>
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </Link>

              {/* VAS 2: Underbody Wash */}
              <Link
                to="/booking"
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2.5 sm:p-6 space-y-1 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-6 h-6 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] min-[360px]:text-xs sm:text-base text-blue-700 font-bold mb-1 sm:mb-2">
                    🌊
                  </div>
                  <h3 className="font-display font-black text-[8.5px] min-[360px]:text-[10px] sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight truncate">
                    Underbody Wash
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                    High-pressure soft water mud blasting under the chassis and wheel arches to prevent rust, corrosion, and grime buildup.
                  </p>
                </div>
                <div className="pt-0 sm:pt-2">
                  <span className="text-[7.5px] min-[360px]:text-[9px] sm:text-xs font-bold text-[#8B182B] group-hover:underline flex items-center gap-0.5">
                    <span className="hidden sm:inline">Book Underbody</span>
                    <span className="sm:hidden">Book</span>
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </Link>

              {/* VAS 3: Tyre & Alloy Wheel Deep Wash */}
              <Link
                to="/booking"
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2.5 sm:p-6 space-y-1 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-6 h-6 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[10px] min-[360px]:text-xs sm:text-base text-[#8B182B] font-bold mb-1 sm:mb-2">
                    🛞
                  </div>
                  <h3 className="font-display font-black text-[8.5px] min-[360px]:text-[10px] sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight truncate">
                    Tyre & Alloy
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                    Iron decontamination, deep brake-dust removal, alloy wheel scrub, and long-lasting wet-look gloss tyre dressing.
                  </p>
                </div>
                <div className="pt-0 sm:pt-2">
                  <span className="text-[7.5px] min-[360px]:text-[9px] sm:text-xs font-bold text-[#8B182B] group-hover:underline flex items-center gap-0.5">
                    <span className="hidden sm:inline">Book Wheel Wash</span>
                    <span className="sm:hidden">Book</span>
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </Link>

              {/* VAS 4: Interior Steam Clean */}
              <Link
                to="/booking"
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2.5 sm:p-6 space-y-1 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-6 h-6 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[10px] min-[360px]:text-xs sm:text-base text-amber-700 font-bold mb-1 sm:mb-2">
                    ✨
                  </div>
                  <h3 className="font-display font-black text-[8.5px] min-[360px]:text-[10px] sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight truncate">
                    Steam Clean
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                    160°C dry steam seat & carpet stain removal, AC vent sanitization, dashboard UV polish, and full vacuuming.
                  </p>
                </div>
                <div className="pt-0 sm:pt-2">
                  <span className="text-[7.5px] min-[360px]:text-[9px] sm:text-xs font-bold text-[#8B182B] group-hover:underline flex items-center gap-0.5">
                    <span className="hidden sm:inline">Book Steam Clean</span>
                    <span className="sm:hidden">Book</span>
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </Link>

              {/* VAS 5: Monthly Plans */}
              <Link
                to="/packages"
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2.5 sm:p-6 space-y-1 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-6 h-6 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[10px] min-[360px]:text-xs sm:text-base text-purple-700 font-bold mb-1 sm:mb-2">
                    📅
                  </div>
                  <h3 className="font-display font-black text-[8.5px] min-[360px]:text-[10px] sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight truncate">
                    Monthly Plans
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                    Daily morning doorstep wiping, weekly pressure foam washes, and vacuuming starting at ₹499/month.
                  </p>
                </div>
                <div className="pt-0 sm:pt-2">
                  <span className="text-[7.5px] min-[360px]:text-[9px] sm:text-xs font-bold text-[#8B182B] group-hover:underline flex items-center gap-0.5">
                    <span className="hidden sm:inline">View Plans</span>
                    <span className="sm:hidden">Plans</span>
                    <ChevronRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};
