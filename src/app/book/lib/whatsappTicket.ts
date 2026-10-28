import type { BookingSubmission } from './bookingTypes';
import { TIERS_CONFIG, calculateNights, formatFullDate, formatINR } from './pricingUtils';

export const HOST_PHONE = '917012761588';
export const HOST_PHONE_DISPLAY = '+91 7012 761 588';

export function buildWhatsAppTicketMessage(submission: BookingSubmission): string {
  const { ref, params, guest, paymentOption, totalPrice, advanceAmount, balanceAmount } = submission;
  const tierConfig = TIERS_CONFIG[params.tier] || TIERS_CONFIG['1-room'];
  const nights = calculateNights(params.checkIn, params.checkOut);

  const guestSummary = `${params.guests} ${params.guests === 1 ? 'Adult' : 'Adults'}${
    params.kids > 0 ? `, ${params.kids} ${params.kids === 1 ? 'Child' : 'Children'} (under 5)` : ''
  }`;

  const isAdvance25 = paymentOption === '25-percent';
  const optionLabel = isAdvance25 ? '25% Advance Deposit' : '100% Full Payment Upfront';

  return `🛎️ NEW BOOKING REQUEST — Zen Homestay
Reference: ${ref}
👤 GUEST DETAILS:
• Name: ${guest.name}
• Phone: ${guest.phone}
• Email: ${guest.email}
• Est. Arrival: ${guest.arrivalTime} (Speedboat pickup requested)
• Special Requests: ${guest.specialRequests.trim() || 'None'}
🏡 STAY DETAILS:
• Room: ${tierConfig.name}
• Check-in: ${formatFullDate(params.checkIn)} (from 2:00 PM)
• Checkout: ${formatFullDate(params.checkOut)} (by 11:00 AM)
• Duration: ${nights} ${nights === 1 ? 'Night' : 'Nights'}
• Guests: ${guestSummary}
💰 PAYMENT PREFERENCE:
• Option: ${optionLabel}
• Advance Due Now: ${formatINR(advanceAmount)}${!isAdvance25 ? ' (Full Payment)' : ''}
• Balance on Arrival: ${formatINR(balanceAmount)}
• Total Amount: ${formatINR(totalPrice)}
Please confirm availability and share UPI payment details!`;
}

export function buildWhatsAppUrl(submission: BookingSubmission): string {
  const message = buildWhatsAppTicketMessage(submission);
  return `https://wa.me/${HOST_PHONE}?text=${encodeURIComponent(message)}`;
}

