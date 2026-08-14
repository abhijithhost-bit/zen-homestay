import Image from 'next/image';
import { Wifi, Wind, Utensils, Ship, Leaf, Clock, MessageCircle, MapPin, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Sticky Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="font-bold text-2xl tracking-tight text-emerald-950">Zen Homestay</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#experience" className="text-neutral-600 hover:text-emerald-600 font-medium transition-colors">Experience</a>
              <a href="#rooms" className="text-neutral-600 hover:text-emerald-600 font-medium transition-colors">Rooms</a>
              <a href="#amenities" className="text-neutral-600 hover:text-emerald-600 font-medium transition-colors">Amenities</a>
            </div>
            <div>
              <a href="#book" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 active:scale-95">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/kerala_backwaters_hero_1786702183985.jpg"
            alt="Kerala Backwaters"
            fill
            className="object-cover object-center transform scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wider mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
            ALLEPPEY, KERALA
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            Discover Authentic <br className="hidden md:block" /> Backwater Serenity
          </h1>
          <p className="text-lg md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light drop-shadow opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Escape to our heritage homestay where traditional Kerala architecture meets modern luxury on the tranquil waters of Alleppey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <a href="#rooms" className="bg-white text-emerald-900 hover:bg-neutral-100 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl hover:shadow-2xl active:scale-95 w-full sm:w-auto">
              View Our Rooms
            </a>
            <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all w-full sm:w-auto">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src="/kerala_balcony_view_1786702364116.jpg"
                  alt="Balcony View"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-neutral-100">
                <div className="flex gap-1 mb-2 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-neutral-600 italic">"A slice of paradise! The waterfront views and hospitality were unmatched."</p>
                <p className="font-semibold text-emerald-900 mt-2">- Sarah J.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-3 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-emerald-600"></span>
                The Experience
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-6 leading-tight">
                Embrace the Rhythm <br /> of the Backwaters
              </h3>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                Nestled on the banks of Vembanad Lake, Zen Homestay offers a rare glimpse into the traditional lifestyle of Kerala. Wake up to the gentle lapping of water, the songs of exotic birds, and the sight of local fishermen gliding by on wooden canoes.
              </p>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Our property is built using ancient architectural principles, featuring intricate woodwork, airy courtyards, and expansive verandas that invite the cool lake breeze.
              </p>
              <ul className="space-y-4 mb-10">
                {['Authentic Kerala Heritage Architecture', 'Direct Waterfront Access & Views', 'Locally Sourced Organic Dining', 'Guided Village Walks'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-neutral-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#rooms" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2 group">
                Discover More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-3">Our Accommodations</h2>
            <h3 className="text-4xl font-bold text-emerald-950 mb-6">Where Heritage Meets Comfort</h3>
            <p className="text-lg text-neutral-600">
              Each room is meticulously designed to reflect the rich cultural heritage of Kerala while providing modern luxuries for a restful stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Room 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/kerala_heritage_room_1786702263227.jpg"
                  alt="Heritage Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-emerald-900 font-semibold text-sm">
                  From ₹4,500/night
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold text-emerald-950 mb-2">The Heritage Suite</h4>
                <p className="text-neutral-600 mb-6">Featuring classic dark wood furnishings, a four-poster bed, and large windows with panoramic views of the tranquil backwaters.</p>
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8 border-b border-neutral-100 pb-6">
                  <span className="flex items-center gap-1"><Wind className="w-4 h-4" /> A/C</span>
                  <span className="flex items-center gap-1"><Wifi className="w-4 h-4" /> Free WiFi</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Lake View</span>
                </div>
                <a href="#book" className="block text-center w-full py-3 rounded-xl border-2 border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
                  Reserve Room
                </a>
              </div>
            </div>

            {/* Room 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/kerala_balcony_view_1786702364116.jpg"
                  alt="Lake View Balcony Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-emerald-900 font-semibold text-sm">
                  From ₹5,500/night
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-bold text-emerald-950 mb-2">Lakefront Balcony Room</h4>
                <p className="text-neutral-600 mb-6">Step out onto your private traditional wooden balcony. Perfect for morning tea while watching the mist rise off the waters.</p>
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8 border-b border-neutral-100 pb-6">
                  <span className="flex items-center gap-1"><Wind className="w-4 h-4" /> A/C</span>
                  <span className="flex items-center gap-1"><Wifi className="w-4 h-4" /> Free WiFi</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Balcony</span>
                </div>
                <a href="#book" className="block text-center w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
                  Reserve Room
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-3">Homestay Amenities</h2>
            <h3 className="text-4xl font-bold mb-6">Everything You Need for a Perfect Stay</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { icon: <Wifi className="w-8 h-8 mb-4" />, title: 'Free High-Speed Wi-Fi' },
              { icon: <Wind className="w-8 h-8 mb-4" />, title: 'Air Conditioned Rooms' },
              { icon: <Utensils className="w-8 h-8 mb-4" />, title: 'Authentic Kerala Cuisine' },
              { icon: <Ship className="w-8 h-8 mb-4" />, title: 'Houseboat Tours' },
              { icon: <Leaf className="w-8 h-8 mb-4" />, title: 'Ayurvedic Spa' },
              { icon: <Clock className="w-8 h-8 mb-4" />, title: '24/7 Room Service' },
            ].map((amenity, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-emerald-500/50 group">
                <div className="text-emerald-400 group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-300">
                  {amenity.icon}
                </div>
                <h4 className="font-medium text-emerald-50">{amenity.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct WhatsApp CTA */}
      <section id="book" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-emerald-950 mb-6">Ready for your Kerala Getaway?</h2>
          <p className="text-lg text-neutral-600 mb-10">
            Book directly with us via WhatsApp for the best rates, personalized service, and instant confirmation.
          </p>
          <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 active:scale-95 hover:-translate-y-1">
            <MessageCircle className="w-7 h-7" />
            Book via WhatsApp Now
          </a>
          <p className="mt-6 text-sm text-neutral-500">We typically reply within 5 minutes.</p>
        </div>
      </section>

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
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#rooms" className="hover:text-emerald-400 transition-colors">Our Rooms</a></li>
              <li><a href="#experience" className="hover:text-emerald-400 transition-colors">Experiences</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/917012761588" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-colors z-50 animate-bounce">
        <MessageCircle className="w-8 h-8" />
        <span className="sr-only">Contact us on WhatsApp</span>
      </a>
    </div>
  );
}
