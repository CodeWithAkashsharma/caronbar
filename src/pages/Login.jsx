import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email address and password.');
      return;
    }

    try {
      await login(email, password);
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate('/admin');
      }, 600);
    } catch (err) {
      setErrorMsg(err.message || 'Firebase Authentication Failed: Invalid credentials.');
    }
  };

  return (
    <>
      <SEOHead
        title="Firebase Admin Authentication | CARONBAR"
        description="Sign in to the CARONBAR executive admin portal using Firebase Authentication."
      />

      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col relative overflow-hidden">
        
        {/* TOP HEADER BAR */}
        <header className="bg-[#121720] border-b border-white/10 w-full shrink-0 z-10">
          <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 select-none hover:opacity-90 transition-opacity">
              <span className="font-display font-black text-lg sm:text-2xl italic tracking-wider uppercase text-white">
                CAR<span className="text-[#8B182B] font-black">ONBAR</span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#8B182B] bg-[#8B182B]/20 px-2 py-0.5 rounded border border-[#8B182B]/30 uppercase whitespace-nowrap">
                ADMIN AUTHENTICATION
              </span>
            </Link>
          </div>
        </header>

        {/* CENTERED LOGIN FORM CONTAINER */}
        <div className="flex-1 flex items-center justify-center p-4 py-12 z-10">
          <div className="w-full max-w-md mx-auto space-y-5">
            
            {/* Welcome Admin Header Title */}
            <div className="text-center space-y-2">
              <span className="inline-block text-[10px] sm:text-xs font-mono font-bold text-[#8B182B] bg-[#8B182B]/10 px-3.5 py-1 rounded-full border border-[#8B182B]/20 uppercase tracking-widest">
                FIREBASE PROTECTED PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-wide">Executive Admin Portal</h1>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Enter your Firebase registered email address and password to access the admin dashboard.
              </p>
            </div>

            {/* Main Admin Login Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5 relative">
              
              {/* Error Popup Alert Toast */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-start gap-2.5 shadow-sm">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="block text-red-800 font-bold text-[11px] uppercase tracking-wider mb-0.5">Firebase Auth Error</strong>
                    {errorMsg}
                  </div>
                </div>
              )}

              {/* Success Toast Box */}
              {showSuccessToast && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium flex items-center gap-2.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Authenticated successfully! Opening dashboard...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5 uppercase font-mono">Firebase Admin Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                      placeholder="Enter admin email ID..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5 uppercase font-mono">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                      placeholder="Enter password..."
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B] transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl burgundy-btn text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {loading ? 'Authenticating with Firebase...' : 'Sign In with Firebase →'}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};
