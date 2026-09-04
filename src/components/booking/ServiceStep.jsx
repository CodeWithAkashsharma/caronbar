import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { SERVICES_DATA } from '../../data/servicesData';
import { MONTHLY_PACKAGES_DATA, BIKE_PACKAGES_DATA } from '../../data/packagesData';
import { VehicleSelector } from '../common/VehicleSelector';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const ServiceStep = ({ onNext }) => {
  const { draftBooking, updateDraftBooking, currentVehicle, selectedVehicleId } = useBooking();
  const is2Wheeler = currentVehicle?.id === '2wheeler' || draftBooking.vehicleTypeId === '2wheeler' || selectedVehicleId === '2wheeler';
  const [activeTab, setActiveTab] = useState(is2Wheeler ? 'package' : (draftBooking.itemType || 'package'));
  const [error, setError] = useState('');

  // Sync activeTab with draftBooking.itemType
  useEffect(() => {
    if (is2Wheeler) {
      setActiveTab('package');
    } else if (draftBooking.itemType) {
      setActiveTab(draftBooking.itemType);
    }
  }, [draftBooking.itemType, is2Wheeler]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    updateDraftBooking({
      itemType: tab
    });
  };

  const handleSelectService = (id) => {
    setError('');
    const isCurrentlySelected = draftBooking.itemType === 'service' && (draftBooking.selectedItemId === id);
    if (isCurrentlySelected) {
      updateDraftBooking({ itemType: 'service', selectedItemId: '' });
    } else {
      updateDraftBooking({ itemType: 'service', selectedItemId: id });
    }
  };

  const handleSelectPackage = (id) => {
    setError('');
    const isCurrentlySelected = draftBooking.itemType === 'package' && (draftBooking.selectedItemId === id);
    if (isCurrentlySelected) {
      updateDraftBooking({ itemType: 'package', selectedItemId: '' });
    } else {
      updateDraftBooking({ itemType: 'package', selectedItemId: id });
    }
  };

  const handleNextClick = () => {
    if (!draftBooking.selectedItemId) {
      setError('Please select a service treatment or package to proceed.');
      return;
    }
    setError('');
    onNext();
  };

  const isDaily = activeTab === 'service';
  const monthlyList = is2Wheeler
    ? BIKE_PACKAGES_DATA
    : MONTHLY_PACKAGES_DATA;

  return (
    <div className="space-y-4 sm:space-y-5 font-sans">
      {/* 1. COMPACT VEHICLE SELECTOR AT TOP FIRST */}
      <div className="bg-slate-50/90 p-2.5 sm:p-3 rounded-2xl border border-slate-200 shadow-xs">
        <VehicleSelector />
      </div>

      {/* 2. CATEGORY TOGGLE: MONTHLY PACKAGES FIRST, THEN DAILY TREATMENTS (HIDDEN FOR 2-WHEELER) */}
      {!is2Wheeler && (
        <div className="flex items-center justify-center p-1 rounded-xl sm:rounded-2xl max-w-md mx-auto border border-slate-200 bg-slate-100 shadow-inner">
          <button
            type="button"
            onClick={() => handleTabChange('package')}
            className={`flex-1 py-1.5 sm:py-2.5 px-1.5 min-[360px]:px-2 sm:px-3 rounded-lg sm:rounded-xl text-[8.5px] min-[360px]:text-[10px] sm:text-xs font-display font-black uppercase tracking-tight sm:tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'package'
                ? 'burgundy-btn shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Packages
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('service')}
            className={`flex-1 py-1.5 sm:py-2.5 px-1.5 min-[360px]:px-2 sm:px-3 rounded-lg sm:rounded-xl text-[8.5px] min-[360px]:text-[10px] sm:text-xs font-display font-black uppercase tracking-tight sm:tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'service'
                ? 'burgundy-btn shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daily Treatments
          </button>
        </div>
      )}

      {/* 3. Services / Packages Grid */}
      {activeTab === 'service' && !is2Wheeler ? (
        /* Standard Car Daily Treatments (6 Cards) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {SERVICES_DATA.map((service) => {
            const isSelected = draftBooking.itemType === 'service' && (draftBooking.selectedItemId === service.id || draftBooking.selectedItemId === service.slug);
            const calculatedPrice = (service.prices && (service.prices[currentVehicle.id] ?? service.prices['hatchback-sedan'])) ?? Math.round(service.basePrice * (currentVehicle?.multiplier || 1));
            const ratio = (service.originalBasePrice && service.basePrice) ? (service.originalBasePrice / service.basePrice) : 1.35;
            const originalPrice = Math.max(Math.round(calculatedPrice * Math.max(ratio, 1.35)), calculatedPrice + 150);
            const percentOff = Math.max(5, Math.round(((originalPrice - calculatedPrice) / originalPrice) * 100));

            return (
              <div
                key={service.id}
                onClick={() => handleSelectService(service.slug || service.id)}
                className={`p-2 min-[360px]:p-2.5 sm:p-3 rounded-xl sm:rounded-2xl cursor-pointer border transition-all duration-300 relative group overflow-hidden ${isSelected
                    ? 'bg-rose-50/80 border-2 border-[#8B182B] shadow-sm ring-1 ring-[#8B182B]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-12 h-12 min-[360px]:w-14 min-[360px]:h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-display font-black italic text-xs min-[360px]:text-sm text-slate-950 uppercase truncate leading-tight">
                        {service.name}
                      </h4>
                    </div>
                    <p className="font-sans text-[8.5px] min-[360px]:text-[9.5px] sm:text-xs text-slate-700 font-medium line-clamp-2 mb-1 leading-tight sm:leading-snug">
                      {service.shortDescription}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 gap-1">
                      <span className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] text-slate-600 font-semibold flex items-center gap-0.5 font-sans shrink-0">
                        <Clock className="w-2.5 h-2.5 text-[#8B182B] shrink-0" /> {service.duration ? service.duration.replace(/hours?/gi, 'hr').replace(/minutes?|mins?/gi, 'min') : ''}
                      </span>
                      <div className="flex items-baseline justify-end gap-1 shrink-0">
                        <span className="text-xs min-[360px]:text-sm sm:text-base font-black font-mono text-[#8B182B]">
                          {formatCurrency(calculatedPrice)}
                        </span>
                        <span className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] text-slate-400 font-mono line-through font-medium">
                          {formatCurrency(originalPrice)}
                        </span>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-bold font-mono px-1 py-0.2 rounded-full uppercase shrink-0">
                          {percentOff}% OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 rounded-full bg-[#8B182B] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Monthly Packages Grid: 1-Column centered for 2-Wheeler (₹399), 2-Column on Mobile, 3-Column on Desktop for Cars */
        <div className="flex flex-wrap justify-center items-stretch gap-2 sm:gap-3">
          {monthlyList.map((pkg) => {
            const isSelected = draftBooking.itemType === 'package' && draftBooking.selectedItemId === pkg.id;
            const calculatedPrice = (pkg.prices && (pkg.prices[currentVehicle.id] ?? pkg.prices['hatchback-sedan'] ?? pkg.prices['hatchback'])) ?? Math.round(pkg.basePrice * (currentVehicle?.multiplier || 1));
            const ratio = (pkg.originalBasePrice && pkg.basePrice) ? (pkg.originalBasePrice / pkg.basePrice) : 1.35;
            const originalPrice = Math.max(Math.round(calculatedPrice * Math.max(ratio, 1.35)), calculatedPrice + 150);
            const percentOff = Math.max(5, Math.round(((originalPrice - calculatedPrice) / originalPrice) * 100));

            return (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg.id)}
                className={`w-full ${
                  is2Wheeler
                    ? 'max-w-md'
                    : monthlyList.length === 2
                    ? 'sm:w-[calc(50%-0.5rem)] max-w-sm'
                    : 'sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.5rem)] max-w-sm'
                } p-2 min-[360px]:p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl cursor-pointer border transition-all duration-300 flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-rose-50/70 border-2 border-[#8B182B] shadow-sm scale-[1.01]'
                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="font-display font-black italic text-[10px] min-[360px]:text-xs sm:text-sm text-[#8B182B] uppercase truncate">
                      {pkg.name}
                    </h4>
                    {pkg.badge && (
                      <span className="text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-mono font-bold bg-[#8B182B]/10 text-[#8B182B] px-1 py-0.2 rounded-full uppercase shrink-0">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-[7.5px] min-[360px]:text-[8.5px] sm:text-xs text-slate-700 font-medium leading-tight sm:leading-snug mb-1 sm:mb-2 line-clamp-2">
                    {pkg.tagline}
                  </p>

                  <div className="mb-1 sm:mb-2 p-1 min-[360px]:p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-1 flex-nowrap">
                    <div className="flex items-baseline gap-1 sm:gap-1.5 shrink-0">
                      <span className="text-xs min-[360px]:text-sm sm:text-base font-black font-mono text-[#8B182B]">
                        {formatCurrency(calculatedPrice)}
                      </span>
                      <span className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10px] text-slate-400 font-mono line-through font-medium">
                        {formatCurrency(originalPrice)}
                      </span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[6.5px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-bold font-mono px-1 py-0.2 rounded-full uppercase shrink-0 whitespace-nowrap">
                      {percentOff}% OFF
                    </span>
                  </div>

                  <ul className="space-y-0.5 sm:space-y-1 mb-1.5 sm:mb-3 text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10.5px]">
                    {pkg.servicesIncluded.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1 sm:gap-1.5 text-slate-800 font-semibold leading-tight">
                        <Check className="w-2 h-2 sm:w-3 sm:h-3 text-[#8B182B] shrink-0 mt-0.5" />
                        <span className="line-clamp-2 sm:line-clamp-none">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-1 min-[360px]:py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[8px] min-[360px]:text-[9px] sm:text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected ? 'burgundy-btn' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{isSelected ? '✓ SELECTED' : 'SELECT'}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* Dynamic Next Step Button */}
      <div className="flex justify-end pt-2 sm:pt-3">
        <button
          type="button"
          onClick={handleNextClick}
          className="burgundy-btn w-auto px-4 sm:px-9 py-2 sm:py-3.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider cursor-pointer shadow-md"
        >
          {isDaily && !is2Wheeler ? (
            <span>NEXT: ADD-ONS →</span>
          ) : (
            <span>NEXT: ADDRESS & CONTACT →</span>
          )}
        </button>
      </div>
    </div>
  );
};
