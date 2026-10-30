import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../_components/SiteFooter';
import Image from 'next/image';
import {
  ShieldCheck,
  Clock,
  Anchor,
  Waves,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Terms & Conditions | Zen Homestay Alleppey",
  description: "Terms and conditions, guest eligibility, property rules, cancellation & refund policy, and speedboat transfer details for Zen Homestay on Punnamada Lake, Alleppey.",
  alternates: {
    canonical: "https://zenhomestay.in/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | Zen Homestay Alleppey",
    description: "Terms and conditions, guest rules, cancellation policy, and speedboat transfer details for Zen Homestay Alleppey.",
    url: "https://zenhomestay.in/terms-and-conditions",
    siteName: "Zen Homestay Alleppey",
  },
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900">

      {/* Modern Luxury Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] transition-all w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
            <Image
              src="/zen-homestay-logo.jpg"
              alt="Zen Homestay Logo"
              width={44}
              height={44}
              className="object-contain rounded-xl group-hover:scale-105 transition-transform duration-300 shrink-0 ring-2 sm:ring-4 ring-sky-50 shadow-md"
              style={{ width: '44px', height: '44px' }}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-xl tracking-tight text-slate-900 leading-none group-hover:text-sky-600 transition-colors truncate">
                  Zen Homestay
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-bold text-sky-600 tracking-wider uppercase mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span className="truncate">Punnamada Lake · Alleppey</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="text-xs font-extrabold text-slate-700 hover:text-orange-600 hover:bg-orange-50 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all border border-slate-200 shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              ← Back to Listing
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">

        {/* Header Title */}
        <div className="mb-10 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-extrabold px-3 py-1 rounded-full border border-sky-100 mb-3">
            <FileText className="w-3.5 h-3.5 text-sky-600" /> Guest Guidelines & Policies
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            Please review our stay guidelines, speedboat transfer policies, and check-in details for a seamless backwater escape.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">

          {/* Section 1: Check-in & Checkout */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <Clock className="w-5 h-5" />
              </div>
              <h2>1. Check-in & Checkout Times</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li><strong>Check-in Time:</strong> 2:00 PM onwards.</li>
              <li><strong>Checkout Time:</strong> 11:00 AM.</li>
              <li>Early check-in or late checkout is subject to room availability and must be requested in advance via WhatsApp.</li>
              <li>Valid government-issued photo identification (Aadhaar, Passport, Voter ID, or Driving License) is required for all adult guests at check-in.</li>
            </ul>
          </div>

          {/* Section 2: Arrival & Speedboat Transfer (Updated with 1-time free policy + ₹300 for extra rides) */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Anchor className="w-5 h-5" />
              </div>
              <h2>2. Speedboat Transfer Policy (Pickup & Drop)</h2>
            </div>
            <ul className="list-disc list-inside space-y-2.5 text-slate-600 ml-2">
              <li>
                <strong>Complimentary 1-Time Transfer:</strong> Free speed boat pickup upon check-in (from Nehru Trophy Finishing Point to the homestay) and free drop-off upon checkout (from homestay back to the Finishing Point) is included with your stay.
              </li>
              <li>
                <strong>Additional Town Trips:</strong> If you need extra speedboat trips to town during your stay — for shopping or dining — these are available at <strong>₹300 per trip</strong>. Please note this covers town transfers only and does not include sightseeing or leisure cruises.
              </li>
              <li>
                <strong>Notice for Coordination:</strong> Please inform our on-site team or host at least 30 minutes in advance if you require boat transfers to town so the boat and pilot can be prepared.
              </li>
            </ul>
          </div>

          {/* Section 3: Guest Eligibility */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <FileText className="w-5 h-5" />
              </div>
              <h2>3. Guest Eligibility</h2>
            </div>
            <p className="text-slate-600 ml-2">
              Zen Homestay welcomes <strong>couples</strong>, <strong>small families</strong>, and <strong>solo travellers</strong>. We are a peaceful family-oriented retreat and do not accommodate bachelor groups or unmarried all-male groups.
            </p>
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl p-3 mt-2">
              <span className="text-amber-500 mt-0.5 shrink-0 text-base">⚠</span>
              <p className="text-slate-600 text-sm">
                Bookings that do not meet our guest eligibility criteria will not be confirmed. If a booking is found to be non-compliant upon arrival, the host reserves the right to decline check-in.
              </p>
            </div>
          </div>

          {/* Section 4: Property Rules & Guidelines */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Waves className="w-5 h-5" />
              </div>
              <h2>4. Property Rules &amp; Guidelines</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li><strong>Peaceful Atmosphere:</strong> Guests are expected to maintain a calm, peaceful, and respectful atmosphere at all times, considerate of fellow guests and neighbouring households.</li>
              <li><strong>No Parties or Loud Music:</strong> Loud music, group parties, and disruptive gatherings are strictly not permitted at any time of day.</li>
              <li><strong>Property Damage:</strong> Guests are responsible for any damage caused to the property, rooms, or furnishings during their stay. Any damages will be charged at actual repair or replacement cost.</li>
              <li><strong>Eco-Protection:</strong> Disposing of plastic, bottles, or any litter into Punnamada Lake or its surroundings is strictly prohibited. We follow eco-conscious waste practices.</li>
              <li><strong>Smoking Policy:</strong> Smoking is permitted only in designated open outdoor areas. All indoor rooms and common indoor spaces are strictly non-smoking.</li>
            </ul>
          </div>

          {/* Section 5: Bookings, Cancellation & Refund Policy */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2>5. Bookings, Cancellation &amp; Refund Policy</h2>
            </div>

            {/* Booking */}
            <div>
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">Booking &amp; Advance Payment</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
                <li>A <strong>25% advance payment</strong> is required to confirm your reservation.</li>
                <li>Payment can be made via UPI, bank transfer, or Razorpay payment link — details will be shared at the time of booking.</li>
                <li>Your booking is confirmed only after the advance payment is received and acknowledged by the host.</li>
              </ul>
            </div>

            {/* Cancellation & Refund */}
            <div>
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-3">Cancellation &amp; Refund</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                  <p className="text-emerald-700 font-extrabold text-lg">100% Refund</p>
                  <p className="text-slate-600 text-xs mt-1 font-medium">Cancelled <strong>15+ days</strong> before check-in</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
                  <p className="text-amber-600 font-extrabold text-lg">50% Refund</p>
                  <p className="text-slate-600 text-xs mt-1 font-medium">Cancelled <strong>7–14 days</strong> before check-in</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
                  <p className="text-red-600 font-extrabold text-lg">No Refund</p>
                  <p className="text-slate-600 text-xs mt-1 font-medium">Cancelled <strong>within 7 days</strong> of check-in</p>
                </div>
              </div>
              <p className="text-slate-500 text-xs mt-3 ml-1">All refunds are processed within 5–7 business days to the original payment method. To initiate a cancellation, please contact host Abhijith directly via WhatsApp.</p>
            </div>

            {/* Host-Initiated Cancellation */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide mb-2">Host-Initiated Cancellation</h3>
              <p className="text-slate-600 text-sm mb-3">
                In rare and exceptional circumstances, we may need to cancel a confirmed booking from our side. This may occur due to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600 text-sm ml-2 mb-3">
                <li>Unforeseen property maintenance or damage</li>
                <li>Natural disaster or extreme weather (e.g. floods, storms)</li>
                <li>Family emergency</li>
                <li>Double booking or system error</li>
                <li>Government or authority restrictions</li>
              </ul>
              <div className="flex items-start gap-2.5 bg-white border border-emerald-100 rounded-xl p-3">
                <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                <p className="text-slate-600 text-sm">
                  In any such case, <strong>you will receive a full 100% refund</strong> of all amounts paid. We will notify you <strong>immediately</strong> via WhatsApp or phone as soon as we are aware of the situation.
                </p>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="bg-linear-to-r from-sky-50 to-orange-50 rounded-3xl p-8 border border-slate-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Have questions about our policies?</h3>
              <p className="text-slate-600 text-sm mt-1">Chat directly with host Abhijith on WhatsApp for prompt clarification.</p>
            </div>
            <a
              href="https://wa.me/917012761588"
              target="_blank"
              rel="noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-orange-500/20 active:scale-95 shrink-0"
            >
              WhatsApp Us: +91 7012 761 588
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <SiteFooter />

    </div>
  );
}
