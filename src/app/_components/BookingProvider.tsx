'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { Star } from 'lucide-react';
import CalendarModal from './CalendarModal';
import { supabase, isSupabaseConfigured, DayAvailability } from '@/lib/supabase';

// --- Tier Definitions --------------------------------------------------------

export type BookingTier = 'lakefront-room-1' | 'lakefront-room-2' | 'whole-floor';

export interface TierInfo {
  id: BookingTier;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  maxGuests: number;
  rooms: number;
  basePrice: number;
}

export const TIERS: Record<BookingTier, TierInfo> = {
  'lakefront-room-1': {
    id: 'lakefront-room-1',
    name: 'Lakefront Room 1',
    shortName: 'Room 1',
    tag: 'Lakefront King Bedroom',
    description: 'Direct Punnamada Lake view · Attached bathroom · King bed',
    maxGuests: 3,
    rooms: 1,
    basePrice: 3000,
  },
  'lakefront-room-2': {
    id: 'lakefront-room-2',
    name: 'Lakefront Room 2',
    shortName: 'Room 2',
    tag: 'Lakefront King Bedroom',
    description: 'Direct Punnamada Lake view · Attached bathroom · King bed',
    maxGuests: 3,
    rooms: 1,
    basePrice: 3000,
  },
  'whole-floor': {
    id: 'whole-floor',
    name: 'Whole Floor (Both Rooms)',
    shortName: 'Whole Floor',
    tag: 'Entire Private 2nd Floor',
    description: 'Both Lakefront Bedrooms · 2 King beds · Exclusive waterfront floor',
    maxGuests: 6,
    rooms: 2,
    basePrice: 6000,
  },
};

// --- Context Types -----------------------------------------------------------

export interface BookingContextType {
  tier: BookingTier;
  setTier: (tier: BookingTier) => void;
  rooms: number; // For compatibility (1 or 2)
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  nightlyRate: number;
  formattedCheckIn: string;
  formattedCheckOut: string;
  whatsappBookingUrl: string;
  showCalendar: boolean;
  activeDateStep: 'checkIn' | 'checkOut';
  calendarMonth: Date;
  availability: Record<string, DayAvailability>;
  availabilityLoading: boolean;
  availabilityError: string | null;
  isDateBlocked: (dateStr: string, tierToCheck?: BookingTier) => boolean;
  isRangeAvailable: (inDateStr: string, outDateStr: string, tierToCheck?: BookingTier) => boolean;
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
  refetchAvailability: () => Promise<void>;
}

// --- Context -----------------------------------------------------------------

const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

// --- Date Math Helpers -------------------------------------------------------

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

// --- MobileBottomBar Component -----------------------------------------------

function MobileBottomBar() {
  const { totalPrice, nights, tier, guests, setShowCalendar } = useBooking();
  const currentTier = TIERS[tier];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3.5 flex items-center justify-between shadow-2xl">
      <button
        type="button"
        onClick={() => setShowCalendar(true)}
        className="text-left cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
          <span className="text-xs text-orange-600 font-bold underline">/ {nights} {nights === 1 ? 'night' : 'nights'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-bold mt-0.5">
          <Star className="w-3 h-3 fill-orange-500 text-orange-500 shrink-0" />
          <span className="text-sky-700 font-extrabold">{currentTier.shortName}</span>
          <span>·</span>
          <span className="text-slate-600 font-medium">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
        </div>
      </button>

      <a
        href="#booking"
        onClick={(e) => {
          const el = document.getElementById('booking') || document.getElementById('booking-section');
          if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }}
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-black text-xs shadow-lg shadow-orange-500/25 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer touch-manipulation"
      >
        <span>Reserve</span>
        <span className="text-xs font-black">→</span>
      </a>
    </div>
  );
}

// --- Main BookingProvider ----------------------------------------------------

