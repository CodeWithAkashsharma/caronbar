import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { VEHICLE_TYPES } from '../../data/vehicleTypes';
import { Check, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const VehicleStep = ({ onNext, onPrev }) => {
  const { draftBooking, updateDraftBooking, calculateTotal } = useBooking();
  const [error, setError] = useState('');

  const handleSelect = (vehId) => {
    setError('');
    updateDraftBooking({ vehicleTypeId: vehId });
  };

  const handleNextClick = () => {
    if (!draftBooking.vehicleTypeId) {
      setError('Please select your vehicle class to proceed.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="space-y-5 sm:space-y-6 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
        <h3 className="text-lg sm:text-xl font-display font-bold text-[#0F172A] uppercase">Select Your Vehicle Class</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Our specialized equipment & chemical quantities auto-adjust based on surface area and body geometry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {VEHICLE_TYPES.map((veh) => {
          const isSelected = draftBooking.vehicleTypeId === veh.id;
          const totals = calculateTotal({ ...draftBooking, vehicleTypeId: veh.id });

          return (
            <div
              key={veh.id}
              onClick={() => handleSelect(veh.id)}
              className={`p-3.5 sm:p-5 rounded-2xl cursor-pointer border transition-all duration-300 relative group overflow-hidden ${
                isSelected
                  ? 'bg-[#8B182B]/10 border-[#8B182B] shadow-md ring-1 ring-[#8B182B]'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <img
                  src={veh.image}
                  alt={veh.name}
                  className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{veh.name}</h4>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#8B182B]/10 text-[#8B182B] shrink-0">
                      {veh.multiplier}x Rate
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mb-2 truncate">e.g. {veh.examples}</p>
                  
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono">Adjusted Total:</span>
                    <span className="text-xs sm:text-sm font-bold font-mono text-[#8B182B]">
                      {formatCurrency(totals.baseVehiclePrice)}
                    </span>
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-5 h-5 rounded-full bg-[#8B182B] text-white flex items-center justify-center shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs transition-colors cursor-pointer shrink-0 border border-slate-200"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="burgundy-btn px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs font-black cursor-pointer shadow-md"
        >
          <span>NEXT: ADDRESS & CONTACT →</span>
        </button>
      </div>
    </div>
  );
};
