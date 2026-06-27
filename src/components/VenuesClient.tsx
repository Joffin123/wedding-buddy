"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { formatINR, storageUrl, type VenueRow } from "@/lib/supabase";

// ─── Filter constants ─────────────────────────────────────────────────────────

const REGIONS = ["All Kerala", "Kochi", "Kumarakom", "Munnar", "Thekkady", "Wayanad", "Varkala", "Thiruvananthapuram"];
const TYPES = ["All Types", "Palace", "Resort", "Beachfront", "Heritage", "Estate", "Houseboat"];

const PRICE_BANDS = [
  { label: "Any budget", min: 0, max: Infinity },
  { label: "Under ₹5L", min: 0, max: 500000 },
  { label: "₹5L – ₹15L", min: 500000, max: 1500000 },
  { label: "₹15L – ₹30L", min: 1500000, max: 3000000 },
  { label: "₹30L+", min: 3000000, max: Infinity },
];

const CAPACITY_BANDS = [
  { label: "Any size", min: 0, max: Infinity },
  { label: "Up to 100", min: 0, max: 100 },
  { label: "100 – 300", min: 100, max: 300 },
  { label: "300 – 500", min: 300, max: 500 },
  { label: "500+", min: 500, max: Infinity },
];

// ─── Destination Modal ────────────────────────────────────────────────────────

