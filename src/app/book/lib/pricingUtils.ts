import type { BookingParams, BookingTierKey, TierConfig } from './bookingTypes';

export const TIERS_CONFIG: Record<BookingTierKey, TierConfig> = {
  '1-room': {
    id: '1-room',
    name: '1 Bedroom (Lake View)',
    shortName: '1 Bedroom',
    tag: 'Lake View King Bedroom',
    description: 'Direct Punnamada Lake view · Attached bathroom · King bed',
    maxGuests: 3,
    rooms: 1,
    basePrice: 3000,
    image: '/kerala_lakeview_bedroom.jpg',
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
    image: '/kerala_heritage_room_1786702263227.jpg',
  },
};

export const BASE_ADULTS_PER_ROOM = 2;
export const EXTRA_PERSON_CHARGE = 500; // ₹ per extra adult per night

const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

export function padZero(n: number): string {
  return String(n).padStart(2, '0');
}

export function getDefaultDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`;
}

export function calculateNights(inDateStr: string, outDateStr: string): number {
  try {
    if (!inDateStr || !outDateStr) return 1;
    const [y1, m1, d1] = inDateStr.split('-').map(Number);
    const [y2, m2, d2] = outDateStr.split('-').map(Number);
    const diff = Math.round((new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime()) / 86400000);
    return diff > 0 ? diff : 1;
  } catch {
    return 1;
  }
}

/**
 * Formats YYYY-MM-DD into "Fri, Nov 14, 2026"
 */
export function formatFullDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return `${WEEKDAY_SHORT[date.getDay()]}, ${MONTH_SHORT[m - 1]} ${d}, ${y}`;
  } catch {
    return dateStr;
  }
}

/**
 * Formats YYYY-MM-DD into "Fri, Nov 14"
 */
export function formatShortDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return `${WEEKDAY_SHORT[date.getDay()]}, ${MONTH_SHORT[m - 1]} ${d}`;
  } catch {
    return dateStr;
  }
}

export interface PriceBreakdown {
  nights: number;
  baseRatePerNight: number;
  baseTotal: number;
  extraGuests: number;
  extraFeePerNight: number;
  extraFeeTotal: number;
  totalPrice: number;
  advance25: number;
  balance25: number;
  advance100: number;
  balance100: number;
  otaEstimatedPrice: number;
  savingsVsOta: number;
}

export function computePriceBreakdown(params: BookingParams): PriceBreakdown {
  const tierConfig = TIERS_CONFIG[params.tier] || TIERS_CONFIG['1-room'];
  const nights = calculateNights(params.checkIn, params.checkOut);
  const baseRatePerNight = tierConfig.basePrice;
  const baseTotal = baseRatePerNight * nights;

  const extraGuests = Math.max(0, params.guests - tierConfig.rooms * BASE_ADULTS_PER_ROOM);
  const extraFeePerNight = extraGuests * EXTRA_PERSON_CHARGE;
  const extraFeeTotal = extraFeePerNight * nights;

  const totalPrice = baseTotal + extraFeeTotal;
  const advance25 = Math.round(totalPrice * 0.25);
  const balance25 = totalPrice - advance25;

  const advance100 = totalPrice;
  const balance100 = 0;

  const otaEstimatedPrice = Math.round(totalPrice * 1.33);
  const savingsVsOta = otaEstimatedPrice - totalPrice;

  return {
    nights,
    baseRatePerNight,
    baseTotal,
    extraGuests,
    extraFeePerNight,
    extraFeeTotal,
    totalPrice,
    advance25,
    balance25,
    advance100,
    balance100,
    otaEstimatedPrice,
    savingsVsOta,
  };
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function generateBookingRef(): string {
  const random6 = Math.floor(100000 + Math.random() * 900000);
  return `ZEN-${random6}`;
}

