import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, X, Shield, FileText, Truck, RefreshCw } from 'lucide-react';

export const Footer = () => {
  const [modalContent, setModalContent] = useState(null); // 'privacy' | 'terms' | 'cancellation' | 'delivery' | null

  return (
    <>
      <footer className="bg-[#0F172A] border-t border-slate-800 text-slate-400 font-sans pt-5 pb-5 sm:pt-12 sm:pb-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-8">
          
          {/* FOOTER COLUMNS: COMPACT ON MOBILE, 2-COLUMN ROW ON DESKTOP */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-12">
            
            {/* COLUMN 1: Brand Info */}
            <div className="space-y-1.5 sm:space-y-3 text-left sm:max-w-xs">
              <Link to="/" className="flex items-center gap-2 sm:gap-3">
                <img src="/logo-transparent.png" alt="CarOnBar Logo" className="h-9 sm:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(139,24,43,0.35)]" />
                <div className="flex flex-col">
                  <span className="font-display font-black text-base sm:text-2xl italic tracking-wider uppercase text-white">
                    CAR<span className="text-[#8B182B]">ON</span>BAR
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 uppercase tracking-widest -mt-0.5 font-bold">
                    DOORSTEP CAR & BIKE WASH
                  </span>
                </div>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm hidden sm:block">
                Daily Car & Bike Wash at Your Doorstep across Janakpuri & Delhi NCR. Founded by Naresh Gaur. Starting from ₹499/month.
              </p>
            </div>

            {/* COLUMN 2: Contact List (2x2 Grid on Mobile, Vertical on Desktop) */}
            <div className="space-y-1 sm:space-y-3 text-left sm:ml-auto p-0 bg-transparent border-0 w-full sm:w-auto">
              <h4 className="hidden sm:block text-xs font-display font-black italic uppercase tracking-wider text-white">
                DOORSTEP COVERAGE & SUPPORT
              </h4>
              <ul className="grid grid-cols-2 sm:flex sm:flex-col gap-x-4 min-[360px]:gap-x-6 sm:gap-x-0 gap-y-2 sm:gap-y-2 text-[9px] min-[360px]:text-[10px] sm:text-xs">
                <li className="flex items-center gap-1.5 sm:gap-2 text-left min-w-0">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B182B] shrink-0" />
                  <a href="tel:8750919105" className="hover:text-white transition-colors truncate">+91 87509 19105</a>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2 text-left min-w-0">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B182B] shrink-0" />
                  <a href="mailto:Carobar174@gmail.com" className="hover:text-white transition-colors truncate">Carobar174@gmail.com</a>
                </li>
                <li className="flex items-center sm:items-start gap-1.5 sm:gap-2 text-left min-w-0">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B182B] shrink-0 sm:mt-0.5" />
                  <span className="truncate sm:line-clamp-2">Janakpuri, New Delhi - 110058</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2 text-left min-w-0">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8B182B] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <a
                    href="https://www.instagram.com/car.on.bar/?utm_source=ig_web_button_share_sheet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors truncate"
                  >
                    @car.on.bar
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Footer Row: Full Row Width with Full Policy Text */}
          <div className="pt-3 sm:pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[9px] sm:text-xs text-slate-400 font-mono">
            <p className="text-center sm:text-left">© 2026 CarOnBar (Naresh Gaur). All rights reserved.</p>

            {/* FULL TEXT PRIVACY POLICY, TERMS & CONDITIONS, REFUND POLICY, DELIVERY POLICY */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-0.5 min-[340px]:gap-1 min-[380px]:gap-1.5 sm:gap-4 text-[6.5px] min-[340px]:text-[7px] min-[380px]:text-[8px] sm:text-[11px] flex-nowrap whitespace-nowrap overflow-x-hidden">
              <button
                type="button"
                onClick={() => setModalContent('privacy')}
                className="text-[#8B182B] sm:text-slate-400 hover:text-[#8B182B] underline underline-offset-2 sm:underline-offset-4 transition-colors font-bold uppercase cursor-pointer shrink-0"
              >
                Privacy Policy
              </button>
              <span className="text-slate-600 shrink-0">•</span>
              <button
                type="button"
                onClick={() => setModalContent('terms')}
                className="text-[#8B182B] sm:text-slate-400 hover:text-[#8B182B] underline underline-offset-2 sm:underline-offset-4 transition-colors font-bold uppercase cursor-pointer shrink-0"
              >
                Terms & Conditions
              </button>
              <span className="text-slate-600 shrink-0">•</span>
              <button
                type="button"
                onClick={() => setModalContent('cancellation')}
                className="text-[#8B182B] sm:text-slate-400 hover:text-[#8B182B] underline underline-offset-2 sm:underline-offset-4 transition-colors font-bold uppercase cursor-pointer shrink-0"
              >
                Refund Policy
              </button>
              <span className="text-slate-600 shrink-0">•</span>
              <button
                type="button"
                onClick={() => setModalContent('delivery')}
                className="text-[#8B182B] sm:text-slate-400 hover:text-[#8B182B] underline underline-offset-2 sm:underline-offset-4 transition-colors font-bold uppercase cursor-pointer shrink-0"
              >
                Service Delivery
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* POPUP MODAL FOR PRIVACY POLICY, TERMS & CONDITIONS, CANCELLATION & REFUND POLICY, SERVICE DELIVERY POLICY */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#141520] border border-[#8B182B]/50 rounded-2xl p-5 sm:p-8 shadow-[0_0_50px_rgba(224,86,56,0.3)] text-gray-200 space-y-4 my-auto max-h-[75vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-lg bg-white/5 border border-white/10 transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-3 shrink-0">
              {modalContent === 'privacy' && <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B182B]" />}
              {modalContent === 'terms' && <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B182B]" />}
              {modalContent === 'cancellation' && <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B182B]" />}
              {modalContent === 'delivery' && <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B182B]" />}
              <h3 className="font-display font-black italic text-base sm:text-2xl text-white uppercase tracking-wider">
                {modalContent === 'privacy' && 'Privacy Policy'}
                {modalContent === 'terms' && 'Terms & Conditions'}
                {modalContent === 'cancellation' && 'Cancellation & Refund Policy'}
                {modalContent === 'delivery' && 'Service Delivery & Fulfillment Policy'}
              </h3>
            </div>

            {/* Modal Body - Smooth Vertical Scroll Container */}
            <div className="flex-1 overflow-y-auto overscroll-contain pr-2 space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans custom-scrollbar">
              
              {/* 1. PRIVACY POLICY */}
              {modalContent === 'privacy' && (
                <>
                  <p className="text-slate-300">
                    <strong>CarOnBar</strong> (Operated by <strong>Naresh Gaur</strong>, Janakpuri, New Delhi - 110058) is committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your personal data when you use our doorstep automotive cleaning and wash reservation platform.
                  </p>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      1. Information We Collect
                    </h4>
                    <p className="text-slate-300">
                      When you book a wash or submit an inquiry, we collect:
                    </p>
                    <ul className="list-disc pl-5 space-y-0.5 text-slate-300">
                      <li><strong>Personal Identification:</strong> Full Name, Email Address, and Mobile Contact Number.</li>
                      <li><strong>Service Delivery Address:</strong> Street address, locality, landmark, city, and pincode.</li>
                      <li><strong>Vehicle Details:</strong> Vehicle category (Hatchback, Sedan, SUV, 2-Wheeler), model name, and vehicle registration number.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      2. Payment Processing & Razorpay PCI-DSS Compliance
                    </h4>
                    <p className="text-slate-300">
                      All online payments made on CarOnBar are processed securely through <strong>Razorpay Payment Gateway</strong>. Razorpay adheres to the strictest <strong>PCI-DSS (Payment Card Industry Data Security Standard) Level 1</strong> compliance. CarOnBar does <strong>NOT</strong> collect, view, or store your credit/debit card numbers, CVVs, net banking credentials, or UPI PINs.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      3. How We Use Your Information
                    </h4>
                    <p className="text-slate-300">
                      Your information is used strictly to dispatch mobile detailing units to your location, send booking confirmations & status updates via WhatsApp/SMS, process billing, and respond to customer queries. We do not sell, rent, or lease customer data to third-party marketing companies.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      4. Data Security & Retention
                    </h4>
                    <p className="text-slate-300">
                      We implement 256-bit SSL encryption across our web platform to protect your data during transit and maintain secure cloud databases for service history.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      5. Contact Grievance Officer
                    </h4>
                    <p className="text-slate-300">
                      For any questions or privacy concerns, please contact our Grievance Officer: <strong>Naresh Gaur</strong> at <strong>Carobar174@gmail.com</strong> or call <strong>+91 87509 19105</strong>. Address: Janakpuri, New Delhi - 110058, India.
                    </p>
                  </div>
                </>
              )}

              {/* 2. TERMS & CONDITIONS */}
              {modalContent === 'terms' && (
                <>
                  <p className="text-slate-300">
                    These Terms & Conditions constitute a legally binding agreement between you ("Customer") and <strong>CarOnBar</strong> ("Service Provider", operated by <strong>Naresh Gaur</strong>, having operational base at Janakpuri, New Delhi - 110058) regarding the booking and fulfillment of doorstep vehicle cleaning services.
                  </p>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      1. Scope of Services
                    </h4>
                    <p className="text-slate-300">
                      CarOnBar provides mobile on-site vehicle care services including exterior high-pressure snow foam wash, interior steam cleaning & sanitization, chassis underbody blast, and recurring monthly subscriptions for cars and two-wheelers across Janakpuri and Delhi NCR.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      2. Booking, Pricing & Payment Modes
                    </h4>
                    <p className="text-slate-300">
                      All prices listed on the website are in Indian National Rupees (INR) and are transparent based on vehicle size. Customers can pay via <strong>Online Gateway (Razorpay: UPI, Cards, NetBanking, Wallets)</strong> or via <strong>Cash on Delivery (COD) / Pay After Service</strong> upon satisfactory inspection.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      3. Customer Obligations & Site Access
                    </h4>
                    <p className="text-slate-300">
                      The customer must ensure legal permission and reasonable space for vehicle washing at the designated doorstep location. Customers must remove personal valuables (cash, jewelry, electronic devices) prior to interior service. CarOnBar is not liable for loose items left unattended inside vehicles.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      4. Self-Contained Equipment
                    </h4>
                    <p className="text-slate-300">
                      Our service rigs carry independent soft water tanks and power generation equipment to ensure zero dependence on customer home utility connections.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      5. Limitation of Liability & Governing Law
                    </h4>
                    <p className="text-slate-300">
                      Pre-existing paint chipping, deep clearcoat swirl marks, or cracked trims existing prior to wash will be recorded during initial inspection and are not the liability of CarOnBar. These terms are governed by the laws of India, and any disputes are subject to the exclusive jurisdiction of the courts of New Delhi.
                    </p>
                  </div>
                </>
              )}

              {/* 3. CANCELLATION & REFUND POLICY */}
              {modalContent === 'cancellation' && (
                <>
                  <p className="text-slate-300">
                    At <strong>CarOnBar</strong>, customer satisfaction and transparent billing are our top priorities. Please review our official Cancellation and Refund Policy below:
                  </p>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      1. Free Cancellation & Rescheduling Policy
                    </h4>
                    <p className="text-slate-300">
                      Customers may cancel or reschedule their service booking up to <strong>2 hours prior</strong> to the scheduled appointment slot with <strong>zero penalty</strong> and 100% full refund for prepaid orders.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      2. Refund Eligibility & Turnaround Timeline (Razorpay Standard)
                    </h4>
                    <p className="text-slate-300">
                      If an online payment was completed via Razorpay and a cancellation is initiated before dispatch, or if a service issue cannot be rectified upon inspection, an approved refund is immediately initiated.
                    </p>
                    <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold text-xs mt-1">
                      ⚡ Refund Credit Timeline: All approved refunds are credited back to the customer's original payment source (UPI ID / Bank Account / Credit or Debit Card) within <strong>5 to 7 working days</strong>.
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      3. Monthly Subscription Pause & Pro-Rata Refund
                    </h4>
                    <p className="text-slate-300">
                      Monthly wash package holders who are traveling can pause their subscription for up to 15 days, with unused service visits rolling over. If a customer wishes to terminate a monthly package early, a pro-rata refund for unused washes will be processed within 5-7 business days.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      4. 100% Touch-Up Quality Guarantee
                    </h4>
                    <p className="text-slate-300">
                      If you notice any missed spot immediately following your doorstep service, our technician will perform an on-the-spot touch-up free of charge.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      5. How to Initiate a Refund Request
                    </h4>
                    <p className="text-slate-300">
                      To request a refund or cancellation, please email <strong>Carobar174@gmail.com</strong> or call/WhatsApp <strong>+91 87509 19105</strong> with your Booking ID. Our support team responds within 2 business hours.
                    </p>
                  </div>
                </>
              )}

              {/* 4. SERVICE DELIVERY & FULFILLMENT POLICY */}
              {modalContent === 'delivery' && (
                <>
                  <p className="text-slate-300">
                    <strong>CarOnBar</strong> provides on-demand doorstep automotive care and mobile car wash services. As our services are delivered physically to your premises, please refer to our Service Delivery and Fulfillment Policy:
                  </p>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      1. Method of Delivery
                    </h4>
                    <p className="text-slate-300">
                      All services are delivered physically by trained CarOnBar mobile technicians arriving at the customer's specified doorstep address with custom self-powered wash rigs.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      2. Delivery Operating Hours & Slots
                    </h4>
                    <p className="text-slate-300">
                      Services are fulfilled 7 days a week, between <strong>5:00 AM and 10:00 PM IST</strong>. Technicians arrive within the chosen 2-hour appointment window selected during booking.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      3. Operational Coverage Areas
                    </h4>
                    <p className="text-slate-300">
                      We provide active doorstep service delivery across Janakpuri, Vikaspuri, Tilak Nagar, Uttam Nagar, Dwarka, Rajouri Garden, Paschim Vihar, and surrounding areas in New Delhi & Delhi NCR.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white uppercase text-xs text-[#8B182B]">
                      4. Delay & Rescheduling Due to Inclement Weather
                    </h4>
                    <p className="text-slate-300">
                      In the event of extreme weather (e.g. heavy monsoon rain or severe storm), our dispatch team will immediately notify you via phone/WhatsApp to reschedule your slot or offer a full instant refund if preferred.
                    </p>
                  </div>
                </>
              )}

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/10 flex justify-end shrink-0">
              <button
                onClick={() => setModalContent(null)}
                className="px-5 py-2 rounded-xl bg-[#8B182B] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#A61C33] transition-colors cursor-pointer"
              >
                Close Policy
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
