"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SERVICE_TYPES = [
  {
    id: "designation-wedding",
    label: "Designation Wedding",
    description: "Formal ceremonies — church, temple, or masjid — with full traditional rites.",
  },
  {
    id: "traditional-wedding",
    label: "Traditional Wedding",
    description: "Authentic Kerala ceremonies with Sadya, classical rituals, and cultural grandeur.",
  },
  {
    id: "wedding-reception",
    label: "Wedding Reception",
    description: "Grand evening celebrations with banquets, entertainment, and curated guest experiences.",
  },
  {
    id: "engagement",
    label: "Engagement",
    description: "Intimate Nichayathartham or ring ceremony with family, flowers, and festivities.",
  },
];

const FEATURES = [
  {
    label: "Venues across Kerala",
    description: "All 14 districts covered. Select a district, browse halls, and see per-person or flat-rate pricing.",
    href: "/venues",
    tag: "14 districts",
  },
  {
    label: "Budget builder",
    description: "50+ line items pre-filled with Kerala wedding averages. Edit, track actuals, and export to Excel.",
    href: "/budget",
    tag: "Excel export",
  },
  {
    label: "Vendor directory",
    description: "Photographers, caterers, decorators, and makeup artists — vetted and categorised.",
    href: "/vendors",
    tag: "4 categories",
  },
  {
    label: "AI concierge",
    description: "Ask anything about Kerala weddings — muhurtham timings, Sadya menus, venue comparisons.",
    href: "/",
    tag: "AI-powered",
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
      <section className="border-b border-[#E5E7EB] py-16 sm:py-24">
        <div className="wb-container">

          {/* Label */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-5 animate-wb-fade-up">Kerala Wedding Planning</p>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl leading-[1.1] animate-wb-fade-up wb-delay-100">
            What service are you<br />
            <span className="text-[#8B31C7]">looking for?</span>
          </h1>

          <p className="mt-4 text-[#6B7280] text-base leading-relaxed max-w-md animate-wb-fade-up wb-delay-200">
            Choose your wedding type to discover venues, compare pricing, and build your complete budget.
          </p>

          {/* Service cards */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-2xl animate-wb-fade-up wb-delay-300">
            {SERVICE_TYPES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSelect(s.id)}
                className={`group text-left rounded-xl border bg-white p-5 transition-all duration-150 cursor-pointer
                  ${selected === s.id
                    ? "border-[#8B31C7] shadow-sm"
                    : "border-[#E5E7EB] hover:border-[#8B31C7] hover:shadow-sm"
                  }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold flex-shrink-0 ${
                        selected === s.id ? "border-[#8B31C7] text-[#8B31C7] bg-[#F5F0FF]" : "border-[#E5E7EB] text-[#9CA3AF]"
                      }`}>
                        {i + 1}
                      </span>
                      <p className="font-semibold text-sm text-[#111827]">{s.label}</p>
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed pl-7">{s.description}</p>
                  </div>
                  <svg
                    className={`h-4 w-4 flex-shrink-0 mt-0.5 transition-colors ${
                      selected === s.id ? "text-[#8B31C7]" : "text-[#D1D5DB] group-hover:text-[#8B31C7]"
                    }`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Quick links */}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 animate-wb-fade-up" style={{ animationDelay: "0.28s" }}>
            <span className="text-xs text-[#9CA3AF]">Or jump to</span>
            {[
              { href: "/venues",  label: "Browse venues"   },
              { href: "/budget",  label: "Budget builder"  },
              { href: "/vendors", label: "Find vendors"    },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#6B7280] underline underline-offset-4 decoration-[#E5E7EB] hover:text-[#8B31C7] hover:decoration-[#8B31C7] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 border-b border-[#E5E7EB]">
        <div className="wb-container">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-8">What you can do</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className="group rounded-xl border border-[#E5E7EB] bg-white p-6 flex flex-col gap-4 hover:border-[#8B31C7] hover:shadow-sm transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-[#111827] text-sm leading-tight">{f.label}</p>
                  <span className="flex-shrink-0 rounded-md border border-[#FDE68A] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-semibold text-[#92400E]">
                    {f.tag}
                  </span>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed flex-1">{f.description}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#8B31C7] group-hover:gap-2 transition-all">
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

      {/* ── How it works ── */}
      <section className="py-16 border-b border-[#E5E7EB]">
        <div className="wb-container">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-8">How it works</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-3xl">
            {[
              { n: "1", title: "Pick your type", body: "Select Designation, Traditional, Reception, or Engagement — every suggestion is tailored to your choice." },
              { n: "2", title: "Explore venues",  body: "Browse 14 Kerala districts. Click a venue to see each hall with real pricing — per person or flat rate." },
              { n: "3", title: "Build a budget",  body: "Edit 50+ pre-filled items, track actuals, then export a clean Excel sheet to share with family." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-[#E5E7EB] bg-white p-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F0FF] text-sm font-bold text-[#8B31C7] mb-4">
                  {s.n}
                </span>
                <p className="font-semibold text-[#111827] text-sm mb-2">{s.title}</p>
                <p className="text-sm text-[#6B7280] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-16 border-b border-[#E5E7EB]">
        <div className="wb-container max-w-2xl">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-8">
            <div className="flex items-start gap-3 mb-5">
              <svg className="h-6 w-6 text-[#F59E0B] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.3 5.2C8.5 5.2 6 7 6 10.3v8.5h8.5v-8H9.2c0-2 1-3.5 2.1-3.5V5.2zm8.2 0c-2.8 0-5.3 1.8-5.3 5.1v8.5H22.7v-8h-5.3c0-2 1-3.5 2.1-3.5V5.2z" />
              </svg>
            </div>
            <p className="text-[#111827] text-base leading-relaxed font-medium">
              Wedding Buddy planned our Kumarakom ceremony in nine days. Found us a houseboat, a Sadya caterer, and a photographer who understood our families — all within budget.
            </p>
            <div className="mt-6 flex items-center gap-3 pt-5 border-t border-[#E5E7EB]">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8B31C7] text-xs font-bold text-white flex-shrink-0">
                AR
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827]">Aishwarya &amp; Rohan</p>
                <p className="text-xs text-[#9CA3AF]">Kumarakom, December 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16">
        <div className="wb-container max-w-2xl">
          <h2 className="text-2xl font-bold text-[#111827]">Ready to start planning?</h2>
          <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
            No account needed. Pick a wedding type above or jump straight into venues and budgeting.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-lg bg-[#8B31C7] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#7a28b0] transition-colors"
            >
              Choose wedding type
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
            <Link href="/budget" className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] hover:bg-[#F9FAFB] transition-colors">
              Open budget builder
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
