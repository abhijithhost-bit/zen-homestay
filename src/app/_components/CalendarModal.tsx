'use client';

import { X, ChevronLeft, ChevronRight, Minus, Plus, BedDouble, Home } from 'lucide-react';
import { useMemo } from 'react';
import { useBooking } from './BookingProvider';

function padDate(n: number) {
  return String(n).padStart(2, '0');
}

export default function CalendarModal() {
  const {
    showCalendar, setShowCalendar,
    activeDateStep, setActiveDateStep,
    tier, setTier,
    currentTier,
    checkIn, checkOut,
    formattedCheckIn, formattedCheckOut,
    nights, guests, totalPrice,
    calendarMonth, prevMonth, nextMonth,
    getDaysInMonth, getFirstDayOfMonth,
    handleDateCellClick, applyPreset,
    handleGuestChange, handleKidsChange, isDateBlocked,
    availability,
    kids,
    extraPersonFeeTotal,
  } = useBooking();

  /** Get the per-night price (in ₹) for a given date string, for the active tier. */
  function getDayPrice(dateStr: string): number | null {
    const dayData = availability[dateStr];
    if (!dayData) return null;
    if (tier === 'whole-floor') return Math.round(dayData.whole_floor_price_paise / 100);
    // For 1-room, use room_1 price as the representative rate shown on the calendar
    return Math.round(dayData.room_1_price_paise / 100);
  }

  /**
   * The "normal rate" is the minimum price seen across all loaded availability days
   * for the active tier. Memoised — only recomputed when availability map or tier changes,
   * not on every render (avoids iterating 90 days each time).
   */
  const normalRate = useMemo(() => {
    const prices: number[] = Object.values(availability).map(dayData => {
      if (tier === 'whole-floor') return Math.round(dayData.whole_floor_price_paise / 100);
      return Math.round(dayData.room_1_price_paise / 100);
    }).filter(p => p > 0);
    if (prices.length === 0) return currentTier.basePrice; // fallback if no data yet
    return Math.min(...prices);
  }, [availability, tier, currentTier.basePrice]);

  /** Format price as ₹3,000 */
  function formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  if (!showCalendar) return null;

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  return (
    <div
      onClick={() => setShowCalendar(false)}
      className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">Select Dates &amp; Option</h3>
            <p className="text-xs text-slate-500 font-medium">
              {currentTier.shortName} · {nights} {nights === 1 ? 'Night' : 'Nights'} · {guests} {guests === 1 ? 'Guest' : 'Guests'}{kids > 0 ? ` · ${kids} ${kids === 1 ? 'Child' : 'Children'}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCalendar(false)}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 font-bold transition-all active:scale-95 cursor-pointer touch-manipulation"
            aria-label="Close Calendar"
          >
            <X className="w-4 h-4 pointer-events-none" />
          </button>
        </div>

        {/* Stay Option Segmented Tabs (Inside Modal) */}
        <div className="p-2.5 bg-slate-100/90 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-1.5 bg-slate-200/70 p-1 rounded-xl text-xs font-extrabold">
            <button
              type="button"
              onClick={() => setTier('1-room')}
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
              onClick={() => setTier('whole-floor')}
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
        <div className="p-3.5 bg-slate-50 grid grid-cols-2 gap-2 border-b border-slate-100 text-xs">
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
            <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{formattedCheckIn}</span>
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
            <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{formattedCheckOut}</span>
          </button>
        </div>

        {/* Calendar Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
              {['January','February','March','April','May','June','July','August','September','October','November','December'][month]} {year}
            </h4>
            <div className="flex items-center gap-1">
              <button 
                type="button" 
                onClick={prevMonth} 
                aria-label="Previous Month" 
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95 cursor-pointer touch-manipulation"
              >
                <ChevronLeft className="w-5 h-5 pointer-events-none" />
              </button>
              <button 
                type="button" 
                onClick={nextMonth} 
                aria-label="Next Month" 
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95 cursor-pointer touch-manipulation"
              >
                <ChevronRight className="w-5 h-5 pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Hoist date objects out of the per-cell loop to avoid repeated allocation */}
            {(() => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const [iy, im, id_] = checkIn.split('-').map(Number);
              const [oy, om, od_] = checkOut.split('-').map(Number);
              const inDate = new Date(iy, im - 1, id_);
              const outDate = new Date(oy, om - 1, od_);
              return (
                <>
            {Array.from({ length: getFirstDayOfMonth(year, month) }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12" />
            ))}
            {Array.from({ length: getDaysInMonth(year, month) }).map((_, i) => {
              const day = i + 1;
              const cellStr = `${year}-${padDate(month + 1)}-${padDate(day)}`;
              const cellDate = new Date(year, month, day);

              const isPast = cellDate < today;
              const isBlocked = isDateBlocked(cellStr, tier);
              const isCheckIn = cellStr === checkIn;
              const isCheckOut = cellStr === checkOut;
              const isInRange = cellDate > inDate && cellDate < outDate;

              // Disabling logic
              const isDisabled = isPast || (activeDateStep === 'checkIn' && isBlocked);

              // Pricing logic for colour-coding — compare against the minimum observed
              // price (normalRate) so only genuine seasonal overrides appear orange
              const dayPrice = !isPast && !isBlocked ? getDayPrice(cellStr) : null;
              const isSeasonal = dayPrice !== null && dayPrice > normalRate;
              const isNormalRate = dayPrice !== null && dayPrice <= normalRate;

              // Build class string — taller cell to fit price label
              let cls = 'h-12 w-full rounded-xl flex flex-col items-center justify-center font-bold transition-all cursor-pointer touch-manipulation relative gap-0 ';
              
              if (isPast) {
                cls += 'text-slate-300 cursor-not-allowed opacity-40';
              } else if (isCheckIn || isCheckOut) {
                cls += 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-95 font-extrabold z-10';
              } else if (isInRange) {
                cls += 'bg-orange-100 text-orange-950 rounded-none font-extrabold';
              } else if (isBlocked) {
                // Live blocked / booked date styling
                cls += 'bg-slate-100 text-slate-400 line-through decoration-slate-400 opacity-60 cursor-not-allowed';
              } else if (isSeasonal) {
                // Peak / seasonal rate — light orange background
                cls += 'bg-orange-50 text-orange-900 hover:bg-orange-200 hover:text-orange-950';
              } else if (isNormalRate) {
                // Normal base rate — light green background
                cls += 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 hover:text-emerald-950';
              } else {
                cls += 'text-slate-800 hover:bg-sky-100 hover:text-sky-900';
              }

              return (
                <button 
                  key={day} 
                  type="button" 
                  disabled={isDisabled} 
                  onClick={() => handleDateCellClick(year, month, day)} 
                  className={cls}
                  title={
                    isBlocked
                      ? `Unavailable for ${currentTier.shortName}`
                      : dayPrice !== null
                      ? `${formatPrice(dayPrice)}/night${isSeasonal ? ' · Peak rate' : ' · Normal rate'}`
                      : undefined
                  }
                >
                  <span className="leading-none text-xs font-extrabold">{day}</span>
                  {dayPrice !== null && !isPast && !isBlocked && (
                    <span className={`leading-none font-semibold mt-0.5 ${
                      (isCheckIn || isCheckOut)
                        ? 'text-white/90 text-[8px]'
                        : isSeasonal
                        ? 'text-orange-600 text-[8px]'
                        : 'text-emerald-600 text-[8px]'
                    }`}>
                      {formatPrice(dayPrice)}
                    </span>
                  )}
                </button>
              );
            })}
                </>
              );
            })()}
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-2 text-[10px] text-slate-500 font-bold border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300" />
              <span className="text-emerald-700">Normal Rate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-100 border border-orange-300" />
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
              <button 
                type="button" 
                onClick={() => applyPreset(1, 1)} 
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation"
              >
                Tomorrow (1N)
              </button>
              <button 
                type="button" 
                onClick={() => applyPreset(2, 1)} 
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation"
              >
                2 Nights
              </button>
              <button 
                type="button" 
                onClick={() => applyPreset(3, 1)} 
                className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation"
              >
                3 Nights
              </button>
            </div>
          </div>

          {/* Occupancy Counters */}
          {/* Rules: 4 total per room (adults+kids), max 2 kids per room */}
          {(() => {
            const roomCount = tier === 'whole-floor' ? 2 : 1;
            const totalCap = roomCount * 4; // 4 total per room
            const maxKidsAllowed = roomCount * 2; // 2 kids per room
            const effectiveMaxGuests = Math.min(currentTier.maxGuests, totalCap - kids);
            const effectiveMaxKids = Math.min(maxKidsAllowed, totalCap - guests);
            return (
              <>
          {/* Guest Count Adjuster */}
          <div className="pt-3 border-t border-slate-100">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[10px] uppercase text-slate-500 block">Adults</span>
                <span className="text-slate-900 font-extrabold text-xs">
                  {guests} {guests === 1 ? 'Adult' : 'Adults'}{' '}
                  <span className="text-slate-400 font-normal text-[11px]">
                    (Max {effectiveMaxGuests}{kids > 0 ? ` · ${totalCap - guests} slot${totalCap - guests === 1 ? '' : 's'} used` : ''})
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleGuestChange(-1)}
                  disabled={guests <= 1}
                  aria-label="Decrease guests"
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation"
                >
                  <Minus className="w-3.5 h-3.5 pointer-events-none" />
                </button>
                <span className="font-black text-sm w-5 text-center text-slate-900">{guests}</span>
                <button
                  type="button"
                  onClick={() => handleGuestChange(1)}
                  disabled={guests >= effectiveMaxGuests}
                  aria-label="Increase guests"
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation"
                >
                  <Plus className="w-3.5 h-3.5 pointer-events-none" />
                </button>
              </div>
            </div>
          </div>

          {/* Kids Counter */}
          <div className="pt-2">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-[10px] uppercase text-slate-500 block">Children</span>
                <span className="text-slate-900 font-extrabold text-xs">
                  {kids} {kids === 1 ? 'Child' : 'Children'}{' '}
                  <span className="text-emerald-600 font-semibold text-[11px]">· Below 5 yrs · Free</span>
                  {' '}<span className="text-slate-400 font-normal text-[11px]">(Max {effectiveMaxKids})</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleKidsChange(-1)}
                  disabled={kids <= 0}
                  aria-label="Decrease children"
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation"
                >
                  <Minus className="w-3.5 h-3.5 pointer-events-none" />
                </button>
                <span className="font-black text-sm w-5 text-center text-slate-900">{kids}</span>
                <button
                  type="button"
                  onClick={() => handleKidsChange(1)}
                  disabled={kids >= effectiveMaxKids}
                  aria-label="Increase children"
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation"
                >
                  <Plus className="w-3.5 h-3.5 pointer-events-none" />
                </button>
              </div>
            </div>
          </div>
              </>
            );
          })()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">
              Total ({nights}N · {currentTier.shortName})
            </span>
            <span className="text-base font-black text-slate-900">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
            {extraPersonFeeTotal > 0 && (
              <span className="text-[10px] text-amber-600 font-semibold block mt-0.5">
                incl. ₹{extraPersonFeeTotal.toLocaleString('en-IN')} extra guest fee
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowCalendar(false)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer touch-manipulation"
          >
            Apply Dates
          </button>
        </div>
      </div>
    </div>
  );
}
