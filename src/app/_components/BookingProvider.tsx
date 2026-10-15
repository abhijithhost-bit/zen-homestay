'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { Star } from 'lucide-react';
import CalendarModal from './CalendarModal';
import { supabase, isSupabaseConfigured, DayAvailability } from '@/lib/supabase';

// --- Tier Definitions --------------------------------------------------------

export type BookingOption = '1-room' | 'whole-floor';
export type BookingTier = '1-room' | 'whole-floor' | 'lakefront-room-1' | 'lakefront-room-2';
export type PhysicalRoom = 'lakefront-room-1' | 'lakefront-room-2' | 'whole-floor';

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

export const TIERS: Record<string, TierInfo> = {
  '1-room': {
    id: '1-room',
    name: '1 Bedroom (Lake View)',
    shortName: '1 Bedroom',
    tag: 'Lake View King Bedroom',
    description: 'Direct Punnamada Lake view · Attached bathroom · King bed',
    maxGuests: 3,
    rooms: 1,
    basePrice: 3000,
  },
  'whole-floor': {
    id: 'whole-floor',
    name: '2 Bedrooms (Entire Floor)',
    shortName: '2 Bedrooms (Entire Floor)',
    tag: 'Entire Private 2nd Floor',
    description: 'Both Lakefront Bedrooms · 2 King beds · Exclusive private floor',
    maxGuests: 6,
    rooms: 2,
    basePrice: 6000,
  },
  // Legacy aliases for total backward compatibility
  'lakefront-room-1': {
    id: '1-room',
    name: '1 Bedroom (Lake View)',
    shortName: '1 Bedroom',
    tag: 'Lake View King Bedroom',
    description: 'Direct Punnamada Lake view · Attached bathroom · King bed',
    maxGuests: 3,
    rooms: 1,
    basePrice: 3000,
  },
  'lakefront-room-2': {
    id: '1-room',
    name: '1 Bedroom (Lake View)',
    shortName: '1 Bedroom',
    tag: 'Lake View King Bedroom',
    description: 'Direct Punnamada Lake view · Attached bathroom · King bed',
    maxGuests: 3,
    rooms: 1,
    basePrice: 3000,
  },
};

// --- Occupancy Rules ---------------------------------------------------------
// 4 persons total per room (adults + kids), 2 kids max per room
const TOTAL_CAP_PER_ROOM = 4;
const MAX_KIDS_PER_ROOM = 2;
// Extra adult charge: 2 adults included in base rate; ₹1,000/night for each additional adult
const BASE_ADULTS_PER_ROOM = 2;
const EXTRA_PERSON_CHARGE = 1000; // ₹ per extra adult per night

// --- Context Types -----------------------------------------------------------

