export type BookingTierKey = '1-room' | 'whole-floor';

export type SpeedboatPackageKey = '10-min' | '30-min' | '1-hour';
export type KayakPackageKey = '1-hour' | '2-hour';

export interface BookingAddOns {
  speedboatPackage?: SpeedboatPackageKey | null;
  speedboatPersons?: number; // Auto adult count for 10-min fun ride
  kayakPackage?: KayakPackageKey | null;
  kayakPersons?: number;     // Auto adult count for kayaking
  shikaraHours: number;     // ₹1,000 / hour
}

export interface BookingParams {
  tier: BookingTierKey;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  kids: number;
  addons?: BookingAddOns;
}

export type PaymentOption = '25-percent' | '100-percent';

export interface GuestInfo {
  name: string;
  phone: string;
  email: string;
  arrivalTime: string; // e.g. "02:30 PM"
  specialRequests: string;
}

export interface BookingSubmission {
  ref: string; // ZEN-XXXXXX
  params: BookingParams;
  guest: GuestInfo;
  paymentOption: PaymentOption;
  totalPrice: number;
  advanceAmount: number;
  balanceAmount: number;
  addons?: BookingAddOns;
  addonsTotal?: number;
}

export interface TierConfig {
  id: BookingTierKey;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  maxGuests: number;
  basePrice: number;
  rooms: number;
  image: string;
}

