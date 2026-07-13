"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { storageUrl, formatINR, type VendorRow } from "@/lib/supabase";

type Category = "Photographers" | "Caterers" | "Decorators" | "Makeup Artists";

const categories: { name: Category; icon: React.ReactNode; blurb: string }[] = [
  { name: "Photographers", blurb: "Film, candid, editorial — storytellers who keep your day in motion.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z" /> },
  { name: "Caterers", blurb: "Sadya to Thalassery biryani — masters of the Kerala feast.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7h18M3 12h18M3 17h18 M7 3v18 M17 3v18" /> },
  { name: "Decorators", blurb: "Florals, mandaps, and scenography that feel curated, never cluttered.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /> },
  { name: "Makeup Artists", blurb: "Bridal glam from HD airbrush to the dewy, editorial, modern bride.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3 M3 13h18 M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
];

const CATEGORY_TAG_COLORS: Record<Category, { activeBg: string; activeIconBg: string; activeIcon: string; activeBorder: string; hoverBorder: string; hoverBg: string; textColor: string; textActive: string }> = {
  Photographers: {
    activeBg: "bg-[#FDF2F8]/70 border-pink-200",
    activeIconBg: "bg-pink-500",
    activeIcon: "text-white",
    activeBorder: "border-pink-300",
    hoverBorder: "hover:border-pink-200",
    hoverBg: "hover:bg-pink-50/40",
    textColor: "text-pink-600",
    textActive: "text-pink-900",
  },
  Caterers: {
    activeBg: "bg-[#FFFBEB]/70 border-amber-200",
    activeIconBg: "bg-amber-500",
    activeIcon: "text-white",
    activeBorder: "border-amber-300",
    hoverBorder: "hover:border-amber-200",
    hoverBg: "hover:bg-amber-50/40",
    textColor: "text-amber-600",
    textActive: "text-amber-900",
  },
  Decorators: {
    activeBg: "bg-[#F0FDF4]/70 border-emerald-200",
    activeIconBg: "bg-emerald-500",
    activeIcon: "text-white",
    activeBorder: "border-emerald-300",
    hoverBorder: "hover:border-emerald-200",
    hoverBg: "hover:bg-emerald-50/40",
    textColor: "text-emerald-600",
    textActive: "text-emerald-900",
  },
  "Makeup Artists": {
    activeBg: "bg-[#F5F0FF]/70 border-purple-200",
    activeIconBg: "bg-purple-500",
    activeIcon: "text-white",
    activeBorder: "border-purple-300",
    hoverBorder: "hover:border-purple-200",
    hoverBg: "hover:bg-purple-50/40",
    textColor: "text-purple-600",
    textActive: "text-purple-900",
  },
};

export default function VendorsClient({ vendors, error }: { vendors: VendorRow[]; error: string | null }) {
  const [active, setActive] = useState<Category>("Photographers");
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  function markImgError(id: string) {
    setImgErrors((prev) => new Set(prev).add(id));
  }

  const grouped = useMemo(() => {
    const g: Record<Category, VendorRow[]> = { Photographers: [], Caterers: [], Decorators: [], "Makeup Artists": [] };
    for (const v of vendors) {
      if (v.category in g) g[v.category as Category].push(v);
    }
    return g;
  }, [vendors]);

  const filtered = grouped[active];
  const activeColor = CATEGORY_TAG_COLORS[active];

  return (
    <div className="relative w-full">
      {/* HEADER */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 bg-gradient-to-b from-[#FFFAF0] via-[#FEF9F3] to-white relative overflow-hidden border-b border-purple-100">
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
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8B31C7] animate-wb-fade-up">Vendors</p>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight text-[#2A1A33] text-balance animate-wb-fade-up wb-delay-100">
              Kerala&apos;s finest,
              <span className="block wb-gradient-text italic animate-wb-shimmer pb-1">
                personally vetted.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#2A1A33]/70 animate-wb-fade-up wb-delay-200">
              Vendors across four categories, each reviewed in person by our Kerala team. Transparent pricing, honest reviews, no kickbacks — just the best people, introduced directly.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => {
              const isActive = c.name === active;
              const col = CATEGORY_TAG_COLORS[c.name];
              return (
                <button
                  key={c.name}
                  onClick={() => setActive(c.name)}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 animate-wb-fade-up cursor-pointer hover:-translate-y-0.5 ${
                    isActive
                      ? `${col.activeBg} ${col.activeBorder} shadow-sm`
                      : `border-purple-100 bg-white/80 ${col.hoverBorder} ${col.hoverBg}`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? `${col.activeIconBg} ${col.activeIcon} shadow-sm`
                          : `bg-purple-50 ${col.textColor} group-hover:bg-purple-100/50`
                      }`}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {c.icon}
                      </svg>
                    </div>
                    <h3 className={`font-display font-bold leading-tight ${isActive ? col.textActive : "text-[#2A1A33]/80"}`}>{c.name}</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#2A1A33]/65">{c.blurb}</p>
                  <p className={`mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] ${isActive ? col.textColor : "text-[#2A1A33]/45"}`}>
                    {grouped[c.name].length} vendors
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-36 pt-20 sm:pt-28">
        <div className="wb-container">
          {error && (
            <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
              Could not load vendors: {error}. Run the schema SQL in Supabase then <code className="px-1 bg-white rounded">npm run db:seed</code>.
            </div>
          )}

          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#2A1A33] leading-tight">{active}</h2>
              <p className="mt-1 text-sm text-[#2A1A33]/65">{filtered.length} curated · sorted by concierge rank</p>
            </div>
            <div className="hidden items-center gap-2 text-xs text-emerald-600 font-semibold sm:flex">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All availability live-synced
            </div>
          </div>

          {filtered.length === 0 && !error && (
            <div className="rounded-3xl border border-purple-100 bg-white/80 p-10 text-center">
              <p className="font-display text-2xl text-[#2A1A33]">No {active.toLowerCase()} yet.</p>
              <p className="mt-3 text-sm text-[#2A1A33]/70">
                Paste <code className="px-1 bg-rose-50 rounded">supabase/schema.sql</code> into Supabase SQL Editor, then run <code className="px-1 bg-rose-50 rounded">npm run db:seed</code>.
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((v, idx) => {
              const imageUrl = storageUrl(v.image_path);
              return (
                <article
                  key={v.id}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className={`group relative overflow-hidden rounded-3xl border bg-white/90 shadow-[0_10px_40px_-24px_rgba(139,49,199,0.2)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(139,49,199,0.3)] animate-wb-fade-up ${activeColor.activeBorder}`}
                >
                  <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${v.gradient}`}>
                    {imageUrl && !imgErrors.has(v.id) ? (
                      <Image
                        src={imageUrl}
                        alt={v.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={() => markImgError(v.id)}
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-60"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 35% 25%, rgba(255,255,255,0.6), transparent 55%), radial-gradient(circle at 75% 85%, rgba(232,115,155,0.18), transparent 50%)",
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-[7rem] font-medium text-white/80 leading-none drop-shadow-sm transition-transform duration-700 group-hover:scale-110">
                            {v.initials}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 z-10">
                      {v.verified ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2A1A33] backdrop-blur-md">
                          <svg className="h-3 w-3 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      ) : <span />}
                      {v.featured && (
                        <span className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
                          ★ Top pick
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent p-4 pt-12 z-10">
                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 leading-tight">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                        </svg>
                        {Number(v.rating).toFixed(1)}
                        <span className="font-normal text-[#2A1A33]/55">· {v.reviews} reviews</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold leading-tight text-[#2A1A33]">{v.name}</h3>
                    <p className="mt-1.5 text-xs text-[#2A1A33]/55">{v.location}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#2A1A33]/80">{v.tagline}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {v.specialties.map((s) => (
                        <span
                          key={s}
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${activeColor.activeBg} ${activeColor.textColor}`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-end justify-between border-t border-purple-100 pt-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/45">From</p>
                        <p className="mt-0.5 font-sans text-lg font-bold text-[#2A1A33] leading-tight">{formatINR(v.price_from)}</p>
                        <p className="text-[11px] text-[#2A1A33]/50">{v.price_unit}</p>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-2 text-xs font-bold text-[#8B31C7] transition-all hover:bg-gradient-to-r hover:from-[#8B31C7] hover:to-fuchsia-600 hover:text-white"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Image Section Break ── */}
      <section className="py-8 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-md group">
            <Image
              src="/images/kerala_beach_reception.png"
              alt="Beachfront Varkala Reception Setup"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-pink-300 mb-2">Destinations · Beachfront Reception</span>
              <h4 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold text-white leading-tight max-w-xl">
                Breathtaking beachfront decorations and stage setups.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (Stage 2 Dark Premium) */}
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
                <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-black text-white text-balance leading-tight">
                  Need a dream team in thirty seconds?
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-purple-200/70">
                  The concierge pairs your photographer, caterer, décor, and makeup — matched to your venue and budget, in a single conversation.
                </p>
              </div>
              <Link
                href="/#wb-chat"
                className="group inline-flex flex-shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Build my dream team
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

