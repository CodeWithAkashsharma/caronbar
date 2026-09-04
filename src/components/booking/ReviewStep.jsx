import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { SERVICES_DATA } from '../../data/servicesData';
import { PACKAGES_DATA } from '../../data/packagesData';
import { VEHICLE_TYPES } from '../../data/vehicleTypes';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Car, MapPin, Calendar, User } from 'lucide-react';

export const ReviewStep = ({ onNext, onPrev }) => {
  const { draftBooking, calculatePricingSummary } = useBooking();

  const totals = calculatePricingSummary(draftBooking);

  const itemObj = draftBooking.itemType === 'package'
    ? (PACKAGES_DATA.find(p => p.id === draftBooking.selectedItemId) || PACKAGES_DATA[1])
    : (SERVICES_DATA.find(s => s.id === draftBooking.selectedItemId || s.slug === draftBooking.selectedItemId) || SERVICES_DATA[2]);

  const vehicleObj = VEHICLE_TYPES.find(v => v.id === draftBooking.vehicleTypeId) || VEHICLE_TYPES[1];

  return (
    <div className="space-y-5 sm:space-y-6 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
        <h3 className="text-lg sm:text-xl font-display font-bold text-[#0F172A] uppercase">Review Your Booking Summary</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Verify all specifications before selecting your preferred payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Left Column: Specs Card */}
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
          <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-3.5 sm:space-y-4 shadow-sm">
            
            {/* Service Title & Vehicle */}
            <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-slate-100">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#8B182B]/10 text-[#8B182B] font-bold border border-[#8B182B]/20">
                  {draftBooking.itemType === 'package' ? 'Bespoke Package' : 'Individual Service'}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5">{itemObj.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{itemObj.tagline || itemObj.shortDescription}</p>
              </div>
            </div>

            {/* Vehicle & Slot Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <span className="text-slate-500 flex items-center gap-1 text-[10px] uppercase font-mono font-medium">
                  <Car className="w-3.5 h-3.5 text-[#8B182B] shrink-0" /> Vehicle Class
                </span>
                <p className="font-bold text-slate-900 truncate">{vehicleObj.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">Rate multiplier: {vehicleObj.multiplier}x</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <span className="text-slate-500 flex items-center gap-1 text-[10px] uppercase font-mono font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#8B182B] shrink-0" /> Schedule
                </span>
                <p className="font-bold text-slate-900 truncate">{formatDate(draftBooking.selectedDate)}</p>
                <p className="text-[10px] text-[#8B182B] font-mono font-semibold">{draftBooking.selectedTimeSlot}</p>
              </div>
            </div>

            {/* Doorstep Location */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
              <span className="text-slate-500 flex items-center gap-1 text-[10px] uppercase font-mono font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#8B182B] shrink-0" /> Doorstep Location
              </span>
              <p className="font-bold text-slate-900 leading-relaxed">
                {draftBooking.address?.streetAddress}, {draftBooking.address?.locality}, {draftBooking.address?.city} {draftBooking.address?.pincode}
              </p>
              {draftBooking.address?.landmark && (
                <p className="text-[10px] text-slate-500">Landmark: {draftBooking.address.landmark}</p>
              )}
            </div>

            {/* Customer Details */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
              <span className="text-slate-500 flex items-center gap-1 text-[10px] uppercase font-mono font-medium">
                <User className="w-3.5 h-3.5 text-[#8B182B] shrink-0" /> Contact & Vehicle Reg
              </span>
              <p className="font-bold text-slate-900">
                {draftBooking.contact?.fullName} ({draftBooking.contact?.phone})
              </p>
              <p className="text-[10px] text-[#8B182B] font-mono font-bold">
                {draftBooking.contact?.vehicleModel} | Reg: {draftBooking.contact?.licensePlate}
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Pricing Breakdown */}
        <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
          
          {/* Price Calculation Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white border-2 border-[#8B182B] space-y-3 shadow-xl">
            <h4 className="text-xs font-display font-bold uppercase tracking-widest text-[#8B182B] border-b border-slate-100 pb-2">
              Investment Breakdown
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span>Base Service Price</span>
                <span className="font-mono">{formatCurrency(totals.basePrice)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-700">
                <span>Vehicle Multiplier ({vehicleObj.name.split('/')[0]} - {vehicleObj.multiplier}x)</span>
                <span className="font-mono">{formatCurrency(totals.baseVehiclePrice)}</span>
              </div>

              {draftBooking.selectedAddons.length > 0 && (
                <div className="flex items-center justify-between text-slate-700">
                  <span>Selected Add-ons ({draftBooking.selectedAddons.length})</span>
                  <span className="font-mono">+{formatCurrency(totals.addonsTotal)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Total Investment</span>
                  <span className="text-[10px] text-slate-500 font-mono">Taxes & doorstep dispatch included</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#8B182B]">
                  {formatCurrency(totals.finalTotal)}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

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
          onClick={onNext}
          className="burgundy-btn px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs font-black cursor-pointer"
        >
          <span>NEXT: PROCEED TO PAYMENT →</span>
        </button>
      </div>
    </div>
  );
};
