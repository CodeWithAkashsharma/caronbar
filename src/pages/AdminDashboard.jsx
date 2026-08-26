import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { SERVICES_DATA } from '../data/servicesData';
import { MONTHLY_PACKAGES_DATA } from '../data/packagesData';
import { VEHICLE_TYPES } from '../data/vehicleTypes';
import {
  Calendar, MessageSquare, Phone, MapPin, Eye, Trash2, LogOut, ExternalLink, Car, Search, CheckCircle2, Clock, Plus, Package, Sparkles, CreditCard, Banknote, ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    bookings,
    deleteBooking,
    queries,
    updateQueryStatus,
    deleteQuery,
    createManualBooking
  } = useBooking();

  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'queries'

  // Queries filters
  const [queryFilter, setQueryFilter] = useState('all'); // 'all' | 'Open' | 'In Process' | 'Resolved'
  const [querySearch, setQuerySearch] = useState('');

  // Bookings filters: exactly 4 tabs (all, open, packages, completed)
  const [bookingFilter, setBookingFilter] = useState('all'); // 'all' | 'open' | 'packages' | 'completed'
  const [bookingSearch, setBookingSearch] = useState('');

  // Modals state
  const [viewingBooking, setViewingBooking] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(null);
  const [deletingQuery, setDeletingQuery] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Helper to check if a booking is a monthly package
  const isPackageBooking = (b) => {
    if (!b) return false;
    if (b.itemType === 'package') return true;
    const name = (b.serviceName || '').toLowerCase();
    return name.includes('package') || 
           name.includes('pass') || 
           name.includes('quarterly') || 
           name.includes('half-yearly') || 
           name.includes('half yearly') || 
           name.includes('yearly') || 
           name.includes('annual') || 
           name.includes('subscription') ||
           name.includes('months care');
  };

  // Helper to compute package dates
  const getPackageDetails = (b) => {
    const isPkg = isPackageBooking(b);
    const startDate = b.packageStartDate || b.date || new Date().toISOString().split('T')[0];
    
    let expiryDate = b.packageExpiryDate;
    if (!expiryDate) {
      const name = (b.serviceName || '').toLowerCase();
      const start = new Date(startDate);
      if (name.includes('quarterly') || name.includes('3 month')) {
        start.setDate(start.getDate() + 90);
      } else if (name.includes('half') || name.includes('6 month')) {
        start.setDate(start.getDate() + 180);
      } else if (name.includes('year') || name.includes('annual') || name.includes('12 month')) {
        start.setDate(start.getDate() + 365);
      } else {
        start.setDate(start.getDate() + 30);
      }
      expiryDate = start.toISOString().split('T')[0];
    }

    return {
      isPackage: isPkg,
      startDate,
      expiryDate
    };
  };

  // Helper to auto-calculate package expiry for form
  const calculateExpiryDate = (pkgIdOrName, startDateStr) => {
    const start = new Date(startDateStr || new Date().toISOString().split('T')[0]);
    const lower = (pkgIdOrName || '').toLowerCase();
    if (lower.includes('quarterly') || lower.includes('3 month') || lower === 'quarterly') {
      start.setDate(start.getDate() + 90);
    } else if (lower.includes('half') || lower.includes('6 month') || lower === 'half-yearly') {
      start.setDate(start.getDate() + 180);
    } else if (lower.includes('year') || lower.includes('annual') || lower === 'yearly') {
      start.setDate(start.getDate() + 365);
    } else {
      start.setDate(start.getDate() + 30);
    }
    return start.toISOString().split('T')[0];
  };

  // Query Dashboard Metrics
  const openQueriesCount = queries.filter(q => q.status === 'Open' || !q.status || q.status === 'New').length;
  const inProcessQueriesCount = queries.filter(q => q.status === 'In Process' || q.status === 'Contacted').length;
  const resolvedQueriesCount = queries.filter(q => q.status === 'Resolved' || q.status === 'Closed').length;

  // Bookings Metrics for the 4 tabs
  const openBookingsCount = bookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled').length;
  const packagesCount = bookings.filter(b => isPackageBooking(b)).length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  // Filtered queries list
  const filteredQueries = queries.filter(q => {
    const currentStatus = q.status === 'New' ? 'Open' : q.status === 'Contacted' ? 'In Process' : q.status || 'Open';
    const matchesStatus = queryFilter === 'all' || currentStatus === queryFilter;
    const search = querySearch.toLowerCase();
    const matchesSearch = (q.id || '').toLowerCase().includes(search) ||
      (q.name || '').toLowerCase().includes(search) ||
      (q.phone || '').toLowerCase().includes(search) ||
      (q.carModel || '').toLowerCase().includes(search) ||
      (q.message || '').toLowerCase().includes(search);
    return matchesStatus && matchesSearch;
  });

  // Filtered bookings list (4 tabs: all | open | packages | completed)
  const filteredBookings = bookings.filter(b => {
    let matchesTab = true;
    if (bookingFilter === 'open') {
      matchesTab = b.status !== 'Completed' && b.status !== 'Cancelled';
    } else if (bookingFilter === 'packages') {
      matchesTab = isPackageBooking(b);
    } else if (bookingFilter === 'completed') {
      matchesTab = b.status === 'Completed';
    }

    const search = bookingSearch.toLowerCase();
    const matchesSearch = (b.id || '').toLowerCase().includes(search) ||
      (b.customerName || '').toLowerCase().includes(search) ||
      (b.customerPhone || '').toLowerCase().includes(search) ||
      (b.serviceName || '').toLowerCase().includes(search) ||
      (b.vehicleName || '').toLowerCase().includes(search) ||
      (b.vehicleNumber || '').toLowerCase().includes(search) ||
      (b.address || '').toLowerCase().includes(search);

    return matchesTab && matchesSearch;
  });

  // New Booking State
  const [newBookingData, setNewBookingData] = useState({
    customerName: '',
    customerPhone: '',
    itemType: 'service',
    serviceId: 'express-wash',
    packageId: 'quarterly',
    serviceName: 'Express Foam Wash',
    vehicleTypeId: 'hatchback',
    vehicleName: 'Hatchback',
    vehicleNumber: '',
    date: new Date().toISOString().split('T')[0],
    packageStartDate: new Date().toISOString().split('T')[0],
    packageExpiryDate: calculateExpiryDate('quarterly', new Date().toISOString().split('T')[0]),
    timeSlot: '10:00 AM - 01:00 PM',
    address: '',
    totalAmount: '499',
    paymentMethod: 'upi',
    status: 'Confirmed',
    detailerName: 'Mobile Detail Unit 01'
  });

  // Recalculate Amount for Create Booking Form
  const handleBookingFormChange = (updates) => {
    setNewBookingData(prev => {
      const merged = { ...prev, ...updates };
      const veh = VEHICLE_TYPES.find(v => v.id === merged.vehicleTypeId) || VEHICLE_TYPES[0];
      merged.vehicleName = veh.name;

      if (merged.itemType === 'package') {
        const pkg = MONTHLY_PACKAGES_DATA.find(p => p.id === merged.packageId) || MONTHLY_PACKAGES_DATA[0];
        merged.serviceName = `${pkg.name} Package (${pkg.duration})`;
        merged.packageExpiryDate = calculateExpiryDate(pkg.id, merged.packageStartDate);
        const base = pkg.prices?.[veh.id] || Math.round(pkg.basePrice * veh.multiplier);
        merged.totalAmount = String(base);
      } else {
        const srv = SERVICES_DATA.find(s => s.id === merged.serviceId || s.slug === merged.serviceId) || SERVICES_DATA[0];
        merged.serviceName = srv.name;
        merged.totalAmount = String(Math.round(srv.basePrice * veh.multiplier));
      }

      return merged;
    });
  };

  const handleCreateManualBooking = async (e) => {
    e.preventDefault();
    if (!newBookingData.customerName || !newBookingData.customerPhone || !newBookingData.address) return;

    await createManualBooking({
      ...newBookingData,
      status: 'Confirmed', // Automatically confirm newly added bookings/packages
      totalAmount: Number(newBookingData.totalAmount),
      createdAt: new Date().toISOString()
    });

    setShowCreateModal(false);
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Detailer Assigned':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'On The Way':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'Service Started':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-gray-500/15 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <>
      <SEOHead title="Admin Dashboard | CarOnBar" description="CarOnBar Operations & Customer Management Panel" />

      <div className="min-h-screen bg-[#0d0e12] text-gray-100 font-sans pb-16">

        {/* TOP ADMIN BAR */}
        <header className="sticky top-0 z-40 bg-[#121418]/95 backdrop-blur-md border-b border-white/10 px-2.5 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#8B182B] flex items-center justify-center font-display font-black text-white text-xs sm:text-sm shadow-md shrink-0">
              C
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-black text-xs min-[360px]:text-sm sm:text-lg text-white uppercase tracking-wider truncate">
                CarOnBar Admin Portal
              </h1>
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-mono hidden min-[480px]:block truncate">
                Real-Time Firestore Database & Booking Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#8B182B] hover:bg-[#A61C33] text-white font-bold text-[11px] sm:text-xs flex items-center gap-1 shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Booking</span>
            </button>

            <button
              onClick={logout}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/10 cursor-pointer shrink-0"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">

          {/* TOP TAB SELECTOR: BOOKINGS vs QUERIES */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 sm:flex-initial px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#8B182B] text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Bookings ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('queries')}
              className={`flex-1 sm:flex-initial px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                activeTab === 'queries'
                  ? 'bg-[#8B182B] text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Queries ({queries.length})</span>
              {openQueriesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: BOOKINGS MANAGEMENT (4 CLEAN TABS: ALL | OPEN | PACKAGES | COMPLETED) */}
          {/* ========================================================================= */}
          {activeTab === 'bookings' && (
            <div className="space-y-4 sm:space-y-6">

              {/* 4 SUMMARY STAT CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-2xl bg-[#15171e] border border-white/10 space-y-1">
                  <span className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase block">Total Bookings</span>
                  <p className="text-lg sm:text-3xl font-extrabold font-mono text-white">{bookings.length}</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500">All customer bookings</p>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-[#15171e] border border-blue-500/20 space-y-1">
                  <span className="text-[10px] sm:text-[11px] text-blue-400 font-bold uppercase block">Open / Active</span>
                  <p className="text-lg sm:text-3xl font-extrabold font-mono text-blue-300">{openBookingsCount}</p>
                  <p className="text-[10px] sm:text-[11px] text-blue-400/70">In queue & in progress</p>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-[#15171e] border border-purple-500/20 space-y-1">
                  <span className="text-[10px] sm:text-[11px] text-purple-400 font-bold uppercase block flex items-center gap-1">
                    <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Packages
                  </span>
                  <p className="text-lg sm:text-3xl font-extrabold font-mono text-purple-300">{packagesCount}</p>
                  <p className="text-[10px] sm:text-[11px] text-purple-400/70">Monthly subscriptions</p>
                </div>

                <div className="p-3 sm:p-4 rounded-2xl bg-[#15171e] border border-emerald-500/20 space-y-1">
                  <span className="text-[10px] sm:text-[11px] text-emerald-400 font-bold uppercase block">Completed</span>
                  <p className="text-lg sm:text-3xl font-extrabold font-mono text-emerald-300">{completedCount}</p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-400/70">Delivered with shine</p>
                </div>
              </div>

              {/* SEARCH & FILTER BAR (EXACTLY 4 TABS: 2x2 GRID ON SMALL SCREENS >= 300px) */}
              <div className="p-2.5 sm:p-4 rounded-2xl bg-[#15171e] border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                
                {/* 4 Clean Filter Buttons: 2x2 Grid on Mobile, Flex on Desktop */}
                <div className="grid grid-cols-2 min-[440px]:grid-cols-4 sm:flex sm:flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
                  <span className="hidden lg:inline-block text-xs font-mono text-gray-400 mr-1 font-bold uppercase">
                    Filter:
                  </span>
                  
                  {[
                    { id: 'all', label: `All (${bookings.length})` },
                    { id: 'open', label: `Open (${openBookingsCount})` },
                    { id: 'packages', label: `📦 Packages (${packagesCount})` },
                    { id: 'completed', label: `✓ Completed (${completedCount})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setBookingFilter(tab.id)}
                      className={`px-2 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer text-center justify-center ${
                        bookingFilter === tab.id
                          ? 'bg-[#8B182B] text-white shadow-sm ring-1 ring-white/20'
                          : 'bg-[#1c1f26] text-gray-300 hover:text-white border border-white/5 hover:bg-[#252830]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search Box */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search by customer, phone, car, package..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#101116] border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#8B182B]"
                  />
                </div>
              </div>

              {/* DESKTOP TABLE VIEW (CLEAN WITHOUT SCROLLBARS ON LARGE SCREENS) */}
              <div className="hidden md:block w-full border border-white/10 rounded-2xl bg-[#15171e] shadow-xl overflow-hidden">
                <table className="w-full text-left text-xs text-gray-200 border-collapse">
                  <thead className="bg-[#101116] text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-white/15">
                    <tr>
                      <th className="py-3.5 px-4 font-mono text-[#8B182B] w-28">Booking ID</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Service / Package</th>
                      <th className="py-3.5 px-4 text-right">Amount & Payment</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-right w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-gray-400 font-mono text-xs">
                          No bookings found matching "{bookingFilter}" filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b, idx) => {
                        const bookingIdFormatted = b.id || `GC-2026-${1000 + idx}`;
                        const statusStyle = getStatusBadgeStyle(b.status);
                        const pkgDetails = getPackageDetails(b);

                        return (
                          <tr key={b.docId || b.id} className="hover:bg-white/5 transition-colors">
                            {/* ID */}
                            <td className="py-3.5 px-4 font-mono font-bold text-white align-middle">
                              <span className="px-2 py-1 rounded bg-[#8B182B]/15 text-[#8B182B] border border-[#8B182B]/30 block text-center">
                                {bookingIdFormatted}
                              </span>
                            </td>

                            {/* Customer */}
                            <td className="py-3.5 px-4 align-middle">
                              <p className="font-bold text-white text-sm">{b.customerName}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-gray-400 font-mono text-[11px]">{b.customerPhone}</span>
                                {b.customerPhone && (
                                  <a
                                    href={`https://wa.me/${(b.customerPhone || '').replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded-md bg-emerald-500/15 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-2xs"
                                    title={`Chat with ${b.customerName} on WhatsApp`}
                                  >
                                    <MessageSquare className="w-3 h-3 text-emerald-400" />
                                  </a>
                                )}
                              </div>
                            </td>

                            {/* Service / Package */}
                            <td className="py-3.5 px-4 align-middle">
                              {pkgDetails.isPackage ? (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-[10px] uppercase">
                                    <Package className="w-3 h-3" /> Monthly Package
                                  </span>
                                  <p className="font-bold text-white text-xs">{b.serviceName}</p>
                                  <p className="text-[11px] text-gray-400">
                                    {b.vehicleName || 'Hatchback'} • {b.vehicleNumber || 'Reg Pending'}
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-0.5">
                                  <p className="font-bold text-white text-xs">{b.serviceName}</p>
                                  <p className="text-[11px] text-gray-400">
                                    {b.vehicleName || 'Hatchback'} {b.vehicleNumber ? `(${b.vehicleNumber})` : ''}
                                  </p>
                                </div>
                              )}
                            </td>

                            {/* Amount & Payment Status */}
                            <td className="py-3.5 px-4 align-middle text-right">
                              <p className="font-mono font-extrabold text-emerald-400 text-sm">
                                {formatCurrency(b.totalAmount)}
                              </p>
                              <div className="flex items-center justify-end gap-1 mt-1">
                                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold uppercase border ${
                                  (b.paymentStatus || '').toLowerCase() === 'paid'
                                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                }`}>
                                  {(b.paymentStatus || '').toLowerCase() === 'paid' ? '✓ Paid' : '⏳ COD'}
                                </span>
                              </div>
                              {b.transactionId && b.transactionId !== 'PAY-AFTER-WASH' && (
                                <p className="text-[9px] font-mono text-gray-400 truncate max-w-[90px] ml-auto mt-0.5" title={`Razorpay ID: ${b.transactionId}`}>
                                  {b.transactionId}
                                </p>
                              )}
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-4 align-middle text-center">
                              <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase border shadow-xs ${statusStyle}`}>
                                {b.status}
                              </span>
                              {b.detailerName && (
                                <p className="text-[10px] text-gray-400 mt-0.5 font-mono truncate max-w-[110px] mx-auto">
                                  {b.detailerName}
                                </p>
                              )}
                            </td>

                            {/* Actions (View Details & Delete ONLY - Edit removed) */}
                            <td className="py-3.5 px-4 align-middle text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setViewingBooking({ ...b, formattedId: bookingIdFormatted, pkgDetails })}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => setDeletingBooking({ id: b.docId || b.id, formattedId: bookingIdFormatted, name: b.customerName })}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS VIEW */}
              <div className="block md:hidden space-y-3.5">
                {filteredBookings.length === 0 ? (
                  <div className="p-6 text-center bg-[#15171e] rounded-2xl border border-white/10 text-gray-400 text-xs">
                    No bookings found matching "{bookingFilter}" filter.
                  </div>
                ) : (
                  filteredBookings.map((b, idx) => {
                    const bookingIdFormatted = b.id || `GC-2026-${1000 + idx}`;
                    const statusStyle = getStatusBadgeStyle(b.status);
                    const pkgDetails = getPackageDetails(b);

                    return (
                      <div key={b.docId || b.id} className="p-4 rounded-2xl bg-[#15171e] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="px-2.5 py-0.5 rounded-md bg-[#8B182B]/20 text-[#8B182B] border border-[#8B182B]/30 font-mono font-bold text-xs">
                            {bookingIdFormatted}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border ${statusStyle}`}>
                            {b.status}
                          </span>
                        </div>

                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-white text-sm">{b.customerName}</h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-xs text-gray-400 font-mono">{b.customerPhone}</span>
                              {b.customerPhone && (
                                <a
                                  href={`https://wa.me/${(b.customerPhone || '').replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 rounded-md bg-emerald-500/15 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-2xs"
                                  title={`Chat with ${b.customerName} on WhatsApp`}
                                >
                                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                                </a>
                              )}
                            </div>
                          </div>
                          <span className="font-mono font-extrabold text-emerald-400 text-base">
                            {formatCurrency(b.totalAmount)}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-[#0e1014] border border-white/5 space-y-1">
                          {pkgDetails.isPackage && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase">
                              <Package className="w-3 h-3" /> Monthly Package
                            </span>
                          )}
                          <p className="font-bold text-white text-xs">{b.serviceName}</p>
                          <p className="text-[11px] text-gray-400">
                            {b.vehicleName || 'Hatchback'} ({b.vehicleNumber || 'Reg Pending'})
                          </p>
                        </div>

                        <div className="pt-1 flex items-center justify-between gap-2 border-t border-white/10">
                          <button
                            onClick={() => setViewingBooking({ ...b, formattedId: bookingIdFormatted, pkgDetails })}
                            className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-bold transition-all flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" /> View Details
                          </button>
                          <button
                            onClick={() => setDeletingBooking({ id: b.docId || b.id, formattedId: bookingIdFormatted, name: b.customerName })}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: QUERIES INQUIRIES MANAGEMENT */}
          {/* ========================================================================= */}
          {activeTab === 'queries' && (
            <div className="space-y-5 sm:space-y-6">
              {/* QUERIES SEARCH & FILTER BAR */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#15171e] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="hidden sm:inline-block text-xs font-mono text-gray-400 mr-1 font-bold uppercase">Filter:</span>
                  {[
                    { id: 'all', label: `All (${queries.length})` },
                    { id: 'Open', label: `Open (${openQueriesCount})` },
                    { id: 'In Process', label: `In Process (${inProcessQueriesCount})` },
                    { id: 'Resolved', label: `Resolved (${resolvedQueriesCount})` }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setQueryFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        queryFilter === filter.id
                          ? 'bg-[#8B182B] text-white shadow-sm'
                          : 'bg-[#1c1f26] text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                    placeholder="Search queries..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#101116] border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#8B182B]"
                  />
                </div>
              </div>

              {/* QUERIES GRID */}
              {filteredQueries.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-[#15171e] border border-dashed border-white/10 space-y-2">
                  <MessageSquare className="w-8 h-8 text-gray-500 mx-auto" />
                  <p className="text-sm font-bold text-white">No inquiries match your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredQueries.map((query, index) => {
                    const currentStatus = query.status === 'New' ? 'Open' : query.status === 'Contacted' ? 'In Process' : query.status || 'Open';
                    const queryIdFormatted = query.id || `Q-0${index + 1}`;

                    return (
                      <div
                        key={query.docId || query.id}
                        className="p-4 sm:p-5 rounded-2xl bg-[#15171e] border border-white/10 space-y-3.5 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between border-b border-white/10 pb-3 gap-2">
                            <div>
                              <span className="text-xs font-mono font-bold text-[#8B182B] bg-[#8B182B]/10 px-2 py-0.5 rounded border border-[#8B182B]/20">
                                {queryIdFormatted}
                              </span>
                              <h3 className="text-base font-bold text-white mt-1 leading-tight">{query.name}</h3>
                              <p className="text-xs font-mono text-gray-300 font-bold mt-0.5">{query.phone}</p>
                            </div>

                            <select
                              value={currentStatus}
                              onChange={(e) => updateQueryStatus(query.docId || query.id, e.target.value)}
                              className="px-2 py-1 rounded-lg text-xs font-bold cursor-pointer border bg-[#101116] text-white border-white/20 focus:border-[#8B182B]"
                            >
                              <option value="Open" className="bg-[#181a20] text-red-400">● Open</option>
                              <option value="In Process" className="bg-[#181a20] text-blue-400">● In Process</option>
                              <option value="Resolved" className="bg-[#181a20] text-emerald-400">✓ Resolved</option>
                            </select>
                          </div>

                          <div className="space-y-1 text-xs">
                            {query.serviceCategory && (
                              <p className="text-gray-300 font-medium">
                                🧼 <span className="text-white font-bold">{query.serviceCategory}</span>
                              </p>
                            )}
                            <p className="text-gray-300 font-medium flex items-center gap-1">
                              <Car className="w-3.5 h-3.5 text-gray-400" />
                              Car: <span className="text-white font-semibold">{query.carModel || 'Not Specified'}</span>
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-[#0e1014] border border-white/10 space-y-1">
                            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Customer Message:</span>
                            <p className="text-xs font-sans text-gray-200 leading-relaxed">
                              "{query.message}"
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/${(query.phone || '').replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold text-xs transition-all flex items-center gap-1 border border-emerald-500/30"
                            >
                              <ExternalLink className="w-3 h-3" /> WhatsApp
                            </a>
                            <a
                              href={`tel:${query.phone}`}
                              className="px-3 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-600 text-blue-400 hover:text-white font-bold text-xs transition-all flex items-center gap-1 border border-blue-500/30"
                            >
                              <Phone className="w-3 h-3" /> Call
                            </a>
                          </div>

                          <button
                            onClick={() => setDeletingQuery({ id: query.docId || query.id, formattedId: queryIdFormatted, name: query.name })}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                            title="Delete Query"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </main>

        {/* ========================================================================= */}
        {/* MODAL: CREATE MANUAL BOOKING (CLEAN: NO EMAIL, NO STATUS DROPDOWN) */}
        {/* ========================================================================= */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className="w-full max-w-lg p-5 sm:p-6 rounded-2xl bg-[#181a20] border border-white/20 space-y-4 shadow-2xl my-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#8B182B]" /> Add New Customer Booking
                  </h3>
                  <p className="text-[11px] text-gray-400">Directly adds entry to real-time Firestore database</p>
                </div>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-white font-bold text-lg">✕</button>
              </div>

              {/* BOOKING TYPE TOGGLE: SERVICE vs PACKAGE */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#101116] border border-white/10">
                <button
                  type="button"
                  onClick={() => handleBookingFormChange({ itemType: 'service' })}
                  className={`py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    newBookingData.itemType === 'service'
                      ? 'bg-[#8B182B] text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Daily Service
                </button>
                <button
                  type="button"
                  onClick={() => handleBookingFormChange({ itemType: 'package' })}
                  className={`py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    newBookingData.itemType === 'package'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" /> Monthly Package
                </button>
              </div>

              <form onSubmit={handleCreateManualBooking} className="space-y-3.5 text-xs">
                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 block mb-1 font-bold">Customer Full Name *</label>
                    <input
                      type="text"
                      value={newBookingData.customerName}
                      onChange={e => handleBookingFormChange({ customerName: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full p-2.5 rounded-xl bg-[#101116] border border-white/10 text-white focus:border-[#8B182B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 block mb-1 font-bold">Phone Number *</label>
                    <input
                      type="tel"
                      value={newBookingData.customerPhone}
                      onChange={e => handleBookingFormChange({ customerPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full p-2.5 rounded-xl bg-[#101116] border border-white/10 text-white focus:border-[#8B182B]"
                      required
                    />
                  </div>
                </div>

                {/* Car Reg Number / Model */}
                <div>
                  <label className="text-gray-300 block mb-1 font-bold">Vehicle Model & Number Plate</label>
                  <input
                    type="text"
                    value={newBookingData.vehicleNumber}
                    onChange={e => handleBookingFormChange({ vehicleNumber: e.target.value })}
                    placeholder="e.g. Swift (DL 09 AB 1234)"
                    className="w-full p-2.5 rounded-xl bg-[#101116] border border-white/10 text-white"
                  />
                </div>

                {/* Car Type Selector */}
                <div>
                  <label className="text-gray-300 block mb-1 font-bold">Vehicle Segment *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {VEHICLE_TYPES.map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => handleBookingFormChange({ vehicleTypeId: v.id })}
                        className={`p-2 rounded-xl border text-center font-bold text-xs transition-all ${
                          newBookingData.vehicleTypeId === v.id
                            ? 'bg-[#8B182B]/20 border-[#8B182B] text-white'
                            : 'bg-[#101116] border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {v.name} ({v.multiplier}x)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service or Package Selection */}
                {newBookingData.itemType === 'service' ? (
                  <div>
                    <label className="text-gray-300 block mb-1 font-bold">Select Daily Service Treatment *</label>
                    <select
                      value={newBookingData.serviceId}
                      onChange={e => handleBookingFormChange({ serviceId: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#101116] border border-white/10 text-white font-bold"
                    >
                      {SERVICES_DATA.map(s => (
                        <option key={s.id} value={s.id} className="bg-[#181a20]">
                          {s.name} (Base ₹{s.basePrice})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="text-gray-300 block mb-1 font-bold">Select Monthly Package Tier *</label>
                    <select
                      value={newBookingData.packageId}
                      onChange={e => handleBookingFormChange({ packageId: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#101116] border border-purple-500/30 text-white font-bold"
                    >
                      {MONTHLY_PACKAGES_DATA.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#181a20]">
                          {p.name} Package ({p.duration}) - Base ₹{p.basePrice}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Dates & Schedule */}
                {newBookingData.itemType === 'package' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-[#101116] border border-purple-500/20">
                    <div>
                      <label className="text-purple-300 block mb-1 font-bold">Package Start Date *</label>
                      <input
                        type="date"
                        value={newBookingData.packageStartDate}
                        onChange={e => handleBookingFormChange({ packageStartDate: e.target.value })}
                        className="w-full p-2 rounded-lg bg-[#181a20] border border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-purple-300 block mb-1 font-bold">Auto-Computed Expiry Date</label>
                      <input
                        type="date"
                        value={newBookingData.packageExpiryDate}
                        onChange={e => handleBookingFormChange({ packageExpiryDate: e.target.value })}
                        className="w-full p-2 rounded-lg bg-[#181a20] border border-white/10 text-white"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-300 block mb-1 font-bold">Service Date *</label>
                      <input
                        type="date"
                        value={newBookingData.date}
                        onChange={e => handleBookingFormChange({ date: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#101116] border border-white/10 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 block mb-1 font-bold">Time Slot *</label>
                      <select
                        value={newBookingData.timeSlot}
                        onChange={e => handleBookingFormChange({ timeSlot: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#101116] border border-white/10 text-white"
                      >
                        <option value="07:00 AM - 10:00 AM">07:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                        <option value="01:00 PM - 04:00 PM">01:00 PM - 04:00 PM</option>
                        <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Amount */}
                <div>
                  <label className="text-gray-300 block mb-1 font-bold">Total Bill Amount (₹) *</label>
                  <input
                    type="number"
                    value={newBookingData.totalAmount}
                    onChange={e => handleBookingFormChange({ totalAmount: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#101116] border border-white/10 text-emerald-400 font-mono font-bold"
                    required
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-gray-300 block mb-1 font-bold">Doorstep Service Address *</label>
                  <textarea
                    rows={2}
                    value={newBookingData.address}
                    onChange={e => handleBookingFormChange({ address: e.target.value })}
                    placeholder="Enter complete doorstep address, landmark & pin code..."
                    className="w-full p-2.5 rounded-xl bg-[#101116] border border-white/10 text-white"
                    required
                  />
                </div>

                <div className="flex gap-2.5 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#8B182B] hover:bg-[#A61C33] text-white font-bold shadow-md"
                  >
                    Save Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL: VIEW BOOKING DETAILS */}
        {/* ========================================================================= */}
        {viewingBooking && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-lg p-5 sm:p-6 rounded-2xl bg-[#181a20] border border-white/20 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Booking Details ({viewingBooking.formattedId})</h3>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border ${getStatusBadgeStyle(viewingBooking.status)}`}>
                    {viewingBooking.status}
                  </span>
                </div>
                <button onClick={() => setViewingBooking(null)} className="text-gray-400 hover:text-white font-bold text-lg">✕</button>
              </div>

              <div className="space-y-3 text-xs text-gray-200">
                <div className="p-3 rounded-xl bg-[#101116] border border-white/10 space-y-1">
                  <p className="text-gray-400 font-bold uppercase text-[10px]">Customer Contact</p>
                  <p className="font-bold text-white text-sm">{viewingBooking.customerName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[#8B182B] font-mono font-bold">{viewingBooking.customerPhone}</span>
                    {viewingBooking.customerPhone && (
                      <a
                        href={`https://wa.me/${(viewingBooking.customerPhone || '').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all border border-emerald-500/30 text-[11px] font-bold"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-400" /> WhatsApp Customer
                      </a>
                    )}
                  </div>
                  {viewingBooking.customerEmail && <p className="text-gray-400 mt-1">{viewingBooking.customerEmail}</p>}
                </div>

                <div className="p-3 rounded-xl bg-[#101116] border border-white/10 space-y-1">
                  <p className="text-gray-400 font-bold uppercase text-[10px]">Service & Vehicle</p>
                  <p className="font-bold text-white">{viewingBooking.serviceName}</p>
                  <p className="text-gray-400">
                    Vehicle: {viewingBooking.vehicleName || 'Standard Car'} ({viewingBooking.vehicleNumber || 'Reg Pending'})
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#101116] border border-white/10 space-y-1">
                  <p className="text-gray-400 font-bold uppercase text-[10px]">Doorstep Address</p>
                  <p className="text-white">{viewingBooking.address || 'Address provided at booking'}</p>
                </div>

                {/* Payment & Razorpay Gateway Details */}
                <div className="p-3.5 rounded-xl bg-[#101116] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 font-bold uppercase text-[10px] flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-[#8B182B]" /> Payment & Gateway Details
                    </p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                      (viewingBooking.paymentStatus || '').toLowerCase() === 'paid'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}>
                      {(viewingBooking.paymentStatus || '').toLowerCase() === 'paid' ? '✓ Paid Online' : '⏳ Pay on Service (COD)'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/5">
                    <div>
                      <span className="text-gray-400 text-[10px] block">Payment Method:</span>
                      <strong className="text-white">{viewingBooking.paymentMethod || 'Razorpay Online'}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] block">Total Amount:</span>
                      <strong className="text-emerald-400 font-mono font-bold text-sm">{formatCurrency(viewingBooking.totalAmount)}</strong>
                    </div>
                  </div>

                  {viewingBooking.transactionId && (
                    <div className="p-2 rounded-lg bg-[#0a0c0f] border border-white/10 space-y-1 font-mono text-[11px]">
                      <span className="text-gray-400 text-[10px] uppercase block font-sans">Razorpay Transaction / Reference ID:</span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-emerald-300 font-bold select-all truncate">{viewingBooking.transactionId}</span>
                        {viewingBooking.transactionId.startsWith('pay_') && (
                          <a
                            href={`https://dashboard.razorpay.com/app/payments/${viewingBooking.transactionId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-[#8B182B] hover:text-white underline shrink-0 font-sans"
                          >
                            Open in Razorpay ↗
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button onClick={() => setViewingBooking(null)} className="w-full py-2.5 rounded-xl bg-[#8B182B] text-white font-bold text-xs uppercase cursor-pointer">
                Close Details
              </button>
            </div>
          </div>
        )}

        {/* MODAL: DELETE BOOKING CONFIRMATION */}
        {deletingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-sm bg-[#181a20] border border-red-500/40 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
              <Trash2 className="w-10 h-10 text-red-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Delete Booking {deletingBooking.formattedId}?</h3>
              <p className="text-xs text-gray-300">Permanently delete booking for <span className="text-white font-bold">{deletingBooking.name}</span> from Firestore database?</p>
              <div className="flex gap-2">
                <button onClick={() => setDeletingBooking(null)} className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs">Cancel</button>
                <button
                  onClick={() => {
                    deleteBooking(deletingBooking.id);
                    setDeletingBooking(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: DELETE QUERY CONFIRMATION */}
        {deletingQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <div className="w-full max-w-sm bg-[#181a20] border border-red-500/40 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
              <Trash2 className="w-10 h-10 text-red-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Delete Query {deletingQuery.formattedId}?</h3>
              <p className="text-xs text-gray-300">Permanently delete inquiry from <span className="text-white font-bold">{deletingQuery.name}</span>?</p>
              <div className="flex gap-2">
                <button onClick={() => setDeletingQuery(null)} className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs">Cancel</button>
                <button
                  onClick={() => {
                    deleteQuery(deletingQuery.id);
                    setDeletingQuery(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