function DestinationModal({ onSelect }: { onSelect: (type: "local" | "destination") => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onSelect("local")}
        className="absolute inset-0 bg-[#2A1A33]/40 backdrop-blur-sm"
      />

      {/* Modal card */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border border-rose-200/80 bg-white shadow-[0_40px_100px_-30px_rgba(232,115,155,0.6)]"
      >
        {/* Decorative background blooms */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br from-rose-300/40 to-indigo-300/30 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-gradient-to-br from-amber-300/30 to-rose-200/30 blur-2xl" />
        </div>

        <div className="relative px-8 py-10 text-center">
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500 shadow-lg shadow-rose-500/30">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <h2 className="font-display text-2xl font-medium text-[#2A1A33] sm:text-3xl text-balance leading-tight">
            What kind of wedding are you planning?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#2A1A33]/65">
            This helps us surface the most relevant venues for your celebration.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* Local */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect("local")}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-white px-5 py-6 text-left transition-all hover:border-rose-400 hover:shadow-[0_12px_40px_-16px_rgba(232,115,155,0.5)]"
            >
              <span className="text-4xl">🏡</span>
              <div className="text-center">
                <p className="text-sm font-bold text-[#2A1A33]">Wedding in My Vicinity</p>
                <p className="mt-1 text-xs leading-relaxed text-[#2A1A33]/60">Local venues close to home — familiar, accessible, intimate</p>
              </div>
            </motion.button>

            {/* Destination */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect("destination")}
              className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white px-5 py-6 text-left transition-all hover:border-indigo-400 hover:shadow-[0_12px_40px_-16px_rgba(109,90,230,0.4)]"
            >
              <span className="text-4xl">✈️</span>
              <div className="text-center">
                <p className="text-sm font-bold text-[#2A1A33]">Destination Wedding</p>
                <p className="mt-1 text-xs leading-relaxed text-[#2A1A33]/60">Iconic backwater estates, hill retreats, and beachfront gems</p>
              </div>
            </motion.button>
          </div>

          <button
            onClick={() => onSelect("local")}
            className="mt-6 text-xs text-[#2A1A33]/45 underline underline-offset-2 hover:text-[#2A1A33]/70 transition-colors"
          >
            Skip — show me everything
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
        active
          ? "border-rose-400 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 text-white shadow-md"
          : "border-rose-200 bg-white/80 text-[#2A1A33]/80 hover:border-rose-400 hover:bg-white hover:text-rose-700"
      }`}
    >
      {label}
    </motion.button>
  );
}

// ─── Main venues client component ────────────────────────────────────────────

export default function VenuesClient({ venues }: { venues: VenueRow[] }) {
  const [showModal, setShowModal] = useState(true);
  const [weddingType, setWeddingType] = useState<"local" | "destination" | null>(null);

  // Filter state
  const [activeRegion, setActiveRegion] = useState("All Kerala");
  const [activeType, setActiveType] = useState("All Types");
  const [activePriceBand, setActivePriceBand] = useState(0); // index into PRICE_BANDS
  const [activeCapBand, setActiveCapBand] = useState(0); // index into CAPACITY_BANDS

  function handleModalSelect(type: "local" | "destination") {
    setWeddingType(type);
    setShowModal(false);
    // Pre-filter for destination: highlight resort/beachfront/estate types
    if (type === "destination") {
      setActiveType("All Types");
    }
  }

  const filteredVenues = useMemo(() => {
    const price = PRICE_BANDS[activePriceBand];
    const cap = CAPACITY_BANDS[activeCapBand];

    return venues.filter((v) => {
      if (activeRegion !== "All Kerala" && v.region !== activeRegion) return false;
      if (activeType !== "All Types" && v.type !== activeType) return false;
      if (v.price_from < price.min || v.price_from > price.max) return false;
      if (v.capacity_max < cap.min) return false;
      if (cap.max !== Infinity && v.capacity_min > cap.max) return false;
      // For destination weddings, deprioritise (but don't hide) generic Resort types —
      // actually just show all and let the user filter. The type info is in the badge.
      return true;
    });
  }, [venues, activeRegion, activeType, activePriceBand, activeCapBand]);

  const hasActiveFilters =
    activeRegion !== "All Kerala" ||
    activeType !== "All Types" ||
    activePriceBand !== 0 ||
    activeCapBand !== 0;

  function clearFilters() {
    setActiveRegion("All Kerala");
    setActiveType("All Types");
    setActivePriceBand(0);
    setActiveCapBand(0);
  }

  return (
    <>
      {/* Destination modal */}
      <AnimatePresence>{showModal && <DestinationModal onSelect={handleModalSelect} />}</AnimatePresence>

      {/* Wedding-type banner (shown after selection) */}
      <AnimatePresence>
        {weddingType && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-100 bg-white/80 px-5 py-3 text-sm"
          >
            <span>{weddingType === "destination" ? "✈️" : "🏡"}</span>
            <span className="font-semibold text-[#2A1A33]">
              {weddingType === "destination" ? "Destination Wedding" : "Local Wedding"}
            </span>
            <span className="text-[#2A1A33]/55">— showing all venues. Use filters to narrow down.</span>
            <button
              onClick={() => setShowModal(true)}
              className="ml-auto text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition-colors underline underline-offset-2"
            >
              Change
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Filters ── */}
      <div className="space-y-4 animate-wb-fade-up wb-delay-300">
        {/* Region */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50">Region</p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <FilterChip key={r} label={r} active={activeRegion === r} onClick={() => setActiveRegion(r)} />
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50">Type</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <FilterChip key={t} label={t} active={activeType === t} onClick={() => setActiveType(t)} />
            ))}
          </div>
        </div>

        {/* Price range + capacity — second row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50">Price Range</p>
            <div className="flex flex-wrap gap-2">
              {PRICE_BANDS.map((b, i) => (
                <FilterChip key={b.label} label={b.label} active={activePriceBand === i} onClick={() => setActivePriceBand(i)} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50">Guest Capacity</p>
            <div className="flex flex-wrap gap-2">
              {CAPACITY_BANDS.map((b, i) => (
                <FilterChip key={b.label} label={b.label} active={activeCapBand === i} onClick={() => setActiveCapBand(i)} />
              ))}
            </div>
          </div>
        </div>

        {/* Results count + clear */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-xs text-[#2A1A33]/55">
            Showing <span className="font-bold text-[#2A1A33]">{filteredVenues.length}</span> of {venues.length} venues
          </span>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="rounded-full border border-rose-200 bg-white px-3 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              ✕ Clear filters
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Venue grid ── */}
      <div className="mt-10">
        <AnimatePresence mode="popLayout">
          {filteredVenues.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-rose-200 bg-white/80 p-12 text-center"
            >
              <p className="font-display text-2xl text-[#2A1A33]">No venues match these filters.</p>
              <p className="mt-3 text-sm text-[#2A1A33]/65">Try broadening your region, budget, or capacity range.</p>
              <button onClick={clearFilters} className="mt-5 rounded-full bg-rose-50 px-5 py-2 text-sm font-bold text-rose-700 hover:bg-rose-100 transition-colors">
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVenues.map((v, idx) => {
                const imageUrl = storageUrl(v.image_path);
                const capacity = `${v.capacity_min} – ${v.capacity_max} guests`;
                return (
                  <motion.article
                    key={v.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -8 }}
                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 280, damping: 24 }}
                    className="group relative overflow-hidden rounded-3xl border border-rose-100 bg-white/90 shadow-[0_10px_40px_-24px_rgba(232,115,155,0.4)] backdrop-blur-sm transition-shadow duration-500 hover:border-rose-300 hover:shadow-[0_24px_60px_-24px_rgba(232,115,155,0.55)]"
                  >
                    <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${v.gradient}`}>
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={v.name}
                          fill
                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <>
                          <div
                            className="absolute inset-0 opacity-70"
                            style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.7), transparent 50%), radial-gradient(circle at 70% 80%, rgba(232,115,155,0.22), transparent 50%)" }}
                          />
                          <svg className="absolute inset-0 h-full w-full text-white/70 transition-transform duration-700 group-hover:scale-105" viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
                            <path d="M0 220 L80 170 L140 200 L200 150 L260 180 L320 140 L400 170 L400 300 L0 300 Z" fill="currentColor" />
                            <path d="M0 250 L60 230 L120 245 L200 220 L280 240 L360 220 L400 235 L400 300 L0 300 Z" fill="currentColor" opacity="0.6" />
                            <circle cx="340" cy="60" r="20" fill="currentColor" opacity="0.7" />
                          </svg>
                        </>
                      )}

                      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">
                        <span className="rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2A1A33] backdrop-blur-md">{v.type}</span>
                        {v.featured && (
                          <span className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md">★ Featured</span>
                        )}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white via-white/75 to-transparent p-5 pt-16">
                        <h3 className="font-display text-2xl font-medium leading-tight text-[#2A1A33]">{v.name}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#2A1A33]/70">
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {v.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-[#2A1A33]/80">{v.tagline}</p>
                      <ul className="mt-4 space-y-1.5">
                        {v.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-xs leading-relaxed text-[#2A1A33]/70">
                            <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex items-end justify-between border-t border-rose-100 pt-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/45">From</p>
                          <p className="mt-0.5 font-sans text-xl font-medium text-[#2A1A33] leading-tight">{formatINR(v.price_from)}</p>
                          <p className="mt-0.5 text-[11px] text-[#2A1A33]/50">{capacity}</p>
                        </div>
                        <Link
                          href="/contact"
                          className="group/btn inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 transition-all hover:bg-gradient-to-r hover:from-rose-500 hover:to-indigo-500 hover:text-white"
                        >
                          View
                          <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
