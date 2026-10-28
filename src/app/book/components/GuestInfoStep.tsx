'use client';

import { User, Phone, Mail, Clock, MessageSquare, Anchor } from 'lucide-react';
import type { GuestInfo } from '../lib/bookingTypes';

interface GuestInfoStepProps {
  data: GuestInfo;
  errors: Partial<Record<keyof GuestInfo, string>>;
  onChange: (field: keyof GuestInfo, value: string) => void;
}

const ARRIVAL_TIME_OPTIONS = [
  '12:00 PM (Early Arrival Request)',
  '12:30 PM (Early Arrival Request)',
  '01:00 PM (Early Arrival Request)',
  '01:30 PM (Early Arrival Request)',
  '02:00 PM (Standard Check-in)',
  '02:30 PM (Speedboat pickup)',
  '03:00 PM (Speedboat pickup)',
  '03:30 PM (Speedboat pickup)',
  '04:00 PM (Speedboat pickup)',
  '04:30 PM (Speedboat pickup)',
  '05:00 PM (Sunset arrival)',
  '05:30 PM (Sunset arrival)',
  '06:00 PM (Evening arrival)',
  '06:30 PM (Evening arrival)',
  '07:00 PM (Evening arrival)',
  '07:30 PM (Evening arrival)',
  '08:00 PM or later (Late arrival)',
];

export default function GuestInfoStep({ data, errors, onChange }: GuestInfoStepProps) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
          1
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Guest Information
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Details required for speedboat pickup coordination and booking verification
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm font-semibold transition-all outline-none ${
                errors.name
                  ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] font-bold text-rose-600 mt-1 pl-1">{errors.name}</p>
          )}
        </div>

        {/* WhatsApp Phone */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
            WhatsApp Phone <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm font-semibold transition-all outline-none ${
                errors.phone
                  ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100'
              }`}
            />
          </div>
          {errors.phone ? (
            <p className="text-[11px] font-bold text-rose-600 mt-1 pl-1">{errors.phone}</p>
          ) : (
            <p className="text-[10px] text-slate-400 font-medium mt-1 pl-1">
              Country code included (Host contacts you here)
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="rahul.sharma@example.com"
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm font-semibold transition-all outline-none ${
                errors.email
                  ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100'
              }`}
            />
          </div>
          {errors.email ? (
            <p className="text-[11px] font-bold text-rose-600 mt-1 pl-1">{errors.email}</p>
          ) : (
            <p className="text-[10px] text-slate-400 font-medium mt-1 pl-1">
              For booking voucher &amp; receipts
            </p>
          )}
        </div>

        {/* Estimated Arrival Time */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Estimated Arrival Time <span className="text-rose-500">*</span>
            </label>
            <span className="text-[10px] font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Anchor className="w-3 h-3" />
              Speedboat Transfer
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Clock className="w-4 h-4" />
            </div>
            <select
              value={data.arrivalTime}
              onChange={(e) => onChange('arrivalTime', e.target.value)}
              className={`w-full pl-10 pr-8 py-3 rounded-2xl border text-sm font-semibold transition-all outline-none bg-slate-50/50 appearance-none cursor-pointer ${
                errors.arrivalTime
                  ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-200 text-slate-900 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100'
              }`}
            >
              <option value="" disabled>Select your expected time in Alleppey...</option>
              {ARRIVAL_TIME_OPTIONS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
          {errors.arrivalTime ? (
            <p className="text-[11px] font-bold text-rose-600 mt-1 pl-1">{errors.arrivalTime}</p>
          ) : (
            <p className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
              <span>💡</span>
              <span>
                Host Abhijith meets you with our private speedboat at the Nehru Trophy Boat Race Finishing Point.
              </span>
            </p>
          )}
        </div>

        {/* Special Requests / Dietary Notes */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
            Special Requests &amp; Notes <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              rows={3}
              value={data.specialRequests}
              onChange={(e) => onChange('specialRequests', e.target.value)}
              placeholder="e.g. Authentic Appam &amp; stew breakfast preference, extra pillows, celebrating anniversary, reaching via train..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium transition-all outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

