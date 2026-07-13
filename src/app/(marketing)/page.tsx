"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InlineChat from "@/components/InlineChat";

const SERVICE_TYPES = [
  {
    id: "designation-wedding",
    label: "Designation Wedding",
    description: "Resorts, beachside backwaters, and heritage properties perfect for a scenic getaway celebration.",
    emoji: "🌴",
    bgColor: "bg-[#FEF3E2]/60",
    hoverBg: "hover:bg-[#FEF3E2] hover:border-[#FDBA74]",
    selectedBg: "border-[#8B31C7] bg-[#FEF3E2] shadow-sm shadow-[#FEF3E2]",
    iconColor: "text-amber-600 bg-white/95 border border-amber-100",
  },
  {
    id: "traditional-wedding",
    label: "Traditional Wedding",
    description: "Convention centers, auditorium halls, and traditional venues equipped for large gatherings and grand Sadyas.",
    emoji: "🛕",
    bgColor: "bg-[#FCE7F3]/60",
    hoverBg: "hover:bg-[#FCE7F3] hover:border-[#F9A8D4]",
    selectedBg: "border-[#8B31C7] bg-[#FCE7F3] shadow-sm shadow-[#FCE7F3]",
    iconColor: "text-pink-600 bg-white/95 border border-pink-100",
  },
  {
    id: "wedding-reception",
    label: "Wedding Reception",
    description: "Premium banquet halls, open-air lawns, and hotel ballrooms designed for evening parties and entertainment.",
    emoji: "✨",
    bgColor: "bg-[#F5F0FF]/60",
    hoverBg: "hover:bg-[#F5F0FF] hover:border-[#C084FC]",
    selectedBg: "border-[#8B31C7] bg-[#F5F0FF] shadow-sm shadow-[#F5F0FF]",
    iconColor: "text-purple-600 bg-white/95 border border-purple-100",
  },
  {
    id: "engagement",
    label: "Engagement",
    description: "Mini halls, boutique venues, and intimate spaces tailored for close-knit family gatherings.",
    emoji: "💍",
    bgColor: "bg-[#EFF6FF]/60",
    hoverBg: "hover:bg-[#EFF6FF] hover:border-[#93C5FD]",
    selectedBg: "border-[#8B31C7] bg-[#EFF6FF] shadow-sm shadow-[#EFF6FF]",
    iconColor: "text-blue-600 bg-white/95 border border-blue-100",
  },
];

