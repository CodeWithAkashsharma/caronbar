import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import confetti from 'canvas-confetti';
import { CheckCircle2, QrCode, Printer, MapPin, Calendar, Clock, Car, Compass, ArrowRight, Home, ShieldCheck } from 'lucide-react';

export const BookingConfirmation = () => {
  const { id } = useParams();
  const { getBookingById } = useBooking();

  const booking = getBookingById(id || '') || {
    id: id || 'GC-2026-8941',
    customerName: 'Marcus Vance',
    serviceName: 'Signature Restoration Package',
    vehicleName: '2024 Porsche Cayenne Coupe',
    vehicleNumber: 'WAP-992-GT',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM - 01:00 PM',
    address: '842 Ridgecrest Blvd, Beverly Hills, CA 90210',
    totalAmount: 348.60,
    paymentMethod: 'UPI / Pay After Service',
    paymentStatus: 'Confirmed'
  };

  useEffect(() => {
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B182B', '#A61C33', '#0F172A', '#E2E8F0']
      });
    } catch (e) {
      // Fallback silent
    }
  }, []);

  return (
    <>
      <SEOHead
        title={`Booking Confirmed | ${booking.id}`}
        description="Your luxury doorstep car wash reservation has been confirmed."
      />

      <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Success Badge */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#8B182B] font-bold bg-[#8B182B]/10 px-3 py-1 rounded-full border border-[#8B182B]/20">
              Reservation Confirmed
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
              Thank You, {booking.customerName.split(' ')[0]}!
            </h1>
            <p className="text-xs text-slate-600">
              Your doorstep mobile car wash unit has been scheduled.
            </p>
          </div>

          {/* Main Receipt Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Booking ID Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Booking Reference ID:</span>
                <span className="text-2xl font-bold font-mono text-[#8B182B] tracking-wider">
                  {booking.id}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Payment Method:</span>
                <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {booking.paymentMethod} • {booking.paymentStatus}
                </span>
              </div>
            </div>

            {/* Service & Spec Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5 text-[10px] uppercase font-mono font-medium">
                  <Car className="w-3.5 h-3.5 text-[#8B182B]" /> Service & Vehicle
                </span>
                <p className="font-bold text-slate-900 text-sm">{booking.serviceName}</p>
                <p className="text-[11px] text-[#8B182B] font-mono font-bold">
                  {booking.vehicleName} ({booking.vehicleNumber})
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                <span className="text-slate-500 flex items-center gap-1.5 text-[10px] uppercase font-mono font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#8B182B]" /> Scheduled Time
                </span>
                <p className="font-bold text-slate-900 text-sm">{formatDate(booking.date)}</p>
                <p className="text-[11px] text-[#8B182B] font-mono font-bold">{booking.timeSlot}</p>
              </div>

            </div>

            {/* Address */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
              <span className="text-slate-500 flex items-center gap-1.5 text-[10px] uppercase font-mono font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#8B182B]" /> Doorstep Location
              </span>
              <p className="font-bold text-slate-900 leading-relaxed">{booking.address}</p>
            </div>

            {/* Total Amount & QR code Verification */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-slate-50 border border-slate-200 p-1.5 rounded-xl shrink-0 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-800" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Detailer Entry Pass</p>
                  <p className="text-[10px] text-slate-500">Scan code upon mobile unit arrival</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Total Investment:</span>
                <span className="text-2xl font-bold font-mono text-[#8B182B]">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/track-booking"
              className="py-3.5 px-4 rounded-xl burgundy-btn text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-all text-center flex items-center justify-center gap-1.5"
            >
              <Compass className="w-4 h-4" /> Track Mobile Unit →
            </Link>
            
            <Link
              to="/dashboard"
              className="py-3.5 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs border border-slate-200 text-center"
            >
              User Dashboard
            </Link>

            <button
              onClick={() => window.print()}
              className="py-3.5 px-4 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Receipt
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
