"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Calendar,
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
  ChevronLeft,
  ChevronRight,
  X,
  Compass,
  Sun,
  HelpCircle,
  Plus,
  Minus,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [mobileSlideIdx, setMobileSlideIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  // Scroll detection for header animation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard navigation & body scroll lock for Gallery Modal
  useEffect(() => {
    if (!showGallery) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowGallery(false);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showGallery]);

  // Interactive Guest & Room Counters
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  // Date State for Interactive Date Picker
  const getInitialDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [checkIn, setCheckIn] = useState(() => getInitialDate(1));
  const [checkOut, setCheckOut] = useState(() => getInitialDate(2));

  // Compute nights
  const calculateNights = (inDateStr: string, outDateStr: string) => {
    try {
      if (!inDateStr || !outDateStr) return 1;
      const [y1, m1, d1] = inDateStr.split('-').map(Number);
      const [y2, m2, d2] = outDateStr.split('-').map(Number);
      const date1 = new Date(y1, m1 - 1, d1);
      const date2 = new Date(y2, m2 - 1, d2);
      const diffTime = date2.getTime() - date1.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const nights = calculateNights(checkIn, checkOut);
  const totalPrice = rooms * 3000 * nights;

  // Visual Interactive Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [activeDateStep, setActiveDateStep] = useState<'checkIn' | 'checkOut'>('checkIn');

  // Month navigation
  const prevMonth = () => {
    setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Calendar Day Generation
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateCellClick = (year: number, month: number, day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const selectedDate = new Date(year, month, day);
    
    if (activeDateStep === 'checkIn') {
      setCheckIn(dateStr);
      const [oy, om, od] = checkOut.split('-').map(Number);
      const outD = new Date(oy, om - 1, od);
      if (outD <= selectedDate || isNaN(outD.getTime())) {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const ny = nextDay.getFullYear();
        const nm = String(nextDay.getMonth() + 1).padStart(2, '0');
        const nd = String(nextDay.getDate()).padStart(2, '0');
        setCheckOut(`${ny}-${nm}-${nd}`);
      }
      setActiveDateStep('checkOut');
    } else {
      const [iy, im, id] = checkIn.split('-').map(Number);
      const inDate = new Date(iy, im - 1, id);

      if (selectedDate <= inDate) {
        setCheckIn(dateStr);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const ny = nextDay.getFullYear();
        const nm = String(nextDay.getMonth() + 1).padStart(2, '0');
        const nd = String(nextDay.getDate()).padStart(2, '0');
        setCheckOut(`${ny}-${nm}-${nd}`);
        setActiveDateStep('checkOut');
      } else {
        setCheckOut(dateStr);
        setShowCalendar(false);
      }
    }
  };

  const applyPreset = (presetNights: number, offsetDays = 1) => {
    const inD = new Date();
    inD.setDate(inD.getDate() + offsetDays);
    const outD = new Date(inD);
    outD.setDate(outD.getDate() + presetNights);

    const inStr = `${inD.getFullYear()}-${String(inD.getMonth() + 1).padStart(2, '0')}-${String(inD.getDate()).padStart(2, '0')}`;
    const outStr = `${outD.getFullYear()}-${String(outD.getMonth() + 1).padStart(2, '0')}-${String(outD.getDate()).padStart(2, '0')}`;

    setCheckIn(inStr);
    setCheckOut(outStr);
    setShowCalendar(false);
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const formattedCheckIn = formatDisplayDate(checkIn);
  const formattedCheckOut = formatDisplayDate(checkOut);

  const handleRoomChange = (delta: number) => {
    setRooms((prev) => Math.min(2, Math.max(1, prev + delta)));
  };

  const handleGuestChange = (delta: number) => {
    setGuests((prev) => {
      const maxGuests = rooms * 3;
      return Math.min(maxGuests, Math.max(1, prev + delta));
    });
  };

  useEffect(() => {
    setGuests((prev) => Math.min(rooms * 3, Math.max(1, prev)));
  }, [rooms]);

  useEffect(() => {
    if (showCalendar || showGallery) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showCalendar, showGallery]);

  const whatsappBookingUrl = `https://wa.me/917012761588?text=${encodeURIComponent(
    `Hi Abhijith, I would like to inquire about booking Zen Homestay for ${guests} guest${guests > 1 ? 's' : ''} (${rooms} Lake View Room${rooms > 1 ? 's' : ''}) from ${formattedCheckIn} to ${formattedCheckOut} (${nights} night${nights > 1 ? 's' : ''}). Total estimated: ₹${totalPrice.toLocaleString('en-IN')}. Please let me know the availability!`
  )}`;

  const images = [
    {
      src: '/kerala_backwaters_hero_1786702183985.jpg',
      alt: 'Punnamada Lake View - Zen Homestay Alleppey',
      title: 'Panoramic Punnamada Lake Waterfront',
      tag: 'Waterfront Living'
    },
    {
      src: '/kerala_heritage_room_1786702263227.jpg',
      alt: 'Lake View Premium Room - Zen Homestay',
      title: 'Lake View Premium Heritage Bedroom',
      tag: 'Bedroom & Suite'
    },
    {
      src: '/kerala_boat_arrival_1786708991444.jpg',
      alt: 'Complimentary Speedboat Transfer Alleppey',
      title: 'Private 5-Minute Speedboat Arrival Experience',
      tag: 'Boat Transfer'
    },
    {
      src: '/kerala_lake_dining_1786708655762.jpg',
      alt: 'Authentic Kerala Lakeside Breakfast',
      title: 'Fresh Authentic Kerala Breakfast by the Water',
      tag: 'Dining & Food'
    },
    {
      src: '/kerala_balcony_view_1786702364116.jpg',
      alt: 'Private Veranda over Punnamada Lake',
      title: 'Private Wooden Veranda Overlooking the Lake',
      tag: 'Veranda & Patio'
    }
  ];

  const faqs = [
    {
      q: "What makes Zen Homestay the best alleppey homestay?",
      a: "Zen Homestay is rated the best alleppey homestay because it sits directly on the banks of Punnamada Lake with zero road access. Guests enjoy unmatched privacy, waking up to uninterrupted water views, authentic home-cooked Kerala cuisine, complimentary speedboat pickup, and personalized 5-star hospitality from host Abhijith — all at direct-host rates with no booking commissions."
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

  const renderBookingCard = () => (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4 sm:space-y-5">

      {/* Urgency / Scarcity Banner */}
      <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-2xl px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-red-500" />
          </span>
          <span className="text-[11px] font-extrabold text-red-700">Only 2 rooms · Fills fast</span>
        </div>
        <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-200">🔥 High demand</span>
      </div>

      {/* Special Offer Header Pill */}
      <div className="bg-orange-500 text-white text-[11px] font-extrabold py-1.5 px-3 rounded-full text-center tracking-wider uppercase shadow-sm">
        Direct Host Guaranteed Rate
      </div>

      {/* Price & Rating Header */}
      <div className="flex items-baseline justify-between pt-0.5">
        <div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
          <span className="text-slate-500 font-bold text-xs sm:text-sm">
            {' '}/ {nights} {nights === 1 ? 'night' : 'nights'} ({rooms} {rooms === 1 ? 'room' : 'rooms'})
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
          <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span>4.98</span>
          <span className="text-slate-500 font-normal">(48)</span>
        </div>
      </div>

      {/* Interactive Booking Box: Check-in, Check-out, Rooms Counter, Guests Counter */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 bg-slate-50/70 text-xs font-medium">

        {/* Date Picker Row - Triggers Visual Calendar Modal or Direct Date Selection */}
        <div className="grid grid-cols-2 divide-x divide-slate-200 bg-white">

          {/* Check-in Trigger Box */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setActiveDateStep('checkIn');
              setShowCalendar(true);
            }}
            className="p-3 sm:p-3.5 hover:bg-slate-50 transition-colors text-left block w-full group cursor-pointer touch-manipulation select-none"
          >
            <div className="flex items-center justify-between mb-1 pointer-events-none">
              <span className="font-extrabold uppercase text-[10px] text-slate-500 tracking-wider">
                Check-in
              </span>
              <Calendar className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-slate-900 font-black text-xs sm:text-sm truncate pointer-events-none">
              {formattedCheckIn || 'Select Date'}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 pointer-events-none">2:00 PM Check-in</span>
          </button>

          {/* Checkout Trigger Box */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setActiveDateStep('checkOut');
              setShowCalendar(true);
            }}
            className="p-3 sm:p-3.5 hover:bg-slate-50 transition-colors text-left block w-full group cursor-pointer touch-manipulation select-none"
          >
            <div className="flex items-center justify-between mb-1 pointer-events-none">
              <span className="font-extrabold uppercase text-[10px] text-slate-500 tracking-wider">
                Checkout
              </span>
              <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                {nights} {nights === 1 ? 'night' : 'nights'}
              </span>
            </div>
            <div className="text-slate-900 font-black text-xs sm:text-sm truncate pointer-events-none">
              {formattedCheckOut || 'Select Date'}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5 pointer-events-none">11:00 AM Checkout</span>
          </button>

        </div>

        {/* Quick Night Selection Chips directly inside the card */}
        <div className="p-2.5 bg-slate-50/80 flex items-center justify-between gap-1.5 overflow-x-auto text-[11px] font-bold">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 shrink-0">Stay:</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => applyPreset(1, 0)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer touch-manipulation ${nights === 1
                ? 'bg-orange-500 text-white border-orange-500 shadow-sm font-extrabold'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'
                }`}
            >
              1 Night
            </button>
            <button
              type="button"
              onClick={() => applyPreset(2, 0)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer touch-manipulation ${nights === 2
                ? 'bg-orange-500 text-white border-orange-500 shadow-sm font-extrabold'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'
                }`}
            >
              2 Nights
            </button>
            <button
              type="button"
              onClick={() => applyPreset(3, 0)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer touch-manipulation ${nights === 3
                ? 'bg-orange-500 text-white border-orange-500 shadow-sm font-extrabold'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'
                }`}
            >
              3 Nights
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveDateStep('checkIn');
                setShowCalendar(true);
              }}
              className="px-2 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 font-extrabold hover:bg-sky-100 transition-all cursor-pointer touch-manipulation flex items-center gap-1"
            >
              <span>📅 Calendar</span>
            </button>
          </div>
        </div>

        {/* Rooms Counter */}
        <div className="p-3.5 flex items-center justify-between bg-white">
          <div>
            <span className="font-extrabold uppercase text-[10px] text-slate-500 block">Rooms</span>
            <span className="text-slate-900 font-bold text-xs sm:text-sm">
              {rooms} {rooms === 1 ? 'Room' : 'Rooms'} <span className="text-slate-400 font-normal text-xs">(₹3,000/room)</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 touch-manipulation">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleRoomChange(-1);
              }}
              disabled={rooms <= 1}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-400 disabled:opacity-25 disabled:cursor-not-allowed text-base font-black bg-slate-50 hover:bg-white transition-all active:scale-90 cursor-pointer touch-manipulation select-none shadow-sm"
              aria-label="Decrease rooms"
            >
              <Minus className="w-4 h-4 pointer-events-none stroke-[3]" />
            </button>
            <span className="font-black text-base sm:text-sm w-5 text-center text-slate-900 select-none">{rooms}</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleRoomChange(1);
              }}
              disabled={rooms >= 2}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-400 disabled:opacity-25 disabled:cursor-not-allowed text-base font-black bg-slate-50 hover:bg-white transition-all active:scale-90 cursor-pointer touch-manipulation select-none shadow-sm"
              aria-label="Increase rooms"
            >
              <Plus className="w-4 h-4 pointer-events-none stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Guests Counter */}
        <div className="p-3.5 flex items-center justify-between bg-white">
          <div>
            <span className="font-extrabold uppercase text-[10px] text-slate-500 block">Guests</span>
            <span className="text-slate-900 font-bold text-xs sm:text-sm">
              {guests} {guests === 1 ? 'Guest' : 'Guests'} <span className="text-slate-400 font-normal text-xs">(Max {rooms * 3})</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5 touch-manipulation">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleGuestChange(-1);
              }}
              disabled={guests <= 1}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-400 disabled:opacity-25 disabled:cursor-not-allowed text-base font-black bg-slate-50 hover:bg-white transition-all active:scale-90 cursor-pointer touch-manipulation select-none shadow-sm"
              aria-label="Decrease guests"
            >
              <Minus className="w-4 h-4 pointer-events-none stroke-[3]" />
            </button>
            <span className="font-black text-base sm:text-sm w-5 text-center text-slate-900 select-none">{guests}</span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleGuestChange(1);
              }}
              disabled={guests >= rooms * 3}
              className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:border-slate-400 disabled:opacity-25 disabled:cursor-not-allowed text-base font-black bg-slate-50 hover:bg-white transition-all active:scale-90 cursor-pointer touch-manipulation select-none shadow-sm"
              aria-label="Increase guests"
            >
              <Plus className="w-4 h-4 pointer-events-none stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Breakdown Calculation */}
        <div className="p-2.5 sm:p-3 bg-sky-50 text-sky-900 font-bold flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 truncate pr-2">
            <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="truncate">₹3,000 × {rooms} room{rooms > 1 ? 's' : ''} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
          </div>
          <span className="text-orange-600 font-black shrink-0">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* High-Conversion Action Buttons with Dynamic WhatsApp Pre-filled text */}
      <div className="space-y-2.5 pt-1">
        <a
          href={whatsappBookingUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base tracking-wide transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-[0.98]"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          Reserve via WhatsApp
        </a>

        <a
          href="tel:+917012761588"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98] relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          <span className="relative flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full ring-1 ring-white/30">
              <Phone className="w-3 h-3 fill-current" />
            </span>
            <span className="font-bold">Call Host · +91 7012 761 588</span>
          </span>
        </a>
      </div>

      <div className="text-center">
        <p className="text-[11px] text-slate-500 font-semibold">
          Zero booking commission · Instant response in &lt; 5 mins
        </p>
      </div>

      {/* Verified Guarantees */}
      <div className="border-t border-slate-100 pt-3.5 space-y-2 text-[11px] sm:text-xs text-slate-600 font-semibold">
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

      {/* Host Profile Card — Fix #3 */}
      <div className="border-t border-slate-100 pt-3.5">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 via-sky-500 to-orange-500 flex items-center justify-center text-white font-black text-base shadow-md">
              A
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-slate-900 text-sm leading-tight">Abhijith · Your Host</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Responds in &lt; 5 mins · English, Malayalam</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-orange-500 text-[11px]">★★★★★</span>
              <span className="text-[11px] font-bold text-slate-700">4.98</span>
              <span className="text-[11px] text-slate-400">(48 reviews)</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900 pb-20 md:pb-0">

      {/* Sticky Navigation Header — morphs on scroll */}
      <header
        className="sticky top-0 z-50 w-full transition-all duration-500 ease-in-out"
        style={scrolled ? { padding: '10px 16px' } : {}}
      >
        {/* Ultra-thin accent line — hidden when scrolled */}
        <div
          className="h-[3px] bg-gradient-to-r from-sky-500 via-orange-400 to-sky-500 transition-all duration-500"
          style={scrolled ? { height: 0 } : {}}
        />

        <div
          className="transition-all duration-500 ease-in-out"
          style={scrolled
            ? {
                background: 'rgba(15,23,42,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '9999px',
                boxShadow: '0 8px 40px -8px rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.08)',
                maxWidth: '1050px',
                margin: '0 auto',
              }
            : {
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(203,213,225,0.7)',
                boxShadow: '0 4px 30px -5px rgba(0,0,0,0.08)',
              }
          }
        >
          <div
            className="transition-all duration-500 ease-in-out flex items-center justify-between"
            style={scrolled
              ? { padding: '6px 18px', gap: '10px' }
              : { maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', height: '72px', gap: '16px' }
            }
          >

            {/* Brand Logo & Superhost Badge */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink min-w-0">
              <div className="relative shrink-0">
                <div
                  className="rounded-xl bg-gradient-to-tr from-sky-500 via-sky-600 to-orange-500 flex items-center justify-center text-white shadow-md transition-all duration-500"
                  style={scrolled
                    ? { width: '30px', height: '30px', boxShadow: '0 0 0 2px rgba(255,255,255,0.15)' }
                    : { width: '44px', height: '44px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(14,165,233,0.25)', outline: '3px solid rgb(224,242,254)' }
                  }
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                {/* Live green dot */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 border-2 rounded-full transition-all duration-500"
                  style={scrolled
                    ? { width: '8px', height: '8px', borderColor: 'rgb(15,23,42)' }
                    : { width: '10px', height: '10px', borderColor: 'white' }
                  }
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className="font-extrabold tracking-tight leading-none transition-all duration-500 truncate"
                  style={scrolled ? { color: 'white', fontSize: '15px' } : { color: 'rgb(15,23,42)', fontSize: '19px' }}
                >
                  Zen Homestay
                </span>
                <span
                  className="font-bold tracking-wider uppercase flex items-center gap-1 truncate transition-all duration-500"
                  style={scrolled
                    ? { color: 'rgb(125,211,252)', fontSize: '9px', marginTop: '1px' }
                    : { color: 'rgb(2,132,199)', fontSize: '11px', marginTop: '3px' }
                  }
                >
                  <span className="truncate">Punnamada Lake · Alleppey, Kerala</span>
                </span>
              </div>
            </Link>

            {/* Centre Nav — desktop only */}
            <nav
              className="hidden lg:flex items-center rounded-full p-1 text-xs font-bold gap-0.5 transition-all duration-500"
              style={scrolled
                ? { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }
                : { background: 'rgba(241,245,249,0.9)', border: '1px solid rgba(203,213,225,0.8)', boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.05)' }
              }
            >
              {[
                { href: '#arrival', label: 'Arrival Route' },
                { href: '#stay', label: 'Lakefront Rooms' },
                { href: '#amenities', label: 'Amenities' },
                { href: '#how-to-book', label: 'How to Book' },
                { href: '#faq', label: 'FAQs' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="px-3.5 py-1.5 rounded-full transition-all duration-200 relative group whitespace-nowrap"
                  style={scrolled
                    ? { color: 'rgba(255,255,255,0.8)' }
                    : { color: 'rgb(71,85,105)' }
                  }
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = scrolled ? 'rgba(255,255,255,0.12)' : 'white';
                    (e.currentTarget as HTMLElement).style.color = scrolled ? 'white' : 'rgb(15,23,42)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = scrolled ? 'rgba(255,255,255,0.8)' : 'rgb(71,85,105)';
                  }}
                >
                  {label}
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-[2px] bg-orange-400 rounded-full transition-all duration-200" />
                </a>
              ))}
              <div
                className="h-3.5 w-px mx-1"
                style={scrolled ? { background: 'rgba(255,255,255,0.15)' } : { background: 'rgb(203,213,225)' }}
              />
              <div
                className="flex items-center gap-1.5 px-3 py-0.5 text-[11px] font-extrabold"
                style={scrolled ? { color: 'rgb(251,146,60)' } : { color: 'rgb(234,88,12)' }}
              >
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-orange-500" />
                </span>
                Direct Host Rates
              </div>
            </nav>

            {/* Right CTAs */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* WhatsApp — visible from sm */}
              <a
                href="https://wa.me/917012761588"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full transition-all duration-300 active:scale-95"
                style={scrolled
                  ? { background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }
                  : { background: 'rgb(240,253,244)', color: 'rgb(6,78,59)', border: '1px solid rgba(187,247,208,0.8)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }
                }
              >
                <MessageCircle
                  className="w-4 h-4"
                  style={scrolled ? { color: 'rgb(134,239,172)' } : { color: 'rgb(22,163,74)' }}
                />
                <span>WhatsApp</span>
              </a>

              {/* WhatsApp icon-only — mobile */}
              <a
                href="https://wa.me/917012761588"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full active:scale-95 transition-all"
                style={scrolled
                  ? { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }
                  : { background: 'rgb(240,253,244)', border: '1px solid rgba(187,247,208,0.8)' }
                }
              >
                <MessageCircle
                  className="w-4 h-4"
                  style={scrolled ? { color: 'rgb(134,239,172)' } : { color: 'rgb(22,163,74)' }}
                />
              </a>

              {/* Contact Host */}
              <Link
                href="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-md active:scale-95 flex items-center gap-1.5"
                style={scrolled
                  ? { boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }
                  : { boxShadow: '0 4px 12px rgba(249,115,22,0.25)' }
                }
              >
                <Phone className="w-3.5 h-3.5 hidden sm:block" />
                <span>Contact Host</span>
              </Link>
            </div>
          </div>
        </div>
      </header>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 w-full">

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

          {/* H1 optimized for focus keyword "alleppey homestay" */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Alleppey Homestay on Punnamada Lake — Zen Homestay
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-2 leading-relaxed">
            Wake up to direct views of Punnamada Lake at the best alleppey homestay. Exclusive waterfront retreat with complimentary speedboat transfer &amp; authentic Kerala breakfast.
          </p>
        </div>

        {/* Mobile Swipeable Photo Gallery */}
        <div className="md:hidden relative mb-6">
          {/* Swipe hint — fades out after 2s */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-[fadeOut_2s_ease-in-out_1s_forwards] flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            <svg className="w-3.5 h-3.5 animate-[bounceX_0.8s_ease-in-out_infinite_alternate]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <span>Swipe photos</span>
            <svg className="w-3.5 h-3.5 animate-[bounceX_0.8s_ease-in-out_infinite_alternate-reverse]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </div>

          {/* Scrollable strip */}
          <div
            className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full rounded-2xl"
            onScroll={(e) => {
              const el = e.currentTarget;
              const idx = Math.round(el.scrollLeft / el.offsetWidth);
              setMobileSlideIdx(idx);
            }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full shrink-0 aspect-[4/3] snap-center cursor-pointer"
                onClick={() => {
                  setActivePhotoIdx(idx);
                  setShowGallery(true);
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
                {/* Per-slide tag */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {img.tag}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar: dots + view-all badge */}
          <div className="flex items-center justify-between mt-2.5 px-1">
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`block rounded-full transition-all duration-300 ${mobileSlideIdx === idx
                    ? 'w-5 h-2 bg-orange-500'
                    : 'w-2 h-2 bg-slate-300'
                    }`}
                />
              ))}
            </div>
            {/* View all button */}
            <button
              onClick={() => {
                setActivePhotoIdx(0);
                setShowGallery(true);
              }}
              className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1.5 active:scale-95"
            >
              <span>📷</span> {mobileSlideIdx + 1} / {images.length} · View all
            </button>
          </div>
        </div>

        {/* Desktop Bento Grid Photo Gallery */}
        <div className="hidden md:grid grid-cols-4 gap-2.5 rounded-3xl overflow-hidden mb-12 relative shadow-md h-[520px] bg-slate-200">
          {/* Main Large Left Photo */}
          <div
            className="col-span-2 relative h-full group cursor-pointer overflow-hidden"
            onClick={() => {
              setActivePhotoIdx(0);
              setShowGallery(true);
            }}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent group-hover:opacity-0 transition-opacity" />
            <div className="absolute bottom-4 left-4 bg-slate-900/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
              {images[0].title}
            </div>
          </div>

          {/* Middle 2 Grid Photos */}
          <div className="grid grid-rows-2 gap-2.5 h-full">
            <div
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => {
                setActivePhotoIdx(1);
                setShowGallery(true);
              }}
            >
              <Image
                src={images[1].src}
                alt={images[1].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => {
                setActivePhotoIdx(2);
                setShowGallery(true);
              }}
            >
              <Image
                src={images[2].src}
                alt={images[2].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right 2 Grid Photos */}
          <div className="grid grid-rows-2 gap-2.5 h-full">
            <div
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => {
                setActivePhotoIdx(3);
                setShowGallery(true);
              }}
            >
              <Image
                src={images[3].src}
                alt={images[3].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div
              className="relative group cursor-pointer overflow-hidden"
              onClick={() => {
                setActivePhotoIdx(4);
                setShowGallery(true);
              }}
            >
              <Image
                src={images[4].src}
                alt={images[4].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* View All Photos Floating Badge */}
          <button
            onClick={() => {
              setActivePhotoIdx(0);
              setShowGallery(true);
            }}
            className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 border border-slate-200 px-4 py-2 rounded-xl text-xs font-extrabold shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 hover:text-orange-600"
          >
            <span>📷</span> Show all 5 photos
          </button>
        </div>

        {/* 2-Column High-Conversion Listing Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* LEFT COLUMN: Main Listing Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Host Details & Room Metrics */}
            <div className="flex items-center justify-between pb-8 border-b border-slate-200 bg-white p-6 rounded-3xl border shadow-sm">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Alleppey Homestay hosted by Abhijith — entire waterfront heritage property
                </h2>
                <p className="text-sm text-slate-600 font-semibold mt-1 flex items-center gap-2 flex-wrap">
                  <span className="bg-sky-50 text-sky-800 px-2.5 py-0.5 rounded-md font-bold">2 Lake View Bedrooms</span>
                  <span>·</span>
                  <span>Max 3 guests per room</span>
                  <span>·</span>
                  <span>2 King beds</span>
                  <span>·</span>
                  <span>Attached bathrooms</span>
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
            <div id="arrival" className="pb-8 border-b border-slate-200 scroll-mt-24">
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
            <div id="stay" className="pb-8 border-b border-slate-200 scroll-mt-24">
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

            {/* MOBILE ONLY: Booking Card displayed directly below Bedroom section */}
            <div id="booking-section" className="lg:hidden my-6 scroll-mt-24">
              {renderBookingCard()}
            </div>

            {/* WHAT THIS PLACE OFFERS (Amenities Grid) */}
            <div id="amenities" className="pb-8 border-b border-slate-200 bg-white p-8 rounded-3xl border shadow-sm scroll-mt-24">
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

            {/* HOW TO BOOK YOUR ROOM SECTION */}
            {/* OTA vs Direct Booking Price Comparison */}
            <div className="pb-8 border-b border-slate-200">
              <span className="text-xs font-extrabold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Why Book Direct?
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-3 mb-2">Save 20–25% vs Booking Platforms</h2>
              <p className="text-sm text-slate-600 mb-6 font-medium">
                OTA platforms add 15–25% commission on top of the room rate. Booking directly with Abhijith means you pay less and get more.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-slate-900 text-white text-xs">
                      <th className="px-4 py-3 font-bold rounded-tl-xl">What you get</th>
                      <th className="px-4 py-3 font-bold text-center">
                        <span className="inline-flex items-center gap-1">
                          <span className="text-sky-400">✦</span> Zen Homestay Direct
                        </span>
                      </th>
                      <th className="px-4 py-3 font-bold text-center text-slate-400 rounded-tr-xl">Airbnb / MakeMyTrip</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      ['Room rate (1 night, 1 room)', '₹3,000', '₹3,600–₹4,500'],
                      ['Platform service fee', '₹0', '₹400–₹800'],
                      ['Speedboat transfer', '✅ Free', '❌ Not included'],
                      ['Kerala breakfast', '✅ Included', '❌ Extra cost'],
                      ['Host response time', '< 5 mins', '24–48 hrs'],
                      ['Cancellation flexibility', '✅ Direct negotiation', '⚠️ Platform policy'],
                      ['Total effective saving', '₹1,000–₹2,300 saved', '—'],
                    ].map(([feature, direct, ota], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                        <td className="px-4 py-3 font-medium text-slate-700">{feature}</td>
                        <td className="px-4 py-3 text-center font-bold text-emerald-700 bg-emerald-50/60">{direct}</td>
                        <td className="px-4 py-3 text-center text-slate-500">{ota}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                <span className="text-emerald-600 text-lg">💸</span>
                <p className="text-sm font-bold text-emerald-800">
                  Most guests save <span className="text-emerald-600">₹1,000–₹2,300 per stay</span> by booking directly with Abhijith.
                </p>
              </div>
            </div>

            <div id="how-to-book" className="pb-8 border-b border-slate-200 scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-extrabold tracking-wider text-orange-600 uppercase bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Simple 4-Step Booking
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Zero Commission · Direct Host Rates
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">
                How to Book Your Room
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed font-normal">
                Reserve your lakefront stay directly with host Abhijith in under 2 minutes. Enjoy 100% transparent pricing with zero middleman commissions, instant confirmation, and complimentary speedboat transfer.
              </p>

              {/* 4 Step Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

                {/* Step 1 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                        01
                      </div>
                      <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                        <Calendar className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-1.5">
                      1. Select Dates &amp; Guests
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Choose your check-in &amp; check-out dates and guest count using our interactive reservation widget. Select 1 or 2 identical lakefront rooms (accommodates up to 3 guests per room).
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                      ₹3,000 / room / night
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const widget = document.getElementById('booking-section');
                        if (widget && window.innerWidth < 1024) {
                          widget.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="text-sky-600 font-bold hover:text-sky-700 inline-flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Select dates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                        02
                      </div>
                      <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-1.5">
                      2. Connect Directly with Host
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Tap <strong>Reserve via WhatsApp</strong> or call host Abhijith at <strong>+91 7012 761 588</strong>. Your requested dates, guests, and calculated direct pricing are pre-filled automatically.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Host replies in &lt; 5 mins
                    </span>
                    <a
                      href={whatsappBookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-600 font-bold hover:text-orange-700 inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Chat now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                        03
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-1.5">
                      3. Instant Confirmation &amp; 0% Fee
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Abhijith checks live availability and confirms your reservation immediately. Enjoy direct host transparent pricing with no OTA markups, service taxes, or hidden extras.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      Direct Host Guarantee
                    </span>
                    <span className="font-bold text-emerald-600">No Hidden Costs</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
                        04
                      </div>
                      <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                        <Anchor className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-1.5">
                      4. Free Boat Pickup &amp; Check-In
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Arrive at the Nehru Trophy Boat Race Finishing Point in Alleppey. Our team meets you with your complimentary private speed boat for a scenic 5-minute transfer right to our docks.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                      Free Speedboat Transfer
                    </span>
                    <span className="font-bold text-slate-500">Check-in: 2:00 PM</span>
                  </div>
                </div>

              </div>

              {/* Direct Booking Advantages Callout Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block mb-2">
                        Why Book Direct with Host Abhijith?
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        Best Rate &amp; VIP Backwater Hospitality Guaranteed
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <a
                        href={whatsappBookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all active:scale-95 group"
                      >
                        <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                        <span>Reserve on WhatsApp</span>
                      </a>
                      <a
                        href="tel:+917012761588"
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-95"
                      >
                        <Phone className="w-4 h-4 text-sky-400" />
                        <span>Call +91 7012 761 588</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Save 15-20% Commission</h4>
                        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                          No third-party online booking portal surcharges. Best direct host rates.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center shrink-0">
                        <Waves className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Free Speedboat Transfer</h4>
                        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                          Scenic 5-minute private speed boat pickup coordinated seamlessly with Abhijith.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Coffee className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Breakfast &amp; Custom Trips</h4>
                        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                          Fresh Kerala breakfast included, plus personalized Shikara ride arrangements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Backwater Lifestyle Experience */}
            <div className="pb-8 border-b border-slate-200">
              <span className="text-xs font-bold tracking-wider text-sky-700 uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                Authentic Kerala Living
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-3 mb-4">
                Why Guests Choose This Alleppey Homestay
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                <p>
                  Finding the right <strong>alleppey homestay</strong> makes all the difference. While many properties are located near busy town centers and noisy thoroughfares, Zen Homestay offers an oasis of pure serenity right on the world-famous waters of <strong>Punnamada Lake</strong>.
                </p>
                <p>
                  At this alleppey homestay, the rhythms of life move with the gentle water tides. You will see local canoe fishermen gliding past in the early morning fog, migratory birds perching on coconut fronds, and the mesmerizing reflection of the Kerala sunset dancing across the lake surface.
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

            {/* Things to Know & House Rules */}
            <div className="pb-8 border-b border-slate-200">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4">Things to Know</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">Check-in &amp; Checkout</h4>
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
                  <p className="leading-relaxed">Suitable for families &amp; couples</p>
                  <p className="leading-relaxed">Strict zero noise pollution zone</p>
                  <p className="leading-relaxed text-slate-500 mt-1">Dedicated on-site host care.</p>
                </div>
              </div>
            </div>

            {/* Google Reviews Section */}
            <div className="pb-8 border-b border-slate-200">

              {/* Google Reviews Header */}
              <div className="flex items-center gap-2 mb-5">
                {/* Google "G" logo SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-lg font-extrabold text-slate-900">Google Reviews</span>
              </div>

              {/* Aggregate Score Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-5xl font-black text-slate-900 leading-none">4.9</span>
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-4 h-4" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium mt-1">48 reviews</span>
                </div>

                {/* Star breakdown bars */}
                <div className="flex-1 w-full space-y-1.5">
                  {[
                    { stars: 5, count: 47, pct: 98 },
                    { stars: 4, count: 1, pct: 2 },
                    { stars: 3, count: 0, pct: 0 },
                    { stars: 2, count: 0, pct: 0 },
                    { stars: 1, count: 0, pct: 0 },
                  ].map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-2 text-xs">
                      <span className="text-slate-600 font-medium w-3 shrink-0">{stars}</span>
                      <svg className="w-3 h-3 shrink-0" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full bg-[#FBBC05]" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="text-xs text-slate-500 font-medium">Powered by</div>
                  <svg className="w-16" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                    <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
                    <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
                    <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
                    <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
                    <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
                    <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4" />
                  </svg>
                </div>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Review 1 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#4285F4] text-white font-bold flex items-center justify-center text-sm shrink-0">AM</div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 leading-tight">Arun Menon</p>
                        <p className="text-[11px] text-slate-400 font-medium">1 month ago</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">The speedboat ride from the finishing point set the tone immediately. Best <strong>alleppey homestay</strong> I&apos;ve ever stayed at — waking up to Punnamada Lake right outside the bedroom window was pure magic!</p>
                </div>

                {/* Review 2 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EA4335] text-white font-bold flex items-center justify-center text-sm shrink-0">LT</div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 leading-tight">Lakshmi Thomas</p>
                        <p className="text-[11px] text-slate-400 font-medium">2 weeks ago</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">Unmatched privacy at this <strong>homestay in Alleppey</strong>! No roads nearby means total silence and the most serene water views I&apos;ve experienced. Abhijith was an incredible, attentive host throughout.</p>
                </div>

                {/* Review 3 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#34A853] text-white font-bold flex items-center justify-center text-sm shrink-0">DV</div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 leading-tight">Divya Varghese</p>
                        <p className="text-[11px] text-slate-400 font-medium">3 weeks ago</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">We searched for the best <strong>waterfront homestay in Alleppey</strong> and Zen Homestay exceeded every expectation. The Kerala breakfast served by the lakeside was divine — Appam and stew tasted like a dream!</p>
                </div>

                {/* Review 4 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FBBC05] text-white font-bold flex items-center justify-center text-sm shrink-0">VN</div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 leading-tight">Vineeth Nair</p>
                        <p className="text-[11px] text-slate-400 font-medium">1 month ago</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">Stayed here for our anniversary and it was phenomenal. This <strong>Punnamada Lake homestay</strong> is unlike anything else in Alleppey — the direct lake view from bed, the wooden balcony, the morning breeze. Absolutely 5 stars.</p>
                </div>

                {/* Review 5 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#4285F4] text-white font-bold flex items-center justify-center text-sm shrink-0">AJ</div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 leading-tight">Anju Jacob</p>
                        <p className="text-[11px] text-slate-400 font-medium">2 months ago</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">If you&apos;re looking for a peaceful <strong>Kerala backwater homestay</strong>, stop searching — this is it. The speedboat pickup felt like arriving at a private island resort. Abhijith&apos;s hospitality is truly world-class.</p>
                </div>

                {/* Review 6 */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EA4335] text-white font-bold flex items-center justify-center text-sm shrink-0">SK</div>
                      <div>
                        <p className="font-bold text-sm text-slate-900 leading-tight">Siddharth Kumar</p>
                        <p className="text-[11px] text-slate-400 font-medium">2 months ago</p>
                      </div>
                    </div>
                    <svg className="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2.5">
                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#FBBC05"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">Traveled from Bangalore to experience Kerala&apos;s backwaters — this <strong>alleppey homestay on Punnamada Lake</strong> was the highlight of our entire trip. The authentic food, the silence, the lake... absolutely spectacular.</p>
                </div>

              </div>

              {/* "Powered by Google" footer link */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                <span>Reviews styled after Google Reviews · 48 verified guests</span>
              </div>

            </div>

            {/* Interactive FAQ Accordion */}
            <div id="faq" className="scroll-mt-24">
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
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'transform rotate-180 text-orange-600' : ''
                          }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: High-Conversion Sticky Soft Light-Blue & Orange Reserve Widget (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1 h-full">
            <div className="sticky top-24 z-30">
              {renderBookingCard()}
            </div>
          </div>

        </div>

      </main>

      {/* Premium Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs">

        {/* ── Premium CTA Band ── */}
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-t border-slate-800/80 py-14 sm:py-16 px-4">
          {/* Subtle ambient lighting glows for a luxury atmosphere */}
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-5">
            {/* Elegant luxury eyebrow tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Host · Zero Commission · Best Rates</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to wake up on{' '}
              <span className="bg-gradient-to-r from-sky-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Punnamada Lake?
              </span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Message Abhijith directly for personalized lakeside hospitality, live room availability, and instant confirmation — with zero middlemen or booking fees.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/917012761588"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold px-7 py-3.5 rounded-2xl shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/20 text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
              >
                <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Book on WhatsApp</span>
              </a>
              <a
                href="tel:+917012761588"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 backdrop-blur-md shadow-lg"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>+91 7012 761 588</span>
              </a>
            </div>

            {/* Micro Perks Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Instant response &lt; 5 mins
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Free Speedboat Pickup
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Complimentary Breakfast
              </span>
            </div>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/70">

            {/* Brand Column — 4 cols */}
            <div className="lg:col-span-4 space-y-5">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 via-sky-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-xl text-white tracking-tight block leading-tight">Zen Homestay</span>
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">Punnamada Lake · Alleppey</span>
                </div>
              </div>

              {/* Star rating strip */}
              <div className="flex items-center gap-2 bg-slate-900 rounded-xl px-4 py-3 border border-slate-800">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className="w-4 h-4" viewBox="0 0 20 20" fill="#FBBC05">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-black text-sm">4.98</span>
                <span className="text-slate-500 font-medium">· 48 Google reviews</span>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                An exclusive waterfront sanctuary on Punnamada Lake — accessible only by our complimentary 5-minute speedboat. Zero road noise, authentic Kerala cuisine, and attentive 5-star host care.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-900 text-sky-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                  <Anchor className="w-3 h-3" /> 5-Min Boat Pickup
                </span>
                <span className="bg-slate-900 text-orange-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                  <Award className="w-3 h-3" /> Superhost 4.98★
                </span>
                <span className="bg-slate-900 text-emerald-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3" /> 0% Commission
                </span>
                <span className="bg-slate-900 text-amber-400 border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                  <Coffee className="w-3 h-3" /> Breakfast Included
                </span>
              </div>
            </div>

            {/* Quick Links — 2 cols */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-extrabold text-white text-[11px] uppercase tracking-widest">Explore</h4>
              <ul className="space-y-2.5 font-medium">
                {[
                  { href: '#arrival', label: 'The Arrival Route' },
                  { href: '#stay', label: "Where You'll Sleep" },
                  { href: '#amenities', label: 'Property Amenities' },
                  { href: '#how-to-book', label: 'How to Book' },
                  { href: '#faq', label: 'FAQs' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="hover:text-orange-400 transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-sky-500 group-hover:bg-orange-400 transition-colors shrink-0" />
                      {label}
                    </a>
                  </li>
                ))}
                {[
                  { href: '/contact', label: 'Contact Host' },
                  { href: '/terms-and-conditions', label: 'Terms & House Rules' },
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

            {/* Contact Column — 2 cols */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-extrabold text-white text-[11px] uppercase tracking-widest">Contact</h4>
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-0.5">Your Host</span>
                    <span className="text-white font-bold text-sm">Abhijith</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-0.5">Phone / WhatsApp</span>
                    <a href="tel:+917012761588" className="text-white font-black text-sm hover:text-orange-400 transition-colors block">
                      +91 7012 761 588
                    </a>
                    <a href="tel:+919947753154" className="text-slate-300 font-bold text-xs hover:text-orange-400 transition-colors block mt-0.5">
                      +91 9947 753 154
                    </a>
                    <a href="tel:+916238951178" className="text-slate-300 font-bold text-xs hover:text-orange-400 transition-colors block mt-0.5">
                      +91 6238 951 178
                    </a>
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
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-xs shadow-md shadow-emerald-900/40 w-full"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Map Column — 4 cols */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-white text-[11px] uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  Location & Pickup
                </h4>
                <a
                  href="https://maps.google.com/?q=9.5016131229736,76.35738157806414"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                >
                  Open Maps ↗
                </a>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1171.7375215159498!2d76.35738157806414!3d9.5016131229736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1786728871048!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full brightness-90 contrast-[1.05] group-hover:brightness-100 transition-all duration-300"
                  title="Zen Homestay Location Map"
                />
                <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate pr-2">
                    <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">Finishing Point, Punnamada Lake</span>
                  </div>
                  <span className="text-orange-400 font-extrabold shrink-0">Alleppey, Kerala</span>
                </div>
              </div>

              {/* Travel tip */}
              <div className="flex items-start gap-2 bg-slate-900 border border-slate-800 rounded-xl p-3">
                <Anchor className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  <span className="text-white font-bold">No road access</span> — arrive at the Nehru Trophy Finishing Point and your complimentary speedboat will pick you up in 5 minutes.
                </p>
              </div>
            </div>

          </div>

          {/* ── Bottom Bar ── */}
          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-medium">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center sm:text-left">
              <p className="text-slate-500">© {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
              <span className="hidden sm:inline text-slate-700">·</span>
              <span className="text-slate-600">Direct Host · 0% Commission · Best Rate Guaranteed</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms</Link>
              <span className="text-slate-800">·</span>
              <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <span className="text-slate-800">·</span>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>


      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 flex items-center justify-between shadow-2xl">
        <button
          type="button"
          onClick={() => setShowCalendar(true)}
          className="text-left cursor-pointer active:scale-95 transition-transform"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
            <span className="text-xs text-orange-600 font-bold underline">/ {nights} {nights === 1 ? 'night' : 'nights'} 📅</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-700 font-bold">
            <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
            <span>4.98</span>
            <span>·</span>
            <span className="text-sky-600">{rooms} {rooms === 1 ? 'Room' : 'Rooms'} · {guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>
        </button>

        <a
          href="#booking-section"
          onClick={(e) => {
            const el = document.getElementById('booking-section');
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3.5 rounded-xl font-black text-sm shadow-lg shadow-orange-500/25 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer touch-manipulation"
        >
          <span>Book Now</span>
          <span className="text-xs font-black">↓</span>
        </a>
      </div>

      {/* Modern High-End Image Gallery Lightbox Modal (Slideshow View) */}
      {showGallery && (
        <div className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-2xl text-white flex flex-col animate-in fade-in duration-200">

          {/* Top Modal Navigation Header */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md z-20 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGallery(false)}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl transition-all active:scale-95 border border-white/10"
                aria-label="Close photo gallery"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
              <div className="hidden md:block text-xs font-medium text-slate-400">
                <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 border border-slate-700">Esc</kbd> to close · <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 border border-slate-700">←</kbd> <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 border border-slate-700">→</kbd> to navigate
              </div>
            </div>

            {/* Photo Counter & Category Badge */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-xs font-bold">
              <span className="text-sky-400 font-extrabold">{images[activePhotoIdx]?.tag}</span>
              <span className="text-slate-500">·</span>
              <span className="text-white font-extrabold">{activePhotoIdx + 1}</span>
              <span className="text-slate-400 font-normal">/ {images.length}</span>
            </div>
          </div>

          {/* Modal Main Content Area (Slideshow) */}
          <div className="flex-1 flex flex-col justify-between overflow-hidden p-3 sm:p-6 relative">

            {/* Main Image Stage */}
            <div className="flex-1 relative flex items-center justify-center min-h-0 py-2">

              {/* Previous Button */}
              <button
                onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 border border-slate-700 hover:border-orange-400"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Active Image Box */}
              <div className="relative w-full max-w-5xl h-full max-h-[64vh] rounded-2xl overflow-hidden shadow-2xl bg-black/40 border border-slate-800 flex items-center justify-center">
                <Image
                  src={images[activePhotoIdx].src}
                  alt={images[activePhotoIdx].alt}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={() => setActivePhotoIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 border border-slate-700 hover:border-orange-400"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Title & Description */}
            <div className="text-center py-2 shrink-0">
              <div className="inline-block sm:hidden text-xs font-bold text-sky-400 mb-1">
                {images[activePhotoIdx].tag} · {activePhotoIdx + 1} / {images.length}
              </div>
              <h3 className="text-sm sm:text-lg font-extrabold text-white">
                {images[activePhotoIdx].title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                {images[activePhotoIdx].alt}
              </p>
            </div>

            {/* Thumbnails Navigation Strip */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1 pb-2 overflow-x-auto shrink-0 [&::-webkit-scrollbar]:hidden">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative w-16 h-12 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all border-2 ${activePhotoIdx === idx
                    ? 'border-orange-500 scale-105 shadow-lg shadow-orange-500/20 opacity-100 ring-2 ring-orange-500/40'
                    : 'border-slate-800 opacity-50 hover:opacity-80 hover:border-slate-600'
                    }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* Modern High-End Visual Interactive Calendar Modal */}
      {showCalendar && (
        <div
          onClick={() => setShowCalendar(false)}
          className="fixed inset-0 z-[999] bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh]"
          >

            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">Select Dates & Rooms</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {nights} {nights === 1 ? 'Night' : 'Nights'} · {rooms} {rooms === 1 ? 'Room' : 'Rooms'} · {guests} Guests
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCalendar(false)}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 font-bold transition-all active:scale-95 cursor-pointer touch-manipulation"
                aria-label="Close Calendar"
              >
                <X className="w-4 h-4 pointer-events-none" />
              </button>
            </div>

            {/* Check-in / Checkout Selector Tabs in Modal */}
            <div className="p-3.5 bg-slate-100/70 grid grid-cols-2 gap-2 border-b border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setActiveDateStep('checkIn')}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation ${activeDateStep === 'checkIn'
                  ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-100'
                  : 'bg-white/60 border-slate-200 text-slate-600'
                  }`}
              >
                <span className="font-bold text-[10px] uppercase text-slate-500 block">Check-in</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{formattedCheckIn}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDateStep('checkOut')}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation ${activeDateStep === 'checkOut'
                  ? 'bg-white border-orange-500 shadow-sm ring-2 ring-orange-100'
                  : 'bg-white/60 border-slate-200 text-slate-600'
                  }`}
              >
                <span className="font-bold text-[10px] uppercase text-slate-500 block">Checkout</span>
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{formattedCheckOut}</span>
              </button>
            </div>

            {/* Calendar Grid & Adjusters Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">

              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {calendarMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </h4>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95 cursor-pointer touch-manipulation"
                    aria-label="Previous Month"
                  >
                    <ChevronLeft className="w-4 h-4 pointer-events-none" />
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 transition-colors active:scale-95 cursor-pointer touch-manipulation"
                    aria-label="Next Month"
                  >
                    <ChevronRight className="w-4 h-4 pointer-events-none" />
                  </button>
                </div>
              </div>

              {/* Day of week headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {/* Empty offset days */}
                {Array.from({ length: getFirstDayOfMonth(calendarMonth.getFullYear(), calendarMonth.getMonth()) }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-9" />
                ))}

                {/* Actual Days */}
                {Array.from({ length: getDaysInMonth(calendarMonth.getFullYear(), calendarMonth.getMonth()) }).map((_, i) => {
                  const day = i + 1;
                  const year = calendarMonth.getFullYear();
                  const month = calendarMonth.getMonth();
                  const cellDate = new Date(year, month, day);
                  const cellStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isPast = cellDate < today;

                  const isCheckIn = cellStr === checkIn;
                  const isCheckOut = cellStr === checkOut;

                  const inParts = checkIn.split('-').map(Number);
                  const outParts = checkOut.split('-').map(Number);
                  const inDate = new Date(inParts[0], inParts[1] - 1, inParts[2]);
                  const outDate = new Date(outParts[0], outParts[1] - 1, outParts[2]);
                  const isInRange = cellDate > inDate && cellDate < outDate;

                  let cellClasses = "h-9 w-full rounded-xl flex items-center justify-center font-bold transition-all cursor-pointer touch-manipulation ";

                  if (isPast) {
                    cellClasses += "text-slate-300 cursor-not-allowed opacity-40";
                  } else if (isCheckIn || isCheckOut) {
                    cellClasses += "bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-95 font-extrabold";
                  } else if (isInRange) {
                    cellClasses += "bg-orange-100 text-orange-950 rounded-none font-extrabold";
                  } else {
                    cellClasses += "text-slate-800 hover:bg-sky-100 hover:text-sky-900";
                  }

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      disabled={isPast}
                      onClick={() => handleDateCellClick(year, month, day)}
                      className={cellClasses}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Quick Presets */}
              <div className="pt-2">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1.5 tracking-wider">
                  Quick Presets
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyPreset(1, 1)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation"
                  >
                    Tomorrow (1N)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset(2, 1)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation"
                  >
                    2 Nights
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset(3, 1)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 text-[11px] font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-pointer touch-manipulation"
                  >
                    3 Nights
                  </button>
                </div>
              </div>

              {/* In-Modal Room & Guest Adjuster */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                  Room & Guest Configuration
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {/* Modal Room Counter */}
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[10px] uppercase text-slate-500 block">Rooms</span>
                      <span className="text-slate-900 font-extrabold text-xs">{rooms} {rooms === 1 ? 'Room' : 'Rooms'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 touch-manipulation">
                      <button
                        type="button"
                        onClick={() => handleRoomChange(-1)}
                        disabled={rooms <= 1}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation"
                        aria-label="Decrease rooms"
                      >
                        <Minus className="w-3.5 h-3.5 pointer-events-none" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoomChange(1)}
                        disabled={rooms >= 2}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation"
                        aria-label="Increase rooms"
                      >
                        <Plus className="w-3.5 h-3.5 pointer-events-none" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Guest Counter */}
                  <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[10px] uppercase text-slate-500 block">Guests</span>
                      <span className="text-slate-900 font-extrabold text-xs">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 touch-manipulation">
                      <button
                        type="button"
                        onClick={() => handleGuestChange(-1)}
                        disabled={guests <= 1}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation"
                        aria-label="Decrease guests"
                      >
                        <Minus className="w-3.5 h-3.5 pointer-events-none" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleGuestChange(1)}
                        disabled={guests >= rooms * 3}
                        className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-25 bg-white active:scale-90 cursor-pointer touch-manipulation"
                        aria-label="Increase guests"
                      >
                        <Plus className="w-3.5 h-3.5 pointer-events-none" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* Modal Footer / CTA */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Total ({nights}N · {rooms}R)</span>
                <span className="text-base font-black text-slate-900">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCalendar(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer touch-manipulation"
              >
                Apply Dates
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
