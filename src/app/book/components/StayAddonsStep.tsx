'use client';

import { Compass, Plus, Minus } from 'lucide-react';
import type { BookingAddOns, SpeedboatPackageKey, KayakPackageKey } from '../lib/bookingTypes';
import {
  ADDON_RATES,
  SPEEDBOAT_PACKAGES,
  calculateSpeedboatPrice,
  KAYAK_PACKAGES,
  calculateKayakPrice,
  formatINR,
} from '../lib/pricingUtils';

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
  const partyGuests = Math.min(7, Math.max(1, maxPartySize || 1));
  const maxPersons = Math.max(1, maxPartySize);

  // Speedboat handlers
  const activePackage: SpeedboatPackageKey | null =
    addons.speedboatPackage !== undefined
      ? addons.speedboatPackage
      : addons.speedboatPersons && addons.speedboatPersons > 0
      ? '10-min'
      : null;

  const hasSpeedboat = !!activePackage;
  const currentPkgKey: SpeedboatPackageKey = activePackage || '10-min';
  const currentPkgInfo = SPEEDBOAT_PACKAGES[currentPkgKey];
  const currentSpeedboatPrice = calculateSpeedboatPrice(activePackage, partyGuests);

  const toggleSpeedboat = () => {
    if (hasSpeedboat) {
      onChange({
        ...addons,
        speedboatPackage: null,
        speedboatPersons: 0,
      });
    } else {
      onChange({
        ...addons,
        speedboatPackage: '10-min',
        speedboatPersons: partyGuests,
      });
    }
  };

  const handleSelectSpeedboatPackage = (pkg: SpeedboatPackageKey) => {
    onChange({
      ...addons,
      speedboatPackage: pkg,
      speedboatPersons: partyGuests,
    });
  };

  // Shikara handlers
  const hasShikara = addons.shikaraHours > 0;
  const toggleShikara = () => {
    onChange({
      ...addons,
      shikaraHours: hasShikara ? 0 : 2,
    });
  };
  const changeShikaraCount = (delta: number) => {
    const next = Math.min(6, Math.max(2, addons.shikaraHours + delta));
    onChange({ ...addons, shikaraHours: next });
  };

  // Kayak handlers
  const activeKayakPackage: KayakPackageKey | null =
    addons.kayakPackage !== undefined
      ? addons.kayakPackage
      : addons.kayakPersons && addons.kayakPersons > 0
      ? '1-hour'
      : null;

  const hasKayak = !!activeKayakPackage;
  const currentKayakPkgKey: KayakPackageKey = activeKayakPackage || '1-hour';
  const currentKayakPkgInfo = KAYAK_PACKAGES[currentKayakPkgKey];
  const currentKayakPrice = calculateKayakPrice(activeKayakPackage, maxPartySize);

  const toggleKayak = () => {
    if (hasKayak) {
      onChange({
        ...addons,
        kayakPackage: null,
        kayakPersons: 0,
      });
    } else {
      onChange({
        ...addons,
        kayakPackage: '1-hour',
        kayakPersons: maxPartySize,
      });
    }
  };

  const handleSelectKayakPackage = (pkg: KayakPackageKey) => {
    onChange({
      ...addons,
      kayakPackage: pkg,
      kayakPersons: maxPartySize,
    });
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
            hasSpeedboat ? 'bg-orange-50/50 border border-orange-200/70' : 'hover:bg-slate-50/60'
          }`}
        >
          <div>
            <div className="flex items-start justify-between gap-3">
              <label className="flex items-start gap-3 cursor-pointer select-none grow">
                <div className="pt-0.5">
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
                    {hasSpeedboat ? (
                      <>
                        <span className="text-[11px] font-black text-orange-600 bg-orange-100/80 border border-orange-200 px-2 py-0.5 rounded-md">
                          {formatINR(currentSpeedboatPrice)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                          {currentPkgInfo.duration}
                        </span>
                      </>
                    ) : (
                      <span className="text-[11px] font-black text-orange-600 bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md">
                        From ₹1,300
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Private speedboat thrills on Punnamada Lake ·{' '}
                    <span className="text-emerald-700 font-semibold">
                      Arrival &amp; departure pickup is already free
                    </span>
                  </p>
                </div>
              </label>
            </div>

            {/* Dropdown Options when checked */}
            {hasSpeedboat && (
              <div className="mt-3 pt-3 border-t border-orange-200/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="grow max-w-md">
                    <label
                      htmlFor="speedboat-package-select"
                      className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Select Ride Option:
                    </label>
                    <div className="relative">
                      <select
                        id="speedboat-package-select"
                        value={currentPkgKey}
                        onChange={(e) =>
                          handleSelectSpeedboatPackage(e.target.value as SpeedboatPackageKey)
                        }
                        className="w-full text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 pr-9 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 cursor-pointer appearance-none"
                      >
                        <option value="10-min">
                          10-Minute Fun Ride — {formatINR(calculateSpeedboatPrice('10-min', partyGuests))}
                        </option>
                        <option value="30-min">
                          30-Minute Lake Ride — ₹3,000
                        </option>
                        <option value="1-hour">
                          1-Hour Village Cruise — ₹6,000
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    {currentPkgKey === '10-min' && (
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                        Party of {partyGuests}
                      </span>
                    )}
                    <span className="text-base font-black text-orange-600">
                      {formatINR(currentSpeedboatPrice)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Item 2: Kayaking */}
        <div
          className={`py-3.5 transition-colors rounded-2xl p-3 -mx-3 ${
            hasKayak ? 'bg-orange-50/50 border border-orange-200/70' : 'hover:bg-slate-50/60'
          }`}
        >
          <div>
            <div className="flex items-start justify-between gap-3">
              <label className="flex items-start gap-3 cursor-pointer select-none grow">
                <div className="pt-0.5">
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
                    {hasKayak ? (
                      <>
                        <span className="text-[11px] font-black text-orange-600 bg-orange-100/80 border border-orange-200 px-2 py-0.5 rounded-md">
                          {formatINR(currentKayakPrice)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                          {currentKayakPkgInfo.duration}
                        </span>
                      </>
                    ) : (
                      <span className="text-[11px] font-black text-orange-600 bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-md">
                        From ₹500 / person
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Serene self-paddle kayak exploration right from our dock · Life jackets provided
                  </p>
                </div>
              </label>
            </div>

            {/* Dropdown Options when checked */}
            {hasKayak && (
              <div className="mt-3 pt-3 border-t border-orange-200/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="grow max-w-md">
                    <label
                      htmlFor="kayak-package-select"
                      className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5"
                    >
                      Select Kayak Option:
                    </label>
                    <div className="relative">
                      <select
                        id="kayak-package-select"
                        value={currentKayakPkgKey}
                        onChange={(e) =>
                          handleSelectKayakPackage(e.target.value as KayakPackageKey)
                        }
                        className="w-full text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 pr-9 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 cursor-pointer appearance-none"
                      >
                        <option value="1-hour">
                          1-Hour Kayaking — {formatINR(maxPartySize * 500)}
                        </option>
                        <option value="2-hour">
                          2-Hour Narrow Canal Exploration — {formatINR(maxPartySize * 650)}
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                      Party of {maxPartySize}
                    </span>
                    <span className="text-base font-black text-orange-600">
                      {formatINR(currentKayakPrice)}
                    </span>
                  </div>
                </div>
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
                  <span className="text-[10px] text-slate-400 font-medium">
                    Min 2 hours
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Private covered wooden boat through Alleppey canals &amp; backwaters · Min 2 hours
                </p>
              </div>
            </label>

            {/* Stepper when checked */}
            {hasShikara && (
              <div className="shrink-0 flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => changeShikaraCount(-1)}
                  disabled={addons.shikaraHours <= 2}
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

