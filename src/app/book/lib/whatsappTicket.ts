import type { BookingSubmission } from './bookingTypes';
import {
  TIERS_CONFIG,
  calculateNights,
  calculateSpeedboatPrice,
  calculateKayakPrice,
  KAYAK_PACKAGES,
  formatFullDate,
  formatINR,
} from './pricingUtils';

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

  const addons = submission.addons || params.addons;
  const addonLines: string[] = [];
  if (addons) {
    const sbPkg =
      addons.speedboatPackage !== undefined
        ? addons.speedboatPackage
        : addons.speedboatPersons && addons.speedboatPersons > 0
        ? '10-min'
        : null;

    if (sbPkg) {
      const adultGuests = Math.min(7, Math.max(1, params.guests || 1));
      const sbPrice = calculateSpeedboatPrice(sbPkg, adultGuests);
      if (sbPkg === '10-min') {
        addonLines.push(
          `• Speed Boat (10-Min Fun Ride · ${adultGuests} ${
            adultGuests === 1 ? 'guest' : 'guests'
          }): ${formatINR(sbPrice)}`
        );
      } else if (sbPkg === '30-min') {
        addonLines.push(`• Speed Boat (30-Min Lake Ride): ${formatINR(sbPrice)}`);
      } else if (sbPkg === '1-hour') {
        addonLines.push(`• Speed Boat (1-Hour Village Cruise): ${formatINR(sbPrice)}`);
      }
    }
    const kayakPkg =
      addons.kayakPackage !== undefined
        ? addons.kayakPackage
        : addons.kayakPersons && addons.kayakPersons > 0
        ? '1-hour'
        : null;

    if (kayakPkg) {
      const kayakGuests = Math.max(1, params.guests || 1);
      const kayakPrice = calculateKayakPrice(kayakPkg, kayakGuests);
      const pkgName = KAYAK_PACKAGES[kayakPkg].name;
      addonLines.push(
        `• Kayaking (${pkgName} · ${kayakGuests} ${
          kayakGuests === 1 ? 'guest' : 'guests'
        }): ${formatINR(kayakPrice)}`
      );
    }
    if (addons.shikaraHours && addons.shikaraHours > 0) {
      addonLines.push(
        `• Shikara Boating: ${addons.shikaraHours} ${
          addons.shikaraHours === 1 ? 'hour' : 'hours'
        } (${formatINR(addons.shikaraHours * 1000)})`
      );
    }
  }

  const addonsSection =
    addonLines.length > 0 ? `🛶 OPTIONAL ACTIVITIES:\n${addonLines.join('\n')}\n` : '';

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
${addonsSection}💰 PAYMENT PREFERENCE:
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

