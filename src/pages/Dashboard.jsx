import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { LayoutDashboard, Calendar, Clock, MapPin, Car, Compass, RefreshCw, Plus, User, LogOut, CheckCircle2 } from 'lucide-react';

export const Dashboard = () => {
  const { user, logout, addSavedAddress } = useAuth();
  const { bookings, selectServiceForBooking } = useBooking();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showProfileSavedPopup, setShowProfileSavedPopup] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: '',
    streetAddress: '',
    locality: '',
    city: '',
    pincode: '',
    landmark: ''
  });

  const currentUserBookings = bookings.filter(b => b.customerEmail === user?.email || user?.role === 'customer');
  const activeBookings = currentUserBookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled');
  const pastBookings = currentUserBookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    addSavedAddress(newAddress);
    setShowAddressModal(false);
    setNewAddress({ title: '', streetAddress: '', locality: '', city: '', pincode: '', landmark: '' });
  };

  return (
    <>
      <SEOHead
        title="User Dashboard | CARONBAR"
        description="Manage your upcoming doorstep car wash bookings, saved addresses, and account preferences."
        canonicalPath="/dashboard"
      />

      <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top User Profile Header Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-center md:text-left">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name || 'User'}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#8B182B] shadow-md"
              />
              <div>
                <span className="text-[10px] font-mono uppercase bg-[#8B182B]/10 text-[#8B182B] font-bold px-2.5 py-0.5 rounded-full border border-[#8B182B]/20">
                  Member
                </span>
                <h1 className="text-2xl font-bold text-slate-900 mt-1.5">{user?.name || 'Marcus Vance'}</h1>
                <p className="text-xs text-slate-500 font-mono">{user?.email || 'marcus@example.com'} • {user?.phone || '+1 (555) 234-5678'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/booking"
                className="px-5 py-2.5 rounded-xl burgundy-btn text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                + New Doorstep Booking
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
            {[
              { id: 'upcoming', label: `Active & Upcoming (${activeBookings.length})` },
              { id: 'history', label: `Booking History (${pastBookings.length})` },
              { id: 'addresses', label: `Saved Addresses (${user?.savedAddresses?.length || 2})` },
              { id: 'settings', label: 'Account Settings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'burgundy-btn shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Upcoming Bookings */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {activeBookings.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-900">No Upcoming Doorstep Bookings</h3>
                  <p className="text-xs text-slate-500">Schedule your vehicle maintenance or ceramic booster service now.</p>
                  <Link
                    to="/booking"
                    className="inline-block px-6 py-2.5 rounded-xl burgundy-btn text-white font-bold text-xs shadow-md mt-2 cursor-pointer"
                  >
                    Book Now
                  </Link>
                </div>
              ) : (
                activeBookings.map((b) => (
                  <div key={b.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-mono text-[#8B182B] font-bold">{b.id}</span>
                        <h3 className="text-lg font-bold text-slate-900">{b.serviceName}</h3>
                      </div>
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#8B182B]/10 text-[#8B182B] border border-[#8B182B]/20">
                        Status: {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#8B182B] shrink-0" />
                        <span className="truncate">{b.vehicleName} ({b.vehicleNumber})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#8B182B] shrink-0" />
                        <span>{formatDate(b.date)} • {b.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#8B182B] shrink-0" />
                        <span className="truncate">{b.address}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-bold font-mono text-[#8B182B]">{formatCurrency(b.totalAmount)}</span>
                      <div className="flex items-center gap-2">
                        <Link
                          to="/track-booking"
                          className="px-4 py-2 rounded-xl bg-[#8B182B]/10 text-[#8B182B] hover:bg-[#8B182B] hover:text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5" /> Track Radar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Booking History */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {pastBookings.map((b) => (
                <div key={b.id} className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">{b.id}</span>
                      <h4 className="text-base font-bold text-slate-900">{b.serviceName}</h4>
                      <p className="text-xs text-slate-500">{b.vehicleName} • {formatDate(b.date)}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-[#8B182B] block">{formatCurrency(b.totalAmount)}</span>
                      <button
                        onClick={() => {
                          selectServiceForBooking(b.serviceId || 'full-detailing');
                          navigate('/booking');
                        }}
                        className="mt-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Re-book Service
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Your Saved Doorstep Locations</h3>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="px-4 py-2 rounded-xl burgundy-btn font-bold text-xs shadow-md flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(user?.savedAddresses || [
                  {
                    id: 'addr-1',
                    title: 'Beverly Hills Residence',
                    streetAddress: '842 Ridgecrest Blvd',
                    locality: 'Beverly Hills',
                    city: 'Los Angeles',
                    pincode: '90210'
                  },
                  {
                    id: 'addr-2',
                    title: 'Malibu Beach House',
                    streetAddress: '22400 Pacific Coast Hwy',
                    locality: 'Malibu',
                    city: 'Los Angeles',
                    pincode: '90265'
                  }
                ]).map((addr) => (
                  <div key={addr.id} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 relative shadow-sm">
                    <span className="text-xs font-bold text-[#8B182B] font-display uppercase tracking-wider block">
                      {addr.title || 'Saved Location'}
                    </span>
                    <p className="text-xs font-bold text-slate-900">{addr.streetAddress}, {addr.locality}</p>
                    <p className="text-[11px] text-slate-500">{addr.city} {addr.pincode}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Account Settings */}
          {activeTab === 'settings' && (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Profile Preferences</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || 'Marcus Vance'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 focus:outline-none focus:border-[#8B182B]"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email || 'marcus@example.com'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 focus:outline-none focus:border-[#8B182B]"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    defaultValue={user?.phone || '+1 (555) 234-5678'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 focus:outline-none focus:border-[#8B182B]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowProfileSavedPopup(true)}
                  className="px-6 py-2.5 rounded-xl burgundy-btn text-white font-bold text-xs shadow-md mt-2 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* POPUP MODAL: PROFILE UPDATED NOTIFICATION */}
      {showProfileSavedPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 font-sans">Profile Updated!</h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Your account preferences and profile details have been saved successfully.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowProfileSavedPopup(false)}
                className="w-full py-3.5 rounded-xl burgundy-btn font-black text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                CLOSE NOTIFICATION
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
