import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck, Wifi, Wind, Utensils, Waves, Coffee,
  Anchor, MessageCircle, Phone, CheckCircle2, Sparkles,
  Clock, BedDouble, Award, Compass, Sun, ArrowRight, MapPin, Calendar, BookOpen
} from 'lucide-react';
import { BookingProvider } from './_components/BookingProvider';
import BookingWidget from './_components/BookingWidget';
import StickyHeader from './_components/StickyHeader';
import GallerySection from './_components/GallerySection';
import FaqAccordion from './_components/FaqAccordion';
import { blogPosts } from './blog/_data/posts';

// ─── Static Data ─────────────────────────────────────────────────────────────

const images = [
  { src: '/kerala_backwaters_hero_1786702183985.jpg', alt: 'Punnamada Lake View - Zen Homestay Alleppey', title: 'Panoramic Punnamada Lake Waterfront', tag: 'Waterfront Living' },
  { src: '/kerala_heritage_room_1786702263227.jpg', alt: 'Lake View Premium Room - Zen Homestay', title: 'Lake View Premium Heritage Bedroom', tag: 'Bedroom & Suite' },
  { src: '/kerala_boat_arrival_1786708991444.jpg', alt: 'Complimentary Speedboat Transfer Alleppey', title: 'Private 5-Minute Speedboat Arrival Experience', tag: 'Boat Transfer' },
  { src: '/kerala_lake_dining_1786708655762.jpg', alt: 'Authentic Kerala Lakeside Breakfast', title: 'Fresh Authentic Kerala Breakfast by the Water', tag: 'Dining & Food' },
  { src: '/kerala_balcony_view_1786702364116.jpg', alt: 'Private Veranda over Punnamada Lake', title: 'Private Wooden Veranda Overlooking the Lake', tag: 'Veranda & Patio' },
];

const faqs = [
  { q: "What makes Zen Homestay the best alleppey homestay?", a: "Zen Homestay is located on Punnamada Lake — directly across the water from the iconic Nehru Trophy Boat Race Finishing Point, which you can actually see from the homestay. Guests enjoy direct lake views, stunning sunsets over the water, complimentary speedboat pickup AND drop-off, authentic home-cooked Kerala cuisine, and personalized host care from Abhijith — all at direct-host rates with no booking commissions." },
  { q: "How does the complimentary speedboat pickup and drop-off work?", a: "When you arrive in Alleppey, simply head to the Nehru Trophy Boat Race Finishing Point. Host Abhijith greets you there and brings you across Punnamada Lake by private speedboat in about 5 minutes — your complimentary check-in transfer. When you check out, we drop you back to the finishing point by speedboat as well, also complimentary. Please note: the complimentary speedboat is for check-in pickup and check-out drop-off only (one trip each way). If you would like additional trips to town during your stay — for shopping, dining, or sightseeing — these are available at ₹300 per trip." },
  { q: "Can I see the Nehru Trophy Boat Race Finishing Point from the homestay?", a: "Yes! Zen Homestay is situated directly opposite the famous Nehru Trophy Boat Race Finishing Point on the other side of Punnamada Lake. You can see the finishing point from the homestay, and during the boat race season it is a front-row view of all the action from across the water." },
  { q: "What meals are included with the stay?", a: "Every booking includes a freshly prepared, authentic Kerala morning breakfast featuring classic favorites like hot Appam with stew, Puttu, fresh tropical fruits, and freshly brewed local tea or coffee. Morning tea is also included as part of your stay." },
  { q: "What water activities and experiences are available?", a: "We can arrange a range of backwater experiences for you: Shikara rides, kayaking, and speedboat rides — all available at an extra charge. Just let Abhijith know in advance and he will arrange everything for you." },
  { q: "Is this homestay suitable for families or couples?", a: "Zen Homestay is ideal for couples, honeymooners, and small families looking for a peaceful, private lakeside getaway. We maintain a calm, respectful environment for all our guests. We welcome guests who appreciate serenity and natural beauty." },
  { q: "How do I check room availability or reserve a date?", a: "We believe in direct, hassle-free host communication without third-party commission markups. Simply message us on WhatsApp or call host Abhijith directly at +91 7012 761 588 to check your preferred dates and receive instant confirmation." },
];

