'use client';

import { useState, useMemo } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  BedDouble,
  Home,
  Check,
} from 'lucide-react';
import type { BookingParams, BookingTierKey } from '../lib/bookingTypes';
import {
  TIERS_CONFIG,
  calculateNights,
  padZero,
  formatShortDate,
  isDateBlocked,
  isRangeAvailable,
  computePriceBreakdown,
  formatINR,
} from '../lib/pricingUtils';
import type { DayAvailability } from '@/lib/supabase';

interface EditStayModalProps {
  params: BookingParams;
  isOpen: boolean;
  initialStep?: 'checkIn' | 'checkOut';
  availability?: Record<string, DayAvailability>;
  onClose: () => void;
  onSave: (updated: BookingParams) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function EditStayModal({
  params,
  isOpen,
  initialStep = 'checkIn',
  availability,
  onClose,
  onSave,
}: EditStayModalProps) {
  const [tier, setTier] = useState<BookingTierKey>(params.tier);
  const [checkIn, setCheckIn] = useState<string>(params.checkIn);
  const [checkOut, setCheckOut] = useState<string>(params.checkOut);
  const [guests, setGuests] = useState<number>(params.guests);
  const [kids, setKids] = useState<number>(params.kids);
  const [activeDateStep, setActiveDateStep] = useState<'checkIn' | 'checkOut'>(initialStep);

  // Initialize calendar month from check-in
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    try {
      const [y, m] = params.checkIn.split('-').map(Number);
      return new Date(y, m - 1, 1);
    } catch {
      const d = new Date();
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
  });

