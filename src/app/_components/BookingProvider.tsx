'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { Star, X, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BookingContextType {
  rooms: number;
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  formattedCheckIn: string;
  formattedCheckOut: string;
  whatsappBookingUrl: string;
  showCalendar: boolean;
  activeDateStep: 'checkIn' | 'checkOut';
  calendarMonth: Date;
  handleRoomChange: (delta: number) => void;
  handleGuestChange: (delta: number) => void;
  handleDateCellClick: (year: number, month: number, day: number) => void;
  applyPreset: (presetNights: number, offsetDays?: number) => void;
  setActiveDateStep: (step: 'checkIn' | 'checkOut') => void;
  setShowCalendar: (show: boolean) => void;
  prevMonth: () => void;
  nextMonth: () => void;
  getDaysInMonth: (year: number, month: number) => number;
  getFirstDayOfMonth: (year: number, month: number) => number;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitialDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  } catch { return dateStr; }
}

function calculateNights(inDateStr: string, outDateStr: string): number {
  try {
    if (!inDateStr || !outDateStr) return 1;
    const [y1, m1, d1] = inDateStr.split('-').map(Number);
    const [y2, m2, d2] = outDateStr.split('-').map(Number);
    const diff = Math.round((new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime()) / 86400000);
    return diff > 0 ? diff : 1;
  } catch { return 1; }
}

function padDate(n: number) { return String(n).padStart(2, '0'); }

// ─── CalendarModal ────────────────────────────────────────────────────────────

function CalendarModal() {
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

// ─── MobileBottomBar ──────────────────────────────────────────────────────────

function MobileBottomBar() {
  const { totalPrice, nights, rooms, guests, setShowCalendar } = useBooking();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 flex items-center justify-between shadow-2xl">
      <button
        type="button"
        onClick={() => setShowCalendar(true)}
        className="text-left cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
          <span className="text-xs text-orange-600 font-bold underline">/ {nights} {nights === 1 ? 'night' : 'nights'} 📅</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-700 font-bold">
          <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
          <span>4.98</span>
          <span>·</span>
          <span className="text-sky-600">{rooms} {rooms === 1 ? 'Room' : 'Rooms'} · {guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
        </div>
      </button>

      <a
        href="#booking-section"
        onClick={(e) => {
          const el = document.getElementById('booking-section');
          if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-black text-sm shadow-lg shadow-orange-500/25 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer touch-manipulation"
      >
        <span>Book Now</span>
        <span className="text-xs font-black">↓</span>
      </a>
    </div>
  );
}

// ─── BookingProvider ──────────────────────────────────────────────────────────

export function BookingProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState(() => getInitialDate(1));
  const [checkOut, setCheckOut] = useState(() => getInitialDate(2));
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeDateStep, setActiveDateStep] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = rooms * 3000 * nights;
  const formattedCheckIn = formatDisplayDate(checkIn);
  const formattedCheckOut = formatDisplayDate(checkOut);

  const whatsappBookingUrl = `https://wa.me/917012761588?text=${encodeURIComponent(
    `Hi Abhijith, I would like to inquire about booking Zen Homestay for ${guests} guest${guests > 1 ? 's' : ''} (${rooms} Lake View Room${rooms > 1 ? 's' : ''}) from ${formattedCheckIn} to ${formattedCheckOut} (${nights} night${nights > 1 ? 's' : ''}). Total estimated: ₹${totalPrice.toLocaleString('en-IN')}. Please let me know the availability!`
  )}`;

  const prevMonth = () => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const handleRoomChange = (delta: number) => setRooms(prev => Math.min(2, Math.max(1, prev + delta)));

  const handleGuestChange = (delta: number) =>
    setGuests(prev => Math.min(rooms * 3, Math.max(1, prev + delta)));

  const handleDateCellClick = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${padDate(month + 1)}-${padDate(day)}`;
    const selected = new Date(year, month, day);
    if (activeDateStep === 'checkIn') {
      setCheckIn(dateStr);
      const [oy,om,od] = checkOut.split('-').map(Number);
      const outD = new Date(oy, om-1, od);
      if (outD <= selected || isNaN(outD.getTime())) {
        const next = new Date(selected); next.setDate(next.getDate() + 1);
        setCheckOut(`${next.getFullYear()}-${padDate(next.getMonth()+1)}-${padDate(next.getDate())}`);
      }
      setActiveDateStep('checkOut');
    } else {
      const [iy,im,id] = checkIn.split('-').map(Number);
      const inD = new Date(iy, im-1, id);
      if (selected <= inD) {
        setCheckIn(dateStr);
        const next = new Date(selected); next.setDate(next.getDate() + 1);
        setCheckOut(`${next.getFullYear()}-${padDate(next.getMonth()+1)}-${padDate(next.getDate())}`);
        setActiveDateStep('checkOut');
      } else {
        setCheckOut(dateStr);
        setShowCalendar(false);
      }
    }
  };

  const applyPreset = (presetNights: number, offsetDays = 1) => {
    const inD = new Date(); inD.setDate(inD.getDate() + offsetDays);
    const outD = new Date(inD); outD.setDate(outD.getDate() + presetNights);
    setCheckIn(`${inD.getFullYear()}-${padDate(inD.getMonth()+1)}-${padDate(inD.getDate())}`);
    setCheckOut(`${outD.getFullYear()}-${padDate(outD.getMonth()+1)}-${padDate(outD.getDate())}`);
    setShowCalendar(false);
  };

  useEffect(() => {
    setGuests(prev => Math.min(rooms * 3, Math.max(1, prev)));
  }, [rooms]);

  useEffect(() => {
    document.body.style.overflow = showCalendar ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showCalendar]);

  const value: BookingContextType = {
    rooms, guests, checkIn, checkOut, nights, totalPrice,
    formattedCheckIn, formattedCheckOut, whatsappBookingUrl,
    showCalendar, activeDateStep, calendarMonth,
    handleRoomChange, handleGuestChange, handleDateCellClick, applyPreset,
    setActiveDateStep, setShowCalendar,
    prevMonth, nextMonth, getDaysInMonth, getFirstDayOfMonth,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
      <CalendarModal />
      <MobileBottomBar />
    </BookingContext.Provider>
  );
}
