import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  // Sync Firebase Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const adminObj = {
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Executive Admin',
          email: firebaseUser.email,
          role: 'admin',
          token: firebaseUser.accessToken || 'firebase-admin-token'
        };
        setUser(adminObj);
        localStorage.setItem('aura_user', JSON.stringify(adminObj));
      } else {
        setUser(null);
        localStorage.removeItem('aura_user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const cleanEmail = (email || '').trim();
    const cleanPass = (password || '').trim();

    if (!cleanEmail || !cleanPass) {
      setLoading(false);
      throw new Error('Please enter both email address and password.');
    }

    try {
      // Strictly authenticate with Firebase Authentication Sign-In ONLY
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
      const fbUser = userCredential.user;

      const adminObj = {
        id: fbUser.uid,
        uid: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Executive Admin',
        email: fbUser.email,
        role: 'admin',
        token: fbUser.accessToken || 'firebase-admin-token'
      };

      setUser(adminObj);
      localStorage.setItem('aura_user', JSON.stringify(adminObj));
      setLoading(false);
      return adminObj;
    } catch (err) {
      setLoading(false);
      setUser(null);
      localStorage.removeItem('aura_user');

      console.warn('Firebase Auth Login Failure:', err.code, err.message);

      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        throw new Error('Access Denied: Invalid email or password. Account not registered in Firebase.');
      } else if (err.code === 'auth/wrong-password') {
        throw new Error('Access Denied: Incorrect password.');
      } else if (err.code === 'auth/invalid-email') {
        throw new Error('Access Denied: Invalid email address format.');
      } else {
        throw new Error('Access Denied: Invalid admin credentials.');
      }
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Sign out warning:', e);
    }
    setUser(null);
    localStorage.removeItem('aura_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user && user.role === 'admin',
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
