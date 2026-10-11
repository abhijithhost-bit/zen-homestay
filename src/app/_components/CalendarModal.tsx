'use client';

import { X, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useBooking } from './BookingProvider';

function padDate(n: number) {
  return String(n).padStart(2, '0');
}

export default function CalendarModal() {
  const {
    showCalendar, setShowCalendar,
    activeDateStep, setActiveDateStep,
    checkIn, checkOut,
    formattedCheckIn, formattedCheckOut,
    nights, rooms, guests, totalPrice,
    calendarMonth, prevMonth, nextMonth,
    getDaysInMonth, getFirstDayOfMonth,
    handleDateCellClick, applyPreset,
    handleRoomChange, handleGuestChange,
  } = useBooking();

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
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">Select Dates & Rooms</h3>
            <p className="text-xs text-slate-500 font-medium">{nights} {nights === 1 ? 'Night' : 'Nights'} · {rooms} {rooms === 1 ? 'Room' : 'Rooms'} · {guests} Guests</p>
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

        {/* Date Step Tabs */}
        <div className="p-3.5 bg-slate-100/70 grid grid-cols-2 gap-2 border-b border-slate-100 text-xs">
          <button
            type="button"
            onClick={() => setActiveDateStep('checkIn')}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation ${activeDateStep === 'checkIn' ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-100' : 'bg-white/60 border-slate-200 text-slate-600'}`}
          >
            <span className="font-bold text-[10px] uppercase text-slate-500 block">Check-in</span>
            <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{formattedCheckIn}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveDateStep('checkOut')}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation ${activeDateStep === 'checkOut' ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-100' : 'bg-white/60 border-slate-200 text-slate-600'}`}
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
              {calendarMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </h4>
            <div className="flex items-center gap-1">
              <button type="button" onClick={prevMonth} aria-label="Previous Month" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95 cursor-pointer touch-manipulation">
                <ChevronLeft className="w-4 h-4 pointer-events-none" />
              </button>
              <button type="button" onClick={nextMonth} aria-label="Next Month" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95 cursor-pointer touch-manipulation">
                <ChevronRight className="w-4 h-4 pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: getFirstDayOfMonth(year, month) }).map((_, i) => (
              <div key={`e-${i}`} className="h-9" />
            ))}
            {Array.from({ length: getDaysInMonth(year, month) }).map((_, i) => {
              const day = i + 1;
              const cellStr = `${year}-${padDate(month + 1)}-${padDate(day)}`;
              const cellDate = new Date(year, month, day);
              const today = new Date(); today.setHours(0,0,0,0);
              const isPast = cellDate < today;
              const isCheckIn = cellStr === checkIn;
              const isCheckOut = cellStr === checkOut;
              const [iy,im,id] = checkIn.split('-').map(Number);
              const [oy,om,od] = checkOut.split('-').map(Number);
              const inDate = new Date(iy, im-1, id);
              const outDate = new Date(oy, om-1, od);
              const isInRange = cellDate > inDate && cellDate < outDate;

              let cls = 'h-9 w-full rounded-xl flex items-center justify-center font-bold transition-all cursor-pointer touch-manipulation ';
              if (isPast) cls += 'text-slate-300 cursor-not-allowed opacity-40';
              else if (isCheckIn || isCheckOut) cls += 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-95 font-extrabold';
              else if (isInRange) cls += 'bg-orange-100 text-orange-950 rounded-none font-extrabold';
              else cls += 'text-slate-800 hover:bg-sky-100 hover:text-sky-900';

              return (
                <button key={day} type="button" disabled={isPast} onClick={() => handleDateCellClick(year, month, day)} className={cls}>
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick Presets */}
          <div className="pt-2">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1.5 tracking-wider">Quick Presets</span>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => applyPreset(1, 1)} className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation">Tomorrow (1N)</button>
              <button type="button" onClick={() => applyPreset(2, 1)} className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation">2 Nights</button>
              <button type="button" onClick={() => applyPreset(3, 1)} className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation">3 Nights</button>
            </div>
          </div>

          {/* Room & Guest Adjusters */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Room & Guest Configuration</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[10px] uppercase text-slate-500 block">Rooms</span>
                  <span className="text-slate-900 font-extrabold text-xs">{rooms} {rooms === 1 ? 'Room' : 'Rooms'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => handleRoomChange(-1)} disabled={rooms <= 1} aria-label="Decrease rooms" className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation">
                    <Minus className="w-3.5 h-3.5 pointer-events-none" />
                  </button>
                  <button type="button" onClick={() => handleRoomChange(1)} disabled={rooms >= 2} aria-label="Increase rooms" className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation">
                    <Plus className="w-3.5 h-3.5 pointer-events-none" />
                  </button>
                </div>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[10px] uppercase text-slate-500 block">Guests</span>
                  <span className="text-slate-900 font-extrabold text-xs">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" onClick={() => handleGuestChange(-1)} disabled={guests <= 1} aria-label="Decrease guests" className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation">
                    <Minus className="w-3.5 h-3.5 pointer-events-none" />
                  </button>
                  <button type="button" onClick={() => handleGuestChange(1)} disabled={guests >= rooms * 3} aria-label="Increase guests" className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation">
                    <Plus className="w-3.5 h-3.5 pointer-events-none" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">Total ({nights}N · {rooms}R)</span>
            <span className="text-base font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
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
