import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { SERVICES_DATA } from '../data/servicesData';
import { VEHICLE_TYPES } from '../data/vehicleTypes';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/formatters';
import { Clock, CheckCircle2, ShieldCheck, ArrowLeft, CalendarCheck, Sparkles } from 'lucide-react';

export const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { selectServiceForBooking, currentVehicle } = useBooking();

  const service = SERVICES_DATA.find((s) => s.slug === slug || s.id === slug) || SERVICES_DATA[0];

  const handleBookNow = () => {
    selectServiceForBooking(service.slug);
    navigate('/booking');
  };

  return (
    <>
      <SEOHead
        title={`${service.name} | Service Specifications`}
        description={service.fullDescription}
      />

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-[#F8FAFC] min-h-screen text-slate-800">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
          
          {/* Back Button */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#8B182B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Full Service Catalog
          </Link>

          {/* Hero Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Image */}
            <div className="lg:col-span-6 relative h-56 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[10px] sm:text-xs font-mono uppercase bg-[#8B182B] text-white font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
                {service.category} Care
              </span>
            </div>

            {/* Title & Quick Info */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#8B182B] font-mono font-semibold">
                <Clock className="w-4 h-4 shrink-0" /> Estimated Duration: {service.duration}
              </div>

              <h1 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 leading-snug">
                {service.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="p-4 rounded-2xl bg-white border-2 border-[#8B182B] shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">
                    Base Investment for {currentVehicle.name.split('/')[0]}:
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[#8B182B]">
                    {formatCurrency((service.prices && (service.prices[currentVehicle.id] ?? service.prices['hatchback-sedan'])) ?? Math.round(service.basePrice * (currentVehicle?.multiplier || 1)))}
                  </span>
                </div>
                <button
                  onClick={handleBookNow}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl burgundy-btn font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" /> Book Doorstep Service
                </button>
              </div>
            </div>

          </div>

          {/* Procedure & Vehicle Matrix Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Procedure Steps */}
            <div className="lg:col-span-7 p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B182B]" /> Execution Procedure Protocol
              </h3>
              
              <div className="space-y-3 sm:space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {service.procedure.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 sm:gap-4 relative">
                    <div className="w-7 h-7 rounded-full bg-[#8B182B] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-md z-10">
                      {idx + 1}
                    </div>
                    <div className="pt-1">
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Pricing Matrix Table */}
            <div className="lg:col-span-5 p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-900">
                Vehicle Spec Pricing Matrix
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculated automatically based on vehicle body surface area and clear coat condition.
              </p>

              <div className="space-y-2 pt-1 sm:pt-2">
                {VEHICLE_TYPES.map((v) => {
                  const calculated = (service.prices && (service.prices[v.id] ?? service.prices['hatchback-sedan'])) ?? Math.round(service.basePrice * v.multiplier);
                  const isCurrent = currentVehicle.id === v.id;

                  return (
                    <div
                      key={v.id}
                      className={`p-2.5 sm:p-3 rounded-xl flex items-center justify-between text-xs transition-colors ${
                        isCurrent
                          ? 'bg-[#8B182B]/10 border border-[#8B182B] text-[#8B182B] font-bold'
                          : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] sm:text-xs">{v.name}</span>
                        {isCurrent && (
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#8B182B] text-white font-bold">
                            Selected
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs sm:text-sm text-[#8B182B] font-bold">{formatCurrency(calculated)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};
