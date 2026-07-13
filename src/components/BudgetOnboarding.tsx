"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, storageUrl, formatINR, type VenueRow } from "@/lib/supabase";

export interface BudgetIntake {
  pax: number;
  venueId: string | null;
  venueName: string | null;
  venuePrice: number | null;
  foodType: string;
}

const PAX_PRESETS = [100, 200, 300, 500];

const FOOD_OPTIONS = [
  { label: "Sadya", desc: "Traditional Kerala feast on banana leaf" },
  { label: "Non-Veg Buffet", desc: "Rich, varied non-vegetarian spread" },
  { label: "North Indian", desc: "Mughlai, tandoor & more" },
  { label: "Mixed", desc: "Best of all cuisines" },
];

const stepVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 26 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.18 } },
};

export default function BudgetOnboarding({ onComplete }: { onComplete: (data: BudgetIntake) => void }) {
  const [step, setStep] = useState(1);
  const [pax, setPax] = useState("");
  const [venues, setVenues] = useState<VenueRow[]>([]);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [venuesError, setVenuesError] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<VenueRow | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("venues")
      .select("*")
      .order("featured", { ascending: false })
      .limit(8)
      .returns<VenueRow[]>()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setVenuesError(error.message);
        setVenues(data ?? []);
        setVenuesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function submitPax(n: number) {
    if (!n || n <= 0) return;
    setPax(String(n));
    setStep(2);
  }

  function chooseVenue(v: VenueRow | null) {
    setSelectedVenue(v);
    setStep(3);
  }

  function finish(food: string) {
    onComplete({
      pax: Number(pax),
      venueId: selectedVenue?.id ?? null,
      venueName: selectedVenue?.name ?? null,
      venuePrice: selectedVenue?.price_from ?? null,
      foodType: food,
    });
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-purple-200 bg-white/90 backdrop-blur-xl shadow-[0_20px_70px_-20px_rgba(139,49,199,0.18)]">
      <div className="flex flex-col items-center px-6 py-10 sm:py-12">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-1">Quick setup · 30 seconds</p>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111827] text-center">
          Before we build your budget…
        </h2>
        <p className="mt-2 max-w-md text-center text-sm text-[#6B7280] leading-relaxed">
          Three quick questions so we can pre-fill realistic numbers instead of generic averages.
        </p>

        {/* Progress dots */}
        <div className="mt-6 mb-2 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              animate={{ width: s === step ? 20 : 8, opacity: s <= step ? 1 : 0.3 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`h-2 rounded-full ${s === step ? "bg-gradient-to-r from-[#8B31C7] to-fuchsia-500" : "bg-purple-100"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Step 1: PAX ── */}
          {step === 1 && (
            <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-sm text-center">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B31C7]">Step 1 of 3</p>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#111827]">How many guests (PAX)?</h3>
              <p className="mt-2 text-sm text-[#6B7280]">We use this to size catering and venue costs correctly.</p>

              <div className="mt-6 flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  step="10"
                  inputMode="numeric"
                  placeholder="e.g. 300"
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitPax(Number(pax));
                  }}
                  className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-center text-sm font-semibold text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#8B31C7] focus:border-[#8B31C7]"
                />
                <button
                  onClick={() => submitPax(Number(pax))}
                  disabled={!pax || Number(pax) <= 0}
                  className="flex-shrink-0 rounded-xl bg-[#8B31C7] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#7a28b0] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  Continue →
                </button>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {PAX_PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => submitPax(p)}
                    className="rounded-full border border-purple-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#2A1A33]/70 transition-all hover:border-[#8B31C7] hover:text-[#8B31C7] cursor-pointer"
                  >
                    {p} guests
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Venue ── */}
          {step === 2 && (
            <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-lg text-center">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B31C7]">Step 2 of 3</p>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#111827]">Which venue are you considering?</h3>
              <p className="mt-2 text-sm text-[#6B7280]">Pick one from our catalogue and its price drops straight into your budget.</p>

              {venuesLoading && (
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#9CA3AF]">
                  <span className="flex h-1.5 w-1.5 animate-ping rounded-full bg-purple-400" />
                  Loading venues…
                </div>
              )}

              {venuesError && !venuesLoading && (
                <p className="mt-4 text-xs text-amber-700">Couldn&apos;t load venues right now — you can still skip this step.</p>
              )}

              {!venuesLoading && venues.length > 0 && (
                <div className="mt-6 grid max-h-[340px] gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2">
                  {venues.map((v) => {
                    const img = storageUrl(v.image_path);
                    const isSelected = selectedVenue?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => chooseVenue(v)}
                        className={`group flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all duration-200 cursor-pointer ${
                          isSelected ? "border-[#8B31C7] bg-[#F5F0FF]/60" : "border-purple-100 bg-white hover:border-purple-300 hover:bg-purple-50/30"
                        }`}
                      >
                        <div className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${v.gradient}`}>
                          {img && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={img} alt={v.name} className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-[#2A1A33]">{v.name}</p>
                          <p className="truncate text-[11px] text-[#2A1A33]/55">{v.location} · {v.type}</p>
                          <p className="mt-0.5 text-xs font-semibold text-[#8B31C7]">{formatINR(v.price_from)}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-5 flex items-center justify-center gap-4">
                <button onClick={() => setStep(1)} className="text-xs text-[#2A1A33]/50 hover:text-[#8B31C7] transition-colors cursor-pointer">
                  ← Back
                </button>
                <button onClick={() => chooseVenue(null)} className="text-xs font-semibold text-[#8B31C7] underline underline-offset-2 hover:text-[#7a28b0] transition-colors cursor-pointer">
                  I haven&apos;t chosen a venue yet — skip
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Food ── */}
          {step === 3 && (
            <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" className="w-full max-w-md text-center">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B31C7]">Step 3 of 3</p>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#111827]">What&apos;s on the menu?</h3>
              <p className="mt-2 text-sm text-[#6B7280]">Choose your preferred food style.</p>

              <div className="mt-6 grid gap-3">
                {FOOD_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => finish(opt.label)}
                    className="flex items-center justify-between rounded-2xl border-2 border-purple-100 bg-white px-5 py-4 text-left transition-all duration-200 hover:border-[#8B31C7] hover:bg-[#F5F0FF]/40 cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#2A1A33]">{opt.label}</p>
                      <p className="mt-0.5 text-xs text-[#2A1A33]/55">{opt.desc}</p>
                    </div>
                    <svg className="h-4 w-4 flex-shrink-0 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep(2)} className="mt-5 text-xs text-[#2A1A33]/50 hover:text-[#8B31C7] transition-colors cursor-pointer">
                ← Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
