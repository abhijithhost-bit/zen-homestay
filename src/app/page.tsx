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
  ChevronRight,
  Award
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900 pb-20 md:pb-0">
      
      {/* Airbnb-style Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-neutral-900 leading-none">Zen Homestay</span>
              <span className="text-[11px] font-medium text-neutral-500 tracking-wider uppercase mt-0.5">Punnamada Lake · Alleppey</span>
            </div>
          </Link>

          {/* Center Search / Status Pill */}
          <div className="hidden md:flex items-center divide-x divide-neutral-200 border border-neutral-200 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow text-xs font-semibold text-neutral-700 bg-white">
            <span className="px-3 text-neutral-900">Alleppey Backwaters</span>
            <span className="px-3 text-neutral-600">5-Min Speedboat Pickup</span>
            <span className="px-3 text-rose-600 flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/917012761588" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-neutral-800 hover:bg-neutral-100 px-4 py-2.5 rounded-full transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              WhatsApp Direct
            </a>
            <Link 
              href="/contact" 
              className="bg-neutral-900 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow active:scale-95"
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
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200/80">
              <Award className="w-3.5 h-3.5 text-amber-600" /> Guest Favorite
            </span>
            <span className="text-xs font-semibold text-neutral-500">Top 1% rated homestay in Kerala</span>
          </div>

          {/* Exact required H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Best Home stay in alleppey
          </h1>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-y-2 text-xs sm:text-sm text-neutral-600">
            <div className="flex flex-wrap items-center gap-3 font-medium">
              <span className="flex items-center gap-1 font-bold text-neutral-900">
                <Star className="w-4 h-4 fill-neutral-900 text-neutral-900" /> 4.98
              </span>
              <span>·</span>
              <span className="underline font-semibold text-neutral-900 cursor-pointer">48 reviews</span>
              <span>·</span>
              <span className="flex items-center gap-1 font-medium text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-rose-500" /> Superhost
              </span>
              <span>·</span>
              <span className="underline text-neutral-700">Near Finishing Point, Punnamada Lake, Alleppey, Kerala</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-neutral-700">
              <button className="flex items-center gap-1.5 hover:bg-neutral-100 px-3 py-1.5 rounded-lg transition-colors">
                <Share className="w-3.5 h-3.5" /> Share
              </button>
              <button className="flex items-center gap-1.5 hover:bg-neutral-100 px-3 py-1.5 rounded-lg transition-colors">
                <Heart className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Airbnb Signature 5-Photo Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 rounded-2xl md:rounded-3xl overflow-hidden mb-12 relative shadow-sm max-h-[520px]">
          {/* Main Large Left Photo */}
          <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto md:h-full group cursor-pointer overflow-hidden">
            <Image 
              src="/kerala_backwaters_hero_1786702183985.jpg"
              alt="Zen Homestay Punnamada Lake View"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Middle 2 Grid Photos */}
          <div className="hidden md:grid grid-rows-2 gap-2.5 h-full">
            <div className="relative aspect-[4/3] group cursor-pointer overflow-hidden">
              <Image 
                src="/kerala_heritage_room_1786702263227.jpg"
                alt="Heritage Suite Bedroom"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-[4/3] group cursor-pointer overflow-hidden">
              <Image 
                src="/kerala_boat_arrival_1786708991444.jpg"
                alt="Complimentary Speedboat Transfer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right 2 Grid Photos */}
          <div className="hidden md:grid grid-rows-2 gap-2.5 h-full">
            <div className="relative aspect-[4/3] group cursor-pointer overflow-hidden">
              <Image 
                src="/kerala_lake_dining_1786708655762.jpg"
                alt="Authentic Kerala Lakeside Breakfast"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-[4/3] group cursor-pointer overflow-hidden">
              <Image 
                src="/kerala_balcony_view_1786702364116.jpg"
                alt="Private Wooden Balcony View"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* View All Photos Floating Badge */}
          <div className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-neutral-900 border border-neutral-300 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 transition-all">
            <span>📷</span> Show all 5 photos
          </div>
        </div>

        {/* 2-Column Airbnb Listing Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Main Listing Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Host Details & Room Metrics */}
            <div className="flex items-center justify-between pb-8 border-b border-neutral-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  Entire waterfront heritage homestay hosted by Abhijith
                </h2>
                <p className="text-sm text-neutral-500 font-medium mt-1">
                  6 guests · 2 private suites · 2 King beds · 2 private bathrooms · Waterfront veranda
                </p>
              </div>
              <div className="relative w-14 h-14 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-lg shrink-0 border-2 border-white shadow-sm">
                <span>ZH</span>
                <span className="absolute -bottom-1 -right-1 bg-rose-500 text-white p-1 rounded-full text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Airbnb "Guest Favorite" Trophy Card */}
            <div className="p-6 rounded-2xl border border-neutral-200 bg-neutral-50/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm sm:text-base">One of the most loved homes in Alleppey</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                    Rated 4.98 stars by guests with 100% 5-star check-in and location ratings.
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <div className="font-extrabold text-xl text-neutral-900">4.98</div>
                <div className="flex text-amber-500 text-xs">★★★★★</div>
              </div>
            </div>

            {/* Core Airbnb Highlights List */}
            <div className="space-y-6 pb-8 border-b border-neutral-200">
              
              <div className="flex items-start gap-4">
                <div className="mt-1 text-neutral-800">
                  <Anchor className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">Exclusive 5-Minute Speedboat Arrival</h4>
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                    Complimentary private speed boat pickup directly from the boat race finishing point straight to the homestay dock.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-neutral-800">
                  <Waves className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">Direct Punnamada Lake Frontage</h4>
                  {/* Exact sub-headline requirement */}
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed font-medium">
                    Wake up to beautiful, direct views of Punnamada Lake right from the room.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-neutral-800">
                  <ShieldCheck className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">Ultimate Privacy & Roadless Serenity</h4>
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                    Zero road access means no vehicle noise, no traffic, and complete secluded tranquility on the water.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-neutral-800">
                  <Clock className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">Fast Host Communication</h4>
                  <p className="text-sm text-neutral-600 mt-0.5 leading-relaxed">
                    Abhijith responds directly on WhatsApp and phone within 5 minutes.
                  </p>
                </div>
              </div>

            </div>

            {/* THE ARRIVAL EXPERIENCE SECTION */}
            <div id="arrival" className="pb-8 border-b border-neutral-200">
              <span className="text-xs font-bold tracking-wider text-rose-600 uppercase">Unique Selling Point</span>
              <h2 className="text-2xl font-bold text-neutral-900 mt-1 mb-4">
                The Arrival Experience
              </h2>
              
              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 mb-6">
                <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
                  <p>
                    Zen Homestay is situated in an exclusive, secluded enclave along the banks of Punnamada Lake, near the celebrated <strong>Nehru Trophy Boat Race finishing point</strong>.
                  </p>
                  <p>
                    To preserve our guests' peace and privacy, <strong className="text-neutral-900">our property deliberately has no road connectivity</strong>. You are completely surrounded by calm waters and gentle backwater breezes.
                  </p>
                </div>
              </div>

              {/* Step by Step Route */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-neutral-200 bg-white">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">1</div>
                  <h4 className="font-bold text-neutral-900 text-sm">Reach Finishing Point</h4>
                  <p className="text-xs text-neutral-500 mt-1">Arrive easily by car/cab at the Nehru Trophy Boat Race Finishing Point.</p>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
                  <div className="w-7 h-7 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center mb-3">2</div>
                  <h4 className="font-bold text-neutral-900 text-sm">Board Speed Boat</h4>
                  <p className="text-xs text-neutral-600 mt-1">Board your complimentary private speed boat arranged by our team.</p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 bg-white">
                  <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mb-3">3</div>
                  <h4 className="font-bold text-neutral-900 text-sm">5-Min Scenic Transfer</h4>
                  <p className="text-xs text-neutral-500 mt-1">Glide across Punnamada Lake directly onto our private resort docks.</p>
                </div>
              </div>
            </div>

            {/* STAY DETAILS (Plain text informational sleeping arrangement) */}
            <div id="stay" className="pb-8 border-b border-neutral-200">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Where you'll sleep</h2>
              <p className="text-sm text-neutral-500 mb-6">Carefully curated heritage rooms with authentic wooden craftsmanship.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Suite 1 */}
                <div className="p-6 rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-all bg-white">
                  <div className="flex items-center gap-2 mb-3 text-neutral-900">
                    <BedDouble className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-sm text-neutral-500 uppercase tracking-wider">Suite 1</span>
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-1">The Premium Lakefront Suite</h3>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                    Four-poster king bed, panoramic lakeside view windows, air conditioning, and luxury en-suite bathroom.
                  </p>
                  <div className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg inline-block">
                    1 King Bed · Direct Water View
                  </div>
                </div>

                {/* Suite 2 */}
                <div className="p-6 rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-all bg-white">
                  <div className="flex items-center gap-2 mb-3 text-neutral-900">
                    <BedDouble className="w-5 h-5 text-rose-600" />
                    <span className="font-bold text-sm text-neutral-500 uppercase tracking-wider">Suite 2</span>
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-1">Heritage Balcony Suite</h3>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                    Spacious bedroom opening directly onto a private traditionally carved teak wooden balcony over the lake.
                  </p>
                  <div className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg inline-block">
                    1 King Bed · Private Wooden Balcony
                  </div>
                </div>
              </div>
            </div>

            {/* WHAT THIS PLACE OFFERS (Amenities Grid) */}
            <div id="amenities" className="pb-8 border-b border-neutral-200">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">What this place offers</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-neutral-800 text-sm">
                <div className="flex items-center gap-3.5 py-1">
                  <Waves className="w-5 h-5 text-neutral-700 shrink-0" />
                  <span>Unobstructed Punnamada Lake waterfront view</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Anchor className="w-5 h-5 text-neutral-700 shrink-0" />
                  <span>Complimentary 5-min speed boat pickup transfer</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Wifi className="w-5 h-5 text-neutral-700 shrink-0" />
                  <span>High-speed Wi-Fi throughout property</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Wind className="w-5 h-5 text-neutral-700 shrink-0" />
                  <span>Full split Air Conditioning in all rooms</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Utensils className="w-5 h-5 text-neutral-700 shrink-0" />
                  <span>Authentic Kerala home-cooked cuisine</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Coffee className="w-5 h-5 text-neutral-700 shrink-0" />
                  <span>Fresh morning tea & Kerala breakfast included</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <ShieldCheck className="w-5 h-5 text-neutral-700 shrink-0" />
                  <span>Private, gated secluded backwater grounds</span>
                </div>
                <div className="flex items-center gap-3.5 py-1">
                  <Clock className="w-5 h-5 text-neutral-700 shrink-0" />
                  <span>24/7 dedicated on-site host assistance</span>
                </div>
              </div>
            </div>

            {/* Verified Reviews Preview */}
            <div className="pb-8 border-b border-neutral-200">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 fill-neutral-900 text-neutral-900" />
                <span className="text-xl font-bold text-neutral-900">4.98 · 48 verified guest reviews</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                      RK
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">Rahul K.</h4>
                      <p className="text-xs text-neutral-500">Stayed last month</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    "The speedboat ride from the finishing point set the tone immediately. Waking up to Punnamada Lake right outside our bedroom window was pure magic!"
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-sm">
                      EM
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900">Elena M.</h4>
                      <p className="text-xs text-neutral-500">Stayed 2 weeks ago</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    "Unmatched privacy! Having no roads nearby meant total silence and serene water views. Abhijith was an incredible host."
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky High-Conversion Airbnb Reserve / Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl space-y-6">
              
              {/* Price & Rating Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">₹4,500</span>
                  <span className="text-neutral-500 font-medium text-sm"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-neutral-900">
                  <Star className="w-4 h-4 fill-neutral-900 text-neutral-900" />
                  <span>4.98</span>
                  <span className="text-neutral-500 font-normal">(48)</span>
                </div>
              </div>

              {/* Informational Selection Box (Airbnb Style) */}
              <div className="border border-neutral-300 rounded-2xl overflow-hidden divide-y divide-neutral-200 bg-neutral-50/50 text-xs">
                <div className="grid grid-cols-2 divide-x divide-neutral-200">
                  <div className="p-3">
                    <span className="font-extrabold uppercase text-[10px] text-neutral-700 block">Check-in</span>
                    <span className="text-neutral-800 font-medium">12:00 PM</span>
                  </div>
                  <div className="p-3">
                    <span className="font-extrabold uppercase text-[10px] text-neutral-700 block">Checkout</span>
                    <span className="text-neutral-800 font-medium">11:00 AM</span>
                  </div>
                </div>
                <div className="p-3">
                  <span className="font-extrabold uppercase text-[10px] text-neutral-700 block">Guests</span>
                  <span className="text-neutral-800 font-medium">Couples, Families & Groups (Up to 6)</span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Includes free 5-min speed boat pickup</span>
                </div>
              </div>

              {/* High-Conversion Direct Action Buttons */}
              <div className="space-y-3 pt-2">
                <a 
                  href="https://wa.me/917012761588" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-extrabold text-base tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Reserve via WhatsApp
                </a>

                <a 
                  href="tel:+917012761588" 
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4" />
                  Call Host (+91 7012 761 588)
                </a>
              </div>

              <div className="text-center">
                <p className="text-xs text-neutral-500 font-medium">
                  You won't be charged yet · Direct host booking with zero commission
                </p>
              </div>

              {/* Verified Guarantees */}
              <div className="border-t border-neutral-100 pt-5 space-y-3 text-xs text-neutral-600 font-medium">
                <div className="flex items-center justify-between">
                  <span className="underline">Instant WhatsApp Confirmation</span>
                  <span className="font-bold text-emerald-700">Free</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="underline">5-Minute Speedboat Transfer</span>
                  <span className="font-bold text-emerald-700">Included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="underline">Complimentary Kerala Breakfast</span>
                  <span className="font-bold text-emerald-700">Included</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 border-t border-neutral-200 py-12 text-xs text-neutral-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] font-bold">
                ZH
              </div>
              <span className="font-bold text-sm text-neutral-900">Zen Homestay Alleppey</span>
            </div>
            <p className="text-neutral-500 leading-relaxed">
              Authentic backwater living on Punnamada Lake, accessible exclusively via a scenic 5-minute speed boat ride.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 text-sm mb-3">Direct Contact</h4>
            <p className="text-neutral-600 mb-1">Phone / WhatsApp: +91 7012 761 588</p>
            <p className="text-neutral-600">Near Nehru Trophy Finishing Point, Alleppey, Kerala</p>
          </div>

          <div>
            <h4 className="font-bold text-neutral-900 text-sm mb-3">Quick Navigation</h4>
            <div className="flex flex-col space-y-2">
              <a href="#arrival" className="hover:underline">The Arrival Experience</a>
              <a href="#stay" className="hover:underline">Where You'll Sleep</a>
              <Link href="/contact" className="hover:underline">Contact Host Page</Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-neutral-500">
          <p>© {new Date().getFullYear()} Zen Homestay. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Homestay Guidelines</span>
          </div>
        </div>
      </footer>

      {/* Airbnb Mobile Sticky Bottom Floating Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 p-4 flex items-center justify-between shadow-2xl">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-extrabold text-neutral-900">₹4,500</span>
            <span className="text-xs text-neutral-500">/ night</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-neutral-600 font-semibold">
            <Star className="w-3 h-3 fill-neutral-900 text-neutral-900" />
            <span>4.98</span>
            <span>·</span>
            <span className="text-emerald-700">Speedboat Incl.</span>
          </div>
        </div>

        <a 
          href="https://wa.me/917012761588" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          WhatsApp
        </a>
      </div>

    </div>
  );
}
