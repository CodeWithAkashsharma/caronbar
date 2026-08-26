import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { MapPin, Navigation, Compass, CheckCircle2, AlertCircle } from 'lucide-react';

export const AddressStep = ({ onNext, onPrev }) => {
  const { draftBooking, updateDraftBooking } = useBooking();
  const [gpsLoading, setGpsLoading] = useState(false);
  const [error, setError] = useState('');

  const address = draftBooking.address || {};

  const handleChange = (field, val) => {
    setError('');
    updateDraftBooking({
      address: {
        ...address,
        [field]: val,
      },
    });
  };

  const handleNextClick = () => {
    if (!address.streetAddress?.trim() || !address.locality?.trim() || !address.city?.trim() || !address.pincode?.trim()) {
      setError('Please complete all mandatory doorstep address fields (Street Address, Locality, City, Pincode) to proceed.');
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
            
            const locality = addr.suburb || addr.neighbourhood || addr.residential || addr.district || 'Connaught Place';
            const city = addr.city || addr.town || addr.state_district || 'New Delhi';
            const pincode = addr.postcode || '110001';

            updateDraftBooking({
              address: {
                ...address,
                title: 'Current GPS Location',
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
    <div className="space-y-5 sm:space-y-6 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
        <h3 className="text-lg sm:text-xl font-display font-bold text-[#0F172A] uppercase">Doorstep Service Location</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Specify your home driveway, executive garage, or private parking bay address.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-[#8B182B]">
              Address Details
            </span>
            <button
              type="button"
              onClick={handleUseGPS}
              disabled={gpsLoading}
              className="text-[11px] sm:text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-all cursor-pointer w-fit"
            >
              <Navigation className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
              {gpsLoading ? 'Detecting Live Location...' : 'Auto-fill Current Location'}
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
              Street Address / House Number *
            </label>
            <div className="relative">
              <input
                type="text"
                value={address.streetAddress || ''}
                onChange={(e) => handleChange('streetAddress', e.target.value)}
                placeholder="e.g. 450 Barakhamba Rd, Flat 4B"
                className="w-full pl-3.5 pr-10 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                required
              />
              <button
                type="button"
                onClick={handleUseGPS}
                disabled={gpsLoading}
                title="Fetch Current Location via GPS"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#8B182B] hover:bg-[#8B182B]/10 transition-colors cursor-pointer"
              >
                <MapPin className={`w-4 h-4 ${gpsLoading ? 'animate-bounce text-emerald-600' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
                Area / Locality *
              </label>
              <input
                type="text"
                value={address.locality || ''}
                onChange={(e) => handleChange('locality', e.target.value)}
                placeholder="e.g. Connaught Place"
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
                City *
              </label>
              <input
                type="text"
                value={address.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g. New Delhi"
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
                Pincode *
              </label>
              <input
                type="text"
                value={address.pincode || ''}
                onChange={(e) => handleChange('pincode', e.target.value)}
                placeholder="e.g. 110001"
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-800 mb-1 uppercase tracking-wider text-[11px]">
                Landmark / Entry Instructions
              </label>
              <input
                type="text"
                value={address.landmark || ''}
                onChange={(e) => handleChange('landmark', e.target.value)}
                placeholder="e.g. Near Metro Gate 2"
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-[#8B182B] mb-2">
            Coverage Map Verification
          </span>

          <div className="flex-1 min-h-[180px] sm:min-h-[220px] rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#8B182B_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> Service Area Confirmed
              </span>
              <Compass className="w-5 h-5 text-[#8B182B] animate-spin" style={{ animationDuration: '12s' }} />
            </div>

            <div className="relative z-10 my-auto text-center py-4 sm:py-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8B182B]/10 border border-[#8B182B] flex items-center justify-center mx-auto mb-2 text-[#8B182B] shadow-md animate-bounce">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-xs font-bold text-slate-900 font-mono">
                {address.streetAddress ? `${address.streetAddress}, ${address.locality}` : 'Pinpoint Your Doorstep Spot'}
              </p>
              <p className="text-[10px] text-slate-500">
                {address.city ? `${address.city} ${address.pincode}` : 'Fully equipped mobile van dispatches to this location'}
              </p>
            </div>

            <div className="relative z-10 text-[10px] text-slate-500 pt-2 border-t border-slate-200 text-center font-medium">
              * Mobile units carry independent power generators & de-ionized water.
            </div>
          </div>
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
          <span>NEXT: CONTACT INFO →</span>
        </button>
      </div>
    </div>
  );
};