export function BookingProvider({ children }: { children: ReactNode }) {
  // State
  const [tier, setTier] = useState<BookingTier>('lakefront-room-1');
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState(() => getInitialDate(1));
  const [checkOut, setCheckOut] = useState(() => getInitialDate(2));
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeDateStep, setActiveDateStep] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  // Supabase Availability State
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({});
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  // Derived values
  const nights = calculateNights(checkIn, checkOut);
  const formattedCheckIn = formatDisplayDate(checkIn);
  const formattedCheckOut = formatDisplayDate(checkOut);
  const rooms = TIERS[tier].rooms;

  // 1. Fetch Availability from Supabase via get_calendar_availability RPC
  const fetchAvailability = useCallback(async () => {
    if (!isSupabaseConfigured) return;

    setAvailabilityLoading(true);
    setAvailabilityError(null);

    try {
      const today = new Date();
      const startDateStr = `${today.getFullYear()}-${padDate(today.getMonth() + 1)}-${padDate(today.getDate())}`;
      
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 90);
      const endDateStr = `${futureDate.getFullYear()}-${padDate(futureDate.getMonth() + 1)}-${padDate(futureDate.getDate())}`;

      const { data, error } = await supabase.rpc('get_calendar_availability', {
        p_start_date: startDateStr,
        p_end_date: endDateStr,
      });

      if (error) {
        console.warn('Live availability fetch notice:', error.message);
        setAvailabilityError(error.message);
        return;
      }

      if (data && Array.isArray(data)) {
        const map: Record<string, DayAvailability> = {};
        for (const row of data as DayAvailability[]) {
          map[row.cal_date] = row;
        }
        setAvailability(map);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to query live availability';
      setAvailabilityError(msg);
    } finally {
      setAvailabilityLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // 2. Check if a single date is blocked for a specific tier
  const isDateBlocked = useCallback((dateStr: string, tierToCheck?: BookingTier): boolean => {
    if (!dateStr) return false;
    const [y, m, d] = dateStr.split('-').map(Number);
    const cellDate = new Date(y, m - 1, d);
    const today = new Date(); 
    today.setHours(0, 0, 0, 0);

    // Past dates are always blocked
    if (cellDate < today) return true;

    const targetTier = tierToCheck || tier;
    const dayData = availability[dateStr];

    // If live data is available, check boolean flags
    if (dayData) {
      if (targetTier === 'lakefront-room-1') {
        return !dayData.room_1_available;
      }
      if (targetTier === 'lakefront-room-2') {
        return !dayData.room_2_available;
      }
      if (targetTier === 'whole-floor') {
        return !dayData.whole_floor_available;
      }
    }

    // Fallback: If outside 90-day window or offline, treat future as open
    return false;
  }, [availability, tier]);

  // 3. Check if all nights in a range are open
  const isRangeAvailable = useCallback((inDateStr: string, outDateStr: string, tierToCheck?: BookingTier): boolean => {
    if (!inDateStr || !outDateStr) return true;
    try {
      const [y1, m1, d1] = inDateStr.split('-').map(Number);
      const [y2, m2, d2] = outDateStr.split('-').map(Number);
      const curr = new Date(y1, m1 - 1, d1);
      const end = new Date(y2, m2 - 1, d2);

      while (curr < end) {
        const curStr = `${curr.getFullYear()}-${padDate(curr.getMonth() + 1)}-${padDate(curr.getDate())}`;
        if (isDateBlocked(curStr, tierToCheck)) {
          return false;
        }
        curr.setDate(curr.getDate() + 1);
      }
      return true;
    } catch { return true; }
  }, [isDateBlocked]);

  // 4. Dynamic Pricing Calculation from RPC rates
  const totalPrice = useMemo(() => {
    let total = 0;
    try {
      const [y1, m1, d1] = checkIn.split('-').map(Number);
      const curr = new Date(y1, m1 - 1, d1);

      for (let i = 0; i < nights; i++) {
        const curStr = `${curr.getFullYear()}-${padDate(curr.getMonth() + 1)}-${padDate(curr.getDate())}`;
        const dayData = availability[curStr];

        if (dayData) {
          if (tier === 'lakefront-room-1') {
            total += Math.round(dayData.room_1_price_paise / 100);
          } else if (tier === 'lakefront-room-2') {
            total += Math.round(dayData.room_2_price_paise / 100);
          } else {
            total += Math.round(dayData.whole_floor_price_paise / 100);
          }
        } else {
          // Fallback to tier base price
          total += TIERS[tier].basePrice;
        }
        curr.setDate(curr.getDate() + 1);
      }
    } catch {
      total = TIERS[tier].basePrice * nights;
    }
    return total;
  }, [checkIn, nights, tier, availability]);

  const nightlyRate = Math.round(totalPrice / Math.max(1, nights));

  // 5. WhatsApp Booking URL formatting
  const whatsappBookingUrl = useMemo(() => {
    const tierInfo = TIERS[tier];
    const text = 
`Hi Abhijith, I would like to inquire about booking Zen Homestay:

• Tier: ${tierInfo.name} (${tierInfo.tag})
• Dates: ${formattedCheckIn} to ${formattedCheckOut} (${nights} ${nights === 1 ? 'night' : 'nights'})
• Guests: ${guests} ${guests === 1 ? 'Guest' : 'Guests'}
• Total Estimate: ₹${totalPrice.toLocaleString('en-IN')}

Please let me know the availability!`;

    return `https://wa.me/917012761588?text=${encodeURIComponent(text)}`;
  }, [tier, formattedCheckIn, formattedCheckOut, nights, guests, totalPrice]);

  // Calendar Month Navigation
  const prevMonth = () => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const nextMonth = () => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  // Handle Guest Count change (bounded by tier's maxGuests)
  const handleGuestChange = (delta: number) => {
    setGuests(prev => Math.min(TIERS[tier].maxGuests, Math.max(1, prev + delta)));
  };

  // Compatibility room toggler
  const handleRoomChange = (delta: number) => {
    if (delta > 0) setTier('whole-floor');
    else setTier('lakefront-room-1');
  };

  // Date cell click state machine
  const handleDateCellClick = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${padDate(month + 1)}-${padDate(day)}`;
    const selected = new Date(year, month, day);

    // If clicked date is blocked for this tier, do not allow as check-in
    if (activeDateStep === 'checkIn') {
      if (isDateBlocked(dateStr, tier)) return;

      setCheckIn(dateStr);

      const [oy, om, od] = checkOut.split('-').map(Number);
      const outD = new Date(oy, om - 1, od);

      // If existing checkOut is invalid or blocked in between, find next open day
      if (outD <= selected || isNaN(outD.getTime()) || !isRangeAvailable(dateStr, checkOut)) {
        const next = new Date(selected);
        next.setDate(next.getDate() + 1);
        const nextStr = `${next.getFullYear()}-${padDate(next.getMonth() + 1)}-${padDate(next.getDate())}`;
        setCheckOut(nextStr);
      }
      setActiveDateStep('checkOut');
    } else {
      // Step: Checkout
      const [iy, im, id] = checkIn.split('-').map(Number);
      const inD = new Date(iy, im - 1, id);

      if (selected <= inD) {
        // If clicked date is earlier than or equal to checkIn, reset checkIn
        if (!isDateBlocked(dateStr, tier)) {
          setCheckIn(dateStr);
          const next = new Date(selected);
          next.setDate(next.getDate() + 1);
          setCheckOut(`${next.getFullYear()}-${padDate(next.getMonth() + 1)}-${padDate(next.getDate())}`);
          setActiveDateStep('checkOut');
        }
      } else {
        // Clicked after checkIn
        // Verify every night between checkIn and selected is unblocked
        if (isRangeAvailable(checkIn, dateStr)) {
          setCheckOut(dateStr);
          setShowCalendar(false);
        } else {
          // Range has blocked dates in between, reset checkIn to this date if open
          if (!isDateBlocked(dateStr, tier)) {
            setCheckIn(dateStr);
            const next = new Date(selected);
            next.setDate(next.getDate() + 1);
            setCheckOut(`${next.getFullYear()}-${padDate(next.getMonth() + 1)}-${padDate(next.getDate())}`);
            setActiveDateStep('checkOut');
          }
        }
      }
    }
  };

  // Quick preset apply
  const applyPreset = (presetNights: number, offsetDays = 1) => {
    const inD = new Date();
    inD.setDate(inD.getDate() + offsetDays);

    // Search for first available start date within next 14 days
    for (let o = 0; o < 14; o++) {
      const candidateIn = new Date(inD);
      candidateIn.setDate(candidateIn.getDate() + o);
      const candidateOut = new Date(candidateIn);
      candidateOut.setDate(candidateOut.getDate() + presetNights);

      const inStr = `${candidateIn.getFullYear()}-${padDate(candidateIn.getMonth() + 1)}-${padDate(candidateIn.getDate())}`;
      const outStr = `${candidateOut.getFullYear()}-${padDate(candidateOut.getMonth() + 1)}-${padDate(candidateOut.getDate())}`;

      if (isRangeAvailable(inStr, outStr)) {
        setCheckIn(inStr);
        setCheckOut(outStr);
        setShowCalendar(false);
        return;
      }
    }

    // Fallback if fully booked
    const fallbackIn = new Date(inD);
    const fallbackOut = new Date(fallbackIn);
    fallbackOut.setDate(fallbackOut.getDate() + presetNights);
    setCheckIn(`${fallbackIn.getFullYear()}-${padDate(fallbackIn.getMonth() + 1)}-${padDate(fallbackIn.getDate())}`);
    setCheckOut(`${fallbackOut.getFullYear()}-${padDate(fallbackOut.getMonth() + 1)}-${padDate(fallbackOut.getDate())}`);
    setShowCalendar(false);
  };

  // Clamp guests when switching to a smaller tier
  useEffect(() => {
    setGuests(prev => Math.min(TIERS[tier].maxGuests, Math.max(1, prev)));
  }, [tier]);

  // Lock body scroll when calendar modal is open
  useEffect(() => {
    document.body.style.overflow = showCalendar ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showCalendar]);

  const value: BookingContextType = {
    tier,
    setTier,
    rooms,
    guests,
    checkIn,
    checkOut,
    nights,
    totalPrice,
    nightlyRate,
    formattedCheckIn,
    formattedCheckOut,
    whatsappBookingUrl,
    showCalendar,
    activeDateStep,
    calendarMonth,
    availability,
    availabilityLoading,
    availabilityError,
    isDateBlocked,
    isRangeAvailable,
    handleRoomChange,
    handleGuestChange,
    handleDateCellClick,
    applyPreset,
    setActiveDateStep,
    setShowCalendar,
    prevMonth,
    nextMonth,
    getDaysInMonth,
    getFirstDayOfMonth,
    refetchAvailability: fetchAvailability,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
      <CalendarModal />
      <MobileBottomBar />
    </BookingContext.Provider>
  );
}
