import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using environment variables from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAgbAW5NIhkdAX09ezuVFZ8maKFixsTHM0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "carwashservice-b7df8.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "carwashservice-b7df8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "carwashservice-b7df8.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "350857895771",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:350857895771:web:fab6d6956ee50abd52847e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EM00TR8F9G"
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
