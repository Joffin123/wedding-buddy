"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SERVICE_TYPES = [
  {
    id: "designation-wedding",
    label: "Designation Wedding",
    description: "Formal ceremonies — church, temple, or masjid — with full traditional rites",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 4 L20 8 M14 7 L17 10 M26 7 L23 10" />
        <circle cx="20" cy="13" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 36 C10 26 30 26 30 36" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 22 L34 22 M6 28 L34 28" />
      </svg>
    ),
    color: "from-rose-50 to-white border-rose-200 hover:border-rose-400",
    iconColor: "bg-rose-100 text-rose-600",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    id: "traditional-wedding",
    label: "Traditional Wedding",
    description: "Authentic Kerala ceremonies with Sadya, classical rituals, and cultural grandeur",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 C14 6 8 12 8 20 C8 28 14 34 20 34 C26 34 32 28 32 20 C32 12 26 6 20 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 10 L20 30 M12 16 L28 16 M12 24 L28 24" />
        <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    color: "from-amber-50 to-white border-amber-200 hover:border-amber-400",
    iconColor: "bg-amber-100 text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    id: "wedding-reception",
    label: "Wedding Reception",
    description: "Grand evening celebrations with banquets, DJ, décor, and guest entertainment",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 30 L8 18 L20 10 L32 18 L32 30 Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 30 L14 22 L26 22 L26 30" />
        <circle cx="20" cy="17" r="2.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 30 L34 30" />
      </svg>
    ),
    color: "from-indigo-50 to-white border-indigo-200 hover:border-indigo-400",
    iconColor: "bg-indigo-100 text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
  },
  {
    id: "engagement",
    label: "Engagement",
    description: "Intimate Nichayathartham or ring ceremony with family, flowers, and festivities",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="20" cy="20" r="12" />
        <circle cx="20" cy="20" r="7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 8 L20 6 M32 20 L34 20 M20 32 L20 34 M8 20 L6 20" />
        <circle cx="20" cy="20" r="2.5" fill="currentColor" />
      </svg>
    ),
    color: "from-fuchsia-50 to-white border-fuchsia-200 hover:border-fuchsia-400",
    iconColor: "bg-fuchsia-100 text-fuchsia-600",
    badge: "bg-fuchsia-100 text-fuchsia-700",
  },
];

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(id: string) {
    setSelected(id);
    setTimeout(() => {
      router.push(`/venues?type=${id}`);
    }, 180);
  }

  return (
    <div className="relative w-full">
      {/* ── WELCOME HERO ── */}
      <section className="relative pt-10 pb-16 sm:pt-16">
        <div className="wb-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-600 animate-wb-fade-up">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
              </span>
              Kerala&apos;s Wedding Planning Platform
            </div>

            <h1 className="mt-6 font-display text-4xl font-medium leading-[1.1] tracking-tight text-[#2A1A33] sm:text-5xl md:text-6xl animate-wb-fade-up wb-delay-100 text-balance">
              What service are you{" "}
              <span className="wb-gradient-text italic animate-wb-shimmer">looking for?</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#2A1A33]/60 sm:text-base animate-wb-fade-up wb-delay-200">
              Choose your wedding type to discover venues, vendors, and build your perfect budget — all curated for Kerala.
            </p>
          </div>

          {/* Service type cards */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 animate-wb-fade-up wb-delay-300">
            {SERVICE_TYPES.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelect(s.id)}
                className={`group relative flex items-start gap-4 rounded-2xl border bg-gradient-to-br p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-16px_rgba(232,115,155,0.35)] cursor-pointer ${s.color} ${selected === s.id ? "scale-[0.98] opacity-80" : ""}`}
              >
                <div className={`flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl ${s.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#2A1A33]">{s.label}</h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#2A1A33]/60">{s.description}</p>
                </div>
                <svg className="h-5 w-5 flex-shrink-0 text-[#2A1A33]/30 transition-all duration-300 group-hover:text-rose-500 group-hover:translate-x-0.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Quick nav pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-wb-fade-up wb-delay-400">
            <span className="text-xs text-[#2A1A33]/40 font-medium">Or explore directly</span>
            <Link href="/venues" className="rounded-full border border-rose-200 bg-white px-4 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
              Browse Venues
            </Link>
            <Link href="/budget" className="rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors">
              Budget Builder
            </Link>
            <Link href="/vendors" className="rounded-full border border-amber-200 bg-white px-4 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-colors">
              Find Vendors
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY WEDDING BUDDY ── */}
      <section className="relative py-20 border-t border-gray-100">
        <div className="wb-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">Why Wedding Buddy</p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-[#2A1A33] sm:text-4xl text-balance">
              Your complete Kerala wedding companion.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Venues across Kerala",
                body: "All 14 districts covered — from Kovalam beaches to Munnar estates. Browse by district, see halls with real pricing.",
                icon: "🏛️",
                href: "/venues",
              },
              {
                title: "Smart budget builder",
                body: "Get a full wedding scope estimate. Edit every line item and export a clean Excel sheet ready to share.",
                icon: "📊",
                href: "/budget",
              },
              {
                title: "Curated vendors",
                body: "Photographers, caterers, decorators, and makeup artists — vetted by Kerala wedding experts.",
                icon: "✨",
                href: "/vendors",
              },
              {
                title: "AI concierge",
                body: "Ask anything — from muhurtham timings to Sadya menus. Our AI knows Kerala weddings inside out.",
                icon: "🤖",
                href: "/#wb-chat",
              },
              {
                title: "Guest list manager",
                body: "Import from contacts, track RSVPs, and manage dietary preferences for every guest.",
                icon: "👥",
                href: "/features",
              },
              {
                title: "Private & secure",
                body: "Your plans, your budget, your guest list — encrypted and never shared or sold.",
                icon: "🔒",
                href: "/features",
              },
            ].map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-[0_12px_32px_-12px_rgba(232,115,155,0.3)]"
              >
                <div className="flex-shrink-0 text-2xl">{f.icon}</div>
                <div>
                  <h3 className="font-bold text-[#2A1A33] group-hover:text-rose-600 transition-colors">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#2A1A33]/60">{f.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-20 border-t border-gray-100">
        <div className="wb-container max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">How it works</p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-[#2A1A33] sm:text-4xl text-balance">
              From &ldquo;yes&rdquo; to &ldquo;I do&rdquo; — in three steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Choose your style", body: "Select your wedding type — traditional, designation, reception, or engagement — and we&apos;ll tailor every suggestion." },
              { step: "02", title: "Discover & compare", body: "Browse venues by district, compare halls and pricing, build your budget, and shortlist vendors all in one place." },
              { step: "03", title: "Plan with confidence", body: "Export your budget to Excel, share with family, and book your dream vendors — we handle the coordination." },
            ].map((s, i) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl font-medium text-transparent [-webkit-text-stroke:1px_rgba(232,115,155,0.4)]">
                    {s.step}
                  </span>
                  {i < 2 && <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-rose-200 to-transparent" />}
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#2A1A33]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A1A33]/60" dangerouslySetInnerHTML={{ __html: s.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="relative py-20 border-t border-gray-100">
        <div className="wb-container max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-rose-50 p-10 sm:p-14">
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-rose-200/40 blur-3xl" />
            <div className="relative">
              <svg className="h-7 w-7 text-rose-400" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
                <path d="M10 8c-3 0-6 2-6 6v10h10V14H8c0-2 1-4 2-4V8zm14 0c-3 0-6 2-6 6v10h10V14h-6c0-2 1-4 2-4V8z" />
              </svg>
              <p className="mt-5 font-display text-xl font-normal leading-relaxed text-[#2A1A33] sm:text-2xl">
                &ldquo;Wedding Buddy planned our Kumarakom ceremony in nine days flat. The concierge found us a houseboat, a Sadya caterer, and a photographer — all within budget. It felt less like planning and more like having a very clever friend.&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-indigo-500 text-sm font-bold text-white">
                  AR
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2A1A33]">Aishwarya &amp; Rohan</p>
                  <p className="text-xs text-[#2A1A33]/50">Married in Kumarakom, December 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 border-t border-gray-100">
        <div className="wb-container max-w-3xl text-center">
          <h2 className="font-display text-3xl font-medium tracking-tight text-[#2A1A33] sm:text-4xl">
            Ready to start planning?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#2A1A33]/60">
            No account needed. Pick your wedding type above and discover venues across all 14 districts of Kerala.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(232,115,155,0.6)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Get started
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <Link
              href="/budget"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-[#2A1A33] transition-all duration-300 hover:border-rose-300"
            >
              Build your budget
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
