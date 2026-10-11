'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { Star } from 'lucide-react';
import CalendarModal from './CalendarModal';

// --- Types -------------------------------------------------------------------

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

// --- Context -----------------------------------------------------------------

const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

// --- Helpers -----------------------------------------------------------------

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



// --- MobileBottomBar ----------------------------------------------------------

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
          <span className="text-xs text-orange-600 font-bold underline">/ {nights} {nights === 1 ? 'night' : 'nights'}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-700 font-bold">
          <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
          <span>4.9</span>
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
        <span className="text-xs font-black">→</span>
      </a>
    </div>
  );
}

// --- BookingProvider ----------------------------------------------------------

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
