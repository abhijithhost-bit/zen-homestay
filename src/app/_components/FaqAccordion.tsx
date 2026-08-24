'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface Faq {
  q: string;
  a: string;
}

interface Props {
  faqs: Faq[];
}

export default function FaqAccordion({ faqs }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div id="faq" className="scroll-mt-24">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-sky-600" />
        <span className="text-xs font-extrabold tracking-wider text-sky-700 uppercase">Frequently Asked Questions</span>
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
        Everything You Need to Know About Your Stay
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-colors"
          >
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                  openFaq === idx ? 'transform rotate-180 text-orange-600' : ''
                }`}
              />
            </button>
            {openFaq === idx && (
              <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
