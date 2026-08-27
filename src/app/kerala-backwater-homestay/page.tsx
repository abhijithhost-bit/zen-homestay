import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, Waves, Anchor, Coffee, ShieldCheck, CheckCircle2, Award, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Kerala Backwater Homestay | Zen Homestay Alleppey – Direct Lake Stay",
  description: "Discover the best Kerala backwater homestay at Zen Homestay, Alleppey. Secluded on Punnamada Lake with no road access, private speedboat, authentic Kerala cuisine & 4.98★ reviews. Book direct. +91 7012 761 588.",
  keywords: ["kerala backwater homestay", "backwater homestay kerala", "alleppey backwater homestay", "kerala backwaters stay", "punnamada backwater homestay"],
  alternates: { canonical: "https://zenhomestay.in/kerala-backwater-homestay" },
  openGraph: {
    title: "Kerala Backwater Homestay | Zen Homestay Alleppey",
    description: "The most secluded Kerala backwater homestay on Punnamada Lake. Speedboat access, authentic Kerala cuisine & 4.98★ rating. Book direct.",
    url: "https://zenhomestay.in/kerala-backwater-homestay",
    images: [{ url: "https://zenhomestay.in/kerala_backwaters_hero_1786702183985.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  {
    q: "What makes this the best Kerala backwater homestay?",
    a: "Zen Homestay sits directly on the banks of Punnamada Lake with zero road access. This means complete isolation from vehicle noise and crowds — just pure backwater serenity. Very few homestays in all of Kerala can claim this level of direct water access.",
  },
  {
    q: "Is this Kerala backwater homestay suitable for families?",
    a: "Yes! Both lake view rooms can accommodate up to 3 guests each (6 total). Our property is gated and peaceful — perfect for families, couples, and solo travelers seeking authentic backwater tranquility.",
  },
  {
    q: "How do I get to this Kerala backwater homestay?",
    a: "Arrive by car or cab at the Nehru Trophy Boat Race Finishing Point in Alleppey. Abhijith's team will meet you there and escort you on a complimentary 5-minute private speedboat ride across Punnamada Lake directly to our dock.",
  },
  {
    q: "What Kerala food is served at the homestay?",
    a: "Every stay includes an authentic Kerala breakfast: hot Appam with stew, Puttu, Kadala curry, fresh tropical fruits and locally brewed tea or coffee — prepared fresh every morning by your host.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BedAndBreakfast",
    "name": "Zen Homestay – Kerala Backwater Homestay",
    "url": "https://zenhomestay.in/kerala-backwater-homestay",
    "description": "Best Kerala backwater homestay on Punnamada Lake, Alleppey. No road access, private speedboat, authentic Kerala cuisine, 4.98★ reviews.",
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
      { "@type": "ListItem", "position": 2, "name": "Kerala Backwater Homestay", "item": "https://zenhomestay.in/kerala-backwater-homestay" },
    ],
  },
];

