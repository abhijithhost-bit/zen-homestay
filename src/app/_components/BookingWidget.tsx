'use client';

import { Star, MessageCircle, Phone, CheckCircle2, Calendar, Minus, Plus, Home, BedDouble } from 'lucide-react';
import { useBooking, TIERS, BookingTier } from './BookingProvider';

export default function BookingWidget() {
  const {
    tier, setTier,
    currentTier,
    guests, kids, nights, totalPrice, nightlyRate,
    extraPersonFeePerNight, extraPersonFeeTotal,
    formattedCheckIn, formattedCheckOut, whatsappBookingUrl,
    handleGuestChange, handleKidsChange, applyPreset,
    setActiveDateStep, setShowCalendar,
    availabilityLoading,
    isCurrentSelectionAvailable,
    is1RoomAvailable,
    isWholeFloorAvailable,
  } = useBooking();

  const otaEstimatedPrice = Math.round(totalPrice * 1.33);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4 sm:space-y-5">

      {/* Special Offer Header Pill */}
      <div className="w-fit mx-auto bg-linear-to-r from-orange-500 to-amber-500 text-white text-[9.5px] sm:text-[10px] font-bold py-1 px-2.5 sm:px-3 rounded-full text-center tracking-wide uppercase shadow-sm">
        Direct Host Guaranteed Rate · Zero Commission
      </div>

      {/* Price & Rating Header */}
      <div className="flex items-baseline justify-between pt-0.5">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
            <span className="text-slate-500 font-bold text-xs sm:text-sm">
              / {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
          </div>
          {/* OTA price comparison anchor */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] text-slate-600 line-through">₹{otaEstimatedPrice.toLocaleString('en-IN')} on OTAs</span>
            <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">Save ~25%</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
          <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span>4.9</span>
          <span className="text-slate-500 font-normal">(48)</span>
        </div>
      </div>

      {/* TIER SELECTION CARDS */}
      <div className="space-y-2">
        <label className="block text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
          Select Your Stay Option
        </label>
        <div className="grid grid-cols-1 gap-2">
          {/* Option 1: 1 Bedroom */}
          <button
            type="button"
            onClick={() => setTier('1-room')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation flex items-center justify-between group ${
              tier === '1-room' 
                ? 'border-orange-500 bg-orange-50/50 shadow-sm ring-2 ring-orange-200' 
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                tier === '1-room' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                <BedDouble className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-xs text-slate-900">1 Bedroom</span>
                  <span className="text-[9px] font-extrabold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">King Bed</span>
                  {!is1RoomAvailable && (
                    <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">Sold Out</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Direct lake view · Extra bed on request</p>
              </div>
            </div>
          </button>

          {/* Option 2: 2 Bedrooms (Entire Floor) */}
          <button
            type="button"
            onClick={() => setTier('whole-floor')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation flex items-center justify-between group ${
              tier === 'whole-floor' 
                ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-2 ring-orange-200' 
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                tier === 'whole-floor' ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                <Home className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-xs text-slate-900">2 Bedrooms</span>
                  <span className="text-[9px] font-black text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">Entire Floor</span>
                  {!isWholeFloorAvailable && (
                    <span className="text-[9px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">Sold Out</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">Both lakefront rooms · Private 2nd floor</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Interactive Booking Box */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 bg-slate-50/70 text-xs font-medium">

        {/* Date Picker Row */}
        <div className="grid grid-cols-2 divide-x divide-slate-200 bg-white">
          <button
            type="button"
            onClick={() => { setActiveDateStep('checkIn'); setShowCalendar(true); }}
            className="p-3 sm:p-3.5 hover:bg-slate-50 transition-colors text-left block w-full group cursor-pointer touch-manipulation select-none"
          >
            <div className="flex items-center justify-between mb-1 pointer-events-none">
              <span className="font-extrabold uppercase text-[10px] text-slate-500 tracking-wider">Check-in</span>
              <Calendar className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-slate-900 font-black text-xs sm:text-sm truncate pointer-events-none">{formattedCheckIn || 'Select Date'}</div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 pointer-events-none">2:00 PM Check-in</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveDateStep('checkOut'); setShowCalendar(true); }}
            className="p-3 sm:p-3.5 hover:bg-slate-50 transition-colors text-left block w-full group cursor-pointer touch-manipulation select-none"
          >
            <div className="flex items-center justify-between mb-1 pointer-events-none">
              <span className="font-extrabold uppercase text-[10px] text-slate-500 tracking-wider">Checkout</span>
              <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                {nights} {nights === 1 ? 'night' : 'nights'}
              </span>
            </div>
            <div className="text-slate-900 font-black text-xs sm:text-sm truncate pointer-events-none">{formattedCheckOut || 'Select Date'}</div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 pointer-events-none">11:00 AM Checkout</span>
          </button>
        </div>

        {/* Quick Stay Presets & Calendar Trigger */}
        <div className="p-2.5 bg-slate-50/80 flex items-center justify-between gap-1.5 overflow-x-auto text-[11px] font-bold">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 shrink-0">Stay:</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {[1, 2, 3].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => applyPreset(n, 0)}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer touch-manipulation ${
                  nights === n 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm font-extrabold' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'
                }`}
              >
                {n} {n === 1 ? 'Night' : 'Nights'}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { setActiveDateStep('checkIn'); setShowCalendar(true); }}
              className="px-2 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 font-extrabold hover:bg-sky-100 transition-all cursor-pointer touch-manipulation flex items-center gap-1"
            >
              <span>📅 Calendar</span>
            </button>
          </div>
        </div>

        {/* Adults Counter — kids counter is in the date picker only */}
        <div className="p-3.5 flex items-center justify-between bg-white">
          <div>
            <span className="font-extrabold uppercase text-[10px] text-slate-500 block">Guests</span>
            <span className="text-slate-900 font-bold text-xs sm:text-sm">
              {guests} {guests === 1 ? 'Guest' : 'Guests'}{' '}
              <span className="text-slate-400 font-normal text-xs">(Max {currentTier.maxGuests})</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 touch-manipulation">
            <button
              type="button"
              onClick={() => handleGuestChange(-1)}
              disabled={guests <= 1}
              aria-label="Decrease guests"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-400 disabled:opacity-25 disabled:cursor-not-allowed text-base font-black bg-slate-50 hover:bg-white transition-all active:scale-90 cursor-pointer touch-manipulation select-none shadow-sm"
            >
              <Minus className="w-4 h-4 pointer-events-none stroke-3" />
            </button>
            <span className="font-black text-base sm:text-sm w-5 text-center text-slate-900 select-none">{guests}</span>
            <button
              type="button"
              onClick={() => handleGuestChange(1)}
              disabled={guests >= currentTier.maxGuests}
              aria-label="Increase guests"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-400 disabled:opacity-25 disabled:cursor-not-allowed text-base font-black bg-slate-50 hover:bg-white transition-all active:scale-90 cursor-pointer touch-manipulation select-none shadow-sm"
            >
              <Plus className="w-4 h-4 pointer-events-none stroke-3" />
            </button>
          </div>
        </div>

        {/* Kids Counter */}
        <div className="px-3.5 pb-3.5 flex items-center justify-between bg-white border-t border-slate-100">
          <div>
            <span className="font-extrabold uppercase text-[10px] text-slate-500 block">Children</span>
            <span className="text-slate-900 font-bold text-xs sm:text-sm">
              {kids} {kids === 1 ? 'Child' : 'Children'}{' '}
              <span className="text-slate-400 font-normal text-xs">(below 5 yrs · free)</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 touch-manipulation">
            <button
              type="button"
              onClick={() => handleKidsChange(-1)}
              disabled={kids <= 0}
              aria-label="Decrease children"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-400 disabled:opacity-25 disabled:cursor-not-allowed text-base font-black bg-slate-50 hover:bg-white transition-all active:scale-90 cursor-pointer touch-manipulation select-none shadow-sm"
            >
              <Minus className="w-4 h-4 pointer-events-none stroke-3" />
            </button>
            <span className="font-black text-base sm:text-sm w-5 text-center text-slate-900 select-none">{kids}</span>
            <button
              type="button"
              onClick={() => handleKidsChange(1)}
              disabled={kids >= 4}
              aria-label="Increase children"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-400 disabled:opacity-25 disabled:cursor-not-allowed text-base font-black bg-slate-50 hover:bg-white transition-all active:scale-90 cursor-pointer touch-manipulation select-none shadow-sm"
            >
              <Plus className="w-4 h-4 pointer-events-none stroke-3" />
            </button>
          </div>
        </div>

        {/* Live Breakdown */}
        <div className={`font-bold text-xs ${
          isCurrentSelectionAvailable 
            ? 'bg-sky-50 text-sky-900' 
            : 'bg-rose-50 text-rose-900'
        }`}>
          {/* Room rate line */}
          <div className="p-2.5 sm:p-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate pr-2">
              {isCurrentSelectionAvailable ? (
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              ) : (
                <span className="text-rose-600 font-black text-xs shrink-0">✕</span>
              )}
              <span className="truncate">
                {isCurrentSelectionAvailable 
                  ? `${currentTier.shortName} · ${nights} ${nights === 1 ? 'night' : 'nights'} · ₹${(nightlyRate - extraPersonFeePerNight).toLocaleString('en-IN')}/night`
                  : `Sold out for selected dates (${nights} ${nights === 1 ? 'night' : 'nights'})`
                }
              </span>
            </div>
            <span className={`font-black shrink-0 ${isCurrentSelectionAvailable ? 'text-orange-600' : 'text-rose-600'}`}>
              {availabilityLoading ? '...' : isCurrentSelectionAvailable ? `₹${(totalPrice - extraPersonFeeTotal).toLocaleString('en-IN')}` : 'Sold Out'}
            </span>
          </div>
          {/* Extra person fee line — only shown when an extra adult is present */}
          {extraPersonFeeTotal > 0 && isCurrentSelectionAvailable && (
            <div className="px-2.5 sm:px-3 pb-2.5 flex items-center justify-between border-t border-sky-200/60 pt-2">
              <span className="text-sky-700 font-semibold">
                Extra guest · ₹500/night <span className="text-[10px] font-normal text-sky-500">(above 5 yrs)</span>
              </span>
              <span className="font-black text-orange-600">+₹{extraPersonFeeTotal.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        <a
          href={whatsappBookingUrl}
          target="_blank"
          rel="noreferrer"
          className={`w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base tracking-wide transition-all shadow-lg active:scale-[0.98] ${
            isCurrentSelectionAvailable
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 hover:shadow-orange-500/40'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/25'
          }`}
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          {isCurrentSelectionAvailable ? 'Reserve via WhatsApp' : 'Inquire on WhatsApp (Sold Out)'}
        </a>

        <a
          href="tel:+917012761588"
          className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98] relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
          <span className="relative flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full ring-1 ring-white/30">
              <Phone className="w-3 h-3 fill-current" />
            </span>
            <span className="font-bold">Call Host · +91 7012 761 588</span>
          </span>
        </a>
      </div>

      <div className="text-center">
        <p className="text-[11px] text-slate-500 font-semibold">Zero booking commission · Instant response in &lt; 5 mins</p>
      </div>

      {/* Verified Guarantees */}
      <div className="border-t border-slate-100 pt-3.5 space-y-2 text-[11px] sm:text-xs text-slate-600 font-semibold">
        <div className="flex items-center justify-between">
          <span className="underline">Instant WhatsApp Confirmation</span>
          <span className="font-bold text-sky-700">Free</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="underline">Speedboat Pickup &amp; Drop-off</span>
          <span className="font-bold text-sky-700">Free (Arrival &amp; Departure)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="underline">Morning Tea &amp; Kerala Breakfast</span>
          <span className="font-bold text-sky-700">Included</span>
        </div>
      </div>

      {/* Host Profile Card */}
      <div className="border-t border-slate-100 pt-3.5">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-sky-400 via-sky-500 to-orange-500 flex items-center justify-center text-white font-black text-base shadow-md">
              A
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-slate-900 text-sm leading-tight">Abhijith · Your Host</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Responds in &lt; 5 mins · English, Malayalam</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-orange-500 text-[11px]">★★★★★</span>
              <span className="text-[11px] font-bold text-slate-700">4.9</span>
              <span className="text-[11px] text-slate-400">(48 reviews)</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
