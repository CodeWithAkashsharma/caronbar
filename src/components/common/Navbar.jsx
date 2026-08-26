import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { Menu, X, Home, Wrench, Shield, Info, Phone, Calendar } from 'lucide-react';

export const Navbar = () => {
  const { setSelectedVehicleId, updateDraftBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FREEZE PAGE BODY SCROLLING WHEN BURGER MENU IS OPEN
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/', icon: Home },
    { name: 'SERVICES', path: '/services', icon: Wrench },
    { name: 'PACKAGES', path: '/packages', icon: Shield },
    { name: 'ABOUT', path: '/about', icon: Info },
    { name: 'CONTACT', path: '/contact', icon: Phone },
  ];

  const isBookingPage = location.pathname.startsWith('/booking');

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#161D27] border-b border-white/10 shadow-lg ${
        scrolled ? 'py-3 shadow-2xl' : 'py-3.5 sm:py-4'
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 select-none shrink-0 group"
        >
          <img src="/logo-transparent.png" alt="CARONBAR Logo" className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(139,24,43,0.4)] group-hover:scale-105 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="font-display font-black text-xl sm:text-2xl italic tracking-wider uppercase text-white hidden sm:inline-block">
              CAR<span className="text-[#8B182B] font-black">ONBAR</span>
            </span>
            <span className="text-[8px] font-mono tracking-widest text-[#94A3B8] uppercase hidden sm:inline-block -mt-1 font-bold">
              DOORSTEP CAR CARE & CAR WASH
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION LINKS WITH HOVER UNDERLINE & ACTIVE STAY EFFECT */}
        <div className="hidden lg:flex items-center gap-8 font-display font-extrabold italic text-sm tracking-wider uppercase">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`group relative py-1.5 transition-colors ${
                  isActive
                    ? 'text-[#8B182B] font-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                
                {/* Burgundy Underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] bg-[#8B182B] rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-full shadow-[0_0_10px_#8B182B]'
                      : 'w-0 group-hover:w-full opacity-80'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* TOP NAVBAR ACTIONS: BOOK NOW BUTTON (HIDDEN ON BOOKING PAGE) */}
        <div className="flex items-center gap-4 shrink-0">
          {!isBookingPage && (
            <Link
              to="/booking"
              onClick={() => {
                setSelectedVehicleId('hatchback');
                updateDraftBooking({ vehicleTypeId: 'hatchback' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden lg:inline-flex burgundy-btn px-6 py-2.5 rounded-lg text-xs font-black"
            >
              <span>BOOK NOW</span>
            </Link>
          )}

          {/* MOBILE BURGER TOGGLE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white hover:text-[#8B182B] transition-colors focus:outline-none group"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? (
              <X className="w-7 h-7 text-[#8B182B] transform group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="w-7 h-7 text-white group-hover:text-[#8B182B] transform group-hover:scale-110 transition-all duration-300" />
            )}
          </button>
        </div>

      </div>

      {/* BACKDROP OVERLAY FOR SIDE DRAWER */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[90] transition-opacity"
        />
      )}

      {/* FROSTED GLASS TRANSLUCENT MOBILE DRAWER */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-0 right-0 bottom-0 h-[100dvh] max-h-[100dvh] w-[75%] sm:w-[60%] z-[100] bg-[#161D27]/95 backdrop-blur-2xl border-l border-white/15 shadow-[-20px_0_50px_rgba(0,0,0,0.95)] p-5 sm:p-6 flex flex-col justify-between overflow-y-auto">
          
          <div className="space-y-4 pt-1">
            {/* Top Side Drawer Header with Logo & Close Icon */}
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <Link
                to="/"
                onClick={() => {
                  setMobileOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 select-none cursor-pointer"
              >
                <img src="/logo-transparent.png" alt="CARONBAR Logo" className="h-9 sm:h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(139,24,43,0.3)]" />
                <span className="font-display font-black text-lg sm:text-xl italic tracking-wider uppercase text-white">
                  CAR<span className="text-[#8B182B] font-black">ONBAR</span>
                </span>
              </Link>

              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 text-[#8B182B]" />
              </button>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="space-y-3 pt-2">
              {navLinks.map((link) => {
                const IconComp = link.icon;
                const isActive = location.pathname === link.path || (link.path === '/' && (location.pathname === '' || location.pathname === '/'));

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      setMobileOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`group relative flex items-center py-2.5 transition-all duration-300 border-b border-white/5 bg-transparent ${
                      isActive
                        ? 'text-[#8B182B] font-black pl-2'
                        : 'text-gray-300 hover:text-white hover:pl-3'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 z-10 w-full">
                      {isActive ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8B182B] shadow-[0_0_12px_#8B182B] animate-pulse shrink-0" />
                      ) : (
                        <IconComp className="w-4 h-4 text-gray-400 group-hover:text-[#8B182B] group-hover:scale-125 transition-all duration-300 shrink-0" />
                      )}
                      
                      <span className={`font-display font-black text-sm sm:text-base italic tracking-widest uppercase transition-colors ${
                        isActive
                          ? 'text-[#8B182B] drop-shadow-[0_0_10px_rgba(139,24,43,0.6)]'
                          : 'group-hover:text-[#8B182B]'
                      }`}>
                        {link.name}
                      </span>
                    </div>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B182B] to-transparent shadow-[0_0_10px_#8B182B]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* SIDE DRAWER FOOTER CTA (HIDDEN ON BOOKING PAGE) */}
          {!isBookingPage && (
            <div className="pt-4 mt-4 border-t border-white/10 space-y-2 shrink-0">
              <Link
                to="/booking"
                onClick={() => {
                  setSelectedVehicleId('hatchback');
                  updateDraftBooking({ vehicleTypeId: 'hatchback' });
                  setMobileOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="burgundy-btn block w-full py-3.5 text-center text-xs font-black italic tracking-widest uppercase rounded-lg shadow-[0_0_20px_rgba(139,24,43,0.45)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 text-white" />
                  BOOK NOW
                </span>
              </Link>
            </div>
          )}

        </div>
      )}
    </nav>
  );
};
