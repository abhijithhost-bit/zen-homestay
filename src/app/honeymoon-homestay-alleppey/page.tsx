import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, Heart, Anchor, Coffee, Waves, Star, CheckCircle2, MapPin, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Honeymoon Homestay Alleppey | Zen Homestay on Punnamada Lake",
  description: "Plan your Kerala honeymoon at Zen Homestay Alleppey — a romantic lakefront retreat on Punnamada Lake. Private rooms, speedboat arrival, sunrise lake views & authentic Kerala breakfast. Book direct with host Abhijith. +91 7012 761 588.",
  keywords: ["honeymoon homestay alleppey", "alleppey honeymoon", "kerala honeymoon backwaters", "romantic homestay alleppey", "honeymoon in alleppey", "couples homestay kerala", "punnamada lake honeymoon"],
  alternates: { canonical: "https://zenhomestay.in/honeymoon-homestay-alleppey" },
  openGraph: {
    title: "Honeymoon Homestay Alleppey | Zen Homestay on Punnamada Lake",
    description: "Kerala's most romantic lakefront honeymoon stay — directly on Punnamada Lake. Speedboat arrival, sunrise views & authentic Kerala breakfast. Book direct.",
    url: "https://zenhomestay.in/honeymoon-homestay-alleppey",
    images: [{ url: "https://zenhomestay.in/kerala_backwaters_hero_1786702183985.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  { q: "Is Zen Homestay good for a honeymoon in Alleppey?", a: "Yes — Zen Homestay is one of the most sought-after honeymoon stays in Alleppey. The private lakefront setting on Punnamada Lake, with no road access and complete silence, creates a naturally romantic atmosphere. Sunrise and sunset lake views from your room, a private speedboat arrival, and home-cooked Kerala breakfast make it a memorable start to married life." },
  { q: "What makes this honeymoon homestay better than a houseboat?", a: "A houseboat moves and has a fixed schedule, crew, and shared space. Zen Homestay gives you a private, fixed lake-view room you return to each day — with consistent views, personal host attention, and the freedom to experience Alleppey at your own pace. Many couples say this intimacy is something a houseboat cannot provide." },
  { q: "Can you arrange special honeymoon surprises?", a: "Yes! Let host Abhijith know in advance that it is your honeymoon. He will do his best to make your arrival and stay special — whether it is fresh flowers, a thoughtful welcome, a private shikara ride at sunset, or a special breakfast by the water. Just message him on WhatsApp." },
  { q: "What is the best time of year for a honeymoon in Alleppey?", a: "October to February is ideal — cool weather, clear skies, and spectacular sunsets over Punnamada Lake. November and early December offer the perfect balance of great weather and smaller crowds. Monsoon (June–September) has its own dramatic, intimate charm and is popular with couples who prefer moody skies and lush greenery over sunshine." },
  { q: "How do I book the Alleppey honeymoon homestay directly?", a: "WhatsApp host Abhijith at +91 7012 761 588. Let him know your dates, number of guests, and that it is a honeymoon. He responds in under 5 minutes and will confirm availability and room details instantly — with zero booking commission." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BedAndBreakfast",
    "name": "Zen Homestay – Honeymoon Homestay Alleppey",
    "url": "https://zenhomestay.in/honeymoon-homestay-alleppey",
    "description": "Romantic lakefront honeymoon homestay directly on Punnamada Lake, Alleppey. Speedboat arrival, sunrise lake views, Kerala breakfast. Book direct.",
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
    "geo": { "@type": "GeoCoordinates", "latitude": 9.502023969622542, "longitude": 76.35757685613443 },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.98", "reviewCount": "48", "bestRating": "5" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zenhomestay.in" },
      { "@type": "ListItem", "position": 2, "name": "Honeymoon Homestay Alleppey", "item": "https://zenhomestay.in/honeymoon-homestay-alleppey" },
    ],
  },
];