export interface BookingContextType {
  tier: BookingTier;
  setTier: (tier: BookingTier) => void;
  currentTier: TierInfo;
  assignedRoom: PhysicalRoom | null;
  isCurrentSelectionAvailable: boolean;
  is1RoomAvailable: boolean;
  isWholeFloorAvailable: boolean;
  rooms: number; // For compatibility (1 or 2)
  guests: number;
  kids: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  totalPrice: number;
  nightlyRate: number;
  extraPersonFeePerNight: number; // ₹1,000 × extra adults, per night
  extraPersonFeeTotal: number;    // extraPersonFeePerNight × nights
  formattedCheckIn: string;
  formattedCheckOut: string;
  whatsappBookingUrl: string;
  showCalendar: boolean;
  activeDateStep: 'checkIn' | 'checkOut';
  calendarMonth: Date;
  availability: Record<string, DayAvailability>;
  availabilityLoading: boolean;
  availabilityError: string | null;
  isDateBlocked: (dateStr: string, tierToCheck?: string) => boolean;
  isRangeAvailable: (inDateStr: string, outDateStr: string, tierToCheck?: string) => boolean;
  handleRoomChange: (delta: number) => void;
  handleGuestChange: (delta: number) => void;
  handleKidsChange: (delta: number) => void;
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

// Stable lookup tables — avoids toLocaleDateString() which can differ between
// Node.js ICU data (SSR) and Chrome, causing React hydration mismatches.
const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTH_SHORT   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    // e.g. "Thu, Oct 16" — identical on server and client
    return `${WEEKDAY_SHORT[date.getDay()]}, ${MONTH_SHORT[m - 1]} ${d}`;
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
  // Use currentTier from context — it carries the live dashboard maxGuests override
  const { totalPrice, nights, currentTier, guests, setShowCalendar, isCurrentSelectionAvailable } = useBooking();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3.5 flex items-center justify-between shadow-2xl">
      <button
        type="button"
        onClick={() => setShowCalendar(true)}
        className="text-left cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-slate-900">
            {isCurrentSelectionAvailable ? `₹${totalPrice.toLocaleString('en-IN')}` : 'Sold Out'}
          </span>
          {isCurrentSelectionAvailable && (
            <span className="text-xs text-orange-600 font-bold underline">/ {nights} {nights === 1 ? 'night' : 'nights'}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-bold mt-0.5">
          <Star className="w-3 h-3 fill-orange-500 text-orange-500 shrink-0" />
          <span className="text-sky-700 font-extrabold">{currentTier.shortName}</span>
          <span>·</span>
          <span className="text-slate-600 font-medium">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
        </div>
      </button>

      <a
        href="#booking-section"
        onClick={(e) => {
          e.preventDefault();
          // 'booking-section' is the mobile widget; 'booking' is the desktop sidebar
          const el = document.getElementById('booking-section') || document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  // State: default to '1-room'
  const [tier, setTier] = useState<BookingTier>('1-room');
  const [guests, setGuests] = useState(2);
  const [kids, setKids] = useState(0); // children under 5 years old
  const [checkIn, setCheckIn] = useState(() => getInitialDate(1));
  const [checkOut, setCheckOut] = useState(() => getInitialDate(2));
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeDateStep, setActiveDateStep] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  // Dynamic capacity from dashboard
  const [roomMaxGuests, setRoomMaxGuests] = useState(3);
  const [wholeFloorMaxGuests, setWholeFloorMaxGuests] = useState(6);

  // Supabase Availability State
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({});
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  // Dynamic currentTier with live maxGuests from dashboard
  const currentTier = useMemo((): TierInfo => {
    const base = TIERS[tier] || TIERS['1-room'];
    const maxG = tier === 'whole-floor' ? wholeFloorMaxGuests : roomMaxGuests;
    return { ...base, maxGuests: maxG };
  }, [tier, roomMaxGuests, wholeFloorMaxGuests]);

  // Derived values
  const nights = calculateNights(checkIn, checkOut);
  const formattedCheckIn = formatDisplayDate(checkIn);
  const formattedCheckOut = formatDisplayDate(checkOut);
  const rooms = (TIERS[tier] || TIERS['1-room']).rooms;

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

      const [rpcRes, roomsRes, settingsRes] = await Promise.all([
        supabase.rpc('get_calendar_availability', {
          p_start_date: startDateStr,
          p_end_date: endDateStr,
        }),
        supabase.from('rooms').select('max_guests'),
        supabase.from('property_settings').select('whole_floor_max_guests').single(),
      ]);

      if (rpcRes.error) {
        console.warn('Live availability fetch notice:', rpcRes.error.message);
        setAvailabilityError(rpcRes.error.message);
        return;
      }

      if (rpcRes.data && Array.isArray(rpcRes.data)) {
        const map: Record<string, DayAvailability> = {};
        for (const row of rpcRes.data as DayAvailability[]) {
          map[row.cal_date] = row;
        }
        setAvailability(map);
      }

      if (roomsRes.data && roomsRes.data.length > 0) {
        const maxG = Math.max(...roomsRes.data.map(r => r.max_guests || 3));
        if (maxG > 0) setRoomMaxGuests(maxG);
      }
      if (settingsRes.data?.whole_floor_max_guests) {
        setWholeFloorMaxGuests(settingsRes.data.whole_floor_max_guests);
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
  const isDateBlocked = useCallback((dateStr: string, tierToCheck?: string): boolean => {
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
      // '1-room' option is blocked only if BOTH rooms are unavailable
      if (targetTier === '1-room') {
        return !dayData.room_1_available && !dayData.room_2_available;
      }
    }

    // Fallback: If outside 90-day window or offline, treat future as open
    return false;
  }, [availability, tier]);

  // 3. Check if all nights in a range are open
  const isRangeAvailable = useCallback((inDateStr: string, outDateStr: string, tierToCheck?: string): boolean => {
    if (!inDateStr || !outDateStr) return true;
    const targetTier = tierToCheck || tier;

    // For 1-room, guest needs either room 1 or room 2 continuously available for the entire duration
    if (targetTier === '1-room') {
      const room1Ok = isRangeAvailable(inDateStr, outDateStr, 'lakefront-room-1');
      const room2Ok = isRangeAvailable(inDateStr, outDateStr, 'lakefront-room-2');
      return room1Ok || room2Ok;
    }

    try {
      const [y1, m1, d1] = inDateStr.split('-').map(Number);
      const [y2, m2, d2] = outDateStr.split('-').map(Number);
      const curr = new Date(y1, m1 - 1, d1);
      const end = new Date(y2, m2 - 1, d2);

      while (curr < end) {
        const curStr = `${curr.getFullYear()}-${padDate(curr.getMonth() + 1)}-${padDate(curr.getDate())}`;
        if (isDateBlocked(curStr, targetTier)) {
          return false;
        }
        curr.setDate(curr.getDate() + 1);
      }
      return true;
    } catch { return true; }
  }, [isDateBlocked, tier]);

  // 4. Smart Auto-Assignment Logic:
  // If user selects "1 Premium Room":
  // - If Room 1 is available -> assign Room 1
  // - If Room 1 is booked but Room 2 is available -> auto-assign Room 2
  // - If both are booked -> sold out (null)
  // If user selects "Whole Floor":
  // - Requires whole_floor_available to be true
  const assignedRoom = useMemo((): PhysicalRoom | null => {
    if (tier === 'whole-floor') {
      return isRangeAvailable(checkIn, checkOut, 'whole-floor') ? 'whole-floor' : null;
    }

    // 1 Premium Room option (or legacy room IDs)
    if (isRangeAvailable(checkIn, checkOut, 'lakefront-room-1')) {
      return 'lakefront-room-1';
    }
    if (isRangeAvailable(checkIn, checkOut, 'lakefront-room-2')) {
      return 'lakefront-room-2';
    }
    return null;
  }, [tier, checkIn, checkOut, isRangeAvailable]);

  const isCurrentSelectionAvailable = assignedRoom !== null;

  const is1RoomAvailable = useMemo(() => {
    return isRangeAvailable(checkIn, checkOut, 'lakefront-room-1') || isRangeAvailable(checkIn, checkOut, 'lakefront-room-2');
  }, [checkIn, checkOut, isRangeAvailable]);

  const isWholeFloorAvailable = useMemo(() => {
    return isRangeAvailable(checkIn, checkOut, 'whole-floor');
  }, [checkIn, checkOut, isRangeAvailable]);

  // 5. Dynamic Pricing Calculation from RPC rates
  const totalPrice = useMemo(() => {
    // Extra person charge: ₹1,000 per night per adult above the base (2 per room)
    const extraGuests = Math.max(0, guests - rooms * BASE_ADULTS_PER_ROOM);
    const extraFeePerNight = extraGuests * EXTRA_PERSON_CHARGE;

    let total = 0;
    try {
      const [y1, m1, d1] = checkIn.split('-').map(Number);
      const curr = new Date(y1, m1 - 1, d1);

      for (let i = 0; i < nights; i++) {
        const curStr = `${curr.getFullYear()}-${padDate(curr.getMonth() + 1)}-${padDate(curr.getDate())}`;
        const dayData = availability[curStr];

        if (dayData) {
          if (tier === 'whole-floor') {
            total += Math.round(dayData.whole_floor_price_paise / 100);
          } else if (assignedRoom === 'lakefront-room-2') {
            total += Math.round(dayData.room_2_price_paise / 100);
          } else {
            // Room 1 or standard 1-room rate
            total += Math.round(dayData.room_1_price_paise / 100);
          }
        } else {
          // Fallback to tier base price
          total += (TIERS[tier] || TIERS['1-room']).basePrice;
        }
        // Add extra person charge for this night
        total += extraFeePerNight;
        curr.setDate(curr.getDate() + 1);
      }
    } catch {
      total = (TIERS[tier] || TIERS['1-room']).basePrice * nights;
    }
    return total;
  }, [checkIn, nights, tier, assignedRoom, availability, guests, rooms]);

  const nightlyRate = Math.round(totalPrice / Math.max(1, nights));

  // Extra person fee breakdown (for display)
  const extraPersonFeePerNight = Math.max(0, guests - rooms * BASE_ADULTS_PER_ROOM) * EXTRA_PERSON_CHARGE;
  const extraPersonFeeTotal = extraPersonFeePerNight * nights;

  // 6. WhatsApp Booking URL formatting
  const whatsappBookingUrl = useMemo(() => {
    const isRoom = tier !== 'whole-floor';
    const optionName = isRoom ? '1 Bedroom (Lake View)' : '2 Bedrooms (Entire Floor)';

    let text = '';
    if (isCurrentSelectionAvailable) {
      text = 
`Hi Abhijith, I would like to book ${isRoom ? '1 Bedroom (Lake View)' : '2 Bedrooms (Entire Floor)'} at Zen Homestay:

• Option: ${optionName}
• Dates: ${formattedCheckIn} to ${formattedCheckOut} (${nights} ${nights === 1 ? 'night' : 'nights'})
• Guests: ${guests} ${guests === 1 ? 'Guest' : 'Guests'}${kids > 0 ? ` + ${kids} ${kids === 1 ? 'Child' : 'Children'} (below 5 yrs)` : ''}${extraPersonFeeTotal > 0 ? `
• Extra Guest Fee: ₹${extraPersonFeeTotal.toLocaleString('en-IN')} (₹${EXTRA_PERSON_CHARGE}/extra adult/night)` : ''}
• Total Estimate: ₹${totalPrice.toLocaleString('en-IN')}

Please confirm availability and booking details!`;
    } else {
      text = 
`Hi Abhijith, I would like to inquire about booking ${isRoom ? '1 Bedroom' : '2 Bedrooms (Entire Floor)'} at Zen Homestay:

• Option: ${optionName}
• Dates: ${formattedCheckIn} to ${formattedCheckOut} (${nights} ${nights === 1 ? 'night' : 'nights'})
• Guests: ${guests} ${guests === 1 ? 'Guest' : 'Guests'}${kids > 0 ? ` + ${kids} ${kids === 1 ? 'Child' : 'Children'} (below 5 yrs)` : ''}

These dates appear unavailable online. Please let me know if there are any openings or alternative dates!`;
    }

    return `https://wa.me/917012761588?text=${encodeURIComponent(text)}`;
  }, [tier, isCurrentSelectionAvailable, formattedCheckIn, formattedCheckOut, nights, guests, kids, totalPrice, extraPersonFeeTotal]);

  // Calendar Month Navigation — useCallback so context consumers don't re-render on every provider render
  const prevMonth = useCallback(
    () => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)),
    []
  );
  const nextMonth = useCallback(
    () => setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)),
    []
  );
  // Pure date-math helpers — stable references, no deps needed
  const getDaysInMonth = useCallback((y: number, m: number) => new Date(y, m + 1, 0).getDate(), []);
  const getFirstDayOfMonth = useCallback((y: number, m: number) => new Date(y, m, 1).getDay(), []);

  // Handle Guest Count change
  // Adults are capped by: tier maxGuests AND (totalCap - current kids)
  const handleGuestChange = useCallback((delta: number) => {
    const totalCap = rooms * TOTAL_CAP_PER_ROOM;
    const maxGuests = Math.min(currentTier.maxGuests, totalCap - kids);
    setGuests(prev => Math.min(maxGuests, Math.max(1, prev + delta)));
  }, [rooms, currentTier.maxGuests, kids]);

  // Handle Kids count change
  // Kids are capped by: 2 per room AND (totalCap - current adults)
  const handleKidsChange = useCallback((delta: number) => {
    const totalCap = rooms * TOTAL_CAP_PER_ROOM;
    const maxKids = Math.min(rooms * MAX_KIDS_PER_ROOM, totalCap - guests);
    setKids(prev => Math.min(maxKids, Math.max(0, prev + delta)));
  }, [rooms, guests]);

  // Compatibility room toggler
  const handleRoomChange = useCallback((delta: number) => {
    if (delta > 0) setTier('whole-floor');
    else setTier('1-room');
  }, []);

  // Date cell click state machine — useCallback: deps are stable memoised fns + primitive state
  const handleDateCellClick = useCallback((year: number, month: number, day: number) => {
    const dateStr = `${year}-${padDate(month + 1)}-${padDate(day)}`;
    const selected = new Date(year, month, day);

    if (activeDateStep === 'checkIn') {
      if (isDateBlocked(dateStr, tier)) return;

      setCheckIn(dateStr);

      const [oy, om, od] = checkOut.split('-').map(Number);
      const outD = new Date(oy, om - 1, od);

      if (outD <= selected || isNaN(outD.getTime()) || !isRangeAvailable(dateStr, checkOut, tier)) {
        const next = new Date(selected);
        next.setDate(next.getDate() + 1);
        const nextStr = `${next.getFullYear()}-${padDate(next.getMonth() + 1)}-${padDate(next.getDate())}`;
        setCheckOut(nextStr);
      }
      setActiveDateStep('checkOut');
    } else {
      const [iy, im, id] = checkIn.split('-').map(Number);
      const inD = new Date(iy, im - 1, id);

      if (selected <= inD) {
        if (!isDateBlocked(dateStr, tier)) {
          setCheckIn(dateStr);
          const next = new Date(selected);
          next.setDate(next.getDate() + 1);
          setCheckOut(`${next.getFullYear()}-${padDate(next.getMonth() + 1)}-${padDate(next.getDate())}`);
          setActiveDateStep('checkOut');
        }
      } else {
        if (isRangeAvailable(checkIn, dateStr, tier)) {
          setCheckOut(dateStr);
          setShowCalendar(false);
        } else {
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
  }, [activeDateStep, checkIn, checkOut, tier, isDateBlocked, isRangeAvailable, setShowCalendar]);

  // Quick preset apply
  const applyPreset = useCallback((presetNights: number, offsetDays = 1) => {
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

      if (isRangeAvailable(inStr, outStr, tier)) {
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
  }, [isRangeAvailable, tier, setShowCalendar]);

  // Clamp kids when the number of rooms decreases (tier switch)
  useEffect(() => {
    const maxKids = rooms * MAX_KIDS_PER_ROOM;
    setKids(prev => Math.min(maxKids, Math.max(0, prev)));
  }, [rooms]);

  // Clamp guests when tier capacity or kids count changes.
  // Splitting this into its own effect avoids calling setState inside a setState
  // updater (which is a React anti-pattern that double-fires in StrictMode).
  useEffect(() => {
    const totalCap = rooms * TOTAL_CAP_PER_ROOM;
    setGuests(prev => Math.min(Math.min(currentTier.maxGuests, totalCap - kids), Math.max(1, prev)));
  }, [currentTier.maxGuests, rooms, kids]);

  // Lock body scroll when calendar modal is open
  useEffect(() => {
    document.body.style.overflow = showCalendar ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showCalendar]);

  // Memoize the context value so consumers only re-render when their specific
  // slice of state actually changes — not on every provider render
  const value: BookingContextType = useMemo((): BookingContextType => ({
    tier,
    setTier,
    currentTier,
    assignedRoom,
    isCurrentSelectionAvailable,
    is1RoomAvailable,
    isWholeFloorAvailable,
    rooms,
    guests,
    kids,
    checkIn,
    checkOut,
    nights,
    totalPrice,
    nightlyRate,
    extraPersonFeePerNight,
    extraPersonFeeTotal,
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
    handleKidsChange,
    handleDateCellClick,
    applyPreset,
    setActiveDateStep,
    setShowCalendar,
    prevMonth,
    nextMonth,
    getDaysInMonth,
    getFirstDayOfMonth,
    refetchAvailability: fetchAvailability,
  }), [
    tier, currentTier, assignedRoom, isCurrentSelectionAvailable,
    is1RoomAvailable, isWholeFloorAvailable, rooms, guests, kids,
    checkIn, checkOut, nights, totalPrice, nightlyRate,
    extraPersonFeePerNight, extraPersonFeeTotal,
    formattedCheckIn, formattedCheckOut, whatsappBookingUrl,
    showCalendar, activeDateStep, calendarMonth, availability,
    availabilityLoading, availabilityError,
    isDateBlocked, isRangeAvailable,
    handleRoomChange, handleGuestChange, handleKidsChange,
    handleDateCellClick, applyPreset,
    prevMonth, nextMonth, getDaysInMonth, getFirstDayOfMonth,
    fetchAvailability,
  ]);


  return (
    <BookingContext.Provider value={value}>
      {children}
      <CalendarModal />
      <MobileBottomBar />
    </BookingContext.Provider>
  );
}
