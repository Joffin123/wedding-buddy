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
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  function markImgError(id: string) {
    setImgErrors((prev) => new Set(prev).add(id));
  }

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
              className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center border border-purple-100"
            >
              <h2 className="font-display text-2xl font-bold text-[#2A1A33] mb-2">Plan Your Dream</h2>
              <p className="text-sm text-[#2A1A33]/70 mb-8">Are you planning a wedding in your vicinity or a destination wedding?</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="rounded-2xl border border-purple-100 bg-[#F5F0FF] py-4 font-semibold text-[#8B31C7] hover:bg-[#F5F0FF]/80 hover:border-[#8B31C7] transition-all cursor-pointer"
                >
                  Nearby
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="rounded-2xl bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 py-4 font-semibold text-white shadow-md shadow-purple-500/20 hover:shadow-lg transition-all cursor-pointer"
                >
                  Destination
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="pt-20 pb-20 sm:pt-28 sm:pb-28 bg-gradient-to-b from-[#FFFAF0] via-[#FEF9F3] to-white relative overflow-hidden border-b border-purple-100">
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
          <Image
            src="/wedding-buddy-logo.png"
            alt=""
            width={650}
            height={650}
            className="opacity-[0.035] scale-125 object-contain"
          />
        </div>
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-rose-200/10 blur-3xl animate-wb-drift pointer-events-none" />
        <div className="absolute bottom-5 right-5 h-64 w-64 rounded-full bg-indigo-200/10 blur-3xl animate-wb-float-slow pointer-events-none" />
        <div className="wb-container relative z-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8B31C7]">Venues</p>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-extrabold leading-[1.08] tracking-tight text-[#2A1A33] text-balance">
              Kerala&apos;s most
              <span className="block wb-gradient-text italic pb-1">
                breathtaking venues.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#2A1A33]/70">
              Hand-picked estates across palaces, backwater resorts, and beachfront cliffs. Every venue vetted, every rate transparent, every date verified with the property.
            </p>
          </div>

          {/* Client-Side Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mt-12">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`rounded-full px-6 py-2.5 text-base font-bold transition-all duration-200 cursor-pointer ${
                  activeRegion === r 
                    ? "bg-[#8B31C7] text-white shadow-md shadow-purple-500/20 border-[#8B31C7]" 
                    : "bg-white border border-purple-100 text-[#2A1A33]/70 hover:border-[#8B31C7] hover:text-[#8B31C7]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-36 pt-20 sm:pt-28">
        <div className="wb-container">
          {error && (
            <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
              Could not load venues: {error}. Did you run the schema SQL in Supabase? See <code className="px-1 bg-white rounded">supabase/README.md</code>.
            </div>
          )}

          {initialVenues.length === 0 && !error && (
            <div className="rounded-3xl border border-purple-100 bg-white/80 p-10 text-center">
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
                    className="group relative overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${v.gradient} overflow-hidden`}>
                      {imageUrl && !imgErrors.has(v.id) ? (
                        <Image src={imageUrl} alt={v.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" onError={() => markImgError(v.id)} />
                      ) : (
                        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.7), transparent 50%), radial-gradient(circle at 70% 80%, rgba(232,115,155,0.22), transparent 50%)" }} />
                      )}
                      
                      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 z-10">
                        <span className="rounded-full border border-purple-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2A1A33] backdrop-blur-md">
                          {v.type}
                        </span>
                        {v.featured && (
                          <span className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/75 to-transparent p-5 pt-16 z-10">
                        <h3 className="font-display text-2xl font-bold leading-tight text-[#2A1A33]">{v.name}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#2A1A33]/70">
                          {v.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-base leading-relaxed text-[#2A1A33]/80">{v.tagline}</p>

                      <ul className="mt-4 space-y-2">
                        {v.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-[#2A1A33]/70 leading-relaxed">
                            <span className="text-[#8B31C7] font-bold">✓</span> {h}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex items-end justify-between border-t border-purple-100 pt-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/45">From</p>
                          <p className="mt-0.5 font-sans text-2xl font-black text-[#2A1A33] leading-tight">{formatINR(v.price_from)}</p>
                          <p className="mt-0.5 text-xs text-[#2A1A33]/50">{capacity}</p>
                        </div>
                        <Link href="/contact" className="group/btn inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-4.5 py-2 text-xs font-bold text-[#8B31C7] transition-all hover:bg-gradient-to-r hover:from-[#8B31C7] hover:to-fuchsia-600 hover:text-white cursor-pointer">
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

      {/* ── Image Section Break ── */}
      <section className="py-8 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-md group">
            <Image
              src="/images/kerala_backwater_wedding.png"
              alt="Kumarakom Destination Wedding Setup"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300 mb-2">Backwaters · Lake Resorts</span>
              <h4 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight max-w-xl">
                Kerala backwater resorts, verified availability and pricing.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip (Stage 2 Dark Premium) */}
      <section className="pb-24 pt-10 bg-[#0E071A]">
        <div className="wb-container max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#3E2568]/45 bg-gradient-to-br from-[#1A0E2E] via-[#0E071A] to-[#120B24] p-10 sm:p-14 shadow-lg">
            {/* Background logo watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
              <Image
                src="/wedding-buddy-logo.png"
                alt=""
                width={500}
                height={500}
                className="opacity-[0.02] invert scale-110 object-contain"
              />
            </div>
            <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-purple-950/40 blur-3xl animate-wb-drift" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-indigo-950/40 blur-3xl animate-wb-float-slow" />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between z-10">
              <div>
                <h3 className="font-display text-3xl font-black text-white sm:text-4xl text-balance leading-tight">
                  Can&apos;t pick? Let the AI decide.
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-purple-200/70">
                  Tell the concierge your date, budget, and guest count — get a shortlist of three venues with real availability in under thirty seconds.
                </p>
              </div>
              <Link href="/#wb-chat" className="group inline-flex flex-shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5 cursor-pointer">
                Ask the concierge →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
