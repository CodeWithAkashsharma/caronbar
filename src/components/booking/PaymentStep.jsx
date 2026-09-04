import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/formatters';
import { CreditCard, Banknote, Sparkles, CheckCircle2, MessageCircle, X, ShieldCheck, AlertCircle, Key, Check } from 'lucide-react';

// Helper to dynamically load official Razorpay SDK
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const PaymentStep = ({ onPrev }) => {
  const { draftBooking, updateDraftBooking, calculatePricingSummary, calculateTotal, submitBooking, resetDraftBooking } = useBooking();
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTestSimulatorModal, setShowTestSimulatorModal] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const navigate = useNavigate();

  const pricing = calculatePricingSummary ? calculatePricingSummary(draftBooking) : null;
  const currentTotal = pricing ? pricing.finalTotal : (typeof calculateTotal === 'function' ? Number(calculateTotal(draftBooking)) || 0 : 0);
  
  const paymentMethod = draftBooking.paymentMethod || 'razorpay';
  const customKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const hasRealKey = customKey && !customKey.includes('51e948f21bb700');

  const handleSelectPaymentMethod = (method) => {
    setPaymentError('');
    updateDraftBooking({ paymentMethod: method });
  };

  // COMPLETE PAYMENT SUCCESS
  const handlePaymentSuccess = async (transactionId, orderId = '') => {
    setSubmitting(true);
    try {
      const confirmed = await submitBooking({
        paymentMethod: 'razorpay',
        paymentStatus: 'Paid',
        transactionId: transactionId || `RZP-${Date.now()}`,
        orderId: orderId || ''
      });
      setSubmitting(false);
      setShowTestSimulatorModal(false);
      setConfirmedBookingId(confirmed.id || 'GC-2026-OK');
      setShowSuccessModal(true);
    } catch (err) {
      setSubmitting(false);
      setShowTestSimulatorModal(false);
      setPaymentError('Booking recorded with payment reference, but an error occurred saving details. Our support will contact you.');
    }
  };

  // RAZORPAY STANDARD ONLINE CHECKOUT HANDLER
  const handleRazorpayPayment = async () => {
    setPaymentError('');
    setSubmitting(true);

    // Safety timeout: Ensure button NEVER gets stuck in "Processing..." state
    const safetyTimer = setTimeout(() => {
      setSubmitting(false);
    }, 3000);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      clearTimeout(safetyTimer);
      setPaymentError('Unable to load Razorpay checkout script. Please check your internet connection or choose Cash on Delivery.');
      setSubmitting(false);
      return;
    }

    const amountInPaise = Math.max(100, Math.round(currentTotal * 100));

    try {
      // STEP 1: BACKEND - Create Order (optional for standard checkout)
      let orderId = '';
      let orderAmount = amountInPaise;
      let orderCurrency = 'INR';

      try {
        const orderRes = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`,
            notes: {
              customer: draftBooking.contact.fullName || 'Customer',
              vehicle: `${draftBooking.vehicleTypeId} - ${draftBooking.contact.vehicleModel || ''}`,
              address: `${draftBooking.address.streetAddress || ''}, Janakpuri, Delhi NCR`
            }
          })
        });

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          if (orderData.success && orderData.order_id) {
            orderId = orderData.order_id;
            orderAmount = orderData.amount;
            orderCurrency = orderData.currency || 'INR';
          }
        }
      } catch (orderErr) {
        console.warn('Backend create-order call failed, proceeding with standard client options:', orderErr);
      }

      // STEP 2: FRONTEND - Razorpay Standard Checkout Modal
      const options = {
        key: customKey || 'rzp_test_TU5rjqCa0ybKOn',
        amount: orderAmount,
        currency: orderCurrency,
        name: 'CARONBAR',
        description: `${draftBooking.itemType === 'package' ? 'Monthly Package' : 'Doorstep Wash'} - ${draftBooking.contact.fullName || 'Valued Customer'}`,
        image: typeof window !== 'undefined' ? `${window.location.origin}/razorpay_logo.png` : '/razorpay_logo.png',
        order_id: orderId || undefined,
        prefill: {
          name: draftBooking.contact.fullName || '',
          email: draftBooking.contact.email || 'customer@caronbar.in',
          contact: draftBooking.contact.phone || '',
        },
        theme: {
          color: '#8B182B',
        },
        notes: {
          address: `${draftBooking.address.streetAddress || ''}, ${draftBooking.address.locality || ''}, Janakpuri, Delhi NCR`,
          vehicle: `${draftBooking.vehicleTypeId} - ${draftBooking.contact.vehicleModel || 'Vehicle'}`
        },
        handler: async function (response) {
          clearTimeout(safetyTimer);
          // STEP 3: BACKEND - Verify Signature
          if (response.razorpay_signature && response.razorpay_order_id) {
            try {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });
              const verifyData = await verifyRes.json();

              if (!verifyData.success) {
                setSubmitting(false);
                setPaymentError('Payment verification failed. Please contact customer support with payment reference.');
                return;
              }
            } catch (vErr) {
              console.warn('Signature verification request warning:', vErr);
            }
          }

          await handlePaymentSuccess(response.razorpay_payment_id, response.razorpay_order_id);
        },
        modal: {
          ondismiss: function () {
            clearTimeout(safetyTimer);
            setSubmitting(false);
            setPaymentError('Payment window was closed or cancelled. You can retry payment or choose Cash on Delivery.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        clearTimeout(safetyTimer);
        setSubmitting(false);
        setPaymentError(`Payment failed: ${resp.error?.description || 'Gateway declined'}. Please try again or choose Cash on Delivery.`);
      });

      rzp.open();
    } catch (err) {
      clearTimeout(safetyTimer);
      console.error('Razorpay Checkout Launch Error:', err);
      setSubmitting(false);
      setPaymentError('Could not open Razorpay gateway. Please check your network or try again.');
    }
  };

  // CASH ON DELIVERY HANDLER
  const handleCashBooking = async () => {
    setPaymentError('');
    setSubmitting(true);
    try {
      const confirmed = await submitBooking({
        paymentMethod: 'cash_on_delivery',
        paymentStatus: 'Pending',
        transactionId: 'PAY-AFTER-WASH'
      });
      setSubmitting(false);
      setConfirmedBookingId(confirmed.id || 'GC-2026-OK');
      setShowSuccessModal(true);
    } catch (err) {
      setSubmitting(false);
      setPaymentError('Failed to record booking. Please try again.');
    }
  };

  const handleMainAction = () => {
    if (paymentMethod === 'razorpay') {
      if (!hasRealKey) {
        setShowTestSimulatorModal(true);
      } else {
        handleRazorpayPayment();
      }
    } else {
      handleCashBooking();
    }
  };

  const handleCloseAndGoHome = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      resetDraftBooking();
    }, 150);
  };

  // Auto redirect directly to Home page after 4 seconds
  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      timer = setTimeout(() => {
        navigate('/', { replace: true });
        setTimeout(() => {
          resetDraftBooking();
        }, 150);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal, navigate, resetDraftBooking]);

  return (
    <div className="space-y-4 sm:space-y-6 font-sans">
      <div className="text-center max-w-xl mx-auto space-y-1 sm:space-y-2">
        <h3 className="text-sm min-[360px]:text-base sm:text-xl font-display font-bold text-[#0F172A] uppercase whitespace-nowrap">
          Choose Payment Mode
        </h3>
        <p className="hidden sm:block text-xs text-slate-600 leading-relaxed">
          Pay online securely via Razorpay (UPI, Cards, NetBanking) or choose Cash on Delivery.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
        
        {/* PAYMENT OPTIONS: 2 Clean Options (Razorpay Online vs Cash on Delivery) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          
          {/* Option 1: Razorpay Online (UPI, Cards, NetBanking) */}
          <button
            type="button"
            onClick={() => handleSelectPaymentMethod('razorpay')}
            className={`p-2 min-[360px]:p-3 sm:p-5 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              paymentMethod === 'razorpay'
                ? 'bg-rose-50/80 border-2 border-[#8B182B] shadow-md ring-2 ring-[#8B182B]/20'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1 sm:mb-3 gap-1">
                <CreditCard className={`w-4 h-4 sm:w-6 sm:h-6 shrink-0 ${paymentMethod === 'razorpay' ? 'text-[#8B182B]' : 'text-slate-500'}`} />
                <span className="text-[7px] min-[360px]:text-[8px] sm:text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 px-1 sm:px-2 py-0.2 sm:py-0.5 rounded-full border border-emerald-200 shrink-0">
                  Instant
                </span>
              </div>
              <p className="text-[10px] min-[360px]:text-xs sm:text-sm font-bold text-slate-900 leading-tight">1. Online Payment</p>
              <p className="text-[8px] min-[360px]:text-[9px] sm:text-xs text-slate-500 leading-tight mt-0.5">UPI, GPay, Cards, NetBanking</p>
            </div>
            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[8px] sm:text-[10px] text-emerald-700 font-bold">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Razorpay Secured</span>
            </div>
          </button>

          {/* Option 2: Cash on Delivery / Pay After Service */}
          <button
            type="button"
            onClick={() => handleSelectPaymentMethod('cash')}
            className={`p-2 min-[360px]:p-3 sm:p-5 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              paymentMethod === 'cash'
                ? 'bg-rose-50/80 border-2 border-[#8B182B] shadow-md ring-2 ring-[#8B182B]/20'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1 sm:mb-3 gap-1">
                <Banknote className={`w-4 h-4 sm:w-6 sm:h-6 shrink-0 ${paymentMethod === 'cash' ? 'text-[#8B182B]' : 'text-slate-500'}`} />
                <span className="text-[7px] min-[360px]:text-[8px] sm:text-[10px] font-mono font-bold uppercase bg-[#8B182B]/10 text-[#8B182B] px-1 sm:px-2 py-0.2 sm:py-0.5 rounded-full border border-[#8B182B]/20 shrink-0">
                  COD
                </span>
              </div>
              <p className="text-[10px] min-[360px]:text-xs sm:text-sm font-bold text-slate-900 leading-tight">2. Cash on Delivery</p>
              <p className="text-[8px] min-[360px]:text-[9px] sm:text-xs text-slate-500 leading-tight mt-0.5">Pay after wash inspection</p>
            </div>
            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-[8px] sm:text-[10px] text-slate-600 font-medium">
              <CheckCircle2 className="w-3 h-3 text-[#8B182B] shrink-0" />
              <span>Zero Advance Fee</span>
            </div>
          </button>

        </div>

        {/* Payment Error Alert (if payment cancelled/failed) */}
        {paymentError && (
          <div className="p-3 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex flex-col gap-2 animate-fadeIn shadow-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold">
                <p>{paymentError}</p>
              </div>
              <button
                onClick={() => setPaymentError('')}
                className="text-red-400 hover:text-red-800 p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-red-200/60">
              <button
                type="button"
                onClick={() => {
                  setPaymentError('');
                  handleSelectPaymentMethod('cash_on_delivery');
                }}
                className="px-2.5 py-1 rounded-md bg-white border border-red-300 text-[#8B182B] text-[10px] font-bold hover:bg-red-50 transition-colors cursor-pointer"
              >
                💵 Switch to Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentError('');
                  setShowTestSimulatorModal(true);
                }}
                className="px-2.5 py-1 rounded-md bg-[#8B182B] text-white text-[10px] font-bold hover:bg-[#6e1322] transition-colors cursor-pointer"
              >
                ⚡ Test Payment Simulator
              </button>
            </div>
          </div>
        )}

        {/* Selected Option Detail Box */}
        <div className="p-3 min-[360px]:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200 space-y-2 sm:space-y-3 shadow-xs">
          {paymentMethod === 'razorpay' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-[#8B182B]">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Instant Online Checkout via Razorpay</h4>
                    <p className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-slate-500">Supports Google Pay, PhonePe, Paytm, BHIM UPI, Visa, Mastercard, RuPay & NetBanking.</p>
                  </div>
                </div>
              </div>
              <div className="p-2 sm:p-3 rounded-lg bg-slate-50 border border-slate-100 text-[9px] min-[360px]:text-[10px] sm:text-xs text-slate-600 flex items-center justify-between">
                <span>Final Payable Amount:</span>
                <span className="font-mono font-black text-xs sm:text-base text-[#8B182B]">{formatCurrency(currentTotal)}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#8B182B] font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#8B182B]" /> Pay After Inspection Guarantee
              </div>
              <p className="text-slate-600 leading-relaxed text-[10px] sm:text-xs">
                No advance payment needed. Inspect your vehicle shine & interior sanitization with our Master Detailer upon service completion, then pay via Cash or UPI.
              </p>
            </div>
          )}
        </div>

        {/* Final Action Button */}
        <div className="pt-1.5 sm:pt-2">
          <button
            type="button"
            onClick={handleMainAction}
            disabled={submitting}
            className="w-full py-2.5 sm:py-4 rounded-xl sm:rounded-2xl burgundy-btn text-white font-bold text-[11px] sm:text-sm shadow-lg transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-white" /> Processing...
              </span>
            ) : paymentMethod === 'razorpay' ? (
              <span>Pay Online via Razorpay ({formatCurrency(currentTotal)}) →</span>
            ) : (
              <span>Confirm Booking (Pay on Service) →</span>
            )}
          </button>
        </div>

      </div>

      <div className="flex items-center justify-between pt-1 sm:pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-[10px] sm:text-xs transition-colors cursor-pointer border border-slate-200"
        >
          ← Back to Address
        </button>
      </div>

      {/* RAZORPAY TEST GATEWAY SIMULATOR MODAL (Shown when testing without client live/test key) */}
      {showTestSimulatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            
            <button
              onClick={() => setShowTestSimulatorModal(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-800 p-1 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 text-[#8B182B] mx-auto flex items-center justify-center shadow-sm">
              <CreditCard className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="inline-block text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-widest">
                Razorpay Sandbox Simulator
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                Simulate Online Payment
              </h3>
              <p className="text-xs text-slate-600">
                Amount: <strong className="text-[#8B182B]">{formatCurrency(currentTotal)}</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1.5 font-sans">
              <p className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                <Key className="w-3.5 h-3.5 text-[#8B182B]" /> Real Key Setup:
              </p>
              <p className="text-[11px] text-slate-500">
                To open the actual Razorpay popup, add your client's API Key to <code>.env</code> file:
              </p>
              <code className="block bg-slate-900 text-emerald-400 px-2.5 py-1.5 rounded text-[10px] font-mono select-all">
                VITE_RAZORPAY_KEY_ID=rzp_test_...
              </code>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => handlePaymentSuccess(`SIM_PAY_${Date.now()}`)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Simulate Successful Payment (₹{currentTotal})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowTestSimulatorModal(false);
                  setPaymentError('Simulated: Payment cancelled by user.');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Simulate Cancel / Failure
              </button>
            </div>

          </div>
        </div>
      )}

      {/* POPUP MODAL: BOOKING CONFIRMED + WHATSAPP NOTIFICATION (NO DOWNLOAD INVOICE BUTTON) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            
            <button
              onClick={handleCloseAndGoHome}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-800 p-1 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-block text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest">
                ID: {confirmedBookingId}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">Booking Confirmed!</h3>
              
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-2 text-emerald-700 text-xs sm:text-sm font-semibold font-sans">
                <MessageCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>You will get details on your WhatsApp soon.</span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleCloseAndGoHome}
                className="w-full py-3 rounded-xl burgundy-btn text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Go to Home Now →
              </button>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#8B182B] h-full w-full animate-[shrink_3.5s_linear_forwards]"></div>
              </div>
              <p className="text-[10px] font-mono text-slate-400">Auto redirecting to Home in 3 seconds...</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
