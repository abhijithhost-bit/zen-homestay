import type { BookingParams, BookingTierKey, TierConfig, SpeedboatPackageKey, KayakPackageKey } from './bookingTypes';
import type { DayAvailability } from '@/lib/supabase';

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

export interface SpeedboatPackageInfo {
  id: SpeedboatPackageKey;
  name: string;
  shortName: string;
  duration: string;
  maxCapacity: number;
  description: string;
}

export const SPEEDBOAT_PACKAGES: Record<SpeedboatPackageKey, SpeedboatPackageInfo> = {
  '10-min': {
    id: '10-min',
    name: '10-Minute Fun Ride',
    shortName: '10-Min Fun Ride',
    duration: '10 mins',
    maxCapacity: 7,
    description: 'High-speed thrill ride on Punnamada Lake',
  },
  '30-min': {
    id: '30-min',
    name: '30-Minute Lake Ride',
    shortName: '30-Min Lake Ride',
    duration: '30 mins',
    maxCapacity: 7,
    description: 'Scenic cruise across the expansive waters of Punnamada Lake',
  },
  '1-hour': {
    id: '1-hour',
    name: '1-Hour Village Cruise',
    shortName: '1-Hour Village Cruise',
    duration: '1 hour',
    maxCapacity: 7,
    description: 'Scenic cruise through Alleppey backwaters & local village canals',
  },
};

export function calculateSpeedboatPrice(
  packageKey: SpeedboatPackageKey | null | undefined,
  adultGuests: number
): number {
  if (!packageKey) return 0;
  if (packageKey === '30-min') return 3000;
  if (packageKey === '1-hour') return 6000;
  if (packageKey === '10-min') {
    const count = Math.min(7, Math.max(1, adultGuests || 1));
    if (count <= 3) return 1300;
    return count * 400; // 4=1600, 5=2000, 6=2400, 7=2800
  }
  return 0;
}

export interface KayakPackageInfo {
  id: KayakPackageKey;
  name: string;
  duration: string;
  ratePerPerson: number;
  description: string;
}

export const KAYAK_PACKAGES: Record<KayakPackageKey, KayakPackageInfo> = {
  '1-hour': {
    id: '1-hour',
    name: '1-Hour Kayaking',
    duration: '1 hour',
    ratePerPerson: 500,
    description: 'Serene self-paddle kayak exploration right from our dock',
  },
  '2-hour': {
    id: '2-hour',
    name: '2-Hour Narrow Canal Exploration',
    duration: '2 hours',
    ratePerPerson: 650,
    description: 'Scenic exploration through narrow backwater canals and village waterways',
  },
};

export function calculateKayakPrice(
  packageKey: KayakPackageKey | null | undefined,
  adultGuests: number
): number {
  if (!packageKey) return 0;
  const count = Math.max(1, adultGuests || 1);
  const rate = packageKey === '2-hour' ? 650 : 500;
  return count * rate;
}

export const ADDON_RATES = {
  SPEEDBOAT_PER_PERSON: 400, // Legacy fallback
  KAYAK_PER_PERSON: 500,     // Kayaking (per person)
  SHIKARA_PER_HOUR: 1000,    // Shikara Boating (per hour)
} as const;

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

/**
 * Check if a single date is blocked in Supabase availability
 */
