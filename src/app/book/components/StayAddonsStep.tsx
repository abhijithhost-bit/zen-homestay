'use client';

import { Compass, Waves, Plus, Minus, Check } from 'lucide-react';
import type { BookingAddOns } from '../lib/bookingTypes';
import { ADDON_RATES, formatINR } from '../lib/pricingUtils';

interface StayAddonsStepProps {
  addons: BookingAddOns;
  maxPartySize: number;
  onChange: (addons: BookingAddOns) => void;
}

export default function StayAddonsStep({
  addons,
  maxPartySize,
  onChange,
}: StayAddonsStepProps) {
  const maxPersons = Math.max(1, maxPartySize);

  // Speedboat handlers
  const hasSpeedboat = addons.speedboatPersons > 0;
  const toggleSpeedboat = () => {
    onChange({
      ...addons,
      speedboatPersons: hasSpeedboat ? 0 : 1,
    });
  };
  const changeSpeedboatCount = (delta: number) => {
    const next = Math.min(maxPersons, Math.max(1, addons.speedboatPersons + delta));
    onChange({ ...addons, speedboatPersons: next });
  };

  // Shikara handlers
  const hasShikara = addons.shikaraHours > 0;
  const toggleShikara = () => {
    onChange({
      ...addons,
      shikaraHours: hasShikara ? 0 : 1,
    });
  };
  const changeShikaraCount = (delta: number) => {
    const next = Math.min(6, Math.max(1, addons.shikaraHours + delta));
    onChange({ ...addons, shikaraHours: next });
  };

  // Kayak handlers
  const hasKayak = addons.kayakPersons > 0;
  const toggleKayak = () => {
    onChange({
      ...addons,
      kayakPersons: hasKayak ? 0 : 1,
    });
  };
  const changeKayakCount = (delta: number) => {
    const next = Math.min(maxPersons, Math.max(1, addons.kayakPersons + delta));
    onChange({ ...addons, kayakPersons: next });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Enhance Your Stay
              </h2>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                Optional
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Curated backwater experiences directly with host Abhijith at zero markup
            </p>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="divide-y divide-slate-100">
        {/* Item 1: Speed Boat Ride */}
        <div
          className={`py-3.5 transition-colors rounded-2xl p-3 -mx-3 ${
            hasSpeedboat ? 'bg-orange-50/40' : 'hover:bg-slate-50/60'
          }`}
        >
          <div className="flex items-start sm:items-center justify-between gap-3">
            <label className="flex items-start gap-3 cursor-pointer select-none grow">
              <div className="pt-0.5 sm:pt-0">
                <input
                  type="checkbox"
                  checked={hasSpeedboat}
                  onChange={toggleSpeedboat}
                  className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 accent-orange-500 cursor-pointer"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm text-slate-900">
                    Speed Boat Ride
                  </span>
                  <span className="text-[11px] font-black text-orange-600 bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md">
                    {formatINR(ADDON_RATES.SPEEDBOAT_PER_PERSON)} / person
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">10 mins</span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  High-speed thrill ride on Punnamada Lake · <span className="text-emerald-700 font-semibold">Arrival pickup is already free</span>
                </p>
              </div>
            </label>

            {/* Stepper when checked */}
            {hasSpeedboat && (
              <div className="shrink-0 flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => changeSpeedboatCount(-1)}
                  disabled={addons.speedboatPersons <= 1}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Decrease persons"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-black text-slate-800 min-w-14 text-center">
                  {addons.speedboatPersons} {addons.speedboatPersons === 1 ? 'person' : 'persons'}
                </span>
                <button
                  type="button"
                  onClick={() => changeSpeedboatCount(1)}
                  disabled={addons.speedboatPersons >= maxPersons}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Increase persons"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Item 2: Kayaking */}
        <div
          className={`py-3.5 transition-colors rounded-2xl p-3 -mx-3 ${
            hasKayak ? 'bg-orange-50/40' : 'hover:bg-slate-50/60'
          }`}
        >
          <div className="flex items-start sm:items-center justify-between gap-3">
            <label className="flex items-start gap-3 cursor-pointer select-none grow">
              <div className="pt-0.5 sm:pt-0">
                <input
                  type="checkbox"
                  checked={hasKayak}
                  onChange={toggleKayak}
                  className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 accent-orange-500 cursor-pointer"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm text-slate-900">
                    Kayaking
                  </span>
                  <span className="text-[11px] font-black text-orange-600 bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md">
                    {formatINR(ADDON_RATES.KAYAK_PER_PERSON)} / person
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Serene self-paddle kayak exploration right from our dock · Life jackets provided
                </p>
              </div>
            </label>

            {/* Stepper when checked */}
            {hasKayak && (
              <div className="shrink-0 flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => changeKayakCount(-1)}
                  disabled={addons.kayakPersons <= 1}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Decrease persons"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-black text-slate-800 min-w-14 text-center">
                  {addons.kayakPersons} {addons.kayakPersons === 1 ? 'person' : 'persons'}
                </span>
                <button
                  type="button"
                  onClick={() => changeKayakCount(1)}
                  disabled={addons.kayakPersons >= maxPersons}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Increase persons"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Item 3: Shikara Boating */}
        <div
          className={`py-3.5 transition-colors rounded-2xl p-3 -mx-3 ${
            hasShikara ? 'bg-orange-50/40' : 'hover:bg-slate-50/60'
          }`}
        >
          <div className="flex items-start sm:items-center justify-between gap-3">
            <label className="flex items-start gap-3 cursor-pointer select-none grow">
              <div className="pt-0.5 sm:pt-0">
                <input
                  type="checkbox"
                  checked={hasShikara}
                  onChange={toggleShikara}
                  className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 accent-orange-500 cursor-pointer"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm text-slate-900">
                    Shikara Boating
                  </span>
                  <span className="text-[11px] font-black text-orange-600 bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md">
                    {formatINR(ADDON_RATES.SHIKARA_PER_HOUR)} / hour
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Private covered wooden boat through Alleppey canals &amp; backwaters · Ideal for sunset
                </p>
              </div>
            </label>

            {/* Stepper when checked */}
            {hasShikara && (
              <div className="shrink-0 flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => changeShikaraCount(-1)}
                  disabled={addons.shikaraHours <= 1}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Decrease hours"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-black text-slate-800 min-w-14 text-center">
                  {addons.shikaraHours} {addons.shikaraHours === 1 ? 'hour' : 'hours'}
                </span>
                <button
                  type="button"
                  onClick={() => changeShikaraCount(1)}
                  disabled={addons.shikaraHours >= 6}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                  aria-label="Increase hours"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

