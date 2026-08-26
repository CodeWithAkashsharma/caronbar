import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { ShieldCheck, FileText, Lock, RefreshCw, Truck } from 'lucide-react';

export const Legal = () => {
  const [activeSection, setActiveSection] = useState('privacy');

  return (
    <>
      <SEOHead
        title="Privacy, Terms, Refund & Delivery Policy | CarOnBar"
        description="CarOnBar official privacy policy, terms and conditions, 5-7 days refund policy, and doorstep service delivery guidelines."
        canonicalPath="/legal"
      />

      <div className="pt-24 sm:pt-32 pb-20 bg-[#F8FAFC] min-h-screen text-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#8B182B] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Legal & Governance
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 uppercase italic">
              Terms & Policy Documentation
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear, transparent legal guidelines protecting your vehicle, data privacy, payments, and service satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Side Navigation */}
            <div className="lg:col-span-4 space-y-2">
              {[
                { id: 'privacy', label: 'Privacy Policy', icon: Lock },
                { id: 'terms', label: 'Terms & Conditions', icon: FileText },
                { id: 'refund', label: 'Cancellation & Refund Policy', icon: RefreshCw },
                { id: 'delivery', label: 'Service Delivery & Fulfillment', icon: Truck },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left font-display font-bold text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeSection === item.id
                      ? 'burgundy-btn shadow-md ring-1 ring-[#8B182B]'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" /> {item.label}
                </button>
              ))}

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2 hidden lg:block shadow-xs">
                <p className="font-bold text-slate-900 font-display uppercase">Merchant Details</p>
                <p><strong>Entity:</strong> CarOnBar (Naresh Gaur)</p>
                <p><strong>Address:</strong> Janakpuri, New Delhi - 110058</p>
                <p><strong>Phone:</strong> +91 87509 19105</p>
                <p><strong>Email:</strong> Carobar174@gmail.com</p>
              </div>
            </div>

            {/* Policy Content */}
            <div className="lg:col-span-8 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed font-sans">
              
              {/* PRIVACY POLICY */}
              {activeSection === 'privacy' && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display uppercase italic">1. Privacy Policy & Data Protection</h2>
                  <p>
                    <strong>CarOnBar</strong> (Operated by <strong>Naresh Gaur</strong>, Janakpuri, New Delhi - 110058) is committed to safeguarding the personal information you share with us. This policy outlines how your data is collected, stored, and utilized.
                  </p>
                  
                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Information We Collect</h3>
                  <p>
                    When using our website or booking a doorstep appointment, we collect your full name, contact number, email address, service location address, vehicle category, and vehicle registration number strictly for technician dispatch, service fulfillment, and customer support.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Payment Security & Razorpay PCI-DSS Compliance</h3>
                  <p>
                    All online payments made on CarOnBar are routed through <strong>Razorpay Payment Gateway</strong>, which adheres to strict <strong>PCI-DSS Level 1 compliance</strong> standards. CarOnBar does <strong>NOT</strong> collect, view, or retain your credit/debit card numbers, CVVs, net banking credentials, or UPI PINs.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Zero Third-Party Data Sharing</h3>
                  <p>
                    We do not sell, rent, or trade your personal data to external advertisers. Data is solely accessed by authorized CarOnBar dispatch staff and assigned technicians for service delivery.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Grievance Officer</h3>
                  <p>
                    For data protection inquiries, contact our Grievance Officer: <strong>Naresh Gaur</strong> at <strong>Carobar174@gmail.com</strong> or call <strong>+91 87509 19105</strong>. Address: Janakpuri, New Delhi - 110058, India.
                  </p>
                </div>
              )}

              {/* TERMS OF SERVICE */}
              {activeSection === 'terms' && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display uppercase italic">2. Terms & Conditions</h2>
                  <p>
                    These Terms govern the booking, scheduling, and fulfillment of doorstep car and bike wash services provided by <strong>CarOnBar</strong> (operated by <strong>Naresh Gaur</strong>, Janakpuri, New Delhi - 110058).
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Service Scope & Vehicle Access</h3>
                  <p>
                    CarOnBar provides mobile on-site vehicle washing, high-pressure foam cleaning, interior steam sanitization, and monthly wash plans. The customer agrees to provide reasonable vehicle perimeter access and legal parking space at the specified doorstep location.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Pricing & Payment Methods</h3>
                  <p>
                    All rates are listed in Indian Rupees (INR) with transparent vehicle segment pricing. Customers may complete payments via <strong>Online Gateway (Razorpay: UPI, Cards, NetBanking)</strong> or <strong>Cash on Delivery (COD)</strong> after inspecting the finished service.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Self-Sufficient Units & Customer Belongings</h3>
                  <p>
                    Our service vans carry independent soft water and power generation. Customers must remove personal valuables (cash, jewelry, electronic devices) prior to interior vacuuming. CarOnBar is not liable for loose items left unattended.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Governing Law</h3>
                  <p>
                    These terms are governed by the laws of India, and the courts of New Delhi shall have exclusive jurisdiction over any disputes.
                  </p>
                </div>
              )}

              {/* REFUND & CANCELLATION */}
              {activeSection === 'refund' && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display uppercase italic">3. Cancellation & Refund Policy</h2>
                  <p>
                    At <strong>CarOnBar</strong>, we offer a customer-friendly, transparent cancellation and refund policy in accordance with national payment gateway guidelines.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Free Cancellation & Rescheduling</h3>
                  <p>
                    Customers can cancel or reschedule any appointment slot up to <strong>2 hours prior</strong> to the scheduled booking window with zero penalty and a 100% refund on prepaid bookings.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Refund Turnaround Timeline (Razorpay Standard)</h3>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                    ⚡ Refund Credit Time: Approved refunds are processed and credited back to the customer's original payment method (Bank Account / UPI / Card) within <strong>5 to 7 working days</strong>.
                  </div>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Monthly Subscription Plans</h3>
                  <p>
                    Monthly plan holders may pause their active subscription for up to 15 days due to travel. For early cancellations, a pro-rata refund for unused washes will be credited within 5-7 business days.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">How to Request a Refund</h3>
                  <p>
                    Please email <strong>Carobar174@gmail.com</strong> or call/WhatsApp <strong>+91 87509 19105</strong> with your Booking ID. Our support team responds within 2 business hours.
                  </p>
                </div>
              )}

              {/* SERVICE DELIVERY */}
              {activeSection === 'delivery' && (
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display uppercase italic">4. Service Delivery & Fulfillment Policy</h2>
                  <p>
                    <strong>CarOnBar</strong> provides mobile on-demand doorstep automotive care services.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Fulfillment Method</h3>
                  <p>
                    Services are physically executed at the customer's doorstep address by certified CarOnBar detailers using custom mobile washing rigs equipped with soft water and power.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Service Window & Hours</h3>
                  <p>
                    Service slots are available 7 days a week, from <strong>5:00 AM to 10:00 PM IST</strong>. Technicians arrive within the chosen appointment window.
                  </p>

                  <h3 className="text-sm font-bold text-[#8B182B] uppercase">Coverage Area</h3>
                  <p>
                    Active doorstep service is delivered throughout Janakpuri, Vikaspuri, Tilak Nagar, Uttam Nagar, Dwarka, Paschim Vihar, and surrounding areas in New Delhi & Delhi NCR.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
