import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { useBooking } from '../context/BookingContext';
import { Phone, Mail, MapPin, Clock, CheckCircle2, X } from 'lucide-react';

export const Contact = () => {
  const { addQuery } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    serviceCategory: 'Express Hydro Foam Car Wash',
    message: ''
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setValidationError('Please fill in all mandatory fields (Name, Phone Number, and Message/Note).');
      return;
    }

    setValidationError('');

    addQuery({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      carModel: formData.carModel.trim() || 'Not Specified',
      serviceCategory: formData.serviceCategory,
      message: formData.message.trim()
    });

    // Reset form & show smooth 3-second popup
    setFormData({ name: '', phone: '', carModel: '', serviceCategory: 'Express Hydro Foam Car Wash', message: '' });
    setShowSuccessPopup(true);
  };

  // Auto-close popup modal after 3 seconds
  useEffect(() => {
    let timer;
    if (showSuccessPopup) {
      timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessPopup]);

  return (
    <>
      <SEOHead
        title="Submit Your Query | CARONBAR Doorstep Car Wash Delhi NCR"
        description="Submit your car wash query or booking inquiry to CARONBAR. Reach out for subscriptions, customized vehicle cleaning, and customer support."
        keywords="submit query car wash, contact car wash, book doorstep car wash, car wash phone number, doorstep car wash delhi contact, car wash inquiry"
        canonicalPath="/contact"
      />

      <div className="pt-20 sm:pt-32 pb-10 sm:pb-20 bg-[#F8FAFC] min-h-screen text-slate-800 relative">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-12 relative z-10">

          {/* Header */}
          <div className="space-y-1 sm:space-y-3 text-center max-w-3xl mx-auto">
            {/* Top Badge: Hidden on mobile */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#8B182B] text-xs font-mono font-bold uppercase tracking-wider">
              <Phone className="w-3.5 h-3.5 text-[#8B182B]" /> We are here to help
            </span>
            <h1 className="font-display font-black text-2xl min-[360px]:text-3xl sm:text-5xl italic uppercase text-slate-900 tracking-wider whitespace-nowrap">
              SUBMIT YOUR QUERY
            </h1>
            {/* Precise Subheading in 2 lines with tight line height */}
            <p className="font-sans text-[10.5px] min-[360px]:text-xs sm:text-sm text-slate-600 leading-tight sm:leading-relaxed max-w-[280px] min-[360px]:max-w-xs sm:max-w-xl mx-auto">
              Have questions about packages, pricing, or custom care? Submit your query below or reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">

            {/* Direct Contact Column: 2x2 Grid on Small Mobile, Stack on Desktop */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-xl sm:rounded-3xl p-2 sm:p-8 space-y-2 sm:space-y-5 shadow-xs sm:shadow-sm">
                <h3 className="font-display font-black text-xs min-[360px]:text-sm sm:text-xl text-slate-900 uppercase">
                  Direct Contact
                </h3>

                {/* 2x2 Grid on Mobile, vertical stack on Desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-4 text-xs font-sans text-slate-700">
                  {/* Item 1: Phone */}
                  <div className="p-1.5 sm:p-0 rounded-lg sm:rounded-xl bg-slate-50/90 sm:bg-transparent border border-slate-100 sm:border-0 flex items-center gap-1.5 sm:gap-3.5">
                    <div className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8B182B] shrink-0">
                      <Phone className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0 max-w-full flex-1">
                      <p className="font-bold text-slate-500 sm:text-slate-900 uppercase text-[7px] min-[360px]:text-[8px] sm:text-[11px] truncate">Phone</p>
                      <a href="tel:8750919105" className="font-mono text-[#8B182B] text-[8.5px] min-[360px]:text-[9.5px] sm:text-sm font-bold block truncate hover:underline">+91 87509 19105</a>
                    </div>
                  </div>

                  {/* Item 2: Email */}
                  <div className="p-1.5 sm:p-0 rounded-lg sm:rounded-xl bg-slate-50/90 sm:bg-transparent border border-slate-100 sm:border-0 flex items-center gap-1.5 sm:gap-3.5">
                    <div className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8B182B] shrink-0">
                      <Mail className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0 max-w-full flex-1">
                      <p className="font-bold text-slate-500 sm:text-slate-900 uppercase text-[7px] min-[360px]:text-[8px] sm:text-[11px] truncate">Email</p>
                      <a href="mailto:Carobar174@gmail.com" className="font-mono text-[8.5px] min-[360px]:text-[9.5px] sm:text-sm font-semibold text-slate-800 block truncate hover:underline">Carobar174@gmail.com</a>
                    </div>
                  </div>

                  {/* Item 3: Service Area */}
                  <div className="p-1.5 sm:p-0 rounded-lg sm:rounded-xl bg-slate-50/90 sm:bg-transparent border border-slate-100 sm:border-0 flex items-center gap-1.5 sm:gap-3.5">
                    <div className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8B182B] shrink-0">
                      <MapPin className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0 max-w-full flex-1">
                      <p className="font-bold text-slate-500 sm:text-slate-900 uppercase text-[7px] min-[360px]:text-[8px] sm:text-[11px] truncate">Area</p>
                      <p className="text-[8.5px] min-[360px]:text-[9.5px] sm:text-sm text-slate-800 font-medium truncate">Janakpuri & NCR</p>
                    </div>
                  </div>

                  {/* Item 4: Working Hours */}
                  <div className="p-1.5 sm:p-0 rounded-lg sm:rounded-xl bg-slate-50/90 sm:bg-transparent border border-slate-100 sm:border-0 flex items-center gap-1.5 sm:gap-3.5">
                    <div className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 sm:w-10 sm:h-10 rounded-md sm:rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8B182B] shrink-0">
                      <Clock className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0 max-w-full flex-1">
                      <p className="font-bold text-slate-500 sm:text-slate-900 uppercase text-[7px] min-[360px]:text-[8px] sm:text-[11px] truncate">Hours</p>
                      <p className="text-[8.5px] min-[360px]:text-[9.5px] sm:text-sm text-slate-800 font-medium truncate">5 AM – 10 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 space-y-3 sm:space-y-4 shadow-xs sm:shadow-sm">
              <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                <h3 className="font-display font-black text-sm min-[360px]:text-base sm:text-xl text-slate-900 uppercase">
                  Send a Message
                </h3>
                {/* Scaled-down small green badge */}
                <span className="inline-flex items-center gap-1 px-2 min-[360px]:px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[8px] min-[360px]:text-[9px] sm:text-xs font-mono font-bold w-fit">
                  ⚡ Reply &lt; 2 Hrs
                </span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-2.5 sm:space-y-4 text-xs font-sans">
                <div>
                  <label className="block font-semibold text-slate-800 mb-0.5 sm:mb-1 uppercase tracking-wider text-[9px] min-[360px]:text-[10px] sm:text-[11px]">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohan Kapoor"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#8B182B]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-0.5 sm:mb-1 uppercase tracking-wider text-[9px] min-[360px]:text-[10px] sm:text-[11px]">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#8B182B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-0.5 sm:mb-1 uppercase tracking-wider text-[9px] min-[360px]:text-[10px] sm:text-[11px]">Car Model <span className="text-slate-500 text-[8.5px] font-normal lowercase">(opt)</span></label>
                    <input
                      type="text"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      placeholder="e.g. Creta / Swift"
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#8B182B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-0.5 sm:mb-1 uppercase tracking-wider text-[9px] min-[360px]:text-[10px] sm:text-[11px]">Service Interested In *</label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full max-w-full truncate px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#8B182B] cursor-pointer"
                    required
                  >
                    <option value="Express Hydro Foam Car Wash">Express Hydro Foam Car Wash</option>
                    <option value="Full Exterior & Interior Car Wash">Full Exterior & Interior Car Wash</option>
                    <option value="Underbody & Mud Pressure Wash">Underbody & Mud High Pressure Wash</option>
                    <option value="Full Body Car Wash & Polish Combo">Full Body Car Wash & Polishing Combo</option>
                    <option value="Monthly Car Wash Subscription">Monthly Doorstep Car Wash Subscription</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-0.5 sm:mb-1 uppercase tracking-wider text-[9px] min-[360px]:text-[10px] sm:text-[11px]">Message / Note *</label>
                  <textarea
                    rows={2.5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Preferred doorstep address or details..."
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#8B182B]"
                    required
                  />
                </div>

                {validationError && (
                  <div className="p-2.5 rounded-lg bg-red-500/15 border border-red-500/40 text-xs text-red-700 font-bold font-sans">
                    ⚠️ {validationError}
                  </div>
                )}

                <button
                  type="submit"
                  className="burgundy-btn w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg text-xs font-black cursor-pointer shadow-md"
                >
                  <span>SUBMIT INQUIRY</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

      {/* POPUP MODAL: SUBMITTED SUCCESS (AUTOCLOSES IN 3 SECONDS) */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 text-center space-y-4 shadow-2xl">

            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-800 p-1 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans">Query Submitted!</h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Thank you for contacting CARONBAR. Our desk will contact you shortly.
              </p>
            </div>

            <div className="pt-1 sm:pt-2">
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full animate-[shrink_3s_linear_forwards]"></div>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-1.5">Auto closing in 3 seconds...</p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
