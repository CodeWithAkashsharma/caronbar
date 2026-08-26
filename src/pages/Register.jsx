import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { useAuth } from '../context/AuthContext';
import { Sparkles, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    try {
      await register(name, email, phone, password);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg('Error creating account. Please try again.');
    }
  };

  return (
    <>
      <SEOHead
        title="Register | Create CARONBAR Account"
        description="Join CARONBAR for VIP slot reservations, monthly wash tracking, and doorstep car wash history."
        canonicalPath="/register"
      />

      <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen flex items-center justify-center text-slate-800">
        <div className="w-full max-w-md mx-auto px-4 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#8B182B] shadow-md mx-auto flex items-center justify-center mb-3 text-white">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Create Account</h1>
            <p className="text-xs text-slate-600">
              Join 50,000+ automobile owners receiving doorstep care.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rohan Kapoor"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rohan@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B]"
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
                className="w-full py-3.5 rounded-xl burgundy-btn font-display font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Registering Account...' : 'Complete Registration →'}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#8B182B] font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
