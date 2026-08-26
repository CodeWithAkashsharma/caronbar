import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { SEOHead } from '../components/common/SEOHead';
import { Award, ShieldCheck, Users, Sparkles, Check, ChevronRight, Zap } from 'lucide-react';

const AutoplayVideo = ({ src, fallbacks = [], poster, className = '' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented immediate playback; poster remains visible
        });
      }
    };

    tryPlay();
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      className={className}
    >
      <source src={src} type="video/mp4" />
      {fallbacks.map((fb, idx) => (
        <source key={idx} src={fb} type="video/mp4" />
      ))}
      Your browser does not support the video tag.
    </video>
  );
};

export const About = () => {
  const { setSelectedVehicleId, updateDraftBooking } = useBooking();
  return (
    <>
      <SEOHead
        title="About Us | Professional Doorstep Car Wash & Car Care - CARONBAR"
        description="Learn how CARONBAR delivers high-pressure foam car wash, steam sanitization, and mobile car cleaning straight to your doorstep across Janakpuri & Delhi NCR."
        keywords="about car wash, doorstep car wash company, mobile car wash delhi, car wash janakpuri, doorstep car wash story"
        canonicalPath="/about"
      />

      <div className="pt-20 sm:pt-32 pb-10 sm:pb-20 bg-[#F8FAFC] min-h-screen text-slate-800 relative">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-14 relative z-10">

          {/* Header */}
          <div className="space-y-1 sm:space-y-3 text-center max-w-3xl mx-auto">
            {/* Top Badge: Hidden on mobile */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#8B182B] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#8B182B]" /> Our Story & Promise
            </span>
            {/* Single Line Heading */}
            <h1 className="font-display font-black text-2xl min-[360px]:text-3xl sm:text-5xl italic uppercase text-slate-900 tracking-wider whitespace-nowrap">
              About CarOnBar
            </h1>
            {/* Precise Subheading fitting in ~4 lines on mobile */}
            <p className="font-sans text-[10.5px] min-[360px]:text-xs sm:text-sm text-slate-600 leading-snug sm:leading-relaxed max-w-[290px] min-[360px]:max-w-xs sm:max-w-2xl mx-auto">
              Founded in Janakpuri by <strong className="text-slate-900 font-bold">Naresh Gaur</strong>, <strong className="text-[#8B182B]">CarOnBar</strong> brings professional high-pressure foam washing, steam sanitization, and doorstep car care straight to your home with zero hassle.
            </p>
          </div>

          {/* UNIQUE CURVED & SCULPTED 3-ITEM SHOWCASE: 2 VIDEOS + 1 2-WHEELER PHOTO */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-6 items-stretch max-w-6xl mx-auto my-3 sm:my-8">

            {/* DESKTOP ONLY: Featured Video 1 - Car Foam Wash (Left 7 cols on Desktop) */}
            <div className="hidden lg:block lg:col-span-7 relative group">
              <div className="relative overflow-hidden rounded-[44px] rounded-tr-[90px] rounded-bl-[90px] border-4 border-white shadow-xl bg-slate-900 aspect-[16/10] h-full">
                <AutoplayVideo
                  src="/videos/car_foam_video.mp4"
                  fallbacks={['/videos/video1.mp4']}
                  poster="/carousel/slide1_creta_foam.webp"
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-5 left-7 px-3.5 py-1.5 rounded-full bg-[#161D27]/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold border border-white/10 shadow-md truncate pointer-events-none">
                  🧼 4-Wheeler Foam Bath Video
                </span>
              </div>
            </div>

            {/* MOBILE ONLY: 2-Wheeler Photo (Top Left Column on mobile) */}
            <div className="col-span-1 lg:hidden relative group">
              <div className="relative overflow-hidden rounded-2xl border-2 border-white shadow-md bg-slate-900 aspect-[4/3] h-full">
                <img
                  src="/vehicles/two_wheeler_wash1.webp"
                  alt="2-Wheeler Foam Wash Care"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#161D27]/90 backdrop-blur-sm text-white text-[7.5px] min-[360px]:text-[8.5px] font-mono font-bold truncate max-w-[90%] pointer-events-none">
                  🏍️ 2-Wheeler Wash
                </span>
              </div>
            </div>

            {/* MOBILE ONLY: 2-Wheeler Video 2 (Top Right Column on mobile) */}
            <div className="col-span-1 lg:hidden relative group">
              <div className="relative overflow-hidden rounded-2xl border-2 border-white shadow-md bg-slate-900 aspect-[4/3] h-full">
                <AutoplayVideo
                  src="/videos/two_wheeler_video.mp4"
                  fallbacks={['/videos/VIDEO2.mp4', '/videos/video2.mp4']}
                  poster="/vehicles/two_wheeler_wash2.webp"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#161D27]/90 backdrop-blur-sm text-white text-[7.5px] min-[360px]:text-[8.5px] font-mono font-bold truncate max-w-[90%] pointer-events-none">
                  🏍️ 2-Wheeler Video
                </span>
              </div>
            </div>

            {/* MOBILE ONLY: Full Width Featured Video 1 (Bottom Row on mobile) */}
            <div className="col-span-2 lg:hidden relative group">
              <div className="relative overflow-hidden rounded-2xl border-2 border-white shadow-md bg-slate-900 aspect-[16/9] w-full">
                <AutoplayVideo
                  src="/videos/car_foam_video.mp4"
                  fallbacks={['/videos/video1.mp4']}
                  poster="/carousel/slide1_creta_foam.webp"
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-full bg-[#161D27]/90 backdrop-blur-sm text-white text-[8px] min-[360px]:text-[9px] font-mono font-bold border border-white/10 pointer-events-none">
                  🧼 Doorstep Foam Wash Video
                </span>
              </div>
            </div>

            {/* DESKTOP ONLY: Stacked Secondary Visual Cards (Right 5 cols) */}
            <div className="hidden lg:grid lg:col-span-5 grid-cols-1 gap-4">
              {/* Secondary Visual 1: 2-Wheeler Foam Wash Photo */}
              <div className="relative overflow-hidden rounded-3xl rounded-tl-[60px] border-4 border-white shadow-xl bg-slate-900 aspect-[16/9] group">
                <img
                  src="/vehicles/two_wheeler_wash1.webp"
                  alt="2-Wheeler Foam Shampoo Wash"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#161D27]/85 backdrop-blur-sm text-white text-[10px] font-mono font-bold">
                  🏍️ 2-Wheeler Foam Bath
                </span>
              </div>

              {/* Secondary Visual 2: 2-Wheeler Wash Video */}
              <div className="relative overflow-hidden rounded-3xl rounded-br-[60px] border-4 border-white shadow-xl bg-slate-900 aspect-[16/9] group">
                <AutoplayVideo
                  src="/videos/two_wheeler_video.mp4"
                  fallbacks={['/videos/VIDEO2.mp4', '/videos/video2.mp4']}
                  poster="/vehicles/two_wheeler_wash2.webp"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#161D27]/85 backdrop-blur-sm text-white text-[10px] font-mono font-bold">
                  🏍️ 2-Wheeler Wash Video
                </span>
              </div>
            </div>

          </div>

          {/* Core Pillars: 2x2 Grid on Small Mobile Screen, 4-col on Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6">

            {/* Pillar 1 */}
            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-3xl p-2.5 min-[360px]:p-3.5 sm:p-6 space-y-1.5 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8B182B] shadow-xs mb-2">
                  <Award className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-display font-black text-[10px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase leading-tight">
                  Own Water & Power
                </h3>
                <p className="font-sans text-[8px] min-[360px]:text-[9.5px] sm:text-xs text-slate-600 leading-tight sm:leading-relaxed mt-1 line-clamp-3 sm:line-clamp-none">
                  Custom rigs carry 500L soft water and silent generators. Zero home taps touched.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-3xl p-2.5 min-[360px]:p-3.5 sm:p-6 space-y-1.5 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8B182B] shadow-xs mb-2">
                  <Users className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-display font-black text-[10px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase leading-tight">
                  Trained Specialists
                </h3>
                <p className="font-sans text-[8px] min-[360px]:text-[9.5px] sm:text-xs text-slate-600 leading-tight sm:leading-relaxed mt-1 line-clamp-3 sm:line-clamp-none">
                  Certified technicians trained in safe paint correction, steam wash, and leather care.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-3xl p-2.5 min-[360px]:p-3.5 sm:p-6 space-y-1.5 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8B182B] shadow-xs mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-display font-black text-[10px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase leading-tight">
                  100% Walkaround
                </h3>
                <p className="font-sans text-[8px] min-[360px]:text-[9.5px] sm:text-xs text-slate-600 leading-tight sm:leading-relaxed mt-1 line-clamp-3 sm:line-clamp-none">
                  Full walkaround inspection before finish. Any spot is touched up immediately.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white border border-slate-200 rounded-xl sm:rounded-3xl p-2.5 min-[360px]:p-3.5 sm:p-6 space-y-1.5 sm:space-y-3 shadow-xs sm:shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8B182B] shadow-xs mb-2">
                  <Zap className="w-3.5 h-3.5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-display font-black text-[10px] min-[360px]:text-xs sm:text-lg text-slate-900 uppercase leading-tight">
                  Zero Hidden Fees
                </h3>
                <p className="font-sans text-[8px] min-[360px]:text-[9.5px] sm:text-xs text-slate-600 leading-tight sm:leading-relaxed mt-1 line-clamp-3 sm:line-clamp-none">
                  Upfront transparent rates based on your car type with no surprise charges.
                </p>
              </div>
            </div>

          </div>

          {/* CTA Box */}
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-10 text-center space-y-2 sm:space-y-4 max-w-3xl mx-auto shadow-xs sm:shadow-md">
            <h2 className="font-display font-black text-base min-[360px]:text-lg sm:text-3xl text-slate-900 uppercase">
              Ready to Care for Your Car?
            </h2>
            <p className="font-sans text-[10px] min-[360px]:text-xs sm:text-sm text-slate-600 leading-tight sm:leading-relaxed">
              Book your doorstep appointment online in less than 60 seconds.
            </p>
            <div className="pt-1 sm:pt-2">
              <Link
                to="/booking"
                onClick={() => {
                  setSelectedVehicleId('hatchback');
                  updateDraftBooking({ vehicleTypeId: 'hatchback' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="burgundy-btn inline-flex items-center gap-1 px-5 sm:px-8 py-2 sm:py-3.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>BOOK DOORSTEP SERVICE</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
