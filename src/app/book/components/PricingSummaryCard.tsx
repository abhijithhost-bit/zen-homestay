'use client';

import Image from 'next/image';
import { Star, Anchor, Coffee, ShieldCheck, Waves } from 'lucide-react';
import type { BookingParams, PaymentOption } from '../lib/bookingTypes';
import { TIERS_CONFIG, computePriceBreakdown, formatINR } from '../lib/pricingUtils';
import type { DayAvailability } from '@/lib/supabase';

interface PricingSummaryCardProps {
  params: BookingParams;
  paymentOption: PaymentOption;
  availability?: Record<string, DayAvailability>;
}

export default function PricingSummaryCard({
  params,
  paymentOption,
  availability,
}: PricingSummaryCardProps) {
  const tierConfig = TIERS_CONFIG[params.tier] || TIERS_CONFIG['1-room'];
  const breakdown = computePriceBreakdown(params, availability);

  const isAdvance25 = paymentOption === '25-percent';
  const payToday = isAdvance25 ? breakdown.advance25 : breakdown.advance100;
  const payAtCheckin = isAdvance25 ? breakdown.balance25 : breakdown.balance100;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xl space-y-5 lg:sticky lg:top-24">
      {/* Thumbnail + Room Title */}
      <div className="space-y-3 pb-4 border-b border-slate-100">
        <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden shadow-xs">
          <Image
            src={tierConfig.image}
            alt={tierConfig.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 450px"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
          
          {/* Lakefront Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-sky-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Waves className="w-3 h-3 text-sky-600" />
            <span>Direct Punnamada Lake Frontage</span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                <span>4.9</span>
                <span className="text-slate-300 font-normal text-[10px]">(48 reviews)</span>
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500/90 px-2 py-0.5 rounded-md">
              Top 1% in Alleppey
            </span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 block">
            {tierConfig.tag}
          </span>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            {tierConfig.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {tierConfig.description}
          </p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-slate-600 font-semibold">
          <span>
            {formatINR(breakdown.baseRatePerNight)} × {breakdown.nights}{' '}
            {breakdown.nights === 1 ? 'night' : 'nights'}
          </span>
          <span className="font-extrabold text-slate-900">
            {formatINR(breakdown.baseTotal)}
          </span>
        </div>

        {/* Extra Guest Fee (if any) */}
        {breakdown.extraFeeTotal > 0 && (
          <div className="flex items-center justify-between text-slate-600 font-semibold pt-1">
            <div>
              <span>
                Extra guests ({breakdown.extraGuests} × ₹500 × {breakdown.nights}n)
              </span>
              <span className="text-[10px] text-slate-400 block font-normal">
                Above standard 2 adults per room
              </span>
            </div>
            <span className="font-extrabold text-orange-600">
              +{formatINR(breakdown.extraFeeTotal)}
            </span>
          </div>
        )}

        {/* OTA Comparison Pill */}
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-[11px]">
          <div>
            <span className="text-slate-500 line-through mr-1.5">
              {formatINR(breakdown.otaEstimatedPrice)} on OTAs
            </span>
            <span className="font-extrabold text-emerald-800">
              Direct Host Saving
            </span>
          </div>
          <span className="font-black text-emerald-700 bg-white px-2 py-0.5 rounded-md shadow-2xs">
            Save {formatINR(breakdown.savingsVsOta)}
          </span>
        </div>

        {/* Total Price Row */}
        <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
          <span className="text-sm font-extrabold text-slate-900">
            Total Stay Price
          </span>
          <span className="text-2xl font-black text-slate-900">
            {formatINR(breakdown.totalPrice)}
          </span>
        </div>

        {/* Payment Split Highlights */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-orange-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Due Today ({isAdvance25 ? '25% Advance' : '100% Full'})
            </span>
            <span className="text-base font-black text-orange-600">
              {formatINR(payToday)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs border-t border-slate-200/60 pt-1.5">
            <span className="font-semibold text-slate-500">
              Balance Due at Check-in
            </span>
            <span className="font-bold text-slate-800">
              {formatINR(payAtCheckin)}
            </span>
          </div>
        </div>
      </div>

      {/* Inclusions & Guarantees */}
      <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs font-semibold text-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-lg bg-sky-100 text-sky-700 shrink-0">
            <Anchor className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-slate-900 block">
              Free Speedboat Pickup &amp; Drop-off
            </span>
            <span className="text-[10px] text-slate-500 font-normal">
              Nehru Trophy Finishing Point ↔ Zen Homestay (Arrival &amp; Departure)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-lg bg-orange-100 text-orange-700 shrink-0">
            <Coffee className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-slate-900 block">
              Lakeside Breakfast &amp; Morning Tea
            </span>
            <span className="text-[10px] text-slate-500 font-normal">
              Authentic freshly made Appam, Puttu, local tea &amp; fruits included
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-slate-900 block">
              Zero Platform Commission Guarantee
            </span>
            <span className="text-[10px] text-slate-500 font-normal">
              100% direct booking with host Abhijith · Best rate guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Host Profile Badge */}
      <div className="border-t border-slate-100 pt-3 flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-sky-400 via-sky-500 to-orange-500 flex items-center justify-center text-white font-black text-sm shadow-xs">
            A
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <div className="min-w-0">
          <p className="font-extrabold text-slate-900 text-xs">Abhijith · Host</p>
          <p className="text-[10px] text-slate-500 font-medium">
            Responds in &lt; 5 mins on WhatsApp · English, Malayalam
          </p>
        </div>
      </div>
    </div>
  );
}