const reviews = [
  { initials: 'AM', color: '#4285F4', name: 'Arun Menon', time: '1 month ago', text: "The speedboat ride from the finishing point set the tone immediately. Best alleppey homestay I've ever stayed at — waking up to Punnamada Lake right outside the bedroom window was pure magic!" },
  { initials: 'LT', color: '#EA4335', name: 'Lakshmi Thomas', time: '2 weeks ago', text: "Unmatched privacy at this homestay in Alleppey! No roads nearby means total silence and the most serene water views I've experienced. Abhijith was an incredible, attentive host throughout." },
  { initials: 'DV', color: '#34A853', name: 'Divya Varghese', time: '3 weeks ago', text: "We searched for the best waterfront homestay in Alleppey and Zen Homestay exceeded every expectation. The Kerala breakfast served by the lakeside was divine — Appam and stew tasted like a dream!" },
  { initials: 'VN', color: '#FBBC05', name: 'Vineeth Nair', time: '1 month ago', text: "Stayed here for our anniversary and it was phenomenal. This Punnamada Lake homestay is unlike anything else in Alleppey — the direct lake view from bed, the wooden balcony, the morning breeze. Absolutely 5 stars." },
  { initials: 'AJ', color: '#4285F4', name: 'Anju Jacob', time: '2 months ago', text: "If you're looking for a peaceful Kerala backwater homestay, stop searching — this is it. The speedboat pickup felt like arriving at a private island resort. Abhijith's hospitality is truly world-class." },
  { initials: 'SK', color: '#EA4335', name: 'Siddharth Kumar', time: '2 months ago', text: "Traveled from Bangalore to experience Kerala's backwaters — this alleppey homestay on Punnamada Lake was the highlight of our entire trip. The authentic food, the silence, the lake... absolutely spectacular." },
];

