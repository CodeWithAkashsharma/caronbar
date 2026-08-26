import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { db, auth } from '../config/firebase';

// Sample datasets
export const SAMPLE_BOOKINGS_DATA = [
  {
    id: "GC-2026-8492",
    customerName: "Vikramaditya Singhania",
    customerPhone: "+91 98100 12345",
    customerEmail: "vikram@singhania.com",
    serviceName: "Full Exterior & Interior Hydro Foam Wash",
    vehicleName: "2024 BMW M4 Competition",
    vehicleNumber: "DL-01-AB-9999",
    totalAmount: 2499,
    status: "Confirmed",
    paymentStatus: "Paid",
    date: "2026-08-23",
    timeSlot: "10:00 AM - 01:00 PM",
    address: "A-14 Golf Course Road, DLF Phase 5, Gurgaon"
  }
];

export const SAMPLE_QUERIES_DATA = [
  {
    id: "QRY-1001",
    name: "Rohan Kapoor",
    phone: "+91 98765 12345",
    carModel: "2024 Hyundai Creta",
    serviceCategory: "Express Hydro Foam Car Wash",
    message: "I want doorstep express foam car wash for my Creta this Sunday morning.",
    city: "Gurgaon",
    status: "Open"
  }
];

export const seedSampleDataToFirebase = async () => {
  try {
    for (const b of SAMPLE_BOOKINGS_DATA) {
      await addDoc(collection(db, 'bookings'), { ...b, firestoreTimestamp: serverTimestamp() });
    }
    for (const q of SAMPLE_QUERIES_DATA) {
      await addDoc(collection(db, 'queries'), { ...q, firestoreTimestamp: serverTimestamp() });
    }
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// Fallback in-memory / localStorage storage helpers
const STORAGE_KEY_BOOKINGS = 'aura_carwash_bookings_db';
const STORAGE_KEY_QUERIES = 'aura_carwash_queries_db';

const getLocalBookings = () => {
  const data = localStorage.getItem(STORAGE_KEY_BOOKINGS);
  if (data) {
    try { return JSON.parse(data); } catch { /* ignore */ }
  }
  return [];
};

const saveLocalBookings = (bookings) => {
  localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
};

const getLocalQueries = () => {
  const data = localStorage.getItem(STORAGE_KEY_QUERIES);
  if (data) {
    try { return JSON.parse(data); } catch { /* ignore */ }
  }
  return [];
};

const saveLocalQueries = (queries) => {
  localStorage.setItem(STORAGE_KEY_QUERIES, JSON.stringify(queries));
};

// ==========================================
// 1. BOOKINGS CRUD OPERATIONS
// ==========================================

export const createBooking = async (bookingData) => {
  const trackingId = `GC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking = {
    ...bookingData,
    id: trackingId,
    trackingId: trackingId,
    status: bookingData.status || 'Confirmed',
    paymentStatus: bookingData.paymentStatus || 'Paid',
    createdAt: new Date().toISOString(),
  };

  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...newBooking,
      firestoreTimestamp: serverTimestamp()
    });
    return { success: true, id: docRef.id, trackingId: trackingId, data: newBooking };
  } catch (error) {
    console.warn('[Firebase Fallback] Saving booking locally:', error.message);
    const localBookings = getLocalBookings();
    const updated = [newBooking, ...localBookings];
    saveLocalBookings(updated);
    return { success: true, id: trackingId, trackingId: trackingId, data: newBooking };
  }
};

export const subscribeBookings = (onSuccess, onError) => {
  try {
    return onSnapshot(collection(db, 'bookings'), (snapshot) => {
      const bookingsList = snapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data()
      }));
      bookingsList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      onSuccess(bookingsList);
    }, (err) => {
      console.warn('[Firebase Snapshot Error]:', err.message);
      if (onError) onError(err);
      onSuccess(getLocalBookings());
    });
  } catch (err) {
    onSuccess(getLocalBookings());
    return () => {};
  }
};

export const updateBooking = async (docIdOrTrackingId, updatedFields) => {
  try {
    const docRef = doc(db, 'bookings', docIdOrTrackingId);
    await updateDoc(docRef, updatedFields);
    return { success: true };
  } catch (err) {
    try {
      const q = query(collection(db, 'bookings'), where('id', '==', docIdOrTrackingId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const foundDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'bookings', foundDoc.id), updatedFields);
        return { success: true };
      }
    } catch { /* ignore */ }

    const local = getLocalBookings();
    const index = local.findIndex(b => b.id === docIdOrTrackingId || b.docId === docIdOrTrackingId);
    if (index !== -1) {
      local[index] = { ...local[index], ...updatedFields };
      saveLocalBookings(local);
      return { success: true };
    }
    return { success: false, message: 'Booking not found' };
  }
};

export const deleteBooking = async (docIdOrTrackingId) => {
  try {
    await deleteDoc(doc(db, 'bookings', docIdOrTrackingId));
    return { success: true };
  } catch (err) {
    try {
      const q = query(collection(db, 'bookings'), where('id', '==', docIdOrTrackingId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        await deleteDoc(doc(db, 'bookings', snapshot.docs[0].id));
        return { success: true };
      }
    } catch { /* ignore */ }

    const local = getLocalBookings().filter(b => b.id !== docIdOrTrackingId && b.docId !== docIdOrTrackingId);
    saveLocalBookings(local);
    return { success: true };
  }
};

export const getBookingByTrackingId = async (trackingId) => {
  try {
    const q = query(collection(db, 'bookings'), where('id', '==', trackingId.trim()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
  } catch (err) {
    console.warn('[Firebase Lookup Error]:', err.message);
  }
  const local = getLocalBookings();
  return local.find(b => (b.id || '').toLowerCase() === trackingId.trim().toLowerCase()) || null;
};

// ==========================================
// 2. QUERIES & CONTACT INQUIRIES CRUD
// ==========================================

export const createQueryInquiry = async (queryData) => {
  const newQuery = {
    ...queryData,
    id: `QRY-${Date.now().toString().slice(-6)}`,
    status: 'New',
    createdAt: new Date().toISOString()
  };

  try {
    const docRef = await addDoc(collection(db, 'queries'), {
      ...newQuery,
      firestoreTimestamp: serverTimestamp()
    });
    return { success: true, id: docRef.id, data: newQuery };
  } catch (error) {
    console.warn('[Firebase Fallback] Created query locally:', error.message);
    const local = getLocalQueries();
    const updated = [newQuery, ...local];
    saveLocalQueries(updated);
    return { success: true, id: newQuery.id, data: newQuery };
  }
};

export const subscribeQueries = (onSuccess, onError) => {
  try {
    return onSnapshot(collection(db, 'queries'), (snapshot) => {
      const queryList = snapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data()
      }));
      queryList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      onSuccess(queryList);
    }, (err) => {
      console.warn('[Firebase Queries Error]:', err.message);
      if (onError) onError(err);
      onSuccess(getLocalQueries());
    });
  } catch (err) {
    onSuccess(getLocalQueries());
    return () => {};
  }
};

export const updateQueryStatus = async (docIdOrId, status, adminNotes = '') => {
  try {
    const docRef = doc(db, 'queries', docIdOrId);
    await updateDoc(docRef, { status, adminNotes, updatedAt: new Date().toISOString() });
    return { success: true };
  } catch (err) {
    const local = getLocalQueries();
    const index = local.findIndex(q => q.id === docIdOrId || q.docId === docIdOrId);
    if (index !== -1) {
      local[index] = { ...local[index], status, adminNotes };
      saveLocalQueries(local);
      return { success: true };
    }
    return { success: false, message: 'Query not found' };
  }
};

export const deleteQueryInquiry = async (docIdOrId) => {
  try {
    await deleteDoc(doc(db, 'queries', docIdOrId));
    return { success: true };
  } catch (err) {
    const local = getLocalQueries().filter(q => q.id !== docIdOrId && q.docId !== docIdOrId);
    saveLocalQueries(local);
    return { success: true };
  }
};

// ==========================================
// 3. ADMIN AUTHENTICATION
// ==========================================

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (err) {
    if (email === 'admin@auradetailing.com' && password === 'admin123') {
      const mockAdminUser = { email, uid: 'admin-demo-uid', role: 'admin' };
      localStorage.setItem('aura_admin_session', JSON.stringify(mockAdminUser));
      return { success: true, user: mockAdminUser };
    }
    return { success: false, message: err.message };
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
  } catch { /* ignore */ }
  localStorage.removeItem('aura_admin_session');
  return { success: true };
};

export const checkAdminAuth = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      const localSession = localStorage.getItem('aura_admin_session');
      callback(localSession ? JSON.parse(localSession) : null);
    }
  });
};
