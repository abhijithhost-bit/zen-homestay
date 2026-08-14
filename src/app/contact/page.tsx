import Link from 'next/link';
import { Leaf, MessageCircle, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
      {/* Navigation */}
      <nav className="w-full z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="font-bold text-2xl tracking-tight text-emerald-950">Zen Homestay</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/#experience" className="text-neutral-600 hover:text-emerald-600 font-medium transition-colors">Experience</Link>
              <Link href="/#rooms" className="text-neutral-600 hover:text-emerald-600 font-medium transition-colors">Rooms</Link>
              <Link href="/#amenities" className="text-neutral-600 hover:text-emerald-600 font-medium transition-colors">Amenities</Link>
            </div>
            <div>
              <Link href="/contact" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-4 tracking-tight">Get in Touch</h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about booking, our amenities, or want to plan a custom Kerala experience, feel free to reach out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Options */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-neutral-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-950 mb-2">WhatsApp Us</h2>
              <p className="text-neutral-600 mb-8">
                Fastest way to reach us. We typically reply within a few minutes.
              </p>
              <a 
                href="https://wa.me/917012761588" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:-translate-y-1"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-neutral-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <PhoneCall className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-950 mb-2">Call Us</h2>
              <p className="text-neutral-600 mb-8">
                Prefer speaking to someone directly? Give us a call anytime.
              </p>
              <a 
                href="tel:+917012761588" 
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:-translate-y-1"
              >
                <PhoneCall className="w-6 h-6" />
                +91 7012 761 588
              </a>
            </div>
          </div>

          {/* Other Details */}
          <div className="mt-16 bg-white rounded-3xl shadow-md border border-neutral-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
              <div className="p-8 flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-emerald-950 mb-1">Our Location</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Punnamada Lake Road<br/>
                    Alleppey, Kerala 688006<br/>
                    India
                  </p>
                </div>
              </div>
              <div className="p-8 flex items-start gap-4">
                <Mail className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-emerald-950 mb-1">Email Us</h3>
                  <p className="text-neutral-600">
                    <a href="mailto:hello@zenhomestay.in" className="hover:text-emerald-600 transition-colors">
                      hello@zenhomestay.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-emerald-500" />
              <span className="font-bold text-xl text-white">Zen Homestay</span>
            </div>
            <p className="max-w-xs text-sm">Authentic backwater living in the heart of Alleppey, Kerala. Your peaceful retreat awaits.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-sm space-y-2">
              <p>Punnamada Lake Road</p>
              <p>Alleppey, Kerala 688006</p>
              <p>Phone: +91 7012 761 588</p>
              <p>Email: hello@zenhomestay.in</p>
            </address>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/#rooms" className="hover:text-emerald-400 transition-colors">Our Rooms</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
