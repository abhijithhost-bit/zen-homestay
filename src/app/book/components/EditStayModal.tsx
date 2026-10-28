'use client';

import { useState } from 'react';
import { X, Minus, Plus, BedDouble, Home, Check } from 'lucide-react';
import type { BookingParams, BookingTierKey } from '../lib/bookingTypes';
import { TIERS_CONFIG, calculateNights, padZero, getDefaultDate } from '../lib/pricingUtils';

interface EditStayModalProps {
  params: BookingParams;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: BookingParams) => void;
}

export default function EditStayModal({ params, isOpen, onClose, onSave }: EditStayModalProps) {
  const [tier, setTier] = useState<BookingTierKey>(params.tier);
  const [checkIn, setCheckIn] = useState<string>(params.checkIn);
  const [checkOut, setCheckOut] = useState<string>(params.checkOut);
  const [guests, setGuests] = useState<number>(params.guests);
  const [kids, setKids] = useState<number>(params.kids);

  if (!isOpen) return null;

  const currentTierConfig = TIERS_CONFIG[tier];
  const nights = calculateNights(checkIn, checkOut);
  const todayStr = getDefaultDate(0);

  const handleTierChange = (newTier: BookingTierKey) => {
    setTier(newTier);
    const maxG = TIERS_CONFIG[newTier].maxGuests;
    if (guests > maxG) {
      setGuests(maxG);
    }
  };

  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    // If checkout is on or before new check-in, set checkout to check-in + 1 day
    if (checkOut <= newCheckIn) {
      const [y, m, d] = newCheckIn.split('-').map(Number);
      const nextDay = new Date(y, m - 1, d + 1);
      const nextDayStr = `${nextDay.getFullYear()}-${padZero(nextDay.getMonth() + 1)}-${padZero(nextDay.getDate())}`;
      setCheckOut(nextDayStr);
    }
  };

  const applyPresetNights = (presetNights: number) => {
    try {
      const [y, m, d] = checkIn.split('-').map(Number);
      const next = new Date(y, m - 1, d + presetNights);
      const nextStr = `${next.getFullYear()}-${padZero(next.getMonth() + 1)}-${padZero(next.getDate())}`;
      setCheckOut(nextStr);
    } catch {
      // ignore
    }
  };

  const handleSave = () => {
    onSave({
      tier,
      checkIn,
      checkOut,
      guests,
      kids,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Edit Stay Details
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Update your room tier, dates, or guest counts
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Room Tier Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Select Stay Option
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* 1 Bedroom */}
              <button
                type="button"
                onClick={() => handleTierChange('1-room')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  tier === '1-room'
                    ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-200 font-bold'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    tier === '1-room' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <BedDouble className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-slate-900 truncate">1 Bedroom</div>
                  <div className="text-[10px] text-slate-500 truncate">Lake view · King Bed</div>
                </div>
              </button>

              {/* Whole Floor */}
              <button
                type="button"
                onClick={() => handleTierChange('whole-floor')}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  tier === 'whole-floor'
                    ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-200 font-bold'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    tier === 'whole-floor' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Home className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-slate-900 truncate">2 Bedrooms</div>
                  <div className="text-[10px] text-slate-500 truncate">Entire Floor (Both rooms)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Dates Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Dates of Stay
              </label>
              <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                {nights} {nights === 1 ? 'Night' : 'Nights'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Check-in</span>
                <div className="relative">
                  <input
                    type="date"
                    min={todayStr}
                    value={checkIn}
                    onChange={(e) => handleCheckInChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Checkout</span>
                <div className="relative">
                  <input
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Stay Presets */}
            <div className="flex items-center gap-1.5 pt-1 text-[11px] font-bold text-slate-600">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 shrink-0">
                Preset:
              </span>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => applyPresetNights(n)}
                  className={`px-2 py-1 rounded-lg border text-xs cursor-pointer transition-all ${
                    nights === n
                      ? 'bg-orange-500 text-white border-orange-500 font-black'
                      : 'bg-white border-slate-200 hover:bg-orange-50'
                  }`}
                >
                  {n} {n === 1 ? 'Night' : 'Nights'}
                </button>
              ))}
            </div>
          </div>

          {/* Guests Counters */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Guests (Adults)</span>
                <span className="text-[11px] text-slate-400">Max {currentTierConfig.maxGuests} guests</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  disabled={guests <= 1}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center disabled:opacity-30 cursor-pointer hover:bg-slate-50 font-black text-slate-700"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-4 text-center text-sm font-black text-slate-900">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(currentTierConfig.maxGuests, g + 1))}
                  disabled={guests >= currentTierConfig.maxGuests}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center disabled:opacity-30 cursor-pointer hover:bg-slate-50 font-black text-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Kids */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Children</span>
                <span className="text-[11px] text-slate-400">Below 5 years · Complimentary</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setKids((k) => Math.max(0, k - 1))}
                  disabled={kids <= 0}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center disabled:opacity-30 cursor-pointer hover:bg-slate-50 font-black text-slate-700"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-4 text-center text-sm font-black text-slate-900">{kids}</span>
                <button
                  type="button"
                  onClick={() => setKids((k) => Math.min(4, k + 1))}
                  disabled={kids >= 4}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center disabled:opacity-30 cursor-pointer hover:bg-slate-50 font-black text-slate-700"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-extrabold text-slate-700 hover:bg-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>Update Stay</span>
          </button>
        </div>
      </div>
    </div>
  );
}

