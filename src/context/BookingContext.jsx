import React, { createContext, useContext, useState, useEffect } from 'react';
import { VEHICLE_TYPES } from '../data/vehicleTypes';
import { SERVICES_DATA } from '../data/servicesData';
import { PACKAGES_DATA, ADDONS_DATA } from '../data/packagesData';
import { 
  createBooking as createFirebaseBooking, 
  subscribeBookings, 
  updateBooking as updateFirebaseBooking, 
  deleteBooking as deleteFirebaseBooking, 
  createQueryInquiry as createFirebaseQuery, 
  subscribeQueries, 
  updateQueryStatus as updateFirebaseQueryStatus, 
  deleteQueryInquiry as deleteFirebaseQuery,
  seedSampleDataToFirebase
} from '../services/firebaseService';
import { generateBookingId } from '../utils/formatters';

const BookingContext = createContext();

const DEFAULT_DRAFT_BOOKING = {
  step: 1,
  itemType: 'service',
  selectedItemId: '',
  vehicleTypeId: 'hatchback',
  selectedAddons: [],
  selectedDate: '',
  selectedTimeSlot: '',
  address: {
    title: 'Home',
    streetAddress: '',
    locality: '',
    city: '',
    pincode: '',
    landmark: '',
  },
  contact: {
    fullName: '',
    email: '',
    phone: '',
    vehicleModel: '',
    licensePlate: '',
    specialInstructions: '',
  },
  paymentMethod: 'upi',
  appliedCoupon: null,
  discountAmount: 0,
};

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingQueries, setLoadingQueries] = useState(true);

  // Subscribe to Real-Time Cloud Firestore Bookings & Queries
  useEffect(() => {
    const unsubscribeBookings = subscribeBookings((data) => {
      setBookings(data);
      setLoadingBookings(false);
    });

    const unsubscribeQueries = subscribeQueries((data) => {
      setQueries(data);
      setLoadingQueries(false);
    });

    return () => {
      if (typeof unsubscribeBookings === 'function') unsubscribeBookings();
      if (typeof unsubscribeQueries === 'function') unsubscribeQueries();
    };
  }, []);

  // Draft booking state with sessionStorage persistence so page refresh preserves current step & input data
  const [draftBooking, setDraftBooking] = useState(() => {
    try {
      const saved = sessionStorage.getItem('caronbar_draft_booking');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_DRAFT_BOOKING, ...parsed };
      }
    } catch (e) {
      console.warn('Could not restore booking from sessionStorage:', e);
    }
    return DEFAULT_DRAFT_BOOKING;
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState(() => {
    try {
      const saved = sessionStorage.getItem('caronbar_draft_booking');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.vehicleTypeId) return parsed.vehicleTypeId;
      }
    } catch (e) {}
    return 'hatchback';
  });

  // Automatically save to sessionStorage whenever draftBooking changes
  useEffect(() => {
    try {
      if (draftBooking) {
        sessionStorage.setItem('caronbar_draft_booking', JSON.stringify(draftBooking));
      }
    } catch (e) {
      console.warn('Could not save booking to sessionStorage:', e);
    }
  }, [draftBooking]);

  const resetDraftBooking = () => {
    try {
      sessionStorage.removeItem('caronbar_draft_booking');
    } catch (e) {}
    setDraftBooking(DEFAULT_DRAFT_BOOKING);
  };

  const getVehicleObj = (vehId = (draftBooking.vehicleTypeId || selectedVehicleId)) => {
    return VEHICLE_TYPES.find(v => v.id === vehId) || VEHICLE_TYPES[0];
  };

  const getSelectedItemObj = (itemType = draftBooking.itemType, itemId = draftBooking.selectedItemId) => {
    if (itemType === 'package') {
      return PACKAGES_DATA.find(p => p.id === itemId) || null;
    }
    return SERVICES_DATA.find(s => s.id === itemId || s.slug === itemId) || null;
  };

  const calculatePricingSummary = (customDraft = draftBooking) => {
    if (!customDraft || !customDraft.selectedItemId) {
      return {
        basePrice: 0,
        vehicleMultiplier: 1.0,
        vehicleName: 'Hatchback',
        baseVehiclePrice: 0,
        addonsTotal: 0,
        subtotal: 0,
        discount: 0,
        finalTotal: 0
      };
    }

    const vehId = customDraft.vehicleTypeId || selectedVehicleId || 'hatchback';
    const vehicle = VEHICLE_TYPES.find(v => v.id === vehId) || VEHICLE_TYPES[0];
    
    let basePrice = 0;
    const item = customDraft.itemType === 'package'
      ? PACKAGES_DATA.find(p => p.id === customDraft.selectedItemId)
      : SERVICES_DATA.find(s => s.id === customDraft.selectedItemId || s.slug === customDraft.selectedItemId);
    
    if (item) {
      basePrice = item.basePrice || 0;
    }

    const baseVehiclePrice = Math.round(basePrice * (vehicle ? vehicle.multiplier : 1.0));

    const addonsTotal = (customDraft.selectedAddons || []).reduce((sum, addonId) => {
      const addonObj = ADDONS_DATA.find(a => a.id === addonId);
      return sum + (addonObj ? addonObj.price : 0);
    }, 0);

    const subtotal = baseVehiclePrice + addonsTotal;
    const discount = customDraft.discountAmount || 0;
    const finalTotal = Math.max(0, subtotal - discount);

    return {
      basePrice,
      vehicleMultiplier: vehicle ? vehicle.multiplier : 1.0,
      vehicleName: vehicle ? vehicle.name : 'Hatchback',
      baseVehiclePrice,
      addonsTotal,
      subtotal,
      discount,
      finalTotal
    };
  };

  const calculateTotal = (customDraft = draftBooking) => {
    const summary = calculatePricingSummary(customDraft);
    return summary.finalTotal;
  };

  const updateDraftBooking = (updates) => {
    setDraftBooking(prev => ({ ...prev, ...updates }));
  };

  const toggleAddon = (addonId) => {
    setDraftBooking(prev => {
      const exists = prev.selectedAddons.includes(addonId);
      const updated = exists
        ? prev.selectedAddons.filter(id => id !== addonId)
        : [...prev.selectedAddons, addonId];
      return { ...prev, selectedAddons: updated };
    });
  };

  const selectServiceForBooking = (serviceSlug) => {
    const isBike = serviceSlug === 'bike-monthly-399' || serviceSlug === 'bike' || serviceSlug === '2wheeler';
    if (isBike) {
      setSelectedVehicleId('2wheeler');
      updateDraftBooking({ itemType: 'package', selectedItemId: 'bike-monthly-399', vehicleTypeId: '2wheeler', step: 2 });
    } else {
      const targetVehicle = (selectedVehicleId === '2wheeler' || draftBooking.vehicleTypeId === '2wheeler') ? 'hatchback' : (draftBooking.vehicleTypeId || selectedVehicleId || 'hatchback');
      if (selectedVehicleId === '2wheeler') {
        setSelectedVehicleId('hatchback');
      }
      updateDraftBooking({ itemType: 'service', selectedItemId: serviceSlug, vehicleTypeId: targetVehicle, step: 1 });
    }
  };

  const selectPackageForBooking = (packageId) => {
    const isBike = packageId === 'bike-monthly-399' || packageId === '2wheeler';
    if (isBike) {
      setSelectedVehicleId('2wheeler');
      updateDraftBooking({ itemType: 'package', selectedItemId: 'bike-monthly-399', vehicleTypeId: '2wheeler', step: 2 });
    } else {
      const targetVehicle = (selectedVehicleId === '2wheeler' || draftBooking.vehicleTypeId === '2wheeler') ? 'hatchback' : (draftBooking.vehicleTypeId || selectedVehicleId || 'hatchback');
      if (selectedVehicleId === '2wheeler') {
        setSelectedVehicleId('hatchback');
      }
      updateDraftBooking({ itemType: 'package', selectedItemId: packageId, vehicleTypeId: targetVehicle, step: 2 });
    }
  };

  // Submit booking to Firestore and reset draft state to defaults
  const submitBooking = async (customOverrides = {}) => {
    const nextNum = bookings.length + 1;
    const newId = generateBookingId(nextNum);
    const itemObj = getSelectedItemObj();
    const vehObj = getVehicleObj(draftBooking.vehicleTypeId);
    const totals = calculatePricingSummary();

    const paymentMethod = customOverrides.paymentMethod || draftBooking.paymentMethod || 'razorpay';
    const isPaid = customOverrides.paymentStatus === 'Paid' || (paymentMethod === 'razorpay' && customOverrides.paymentStatus !== 'Pending');

    const bookingPayload = {
      id: newId,
      customerName: draftBooking.contact.fullName,
      customerEmail: draftBooking.contact.email,
      customerPhone: draftBooking.contact.phone,
      serviceName: itemObj?.name || 'Selected Service',
      serviceId: itemObj?.id || itemObj?.slug || draftBooking.selectedItemId,
      vehicleType: draftBooking.vehicleTypeId,
      vehicleName: draftBooking.contact.vehicleModel || `${vehObj.name}`,
      vehicleNumber: draftBooking.contact.licensePlate || 'REG-PENDING',
      date: draftBooking.selectedDate || new Date().toISOString().split('T')[0],
      timeSlot: draftBooking.selectedTimeSlot,
      status: isPaid ? 'Confirmed' : 'Pending Confirmation',
      totalAmount: totals.finalTotal,
      paymentMethod: paymentMethod === 'razorpay' ? 'Razorpay Online' : 'Cash on Service (COD)',
      paymentStatus: isPaid ? 'Paid' : 'Pending',
      transactionId: customOverrides.transactionId || '',
      detailerName: 'Auto-Assigning Mobile Detailer',
      detailerPhone: '+91 87509 19105',
      address: `${draftBooking.address.streetAddress}, ${draftBooking.address.locality}, ${draftBooking.address.city} ${draftBooking.address.pincode}`,
      landmark: draftBooking.address.landmark || '',
      addons: draftBooking.selectedAddons.map(id => ADDONS_DATA.find(a => a.id === id)?.name).filter(Boolean),
      ...customOverrides
    };

    const res = await createFirebaseBooking(bookingPayload);
    return res.data || bookingPayload;
  };

  // Admin Manual Booking Creation
  const createManualBooking = async (manualBookingData) => {
    const res = await createFirebaseBooking(manualBookingData);
    return res;
  };

  const getBookingById = (bookingId) => {
    return bookings.find(b => (b.id || '').toLowerCase() === bookingId.toLowerCase().trim());
  };

  const updateBooking = async (bookingId, updatedFields) => {
    const booking = bookings.find(b => b.id === bookingId || b.docId === bookingId);
    const docId = booking?.docId || bookingId;
    await updateFirebaseBooking(docId, updatedFields);
  };

  const updateBookingStatus = async (bookingId, newStatus, detailerName, extraFields = {}) => {
    const booking = bookings.find(b => b.id === bookingId || b.docId === bookingId);
    const docId = booking?.docId || bookingId;
    
    await updateFirebaseBooking(docId, {
      status: newStatus,
      detailerName: detailerName || booking?.detailerName || 'Assigned Detailer',
      ...extraFields
    });
  };

  const removeBooking = async (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId || b.docId === bookingId);
    const docId = booking?.docId || bookingId;
    await deleteFirebaseBooking(docId);
  };

  // Add Query handler for Contact Form
  const addQuery = async (queryData) => {
    const res = await createFirebaseQuery({
      name: queryData.name,
      phone: queryData.phone,
      carModel: queryData.carModel || 'N/A',
      serviceCategory: queryData.serviceCategory || 'Express Hydro Foam Car Wash',
      message: queryData.message,
      city: queryData.city || 'India',
      status: 'Open'
    });
    return res.data;
  };

  const updateQueryStatus = async (id, newStatus) => {
    const qItem = queries.find(q => q.id === id || q.docId === id);
    const docId = qItem?.docId || id;
    await updateFirebaseQueryStatus(docId, newStatus);
  };

  const deleteQuery = async (id) => {
    const qItem = queries.find(q => q.id === id || q.docId === id);
    const docId = qItem?.docId || id;
    await deleteFirebaseQuery(docId);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedVehicleId,
        setSelectedVehicleId,
        currentVehicle: getVehicleObj(selectedVehicleId),
        bookings,
        queries,
        loadingBookings,
        loadingQueries,
        addQuery,
        updateQueryStatus,
        deleteQuery,
        draftBooking,
        updateDraftBooking,
        resetDraftBooking,
        toggleAddon,
        selectServiceForBooking,
        selectPackageForBooking,
        calculateTotal,
        submitBooking,
        createManualBooking,
        getBookingById,
        updateBooking,
        updateBookingStatus,
        deleteBooking: removeBooking,
        seedSampleDataToFirebase
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
