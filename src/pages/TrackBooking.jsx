import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Search, Compass, CheckCircle2, Clock, MapPin, PhoneCall, UserCheck, ShieldCheck, Car, AlertCircle } from 'lucide-react';

export const TrackBooking = () => {
  const { getBookingById, bookings } = useBooking();
  const [searchId, setSearchId] = useState('GC-2026-8941');
  const [activeBooking, setActiveBooking] = useState(() => getBookingById('GC-2026-8941') || bookings[0]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = getBookingById(searchId.trim());
    if (found) {
      setActiveBooking(found);
      setErrorMessage(null);
    } else {
      setErrorMessage(`Booking ID '${searchId}' not found. Try searching 'GC-2026-8941' or check your confirmation email.`);
    }
  };

  const timelineSteps = activeBooking?.trackingTimeline || [
    { step: 'Confirmed', time: '14:30 PM', done: true, current: false },
    { step: 'Detailer Assigned', time: '14:35 PM', done: true, current: false },
    { step: 'On The Way', time: '15:10 PM', done: true, current: true },
    { step: 'Service Started', time: 'Pending', done: false, current: false },
    { step: 'Quality Check', time: 'Pending', done: false, current: false },
    { step: 'Completed', time: 'Pending', done: false, current: false }
  ];

  return (
    <>
      <SEOHead
        title="Live Booking Tracker | Mobile Unit Radar"
        description="Track your doorstep car wash mobile unit in real time."
        canonicalPath="/track"
      />

      <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#8B182B] flex items-center justify-center gap-1.5">
              <Compass className="w-4 h-4" /> Live Mobile Dispatch Radar
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900">
              Track Your Doorstep Booking
            </h1>
            <p className="text-xs text-slate-600">
              Enter your unique Booking Reference Code to monitor mobile unit dispatch, ETA, and service progress.
            </p>
          </div>

          {/* Search Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Booking ID e.g. GC-2026-8941"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs uppercase focus:outline-none focus:border-[#8B182B]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl burgundy-btn text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Track
              </button>
            </form>
            {errorMessage && (
              <p className="text-xs text-red-500 mt-2 font-mono flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errorMessage}
              </p>
            )}
          </div>

          {/* Tracking Card */}
          {activeBooking && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-8 shadow-xl">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-[#8B182B]/10 text-[#8B182B] font-bold px-2.5 py-0.5 rounded-full border border-[#8B182B]/20">
                    Active Dispatch
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 font-mono mt-1.5">{activeBooking.id}</h3>
                  <p className="text-xs text-slate-500">
                    {activeBooking.serviceName} • {activeBooking.vehicleName}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Current Status</span>
                  <span className="text-sm font-bold text-[#8B182B] font-mono flex items-center gap-1.5 justify-end">
                    <span className="w-2 h-2 rounded-full bg-[#8B182B] animate-ping" /> {activeBooking.status}
                  </span>
                </div>
              </div>

              {/* Progress Timeline Nodes */}
              <div className="py-4">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-[#8B182B] mb-6 block">
                  Service Timeline Progress
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
                  {timelineSteps.map((step, idx) => (
                    <div
                      key={step.step}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        step.current
                          ? 'bg-[#8B182B]/10 border-[#8B182B] shadow-md ring-1 ring-[#8B182B] scale-105'
                          : step.done
                          ? 'bg-slate-50 border-slate-200 text-slate-800'
                          : 'bg-slate-50/50 border-slate-100 opacity-50 text-slate-400'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold font-mono">
                        {step.done ? (
                          <CheckCircle2 className="w-5 h-5 text-[#8B182B]" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate">{step.step}</p>
                      <span className="text-[10px] text-slate-500 font-mono block mt-1">{step.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assigned Detailer & Live Map Simulation Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100">
                
                {/* Detailer Card */}
                <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-[#8B182B]" /> Assigned Mobile Unit
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                      Verified Senior Specialist
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-12 h-12 rounded-full bg-[#8B182B] p-0.5 shadow-md shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                        alt="Detailer"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{activeBooking.detailerName || 'Viktor Krum'}</p>
                      <p className="text-[11px] text-slate-500 font-mono">Unit Mobile Van #04 • Rating 4.99★</p>
                    </div>
                    <a
                      href={`tel:${activeBooking.detailerPhone || '+18009992872'}`}
                      className="px-3 py-2 rounded-xl bg-[#8B182B]/10 hover:bg-[#8B182B] text-[#8B182B] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Call
                    </a>
                  </div>
                </div>

                {/* Simulated Radar Map Preview */}
                <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <span className="flex items-center gap-1 font-mono text-[#8B182B] font-bold">
                      <MapPin className="w-3.5 h-3.5" /> Destination Doorstep:
                    </span>
                    <span className="font-mono text-emerald-700 font-bold">ETA: ~18 Mins</span>
                  </div>
                  <p className="text-xs text-slate-900 font-semibold truncate my-2">{activeBooking.address}</p>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#8B182B] to-[#A61C33] rounded-full w-2/3 animate-pulse" />
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
};
