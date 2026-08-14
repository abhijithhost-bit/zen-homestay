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
  Minus
} from 'lucide-react';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const renderBookingCard = () => (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4 sm:space-y-5">

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
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer touch-manipulation ${
                nights === 1
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm font-extrabold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'
              }`}
            >
              1 Night
            </button>
            <button
              type="button"
              onClick={() => applyPreset(2, 0)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer touch-manipulation ${
                nights === 2
                  ? 'bg-orange-500 text-white border-orange-500 shadow-sm font-extrabold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-orange-50'
              }`}
            >
              2 Nights
            </button>
            <button
              type="button"
              onClick={() => applyPreset(3, 0)}
              className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer touch-manipulation ${
                nights === 3
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
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white py-3 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm active:scale-[0.98]"
        >
          <Phone className="w-4 h-4 text-sky-400" />
          Call Host (+91 7012 761 588)
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

    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900 pb-20 md:pb-0">

      {/* Modern Luxury Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] transition-all w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo & Superhost Badge */}
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
                  <Award className="w-3 h-3 text-orange-500" /> Superhost
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] font-bold text-sky-600 tracking-wider uppercase mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <span className="truncate">Punnamada Lake · Alleppey</span>
              </span>
            </div>
          </Link>

          {/* Center Interactive Navigation Links & Live Status Pill */}
          <nav className="hidden lg:flex items-center bg-slate-100/90 border border-slate-200/80 rounded-full p-1.5 text-xs font-bold text-slate-700 shadow-inner">
            <a href="#arrival" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all">
              Arrival Route
            </a>
            <a href="#stay" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all">
              Lakefront Rooms
            </a>
            <a href="#amenities" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all">
              Amenities
            </a>
            <a href="#faq" className="px-3.5 py-1.5 rounded-full hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all">
              FAQs
            </a>
            <div className="h-4 w-[1px] bg-slate-300 mx-1"></div>
            <div className="flex items-center gap-1.5 px-3 text-[11px] font-extrabold text-orange-600">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
              Direct Host Rates
            </div>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="https://wa.me/917012761588"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900 border border-emerald-200/80 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-extrabold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-95 flex items-center gap-1.5"
            >
              <span>Contact Host</span>
            </Link>
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

          {/* Exact required H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Best Home stay in alleppey
          </h1>
        </div>

        {/* Mobile Swipeable Photo Gallery */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full rounded-2xl mb-6 relative">
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
            </div>
          ))}
          {/* Mobile Photo Count Badge */}
          <button 
            onClick={() => {
              setActivePhotoIdx(0);
              setShowGallery(true);
            }}
            className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 z-10 active:scale-95"
          >
            <span>📷</span> 1 / 5 · View all
          </button>
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
                  Entire waterfront heritage homestay hosted by Abhijith
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

            {/* MOBILE ONLY: Booking Card displayed directly below Bedroom section */}
            <div id="booking-section" className="lg:hidden my-6 scroll-mt-24">
              {renderBookingCard()}
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
            <div className="pb-8 border-b border-slate-200">
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

            {/* Interactive FAQ Accordion */}
            <div id="faq">
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

      {/* Premium Waterfront Homestay Footer with Embedded Google Map */}
      <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-t border-slate-800/80 text-slate-400 pt-16 pb-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Grid: Brand, Navigation, Contact, and Embedded Google Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
            
            {/* Col 1: Brand & Backwater Sanctuary Info (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 via-sky-500 to-orange-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-orange-500/10">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg text-white tracking-tight">Zen Homestay</span>
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Punnamada Lake · Alleppey</span>
                </div>
              </div>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                An exclusive secluded waterfront sanctuary situated on the calm waters of Punnamada Lake, accessible exclusively by our complimentary 5-minute speedboat transfer. Zero traffic noise, authentic Kerala cuisine, and 5-star host care.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-slate-800/90 text-sky-400 border border-slate-700/60 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5">
                  <Anchor className="w-3 h-3" /> 5-Min Boat Pickup
                </span>
                <span className="bg-slate-800/90 text-orange-400 border border-slate-700/60 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5">
                  <Award className="w-3 h-3" /> 4.98 Superhost
                </span>
                <span className="bg-slate-800/90 text-emerald-400 border border-slate-700/60 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3" /> Direct Host Rates
                </span>
              </div>
            </div>

            {/* Col 2: Navigation & Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <a href="#arrival" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500">•</span> The Arrival Route
                  </a>
                </li>
                <li>
                  <a href="#stay" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500">•</span> Where You'll Sleep
                  </a>
                </li>
                <li>
                  <a href="#amenities" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500">•</span> Property Amenities
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500">•</span> FAQs
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500">•</span> Contact Host Page
                  </Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500">•</span> Terms & House Rules
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-500">•</span> Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Host Contact (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
                Direct Host
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Call / WhatsApp</span>
                  <a href="tel:+917012761588" className="text-white font-bold hover:text-orange-400 transition-colors block mt-0.5 text-sm">
                    +91 7012 761 588
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Host</span>
                  <span className="text-slate-300 font-semibold block">Abhijith (Host)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Timings</span>
                  <span className="text-slate-300 font-medium block">Check-in: 2:00 PM</span>
                  <span className="text-slate-300 font-medium block">Checkout: 11:00 AM</span>
                </div>
                <a
                  href="https://wa.me/917012761588"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl transition-all active:scale-95 text-[11px] shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Col 4: Interactive Google Maps Location Card (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  Location & Pickup Point
                </h4>
                <a
                  href="https://maps.google.com/?q=9.5016131229736,76.35738157806414"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-bold text-sky-400 hover:text-sky-300 underline"
                >
                  Open in Google Maps ↗
                </a>
              </div>

              {/* Google Maps Embed Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-xl group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1171.7375215159498!2d76.35738157806414!3d9.5016131229736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1786728871048!5m2!1sen!2sin"
                  width="100%"
                  height="190"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-[190px] brightness-90 contrast-[1.05] group-hover:brightness-100 transition-all duration-300"
                  title="Zen Homestay Location Map"
                />
                <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-300 truncate pr-2 font-medium">
                    <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                    <span className="truncate">Finishing Point, Punnamada Lake</span>
                  </div>
                  <span className="text-orange-400 font-extrabold shrink-0">Alleppey, Kerala</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Policy Links */}
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-slate-500 text-xs font-medium">
            <div className="flex flex-wrap items-center gap-2">
              <p>© {new Date().getFullYear()} Zen Homestay Alleppey. All rights reserved.</p>
              <span className="hidden sm:inline">·</span>
              <span className="text-slate-400 hidden sm:inline">Direct Host Rates with 0% Commission</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="/terms-and-conditions" className="hover:underline hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <span>·</span>
              <Link href="/privacy-policy" className="hover:underline hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="/contact" className="hover:underline hover:text-white transition-colors">
                Contact Host
              </Link>
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
                  className={`relative w-16 h-12 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 transition-all border-2 ${
                    activePhotoIdx === idx
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
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation ${
                  activeDateStep === 'checkIn'
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
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer touch-manipulation ${
                  activeDateStep === 'checkOut'
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