export function isDateBlocked(
  dateStr: string,
  tier: BookingTierKey,
  availability?: Record<string, DayAvailability>
): boolean {
  if (!dateStr) return false;
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const cellDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (cellDate < today) return true;

    if (availability && availability[dateStr]) {
      const dayData = availability[dateStr];
      if (tier === 'whole-floor') {
        return !dayData.whole_floor_available;
      }
      return !dayData.room_1_available && !dayData.room_2_available;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Check if every night in range [inDate, outDate) is available
 */
export function isRangeAvailable(
  inDateStr: string,
  outDateStr: string,
  tier: BookingTierKey,
  availability?: Record<string, DayAvailability>
): boolean {
  if (!inDateStr || !outDateStr) return true;
  try {
    const [y1, m1, d1] = inDateStr.split('-').map(Number);
    const [y2, m2, d2] = outDateStr.split('-').map(Number);
    const curr = new Date(y1, m1 - 1, d1);
    const end = new Date(y2, m2 - 1, d2);

    while (curr < end) {
      const curStr = `${curr.getFullYear()}-${padZero(curr.getMonth() + 1)}-${padZero(curr.getDate())}`;
      if (isDateBlocked(curStr, tier, availability)) {
        return false;
      }
      curr.setDate(curr.getDate() + 1);
    }
    return true;
  } catch {
    return true;
  }
}

export interface SpeedboatBreakdownItem {
  packageKey: SpeedboatPackageKey | null;
  packageName: string;
  count: number;
  rateLabel: string;
  total: number;
}

export interface AddonsBreakdownItem {
  count: number;
  rate: number;
  total: number;
}

export interface KayakBreakdownItem {
  packageKey: KayakPackageKey | null;
  packageName: string;
  count: number;
  rate: number;
  total: number;
}

export interface AddonsBreakdown {
  speedboat: SpeedboatBreakdownItem;
  shikara: AddonsBreakdownItem;
  kayak: KayakBreakdownItem;
  total: number;
}

export interface PriceBreakdown {
  nights: number;
  baseRatePerNight: number;
  baseTotal: number;
  extraGuests: number;
  extraFeePerNight: number;
  extraFeeTotal: number;
  addonsTotal: number;
  addonsBreakdown: AddonsBreakdown;
  totalPrice: number;
  advance25: number;
  balance25: number;
  advance100: number;
  balance100: number;
  otaEstimatedPrice: number;
  savingsVsOta: number;
}

export function computePriceBreakdown(
  params: BookingParams,
  availability?: Record<string, DayAvailability>
): PriceBreakdown {
  const tierConfig = TIERS_CONFIG[params.tier] || TIERS_CONFIG['1-room'];
  const nights = calculateNights(params.checkIn, params.checkOut);

  // Dynamic sum across nights from live Supabase RPC rates
  let baseTotal = 0;
  try {
    const [y1, m1, d1] = params.checkIn.split('-').map(Number);
    const curr = new Date(y1, m1 - 1, d1);

    for (let i = 0; i < nights; i++) {
      const curStr = `${curr.getFullYear()}-${padZero(curr.getMonth() + 1)}-${padZero(curr.getDate())}`;
      const dayData = availability ? availability[curStr] : undefined;

      if (dayData) {
        if (params.tier === 'whole-floor') {
          baseTotal += Math.round(dayData.whole_floor_price_paise / 100);
        } else {
          baseTotal += Math.round(dayData.room_1_price_paise / 100);
        }
      } else {
        baseTotal += tierConfig.basePrice;
      }
      curr.setDate(curr.getDate() + 1);
    }
  } catch {
    baseTotal = tierConfig.basePrice * nights;
  }

  const baseRatePerNight = Math.round(baseTotal / Math.max(1, nights));

  const extraGuests = Math.max(0, params.guests - tierConfig.rooms * BASE_ADULTS_PER_ROOM);
  const extraFeePerNight = extraGuests * EXTRA_PERSON_CHARGE;
  const extraFeeTotal = extraFeePerNight * nights;

  // Optional Add-ons calculations
  const addons = params.addons || {
    speedboatPackage: null,
    speedboatPersons: params.guests,
    kayakPackage: null,
    kayakPersons: params.guests,
    shikaraHours: 0,
  };

  // Determine active speedboat package
  let sbPkg: SpeedboatPackageKey | null = null;
  if (addons.speedboatPackage !== undefined) {
    sbPkg = addons.speedboatPackage;
  } else if (addons.speedboatPersons && addons.speedboatPersons > 0) {
    sbPkg = '10-min';
  }

  // Determine active kayak package
  let kayakPkg: KayakPackageKey | null = null;
  if (addons.kayakPackage !== undefined) {
    kayakPkg = addons.kayakPackage;
  } else if (addons.kayakPersons && addons.kayakPersons > 0) {
    kayakPkg = '1-hour';
  }

  const adultGuests = Math.min(7, Math.max(1, params.guests || 1));
  const speedboatTotal = calculateSpeedboatPrice(sbPkg, adultGuests);

  const kayakCount = kayakPkg ? Math.max(1, params.guests || 1) : 0;
  const kayakTotal = calculateKayakPrice(kayakPkg, params.guests);
  const kayakRate = kayakPkg === '2-hour' ? 650 : 500;

  const shikaraCount = Math.max(0, addons.shikaraHours || 0);
  const shikaraTotal = shikaraCount * ADDON_RATES.SHIKARA_PER_HOUR;
  const addonsTotal = speedboatTotal + kayakTotal + shikaraTotal;

  let sbRateLabel = '';
  if (sbPkg === '10-min') {
    sbRateLabel = `${adultGuests} ${adultGuests === 1 ? 'guest' : 'guests'}`;
  }

  const addonsBreakdown: AddonsBreakdown = {
    speedboat: {
      packageKey: sbPkg,
      packageName: sbPkg ? SPEEDBOAT_PACKAGES[sbPkg].name : '',
      count: sbPkg === '10-min' ? adultGuests : (sbPkg ? 1 : 0),
      rateLabel: sbRateLabel,
      total: speedboatTotal,
    },
    shikara: {
      count: shikaraCount,
      rate: ADDON_RATES.SHIKARA_PER_HOUR,
      total: shikaraTotal,
    },
    kayak: {
      packageKey: kayakPkg,
      packageName: kayakPkg ? KAYAK_PACKAGES[kayakPkg].name : '',
      count: kayakCount,
      rate: kayakRate,
      total: kayakTotal,
    },
    total: addonsTotal,
  };

  const totalPrice = baseTotal + extraFeeTotal + addonsTotal;
  const advance25 = Math.round(totalPrice * 0.25);
  const balance25 = totalPrice - advance25;

  const advance100 = totalPrice;
  const balance100 = 0;

  const otaEstimatedPrice = Math.round((baseTotal + extraFeeTotal) * 1.33) + addonsTotal;
  const savingsVsOta = Math.max(0, otaEstimatedPrice - totalPrice);

  return {
    nights,
    baseRatePerNight,
    baseTotal,
    extraGuests,
    extraFeePerNight,
    extraFeeTotal,
    addonsTotal,
    addonsBreakdown,
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

export function generateBookingRef(checkInDate?: string, tier?: string): string {
  let datePart = '';
  if (checkInDate) {
    const parts = checkInDate.split('-');
    if (parts.length === 3) {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const monthStr = months[monthIdx] || 'STAY';
      const dayStr = parts[2].padStart(2, '0');
      datePart = `${dayStr}${monthStr}`;
    }
  }

  const roomPart = tier === 'whole-floor' ? 'WF' : '1R';
  const random4 = Math.floor(1000 + Math.random() * 9000);

  if (datePart) {
    return `ZEN-${datePart}-${roomPart}-${random4}`;
  }

  const random6 = Math.floor(100000 + Math.random() * 900000);
  return `ZEN-${random6}`;
}
