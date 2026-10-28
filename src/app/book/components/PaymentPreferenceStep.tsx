'use client';

import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import type { PaymentOption } from '../lib/bookingTypes';
import { formatINR } from '../lib/pricingUtils';

interface PaymentPreferenceStepProps {
  paymentOption: PaymentOption;
  totalPrice: number;
  advance25: number;
  balance25: number;
  onChange: (option: PaymentOption) => void;
}

export default function PaymentPreferenceStep({
  paymentOption,
  totalPrice,
  advance25,
  balance25,
  onChange,
}: PaymentPreferenceStepProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
          2
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Payment Preference
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Lock your dates with a flexible 25% deposit or pay in full
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Option A: 25% Advance */}
        <button
          type="button"
          onClick={() => onChange('25-percent')}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
            paymentOption === '25-percent'
              ? 'border-orange-500 bg-orange-50/50 shadow-sm ring-2 ring-orange-200'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Most Popular
              </span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentOption === '25-percent'
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {paymentOption === '25-percent' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1">
              Pay 25% Advance Deposit
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Secure and guarantee your dates today. Remaining balance is payable at check-in.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Pay Today
              </span>
              <span className="text-lg sm:text-xl font-black text-orange-600">
                {formatINR(advance25)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Balance at check-in
              </span>
              <span className="text-xs font-bold text-slate-700">
                {formatINR(balance25)}
              </span>
            </div>
          </div>
        </button>

        {/* Option B: 100% Full Upfront */}
        <button
          type="button"
          onClick={() => onChange('100-percent')}
          className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
            paymentOption === '100-percent'
              ? 'border-orange-500 bg-orange-50/50 shadow-sm ring-2 ring-orange-200'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Peace of Mind
              </span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentOption === '100-percent'
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {paymentOption === '100-percent' && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>

            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1">
              Pay 100% in Full Upfront
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Clear your entire stay cost now. Zero hassles or payments needed when arriving by boat.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Due Today
              </span>
              <span className="text-lg sm:text-xl font-black text-slate-900">
                {formatINR(totalPrice)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                At Check-in
              </span>
              <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ₹0 Due
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

