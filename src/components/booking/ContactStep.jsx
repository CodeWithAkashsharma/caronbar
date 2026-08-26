import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { User, Mail, Phone, CarFront, FileText, AlertCircle } from 'lucide-react';

export const ContactStep = ({ onNext, onPrev }) => {
  const { draftBooking, updateDraftBooking } = useBooking();
  const [error, setError] = useState('');

  const contact = draftBooking.contact || {};

  const handleChange = (field, val) => {
    setError('');
    updateDraftBooking({
      contact: {
        ...contact,
        [field]: val,
      },
    });
  };

  const handleNextClick = () => {
    if (
      !contact.fullName?.trim() || 
      !contact.email?.trim() || 
      !contact.phone?.trim() || 
      !contact.vehicleModel?.trim() || 
      !contact.licensePlate?.trim()
    ) {
      setError('Please fill out all mandatory contact and vehicle fields (Name, Email, Phone, Vehicle Model, License Plate) to proceed.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="space-y-5 sm:space-y-6 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
        <h3 className="text-lg sm:text-xl font-display font-bold text-[#0F172A] uppercase">Contact & Vehicle Details</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Our senior detailer will send live SMS updates prior to arrival.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 max-w-3xl mx-auto">
        <div>
          <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
            <input
              type="text"
              value={contact.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Rohan Kapoor"
              className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
            <input
              type="email"
              value={contact.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g. rohan@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
            Mobile / Phone Number *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
            <input
              type="tel"
              value={contact.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
            Exact Vehicle Model & Year *
          </label>
          <div className="relative">
            <CarFront className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
            <input
              type="text"
              value={contact.vehicleModel || ''}
              onChange={(e) => handleChange('vehicleModel', e.target.value)}
              placeholder="e.g. 2024 Honda City ZX"
              className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
              required
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
            Registration / License Plate Number *
          </label>
          <input
            type="text"
            value={contact.licensePlate || ''}
            onChange={(e) => handleChange('licensePlate', e.target.value)}
            placeholder="e.g. DL-01-AB-1234"
            className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs font-mono uppercase focus:outline-none focus:border-[#8B182B]"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
            Special Instructions / Gate Security Code (Optional)
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
            <textarea
              rows={2}
              value={contact.specialInstructions || ''}
              onChange={(e) => handleChange('specialInstructions', e.target.value)}
              placeholder="e.g. Underground parking bay 4, please request gate entry at security..."
              className="w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 max-w-3xl mx-auto rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
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
          <span>NEXT: REVIEW ORDER →</span>
        </button>
      </div>
    </div>
  );
};
