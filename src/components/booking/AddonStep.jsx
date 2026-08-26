import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { ADDONS_DATA } from '../../data/packagesData';
import { Check, Plus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const AddonStep = ({ onNext, onPrev }) => {
  const { draftBooking, toggleAddon } = useBooking();

  return (
    <div className="space-y-3 sm:space-y-6 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-1 sm:space-y-2">
        <h3 className="text-sm min-[360px]:text-base sm:text-xl font-display font-black text-[#0F172A] uppercase">
          <span className="sm:hidden">Select Add-Ons</span>
          <span className="hidden sm:inline">Select Extra Services & Add-Ons</span>
        </h3>
        <p className="hidden sm:block text-xs text-slate-600 leading-relaxed">
          Choose any optional add-ons to customize your wash.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
        {ADDONS_DATA.map((addon) => {
          const isSelected = draftBooking.selectedAddons.includes(addon.id);

          return (
            <div
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`p-2.5 min-[360px]:p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer border transition-all duration-300 flex items-center justify-between gap-2.5 sm:gap-4 ${
                isSelected
                  ? 'bg-rose-50/70 border-[#8B182B] shadow-md ring-1 ring-[#8B182B]'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <span className="text-lg sm:text-2xl shrink-0" role="img" aria-label={addon.name}>
                  {addon.icon || '✨'}
                </span>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-bold text-slate-900 uppercase leading-tight">{addon.name}</h4>
                    <span className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-mono font-bold text-[#8B182B] shrink-0">
                      +{formatCurrency(addon.price)}
                    </span>
                  </div>
                  <p className="text-[8.5px] min-[360px]:text-[9.5px] sm:text-[11px] text-slate-500 leading-tight">{addon.description}</p>
                </div>
              </div>

              <div
                className={`w-5 h-5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-[#8B182B] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isSelected ? <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" /> : <Plus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-3 gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-[10px] sm:text-xs transition-colors cursor-pointer shrink-0 border border-slate-200"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="burgundy-btn px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black cursor-pointer shadow-md"
        >
          <span>NEXT: ADDRESS →</span>
        </button>
      </div>
    </div>
  );
};
