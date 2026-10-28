export type BookingTierKey = '1-room' | 'whole-floor';

export interface BookingParams {
  tier: BookingTierKey;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  guests: number;
  kids: number;
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

