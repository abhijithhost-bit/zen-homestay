import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, Star, Anchor, Waves, ShieldCheck, Coffee, CheckCircle2, MapPin, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Alleppey Homestay on Punnamada Lake | Zen Homestay – Direct Booking",
  description: "The best Alleppey homestay — Zen Homestay on Punnamada Lake. Direct lake views, complimentary 5-min speedboat, authentic Kerala breakfast & 4.98★ rating. Book direct with host Abhijith at zero commission. Call +91 7012 761 588.",
  keywords: ["alleppey homestay", "best alleppey homestay", "homestay in alleppey", "alleppey lake homestay", "alleppey waterfront homestay"],
  alternates: { canonical: "https://zenhomestay.in/alleppey-homestay" },
  openGraph: {
    title: "Best Alleppey Homestay | Zen Homestay – Direct Booking",
    description: "Best Alleppey homestay on Punnamada Lake. Speedboat access, Kerala breakfast & 4.98★ rating. Book direct — zero commission.",
    url: "https://zenhomestay.in/alleppey-homestay",
    images: [{ url: "https://zenhomestay.in/kerala_backwaters_hero_1786702183985.jpg", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BedAndBreakfast",
  "name": "Zen Homestay – Best Alleppey Homestay",
  "url": "https://zenhomestay.in/alleppey-homestay",
  "description": "Best Alleppey homestay on Punnamada Lake — direct lake views, complimentary speedboat, Kerala breakfast. Book direct at zero commission.",
  "telephone": "+91-7012-761-588",
  "priceRange": "₹3,000 – ₹6,000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Near Nehru Trophy Boat Race Finishing Point, Punnamada Lake",
    "addressLocality": "Alleppey",
    "addressRegion": "Kerala",
    "postalCode": "688006",
    "addressCountry": "IN",
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.98", "reviewCount": "48", "bestRating": "5" },
};

export default function AlleppeyHomestayPage() {
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
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Alleppey · Kerala</span>
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
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> #1 Rated Alleppey Homestay · 4.98★
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Best Alleppey Homestay<br />
              <span className="text-sky-300">on Punnamada Lake</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Direct lake views · Private speedboat arrival · Authentic Kerala breakfast · Zero commission booking with host Abhijith.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20found%20your%20Alleppey%20homestay%20page.%20Please%20check%20availability."
                target="_blank" rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg text-sm transition-all hover:-translate-y-0.5">
                <MessageCircle className="w-5 h-5 fill-current" /> Check Availability on WhatsApp
              </a>
              <a href="tel:+917012761588"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-4 rounded-2xl text-sm transition-all hover:bg-white/20">
                <Phone className="w-4 h-4" /> +91 7012 761 588
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Speedboat Transfer</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Kerala Breakfast Included</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 0% Commission</span>
            </div>
          </div>
        </section>

        {/* Why Best Alleppey Homestay */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Why Zen Homestay is the Best Alleppey Homestay
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
              Unlike most homestays in Alleppey located on busy roads, Zen Homestay sits directly on Punnamada Lake with zero road access — offering unmatched privacy, silence, and authentic backwater living.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Anchor, bg: "bg-sky-50", text: "text-sky-600", title: "Private Speedboat Arrival", desc: "Complimentary 5-minute private speedboat from the Nehru Trophy Boat Race Finishing Point directly to your room." },
              { Icon: Waves, bg: "bg-blue-50", text: "text-blue-600", title: "Direct Punnamada Lake View", desc: "Both rooms have unobstructed panoramic lake views. Wake up to the water every morning." },
              { Icon: Coffee, bg: "bg-orange-50", text: "text-orange-600", title: "Authentic Kerala Breakfast", desc: "Hot Appam, Puttu, fresh fruits and tea served lakeside — home-cooked by your host every morning." },
              { Icon: ShieldCheck, bg: "bg-emerald-50", text: "text-emerald-600", title: "Zero Road Noise", desc: "No vehicle traffic, no road sounds — just water, birds, and total backwater silence." },
              { Icon: Star, bg: "bg-amber-50", text: "text-amber-600", title: "4.98★ · 48 Verified Reviews", desc: "Consistently rated as one of the best stays in all of Alleppey by guests from across India." },
              { Icon: MessageCircle, bg: "bg-green-50", text: "text-green-600", title: "Book Direct · Save 20%", desc: "No Airbnb or MakeMyTrip fees. Message Abhijith directly and save ₹1,000–₹2,300 per stay." },
            ].map(({ Icon, bg, text, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${bg} ${text} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white border-y border-slate-200 py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Alleppey Homestay Room Rates</h2>
            <p className="text-slate-500 text-sm mb-8">Direct host rates — breakfast, speedboat & all surprises included.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto mb-8">
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 text-center">
                <p className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-2">1 Room</p>
                <p className="text-4xl font-black text-slate-900">₹3,000</p>
                <p className="text-xs text-slate-500 mt-1">per night · up to 3 guests</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
                <p className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-2">2 Rooms</p>
                <p className="text-4xl font-black text-slate-900">₹6,000</p>
                <p className="text-xs text-slate-500 mt-1">per night · up to 6 guests</p>
              </div>
            </div>
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20want%20to%20book%20the%20Alleppey%20homestay."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all">
              <MessageCircle className="w-4 h-4 fill-current" /> Reserve via WhatsApp
            </a>
            <p className="text-xs text-slate-400 mt-3">Kerala breakfast + speedboat included · Instant confirmation</p>
          </div>
        </section>

        {/* Reviews */}
        <section className="max-w-4xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">Guest Reviews — Alleppey Homestay</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Arun Menon", text: "Best alleppey homestay I've ever stayed at — waking up to Punnamada Lake right outside the window was pure magic!" },
              { name: "Lakshmi Thomas", text: "No roads nearby means total silence and the most serene water views. Abhijith was an incredible, attentive host throughout." },
              { name: "Divya Varghese", text: "We searched for the best waterfront homestay in Alleppey — Zen Homestay exceeded every expectation. The Kerala breakfast was divine!" },
              { name: "Vineeth Nair", text: "This Punnamada Lake homestay is unlike anything else in Alleppey. Direct lake view from bed, morning breeze. Absolutely 5 stars." },
            ].map(({ name, text }) => (
              <div key={name} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-0.5 mb-2">{[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-sm">★</span>)}</div>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">&ldquo;{text}&rdquo;</p>
                <p className="text-xs font-bold text-slate-500">— {name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="bg-slate-900 text-white py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <MapPin className="w-7 h-7 text-orange-400 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold mb-2">How to Reach This Alleppey Homestay</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Arrive at the <strong className="text-white">Nehru Trophy Boat Race Finishing Point, Punnamada</strong>. Our team greets you for a complimentary 5-minute scenic speedboat ride straight to your room.
            </p>
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20need%20directions."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
              <MessageCircle className="w-4 h-4" /> Get Directions on WhatsApp
            </a>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14 px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Book Your Alleppey Homestay Today</h2>
          <p className="text-slate-500 text-sm mb-6">Instant confirmation · Best direct rate · No hidden fees</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20want%20to%20book%20the%20Alleppey%20homestay." target="_blank" rel="noreferrer"
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
          </p>
        </section>
      </main>
    </div>
  );
}
