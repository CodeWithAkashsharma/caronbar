import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { VehicleSelector } from '../components/common/VehicleSelector';
import { MONTHLY_PACKAGES_DATA, DAILY_PACKAGES_DATA, BIKE_PACKAGES_DATA, ADDONS_DATA } from '../data/packagesData';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/formatters';
import { Check, Sparkles, Clock, Plus, ShieldCheck, ChevronRight } from 'lucide-react';

export const Packages = () => {
  const { currentVehicle, selectedVehicleId, setSelectedVehicleId, updateDraftBooking, selectPackageForBooking, selectServiceForBooking, draftBooking, toggleAddon } = useBooking();
  const [searchParams] = useSearchParams();
  const [activePackageType, setActivePackageType] = useState('monthly'); // 'monthly' by default as requested
  const navigate = useNavigate();

  // Sync vehicle=2wheeler from URL query params
  useEffect(() => {
    const vehicleParam = searchParams.get('vehicle') || searchParams.get('category');
    if (vehicleParam === '2wheeler' || vehicleParam === 'bike' || vehicleParam === 'scooter') {
      setSelectedVehicleId('2wheeler');
      updateDraftBooking({ vehicleTypeId: '2wheeler' });
    }
  }, [searchParams]);

  const is2Wheeler = currentVehicle?.id === '2wheeler' || selectedVehicleId === '2wheeler';
  const packagesList = is2Wheeler
    ? BIKE_PACKAGES_DATA
    : (activePackageType === 'monthly' ? MONTHLY_PACKAGES_DATA : DAILY_PACKAGES_DATA);

  return (
    <>
      <SEOHead
        title="Monthly Car Wash Packages & Doorstep Plans | CARONBAR"
        description="Affordable monthly car wash subscription plans and one-time deep car cleaning packages in Delhi NCR. Hassle-free doorstep service starting at ₹499."
        keywords="monthly car wash package, car wash subscription, doorstep car wash plans, daily car wash service, car wash membership delhi"
        canonicalPath="/packages"
      />

      <div className="pt-20 sm:pt-32 pb-10 sm:pb-20 bg-[#F8FAFC] min-h-screen text-slate-800 relative">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-1 sm:space-y-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#8B182B] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#8B182B]" /> Complete Inside-Out Bundles
            </span>
            <h1 className="font-display font-black text-2xl min-[360px]:text-3xl sm:text-5xl italic uppercase text-slate-900 tracking-wider">
              {is2Wheeler ? '2-Wheeler Monthly Package' : 'Care Packages'}
            </h1>
            <p className="font-sans text-[10px] min-[360px]:text-[11px] sm:text-sm text-slate-600 leading-tight sm:leading-relaxed max-w-[280px] min-[360px]:max-w-xs sm:max-w-xl mx-auto">
              {is2Wheeler
                ? 'Exclusive monthly care: 20x water wash visits + 1x deep snow foam clean & Teflon chain lubrication.'
                : 'Choose recurring monthly doorstep care or complete one-time car wash packages from ₹499.'}
            </p>
          </div>

          {/* Vehicle Selector Bar */}
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-2 sm:p-6 max-w-4xl mx-auto shadow-xs sm:shadow-sm">
            <VehicleSelector />
          </div>

          {/* SMOOTH MONTHLY / DAILY TOGGLE SWITCH BUTTON: HIDDEN FOR 2-WHEELER */}
          {!is2Wheeler && (
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center bg-slate-200/70 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-300/70 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActivePackageType('monthly')}
                  className={`px-3 min-[360px]:px-4 sm:px-9 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] min-[360px]:text-xs sm:text-sm font-display font-black uppercase tracking-wider transition-all duration-300 ease-in-out cursor-pointer ${
                    activePackageType === 'monthly'
                      ? 'bg-[#8B182B] text-white shadow-md scale-[1.02]'
                      : 'bg-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-300/40'
                  }`}
                >
                  Monthly Packages
                </button>
                <button
                  type="button"
                  onClick={() => setActivePackageType('daily')}
                  className={`px-3 min-[360px]:px-4 sm:px-9 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] min-[360px]:text-xs sm:text-sm font-display font-black uppercase tracking-wider transition-all duration-300 ease-in-out cursor-pointer ${
                    activePackageType === 'daily'
                      ? 'bg-[#8B182B] text-white shadow-md scale-[1.02]'
                      : 'bg-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-300/40'
                  }`}
                >
                  Daily / One-Time
                </button>
              </div>
            </div>
          )}

          {/* Packages Grid: 1-Column centered for 2-Wheeler (₹399 Monthly), 4-Column on Desktop for Car Monthly / 3-Column for Car Daily */}
          <div className={`grid ${is2Wheeler ? 'grid-cols-1 max-w-xl mx-auto' : activePackageType === 'monthly' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'} gap-2.5 sm:gap-5 max-w-7xl mx-auto items-stretch`}>
            {packagesList.map((pkg) => {
              const price = (pkg.prices && pkg.prices[currentVehicle.id]) || Math.round(pkg.basePrice * currentVehicle.multiplier);
              const originalPrice = Math.round((pkg.originalBasePrice || pkg.basePrice * 1.25) * currentVehicle.multiplier);

              return (
                <div
                  key={pkg.id}
                  className={`group rounded-xl sm:rounded-2xl p-2 min-[360px]:p-3 sm:p-6 transition-all duration-300 ease-out flex flex-col justify-between relative h-full hover:-translate-y-2.5 hover:shadow-2xl cursor-pointer ${
                    pkg.popular || is2Wheeler
                      ? 'bg-white border-2 border-[#8B182B] shadow-xl hover:border-[#A61C33] hover:ring-2 hover:ring-[#8B182B]/20 z-10'
                      : 'bg-white border border-slate-200 hover:border-[#8B182B] shadow-sm'
                  }`}
                >
                  <div className="flex flex-col flex-1">
                    {pkg.popular && (
                      <span className="absolute -top-2.5 sm:-top-3.5 left-1/2 -translate-x-1/2 text-[7.5px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-4 py-0.5 sm:py-1 rounded-full bg-[#8B182B] text-white shadow-md whitespace-nowrap z-10 group-hover:bg-[#A61C33] transition-colors">
                        {pkg.badge || 'MOST POPULAR'}
                      </span>
                    )}

                    <div className="mb-1.5 sm:mb-3">
                      <span className="text-[7.5px] sm:text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 block mb-0.5 sm:mb-1 truncate">
                        {pkg.type === 'monthly' ? 'SUBSCRIPTION' : 'ONE-TIME'}
                      </span>
                      <h3 className="font-display font-black text-[11px] min-[360px]:text-xs sm:text-xl text-slate-900 uppercase min-h-0 sm:min-h-[36px] flex items-center leading-tight sm:leading-snug group-hover:text-[#8B182B] transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="font-sans text-[8px] min-[360px]:text-[9px] sm:text-xs text-slate-500 leading-tight sm:leading-relaxed min-h-0 sm:min-h-[36px] flex items-center mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Slim Price Box */}
                    <div className="p-1.5 min-[360px]:p-2 sm:p-3.5 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 mb-2 sm:mb-5 flex flex-col justify-between group-hover:bg-rose-50/30 transition-colors gap-0.5 sm:gap-2">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap">
                          <span className="text-sm min-[360px]:text-base sm:text-2xl lg:text-2xl xl:text-3xl font-black font-mono text-[#8B182B] whitespace-nowrap">
                            {formatCurrency(price)}
                          </span>
                          <span className="text-[8px] min-[360px]:text-[9.5px] sm:text-xs text-slate-400 font-mono line-through whitespace-nowrap">
                            {formatCurrency(originalPrice)}
                          </span>
                          <span className="hidden sm:inline lg:hidden text-xs text-slate-500 font-mono">
                            {pkg.period}
                          </span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[6.5px] min-[360px]:text-[7.5px] sm:text-[9.5px] font-bold font-mono px-1 min-[360px]:px-1.5 py-0.5 rounded-full uppercase shrink-0 -translate-y-0.5 sm:translate-y-0">
                          {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                        </span>
                      </div>
                      {/* Day count: hidden on mobile, visible on desktop */}
                      <span className="hidden sm:flex text-[9px] sm:text-[10.5px] text-slate-500 items-center gap-1 font-mono pt-1 sm:pt-1.5 border-t border-slate-200/70">
                        <Clock className="w-3 h-3 text-[#8B182B] shrink-0" /> {pkg.duration ? pkg.duration.replace(/hours?/gi, 'hr').replace(/minutes?|mins?/gi, 'min') : '30 Days Care'}
                      </span>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-0.5 sm:space-y-2.5 mb-2.5 sm:mb-6 text-[8.5px] min-[360px]:text-[9.5px] sm:text-xs text-slate-700 flex-1">
                      <p className="text-[7.5px] sm:text-[10px] font-bold uppercase font-mono text-slate-400 tracking-wider">
                        Included Services:
                      </p>
                      {pkg.servicesIncluded.map((s, idx) => (
                        <div key={idx} className="flex items-start gap-1 sm:gap-2">
                          <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3]" />
                          </div>
                          <span className="leading-tight sm:leading-snug text-slate-700 font-medium">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (activePackageType === 'monthly' || is2Wheeler) {
                        selectPackageForBooking(pkg.id);
                        navigate('/booking');
                      } else {
                        selectServiceForBooking(pkg.serviceId || pkg.id);
                        navigate('/booking');
                      }
                    }}
                    className={`w-full py-1.5 min-[360px]:py-2 sm:py-3.5 rounded-lg sm:rounded-xl text-center text-[9px] min-[360px]:text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md mt-auto group-hover:scale-[1.02] ${
                      pkg.popular
                        ? 'burgundy-btn text-white'
                        : 'bg-[#121720] hover:bg-[#1E2633] text-white'
                    }`}
                  >
                    <span>BOOK {pkg.name.toUpperCase()}</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Simple & Clean Optional Add-Ons Section: Shown ONLY for 4-Wheeler Daily / One-Time single visits */}
          {!is2Wheeler && activePackageType === 'daily' && (
            <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-2.5 sm:p-8 space-y-2 sm:space-y-4 shadow-xs sm:shadow-sm">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[8px] sm:text-[10px] font-mono font-bold uppercase text-[#8B182B] tracking-wider">
                  OPTIONAL ADD-ONS
                </span>
                <h3 className="font-display font-black text-sm sm:text-xl text-slate-900 uppercase flex items-center gap-1.5">
                  EXTRA SERVICES & ADD-ONS
                </h3>
                <p className="font-sans text-[9.5px] sm:text-xs text-slate-600">
                  Tap any service below to add it directly to your car wash.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-4 pt-1 sm:pt-2">
                {ADDONS_DATA.map((addon) => {
                  const isSelected = draftBooking.selectedAddons.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-2 min-[360px]:p-2.5 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-rose-50/70 border-[#8B182B] shadow-md ring-1 ring-[#8B182B]'
                          : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1 sm:mb-2">
                          <span className="text-sm min-[360px]:text-base sm:text-2xl" role="img" aria-label={addon.name}>
                            {addon.icon || '✨'}
                          </span>
                          <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs font-mono font-black text-[#8B182B]">
                            +{formatCurrency(addon.price)}
                          </span>
                        </div>
                        <h4 className="text-[9px] min-[360px]:text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wide mb-0.5 sm:mb-1 truncate">
                          {addon.name}
                        </h4>
                        <p className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10px] text-slate-500 leading-tight mb-1.5 line-clamp-2">
                          {addon.description}
                        </p>
                      </div>

                      <div className="text-[7.5px] min-[360px]:text-[9px] sm:text-[10px] font-bold font-mono pt-1 sm:pt-2 border-t border-slate-200/60 mt-auto">
                        {isSelected ? (
                          <span className="text-[#8B182B] flex items-center gap-0.5 font-black">
                            ✓ Added
                          </span>
                        ) : (
                          <span className="text-slate-500 hover:text-slate-800 flex items-center gap-0.5">
                            + Add
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};
