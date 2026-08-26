import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { CarWash3DCarousel } from '../components/3d/CarWash3DCarousel';
import { VehicleSelector } from '../components/common/VehicleSelector';
import { VideoCardMedia } from '../components/common/VideoCardMedia';
import { BeforeAfterSlider } from '../components/common/BeforeAfterSlider';
import { SERVICES_DATA } from '../data/servicesData';
import { MONTHLY_PACKAGES_DATA, DAILY_PACKAGES_DATA, BIKE_PACKAGES_DATA } from '../data/packagesData';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/formatters';
import {
  CheckCircle2,
  ChevronRight,
  Wrench,
  Shield,
  Gauge,
  Flame,
  Droplets,
  Zap,
  Activity,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Clock
} from 'lucide-react';

export const Home = () => {
  const { currentVehicle, selectedVehicleId, setSelectedVehicleId, updateDraftBooking, selectServiceForBooking, selectPackageForBooking } = useBooking();
  const navigate = useNavigate();
  const [activePackageType, setActivePackageType] = useState('monthly'); // 'monthly' by default as requested
  const [serviceFilter, setServiceFilter] = useState('all');

  const is2Wheeler = currentVehicle?.id === '2wheeler' || selectedVehicleId === '2wheeler';
  const packagesList = is2Wheeler
    ? BIKE_PACKAGES_DATA
    : (activePackageType === 'monthly' ? MONTHLY_PACKAGES_DATA : DAILY_PACKAGES_DATA);

  return (
    <>
      <SEOHead
        title="Car Wash & Doorstep Car Wash Service in Delhi NCR | CARONBAR"
        description="Book the best Car Wash & Doorstep Car Wash at your home or office. 100% self-sufficient mobile units with soft water & silent generator. Book online in 60s."
        keywords="car wash, doorstep car wash, car wash near me, mobile car wash, foam car wash, car wash delhi, car interior dry cleaning, doorstep car wash service"
        canonicalPath="/"
      />

      {/* SECTION 1: HERO - DARK SLATE NAVY WITH BURGUNDY ACCENTS */}
      <section className="relative min-h-screen flex items-center justify-center overflow-x-clip px-3 sm:px-6 lg:px-12 pt-16 sm:pt-28 pb-8 sm:pb-16 bg-[#121720]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">

          {/* Left Hero Content: Title, Value Tags, Dual Equal Row Buttons */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-3 sm:space-y-6 text-left pt-2 sm:pt-0">

            {/* Micro Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-mono tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>Drive clean every day</span>
            </div>

            <h1 className="font-display font-black text-3xl min-[360px]:text-4xl sm:text-6xl xl:text-7xl italic uppercase tracking-tight text-white leading-tight">
              YOUR CAR. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-rose-300 to-white">
                OUR CARE.
              </span>
            </h1>

            <p className="font-sans text-xs sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Daily doorstep car and bike wash across Janakpuri & Delhi NCR. Starting from just <strong className="text-white">₹499/month</strong>. Service hours from <strong className="text-white">5:00 AM to 10:00 PM</strong>.
            </p>

            {/* Value Added Services Highlights: Hidden on small mobile, visible on desktop */}
            <div className="hidden sm:flex sm:flex-wrap items-center gap-2 pt-1 w-auto">
              {[
                { title: 'Doorstep Car Wash', link: '/services' },
                { title: 'Pressure Foam Wash', link: '/services' },
                { title: 'Interior Vacuum & Steam', link: '/services' },
                { title: 'Daily / Monthly Plans', link: '/packages' },
                { title: 'Bike & Scooter Wash', link: '/packages?vehicle=2wheeler' }
              ].map((vas, idx) => (
                <Link
                  key={idx}
                  to={vas.link}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 text-[11px] font-mono text-slate-300 hover:text-white text-left truncate transition-colors"
                >
                  ✓ {vas.title}
                </Link>
              ))}
            </div>

            {/* Action Buttons: 2-Column Equal Row on mobile, flex on desktop */}
            <div className="pt-2 sm:pt-3 pb-0 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Link
                to="/booking"
                onClick={() => {
                  setSelectedVehicleId('hatchback');
                  updateDraftBooking({ vehicleTypeId: 'hatchback', selectedItemId: '', step: 1 });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="burgundy-btn px-2 sm:px-8 py-3 sm:py-4 rounded-lg text-[11px] min-[360px]:text-xs sm:text-sm font-black italic tracking-wider uppercase shadow-[0_4px_20px_rgba(139,24,43,0.5)] text-center flex items-center justify-center"
              >
                <span>BOOK NOW</span>
              </Link>
              <a
                href="https://wa.me/918750919105?text=Hello%20CarOBar,%20I%20want%20to%20book%20a%20doorstep%20wash"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-5 py-3 sm:py-3.5 rounded-lg text-[11px] min-[360px]:text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 transition-all text-center"
              >
                <span>WHATSAPP</span>
                <span className="hidden min-[480px]:inline">: 8750919105</span>
              </a>
            </div>

          </div>

          {/* Right Visual Hero Carousel: 3D interactive car carousel */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative flex items-center justify-center py-2 sm:py-6">
            <div className="w-full max-w-lg mx-auto">
              <CarWash3DCarousel />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: WHAT WE DO - BEFORE & AFTER TRANSFORMATIONS (SHADE 1: CLEAN CRISP WHITE / LIGHT SLATE) */}
      <section className="py-8 sm:py-24 px-3 sm:px-6 lg:px-12 bg-[#F8FAFC] border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto space-y-5 sm:space-y-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white border border-slate-200 text-[#8B182B] text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm mb-1.5 sm:mb-2">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B182B]" /> See The Transformation
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl italic text-[#0F172A] uppercase tracking-wider">
                WHAT WE DO
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Drag the interactive slider below to see how our doorstep wash transforms dirty cars into spotless shine.
              </p>
            </div>
            <Link
              to="/booking"
              onClick={() => {
                setSelectedVehicleId('hatchback');
                updateDraftBooking({ vehicleTypeId: 'hatchback', selectedItemId: '', step: 1 });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden sm:flex font-display font-extrabold italic text-xs text-[#8B182B] hover:text-[#A61C33] items-center gap-1 uppercase tracking-wider font-bold shrink-0"
            >
              BOOK YOUR WASH <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Before & After Slider */}
          <div className="pt-0 sm:pt-2">
            <BeforeAfterSlider />
          </div>

        </div>
      </section>

      {/* SECTION 2: VALUE ADDED SERVICES (SHADE 2: DISTINCT SOFT COOL ICE-SLATE TINT) */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-12 px-3 sm:px-6 lg:px-12 bg-[#EEF4FA] border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-9 relative z-10">

          {/* Section Header */}
          <div>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1 sm:py-1.5 rounded-full bg-white border border-rose-200/80 text-[#8B182B] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B182B]" /> Wash & Care Solutions
            </span>
            <h3 className="font-display font-black text-xl sm:text-4xl italic text-slate-900 uppercase tracking-wider mt-2 sm:mt-2.5">
              DOORSTEP WASH & VEHICLE CARE
            </h3>
            <p className="text-[11px] sm:text-sm text-slate-600 max-w-2xl mt-1 hidden min-[360px]:block">
              From doorstep car and bike washing to interior steam sanitization, heavy underbody wash, and monthly subscriptions across Janakpuri & Delhi NCR.
            </p>
          </div>

          {/* 6 Value Added Service Cards: 3 Columns x 2 Rows on Mobile (300px+), 2/3 Cols on Desktop */}
          <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">

            {/* 1: Doorstep Bike & Scooter Wash */}
            <Link
              to="/packages?vehicle=2wheeler"
              className="bg-white border border-slate-200 hover:border-[#8B182B]/40 hover:shadow-xl rounded-xl sm:rounded-2xl p-2.5 sm:p-6 space-y-1.5 sm:space-y-3.5 shadow-xs sm:shadow-sm transition-all duration-300 group flex flex-col items-center sm:items-start text-center sm:text-left justify-between"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-base sm:text-2xl shrink-0">
                🏍️
              </div>
              <h4 className="font-display font-black text-[11px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight">
                <span className="sm:hidden">Bike & Scooter Wash</span>
                <span className="hidden sm:inline">Bike & Scooter Care</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                20x water wash visits + 1x deep snow foam wash, chain degreasing & Teflon lubrication for all two-wheelers.
              </p>
              <div className="pt-2 hidden sm:block">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B182B] group-hover:underline">
                  <span>View Monthly Package (₹399)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            {/* 2: High-Pressure Foam Wash */}
            <div
              onClick={() => {
                selectServiceForBooking('express-wash');
                navigate('/booking');
              }}
              className="bg-white border border-slate-200 hover:border-[#8B182B]/40 hover:shadow-xl rounded-xl sm:rounded-2xl p-2.5 sm:p-6 space-y-1.5 sm:space-y-3.5 shadow-xs sm:shadow-sm transition-all duration-300 group flex flex-col items-center sm:items-start text-center sm:text-left justify-between cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-base sm:text-2xl shrink-0">
                🚿
              </div>
              <h4 className="font-display font-black text-[11px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight">
                <span className="sm:hidden">Pressure Foam Wash</span>
                <span className="hidden sm:inline">High-Pressure Foam Wash</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                De-ionized soft water pressure rinse, thick pH-neutral foam wash, wheel de-griming, and scratch-free microfiber drying.
              </p>
              <div className="pt-2 hidden sm:block">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B182B] group-hover:underline">
                  <span>Book Foam Wash</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 3: Underbody Mud & Grime Wash */}
            <div
              onClick={() => {
                selectServiceForBooking('underbody-wash');
                navigate('/booking');
              }}
              className="bg-white border border-slate-200 hover:border-[#8B182B]/40 hover:shadow-xl rounded-xl sm:rounded-2xl p-2.5 sm:p-6 space-y-1.5 sm:space-y-3.5 shadow-xs sm:shadow-sm transition-all duration-300 group flex flex-col items-center sm:items-start text-center sm:text-left justify-between cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-base sm:text-2xl shrink-0">
                🌊
              </div>
              <h4 className="font-display font-black text-[11px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight">
                <span className="sm:hidden">Underbody Wash</span>
                <span className="hidden sm:inline">Heavy Underbody Chassis Wash</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                High-pressure soft water mud blasting under the chassis and wheel arches to prevent rust, corrosion, and grime buildup.
              </p>
              <div className="pt-2 hidden sm:block">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B182B] group-hover:underline">
                  <span>Book Underbody Wash</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 4: Tyre & Alloy Wheel Deep Wash -> Full Body Wash */}
            <div
              onClick={() => {
                selectServiceForBooking('complete-wash');
                navigate('/booking');
              }}
              className="bg-white border border-slate-200 hover:border-[#8B182B]/40 hover:shadow-xl rounded-xl sm:rounded-2xl p-2.5 sm:p-6 space-y-1.5 sm:space-y-3.5 shadow-xs sm:shadow-sm transition-all duration-300 group flex flex-col items-center sm:items-start text-center sm:text-left justify-between cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-base sm:text-2xl shrink-0">
                🛞
              </div>
              <h4 className="font-display font-black text-[11px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight">
                <span className="sm:hidden">Tyre & Alloy Wash</span>
                <span className="hidden sm:inline">Tyre & Alloy Deep Wheel Wash</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                Iron decontamination, deep brake-dust removal, alloy wheel scrub, and long-lasting wet-look gloss tyre dressing.
              </p>
              <div className="pt-2 hidden sm:block">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B182B] group-hover:underline">
                  <span>Book Full Body Wash</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 5: Interior Deep Steam Clean */}
            <div
              onClick={() => {
                selectServiceForBooking('interior-steam');
                navigate('/booking');
              }}
              className="bg-white border border-slate-200 hover:border-[#8B182B]/40 hover:shadow-xl rounded-xl sm:rounded-2xl p-2.5 sm:p-6 space-y-1.5 sm:space-y-3.5 shadow-xs sm:shadow-sm transition-all duration-300 group flex flex-col items-center sm:items-start text-center sm:text-left justify-between cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-base sm:text-2xl shrink-0">
                ✨
              </div>
              <h4 className="font-display font-black text-[11px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight">
                <span className="sm:hidden">Interior Steam Clean</span>
                <span className="hidden sm:inline">Interior Steam & Vacuum Clean</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                160°C dry steam seat & carpet stain removal, AC vent antibacterial disinfection, dashboard UV polish, and complete vacuuming.
              </p>
              <div className="pt-2 hidden sm:block">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B182B] group-hover:underline">
                  <span>Book Steam Clean</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* 6: Monthly Doorstep Subscription */}
            <Link
              to="/packages"
              className="bg-white border border-slate-200 hover:border-[#8B182B]/40 hover:shadow-xl rounded-xl sm:rounded-2xl p-2.5 sm:p-6 space-y-1.5 sm:space-y-3.5 shadow-xs sm:shadow-sm transition-all duration-300 group flex flex-col items-center sm:items-start text-center sm:text-left justify-between"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-base sm:text-2xl shrink-0">
                📅
              </div>
              <h4 className="font-display font-black text-[11px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase group-hover:text-[#8B182B] transition-colors leading-tight">
                <span className="sm:hidden">Monthly Wash Plans</span>
                <span className="hidden sm:inline">Monthly Doorstep Wash Plans</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed hidden sm:block">
                Daily morning doorstep dry wipe, weekly pressure foam washes, and bi-weekly vacuuming starting from just ₹499/month.
              </p>
              <div className="pt-2 hidden sm:block">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B182B] group-hover:underline">
                  <span>View Monthly Packages</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* SECTION 3: ALL-IN-ONE PACKAGES (SHADE 3: SOFT LIGHT WHITE-GRAY MIXTURE) */}
      <section className="pt-10 sm:pt-14 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-12 bg-[#F1F5F9] border-b border-slate-200 relative" id="packages">
        <div className="max-w-7xl mx-auto space-y-7 sm:space-y-9 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display font-black text-2xl sm:text-4xl italic text-[#0F172A] uppercase tracking-wider">
              {is2Wheeler ? '2-WHEELER MONTHLY CARE' : 'ALL-INCLUSIVE PACKAGES'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {is2Wheeler
                ? 'Monthly subscription: 20 water washes + 1 deep snow foam clean.'
                : 'Doorstep cleaning and maintenance bundles customized for your vehicle.'}
            </p>
          </div>

          {/* Interactive Vehicle Selector on Packages Section */}
          <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-2 sm:p-6 max-w-4xl mx-auto shadow-xs sm:shadow-sm">
            <VehicleSelector />
          </div>

          {/* SMOOTH MONTHLY / DAILY TOGGLE SWITCH BUTTON: HIDDEN FOR 2-WHEELER */}
          {!is2Wheeler && (
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center bg-slate-200/70 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-300/70 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActivePackageType('monthly')}
                  className={`px-3 min-[360px]:px-4 sm:px-9 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] min-[360px]:text-xs sm:text-sm font-display font-black uppercase tracking-wider transition-all duration-300 ease-in-out cursor-pointer ${
                    activePackageType === 'monthly'
                      ? 'bg-[#8B182B] text-white shadow-md scale-[1.02]'
                      : 'bg-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-300/40'
                  }`}
                >
                  Monthly Packages
                </button>
                <button
                  type="button"
                  onClick={() => setActivePackageType('daily')}
                  className={`px-3 min-[360px]:px-4 sm:px-9 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] min-[360px]:text-xs sm:text-sm font-display font-black uppercase tracking-wider transition-all duration-300 ease-in-out cursor-pointer ${
                    activePackageType === 'daily'
                      ? 'bg-[#8B182B] text-white shadow-md scale-[1.02]'
                      : 'bg-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-300/40'
                  }`}
                >
                  Daily / One-Time
                </button>
              </div>
            </div>
          )}

          {/* Packages Grid: 1-Column centered for 2-Wheeler (399 Monthly), 4-Column on Desktop for Car Monthly / 3-Column for Car Daily */}
          <div className={`grid ${is2Wheeler ? 'grid-cols-1 max-w-lg mx-auto' : activePackageType === 'monthly' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'} gap-2.5 sm:gap-5 max-w-7xl mx-auto items-stretch`}>
            {packagesList.map((pkg) => {
              const price = (pkg.prices && pkg.prices[currentVehicle.id]) || Math.round(pkg.basePrice * currentVehicle.multiplier);
              const originalPrice = Math.round((pkg.originalBasePrice || pkg.basePrice * 1.25) * currentVehicle.multiplier);

              return (
                <div
                  key={pkg.id}
                  className={`group rounded-xl sm:rounded-2xl p-2.5 min-[360px]:p-3.5 sm:p-6 transition-all duration-300 ease-out flex flex-col justify-between relative h-full hover:-translate-y-2.5 hover:shadow-2xl cursor-pointer ${pkg.popular || is2Wheeler
                    ? 'bg-white border-2 border-[#8B182B] shadow-xl hover:border-[#A61C33] hover:ring-2 hover:ring-[#8B182B]/20'
                    : 'bg-white border border-slate-200 hover:border-[#8B182B] shadow-sm'
                    }`}
                >
                  <div className="flex flex-col flex-1">
                    {(pkg.popular || is2Wheeler) && (
                      <span className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-2 sm:px-4 py-0.5 sm:py-1 rounded-full bg-[#8B182B] text-white shadow-md z-10 whitespace-nowrap group-hover:bg-[#A61C33] transition-colors">
                        {pkg.badge || (is2Wheeler ? (activePackageType === 'monthly' ? '1 MONTH BIKE CARE' : 'SINGLE BIKE WASH') : 'POPULAR')}
                      </span>
                    )}

                    <div className="mb-2 sm:mb-3">
                      <h3 className="font-display font-black text-xs min-[360px]:text-sm sm:text-xl text-slate-900 uppercase min-h-0 sm:min-h-[36px] flex items-center leading-tight sm:leading-snug group-hover:text-[#8B182B] transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="font-sans text-[9px] min-[360px]:text-[10px] sm:text-xs text-slate-500 leading-tight sm:leading-relaxed min-h-0 sm:min-h-[36px] flex items-center mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Price Container */}
                    <div className="p-1.5 min-[360px]:p-2 sm:p-3.5 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 mb-2 sm:mb-5 flex flex-col justify-between group-hover:bg-rose-50/30 transition-colors gap-0.5 sm:gap-2">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap">
                          <span className="text-sm min-[360px]:text-base sm:text-2xl lg:text-2xl xl:text-3xl font-black font-mono text-[#8B182B] whitespace-nowrap">
                            {formatCurrency(price)}
                          </span>
                          <span className="text-[8px] min-[360px]:text-[9.5px] sm:text-xs text-slate-400 font-mono line-through whitespace-nowrap">
                            {formatCurrency(originalPrice)}
                          </span>
                          <span className="hidden sm:inline lg:hidden text-xs text-slate-500 font-mono">
                            {pkg.period}
                          </span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[6.5px] min-[360px]:text-[7.5px] sm:text-[9.5px] font-bold font-mono px-1 min-[360px]:px-1.5 py-0.5 rounded-full uppercase shrink-0 -translate-y-0.5 sm:translate-y-0">
                          {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                        </span>
                      </div>
                      {/* Day count: hidden on mobile, visible on desktop */}
                      <span className="hidden sm:flex text-[9px] sm:text-[10.5px] text-slate-500 items-center gap-1 font-mono pt-1 sm:pt-1.5 border-t border-slate-200/70">
                        <Clock className="w-3 h-3 text-[#8B182B] shrink-0" /> {pkg.duration ? pkg.duration.replace(/hours?/gi, 'hr').replace(/minutes?|mins?/gi, 'min') : '30 Days Care'}
                      </span>
                    </div>

                    <ul className="space-y-1 sm:space-y-2.5 mb-3 sm:mb-6 text-[9px] min-[360px]:text-[10px] sm:text-xs text-slate-700 flex-1">
                      {pkg.servicesIncluded.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1 sm:gap-2">
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight sm:leading-snug text-slate-700 font-medium">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (activePackageType === 'monthly' || is2Wheeler) {
                        selectPackageForBooking(pkg.id);
                        navigate('/booking');
                      } else {
                        selectServiceForBooking(pkg.serviceId || pkg.id);
                        navigate('/booking');
                      }
                    }}
                    className="burgundy-btn block w-full py-2 sm:py-3 text-center text-[10px] sm:text-xs font-black rounded-lg sm:rounded-xl uppercase tracking-wider mt-auto shadow-md group-hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <span>BOOK {pkg.name.toUpperCase()}</span>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 7: FINAL LUXURY BURGUNDY & SLATE CTA BANNER WITH SLOGAN: MORE THAN A WASH. */}
      <section className="py-10 sm:py-24 px-3 sm:px-4 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,_#7F1728_0%,_#3E0A13_55%,_#121720_100%)] text-center relative overflow-hidden text-white shadow-2xl border-t border-slate-800">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-6 relative z-10">
          <h2 className="font-display font-black text-3xl min-[360px]:text-4xl sm:text-7xl italic uppercase tracking-wider leading-tight text-white drop-shadow-md">
            MORE THAN <br />
            <span className="text-[#F1F5F9] drop-shadow-md">A WASH.</span>
          </h2>
          <p className="font-sans text-xs sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
            Professional doorstep vehicle pampering, precision foam washing, and hot steam interior hygiene delivered right to your home across Janakpuri & Delhi NCR.
          </p>
          <div className="pt-1.5 sm:pt-3">
            <Link
              to="/booking"
              onClick={() => {
                setSelectedVehicleId('hatchback');
                updateDraftBooking({ vehicleTypeId: 'hatchback', selectedItemId: '', step: 1 });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-7 sm:px-10 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-display font-black italic uppercase tracking-wider bg-white text-[#8B182B] hover:bg-slate-100 shadow-2xl hover:scale-105 transition-all"
            >
              <span>BOOK NOW →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
