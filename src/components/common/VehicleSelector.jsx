import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { VEHICLE_TYPES } from '../../data/vehicleTypes';
import { Car, CarFront, ShieldCheck, Crown, Check, Bike } from 'lucide-react';

const ICON_MAP = {
  Car: Car,
  CarFront: CarFront,
  SUV: ShieldCheck,
  Luxury: Crown,
  Bike: Bike,
};

/**
 * VehicleSelector — can operate in two modes:
 * 1. Context-driven (default): reads/writes from BookingContext global state
 * 2. Controlled: pass vehicleTypes, selectedId, and onSelect props to override
 *    Used by Packages.jsx & Home.jsx Monthly tab to show the merged 3-tab selector
 *    independently from the global 4-tab daily vehicle state.
 */
export const VehicleSelector = ({
  className = '',
  // Optional overrides for controlled mode (Monthly packages tab)
  vehicleTypes: vehicleTypesProp = null,
  selectedId: selectedIdProp = null,
  onSelect: onSelectProp = null,
}) => {
  const { selectedVehicleId, setSelectedVehicleId, updateDraftBooking } = useBooking();

  // If override props provided → controlled mode; else → context mode
  const isControlled = vehicleTypesProp !== null && selectedIdProp !== null && onSelectProp !== null;
  const vehicleList = isControlled ? vehicleTypesProp : VEHICLE_TYPES;
  const activeId = isControlled ? selectedIdProp : selectedVehicleId;

  const handleSelect = (v) => {
    if (isControlled) {
      onSelectProp(v.id);
    } else {
      setSelectedVehicleId(v.id);
      updateDraftBooking({ vehicleTypeId: v.id });
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* ULTRA-COMPACT HEADER */}
      <div className="flex items-center justify-between mb-1 sm:mb-1.5 px-0.5">
        <span className="text-[9px] sm:text-[11px] font-display font-black uppercase tracking-wide text-slate-800 flex items-center gap-1 sm:gap-1.5">
          <Car className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B182B] shrink-0" />
          Choose Vehicle Type:
        </span>
        <span className="text-[7.5px] sm:text-[10px] text-slate-500 font-sans">
          Live rates
        </span>
      </div>

      {/* VEHICLE TYPE PILL CARDS */}
      <div className={`grid gap-1 sm:gap-2 ${vehicleList.length === 3 ? 'grid-cols-3' : 'grid-cols-2 min-[420px]:grid-cols-4'}`}>
        {vehicleList.map((v) => {
          const IconComponent = ICON_MAP[v.icon] || Car;
          const isSelected = activeId === v.id;

          return (
            <button
              key={v.id}
              type="button"
              onClick={() => handleSelect(v)}
              className={`py-1.5 min-[360px]:py-2 sm:py-2.5 px-1 min-[360px]:px-1.5 sm:px-2.5 rounded-lg sm:rounded-xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-center sm:justify-between gap-1 sm:gap-2 text-center sm:text-left ${
                isSelected
                  ? 'bg-rose-50/90 border-[#8B182B] shadow-xs ring-1 ring-[#8B182B]/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 min-w-0 flex-1 w-full justify-center">
                <div
                  className={`w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#8B182B] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <IconComponent className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="min-w-0 flex-1 w-full text-center sm:text-left">
                  <p
                    className={`text-[7px] min-[330px]:text-[8px] min-[360px]:text-[9px] sm:text-xs font-display font-black uppercase truncate leading-tight tracking-tight sm:tracking-normal ${
                      isSelected ? 'text-[#8B182B]' : 'text-slate-900'
                    }`}
                  >
                    <span className="sm:hidden">{v.id === 'hatchback-sedan' ? 'HATCH / SEDAN' : v.name.split('(')[0].trim()}</span>
                    <span className="hidden sm:inline">{v.name.split('(')[0].trim()}</span>
                  </p>
                  <p className="text-[9px] text-slate-500 truncate leading-tight hidden sm:block">
                    {v.examples.split(',').slice(0, 2).join(',')}
                  </p>
                </div>
              </div>

              <div
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full hidden sm:flex items-center justify-center shrink-0 text-[8px] font-bold ${
                  isSelected
                    ? 'bg-[#8B182B] text-white'
                    : 'border border-slate-300 text-transparent'
                }`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
