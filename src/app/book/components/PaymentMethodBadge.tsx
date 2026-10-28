'use client';

import { ShieldCheck, MessageCircle, QrCode, Zap, Lock } from 'lucide-react';

export default function PaymentMethodBadge() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
          3
        </div>
        <div className="flex-1 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Payment &amp; Booking Method
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Direct Host Approval &amp; UPI Payment
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Phase 1 · Direct Host UPI
          </span>
        </div>
      </div>

      {/* Info Card */}
      <div className="rounded-2xl p-4 sm:p-5 bg-linear-to-r from-sky-50/70 via-sky-50/40 to-slate-50 border border-sky-100 space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-sky-600 text-white shrink-0 shadow-xs">
            <QrCode className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span>Direct Host UPI / Google Pay / PhonePe / Bank Transfer</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              When you submit below, your booking request ticket is immediately generated and opened with Host <strong>Abhijith (+91 7012 761 588)</strong> on WhatsApp.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-sky-200/50 text-[11px] font-bold text-slate-700">
          <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-sky-100">
            <Zap className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>Host confirms in &lt; 5 mins</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-sky-100">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Host shares UPI QR directly</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-xl border border-sky-100">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Zero payment gateway surcharge</span>
          </div>
        </div>
      </div>

      {/* Phase 2 Architecture Slot Notice */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-slate-400" />
          <span>Razorpay Instant Gateway checkout architecture prepared for Phase 2.</span>
        </div>
        <span className="font-bold text-slate-500 text-[10px] uppercase tracking-wider">
          Direct Host Rate
        </span>
      </div>
    </div>
  );
}

