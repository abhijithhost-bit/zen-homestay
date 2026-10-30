import Link from 'next/link';
import Image from 'next/image';
import { Anchor, Award, ShieldCheck, Coffee, MessageCircle, MapPin } from 'lucide-react';

const StarRow = () => (
  <>{[1, 2, 3, 4, 5].map((s) => (
    <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FBBC05">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ))}</>
);

export default function SiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/70">
          {/* Brand & Overview */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <Image
                src="/zen-homestay-logo.jpg"
                alt="Zen Homestay Logo"
                width={56}
                height={56}
                className="w-14 h-14 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight block leading-tight group-hover:text-sky-400 transition-colors">
                  Zen Homestay
                </span>
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">
                  Punnamada Lake · Alleppey
                </span>
              </div>
            </Link>

            <a
              href="https://maps.google.com/?q=9.5016131229736,76.35738157806414"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 rounded-xl px-4 py-3 border border-slate-800 transition-colors block group"
              title="View on Google Maps"
            >
              <div className="flex items-center gap-0.5">
                <StarRow />
              </div>
              <span className="text-white font-black text-sm">4.9</span>
              <span className="text-slate-400 font-medium group-hover:text-sky-300 transition-colors">
                · 48 Google reviews ↗
              </span>
            </a>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              An exclusive waterfront sanctuary on Punnamada Lake — accessible only by our complimentary 5-minute speedboat. Zero road noise, authentic Kerala cuisine, and attentive 5-star host care.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="bg-slate-900 text-sky-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                <Anchor className="w-3 h-3" /> 5-Min Boat Pickup
              </span>
              <span className="bg-slate-900 text-orange-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                <Award className="w-3 h-3" /> Superhost 4.9★
              </span>
              <span className="bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> 0% Commission
              </span>
              <span className="bg-slate-900 text-amber-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                <Coffee className="w-3 h-3" /> Breakfast Included
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-extrabold text-white text-[11px] uppercase tracking-widest">Explore</h3>
            <ul className="space-y-2.5 font-medium">
              {[
                { href: '/', label: 'Home Overview' },
                { href: '/#stay', label: 'Lake View Rooms' },
                { href: '/#arrival', label: 'Speedboat Arrival' },
                { href: '/honeymoon-homestay-alleppey', label: 'Honeymoon Stay' },
                { href: '/blog', label: 'Travel Blog' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-sky-500 group-hover:bg-orange-400 transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
              {[
                { href: '/contact', label: 'Contact Host' },
                { href: '/terms-and-conditions', label: 'House Rules' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-sky-500 group-hover:bg-orange-400 transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Host Contact */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-extrabold text-white text-[11px] uppercase tracking-widest">Contact</h3>
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-0.5">Your Host</span>
                  <span className="text-white font-bold text-sm">Abhijith</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-0.5">Phone / WhatsApp</span>
                  <div className="flex flex-col gap-0.5">
                    <a href="tel:+917012761588" className="text-white font-black text-sm hover:text-orange-400 transition-colors py-1 inline-block">
                      +91 7012 761 588
                    </a>
                    <a href="tel:+919947753154" className="text-slate-300 font-bold text-xs hover:text-orange-400 transition-colors py-0.5 inline-block">
                      +91 9947 753 154
                    </a>
                    <a href="tel:+916238951178" className="text-slate-300 font-bold text-xs hover:text-orange-400 transition-colors py-0.5 inline-block">
                      +91 6238 951 178
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold text-slate-400">
                  <div className="bg-slate-800 rounded-lg px-2 py-1.5 text-center">
                    <span className="block text-white font-black">2:00 PM</span>Check-in
                  </div>
                  <div className="bg-slate-800 rounded-lg px-2 py-1.5 text-center">
                    <span className="block text-white font-black">11:00 AM</span>Checkout
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/917012761588"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-xs shadow-md w-full"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Location & Speedboat */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-white text-[11px] uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                Location &amp; Pickup
              </h4>
              <a
                href="https://maps.google.com/?q=9.5016131229736,76.35738157806414"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-sky-400 hover:text-sky-300 transition-colors"
              >
                Open Maps ↗
              </a>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11687.476946382158!2d76.35789056312872!3d9.50244965339974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sde!4v1790614964115!5m2!1sen!2sde"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full brightness-90 contrast-[1.05]"
                title="Zen Homestay Location Map"
                suppressHydrationWarning
              />
              <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate pr-2">
                  <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="truncate">Finishing Point, Punnamada Lake</span>
                </div>
                <span className="text-orange-400 font-extrabold shrink-0">Alleppey, Kerala</span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-slate-900 border border-slate-800 rounded-xl p-3">
              <Anchor className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <span className="text-white font-bold">No road access</span> — arrive at the Nehru Trophy Finishing Point and your complimentary speedboat will pick you up in 5 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-medium">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center sm:text-left">
            <p suppressHydrationWarning className="text-slate-500">
              © {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.
            </p>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span className="text-slate-600">Direct Host · 0% Commission · Best Rate Guaranteed</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <span className="text-slate-800">·</span>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <span className="text-slate-800">·</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