const StarRow = ({ cls = 'w-4 h-4' }: { cls?: string }) => (
  <>{[1, 2, 3, 4, 5].map(s => (
    <svg key={s} className={cls} viewBox="0 0 20 20" fill="#FBBC05">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))}</>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// ─── Page (Server Component) ──────────────────────────────────────────────────

export default function Home() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900 pb-20 md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }} />

        <StickyHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 w-full">

          {/* Listing Title Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Top 1% Waterfront Stay in Alleppey
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Homestay in Alleppey on Punnamada Lake — Zen Homestay
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 leading-relaxed">
              Wake up to direct views of Punnamada Lake at this exclusive waterfront homestay in Alleppey — with complimentary speedboat transfer &amp; authentic Kerala breakfast included.
            </p>
          </div>

          {/* Gallery (client island) */}
          <GallerySection images={images} />

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-12">

              {/* Host Details */}
              <div className="flex items-center justify-between pb-8 border-b border-slate-200 bg-white p-6 rounded-3xl border shadow-sm">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Alleppey Homestay hosted by Abhijith — private 2nd-floor lakefront retreat
                  </h2>
                  <p className="text-sm text-slate-600 font-semibold mt-1 flex items-center gap-2 flex-wrap">
                    <span className="bg-sky-50 text-sky-800 px-2.5 py-0.5 rounded-md font-bold">2 Lake View Bedrooms</span>
                    <span>·</span><span>Max 3 guests per room</span>
                    <span>·</span><span>2 King beds</span>
                    <span>·</span><span>Attached bathrooms</span>
                  </p>
                </div>
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-600 text-white font-extrabold flex items-center justify-center text-lg shrink-0 shadow-md">
                  <span>ZH</span>
                  <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1 rounded-full text-[10px] shadow">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Trophy Card */}
              <div className="p-6 rounded-3xl border border-orange-200/80 bg-gradient-to-r from-orange-50/80 via-orange-50/30 to-sky-50/50 flex items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">One of the most loved homes in Alleppey</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">Rated 4.98 stars with 100% 5-star check-in and private waterfront location scores.</p>
                  </div>
                </div>
                <div className="hidden sm:block text-right shrink-0">
                  <div className="font-black text-2xl text-slate-900">4.98</div>
                  <div className="flex text-orange-500 text-xs">★★★★★</div>
                </div>
              </div>

              {/* Core Highlights */}
              <div className="space-y-6 pb-8 border-b border-slate-200 bg-white p-8 rounded-3xl border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 shrink-0"><Anchor className="w-6 h-6" /></div>
                  <div><h4 className="font-bold text-slate-900 text-base">Complimentary Speedboat — Both Pickup &amp; Drop-off</h4><p className="text-sm text-slate-600 mt-0.5 leading-relaxed">We pick you up from the Nehru Trophy Finishing Point by speedboat when you arrive, and drop you back the same way when you leave — all complimentary.</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 shrink-0"><Waves className="w-6 h-6" /></div>
                  <div><h4 className="font-bold text-slate-900 text-base">Direct Punnamada Lake Frontage</h4><p className="text-sm text-slate-700 mt-0.5 leading-relaxed font-semibold">Wake up to beautiful, direct views of Punnamada Lake right from the room.</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 shrink-0"><Compass className="w-6 h-6" /></div>
                  <div><h4 className="font-bold text-slate-900 text-base">Opposite the Famous Nehru Trophy Finishing Point</h4><p className="text-sm text-slate-600 mt-0.5 leading-relaxed">Located directly across Punnamada Lake from the Nehru Trophy Boat Race finishing point — you can see it from the homestay!</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 shrink-0"><Clock className="w-6 h-6" /></div>
                  <div><h4 className="font-bold text-slate-900 text-base">Fast Host Communication</h4><p className="text-sm text-slate-600 mt-0.5 leading-relaxed">Abhijith responds directly on WhatsApp and phone within 5 minutes.</p></div>
                </div>
                <div className="flex items-start gap-4 pt-2 mt-2 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0"><ShieldCheck className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      Modern Home — Entire Private 2nd Floor for Guests
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-2 py-0.5 rounded-full uppercase tracking-wide">Safe Stay</span>
                    </h4>
                    <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">Abhijith and his family live on the ground floor — guests enjoy the entire 2nd floor privately, with 2 AC rooms and attached bathrooms. You get home warmth without sacrificing privacy.</p>
                  </div>
                </div>
              </div>

              {/* Arrival Experience */}
              <div id="arrival" className="pb-8 border-b border-slate-200 scroll-mt-24">
                <span className="text-xs font-extrabold tracking-wider text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200">Unique Selling Point</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-3 mb-4">The Speedboat Experience</h2>
                <div className="bg-sky-50/70 rounded-3xl p-6 sm:p-8 border border-sky-100 mb-6">
                  <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                    <p>Zen Homestay is located on the far bank of <strong>Punnamada Lake</strong>, directly across the water from the iconic <strong>Nehru Trophy Boat Race Finishing Point</strong>. You can actually see the finishing point from the homestay!</p>
                    <p>Your journey begins the moment you board your <strong className="text-sky-950">complimentary private speedboat</strong>. And when it&apos;s time to leave, we drop you right back the same way.</p>
                  </div>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Arrival — Check-in Route</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center mb-3">1</div><h3 className="font-bold text-slate-900 text-sm">Arrive at Finishing Point</h3><p className="text-xs text-slate-500 mt-1 leading-relaxed">Come by car or cab to the Nehru Trophy Boat Race Finishing Point in Alleppey — a well-known landmark.</p></div>
                  <div className="p-5 rounded-2xl border border-orange-200 bg-orange-50/60 shadow-sm"><div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-xs flex items-center justify-center mb-3">2</div><h3 className="font-bold text-slate-900 text-sm">Abhijith Picks You Up</h3><p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">Your host comes to the finishing point in our private speedboat. Luggage assistance included.</p></div>
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center mb-3">3</div><h3 className="font-bold text-slate-900 text-sm">5-Min Lake Crossing</h3><p className="text-xs text-slate-500 mt-1 leading-relaxed">Glide across Punnamada Lake in under 5 minutes — arriving in style right at our lakefront door.</p></div>
                </div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Departure — Check-out Route</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center justify-center mb-3">1</div><h3 className="font-bold text-slate-900 text-sm">Check Out by 11 AM</h3><p className="text-xs text-slate-500 mt-1 leading-relaxed">Checkout is at 11 AM. Flexible timing available on request via WhatsApp.</p></div>
                  <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/60 shadow-sm"><div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-3">2</div><h3 className="font-bold text-slate-900 text-sm">Speedboat Drop-off</h3><p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">We drop you back across the lake by speedboat — complimentary, just like the pickup.</p></div>
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center justify-center mb-3">3</div><h3 className="font-bold text-slate-900 text-sm">Back at Finishing Point</h3><p className="text-xs text-slate-500 mt-1 leading-relaxed">You&apos;re dropped back at the iconic Nehru Trophy Finishing Point, ready to continue your journey.</p></div>
                </div>
              </div>

              {/* Where You Sleep */}
              <div id="stay" className="pb-8 border-b border-slate-200 scroll-mt-24">
                <div className="flex items-baseline justify-between mb-2">
                  <h2 className="text-2xl font-extrabold text-slate-900">Where you&apos;ll sleep</h2>
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">2 Identical Lakefront Rooms</span>
                </div>
                <p className="text-sm text-slate-600 mb-6 font-medium">Our 2 identical Lake View Premium Rooms, crafted with authentic Kerala wooden interiors and direct views of Punnamada Lake.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2].map(n => (
                    <div key={n} className="p-6 rounded-3xl border border-slate-200 hover:border-sky-400 transition-all bg-white shadow-sm hover:shadow-md">
                      <div className="flex items-center gap-2 mb-3"><BedDouble className="w-5 h-5 text-sky-500" /><span className="font-bold text-xs text-slate-500 uppercase tracking-wider">Bedroom {n}</span></div>
                      <div className="flex items-baseline justify-between mb-1"><h3 className="font-extrabold text-lg text-slate-900">Lake View Premium Room</h3><span className="font-black text-orange-600 text-base">₹3,000 <span className="text-xs font-normal text-slate-500">/ night</span></span></div>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">Modern, comfortable king bed room with direct panoramic Punnamada Lake views, split air conditioning, and private en-suite bathroom.</p>
                      <div className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-xl inline-block">Max 3 Guests · 1 King Bed · Direct Lake View · AC</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Booking Widget */}
              <div id="booking-section" className="lg:hidden my-6 scroll-mt-24">
                <BookingWidget />
              </div>

              {/* Amenities */}
              <div id="amenities" className="pb-8 border-b border-slate-200 bg-white p-8 rounded-3xl border shadow-sm scroll-mt-24">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6">What this place offers</h2>
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Included in Every Stay</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-slate-800 text-sm mb-7">
                  <div className="flex items-center gap-3.5 py-1"><Waves className="w-5 h-5 text-sky-500 shrink-0" /><span className="font-medium">Direct Punnamada Lake views &amp; stunning sunsets</span></div>
                  <div className="flex items-center gap-3.5 py-1"><Anchor className="w-5 h-5 text-orange-500 shrink-0" /><span className="font-medium">Speedboat pickup &amp; drop-off — complimentary</span></div>
                  <div className="flex items-center gap-3.5 py-1"><Wifi className="w-5 h-5 text-sky-500 shrink-0" /><span className="font-medium">High-speed Wi-Fi throughout property</span></div>
                  <div className="flex items-center gap-3.5 py-1"><Wind className="w-5 h-5 text-sky-500 shrink-0" /><span className="font-medium">Full split Air Conditioning in both rooms</span></div>
                  <div className="flex items-center gap-3.5 py-1"><Coffee className="w-5 h-5 text-orange-500 shrink-0" /><span className="font-medium">Morning tea &amp; authentic Kerala breakfast</span></div>
                  <div className="flex items-center gap-3.5 py-1"><Clock className="w-5 h-5 text-sky-500 shrink-0" /><span className="font-medium">24/7 dedicated on-site host assistance</span></div>
                  <div className="flex items-center gap-3.5 py-1"><ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" /><span className="font-medium">Private 2-bedroom 2nd floor — attached bathrooms</span></div>
                  <div className="flex items-center gap-3.5 py-1"><Compass className="w-5 h-5 text-sky-500 shrink-0" /><span className="font-medium">Views of Nehru Trophy Finishing Point across the lake</span></div>
                </div>
                <div className="border-t border-slate-100 pt-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">Water Experiences (Available at Extra Charge)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-sky-50 border border-sky-100"><Waves className="w-5 h-5 text-sky-600 shrink-0" /><div><p className="font-bold text-slate-900 text-sm">Shikara Rides</p><p className="text-[11px] text-slate-500">Traditional backwater boat</p></div></div>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-sky-50 border border-sky-100"><Anchor className="w-5 h-5 text-sky-600 shrink-0" /><div><p className="font-bold text-slate-900 text-sm">Kayaking</p><p className="text-[11px] text-slate-500">Explore the backwaters</p></div></div>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl bg-orange-50 border border-orange-100"><Sparkles className="w-5 h-5 text-orange-500 shrink-0" /><div><p className="font-bold text-slate-900 text-sm">Speedboat Rides</p><p className="text-[11px] text-slate-500">Thrilling lake rides</p></div></div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">Contact Abhijith to arrange any of these experiences during your stay.</p>
                </div>
              </div>

              {/* Why Book Direct */}
              <div className="pb-8 border-b border-slate-200">
                <span className="text-xs font-extrabold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Why Book Direct?</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-3 mb-2">Save 20–25% vs Booking Platforms</h2>
                <p className="text-sm text-slate-600 mb-6 font-medium">OTA platforms add 15–25% commission on top of the room rate. Booking directly with Abhijith means you pay less and get more.</p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs">
                        <th className="px-4 py-3 font-bold rounded-tl-xl">What you get</th>
                        <th className="px-4 py-3 font-bold text-center"><span className="inline-flex items-center gap-1"><span className="text-sky-400">✦</span> Zen Homestay Direct</span></th>
                        <th className="px-4 py-3 font-bold text-center text-slate-400 rounded-tr-xl">Airbnb / MakeMyTrip</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ['Room rate (1 night, 1 room)', '₹3,000', '₹3,600–₹4,500'],
                        ['Platform service fee', '₹0', '₹400–₹800'],
                        ['Speedboat transfer', '✅ Free', '❌ Not included'],
                        ['Kerala breakfast', '✅ Included', '❌ Extra cost'],
                        ['Host response time', '< 5 mins', '24–48 hrs'],
                        ['Cancellation flexibility', '✅ Direct negotiation', '⚠️ Platform policy'],
                        ['Total effective saving', '₹1,000–₹2,300 saved', '—'],
                      ].map(([feature, direct, ota], i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                          <td className="px-4 py-3 font-medium text-slate-700">{feature}</td>
                          <td className="px-4 py-3 text-center font-bold text-emerald-700 bg-emerald-50/60">{direct}</td>
                          <td className="px-4 py-3 text-center text-slate-500">{ota}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                  <span className="text-emerald-600 text-lg">💸</span>
                  <p className="text-sm font-bold text-emerald-800">Most guests save <span className="text-emerald-600">₹1,000–₹2,300 per stay</span> by booking directly with Abhijith.</p>
                </div>
              </div>


              {/* How To Book */}
              <div id="how-to-book" className="pb-8 border-b border-slate-200 scroll-mt-24">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-extrabold tracking-wider text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />Simple 4-Step Booking</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />Zero Commission · Direct Host Rates</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">How to Book Your Room</h2>
                <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">Reserve your lakefront stay directly with host Abhijith in under 2 minutes. Enjoy 100% transparent pricing with zero middleman commissions, instant confirmation, and complimentary speedboat transfer.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
                    <div><div className="flex items-center justify-between mb-4"><div className="w-10 h-10 rounded-2xl bg-sky-500 text-white font-black text-sm flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">01</div><div className="p-2.5 rounded-xl bg-sky-50 text-sky-600"><Calendar className="w-5 h-5" /></div></div><h3 className="font-extrabold text-slate-900 text-base mb-1.5">1. Select Dates &amp; Guests</h3><p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Choose your check-in &amp; check-out dates and guest count using our interactive reservation widget. Select 1 or 2 identical lakefront rooms (accommodates up to 3 guests per room).</p></div>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs"><span className="font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">₹3,000 / room / night</span><a href="#booking-section" className="text-sky-600 font-bold hover:text-sky-700 inline-flex items-center gap-1 hover:underline"><span>Select dates</span><ArrowRight className="w-3.5 h-3.5" /></a></div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between group">
                    <div><div className="flex items-center justify-between mb-4"><div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">02</div><div className="p-2.5 rounded-xl bg-orange-50 text-orange-600"><MessageCircle className="w-5 h-5" /></div></div><h3 className="font-extrabold text-slate-900 text-base mb-1.5">2. Connect Directly with Host</h3><p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Tap <strong>Reserve via WhatsApp</strong> or call host Abhijith at <strong>+91 7012 761 588</strong>. Your requested dates, guests, and calculated direct pricing are pre-filled automatically.</p></div>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs"><span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Host replies in &lt; 5 mins</span><a href="https://wa.me/917012761588" target="_blank" rel="noreferrer" className="text-orange-600 font-bold hover:text-orange-700 inline-flex items-center gap-1 hover:underline"><span>Chat now</span><ArrowRight className="w-3.5 h-3.5" /></a></div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group">
                    <div><div className="flex items-center justify-between mb-4"><div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">03</div><div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600"><ShieldCheck className="w-5 h-5" /></div></div><h3 className="font-extrabold text-slate-900 text-base mb-1.5">3. Instant Confirmation &amp; 0% Fee</h3><p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Abhijith checks live availability and confirms your reservation immediately. Enjoy direct host transparent pricing with no OTA markups, service taxes, or hidden extras.</p></div>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs"><span className="font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">Direct Host Guarantee</span><span className="font-bold text-emerald-600">No Hidden Costs</span></div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
                    <div><div className="flex items-center justify-between mb-4"><div className="w-10 h-10 rounded-2xl bg-sky-600 text-white font-black text-sm flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">04</div><div className="p-2.5 rounded-xl bg-sky-50 text-sky-600"><Anchor className="w-5 h-5" /></div></div><h3 className="font-extrabold text-slate-900 text-base mb-1.5">4. Free Boat Pickup &amp; Check-In</h3><p className="text-xs sm:text-sm text-slate-600 leading-relaxed">Arrive at the Nehru Trophy Boat Race Finishing Point in Alleppey. Our team meets you with your complimentary private speed boat for a scenic 5-minute transfer right to our docks.</p></div>
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs"><span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">Free Speedboat Transfer</span><span className="font-bold text-slate-500">Check-in: 2:00 PM</span></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                      <div><span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block mb-2">Why Book Direct with Host Abhijith?</span><h3 className="text-xl sm:text-2xl font-extrabold text-white">Best Rate &amp; VIP Backwater Hospitality Guaranteed</h3></div>
                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-lg transition-all active:scale-95"><MessageCircle className="w-4 h-4 fill-current" /><span>Reserve on WhatsApp</span></a>
                        <a href="tel:+917012761588" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-95"><Phone className="w-4 h-4 text-sky-400" /><span>Call +91 7012 761 588</span></a>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs sm:text-sm">
                      <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div><div><h4 className="font-bold text-white text-sm">Save 15-20% Commission</h4><p className="text-slate-400 text-xs mt-0.5 leading-relaxed">No third-party online booking portal surcharges. Best direct host rates.</p></div></div>
                      <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center shrink-0"><Waves className="w-4 h-4" /></div><div><h4 className="font-bold text-white text-sm">Free Speedboat Transfer</h4><p className="text-slate-400 text-xs mt-0.5 leading-relaxed">Scenic 5-minute private speed boat pickup coordinated seamlessly with Abhijith.</p></div></div>
                      <div className="flex items-start gap-3"><div className="w-8 h-8 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0"><Coffee className="w-4 h-4" /></div><div><h4 className="font-bold text-white text-sm">Breakfast &amp; Custom Trips</h4><p className="text-slate-400 text-xs mt-0.5 leading-relaxed">Fresh Kerala breakfast included, plus personalized Shikara ride arrangements.</p></div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backwater Lifestyle */}
              <div className="pb-8 border-b border-slate-200">
                <span className="text-xs font-bold tracking-wider text-sky-700 uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">Authentic Kerala Living</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-3 mb-4">Why Guests Choose This Alleppey Homestay</h2>
                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>Finding the right <strong>alleppey homestay</strong> makes all the difference. Zen Homestay sits on Punnamada Lake, directly across the water from the famous <strong>Nehru Trophy Boat Race Finishing Point</strong> — you can see it from your room. The moment you board our complimentary speedboat at the finishing point, you know this is unlike any other stay in Alleppey.</p>
                  <p>Watch the sun dip below the horizon over Punnamada Lake from your room or balcony. See local fishermen glide past in the early morning fog. Hear the silence of the backwaters and wake up to birdsong and the gentle ripple of the lake.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"><Sun className="w-6 h-6 text-orange-500 mb-3" /><h4 className="font-bold text-slate-900 text-sm mb-1">Sunset &amp; Lake Views</h4><p className="text-xs text-slate-600 leading-relaxed">Watch spectacular sunsets over Punnamada Lake from your room — with the finishing point visible across the water.</p></div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"><Utensils className="w-6 h-6 text-sky-500 mb-3" /><h4 className="font-bold text-slate-900 text-sm mb-1">Authentic Kerala Flavors</h4><p className="text-xs text-slate-600 leading-relaxed">Start your day with morning tea and authentic Kerala breakfast — prepared with love by the host family.</p></div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"><Compass className="w-6 h-6 text-orange-500 mb-3" /><h4 className="font-bold text-slate-900 text-sm mb-1">Front Row to History</h4><p className="text-xs text-slate-600 leading-relaxed">Directly opposite the world-famous Nehru Trophy Boat Race Finishing Point — a truly iconic location.</p></div>
                </div>
              </div>

              {/* Things to Know */}
              <div className="pb-8 border-b border-slate-200">
                <h3 className="text-lg font-extrabold text-slate-900 mb-4">Things to Know</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200"><h4 className="font-bold text-slate-900 mb-2">Check-in &amp; Checkout</h4><p className="leading-relaxed font-bold text-slate-900">Check-in: 2:00 PM</p><p className="leading-relaxed font-bold text-slate-900">Checkout: 11:00 AM</p><p className="leading-relaxed text-slate-500 mt-1">Flexible timing available — just ask Abhijith via WhatsApp.</p></div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200"><h4 className="font-bold text-slate-900 mb-2">Speedboat Pickup &amp; Drop</h4><p className="leading-relaxed font-medium text-emerald-700">Free for check-in &amp; check-out</p><p className="leading-relaxed">One trip each way, complimentary</p><p className="leading-relaxed text-slate-500 mt-1">Extra town trips: <span className="font-bold text-slate-700">₹300/trip</span></p></div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200"><h4 className="font-bold text-slate-900 mb-2">Ideal Guests</h4><p className="leading-relaxed font-medium">Couples &amp; honeymooners</p><p className="leading-relaxed">Small families welcome</p><p className="leading-relaxed text-slate-500 mt-1">We maintain a peaceful, respectful environment for all guests.</p></div>
                </div>
              </div>

              {/* Google Reviews */}
              <div className="pb-8 border-b border-slate-200">
                <div className="flex items-center gap-2 mb-5"><GoogleIcon /><span className="text-lg font-extrabold text-slate-900">Google Reviews</span></div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-5xl font-black text-slate-900 leading-none">4.9</span>
                    <div className="flex items-center gap-0.5 mt-1.5"><StarRow /></div>
                    <span className="text-xs text-slate-500 font-medium mt-1">48 reviews</span>
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    {[{ s: 5, p: 98 }, { s: 4, p: 2 }, { s: 3, p: 0 }, { s: 2, p: 0 }, { s: 1, p: 0 }].map(({ s, p }) => (
                      <div key={s} className="flex items-center gap-2 text-xs">
                        <span className="text-slate-600 font-medium w-3 shrink-0">{s}</span>
                        <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden"><div className="h-2 rounded-full bg-[#FBBC05]" style={{ width: p + '%' }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center text-sm shrink-0" style={{ background: r.color }}>{r.initials}</div>
                          <div><p className="font-bold text-sm text-slate-900 leading-tight">{r.name}</p><p className="text-[11px] text-slate-600 font-medium">{r.time}</p></div>
                        </div>
                        <GoogleIcon />
                      </div>
                      <div className="flex items-center gap-0.5 mb-2.5"><StarRow cls="w-3.5 h-3.5" /></div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
                  <GoogleIcon /><span>Reviews styled after Google Reviews · 48 verified guests</span>
                </div>
              </div>

              {/* From Our Blog */}
              <div className="pb-8 border-b border-slate-200">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700">From Our Blog</span>
                      <p className="text-[11px] text-slate-400 font-medium">Alleppey travel guides &amp; tips</p>
                    </div>
                  </div>
                  <Link
                    href="/blog"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    All articles <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-sky-300 transition-all"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.heroImage}
                          alt={post.heroImageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1.5">{post.category}</p>
                        <h3 className="text-xs font-extrabold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors line-clamp-2 flex-1 mb-2">{post.title}</h3>
                        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/blog"
                  className="sm:hidden mt-4 flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
                >
                  View all articles <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* FAQ (client island) */}
              <FaqAccordion faqs={faqs} />

            </div>

            {/* RIGHT COLUMN: Sticky Booking Widget */}
            <div className="hidden lg:block lg:col-span-1 h-full">
              <div className="sticky top-24 z-30">
                <BookingWidget />
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 text-xs">
          <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-t border-slate-800/80 py-14 sm:py-16 px-4">
            <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /><span>Direct Host · Zero Commission · Best Rates</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Ready to wake up on{' '}<span className="bg-gradient-to-r from-sky-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">Punnamada Lake?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">Message Abhijith directly for personalized lakeside hospitality, live room availability, and instant confirmation — with zero middlemen or booking fees.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-xl text-sm transition-all hover:-translate-y-0.5 active:scale-95 group">
                  <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /><span>Book on WhatsApp</span>
                </a>
                <a href="tel:+917012761588" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95">
                  <Phone className="w-4 h-4 text-sky-400" /><span>+91 7012 761 588</span>
                </a>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Instant response &lt; 5 mins</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" />Free Speedboat Pickup</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Complimentary Breakfast</span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/70">
              <div className="lg:col-span-4 space-y-5">
                <div className="flex items-center gap-3">
                  <img src="/zen-homestay-logo.jpg" alt="Zen Homestay Logo" className="w-14 h-14 rounded-2xl object-cover shadow-lg" />
                  <div><span className="font-extrabold text-xl text-white tracking-tight block leading-tight">Zen Homestay</span><span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">Punnamada Lake · Alleppey</span></div>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 rounded-xl px-4 py-3 border border-slate-800">
                  <div className="flex items-center gap-0.5"><StarRow /></div>
                  <span className="text-white font-black text-sm">4.98</span>
                  <span className="text-slate-500 font-medium">· 48 Google reviews</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">An exclusive waterfront sanctuary on Punnamada Lake — accessible only by our complimentary 5-minute speedboat. Zero road noise, authentic Kerala cuisine, and attentive 5-star host care.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-900 text-sky-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5"><Anchor className="w-3 h-3" /> 5-Min Boat Pickup</span>
                  <span className="bg-slate-900 text-orange-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5"><Award className="w-3 h-3" /> Superhost 4.98★</span>
                  <span className="bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> 0% Commission</span>
                  <span className="bg-slate-900 text-amber-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5"><Coffee className="w-3 h-3" /> Breakfast Included</span>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <h4 className="font-extrabold text-white text-[11px] uppercase tracking-widest">Explore</h4>
                <ul className="space-y-2.5 font-medium">
                  {[{ href: '/alleppey-homestay', label: 'Alleppey Homestay' }, { href: '/punnamada-lake-homestay', label: 'Lake Homestay' }, { href: '/kerala-backwater-homestay', label: 'Backwater Stay' }, { href: '/honeymoon-homestay-alleppey', label: 'Honeymoon Stay' }, { href: '/blog', label: 'Travel Blog' }].map(({ href, label }) => (
                    <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-sky-500 group-hover:bg-orange-400 transition-colors shrink-0" />{label}</Link></li>
                  ))}
                  {[{ href: '/contact', label: 'Contact Host' }, { href: '/terms-and-conditions', label: 'House Rules' }, { href: '/privacy-policy', label: 'Privacy Policy' }].map(({ href, label }) => (
                    <li key={href}><Link href={href} className="hover:text-orange-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-sky-500 group-hover:bg-orange-400 transition-colors shrink-0" />{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2 space-y-4">
                <h4 className="font-extrabold text-white text-[11px] uppercase tracking-widest">Contact</h4>
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
                    <div><span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-0.5">Your Host</span><span className="text-white font-bold text-sm">Abhijith</span></div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-0.5">Phone / WhatsApp</span>
                      <div className="flex flex-col gap-0.5">
                        <a href="tel:+917012761588" className="text-white font-black text-sm hover:text-orange-400 transition-colors py-1.5 inline-block">+91 7012 761 588</a>
                        <a href="tel:+919947753154" className="text-slate-300 font-bold text-xs hover:text-orange-400 transition-colors py-1.5 inline-block">+91 9947 753 154</a>
                        <a href="tel:+916238951178" className="text-slate-300 font-bold text-xs hover:text-orange-400 transition-colors py-1.5 inline-block">+91 6238 951 178</a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold text-slate-400">
                      <div className="bg-slate-800 rounded-lg px-2 py-1.5 text-center"><span className="block text-white font-black">2:00 PM</span>Check-in</div>
                      <div className="bg-slate-800 rounded-lg px-2 py-1.5 text-center"><span className="block text-white font-black">11:00 AM</span>Checkout</div>
                    </div>
                  </div>
                  <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-xs shadow-md w-full">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-white text-[11px] uppercase tracking-widest flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-orange-500" />Location &amp; Pickup</h4>
                  <a href="https://maps.google.com/?q=9.5016131229736,76.35738157806414" target="_blank" rel="noreferrer" className="text-[11px] font-bold text-sky-400 hover:text-sky-300 transition-colors">Open Maps ↗</a>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d486.2595251483521!2d76.35757685613443!3d9.502023969622542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1787159161675!5m2!1sen!2sin" width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="w-full brightness-90 contrast-[1.05]" title="Zen Homestay Location Map" />
                  <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate pr-2"><MapPin className="w-3 h-3 text-sky-400 shrink-0" /><span className="truncate">Finishing Point, Punnamada Lake</span></div>
                    <span className="text-orange-400 font-extrabold shrink-0">Alleppey, Kerala</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-slate-900 border border-slate-800 rounded-xl p-3">
                  <Anchor className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                  <p className="text-slate-400 text-[11px] leading-relaxed"><span className="text-white font-bold">No road access</span> — arrive at the Nehru Trophy Finishing Point and your complimentary speedboat will pick you up in 5 minutes.</p>
                </div>
              </div>
            </div>
            <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-medium">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center sm:text-left">
                <p className="text-slate-500">© {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
                <span className="hidden sm:inline text-slate-700">·</span>
                <span className="text-slate-600">Direct Host · 0% Commission · Best Rate Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms</Link>
                <span className="text-slate-800">·</span>
                <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
                <span className="text-slate-800">·</span>
                <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </BookingProvider>
  );
}
