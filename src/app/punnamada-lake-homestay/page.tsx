import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, Waves, Anchor, Coffee, Star, MapPin, CheckCircle2, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Punnamada Lake Homestay | Zen Homestay – Waterfront Stay Alleppey",
  description: "Stay directly on Punnamada Lake at Zen Homestay, Alleppey. Direct lake views from your room, private speedboat pickup, Kerala breakfast included. Book with host Abhijith — zero OTA commission. +91 7012 761 588.",
  keywords: ["punnamada lake homestay", "homestay on punnamada lake", "punnamada lake stay alleppey", "lake view homestay alleppey", "waterfront homestay alleppey"],
  alternates: { canonical: "https://abhijithr.online/punnamada-lake-homestay" },
  openGraph: {
    title: "Punnamada Lake Homestay | Zen Homestay Alleppey",
    description: "Direct Punnamada Lake views, speedboat arrival & Kerala breakfast. Book the best waterfront homestay in Alleppey at zero commission.",
    url: "https://abhijithr.online/punnamada-lake-homestay",
    images: [{ url: "https://abhijithr.online/kerala_backwaters_hero_1786702183985.jpg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BedAndBreakfast",
  "name": "Zen Homestay – Punnamada Lake Homestay",
  "url": "https://abhijithr.online/punnamada-lake-homestay",
  "description": "Waterfront homestay directly on Punnamada Lake, Alleppey. Speedboat pickup, lake views, Kerala breakfast included.",
  "telephone": "+91-7012-761-588",
  "priceRange": "₹3,000 – ₹6,000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Punnamada Lake, Near Nehru Trophy Boat Race Finishing Point",
    "addressLocality": "Alleppey",
    "addressRegion": "Kerala",
    "postalCode": "688006",
    "addressCountry": "IN",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 9.5015, "longitude": 76.3537 },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.98", "reviewCount": "48", "bestRating": "5" },
};

export default function PunnamadaLakeHomestayPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/zen-homestay-logo.jpg"
              alt="Zen Homestay Logo"
              width={36}
              height={36}
              className="object-contain rounded-xl shadow-md"
              style={{ width: '36px', height: '36px' }}
            />
            <div>
              <span className="font-extrabold text-slate-900 text-sm block leading-none group-hover:text-sky-600 transition-colors">Zen Homestay</span>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Punnamada Lake · Alleppey</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-full text-xs font-bold hover:bg-emerald-100 transition-all">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href="tel:+917012761588" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs font-extrabold transition-all shadow-md">
              Book Direct
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative bg-slate-900 text-white py-20 sm:py-28 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/kerala_backwaters_hero_1786702183985.jpg')] bg-cover bg-center opacity-25" />
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Directly on Punnamada Lake · 4.98★
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Punnamada Lake Homestay<br />
              <span className="text-sky-300">Zen Homestay, Alleppey</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              The only homestay sitting directly on the banks of Punnamada Lake — no road access, complete privacy, direct water views from your bedroom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20found%20your%20Punnamada%20Lake%20homestay%20page.%20Please%20check%20availability."
                target="_blank" rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg text-sm transition-all hover:-translate-y-0.5">
                <MessageCircle className="w-5 h-5 fill-current" /> Check Availability on WhatsApp
              </a>
              <a href="tel:+917012761588"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-4 rounded-2xl text-sm transition-all hover:bg-white/20">
                <Phone className="w-4 h-4" /> +91 7012 761 588
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Speedboat Pickup</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Kerala Breakfast</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 0% Commission</span>
            </div>
          </div>
        </section>

        {/* About Punnamada Lake Location */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-4">
            About Our Punnamada Lake Location
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto mb-10">
            Punnamada Lake is one of the most iconic and celebrated backwater destinations in Kerala, famously known as the venue for the annual <strong>Nehru Trophy Snake Boat Race</strong>. Zen Homestay sits on the private banks of this very lake — offering an unrivalled vantage point rarely accessible to travellers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { Icon: Waves, bg: "bg-sky-50", tc: "text-sky-600", title: "Direct Lake Frontage", desc: "Your room opens to unobstructed panoramic views of Punnamada Lake. No other homestay in Alleppey offers this level of direct water access." },
              { Icon: Anchor, bg: "bg-orange-50", tc: "text-orange-600", title: "Private Speedboat Dock", desc: "Our private dock is where your complimentary speedboat arrives and departs. No need for shared boats or public jetties." },
              { Icon: Star, bg: "bg-amber-50", tc: "text-amber-600", title: "Historic Boat Race Venue", desc: "Punnamada Lake hosts the famous Nehru Trophy Boat Race every August. From our dock, you have a front-row seat." },
            ].map(({ Icon, bg, tc, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${bg} ${tc} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Inclusions */}
        <section className="bg-white border-y border-slate-200 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">Everything Included at This Punnamada Lake Homestay</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Direct Punnamada Lake view from bedroom",
                "Complimentary 5-minute private speedboat pickup",
                "Authentic Kerala breakfast every morning",
                "Split air conditioning in both rooms",
                "High-speed Wi-Fi throughout property",
                "Private en-suite attached bathrooms",
                "24/7 dedicated on-site host (Abhijith)",
                "Zero commission — best direct rate",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Punnamada Lake Homestay Rates</h2>
          <p className="text-slate-500 text-sm mb-8">Direct from host Abhijith — no platform markup, no hidden fees.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 text-center">
              <p className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-1">1 Room</p>
              <p className="text-3xl font-black text-slate-900">₹3,000</p>
              <p className="text-xs text-slate-500 mt-1">/night · up to 3 guests</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 text-center">
              <p className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">2 Rooms</p>
              <p className="text-3xl font-black text-slate-900">₹6,000</p>
              <p className="text-xs text-slate-500 mt-1">/night · up to 6 guests</p>
            </div>
          </div>
          <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20want%20to%20book%20the%20Punnamada%20Lake%20homestay."
            target="_blank" rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-8 py-4 rounded-2xl shadow-md text-sm transition-all">
            <MessageCircle className="w-5 h-5 fill-current" /> Reserve via WhatsApp
          </a>
          <p className="text-xs text-slate-400 mt-3">Breakfast + speedboat included · Instant confirmation</p>
        </section>

        {/* Reviews */}
        <section className="bg-slate-50 border-t border-slate-200 py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">What Guests Say About Our Punnamada Lake Homestay</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Vineeth Nair", text: "This Punnamada Lake homestay is unlike anything else in Alleppey — the direct lake view from bed, the wooden balcony, the morning breeze. Absolutely 5 stars." },
                { name: "Anju Jacob", text: "The speedboat pickup felt like arriving at a private island resort. Abhijith's hospitality is truly world-class. The lake at sunset was breathtaking." },
                { name: "Siddharth Kumar", text: "Traveled from Bangalore — this alleppey homestay on Punnamada Lake was the highlight of our trip. The authentic food, the silence, the lake... spectacular." },
                { name: "Arun Menon", text: "Waking up to Punnamada Lake right outside the bedroom window was pure magic. Best homestay experience I've had in all of Kerala." },
              ].map(({ name, text }) => (
                <div key={name} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-0.5 mb-2">{[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-sm">★</span>)}</div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">&ldquo;{text}&rdquo;</p>
                  <p className="text-xs font-bold text-slate-500">— {name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map / How to reach */}
        <section className="bg-slate-900 text-white py-12 px-4 text-center">
          <MapPin className="w-7 h-7 text-orange-400 mx-auto mb-3" />
          <h2 className="text-xl font-extrabold mb-2">Getting to Our Punnamada Lake Homestay</h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto mb-5">
            Head to the <strong className="text-white">Nehru Trophy Boat Race Finishing Point, Punnamada, Alleppey</strong>. Abhijith&apos;s team will greet you for a complimentary 5-minute speedboat ride directly to the homestay dock.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20need%20directions%20to%20the%20Punnamada%20Lake%20homestay."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
              <MessageCircle className="w-4 h-4" /> WhatsApp Directions
            </a>
            <a href="https://maps.google.com/?q=9.5015,76.3537" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:bg-white/20">
              <MapPin className="w-4 h-4" /> Open in Google Maps
            </a>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-14 px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Book Your Punnamada Lake Stay</h2>
          <p className="text-slate-500 text-sm mb-6">Instant confirmation · Best direct rate · No OTA fees</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20want%20to%20book%20the%20Punnamada%20Lake%20homestay." target="_blank" rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg text-sm transition-all">
              <MessageCircle className="w-5 h-5 fill-current" /> Book on WhatsApp
            </a>
            <a href="tel:+917012761588"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-2xl text-sm transition-all">
              <Phone className="w-4 h-4" /> +91 7012 761 588
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            <Link href="/" className="underline hover:text-slate-600">← Back to Zen Homestay Homepage</Link>
            {" · "}
            <Link href="/alleppey-homestay" className="underline hover:text-slate-600">Alleppey Homestay</Link>
            {" · "}
            <Link href="/kerala-backwater-homestay" className="underline hover:text-slate-600">Kerala Backwater Homestay</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
