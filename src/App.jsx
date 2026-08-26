import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { AdminRoute } from './components/common/AdminRoute';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';

import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Packages } from './pages/Packages';
import { Booking } from './pages/Booking';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { ServiceDetail } from './pages/ServiceDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { TrackBooking } from './pages/TrackBooking';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout({ isDark, toggleTheme }) {
  const location = useLocation();
  
  const knownRoutes = [
    '/', '/services', '/packages', '/booking', '/booking/confirmation', 
    '/track', '/about', '/contact', '/faq', '/legal', '/login', 
    '/register', '/admin/login', '/caronbar/admin/login', '/dashboard', 
    '/admin', '/caronbar/admin'
  ];

  const isKnownRoute = knownRoutes.includes(location.pathname) || location.pathname.startsWith('/services/');

  // Hide site chrome (Navbar, Footer, WhatsApp icon) on Admin pages, Login page, and 404 error pages
  const isChromeHidden = !isKnownRoute ||
                         location.pathname.startsWith('/admin') || 
                         location.pathname.startsWith('/caronbar/admin') ||
                         location.pathname === '/login' ||
                         location.pathname.includes('/login');

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f10] text-[#e0e3e5] font-sans transition-colors duration-300">
      {/* Hide standard Navbar on Admin & Login pages */}
      {!isChromeHidden && <Navbar isDark={isDark} toggleTheme={toggleTheme} />}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />
          <Route path="/track" element={<TrackBooking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/legal" element={<Legal />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/caronbar/admin/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/caronbar/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Wildcard Catch-All 404 Error Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Hide standard WhatsApp floating button and Footer on Admin & Login pages */}
      {!isChromeHidden && <WhatsAppButton />}
      {!isChromeHidden && <Footer />}
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('aura_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('aura_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('aura_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <AuthProvider>
      <BookingProvider>
        <BrowserRouter>
          <ScrollToTop />
          <MainLayout isDark={isDark} toggleTheme={toggleTheme} />
        </BrowserRouter>
      </BookingProvider>
    </AuthProvider>
  );
}