const FEATURES = [
  {
    label: "Venue discoverer",
    description: "Search 47 venues across 14 Kerala districts. Filter by style, price per person, or flat hall hire rates.",
    href: "/venues",
    tag: "14 districts",
    emoji: "🏰",
    bgColor: "bg-[#EFF6FF]/65 hover:bg-[#EFF6FF]",
    borderColor: "border-[#EFF6FF] hover:border-blue-300",
    tagColor: "border-blue-200 bg-blue-50 text-blue-800",
    iconColor: "text-blue-600 bg-white/95 border border-blue-100",
  },
  {
    label: "Budget builder",
    description: "50+ line items pre-filled with Kerala wedding averages. Edit, track actuals, and export to Excel.",
    href: "/budget",
    tag: "Excel export",
    emoji: "📊",
    bgColor: "bg-[#F0FDF4]/65 hover:bg-[#F0FDF4]",
    borderColor: "border-[#F0FDF4] hover:border-emerald-300",
    tagColor: "border-emerald-200 bg-emerald-50 text-emerald-800",
    iconColor: "text-emerald-600 bg-white/95 border border-emerald-100",
  },
  {
    label: "Vendor directory",
    description: "Photographers, caterers, decorators, and makeup artists — vetted and categorised.",
    href: "/vendors",
    tag: "4 categories",
    emoji: "📸",
    bgColor: "bg-[#FFFBEB]/65 hover:bg-[#FFFBEB]",
    borderColor: "border-[#FFFBEB] hover:border-amber-300",
    tagColor: "border-amber-200 bg-amber-50 text-amber-800",
    iconColor: "text-amber-600 bg-white/95 border border-amber-100",
  },
  {
    label: "AI concierge",
    description: "Ask anything about Kerala weddings — muhurtham timings, Sadya menus, venue comparisons.",
    href: "/",
    tag: "AI-powered",
    emoji: "✨",
    bgColor: "bg-[#F5F0FF]/65 hover:bg-[#F5F0FF]",
    borderColor: "border-[#F5F0FF] hover:border-purple-300",
    tagColor: "border-purple-200 bg-purple-50 text-purple-800",
    iconColor: "text-purple-600 bg-white/95 border border-purple-100",
  },
];

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(id: string) {
    setSelected(id);
    setTimeout(() => router.push(`/venues?type=${id}`), 160);
  }

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <section className="border-b border-purple-100 bg-gradient-to-b from-[#FFFAF0] via-[#FEF9F3] to-white py-24 sm:py-36 relative overflow-hidden">
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
          <Image
            src="/wedding-buddy-logo.png"
            alt=""
            width={650}
            height={650}
            className="opacity-[0.035] scale-125 object-contain"
            priority
          />
        </div>
        {/* Background decorative floaters */}
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl animate-wb-drift pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-200/10 blur-3xl animate-wb-float-slow pointer-events-none" />
        
        <div className="wb-container relative z-10">
          {/* Label */}
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B31C7] mb-6 animate-wb-fade-up">Kerala Wedding Planning</p>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[#111827] leading-[1.05] animate-wb-fade-up wb-delay-100">
            What kind of event<br />
            <span className="text-[#8B31C7] italic">are you planning?</span>
          </h1>

          <p className="mt-6 text-[#6B7280] text-base sm:text-lg leading-relaxed max-w-xl animate-wb-fade-up wb-delay-200">
            Choose your wedding type to discover venues, compare pricing, and build your complete budget.
          </p>

          {/* Service cards */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl animate-wb-fade-up wb-delay-300">
            {SERVICE_TYPES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSelect(s.id)}
                className={`group text-left rounded-2xl border p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full hover:-translate-y-1.5
                  ${selected === s.id
                    ? s.selectedBg
                    : `${s.bgColor} border-purple-100 ${s.hoverBg} hover:shadow-md`
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-sm transition-transform group-hover:scale-110 ${s.iconColor}`}>
                      {s.emoji}
                    </span>
                    <svg
                      className={`h-5 w-5 flex-shrink-0 transition-colors ${
                        selected === s.id ? "text-[#8B31C7]" : "text-[#D1D5DB] group-hover:text-[#8B31C7]"
                      }`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#111827] mb-2">{s.label}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{s.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Quick links */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 animate-wb-fade-up wb-delay-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">Or jump to</span>
            {[
              { href: "/venues",  label: "Browse venues"   },
              { href: "/budget",  label: "Budget builder"  },
              { href: "/vendors", label: "Find vendors"    },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base font-bold text-[#6B7280] underline underline-offset-4 decoration-purple-200 hover:text-[#8B31C7] hover:decoration-[#8B31C7] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image Section Break 1 ── */}
      <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[320px] sm:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-lg group">
            <Image
              src="/images/traditional_kerala_marriage.png"
              alt="Traditional Kerala Wedding Ceremony"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300 mb-2">Heritage · Courtyard Ceremony</span>
              <h3 className="font-display text-xl sm:text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl">
                Honoring timeless traditions with a touch of modern grace.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Concierge (Stage 2 Dark Premium) ── */}
      <section className="py-28 sm:py-40 bg-gradient-to-tr from-[#1A0E2E] via-[#0E071A] to-[#120B24] border-y border-[#3E2568]/40 relative overflow-hidden">
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
          <Image
            src="/wedding-buddy-logo.png"
            alt=""
            width={700}
            height={700}
            className="opacity-[0.025] invert scale-125 object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,49,199,0.15)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="wb-container max-w-3xl relative z-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-400 mb-4 animate-wb-fade-up">AI Wedding Concierge</p>
          <h2 className="font-display text-xl sm:text-3xl md:text-5xl font-black text-white mb-4 animate-wb-fade-up wb-delay-100">
            Meet your planning assistant
          </h2>
          <p className="text-base sm:text-lg text-purple-200/70 mb-10 leading-relaxed max-w-xl mx-auto animate-wb-fade-up wb-delay-200">
            Tell us about your wedding and get personalised venue picks, vendor suggestions, and Kerala-specific guidance — in English or Malayalam.
          </p>
          <div className="text-left animate-wb-fade-up wb-delay-300">
            <InlineChat />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-28 sm:py-40 border-b border-purple-100 bg-gradient-to-b from-white via-[#F0F9FF]/40 to-[#FFF1F2]/20">
        <div className="wb-container">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B31C7] mb-10">What you can do</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className={`group rounded-3xl border p-8 flex flex-col gap-6 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 ${f.bgColor} ${f.borderColor}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm ${f.iconColor}`}>
                      {f.emoji}
                    </span>
                    <p className="font-display font-bold text-[#111827] text-lg leading-tight">{f.label}</p>
                  </div>
                  <span className={`flex-shrink-0 rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${f.tagColor}`}>
                    {f.tag}
                  </span>
                </div>
                <p className="text-base text-[#6B7280] leading-relaxed flex-1">{f.description}</p>
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#8B31C7] group-hover:gap-2.5 transition-all mt-2">
                  Learn more
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image Section Break 2 ── */}
      <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[320px] sm:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-lg group">
            <Image
              src="/images/kerala_beach_reception.png"
              alt="Beachfront Wedding Reception"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-pink-300 mb-2">Destinations · Beachfront Reception</span>
              <h3 className="font-display text-xl sm:text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl">
                Sunset receptions on Varkala cliffs, curated in under thirty seconds.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-28 sm:py-40 border-b border-purple-100 bg-gradient-to-b from-[#FEF9F3] via-white to-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-px bg-rose-100/50 -z-10" />
        <div className="wb-container">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B31C7] mb-10">How it works</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl">
            {[
              { n: "1", title: "Pick your type", body: "Select Designation, Traditional, Reception, or Engagement — every suggestion is tailored to your choice." },
              { n: "2", title: "Explore venues",  body: "Browse 14 Kerala districts. Click a venue to see each hall with real pricing — per person or flat rate." },
              { n: "3", title: "Build a budget",  body: "Edit 50+ pre-filled items, track actuals, then export a clean Excel sheet to share with family." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-purple-100 bg-white/80 p-8 hover:shadow-md hover:border-purple-300 hover:-translate-y-1.5 transition-all duration-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F0FF] text-sm font-bold text-[#8B31C7] mb-6 shadow-sm">
                  {s.n}
                </span>
                <p className="font-display font-bold text-[#111827] text-lg mb-2">{s.title}</p>
                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image Section Break 3 ── */}
      <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[320px] sm:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-lg group">
            <Image
              src="/images/kerala_backwater_wedding.png"
              alt="Backwater Wedding Setup"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300 mb-2">Backwaters · Luxury Resorts</span>
              <h3 className="font-display text-xl sm:text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl">
                Serene houseboat celebrations and floral mandaps.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-28 sm:py-40 border-b border-purple-100 bg-gradient-to-b from-white to-[#FFFAF0]/50">
        <div className="wb-container max-w-2xl">
          <div className="rounded-3xl border border-rose-100 bg-white/90 p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-[7rem] text-[#8B31C7]/5 font-serif leading-none select-none pointer-events-none">
              “
            </div>
            <div className="flex items-start gap-3 mb-6">
              <svg className="h-6 w-6 text-[#F59E0B] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.3 5.2C8.5 5.2 6 7 6 10.3v8.5h8.5v-8H9.2c0-2 1-3.5 2.1-3.5V5.2zm8.2 0c-2.8 0-5.3 1.8-5.3 5.1v8.5H22.7v-8h-5.3c0-2 1-3.5 2.1-3.5V5.2z" />
              </svg>
            </div>
            <p className="text-[#111827] text-lg sm:text-xl leading-relaxed font-semibold font-serif italic text-balance">
              Wedding Buddy planned our Kumarakom ceremony in nine days. Found us a houseboat, a Sadya caterer, and a photographer who understood our families — all within budget.
            </p>
            <div className="mt-8 flex items-center gap-3.5 pt-6 border-t border-purple-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B31C7] text-xs font-bold text-white shadow-sm flex-shrink-0">
                AR
              </div>
              <div>
                <p className="text-base font-bold text-[#111827]">Aishwarya &amp; Rohan</p>
                <p className="text-xs text-[#9CA3AF] font-semibold mt-0.5">Kumarakom, December 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA (Stage 2 Dark Premium) ── */}
      <section className="py-28 sm:py-40 bg-gradient-to-br from-[#0D051B] via-[#120727] to-[#0A0314] border-t border-[#3E2568]/30 relative overflow-hidden">
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
          <Image
            src="/wedding-buddy-logo.png"
            alt=""
            width={600}
            height={600}
            className="opacity-[0.02] invert scale-110 object-contain"
          />
        </div>
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-[500px] rounded-full bg-[#8B31C7]/10 blur-3xl pointer-events-none" />
        <div className="wb-container max-w-2xl text-center relative z-10">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white">Ready to start planning?</h2>
          <p className="mt-4 text-base sm:text-lg text-purple-200/75 leading-relaxed max-w-md mx-auto">
            No account needed. Pick a wedding type above or jump straight into venues and budgeting.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-7 py-4 text-base font-bold text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-150 cursor-pointer"
            >
              Choose wedding type
              <svg className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
            <Link href="/budget" className="inline-flex items-center gap-2 rounded-xl border border-purple-800 bg-white/5 hover:bg-white/10 px-7 py-4 text-base font-bold text-white hover:border-[#8B31C7] transition-all duration-150">
              Open budget builder
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
