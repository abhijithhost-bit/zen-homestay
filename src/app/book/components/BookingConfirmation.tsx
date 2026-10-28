'use client';

import Link from 'next/link';
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  Anchor,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import type { BookingSubmission } from '../lib/bookingTypes';
import {
  TIERS_CONFIG,
  calculateNights,
  formatFullDate,
  formatINR,
} from '../lib/pricingUtils';
import { buildWhatsAppUrl, HOST_PHONE_DISPLAY } from '../lib/whatsappTicket';

interface BookingConfirmationProps {
  submission: BookingSubmission;
}

export default function BookingConfirmation({ submission }: BookingConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const { ref, params, guest, paymentOption, totalPrice, advanceAmount, balanceAmount } = submission;
  const tierConfig = TIERS_CONFIG[params.tier] || TIERS_CONFIG['1-room'];
  const nights = calculateNights(params.checkIn, params.checkOut);
  const waUrl = buildWhatsAppUrl(submission);

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const isAdvance25 = paymentOption === '25-percent';

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Success Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Booking Request Initiated
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Thank you, {guest.name.split(' ')[0]}!
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto font-medium">
          Your booking ticket has been formatted and opened with Host Abhijith on WhatsApp.
        </p>
      </div>

      {/* Booking Reference Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-700 block">
              Booking Reference Code
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-wider">
              {ref}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyRef}
            className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-orange-300 text-orange-700 font-extrabold text-xs shadow-xs hover:bg-orange-50 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Primary Action Button: Re-open WhatsApp */}
        <div className="space-y-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base tracking-wide transition-all shadow-lg shadow-emerald-600/25 active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Open Ticket in WhatsApp with Abhijith →</span>
          </a>
          <p className="text-center text-[11px] text-slate-400 font-medium">
            If WhatsApp didn&apos;t open automatically, click above to send your ticket directly.
          </p>
        </div>

        {/* Speedboat Arrival Coordination Box */}
        <div className="rounded-2xl p-4 bg-sky-50 border border-sky-100 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-sky-600 text-white shrink-0">
            <Anchor className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="font-extrabold text-xs sm:text-sm text-sky-950">
              Complimentary Speedboat Transfer Confirmed
            </h2>
            <p className="text-xs text-sky-900/80 leading-relaxed font-medium">
              Host Abhijith will meet you at the <strong>Nehru Trophy Boat Race Finishing Point</strong> around <strong>{guest.arrivalTime}</strong> with our private speedboat for your scenic 5-minute lake transfer.
            </p>
          </div>
        </div>

        {/* Stay & Payment Summary Details */}
        <div className="divide-y divide-slate-100 text-xs">
          {/* Room & Stay */}
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="text-slate-400 font-semibold block">Room Option</span>
              <span className="font-bold text-slate-900">{tierConfig.name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Duration &amp; Dates</span>
              <span className="font-bold text-slate-900">
                {nights} {nights === 1 ? 'Night' : 'Nights'} ({formatFullDate(params.checkIn)} → {formatFullDate(params.checkOut)})
              </span>
            </div>
          </div>

          {/* Guest Details */}
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <span className="text-slate-400 font-semibold block">Primary Guest</span>
              <span className="font-bold text-slate-900">{guest.name}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">WhatsApp Contact</span>
              <span className="font-bold text-slate-900">{guest.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Party Size</span>
              <span className="font-bold text-slate-900">
                {params.guests} {params.guests === 1 ? 'Adult' : 'Adults'}
                {params.kids > 0 ? `, ${params.kids} Child` : ''}
              </span>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="py-3.5 space-y-2">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
              Payment Summary ({isAdvance25 ? '25% Advance Option' : '100% Upfront Option'})
            </span>
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span>Advance Due Now (to reserve via UPI)</span>
              <span className="font-extrabold text-orange-600 text-sm">
                {formatINR(advanceAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span>Balance Due at Check-in</span>
              <span className="font-bold text-slate-800">
                {formatINR(balanceAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-sm font-extrabold text-slate-900">
              <span>Total Stay Price</span>
              <span className="text-base font-black">
                {formatINR(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Host Contact Row */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-xs">
              A
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Host Abhijith</span>
              <span className="text-slate-500 text-[11px]">Direct Support · {HOST_PHONE_DISPLAY}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:+917012761588"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Host</span>
            </a>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Zen Homestay Homepage</span>
        </Link>
      </div>
    </div>
  );
}

