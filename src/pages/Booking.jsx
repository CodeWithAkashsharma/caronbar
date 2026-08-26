import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/formatters';
import { StepIndicator } from '../components/booking/StepIndicator';
import { ServiceStep } from '../components/booking/ServiceStep';
import { VehicleStep } from '../components/booking/VehicleStep';
import { AddonStep } from '../components/booking/AddonStep';
import { ContactAddressStep } from '../components/booking/ContactAddressStep';
import { PaymentStep } from '../components/booking/PaymentStep';
import { Flame, RotateCcw, AlertTriangle, X } from 'lucide-react';

export const Booking = () => {
  const [searchParams] = useSearchParams();
  const { draftBooking, updateDraftBooking, resetDraftBooking, calculateTotal, calculatePricingSummary, selectedVehicleId, setSelectedVehicleId } = useBooking();
  const [showResetModal, setShowResetModal] = useState(false);
  const step = draftBooking.step || 1;

  // Auto reset to 4-Wheeler if user arrived without ?vehicle=2wheeler and no bike item was chosen
  useEffect(() => {
    const isVehicle2WInUrl = searchParams.get('vehicle') === '2wheeler';
    const isBikeItem = draftBooking.selectedItemId && draftBooking.selectedItemId.startsWith('bike-');
    
    if (!isVehicle2WInUrl && !isBikeItem) {
      if (selectedVehicleId === '2wheeler' || draftBooking.vehicleTypeId === '2wheeler') {
        setSelectedVehicleId('hatchback');
        updateDraftBooking({ vehicleTypeId: 'hatchback' });
      }
    } else if (isVehicle2WInUrl && selectedVehicleId !== '2wheeler') {
      setSelectedVehicleId('2wheeler');
      updateDraftBooking({ vehicleTypeId: '2wheeler' });
    }
  }, [searchParams]);

  // Show Add-ons step ONLY for 4-wheeler single visit services, skip for monthly packages and 2-wheelers
  const is2Wheeler = draftBooking.vehicleTypeId === '2wheeler' || (draftBooking.selectedItemId && draftBooking.selectedItemId.startsWith('bike-'));
  const isDailyService = draftBooking.itemType === 'service' && !is2Wheeler;

  // Calculate live amount: Default hidden/blank until user selects a service or package
  const pricing = calculatePricingSummary ? calculatePricingSummary(draftBooking) : null;
  const currentTotal = pricing ? pricing.finalTotal : (typeof calculateTotal === 'function' ? Number(calculateTotal(draftBooking)) || 0 : 0);
  const showLivePrice = Boolean(draftBooking.selectedItemId && currentTotal > 0);

  const steps = isDailyService
    ? [
        { id: 1, title: 'Service' },
        { id: 2, title: 'Add-ons' },
        { id: 3, title: 'Address & Contact' },
        { id: 4, title: 'Payment' },
      ]
    : [
        { id: 1, title: is2Wheeler ? '2-Wheeler' : 'Package' },
        { id: 2, title: 'Address & Contact' },
        { id: 3, title: 'Payment' },
      ];

  const setStep = (newStep) => {
    updateDraftBooking({ step: newStep });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const confirmResetAndRestart = () => {
    resetDraftBooking();
    setShowResetModal(false);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title={`STEP ${step} | CARONBAR Doorstep Car Wash Reservation`}
        description="Book high-performance doorstep car wash, foam cleaning, interior dry steam sanitization, and 9H ceramic protection."
        canonicalPath="/booking"
      />

      <div className="pt-20 sm:pt-32 pb-10 sm:pb-24 bg-[#F8FAFC] min-h-screen text-slate-800 relative">
        <div className="max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-8 relative z-10">
          
          {/* Header with Heading & Right-Corner Small Restart Button */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5 sm:pb-4">
            <div className="space-y-0.5 min-w-0">
              <span className="hidden sm:flex font-sans text-[10px] sm:text-xs uppercase tracking-widest text-[#8B182B] items-center gap-1.5 font-bold">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B182B] shrink-0" /> DOORSTEP RESERVATION
              </span>
              <h1 className="font-display font-black text-sm min-[360px]:text-base sm:text-4xl italic text-[#0F172A] uppercase tracking-wider whitespace-nowrap">
                BOOK DOORSTEP SERVICE
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="flex items-center gap-1 px-2 py-1 sm:px-3.5 sm:py-2 rounded-md sm:rounded-xl bg-rose-50 hover:bg-rose-100 text-[#8B182B] border border-rose-200 text-[9px] min-[360px]:text-[10px] sm:text-xs font-bold transition-all cursor-pointer shadow-xs shrink-0"
              title="Clear all filled inputs and restart booking from Step 1"
            >
              <RotateCcw className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
              <span>Restart</span>
            </button>
          </div>

          {/* Step Indicator */}
          <div className="white-card p-2 sm:p-4 rounded-xl sm:rounded-2xl">
            <StepIndicator currentStep={step} setStep={setStep} steps={steps} />
          </div>

          {/* Active Step Container */}
          <div className="white-card p-3 min-[360px]:p-4 sm:p-8 rounded-xl sm:rounded-2xl relative overflow-hidden">
            
            {/* Top Bar inside Box: Step indicator breadcrumb on Left, Live Amount Badge in Right Top Corner */}
            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 sm:pb-4 sm:mb-6 border-b border-slate-100 min-h-[34px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#8B182B] shrink-0" />
                <span className="font-display font-black text-[11px] sm:text-sm uppercase tracking-wider text-slate-800 truncate">
                  {step === 1 ? 'Step 1: Choose Vehicle & Plan' : step === 2 && isDailyService ? 'Step 2: Add Extra Treatments' : (isDailyService && step === 3) || (!isDailyService && step === 2) ? 'Step 3: Service Address & Details' : 'Final Step: Review & Confirm'}
                </span>
              </div>

              {/* LIVE AMOUNT BADGE IN RIGHT TOP CORNER */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1 rounded-lg sm:rounded-xl bg-rose-50/90 border border-[#8B182B]/30 shadow-xs animate-fadeIn shrink-0">
                <span className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  TOTAL:
                </span>
                <span className="font-mono font-black text-xs min-[360px]:text-sm sm:text-base text-[#8B182B]">
                  {formatCurrency(currentTotal)}
                </span>
              </div>
            </div>

            {step === 1 && <ServiceStep onNext={nextStep} />}
            {isDailyService ? (
              <>
                {step === 2 && <AddonStep onNext={nextStep} onPrev={prevStep} />}
                {step === 3 && <ContactAddressStep onNext={nextStep} onPrev={prevStep} />}
                {step === 4 && <PaymentStep onPrev={prevStep} />}
              </>
            ) : (
              <>
                {step === 2 && <ContactAddressStep onNext={nextStep} onPrev={prevStep} />}
                {step === 3 && <PaymentStep onPrev={prevStep} />}
              </>
            )}
          </div>

        </div>
      </div>

      {/* CUSTOM RESTART CONFIRMATION POPUP MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn font-sans">
          <div className="relative w-full max-w-xs sm:max-w-md bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 text-center space-y-3 sm:space-y-4 shadow-2xl">
            
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 p-1 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-rose-50 text-[#8B182B] border border-rose-200 mx-auto flex items-center justify-center shadow-md">
              <AlertTriangle className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 uppercase tracking-wide">Erase All Booking Data?</h3>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                This will clear all filled information across all steps and restart your reservation from Step 1.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] sm:text-xs transition-colors cursor-pointer border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmResetAndRestart}
                className="flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl burgundy-btn text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Yes, Restart
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