export default function HoneymoonHomestayPage() {
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
              <span className="font-extrabold text-slate-900 text-sm block leading-none group-hover:text-rose-600 transition-colors">Zen Homestay</span>
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider">Punnamada Lake · Alleppey</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20we%20are%20planning%20our%20honeymoon%20in%20Alleppey.%20Can%20you%20check%20availability%3F" target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3.5 py-2 rounded-full text-xs font-bold hover:bg-rose-100 transition-all">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <a href="tel:+917012761588" className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full text-xs font-extrabold transition-all shadow-md">
              Book Direct
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative bg-slate-900 text-white py-24 sm:py-32 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/kerala_backwaters_hero_1786702183985.jpg"
              alt="Romantic honeymoon homestay on Punnamada Lake Alleppey"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Romantic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-900/30 via-transparent to-slate-900/60" />
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current" /> Honeymoon Homestay · Alleppey
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Your Alleppey Honeymoon<br />
              <span className="text-rose-300">Begins on Punnamada Lake</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              A private lakefront retreat with no road access — just water, birdsong, and the person you love. Arrive by speedboat. Wake up to the lake. Eat Kerala breakfast by the water.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20we%20are%20planning%20our%20honeymoon%20in%20Alleppey.%20Can%20you%20check%20availability%3F"
                target="_blank" rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg text-sm transition-all hover:-translate-y-0.5">
                <MessageCircle className="w-5 h-5 fill-current" /> Check Availability on WhatsApp
              </a>
              <a href="tel:+917012761588"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-4 rounded-2xl text-sm transition-all hover:bg-white/20">
                <Phone className="w-4 h-4" /> +91 7012 761 588
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Free Speedboat Arrival</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Kerala Breakfast Included</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> Book Direct · 0% Commission</span>
            </div>
          </div>
        </section>

        {/* Why perfect for honeymoon */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Why Zen Homestay is Perfect for Your Honeymoon
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
              Alleppey has many beautiful places to stay — but very few that combine complete privacy, direct lake frontage, and genuine personal hospitality in one place. Zen Homestay does all three.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Anchor, bg: "bg-rose-50", text: "text-rose-600", title: "Arrive by Speedboat", desc: "A 5-minute private speedboat crossing across Punnamada Lake is how your honeymoon begins. It immediately signals: this is no ordinary trip." },
              { Icon: Waves, bg: "bg-sky-50", text: "text-sky-600", title: "Direct Lake Views", desc: "Both rooms open to unobstructed panoramic views of the lake. Sunrise and sunset from your bed are simply extraordinary." },
              { Icon: Sparkles, bg: "bg-amber-50", text: "text-amber-600", title: "Complete Privacy", desc: "No road access means no vehicle noise, no strangers walking past, no intrusions. Just the two of you and the water." },
              { Icon: Coffee, bg: "bg-orange-50", text: "text-orange-600", title: "Kerala Breakfast by the Lake", desc: "Hot Appam with stew, Puttu, fresh fruit and tea — served lakeside by your host every morning. Home cooking at its most memorable." },
              { Icon: Heart, bg: "bg-rose-50", text: "text-rose-600", title: "Honeymoon Surprises", desc: "Tell Abhijith it is your honeymoon. He will add a personal touch — fresh flowers, a warm welcome, a private shikara at sunset." },
              { Icon: Star, bg: "bg-amber-50", text: "text-amber-600", title: "4.98★ · 48 Reviews", desc: "Consistently rated by guests as one of the best and most romantic stays in all of Alleppey." },
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

        {/* Gallery hero image */}
        <section className="max-w-5xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-3xl overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image src="/kerala_heritage_room_1786702263227.jpg" alt="Romantic lake-view bedroom at Zen Homestay Alleppey honeymoon" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3]">
              <Image src="/kerala_balcony_view_1786702364116.jpg" alt="Lakefront balcony view sunset Punnamada Lake honeymoon" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white border-y border-slate-200 py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Honeymoon Homestay Rates</h2>
            <p className="text-slate-500 text-sm mb-8">Direct from host Abhijith — breakfast, speedboat & every romantic detail included.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto mb-8">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center">
                <p className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">1 Room</p>
                <p className="text-4xl font-black text-slate-900">₹3,000</p>
                <p className="text-xs text-slate-500 mt-1">per night · up to 3 guests</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-center">
                <p className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-2">2 Rooms</p>
                <p className="text-4xl font-black text-slate-900">₹6,000</p>
                <p className="text-xs text-slate-500 mt-1">per night · up to 6 guests</p>
              </div>
            </div>
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20we%20are%20planning%20our%20honeymoon%20in%20Alleppey.%20Can%20you%20check%20availability%3F"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-extrabold px-8 py-3.5 rounded-xl text-sm shadow-md transition-all">
              <MessageCircle className="w-4 h-4 fill-current" /> Reserve via WhatsApp
            </a>
            <p className="text-xs text-slate-400 mt-3">Kerala breakfast + speedboat included · Instant confirmation</p>
          </div>
        </section>

        {/* Reviews */}
        <section className="max-w-4xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">What Couples Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Vineeth & Divya", text: "Stayed for our honeymoon and it was beyond perfect. Waking up to Punnamada Lake outside our window, the private speedboat arrival, Abhijith's warmth — everything was exactly right. Absolutely 5 stars." },
              { name: "Arun & Lakshmi", text: "We looked at many Alleppey properties and chose Zen Homestay for our honeymoon. Best decision we made. The silence, the lake, the Kerala breakfast — we didn't want to leave." },
              { name: "Siddharth & Anjali", text: "The speedboat pickup at sunset was genuinely magical. Abhijith knew it was our honeymoon and made every detail special. This is the most romantic stay we've ever had, anywhere." },
              { name: "Rahul & Priya", text: "This Punnamada Lake homestay is exactly what a Kerala honeymoon should be. No noise, direct lake views, beautiful food, and a host who genuinely cares. Cannot recommend enough." },
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
            <MapPin className="w-7 h-7 text-rose-400 mx-auto mb-3" />
            <h2 className="text-xl font-extrabold mb-2">How to Reach Your Honeymoon Homestay</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Arrive at the <strong className="text-white">Nehru Trophy Boat Race Finishing Point, Punnamada, Alleppey</strong>. Abhijith will meet you for a complimentary 5-minute private speedboat ride straight to the homestay — the most romantic arrival in Kerala.
            </p>
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20we%20need%20directions%20to%20the%20honeymoon%20homestay."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
              <MessageCircle className="w-4 h-4" /> Get Directions on WhatsApp
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">Honeymoon FAQ</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-extrabold text-slate-900 text-sm mb-2">{q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-14 px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Start Your Married Life on Punnamada Lake</h2>
          <p className="text-slate-500 text-sm mb-6">Instant confirmation · Best direct rate · Personal host attention</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20we%20are%20planning%20our%20honeymoon%20in%20Alleppey.%20Can%20you%20check%20availability%3F" target="_blank" rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg text-sm transition-all">
              <MessageCircle className="w-5 h-5 fill-current" /> Book on WhatsApp
            </a>
            <a href="tel:+917012761588"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-2xl text-sm transition-all">
              <Phone className="w-4 h-4" /> +91 7012 761 588
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            <Link href="/" className="underline hover:text-slate-600">← Back to Zen Homestay</Link>
            {" · "}
            <Link href="/alleppey-homestay" className="underline hover:text-slate-600">Alleppey Homestay</Link>
            {" · "}
            <Link href="/blog/alleppey-honeymoon-homestay-guide" className="underline hover:text-slate-600">Honeymoon Travel Guide</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