export default function KeralaBackwaterHomestayPage() {
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
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Kerala Backwaters · Alleppey</span>
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
          {/* Hero background — uses Next.js Image for WebP/AVIF optimization + LCP priority */}
          <div className="absolute inset-0 opacity-25">
            <Image
              src="/kerala_backwaters_hero_1786702183985.jpg"
              alt="Kerala backwater homestay on Punnamada Lake Alleppey"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Secluded Kerala Backwater Homestay · 4.98★
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Kerala Backwater Homestay<br />
              <span className="text-sky-300">Punnamada Lake, Alleppey</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              The most secluded backwater homestay in Kerala — no road access, private speedboat arrival, and an authentic lakeside Kerala experience unlike any resort or hotel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20found%20your%20Kerala%20backwater%20homestay%20page.%20Please%20check%20availability."
                target="_blank" rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg text-sm transition-all hover:-translate-y-0.5">
                <MessageCircle className="w-5 h-5 fill-current" /> Check Availability on WhatsApp
              </a>
              <a href="tel:+917012761588"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-4 rounded-2xl text-sm transition-all hover:bg-white/20">
                <Phone className="w-4 h-4" /> +91 7012 761 588
              </a>
            </div>
          </div>
        </section>

        {/* The Backwater Experience */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-4">
            The Real Kerala Backwater Experience
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto mb-10">
            Kerala&apos;s backwaters are one of the world&apos;s most unique geographical wonders — a network of lagoons, lakes, rivers and canals. Zen Homestay places you at the heart of it, not just nearby.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { Icon: Waves, bg: "bg-sky-50", tc: "text-sky-600", title: "Live on the Water", desc: "Your room opens directly onto Punnamada Lake. Watch local fishermen paddle past in the morning mist. See migratory birds perch on coconut fronds. The backwaters aren't a view — they're your daily reality here." },
              { Icon: Anchor, bg: "bg-orange-50", tc: "text-orange-600", title: "Arrive by Speedboat", desc: "Your Kerala backwater experience begins the moment you board your complimentary private speedboat at the Nehru Trophy Boat Race Finishing Point. The 5-minute glide across Punnamada Lake is your welcome ceremony." },
              { Icon: Coffee, bg: "bg-amber-50", tc: "text-amber-600", title: "Authentic Kerala Cuisine", desc: "Taste backwater Kerala through your food. Hot Appam, Puttu with Kadala curry, fresh coconut water, and morning tea served lakeside — the same breakfast Alleppey families have enjoyed for generations." },
              { Icon: ShieldCheck, bg: "bg-emerald-50", tc: "text-emerald-600", title: "Complete Seclusion", desc: "Zen Homestay has no road connectivity by design. No vehicles, no noise, no strangers walking past. Just you, the lake, the birds, and total backwater peace." },
            ].map(({ Icon, bg, tc, title, desc }) => (
              <div key={title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${bg} ${tc} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-y border-slate-200 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">Kerala Backwater Homestay — FAQs</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border border-slate-200 rounded-xl bg-slate-50 p-5">
                  <h3 className="font-extrabold text-slate-900 text-sm mb-2">{q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Kerala Backwater Homestay Rates</h2>
          <p className="text-slate-500 text-sm mb-8">Book direct with host Abhijith — no OTA surcharges.</p>
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
          <div className="space-y-2 mb-6">
            {["Kerala breakfast included daily", "Complimentary speedboat pickup & drop", "All taxes included · No hidden charges"].map(item => (
              <div key={item} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {item}
              </div>
            ))}
          </div>
          <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20want%20to%20book%20the%20Kerala%20backwater%20homestay."
            target="_blank" rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-8 py-4 rounded-2xl shadow-md text-sm transition-all">
            <MessageCircle className="w-5 h-5 fill-current" /> Reserve via WhatsApp
          </a>
          <p className="text-xs text-slate-400 mt-3">Instant confirmation · Responds in &lt; 5 minutes</p>
        </section>

        {/* Location & How to Reach */}
        <section className="bg-slate-900 text-white py-12 px-4 text-center">
          <MapPin className="w-7 h-7 text-orange-400 mx-auto mb-3" />
          <h2 className="text-xl font-extrabold mb-2">How to Reach This Kerala Backwater Homestay</h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto mb-5">
            From Alleppey town, take a cab to the <strong className="text-white">Nehru Trophy Boat Race Finishing Point, Punnamada</strong>. Abhijith&apos;s team will pick you up by private speedboat for a scenic 5-minute transfer across the backwaters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20need%20directions%20to%20the%20Kerala%20backwater%20homestay."
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
              <MessageCircle className="w-4 h-4" /> WhatsApp Directions
            </a>
            <a href="https://maps.google.com/?q=9.5015,76.3537" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:bg-white/20">
              <MapPin className="w-4 h-4" /> Google Maps
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Book Your Kerala Backwater Homestay</h2>
          <p className="text-slate-500 text-sm mb-6">Instant confirmation · Direct host rates · No fees</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/917012761588?text=Hi%20Abhijith%2C%20I%20want%20to%20book%20the%20Kerala%20backwater%20homestay." target="_blank" rel="noreferrer"
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
            <Link href="/punnamada-lake-homestay" className="underline hover:text-slate-600">Punnamada Lake Homestay</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
