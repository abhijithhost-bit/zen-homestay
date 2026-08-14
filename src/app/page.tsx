"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Share, 
  Heart, 
  ShieldCheck, 
  Wifi, 
  Wind, 
  Utensils, 
  Waves, 
  Coffee, 
  Anchor, 
  MessageCircle, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  BedDouble, 
  Award,
  ChevronDown,
  Compass,
  Sun,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Interactive Guest & Room Counters
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  const handleRoomChange = (delta: number) => {
    const nextRooms = Math.min(2, Math.max(1, rooms + delta));
    setRooms(nextRooms);
    if (nextRooms === 1 && guests > 3) {
      setGuests(3);
    }
  };

  const handleGuestChange = (delta: number) => {
    const maxGuests = rooms * 3;
    const nextGuests = Math.min(maxGuests, Math.max(1, guests + delta));
    setGuests(nextGuests);
  };

  const totalPrice = rooms * 3000;
  const whatsappBookingUrl = `https://wa.me/917012761588?text=${encodeURIComponent(
    `Hi Abhijith, I would like to inquire about booking Zen Homestay for ${guests} guest${guests > 1 ? 's' : ''} (${rooms} Lake View Room${rooms > 1 ? 's' : ''}). Check-in 2:00 PM / Checkout 11:00 AM. Please let me know the availability!`
  )}`;

  const images = [
    { src: '/kerala_backwaters_hero_1786702183985.jpg', alt: 'Punnamada Lake View - Best Home stay in alleppey' },
    { src: '/kerala_heritage_room_1786702263227.jpg', alt: 'Lake View Premium Room - Zen Homestay' },
    { src: '/kerala_boat_arrival_1786708991444.jpg', alt: 'Complimentary Speedboat Transfer Alleppey' },
    { src: '/kerala_lake_dining_1786708655762.jpg', alt: 'Authentic Kerala Lakeside Breakfast' },
    { src: '/kerala_balcony_view_1786702364116.jpg', alt: 'Private Veranda over Punnamada Lake' }
  ];

  const faqs = [
    {
      q: "Why is Zen Homestay rated the best home stay in alleppey?",
      a: "Zen Homestay offers an unmatched waterfront experience directly along the banks of Punnamada Lake. With zero road access, guests experience true peaceful tranquility, waking up to uninterrupted water views, authentic home-cooked Kerala cuisine, and personalized 5-star hospitality from your host Abhijith."
    },
    {
      q: "How does the complimentary 5-minute speed boat transfer work?",
      a: "When you arrive in Alleppey, you head to the iconic Nehru Trophy Boat Race Finishing Point. Our team greets you there and escorts you onto our private speed boat for a scenic 5-minute ride across Punnamada Lake directly to our private docks. The boat transfer is 100% complimentary for all our guests."
    },
    {
      q: "Why is there no road connectivity to the homestay?",
      a: "Our property was chosen deliberately to give our guests complete privacy and authentic backwater peace. Without roads or vehicular traffic, there is zero engine noise or pollution—only gentle water breezes, chirping birds, and tranquil lake vistas."
    },
    {
      q: "What meals are included with the stay?",
      a: "Every booking includes a freshly prepared, authentic Kerala morning breakfast featuring classic favorites like hot Appam with stew, Puttu, fresh tropical fruits, and freshly brewed local tea or coffee served right beside the water."
    },
    {
      q: "How do I check room availability or reserve a date?",
      a: "We believe in direct, hassle-free host communication without third-party commission markups. Simply message us on WhatsApp or call host Abhijith directly at +91 7012 761 588 to check your preferred dates and receive instant confirmation."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900 pb-20 md:pb-0">
      
      {/* Soft Light-Blue & Orange Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 via-sky-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/10">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">Zen Homestay</span>
              <span className="text-[11px] font-bold text-sky-600 tracking-wider uppercase mt-0.5">Punnamada Lake · Alleppey</span>
            </div>
          </Link>

          {/* Center Search / Status Pill */}
          <div className="hidden md:flex items-center divide-x divide-slate-200 border border-slate-200 rounded-full py-2 px-4 shadow-sm text-xs font-semibold text-slate-700 bg-white">
            <span className="px-3 text-slate-800">Alleppey Backwaters</span>
            <span className="px-3 text-sky-600 font-bold">5-Min Speedboat Pickup</span>
            <span className="px-3 text-orange-600 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
              Direct Host Rates
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/917012761588" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 px-4 py-2.5 rounded-full transition-colors border border-slate-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              WhatsApp Direct
            </a>
            <Link 
              href="/contact" 
              className="bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow active:scale-95"
            >
              Contact Host
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        
        {/* Listing Title Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-extrabold px-3 py-1 rounded-full border border-orange-200 shadow-sm">
              <Award className="w-3.5 h-3.5 text-orange-500" /> Guest Favorite
            </span>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Top 1% Waterfront Stay in Alleppey
            </span>
          </div>

          {/* Exact required H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Best Home stay in alleppey
          </h1>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-y-2 text-xs sm:text-sm text-slate-600">
            <div className="flex flex-wrap items-center gap-3 font-medium">
              <span className="flex items-center gap-1 font-extrabold text-slate-900">
                <Star className="w-4 h-4 fill-orange-500 text-orange-500" /> 4.98
              </span>
              <span>·</span>
              <span className="underline font-bold text-sky-600 cursor-pointer">48 verified guest reviews</span>
              <span>·</span>
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-sky-500" /> Superhost
              </span>
              <span>·</span>
              <span className="underline text-slate-700">Near Finishing Point, Punnamada Lake, Alleppey, Kerala</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
              <button className="flex items-center gap-1.5 hover:bg-slate-200/60 px-3 py-1.5 rounded-lg transition-colors">
                <Share className="w-3.5 h-3.5 text-sky-600" /> Share
              </button>
              <button className="flex items-center gap-1.5 hover:bg-slate-200/60 px-3 py-1.5 rounded-lg transition-colors">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Swipeable Photo Gallery */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 sm:-mx-6 mb-6">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full shrink-0 aspect-[4/3] snap-center">
              <Image 
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                className="object-cover"
              />
            </div>
          ))}
          {/* Mobile Photo Count Badge */}
          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 z-10 pointer-events-none">
            <span>📷</span> 1 / 5
          </div>
        </div>

        {/* Desktop Bento Grid Photo Gallery */}
        <div className="hidden md:grid grid-cols-4 gap-2.5 rounded-3xl overflow-hidden mb-12 relative shadow-md h-[520px] bg-slate-200">
          {/* Main Large Left Photo */}
          <div className="col-span-2 relative h-full group cursor-pointer overflow-hidden" onClick={() => setShowGallery(true)}>
            <Image 
              src="/kerala_backwaters_hero_1786702183985.jpg"
              alt="Zen Homestay Punnamada Lake View"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent group-hover:opacity-0 transition-opacity" />
          </div>

          {/* Middle 2 Grid Photos */}
          <div className="grid grid-rows-2 gap-2.5 h-full">
            <div className="relative group cursor-pointer overflow-hidden" onClick={() => setShowGallery(true)}>
              <Image 
                src="/kerala_heritage_room_1786702263227.jpg"
                alt="Lake View Premium Room"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative group cursor-pointer overflow-hidden" onClick={() => setShowGallery(true)}>
              <Image 
                src="/kerala_boat_arrival_1786708991444.jpg"
                alt="Complimentary Speedboat Transfer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right 2 Grid Photos */}
          <div className="grid grid-rows-2 gap-2.5 h-full">
            <div className="relative group cursor-pointer overflow-hidden" onClick={() => setShowGallery(true)}>
              <Image 
                src="/kerala_lake_dining_1786708655762.jpg"
                alt="Authentic Kerala Lakeside Breakfast"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative group cursor-pointer overflow-hidden" onClick={() => setShowGallery(true)}>
              <Image 
                src="/kerala_balcony_view_1786702364116.jpg"
                alt="Private Wooden Balcony View"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* View All Photos Floating Badge */}
          <div 
            onClick={() => setShowGallery(true)}
            className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 border border-slate-200 px-4 py-2 rounded-xl text-xs font-extrabold shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 hover:text-orange-600"
          >
            <span>📷</span> Show all 5 photos
          </div>
        </div>

        {/* 2-Column High-Conversion Listing Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Main Listing Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Host Details & Room Metrics */}
            <div className="flex items-center justify-between pb-8 border-b border-slate-200 bg-white p-6 rounded-3xl border shadow-sm">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Entire waterfront heritage homestay hosted by Abhijith
                </h2>
                <p className="text-sm text-slate-600 font-semibold mt-1 flex items-center gap-2 flex-wrap">
                  <span className="bg-sky-50 text-sky-800 px-2.5 py-0.5 rounded-md font-bold">2 Lake View Bedrooms</span>
                  <span>·</span>
                  <span>Max 3 guests per room</span>
                  <span>·</span>
                  <span>2 King beds</span>
                  <span>·</span>
                  <span>2 Private bathrooms</span>
                </p>
              </div>
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-600 text-white font-extrabold flex items-center justify-center text-lg shrink-0 shadow-md">
                <span>ZH</span>
                <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1 rounded-full text-[10px] shadow">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* "Guest Favorite" Trophy Card */}
            <div className="p-6 rounded-3xl border border-orange-200/80 bg-gradient-to-r from-orange-50/80 via-orange-50/30 to-sky-50/50 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">One of the most loved homes in Alleppey</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                    Rated 4.98 stars with 100% 5-star check-in and private waterfront location scores.
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <div className="font-black text-2xl text-slate-900">4.98</div>
                <div className="flex text-orange-500 text-xs">★★★★★</div>
              </div>
            </div>

            {/* Core Highlights List */}
            <div className="space-y-6 pb-8 border-b border-slate-200 bg-white p-8 rounded-3xl border shadow-sm">
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                  <Anchor className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Exclusive 5-Minute Speedboat Arrival</h4>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                    Complimentary private speed boat pickup directly from the boat race finishing point straight to our docks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 shrink-0">
                  <Waves className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Direct Punnamada Lake Frontage</h4>
                  {/* Exact sub-headline requirement */}
                  <p className="text-sm text-slate-700 mt-0.5 leading-relaxed font-semibold">
                    Wake up to beautiful, direct views of Punnamada Lake right from the room.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Ultimate Privacy & Roadless Serenity</h4>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                    Zero road access means no vehicle noise, no traffic, and complete secluded tranquility on the water.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Fast Host Communication</h4>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                    Abhijith responds directly on WhatsApp and phone within 5 minutes.
                  </p>
                </div>
              </div>

            </div>

            {/* THE ARRIVAL EXPERIENCE SECTION */}
            <div id="arrival" className="pb-8 border-b border-slate-200">
              <span className="text-xs font-extrabold tracking-wider text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Unique Selling Point
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-3 mb-4">
                The Arrival Experience
              </h2>
              
              <div className="bg-sky-50/70 rounded-3xl p-6 sm:p-8 border border-sky-100 mb-6">
                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  <p>
                    Zen Homestay is situated in an exclusive, secluded enclave along the banks of Punnamada Lake, near the celebrated <strong>Nehru Trophy Boat Race finishing point</strong>.
                  </p>
                  <p>
                    To preserve our guests' peace and privacy, <strong className="text-sky-950">our property deliberately has no road connectivity</strong>. You are completely surrounded by calm waters and gentle backwater breezes.
                  </p>
                </div>
              </div>

              {/* Step by Step Route */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-sky-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center mb-3">1</div>
                  <h4 className="font-bold text-slate-900 text-sm">Reach Finishing Point</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Arrive easily by car or cab at the Nehru Trophy Boat Race Finishing Point in Alleppey.</p>
                </div>

                <div className="p-5 rounded-2xl border border-orange-200 bg-orange-50/60 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-xs flex items-center justify-center mb-3">2</div>
                  <h4 className="font-bold text-slate-900 text-sm">Board Speed Boat</h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">Board your complimentary private speed boat arranged by our on-site team.</p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-sky-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center mb-3">3</div>
                  <h4 className="font-bold text-slate-900 text-sm">5-Min Scenic Transfer</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Glide across Punnamada Lake directly onto our private waterfront docks.</p>
                </div>
              </div>
            </div>

            {/* STAY DETAILS (Plain text informational sleeping arrangement) */}
            <div id="stay" className="pb-8 border-b border-slate-200">
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-2xl font-extrabold text-slate-900">Where you'll sleep</h2>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                  2 Identical Lakefront Rooms
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-6 font-medium">
                Our 2 identical Lake View Premium Rooms, crafted with authentic Kerala wooden interiors and direct views of Punnamada Lake.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Bedroom 1 */}
                <div className="p-6 rounded-3xl border border-slate-200 hover:border-sky-400 transition-all bg-white shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-2 mb-3 text-slate-900">
                    <BedDouble className="w-5 h-5 text-sky-500" />
                    <span className="font-bold text-xs text-slate-500 uppercase tracking-wider">Bedroom 1</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-extrabold text-lg text-slate-900">Lake View Premium Room</h3>
                    <span className="font-black text-orange-600 text-base">₹3,000 <span className="text-xs font-normal text-slate-500">/ night</span></span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Plush king bed, direct panoramic lake views, split air conditioning, extra bedding for 3rd guest, and private en-suite bathroom.
                  </p>
                  <div className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-xl inline-block">
                    Max 3 Guests · 1 King Bed · Direct Lake View
                  </div>
                </div>

                {/* Bedroom 2 */}
                <div className="p-6 rounded-3xl border border-slate-200 hover:border-sky-400 transition-all bg-white shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-2 mb-3 text-slate-900">
                    <BedDouble className="w-5 h-5 text-sky-500" />
                    <span className="font-bold text-xs text-slate-500 uppercase tracking-wider">Bedroom 2</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-extrabold text-lg text-slate-900">Lake View Premium Room</h3>
                    <span className="font-black text-orange-600 text-base">₹3,000 <span className="text-xs font-normal text-slate-500">/ night</span></span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    Plush king bed, direct panoramic lake views, split air conditioning, extra bedding for 3rd guest, and private en-suite bathroom.
                  </p>
                  <div className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-xl inline-block">
                    Max 3 Guests · 1 King Bed · Direct Lake View
                  </div>
                </div>
              </div>
            </div>

            {/* WHAT THIS PLACE OFFERS (Amenities Grid) */}
            <div id="amenities" className="pb-8 border-b border-slate-200 bg-white p-8 rounded-3xl border shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">What this place offers</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-slate-800 text-sm">
                <div className="flex items-center gap-3.5 py-1">
                  <Waves className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="font-medium">Direct Punnamada Lake waterfront view</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Anchor className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="font-medium">Complimentary 5-min speed boat pickup transfer</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Wifi className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="font-medium">High-speed Wi-Fi throughout property</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Wind className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="font-medium">Full split Air Conditioning in both rooms</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Utensils className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="font-medium">Authentic Kerala home-cooked cuisine</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Coffee className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="font-medium">Fresh morning tea & Kerala breakfast included</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="font-medium">Private, gated secluded backwater grounds</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Clock className="w-5 h-5 text-sky-500 shrink-0" />
                  <span className="font-medium">24/7 dedicated on-site host assistance</span>
                </div>
              </div>
            </div>

            {/* The Backwater Lifestyle Experience */}
            <div className="pb-8 border-b border-slate-200">
              <span className="text-xs font-bold tracking-wider text-sky-700 uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Authentic Kerala Living
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-3 mb-4">
                Why Guests Choose Zen Homestay in Alleppey
              </h2>
              
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                <p>
                  Finding the right stay in Alleppey makes all the difference. While many properties are located near busy town centers and noisy thoroughfares, Zen Homestay offers an oasis of pure serenity right on the world-famous waters of <strong>Punnamada Lake</strong>.
                </p>
                <p>
                  Here, the rhythms of life move with the gentle water tides. You will see local canoe fishermen gliding past in the early morning fog, migratory birds perching on coconut fronds, and the mesmerizing reflection of the Kerala sunset dancing across the lake surface.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <Sun className="w-6 h-6 text-orange-500 mb-3" />
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Serene Sunrise Vistas</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Watch the morning sun illuminate Punnamada Lake while enjoying freshly brewed tea on your veranda.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <Utensils className="w-6 h-6 text-sky-500 mb-3" />
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Authentic Kerala Flavors</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Taste authentic Kerala home cooking prepared with freshly harvested spices and local ingredients.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <Compass className="w-6 h-6 text-orange-500 mb-3" />
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Historic Location</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Situated near the historic finishing track of the renowned annual Nehru Trophy Boat Race.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive FAQ Accordion */}
            <div className="pb-8 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-sky-600" />
                <span className="text-xs font-extrabold tracking-wider text-sky-700 uppercase">Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
                Everything You Need to Know About Your Stay
              </h2>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                          openFaq === idx ? 'transform rotate-180 text-orange-600' : ''
                        }`} 
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Reviews Preview */}
            <div className="pb-8 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                <span className="text-xl font-extrabold text-slate-900">4.98 · 48 verified guest reviews</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center text-sm">
                      RK
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Rahul K.</h4>
                      <p className="text-xs text-slate-500">Stayed last month</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    "The speedboat ride from the finishing point set the tone immediately. Waking up to Punnamada Lake right outside our bedroom window was pure magic!"
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                      EM
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Elena M.</h4>
                      <p className="text-xs text-slate-500">Stayed 2 weeks ago</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    "Unmatched privacy! Having no roads nearby meant total silence and serene water views. Abhijith was an incredible host."
                  </p>
                </div>
              </div>
            </div>

            {/* Things to Know & House Rules */}
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-4">Things to Know</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Check-in & Checkout</h4>
                  <p className="leading-relaxed font-bold text-slate-900">Check-in: 2:00 PM</p>
                  <p className="leading-relaxed font-bold text-slate-900">Checkout: 11:00 AM</p>
                  <p className="leading-relaxed text-slate-500 mt-1">Flexible timing upon prior request via WhatsApp.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Speedboat Pickup</h4>
                  <p className="leading-relaxed">Free private boat transfer</p>
                  <p className="leading-relaxed">Luggage assistance included</p>
                  <p className="leading-relaxed text-slate-500 mt-1">Directly from the Finishing Point.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Peaceful Sanctuary</h4>
                  <p className="leading-relaxed">Suitable for families & couples</p>
                  <p className="leading-relaxed">Strict zero noise pollution zone</p>
                  <p className="leading-relaxed text-slate-500 mt-1">Dedicated on-site host care.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: High-Conversion Sticky Soft Light-Blue & Orange Reserve Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              
              {/* Special Offer Header Pill */}
              <div className="bg-orange-500 text-white text-[11px] font-extrabold py-1.5 px-3 rounded-full text-center tracking-wider uppercase shadow-sm">
                Direct Host Guaranteed Rate
              </div>

              {/* Price & Rating Header */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-3xl font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-slate-500 font-bold text-sm"> / {rooms === 1 ? 'room' : '2 rooms'} / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span>4.98</span>
                  <span className="text-slate-500 font-normal">(48)</span>
                </div>
              </div>

              {/* Interactive Booking Box: Check-in, Check-out, Rooms Counter, Guests Counter */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 bg-slate-50/70 text-xs font-medium">
                <div className="grid grid-cols-2 divide-x divide-slate-200">
                  <div className="p-3">
                    <span className="font-extrabold uppercase text-[10px] text-slate-500 block">Check-in</span>
                    <span className="text-slate-900 font-bold text-sm">2:00 PM</span>
                  </div>
                  <div className="p-3">
                    <span className="font-extrabold uppercase text-[10px] text-slate-500 block">Checkout</span>
                    <span className="text-slate-900 font-bold text-sm">11:00 AM</span>
                  </div>
                </div>

                {/* Rooms Counter */}
                <div className="p-3.5 flex items-center justify-between bg-white">
                  <div>
                    <span className="font-extrabold uppercase text-[10px] text-slate-500 block">Rooms</span>
                    <span className="text-slate-900 font-bold text-sm">
                      {rooms} {rooms === 1 ? 'Room' : 'Rooms'} <span className="text-slate-400 font-normal text-xs">(₹3,000/room)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRoomChange(-1)}
                      disabled={rooms <= 1}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold bg-white transition-colors active:scale-95"
                      aria-label="Decrease rooms"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-extrabold text-sm w-4 text-center text-slate-900">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => handleRoomChange(1)}
                      disabled={rooms >= 2}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold bg-white transition-colors active:scale-95"
                      aria-label="Increase rooms"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Guests Counter */}
                <div className="p-3.5 flex items-center justify-between bg-white">
                  <div>
                    <span className="font-extrabold uppercase text-[10px] text-slate-500 block">Guests</span>
                    <span className="text-slate-900 font-bold text-sm">
                      {guests} {guests === 1 ? 'Guest' : 'Guests'} <span className="text-slate-400 font-normal text-xs">(Max {rooms * 3})</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleGuestChange(-1)}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold bg-white transition-colors active:scale-95"
                      aria-label="Decrease guests"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-extrabold text-sm w-4 text-center text-slate-900">{guests}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestChange(1)}
                      disabled={guests >= rooms * 3}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-base font-bold bg-white transition-colors active:scale-95"
                      aria-label="Increase guests"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-sky-50 text-sky-900 font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Free 5-min speed boat pickup</span>
                  </div>
                  <span className="text-orange-600 font-black text-xs">₹{totalPrice.toLocaleString('en-IN')}/night</span>
                </div>
              </div>

              {/* High-Conversion Action Buttons with Dynamic WhatsApp Pre-filled text */}
              <div className="space-y-3 pt-2">
                <a 
                  href={whatsappBookingUrl}
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-base tracking-wide transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Reserve via WhatsApp
                </a>

                <a 
                  href="tel:+917012761588" 
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-sm active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  Call Host (+91 7012 761 588)
                </a>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-500 font-semibold">
                  Zero booking commission · Instant response in &lt; 5 mins
                </p>
              </div>

              {/* Verified Guarantees */}
              <div className="border-t border-slate-100 pt-5 space-y-3 text-xs text-slate-600 font-semibold">
                <div className="flex items-center justify-between">
                  <span className="underline">Instant WhatsApp Confirmation</span>
                  <span className="font-bold text-sky-700">Free</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="underline">5-Minute Speedboat Transfer</span>
                  <span className="font-bold text-sky-700">Included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="underline">Complimentary Kerala Breakfast</span>
                  <span className="font-bold text-sky-700">Included</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs font-black">
                ZH
              </div>
              <span className="font-extrabold text-base text-white">Zen Homestay Alleppey</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              Authentic backwater living on Punnamada Lake, accessible exclusively via a scenic 5-minute speed boat ride.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Direct Contact</h4>
            <p className="text-slate-300 mb-1 font-medium">Phone / WhatsApp: +91 7012 761 588</p>
            <p className="text-slate-400">Near Nehru Trophy Finishing Point, Punnamada Lake, Alleppey, Kerala</p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm mb-3">Quick Navigation</h4>
            <div className="flex flex-col space-y-2 font-medium">
              <a href="#arrival" className="hover:text-orange-400 transition-colors">The Arrival Experience</a>
              <a href="#stay" className="hover:text-orange-400 transition-colors">Where You'll Sleep</a>
              <Link href="/contact" className="hover:text-orange-400 transition-colors">Contact Host Page</Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} Zen Homestay. All rights reserved.</p>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/terms" className="hover:underline hover:text-slate-400">Terms & Conditions</Link>
            <span>·</span>
            <Link href="/terms" className="hover:underline hover:text-slate-400">House Guidelines</Link>
            <span>·</span>
            <Link href="/contact" className="hover:underline hover:text-slate-400">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 flex items-center justify-between shadow-2xl">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
            <span className="text-xs text-slate-500">/ {rooms} {rooms === 1 ? 'room' : 'rooms'}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-700 font-bold">
            <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
            <span>4.98</span>
            <span>·</span>
            <span className="text-sky-600">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>
        </div>

        <a 
          href={whatsappBookingUrl}
          target="_blank" 
          rel="noreferrer"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-black text-sm shadow-md shadow-orange-500/20 flex items-center gap-2 active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          WhatsApp Host
        </a>
      </div>

      {/* Full Screen Image Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-4 md:px-8 border-b border-slate-200 bg-white sticky top-0 z-10">
            <button 
              onClick={() => setShowGallery(false)}
              className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors"
            >
              ✕ Close
            </button>
            <div className="text-sm font-extrabold text-sky-600">Photo Gallery (5 Photos)</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-100 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-4 md:space-y-8 flex flex-col items-center">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-full max-w-4xl aspect-[4/3] bg-slate-200 overflow-hidden shadow-md md:rounded-2xl">
                <Image 
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain bg-slate-950"
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
