import Link from 'next/link';
import { 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award,
  CheckCircle2
} from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
      
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

          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="text-xs font-bold text-slate-700 hover:text-orange-600 hover:bg-orange-50 px-4 py-2.5 rounded-full transition-colors border border-slate-200"
            >
              ← Back to Listing
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        
        {/* Header Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-extrabold px-3 py-1 rounded-full border border-orange-200 shadow-sm mb-3">
            <Award className="w-3.5 h-3.5 text-orange-500" /> Superhost Response Rate: 100% (under 5 mins)
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Host directly
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            Have questions about room availability, our complimentary 5-minute speed boat transfer, or authentic Kerala breakfast? Reach out directly.
          </p>
        </div>

        {/* Contact Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* WhatsApp Card */}
          <div className="p-8 rounded-3xl border-2 border-orange-200 bg-white hover:shadow-xl transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/20">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-extrabold text-xl text-slate-900">WhatsApp Instant Chat</h3>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Fastest
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                Chat with Abhijith directly for instant availability, dates, speed boat coordination, and direct ₹3,000/night booking rates.
              </p>
            </div>

            <a 
              href="https://wa.me/917012761588" 
              target="_blank" 
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Call Card */}
          <div className="p-8 rounded-3xl border-2 border-sky-100 bg-white hover:shadow-xl transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-6 shadow-md shadow-sky-500/20">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-extrabold text-xl text-slate-900">Direct Phone Call</h3>
                <span className="bg-sky-100 text-sky-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  Direct Line
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed font-medium">
                Prefer to speak over the phone? Feel free to call us directly for immediate inquiries and reservations.
              </p>
            </div>

            <a 
              href="tel:+917012761588" 
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm transition-all shadow-md active:scale-95"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              Call +91 7012 761 588
            </a>
          </div>

        </div>

        {/* Host Profile Info Card */}
        <div className="rounded-3xl border border-slate-200 p-8 bg-white shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-sky-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                ZH
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  Hosted by Abhijith
                  <ShieldCheck className="w-4 h-4 text-orange-500" />
                </h3>
                <p className="text-xs text-slate-500 font-semibold">Superhost · 5 Years Hosting on Punnamada Lake</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-700 font-bold">
              <div>
                <span className="text-sm font-black text-slate-900 block">48</span>
                <span className="text-slate-500">Reviews</span>
              </div>
              <div>
                <span className="text-sm font-black text-orange-600 block">4.98 ★</span>
                <span className="text-slate-500">Rating</span>
              </div>
              <div>
                <span className="text-sm font-black text-sky-600 block">&lt; 5 min</span>
                <span className="text-slate-500">Response</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700 font-medium">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 mb-0.5 font-bold">Location & Meeting Point</strong>
                <span>Near Nehru Trophy Boat Race Finishing Point, Punnamada Lake, Alleppey, Kerala 688006</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 mb-0.5 font-bold">Email</strong>
                <span>hello@zenhomestay.in</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-xs text-slate-400 text-center space-y-2">
        <p>© {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
        <div className="flex justify-center items-center gap-4 text-slate-500 font-medium">
          <Link href="/" className="hover:underline hover:text-slate-400">Home</Link>
          <span>·</span>
          <Link href="/terms" className="hover:underline hover:text-slate-400">Terms & Conditions</Link>
          <span>·</span>
          <Link href="/terms" className="hover:underline hover:text-slate-400">House Guidelines</Link>
        </div>
      </footer>

    </div>
  );
}
