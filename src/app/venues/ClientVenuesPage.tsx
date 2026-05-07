"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { storageUrl, formatINR, type VenueRow } from "@/lib/supabase";

const regions = ["All", "Kochi", "Kumarakom", "Munnar", "Thekkady", "Wayanad", "Varkala"];

export default function ClientVenuesPage({ initialVenues, error }: { initialVenues: VenueRow[], error: string | null }) {
  const [filtered, setFiltered] = useState<VenueRow[]>(initialVenues);
  const [activeRegion, setActiveRegion] = useState("All");
  
  // Destination Modal State
  const [showModal, setShowModal] = useState(true);

  // Client-side filtering logic
  useEffect(() => {
    if (activeRegion === "All") {
      setFiltered(initialVenues);
    } else {
      setFiltered(initialVenues.filter((v) => v.region === activeRegion));
    }
  }, [activeRegion, initialVenues]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }} 
      className="relative w-full pb-24"
    >
      {/* 1. Destination Modal Popup */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2A1A33]/40 backdrop-blur-md px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center border border-rose-100"
            >
              <h2 className="font-display text-2xl font-semibold text-[#2A1A33] mb-2">Plan Your Dream</h2>
              <p className="text-sm text-[#2A1A33]/70 mb-8">Are you planning a wedding in your vicinity or a destination wedding?</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="rounded-2xl border border-rose-200 bg-rose-50 py-4 font-medium text-rose-700 hover:bg-rose-100 transition-colors"
                >
                  Nearby
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="rounded-2xl bg-gradient-to-br from-rose-500 to-indigo-500 py-4 font-medium text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-shadow"
                >
                  Destination
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-12 pb-16 sm:pt-20">
        <div className="wb-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">Venues</p>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.08] tracking-tight text-[#2A1A33] sm:text-6xl md:text-7xl text-balance">
              Kerala&apos;s most
              <span className="block wb-gradient-text italic pb-1">
                breathtaking venues.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#2A1A33]/70 sm:text-lg">
              Hand-picked estates across palaces, backwater resorts, and beachfront cliffs. Every venue vetted, every rate transparent, every date verified with the property.
            </p>
          </div>

          {/* Client-Side Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-12">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeRegion === r 
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 border-rose-500" 
                    : "bg-white border border-rose-200 text-[#2A1A33]/70 hover:border-rose-400"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="wb-container">
          {error && (
            <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
              Could not load venues: {error}. Did you run the schema SQL in Supabase? See <code className="px-1 bg-white rounded">supabase/README.md</code>.
            </div>
          )}

          {initialVenues.length === 0 && !error && (
            <div className="rounded-3xl border border-rose-200 bg-white/80 p-10 text-center">
              <p className="font-display text-2xl text-[#2A1A33]">No venues yet.</p>
              <p className="mt-3 text-sm text-[#2A1A33]/70">
                Paste <code className="px-1 bg-rose-50 rounded">supabase/schema.sql</code> into the Supabase SQL Editor, then run <code className="px-1 bg-rose-50 rounded">npm run db:seed</code>.
              </p>
            </div>
          )}

          {/* Venues Grid with Staggered Framer Motion */}
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((v) => {
                const imageUrl = storageUrl(v.image_path);
                const capacity = `${v.capacity_min} – ${v.capacity_max} guests`;
                return (
                  <motion.article
                    key={v.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="group relative overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${v.gradient} overflow-hidden`}>
                      {imageUrl ? (
                        <Image src={imageUrl} alt={v.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.7), transparent 50%), radial-gradient(circle at 70% 80%, rgba(232,115,155,0.22), transparent 50%)" }} />
                      )}
                      
                      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 z-10">
                        <span className="rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2A1A33] backdrop-blur-md">
                          {v.type}
                        </span>
                        {v.featured && (
                          <span className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/75 to-transparent p-5 pt-16 z-10">
                        <h3 className="font-display text-2xl font-medium leading-tight text-[#2A1A33]">{v.name}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#2A1A33]/70">
                          {v.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-[#2A1A33]/80">{v.tagline}</p>

                      <ul className="mt-4 space-y-1.5">
                        {v.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-xs text-[#2A1A33]/70 leading-relaxed">
                            <span className="text-emerald-600">✔</span> {h}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex items-end justify-between border-t border-rose-100 pt-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/45">From</p>
                          <p className="mt-0.5 font-display text-xl font-medium text-[#2A1A33] leading-tight">{formatINR(v.price_from)}</p>
                          <p className="mt-0.5 text-[11px] text-[#2A1A33]/50">{capacity}</p>
                        </div>
                        <Link href="/contact" className="group/btn inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 transition-all hover:bg-gradient-to-r hover:from-rose-500 hover:to-indigo-500 hover:text-white">
                          View →
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="pb-24">
        <div className="wb-container max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-indigo-50 p-10 sm:p-14 shadow-[0_30px_80px_-30px_rgba(232,115,155,0.5)]">
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-3xl font-medium tracking-tight text-[#2A1A33] sm:text-4xl text-balance leading-tight">
                  Can&apos;t pick? Let the AI decide.
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#2A1A33]/70">
                  Tell the concierge your date, budget, and guest count — get a shortlist of three venues with real availability in under thirty seconds.
                </p>
              </div>
              <Link href="/#wb-chat" className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(232,115,155,0.7)] transition-all hover:-translate-y-0.5">
                Ask the concierge →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
