import Link from 'next/link';
import { 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star,
  Award
} from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
      
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

          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="text-xs font-bold text-neutral-800 hover:bg-neutral-100 px-4 py-2.5 rounded-full transition-colors"
            >
              ← Back to Listing
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        
        {/* Header Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md border border-amber-200/80 mb-3">
            <Award className="w-3.5 h-3.5 text-amber-600" /> Superhost Response Rate: 100%
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Contact Host directly
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base mt-2 font-medium">
            Have questions about room availability, our complimentary 5-minute speed boat transfer, or custom Kerala meals? Reach out instantly.
          </p>
        </div>

        {/* Contact Action Cards (Airbnb style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* WhatsApp Card */}
          <div className="p-8 rounded-3xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-extrabold text-lg text-neutral-900">WhatsApp Instant Chat</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Fastest
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
                Chat with Abhijith directly for instantaneous quote calculations, photos, and direct booking confirmation.
              </p>
            </div>

            <a 
              href="https://wa.me/917012761588" 
              target="_blank" 
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Call Card */}
          <div className="p-8 rounded-3xl border border-neutral-200 bg-neutral-50/60 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-neutral-900/10 text-neutral-900 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-extrabold text-lg text-neutral-900">Direct Phone Call</h3>
                <span className="bg-neutral-200 text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Direct Line
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
                Prefer to speak over the phone? Feel free to call us directly for immediate inquiries.
              </p>
            </div>

            <a 
              href="tel:+917012761588" 
              className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm hover:shadow active:scale-95"
            >
              <Phone className="w-4 h-4" />
              Call +91 7012 761 588
            </a>
          </div>

        </div>

        {/* Host Profile Info Card */}
        <div className="rounded-3xl border border-neutral-200 p-8 bg-white shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 text-white font-extrabold text-xl flex items-center justify-center border-2 border-rose-500 shadow-sm">
                ZH
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-neutral-900 flex items-center gap-2">
                  Hosted by Abhijith
                  <ShieldCheck className="w-4 h-4 text-rose-500" />
                </h3>
                <p className="text-xs text-neutral-500 font-medium">Superhost · 5 Years Hosting on Punnamada Lake</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-neutral-700 font-semibold">
              <div>
                <span className="text-sm font-extrabold text-neutral-900 block">48</span>
                <span className="text-neutral-500">Reviews</span>
              </div>
              <div>
                <span className="text-sm font-extrabold text-neutral-900 block">4.98 ★</span>
                <span className="text-neutral-500">Rating</span>
              </div>
              <div>
                <span className="text-sm font-extrabold text-neutral-900 block">&lt; 5 min</span>
                <span className="text-neutral-500">Response</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-neutral-900 mb-0.5 font-bold">Location & Meeting Point</strong>
                <span>Near Nehru Trophy Boat Race Finishing Point, Punnamada Lake, Alleppey, Kerala 688006</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-neutral-900 mb-0.5 font-bold">Email</strong>
                <span>hello@zenhomestay.in</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 border-t border-neutral-200 py-8 text-xs text-neutral-600 text-center">
        <p>© {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
      </footer>

    </div>
  );
}
