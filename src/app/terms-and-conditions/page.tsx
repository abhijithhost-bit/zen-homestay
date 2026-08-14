import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Anchor, 
  Users, 
  Waves, 
  FileText,
  Award
} from 'lucide-react';

export const metadata = {
  title: "Terms & Conditions | Zen Homestay Alleppey",
  description: "Terms and conditions, house guidelines, check-in policies, and speedboat transfer details for Zen Homestay on Punnamada Lake, Alleppey.",
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
      
      {/* Modern Luxury Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] transition-all w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-500 via-sky-600 to-orange-500 flex items-center justify-center text-white shadow-md sm:shadow-lg shadow-sky-500/20 ring-2 sm:ring-4 ring-sky-50 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-xl tracking-tight text-slate-900 leading-none group-hover:text-sky-600 transition-colors truncate">
                  Zen Homestay
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-200/80 shrink-0">
                  <Award className="w-3 h-3 text-orange-500" /> Superhost
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
                <strong>Additional Town / Sightseeing Trips:</strong> Any additional speed boat trips requested during your stay (such as going to town for shopping, sightseeing, or night dining and returning) are charged at a nominal rate of <strong>₹300 per boat transfer</strong>.
              </li>
              <li>
                <strong>Notice for Coordination:</strong> Please inform our on-site team or host at least 30 minutes in advance if you require boat transfers to town so the boat and pilot can be prepared.
              </li>
              <li>
                <strong>Luggage Assistance:</strong> Complimentary luggage handling is provided during arrival and departure.
              </li>
            </ul>
          </div>

          {/* Section 3: Room Occupancy & Capacity */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <Users className="w-5 h-5" />
              </div>
              <h2>3. Room Capacity & Pricing</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li>The property features <strong>2 private Lake View Premium Rooms</strong> only.</li>
              <li><strong>Maximum Occupancy:</strong> Strictly 3 persons per room (up to 6 guests if booking the entire property).</li>
              <li><strong>Room Rate:</strong> ₹3,000 per room / night (includes complimentary check-in/checkout speed boat pickup and authentic Kerala breakfast).</li>
              <li>Additional extra bedding is provided for the 3rd guest in each room.</li>
            </ul>
          </div>

          {/* Section 4: Backwater Sanctuary & Peaceful Environment */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Waves className="w-5 h-5" />
              </div>
              <h2>4. Quiet Hours & Environmental Care</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li>Zen Homestay is dedicated to nature, serenity, and relaxation. Loud outdoor music, noisy speakers, and disruptive activities are strictly prohibited after 10:00 PM.</li>
              <li><strong>Eco-Protection:</strong> Disposing of plastic, bottles, or litter into Punnamada Lake is strictly prohibited. We practice eco-conscious waste segregation.</li>
              <li>Smoking is restricted to designated open outdoor areas only. All indoor rooms are 100% non-smoking.</li>
            </ul>
          </div>

          {/* Section 5: Cancellations & Direct Booking Support */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2>5. Cancellations & Host Assistance</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li>Because bookings are handled directly with host Abhijith, we offer flexible rescheduling options in case of unexpected travel changes.</li>
              <li>Please inform us at least 48 hours in advance for cancellations or date changes.</li>
              <li>For any emergency assistance, room extensions, or custom Kerala food requests, host Abhijith is available 24/7 on site and on phone.</li>
            </ul>
          </div>

          {/* Need Help Card */}
          <div className="bg-gradient-to-r from-sky-50 to-orange-50 rounded-3xl p-8 border border-slate-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
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
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-xs text-slate-400 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/" className="hover:underline hover:text-white transition-colors">
              Home
            </Link>
            <span>·</span>
            <Link href="/terms-and-conditions" className="hover:underline hover:text-white transition-colors text-slate-200 font-bold">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:underline hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:underline hover:text-white transition-colors">
              Contact Host
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
