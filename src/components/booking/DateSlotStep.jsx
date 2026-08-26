import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Calendar, Clock, Check, AlertCircle } from 'lucide-react';

const TIME_SLOTS = [
  { id: 'slot-1', time: '09:00 AM - 12:00 PM', period: 'Morning Express', slotsLeft: 3 },
  { id: 'slot-2', time: '12:00 PM - 03:00 PM', period: 'Afternoon Prime', slotsLeft: 2 },
  { id: 'slot-3', time: '03:00 PM - 06:00 PM', period: 'Evening Concierge', slotsLeft: 4 },
  { id: 'slot-4', time: '06:00 PM - 09:00 PM', period: 'Sunset VIP Unit', slotsLeft: 1 },
];

export const DateSlotStep = ({ onNext, onPrev }) => {
  const { draftBooking, updateDraftBooking } = useBooking();
  const [error, setError] = useState('');

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  const selectedDate = draftBooking.selectedDate || '';
  const selectedTimeSlot = draftBooking.selectedTimeSlot || '';

  const handleDateSelect = (dateStr) => {
    setError('');
    updateDraftBooking({ selectedDate: dateStr });
  };

  const handleTimeSlotSelect = (timeStr) => {
    setError('');
    updateDraftBooking({ selectedTimeSlot: timeStr });
  };

  const handleNextClick = () => {
    if (!selectedDate || !selectedTimeSlot) {
      setError('Please select both a Service Date and a Mobile Unit Time Slot to proceed.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="space-y-5 sm:space-y-6 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
        <h3 className="text-lg sm:text-xl font-display font-bold text-[#0F172A] uppercase">Select Date & Preferred Time Slot</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Our fully equipped mobile unit arrives right at your specified doorstep window.
        </p>
      </div>

      {/* Date Picker */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-xs font-display font-bold uppercase tracking-wider text-[#8B182B] flex items-center gap-1.5">
          <Calendar className="w-4 h-4 shrink-0" /> Pick Service Date *
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 sm:gap-2.5">
          {availableDates.map((item) => {
            const isSelected = selectedDate === item.fullDate;
            return (
              <button
                key={item.fullDate}
                type="button"
                onClick={() => handleDateSelect(item.fullDate)}
                className={`p-2 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B182B] text-white border-[#8B182B] font-bold shadow-md scale-105'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 shadow-sm'
                }`}
              >
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider block opacity-80">
                  {item.dayName}
                </span>
                <span className="text-base sm:text-xl font-bold font-display block my-0.5">
                  {item.dayNum}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono block opacity-80">
                  {item.month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Picker */}
      <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
        <label className="text-xs font-display font-bold uppercase tracking-wider text-[#8B182B] flex items-center gap-1.5">
          <Clock className="w-4 h-4 shrink-0" /> Pick Mobile Unit Arrival Window *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedTimeSlot === slot.time;
            return (
              <div
                key={slot.id}
                onClick={() => handleTimeSlotSelect(slot.time)}
                className={`p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 sm:gap-4 ${
                  isSelected
                    ? 'bg-[#8B182B]/10 border-[#8B182B] shadow-md ring-1 ring-[#8B182B]'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {slot.period}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 font-mono mt-1 truncate">{slot.time}</p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="text-[9px] sm:text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md font-mono border border-emerald-200 font-bold">
                    {slot.slotsLeft} Vans Free
                  </span>
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-[#8B182B] text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
          className="burgundy-btn px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs font-black cursor-pointer"
        >
          <span>NEXT: LOCATION & ADDRESS →</span>
        </button>
      </div>
    </div>
  );
};
