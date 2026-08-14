import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Phone, 
  MessageCircle,
  Award,
  CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | Zen Homestay Alleppey",
  description: "Privacy policy, data protection, and guest confidentiality guidelines for Zen Homestay on Punnamada Lake, Alleppey.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
      
      {/* Modern Luxury Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] transition-all w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-500 via-sky-600 to-orange-500 flex items-center justify-center text-white shadow-md sm:shadow-lg shadow-sky-500/20 ring-2 sm:ring-4 ring-sky-50 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-xl tracking-tight text-slate-900 leading-none group-hover:text-sky-600 transition-colors truncate">
                  Zen Homestay
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-200/80 shrink-0">
                  <Award className="w-3.5 h-3.5 text-orange-500" /> Superhost
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-bold text-sky-600 tracking-wider uppercase mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span className="truncate">Punnamada Lake · Alleppey</span>
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link 
              href="/" 
              className="text-xs font-extrabold text-slate-700 hover:text-orange-600 hover:bg-orange-50 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all border border-slate-200 shadow-sm active:scale-95 flex items-center gap-1.5"
            >
              ← Back to Listing
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        
        {/* Header Title */}
        <div className="mb-10 text-center sm:text-left border-b border-slate-200 pb-8">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-100 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Guest Privacy & Data Confidentiality
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
            At Zen Homestay Alleppey, we respect your personal privacy. We collect only the essential information needed to confirm your reservation and ensure a comfortable waterfront stay.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          
          {/* Section 1: Information We Collect */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Eye className="w-5 h-5" />
              </div>
              <h2>1. Information We Collect</h2>
            </div>
            <p className="text-slate-600">
              When you inquire or book a stay at Zen Homestay, we may collect the following details:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li><strong>Contact Information:</strong> Full name, WhatsApp phone number, and email address.</li>
              <li><strong>Stay Details:</strong> Preferred check-in and checkout dates, number of rooms, and number of guests.</li>
              <li><strong>Government Identification:</strong> As required by the Ministry of Tourism and Kerala state regulations, all adult guests must present valid government photo ID (Aadhaar, Passport, or Driving License) upon check-in.</li>
              <li><strong>Dietary & Arrival Preferences:</strong> Special dietary requirements for your authentic Kerala breakfast and arrival time at Nehru Trophy Finishing Point for speed boat coordination.</li>
            </ul>
          </div>

          {/* Section 2: How We Use Your Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h2>2. How We Use Your Information</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li>To confirm your room reservations and process your direct host guaranteed rates.</li>
              <li>To coordinate your complimentary 5-minute speed boat pickup from the boat race finishing point straight to our private docks.</li>
              <li>To provide customer support and personalized Kerala hospitality before and during your stay.</li>
              <li>To comply with mandatory local government homestay guest registration requirements (Form C for international travelers and local register for domestic guests).</li>
            </ul>
          </div>

          {/* Section 3: Third-Party Disclosure & Zero Spam */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <Lock className="w-5 h-5" />
              </div>
              <h2>3. Confidentiality & Zero Marketing Spam</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li><strong>No Data Selling:</strong> We do NOT sell, rent, trade, or share your contact details or personal information with any third-party advertisers or marketing agencies.</li>
              <li><strong>Direct Host Communication:</strong> Your WhatsApp number and phone number are used strictly for stay-related updates, boat pickup coordination, and emergency contact.</li>
              <li><strong>No Marketing Spam:</strong> You will never receive unsolicited marketing spam or promotional broadcasts from us.</li>
            </ul>
          </div>

          {/* Section 4: Data Security & ID Storage */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2>4. Data Security & Storage</h2>
            </div>
            <p className="text-slate-600">
              We implement appropriate physical and electronic security practices to protect your information against unauthorized access or disclosure:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
              <li>Physical guest register books and digital records are stored securely on property under host supervision.</li>
              <li>We do not store sensitive payment card details; direct payments are verified securely via bank transfer or direct UPI.</li>
              <li>Guest information is retained only for the duration required by local hospitality laws.</li>
            </ul>
          </div>

          {/* Section 5: Your Rights & Host Contact */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-3 text-slate-900 font-bold text-lg mb-1">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <Phone className="w-5 h-5" />
              </div>
              <h2>5. Inquiries & Updates</h2>
            </div>
            <p className="text-slate-600">
              If you have any questions about how your personal details are handled or wish to update or remove your contact information from our guest records after your stay, you can reach out directly to host Abhijith.
            </p>
          </div>

          {/* Need Help Card */}
          <div className="bg-gradient-to-r from-sky-50 via-sky-50/50 to-orange-50 rounded-3xl p-8 border border-slate-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Questions about our privacy practices?</h3>
              <p className="text-slate-600 text-sm mt-1">Host Abhijith is available to assist you with any questions or requests.</p>
            </div>
            <a 
              href="https://wa.me/917012761588" 
              target="_blank" 
              rel="noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-orange-500/20 active:scale-95 shrink-0 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              WhatsApp Us: +91 7012 761 588
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-xs text-slate-400 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/terms-and-conditions" className="hover:underline hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:underline hover:text-white transition-colors text-slate-200 font-bold">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:underline hover:text-white transition-colors">
              Contact Host
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
