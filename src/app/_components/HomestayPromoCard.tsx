import Link from 'next/link';
import Image from 'next/image';
import { Anchor, Coffee, ShieldCheck, Award } from 'lucide-react';

/**
 * HomestayPromoCard — shared component shown on all secondary pages.
 * Lets visitors who arrive on blog posts, SEO pages, or contact learn
 * about Zen Homestay and navigate back to the main listing / booking widget.
 */
export default function HomestayPromoCard() {
  return (
    <div className="my-10 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center gap-5 p-6 sm:p-8">
        {/* Logo */}
        <div className="shrink-0">
          <Image
            src="/zen-homestay-logo.jpg"
            alt="Zen Homestay Logo"
            width={64}
            height={64}
            className="rounded-2xl object-contain shadow-md ring-2 ring-sky-50"
            style={{ width: '64px', height: '64px' }}
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="font-extrabold text-lg text-slate-900 leading-tight">
              Zen Homestay
            </span>
            <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-200">
              <Award className="w-3 h-3 text-orange-500" /> Superhost · 4.9★
            </span>
          </div>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Lakefront homestay directly on Punnamada Lake, Alleppey — complimentary speedboat pickup, direct lake views &amp; authentic Kerala breakfast.
          </p>
          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
              <Anchor className="w-3 h-3" /> Free Speedboat
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> 0% Commission
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
              <Coffee className="w-3 h-3" /> Breakfast Included
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-5 py-3 rounded-2xl text-sm transition-all shadow-md hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
          >
            View Homestay →
          </Link>
        </div>
      </div>
    </div>
  );
}
