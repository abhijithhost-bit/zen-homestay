'use client';

import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  MessageCircle,
  Phone,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Waves,
} from 'lucide-react';
import type {
  BookingParams,
  BookingSubmission,
  BookingTierKey,
  GuestInfo,
  PaymentOption,
} from './lib/bookingTypes';
import {
  TIERS_CONFIG,
  computePriceBreakdown,
  generateBookingRef,
  getDefaultDate,
  padZero,
} from './lib/pricingUtils';
import { activePaymentHandler } from './lib/paymentHandler';
import { buildWhatsAppUrl, HOST_PHONE_DISPLAY } from './lib/whatsappTicket';
import { supabase, isSupabaseConfigured, type DayAvailability } from '@/lib/supabase';
import StayOverviewBar from './components/StayOverviewBar';
import GuestInfoStep from './components/GuestInfoStep';
import PaymentPreferenceStep from './components/PaymentPreferenceStep';
import PaymentMethodBadge from './components/PaymentMethodBadge';
import PricingSummaryCard from './components/PricingSummaryCard';
import EditStayModal from './components/EditStayModal';
import BookingConfirmation from './components/BookingConfirmation';

interface BookCheckoutClientProps {
  initialSearchParams: { [key: string]: string | string[] | undefined };
}

export default function BookCheckoutClient({ initialSearchParams }: BookCheckoutClientProps) {
  // 1. Parse initial search params with robust fallbacks
  const getParam = (key: string): string => {
    const val = initialSearchParams[key];
    if (Array.isArray(val)) return val[0] || '';
    return val || '';
  };

  const rawTier = getParam('tier');
  const validTier: BookingTierKey =
    rawTier === 'whole-floor' || rawTier === '2-rooms' ? 'whole-floor' : '1-room';

  const defaultCheckIn = getDefaultDate(1); // tomorrow
  const defaultCheckOut = getDefaultDate(2); // 1 night

  const rawCheckIn = getParam('checkIn') || defaultCheckIn;
  const rawCheckOut = getParam('checkOut') || defaultCheckOut;
  const rawGuests = parseInt(getParam('guests') || '2', 10);
  const rawKids = parseInt(getParam('kids') || '0', 10);

  const initialTierConfig = TIERS_CONFIG[validTier];
  const clampedGuests = Math.min(
    initialTierConfig.maxGuests,
    Math.max(1, isNaN(rawGuests) ? 2 : rawGuests)
  );
  const clampedKids = Math.min(4, Math.max(0, isNaN(rawKids) ? 0 : rawKids));

  // 2. Component State
  const [params, setParams] = useState<BookingParams>({
    tier: validTier,
    checkIn: rawCheckIn,
    checkOut: rawCheckOut,
    guests: clampedGuests,
    kids: clampedKids,
  });

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: '',
    phone: '',
    email: '',
    arrivalTime: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof GuestInfo, string>>>({});
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('25-percent');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [calendarActiveStep, setCalendarActiveStep] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({});
  const [submission, setSubmission] = useState<BookingSubmission | null>(null);

  // Fetch live Supabase availability (90 days)
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    async function fetchAvailability() {
      try {
        const today = new Date();
        const startDateStr = `${today.getFullYear()}-${padZero(today.getMonth() + 1)}-${padZero(today.getDate())}`;

        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 90);
        const endDateStr = `${futureDate.getFullYear()}-${padZero(futureDate.getMonth() + 1)}-${padZero(futureDate.getDate())}`;

        const rpcRes = await supabase.rpc('get_calendar_availability', {
          p_start_date: startDateStr,
          p_end_date: endDateStr,
        });

        if (rpcRes.data && Array.isArray(rpcRes.data)) {
          const map: Record<string, DayAvailability> = {};
          for (const row of rpcRes.data as DayAvailability[]) {
            map[row.cal_date] = row;
          }
          setAvailability(map);
        }
      } catch (err) {
        console.warn('Live availability fetch notice on /book:', err);
      }
    }

    fetchAvailability();
  }, []);

  const handleOpenCalendar = (step: 'checkIn' | 'checkOut' = 'checkIn') => {
    setCalendarActiveStep(step);
    setIsEditModalOpen(true);
  };

  // 3. Form Validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof GuestInfo, string>> = {};

    if (!termsAccepted) {
      newErrors.name = newErrors.name || 'Please accept the Terms & Refund Policy to proceed';
    }

    if (!guestInfo.name.trim() || guestInfo.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (minimum 2 characters)';
    }

    const cleanPhone = guestInfo.phone.trim();
    if (!cleanPhone || cleanPhone.length < 8) {
      newErrors.phone = 'Please enter a valid WhatsApp phone number with country code';
    }

    const cleanEmail = guestInfo.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!guestInfo.arrivalTime) {
      newErrors.arrivalTime = 'Please select your estimated arrival time for speedboat coordination';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // 4. Handle Submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const breakdown = computePriceBreakdown(params, availability);
      const bookingRef = generateBookingRef();
      const advanceAmount =
        paymentOption === '25-percent' ? breakdown.advance25 : breakdown.advance100;
      const balanceAmount =
        paymentOption === '25-percent' ? breakdown.balance25 : breakdown.balance100;

      // Execute Pluggable Payment Handler (Phase 1 WhatsApp Direct / Phase 2 Razorpay)
      const paymentResult = await activePaymentHandler.processPayment({
        bookingRef,
        amountInRupees: advanceAmount,
        guestName: guestInfo.name,
        guestEmail: guestInfo.email,
        guestPhone: guestInfo.phone,
      });

      if (!paymentResult.success) {
        alert(paymentResult.message || 'Payment processing failed. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const newSubmission: BookingSubmission = {
        ref: bookingRef,
        params,
        guest: guestInfo,
        paymentOption,
        totalPrice: breakdown.totalPrice,
        advanceAmount,
        balanceAmount,
      };

      setSubmission(newSubmission);

      // Open formatted WhatsApp ticket
      const waUrl = buildWhatsAppUrl(newSubmission);
      if (typeof window !== 'undefined') {
        window.open(waUrl, '_blank');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Booking submission error:', err);
      alert('An error occurred while creating your booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. If confirmed, render BookingConfirmation view
  if (submission) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <NextLink href="/" className="flex items-center gap-2.5">
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                Zen Homestay
              </span>
              <span className="text-[10px] text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md font-bold">
                Punnamada Lake
              </span>
            </NextLink>
            <div className="text-xs text-slate-500 font-bold flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{HOST_PHONE_DISPLAY}</span>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BookingConfirmation submission={submission} />
        </main>
      </div>
    );
  }

  const breakdown = computePriceBreakdown(params, availability);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Checkout Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Breadcrumb */}
          <div className="flex items-center gap-3">
            <NextLink
              href="/"
              className="group flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors pr-3 border-r border-slate-200"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </NextLink>
            <NextLink href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                ZH
              </div>
              <div className="min-w-0">
                <span className="font-black text-sm sm:text-base text-slate-900 tracking-tight block leading-tight">
                  Zen Homestay
                </span>
                <span className="text-[10px] font-bold text-sky-700 block leading-none">
                  Direct Host Checkout
                </span>
              </div>
            </NextLink>
          </div>

          {/* Center Trust Pill */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Booking Fees · Direct Host Rate Guaranteed</span>
          </div>

          {/* Right Direct Host Contact */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/917012761588"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-current" />
              <span className="hidden sm:inline">Host Support</span>
            </a>
            <a
              href="tel:+917012761588"
              className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Call Host</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Checkout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Page Title */}
        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200 inline-flex items-center gap-1">
              <Waves className="w-3 h-3 text-orange-500" />
              Direct Lakefront Booking
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Confirm Your Stay &amp; Reserve Directly
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Lock direct-host pricing with no OTA markups. Complimentary private speedboat arrival &amp; Kerala breakfast included.
          </p>
        </div>

        {/* Split Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (60% on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Stay Overview Bar with Interactive Calendar triggers */}
            <StayOverviewBar params={params} onOpenCalendar={handleOpenCalendar} />

            {/* Step 1: Guest Information */}
            <GuestInfoStep
              data={guestInfo}
              errors={errors}
              onChange={handleFieldChange}
            />

            {/* Step 2: Payment Preference */}
            <PaymentPreferenceStep
              paymentOption={paymentOption}
              totalPrice={breakdown.totalPrice}
              advance25={breakdown.advance25}
              balance25={breakdown.balance25}
              onChange={setPaymentOption}
            />

            {/* Step 3: Payment Method Preview (Pluggable) */}
            <PaymentMethodBadge />

            {/* Submit Action Area */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              {/* Terms & Conditions Checkbox */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  termsAccepted
                    ? 'bg-orange-50/40 border-orange-200'
                    : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
                }`}
              >
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <div className="relative flex items-center pt-0.5">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-5 h-5 rounded-md border-2 border-slate-300 text-orange-500 focus:ring-orange-400 focus:ring-offset-0 cursor-pointer accent-orange-500 transition-all"
                    />
                  </div>
                  <span className="text-xs text-slate-700 font-medium leading-relaxed">
                    I agree to the{' '}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-orange-600 hover:text-orange-700 underline underline-offset-2"
                    >
                      Terms &amp; Refund Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!termsAccepted || isSubmitting}
                  className={`w-full flex items-center justify-center gap-3 py-4 sm:py-4.5 px-6 rounded-2xl font-black text-base sm:text-lg tracking-wide transition-all ${
                    termsAccepted && !isSubmitting
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-[0.98] cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {isSubmitting ? (
                    <span>Formatting Booking Ticket...</span>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Request Booking &amp; Send to WhatsApp →</span>
                    </>
                  )}
                </button>
              </div>

              {/* Unchecked hint notice */}
              {!termsAccepted && (
                <p className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-center">
                  ⚠️ Please accept the Terms &amp; Refund Policy to enable WhatsApp reservation
                </p>
              )}

              {/* Bottom Security Notice (without response time) */}
              <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500 font-medium text-center">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>No payment deducted now · Host shares UPI QR on chat</span>
              </div>
            </div>
          </div>

          {/* Right Column (40% on desktop) with Live Availability Sync */}
          <div className="lg:col-span-5">
            <PricingSummaryCard
              params={params}
              paymentOption={paymentOption}
              availability={availability}
            />
          </div>
        </div>
      </main>

      {/* Interactive Calendar & Stay Modal */}
      {isEditModalOpen && (
        <EditStayModal
          key={`${params.checkIn}-${params.checkOut}-${params.tier}-${calendarActiveStep}`}
          params={params}
          isOpen={isEditModalOpen}
          initialStep={calendarActiveStep}
          availability={availability}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updated) => setParams(updated)}
        />
      )}
    </div>
  );
}

