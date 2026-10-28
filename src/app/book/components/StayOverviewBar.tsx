'use client';

import { Calendar, BedDouble, Home, Moon, Edit3 } from 'lucide-react';
import type { BookingParams } from '../lib/bookingTypes';
import { TIERS_CONFIG, calculateNights, formatShortDate } from '../lib/pricingUtils';

interface StayOverviewBarProps {
  params: BookingParams;
  onEdit: () => void;
}

export default function StayOverviewBar({ params, onEdit }: StayOverviewBarProps) {
  const tierConfig = TIERS_CONFIG[params.tier] || TIERS_CONFIG['1-room'];
  const nights = calculateNights(params.checkIn, params.checkOut);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Summary Grid */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-6 text-xs">
          {/* Room Tier */}
          <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1 pb-2 sm:pb-0 border-b sm:border-b-0 border-slate-100">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600 shrink-0">
              {params.tier === 'whole-floor' ? (
                <Home className="w-4 h-4" />
              ) : (
                <BedDouble className="w-4 h-4" />
              )}
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Selected Room
              </span>
              <span className="font-extrabold text-slate-900 truncate block">
                {tierConfig.shortName}
              </span>
            </div>
          </div>

          {/* Check-in */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Check-in
              </span>
              <span className="font-extrabold text-slate-900 block">
                {formatShortDate(params.checkIn)}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">from 2:00 PM</span>
            </div>
          </div>

          {/* Checkout */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Checkout
              </span>
              <span className="font-extrabold text-slate-900 block">
                {formatShortDate(params.checkOut)}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">by 11:00 AM</span>
            </div>
          </div>

          {/* Duration & Guests */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Stay Details
              </span>
              <span className="font-extrabold text-slate-900 block">
                {nights} {nights === 1 ? 'Night' : 'Nights'}
              </span>
              <span className="text-[10px] text-slate-500 font-bold">
                {params.guests} {params.guests === 1 ? 'Guest' : 'Guests'}
                {params.kids > 0 ? ` + ${params.kids} ${params.kids === 1 ? 'Kid' : 'Kids'}` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Edit Button */}
        <button
          type="button"
          onClick={onEdit}
          className="self-start sm:self-center shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-orange-400 hover:bg-orange-50/50 text-slate-700 hover:text-orange-700 font-extrabold text-xs transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Stay</span>
        </button>
      </div>
    </div>
  );
}