  const currentTierConfig = TIERS_CONFIG[tier];
  const nights = calculateNights(checkIn, checkOut);
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const prevMonth = () => {
    setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  /** Get day rate in ₹ */
  const getDayPrice = (dateStr: string): number | null => {
    if (!availability || !availability[dateStr]) {
      return currentTierConfig.basePrice;
    }
    const dayData = availability[dateStr];
    if (tier === 'whole-floor') {
      return Math.round(dayData.whole_floor_price_paise / 100);
    }
    return Math.round(dayData.room_1_price_paise / 100);
  };

  /** Minimum observed price across 90 days to determine seasonal rate */
  const normalRate = useMemo(() => {
    if (!availability) return currentTierConfig.basePrice;
    const prices = Object.values(availability)
      .map((dayData) => {
        if (tier === 'whole-floor') return Math.round(dayData.whole_floor_price_paise / 100);
        return Math.round(dayData.room_1_price_paise / 100);
      })
      .filter((p) => p > 0);
    if (prices.length === 0) return currentTierConfig.basePrice;
    return Math.min(...prices);
  }, [availability, tier, currentTierConfig.basePrice]);

  const liveBreakdown = useMemo(() => {
    return computePriceBreakdown(
      { tier, checkIn, checkOut, guests, kids },
      availability
    );
  }, [tier, checkIn, checkOut, guests, kids, availability]);

  if (!isOpen) return null;

  const handleTierChange = (newTier: BookingTierKey) => {
    setTier(newTier);
    const maxG = TIERS_CONFIG[newTier].maxGuests;
    if (guests > maxG) {
      setGuests(maxG);
    }
  };

  const handleDateClick = (clickedYear: number, clickedMonth: number, day: number) => {
    const dateStr = `${clickedYear}-${padZero(clickedMonth + 1)}-${padZero(day)}`;
    const selected = new Date(clickedYear, clickedMonth, day);

    if (activeDateStep === 'checkIn') {
      if (isDateBlocked(dateStr, tier, availability)) return;

      setCheckIn(dateStr);

      const [oy, om, od] = checkOut.split('-').map(Number);
      const outD = new Date(oy, om - 1, od);

      if (outD <= selected || isNaN(outD.getTime()) || !isRangeAvailable(dateStr, checkOut, tier, availability)) {
        const next = new Date(selected);
        next.setDate(next.getDate() + 1);
        const nextStr = `${next.getFullYear()}-${padZero(next.getMonth() + 1)}-${padZero(next.getDate())}`;
        setCheckOut(nextStr);
      }
      setActiveDateStep('checkOut');
    } else {
      const [iy, im, id] = checkIn.split('-').map(Number);
      const inD = new Date(iy, im - 1, id);

      if (selected <= inD) {
        if (!isDateBlocked(dateStr, tier, availability)) {
          setCheckIn(dateStr);
          const next = new Date(selected);
          next.setDate(next.getDate() + 1);
          setCheckOut(`${next.getFullYear()}-${padZero(next.getMonth() + 1)}-${padZero(next.getDate())}`);
          setActiveDateStep('checkOut');
        }
      } else {
        if (isRangeAvailable(checkIn, dateStr, tier, availability)) {
          setCheckOut(dateStr);
        } else {
          if (!isDateBlocked(dateStr, tier, availability)) {
            setCheckIn(dateStr);
            const next = new Date(selected);
            next.setDate(next.getDate() + 1);
            setCheckOut(`${next.getFullYear()}-${padZero(next.getMonth() + 1)}-${padZero(next.getDate())}`);
            setActiveDateStep('checkOut');
          }
        }
      }
    }
  };

  const applyPresetNights = (presetNights: number) => {
    try {
      const [y, m, d] = checkIn.split('-').map(Number);
      const inDate = new Date(y, m - 1, d);

      // Try starting from current check-in
      for (let offset = 0; offset < 14; offset++) {
        const candidateIn = new Date(inDate);
        candidateIn.setDate(candidateIn.getDate() + offset);
        const candidateOut = new Date(candidateIn);
        candidateOut.setDate(candidateOut.getDate() + presetNights);

        const inStr = `${candidateIn.getFullYear()}-${padZero(candidateIn.getMonth() + 1)}-${padZero(candidateIn.getDate())}`;
        const outStr = `${candidateOut.getFullYear()}-${padZero(candidateOut.getMonth() + 1)}-${padZero(candidateOut.getDate())}`;

        if (isRangeAvailable(inStr, outStr, tier, availability)) {
          setCheckIn(inStr);
          setCheckOut(outStr);
          return;
        }
      }

      // Fallback
      const next = new Date(inDate);
      next.setDate(next.getDate() + presetNights);
      setCheckOut(`${next.getFullYear()}-${padZero(next.getMonth() + 1)}-${padZero(next.getDate())}`);
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [iy, im, id_] = checkIn.split('-').map(Number);
  const [oy, om, od_] = checkOut.split('-').map(Number);
  const inDate = new Date(iy, im - 1, id_);
  const outDate = new Date(oy, om - 1, od_);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
              Select Dates &amp; Room
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {currentTierConfig.shortName} · {nights} {nights === 1 ? 'Night' : 'Nights'} ·{' '}
              {guests} {guests === 1 ? 'Guest' : 'Guests'}
              {kids > 0 ? ` · ${kids} Kid${kids > 1 ? 's' : ''}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 font-bold transition-all active:scale-95 cursor-pointer touch-manipulation"
            aria-label="Close"
          >
            <X className="w-4 h-4 pointer-events-none" />
          </button>
        </div>

        {/* Stay Option Segmented Tabs */}
        <div className="p-2.5 bg-slate-100/90 border-b border-slate-200 shrink-0">
          <div className="grid grid-cols-2 gap-1.5 bg-slate-200/70 p-1 rounded-xl text-xs font-extrabold">
            <button
              type="button"
              onClick={() => handleTierChange('1-room')}
              className={`py-1.5 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
                tier === '1-room'
                  ? 'bg-white text-orange-600 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BedDouble className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">1 Bedroom</span>
            </button>

            <button
              type="button"
              onClick={() => handleTierChange('whole-floor')}
              className={`py-1.5 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation ${
                tier === 'whole-floor'
                  ? 'bg-white text-orange-600 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">2 Bedrooms (Floor)</span>
            </button>
          </div>
        </div>

        {/* Date Step Tabs */}
        <div className="p-3 bg-slate-50 grid grid-cols-2 gap-2 border-b border-slate-100 text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveDateStep('checkIn')}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation ${
              activeDateStep === 'checkIn'
                ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-100'
                : 'bg-white/60 border-slate-200 text-slate-600'
            }`}
          >
            <span className="font-bold text-[10px] uppercase text-slate-500 block">Check-in</span>
            <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
              {formatShortDate(checkIn)}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveDateStep('checkOut')}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation ${
              activeDateStep === 'checkOut'
                ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-100'
                : 'bg-white/60 border-slate-200 text-slate-600'
            }`}
          >
            <span className="font-bold text-[10px] uppercase text-slate-500 block">Checkout</span>
            <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
              {formatShortDate(checkOut)}
            </span>
          </button>
        </div>

        {/* Scrollable Calendar Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
              {MONTH_NAMES[month]} {year}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous Month"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95 cursor-pointer touch-manipulation"
              >
                <ChevronLeft className="w-5 h-5 pointer-events-none" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next Month"
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95 cursor-pointer touch-manipulation"
              >
                <ChevronRight className="w-5 h-5 pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: getFirstDayOfMonth(year, month) }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12" />
            ))}
            {Array.from({ length: getDaysInMonth(year, month) }).map((_, i) => {
              const day = i + 1;
              const cellStr = `${year}-${padZero(month + 1)}-${padZero(day)}`;
              const cellDate = new Date(year, month, day);

              const isPast = cellDate < today;
              const isBlocked = isDateBlocked(cellStr, tier, availability);
              const isCheckIn = cellStr === checkIn;
              const isCheckOut = cellStr === checkOut;
              const isInRange = cellDate > inDate && cellDate < outDate;

              const isDisabled = isPast || (activeDateStep === 'checkIn' && isBlocked);

              const dayPrice = !isPast && !isBlocked ? getDayPrice(cellStr) : null;
              const isSeasonal = dayPrice !== null && dayPrice > normalRate;
              const isNormalRate = dayPrice !== null && dayPrice <= normalRate;

              let cls =
                'h-12 w-full rounded-xl flex flex-col items-center justify-center font-bold transition-all cursor-pointer touch-manipulation relative gap-0 ';

              if (isPast) {
                cls += 'text-slate-300 cursor-not-allowed opacity-40';
              } else if (isCheckIn || isCheckOut) {
                cls +=
                  'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-95 font-extrabold z-10';
              } else if (isInRange) {
                cls += 'bg-orange-100 text-orange-950 rounded-none font-extrabold';
              } else if (isBlocked) {
                cls +=
                  'bg-slate-100 text-slate-400 line-through decoration-slate-400 opacity-60 cursor-not-allowed';
              } else if (isSeasonal) {
                cls += 'bg-orange-50 text-orange-900 hover:bg-orange-200 hover:text-orange-950';
              } else if (isNormalRate) {
                cls += 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 hover:text-emerald-950';
              } else {
                cls += 'text-slate-800 hover:bg-sky-100 hover:text-sky-900';
              }

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateClick(year, month, day)}
                  className={cls}
                >
                  <span className="leading-none text-xs font-extrabold">{day}</span>
                  {dayPrice !== null && !isPast && !isBlocked && (
                    <span
                      className={`leading-none font-semibold mt-0.5 ${
                        isCheckIn || isCheckOut
                          ? 'text-white/90 text-[8px]'
                          : isSeasonal
                          ? 'text-orange-600 text-[8px]'
                          : 'text-emerald-600 text-[8px]'
                      }`}
                    >
                      ₹{dayPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-2 text-[10px] text-slate-500 font-bold border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-100 border border-emerald-300" />
              <span className="text-emerald-700">Normal Rate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-orange-100 border border-orange-300" />
              <span className="text-orange-700">Peak / Season</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Booked
            </span>
          </div>

          {/* Quick Presets */}
          <div className="pt-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1.5 tracking-wider">
              Quick Stay Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => applyPresetNights(n)}
                  className={`px-3 py-1.5 rounded-xl border text-xs cursor-pointer font-bold transition-all ${
                    nights === n
                      ? 'bg-orange-500 text-white border-orange-500 font-black shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-orange-50'
                  }`}
                >
                  {n} {n === 1 ? 'Night' : 'Nights'}
                </button>
              ))}
            </div>
          </div>

          {/* Guests & Kids Steppers */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Adult Guests</span>
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

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div>
                <span className="text-xs font-extrabold text-slate-900 block">Children</span>
                <span className="text-[11px] text-slate-400">Under 5 years · Complimentary</span>
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

        {/* Modal Footer with Live Price & Apply */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Total ({nights} {nights === 1 ? 'night' : 'nights'})
            </span>
            <span className="text-lg sm:text-xl font-black text-slate-900">
              {formatINR(liveBreakdown.totalPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2">
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
              <span>Apply Stay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
