import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { User, Mail, Phone, CarFront, MapPin, Navigation, AlertCircle } from 'lucide-react';

export const ContactAddressStep = ({ onNext, onPrev }) => {
  const { draftBooking, updateDraftBooking } = useBooking();
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState('');

  const contact = draftBooking.contact || {};
  const address = draftBooking.address || {};

  const handleContactChange = (field, val) => {
    setError('');
    updateDraftBooking({
      contact: {
        ...contact,
        [field]: val,
      },
    });
  };

  const handleAddressChange = (field, val) => {
    setError('');
    updateDraftBooking({
      address: {
        ...address,
        [field]: val,
      },
    });
  };

  const handleNextClick = () => {
    if (!contact.fullName?.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!contact.phone?.trim() || contact.phone.trim().length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!address.streetAddress?.trim()) {
      setError('Please enter your house/flat number and street address.');
      return;
    }
    if (!address.locality?.trim()) {
      setError('Please specify your locality / area (e.g. Janakpuri Block A).');
      return;
    }
    setError('');
    onNext();
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            const road = addr.road || addr.street || addr.pedestrian || addr.suburb || '';
            const houseNumber = addr.house_number || '';
            const streetAddress = [houseNumber, road].filter(Boolean).join(', ') || data.display_name.split(',')[0];
            
            const locality = addr.suburb || addr.neighbourhood || addr.residential || addr.district || 'Janakpuri';
            const city = addr.city || addr.town || addr.state_district || 'New Delhi';
            const pincode = addr.postcode || '110058';

            updateDraftBooking({
              address: {
                ...address,
                streetAddress: streetAddress || 'GPS Detected Location',
                locality: locality,
                city: city,
                pincode: pincode,
              },
            });
            setError('');
          }
        } catch (err) {
          console.error('Reverse geocode error:', err);
        } finally {
          setGpsLoading(false);
        }
      },
      () => setGpsLoading(false)
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <h3 className="text-sm min-[360px]:text-base sm:text-2xl font-display font-black text-slate-900 uppercase tracking-wide whitespace-nowrap">
          <span className="sm:hidden">Contact & Address</span>
          <span className="hidden sm:inline">Contact & Doorstep Address</span>
        </h3>
        <p className="hidden sm:block text-xs text-slate-600 leading-relaxed">
          Enter your contact details and doorstep service location for technician dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 max-w-4xl mx-auto">
        
        {/* Contact Info Column */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4 bg-slate-50/60 p-3 min-[360px]:p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
          <h4 className="text-xs font-display font-black uppercase tracking-wider text-[#8B182B] flex items-center gap-1.5 sm:gap-2">
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B182B]" /> Contact Details
          </h4>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-2.5 sm:left-3.5 sm:top-3" />
              <input
                type="text"
                value={contact.fullName || ''}
                onChange={(e) => handleContactChange('fullName', e.target.value)}
                placeholder="e.g. Rohan Kapoor"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
              Mobile Phone Number (WhatsApp) *
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-2.5 sm:left-3.5 sm:top-3" />
              <input
                type="tel"
                value={contact.phone || ''}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
              Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-2.5 sm:left-3.5 sm:top-3" />
              <input
                type="email"
                value={contact.email || ''}
                onChange={(e) => handleContactChange('email', e.target.value)}
                placeholder="e.g. rohan.kapoor@gmail.com"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
              Vehicle Model & Number <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <CarFront className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-2.5 sm:left-3.5 sm:top-3" />
              <input
                type="text"
                value={contact.vehicleInfo || contact.vehicleModel || ''}
                onChange={(e) => {
                  handleContactChange('vehicleInfo', e.target.value);
                  handleContactChange('vehicleModel', e.target.value);
                }}
                placeholder="e.g. 2023 Swift (DL 09 AB 1234)"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
              />
            </div>
          </div>
        </div>

        {/* Doorstep Address Column */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4 bg-slate-50/60 p-3 min-[360px]:p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-display font-black uppercase tracking-wider text-[#8B182B] flex items-center gap-1.5 sm:gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B182B] shrink-0" />
              <span className="sm:hidden">Address</span>
              <span className="hidden sm:inline">Doorstep Address</span>
            </h4>
            <button
              type="button"
              onClick={handleUseGPS}
              disabled={gpsLoading}
              className="text-[9.5px] sm:text-[10px] text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border border-emerald-200 cursor-pointer transition-all whitespace-nowrap shrink-0"
            >
              <Navigation className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${gpsLoading ? 'animate-spin' : ''}`} />
              <span>{gpsLoading ? 'Detecting...' : 'Use GPS'}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
              House / Flat No. & Street *
            </label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-2.5 sm:left-3.5 sm:top-3" />
              <input
                type="text"
                value={address.streetAddress || ''}
                onChange={(e) => handleAddressChange('streetAddress', e.target.value)}
                placeholder="House / Flat No, Street, Building"
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs placeholder:text-[10px] sm:placeholder:text-xs focus:outline-none focus:border-[#8B182B]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
                Locality / Area *
              </label>
              <input
                type="text"
                value={address.locality || ''}
                onChange={(e) => handleAddressChange('locality', e.target.value)}
                placeholder="e.g. Janakpuri Block B"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
                Landmark <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                value={address.landmark || ''}
                onChange={(e) => handleAddressChange('landmark', e.target.value)}
                placeholder="e.g. Near Metro Station"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
                City
              </label>
              <input
                type="text"
                value={address.city || 'New Delhi'}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#8B182B]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 uppercase tracking-wider text-[10px]">
                Pincode
              </label>
              <input
                type="text"
                value={address.pincode || '110058'}
                onChange={(e) => handleAddressChange('pincode', e.target.value)}
                placeholder="110058"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#8B182B] font-mono"
              />
            </div>
          </div>

        </div>

      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 max-w-4xl mx-auto">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 max-w-4xl mx-auto gap-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-[10px] sm:text-xs transition-colors cursor-pointer border border-slate-200"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="burgundy-btn px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black cursor-pointer shadow-md"
        >
          <span>PROCEED TO PAYMENT →</span>
        </button>
      </div>
    </div>
  );
};
