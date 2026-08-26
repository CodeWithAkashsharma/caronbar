import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Search, ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      category: 'doorstep',
      question: 'Does your mobile car wash unit require access to my home electricity or water tap?',
      answer: 'No. Our custom-engineered mobile car wash units are fully self-sufficient. Each van is fitted with a silent inverter generator for electric power and carries 500 liters of zero-mineral de-ionized water. We can wash your vehicle in an open driveway, subterranean garage, or private parking bay without plugging into your property.'
    },
    {
      category: 'doorstep',
      question: 'What happens if it rains on my scheduled doorstep service date?',
      answer: 'If your vehicle is parked in a covered garage or carport, our service proceeds uninterrupted. For outdoor driveway appointments during inclement weather, our concierge team will notify you 2 hours prior to reschedule your appointment with zero penalty.'
    },
    {
      category: 'ceramic',
      question: 'How long does the 9H Matrix Ceramic Armor last and does it include a warranty?',
      answer: 'Our 9H Matrix Ceramic Coating carries a written 5-Year serialized warranty. It creates a chemical bond with your clear coat that does not wash off like wax, providing continuous hydrophobic water beading and resistance against UV fading and acidic etching.'
    },
    {
      category: 'ceramic',
      question: 'What is the difference between Ceramic Coating and Paint Protection Film (PPF)?',
      answer: 'Ceramic coating is a liquid polymer chemical shield providing extreme gloss, UV resistance, and hydrophobic self-cleaning properties against light grime. PPF is a thick 195-micron TPU physical film that absorbs heavy impact from stone chips, gravel, and parking scuffs with self-healing capabilities under heat.'
    },
    {
      category: 'booking',
      question: 'Can I reschedule or cancel my booking?',
      answer: 'Yes. You can reschedule or cancel your appointment free of charge up to 4 hours prior to your selected arrival window directly through your User Dashboard or by contacting concierge.'
    },
    {
      category: 'booking',
      question: 'How are prices calculated for different vehicle classes?',
      answer: 'Prices automatically adjust using standardized surface area multipliers: Hatchback (1.0x base rate), Executive Sedan (1.2x), SUV/Crossover (1.4x), and Exotic Supercar (1.7x).'
    },
    {
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major Credit/Debit cards via secure Razorpay sandbox integration, instant UPI QR transfers (GPay, PhonePe, Paytm), and Cash on Service / Post-Inspection payment.'
    }
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="FAQ | Knowledge Base"
        description="Frequently asked questions regarding doorstep car wash setup, ceramic coating warranties, and booking procedures."
      />

      <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-[#8B182B] flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900">
              Knowledge Base & FAQ
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Everything you need to know about doorstep equipment, ceramic warranties, and vehicle specs.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions e.g. electricity, water, ceramic warranty..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#8B182B] shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { id: 'all', name: 'All Questions' },
              { id: 'doorstep', name: 'Doorstep Setup' },
              { id: 'ceramic', name: 'Ceramic & PPF' },
              { id: 'booking', name: 'Booking & Slots' },
              { id: 'payments', name: 'Payments & Warranties' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'burgundy-btn shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'bg-white border-[#8B182B] shadow-md ring-1 ring-[#8B182B]' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8B182B] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};
