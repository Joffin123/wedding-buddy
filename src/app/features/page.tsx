import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features · Wedding Buddy",
  description:
    "Explore the AI budget calculator, guest list manager, and vendor matching engine behind Wedding Buddy — built for the modern Kerala wedding.",
};

export default function FeaturesPage() {
  return (
    <div className="relative w-full">
      {/* HERO */}
      <section className="pt-12 pb-20 sm:pt-20">
        <div className="wb-container text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 animate-wb-fade-up">Features</p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.1] tracking-tight text-[#2A1A33] sm:text-6xl md:text-7xl text-balance animate-wb-fade-up wb-delay-100">
            Every tool a planner uses,
            <span className="block wb-gradient-text italic animate-wb-shimmer">
              in one conversation.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#2A1A33]/70 sm:text-lg animate-wb-fade-up wb-delay-200">
            Three core engines — budget, guests, and vendors — woven into a single AI concierge. No dashboards to learn, no spreadsheets to fight. Just ask.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 animate-wb-fade-up wb-delay-300">
            {[
              { label: "Budget calculator", href: "#budget" },
              { label: "Guest list", href: "#guests" },
              { label: "Vendor matching", href: "#matching" },
              { label: "Timeline", href: "#timeline" },
              { label: "FAQ", href: "#faq" },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="rounded-full border border-rose-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#2A1A33]/80 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-rose-400 hover:bg-white hover:text-rose-700"
              >
                {p.label}
              </a>
            ))}
          </div>

          {/* Highlighted AI chatbot CTA */}
          <div className="mt-10 animate-wb-fade-up wb-delay-400">
            <Link
              href="/#wb-chat"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(232,115,155,0.7)] animate-wb-pulse-ring transition-all hover:-translate-y-0.5"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Try the AI concierge now
            </Link>
          </div>
        </div>
      </section>

      {/* BUDGET */}
      <section id="budget" className="py-24">
        <div className="wb-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-600">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                01 · AI Budget Calculator
              </span>
              <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-5xl text-balance">
                Spend intelligently, not anxiously.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#2A1A33]/70">
                Tell the AI your ceiling. It allocates across thirty-seven Kerala-specific categories — from mandap florals to Sadya per-plate — then recalibrates every time you book, so overruns are caught the moment they happen.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  { t: "Kerala-trained allocation", d: "Four years of real wedding budgets from Kochi to Kozhikode, weighted by season, region, and guest count." },
                  { t: "Live overrun alerts", d: "The moment a quote pushes you past budget, the concierge suggests three substitutions of equal quality." },
                  { t: "Honest vendor quotes", d: "Real numbers from real vendors — no inflated estimates, no placeholder ranges that collapse at booking time." },
                  { t: "Family-fund split", d: "Track contributions from both sides transparently, with WhatsApp-shareable settlement summaries." },
                ].map((f) => (
                  <li key={f.t} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-400 shadow-lg">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[#2A1A33]">{f.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#2A1A33]/70">{f.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-rose-200 via-fuchsia-100 to-transparent blur-3xl" />
              <div className="rounded-[2rem] wb-card p-2 transition-transform duration-700 hover:-translate-y-2">
                <div className="rounded-[1.5rem] border border-rose-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50">Total budget</p>
                      <p className="mt-1 font-sans text-4xl font-medium text-[#2A1A33]">₹32,00,000</p>
                    </div>
                    <div className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                      On track · 82%
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-rose-50">
                    <div className="flex h-full">
                      <div className="h-full bg-rose-400" style={{ width: "36%" }} />
                      <div className="h-full bg-fuchsia-400" style={{ width: "22%" }} />
                      <div className="h-full bg-indigo-400" style={{ width: "14%" }} />
                      <div className="h-full bg-emerald-400" style={{ width: "10%" }} />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      { cat: "Venue & banquet", amt: "₹11,50,000", pct: 36, color: "bg-rose-400" },
                      { cat: "Catering (Sadya + live counters)", amt: "₹7,00,000", pct: 22, color: "bg-fuchsia-400" },
                      { cat: "Photography & cinematography", amt: "₹4,40,000", pct: 14, color: "bg-indigo-400" },
                      { cat: "Florals & décor", amt: "₹3,20,000", pct: 10, color: "bg-emerald-400" },
                      { cat: "Bridal attire & jewellery", amt: "₹2,80,000", pct: 9, color: "bg-amber-400" },
                      { cat: "Makeup & hair", amt: "₹1,50,000", pct: 5, color: "bg-sky-400" },
                      { cat: "Logistics & misc", amt: "₹1,60,000", pct: 4, color: "bg-slate-400" },
                    ].map((l) => (
                      <div key={l.cat} className="flex items-center justify-between gap-3">
                        <div className="flex flex-1 items-center gap-3">
                          <span className={`h-2 w-2 flex-shrink-0 rounded-full ${l.color}`} />
                          <span className="truncate text-sm text-[#2A1A33]/80">{l.cat}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#2A1A33]/50 tabular-nums">{l.pct}%</span>
                          <span className="font-sans text-sm font-medium text-[#2A1A33] tabular-nums">{l.amt}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 text-[10px] font-bold text-white">
                      AI
                    </div>
                    <p className="text-xs leading-relaxed text-[#2A1A33]/85">
                      <strong className="text-emerald-700">Saved ₹1.8L</strong> — swapping to <strong>Grand Sadya Co.</strong> for lunch preserves your dinner budget for Paragon&apos;s Thalassery biryani.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Break: Traditional Wedding ── */}
      <section className="py-8 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-md group">
            <Image
              src="/images/traditional_kerala_marriage.png"
              alt="Traditional Kerala Wedding Ceremony"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300 mb-2">Heritage · Sadya &amp; Mandap</span>
              <h4 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight max-w-xl">
                Authentic Kerala traditions — every detail planned.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* GUESTS */}
      <section id="guests" className="py-24">
        <div className="wb-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-indigo-200 via-sky-100 to-transparent blur-3xl" />
              <div className="rounded-[2rem] wb-card p-2 transition-transform duration-700 hover:-translate-y-2">
                <div className="rounded-[1.5rem] border border-rose-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50">Guest list</p>
                      <p className="mt-1 font-sans text-4xl font-medium text-[#2A1A33]">
                        318<span className="text-[#2A1A33]/40">/450</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-center">
                        <p className="font-sans text-lg font-medium text-emerald-700">252</p>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-600">Yes</p>
                      </div>
                      <div className="rounded-lg border border-rose-300 bg-rose-50 px-2.5 py-1 text-center">
                        <p className="font-sans text-lg font-medium text-rose-700">34</p>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-rose-600">No</p>
                      </div>
                      <div className="rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-center">
                        <p className="font-sans text-lg font-medium text-amber-700">32</p>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-amber-600">Pending</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-1.5">
                    {[
                      { name: "Rajan & Meera Nair", side: "Bride · Family", count: 4, status: "Yes", diet: "Veg" },
                      { name: "Arjun Menon", side: "Groom · College", count: 2, status: "Yes", diet: "Non-veg" },
                      { name: "Anita Iyer", side: "Bride · Work", count: 1, status: "Pending", diet: "—" },
                      { name: "Dr. Thomas Kurien", side: "Groom · Family", count: 3, status: "Yes", diet: "Veg" },
                      { name: "Pooja Krishnan", side: "Bride · Friends", count: 2, status: "No", diet: "—" },
                      { name: "Hafeez Ibrahim", side: "Groom · Work", count: 2, status: "Pending", diet: "Halal" },
                    ].map((g) => (
                      <div key={g.name} className="flex items-center justify-between rounded-xl border border-rose-100 bg-white px-3 py-2.5 hover:bg-rose-50/60 transition-colors">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-[#2A1A33]">{g.name}</p>
                          <p className="text-[11px] text-[#2A1A33]/55">{g.side} · {g.count} pax</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline text-[10px] text-[#2A1A33]/50">{g.diet}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              g.status === "Yes"
                                ? "bg-emerald-100 text-emerald-700"
                                : g.status === "No"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {g.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 text-[10px] font-bold text-white">
                      AI
                    </div>
                    <p className="text-xs leading-relaxed text-[#2A1A33]/85">
                      <strong className="text-indigo-700">32 pending RSVPs</strong> — I&apos;ve drafted WhatsApp follow-ups in Malayalam + English. Review and send?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-300 bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-700">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                02 · Guest List Manager
              </span>
              <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-5xl text-balance">
                450 guests, zero spreadsheets.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#2A1A33]/70">
                Import from WhatsApp, phone contacts, or an Excel sheet your uncle made in 2014. The concierge dedupes, tags by side, tracks RSVPs, and handles the awkward follow-ups for you.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  { t: "One-tap import", d: "Drop a contact card, forward a WhatsApp list, or paste names — we parse, clean, and tag side + relation automatically." },
                  { t: "Bilingual auto follow-ups", d: "AI-drafted reminder messages in Malayalam, English, or Manglish — in your voice, not a corporate template." },
                  { t: "Dietary & seating intel", d: "Track veg / non-veg / halal / Jain counts live. Auto-generate seating with family-group clustering." },
                  { t: "Plus-one prediction", d: "The model predicts how many plus-ones will actually come — calibrated on Kerala RSVP behaviour." },
                ].map((f) => (
                  <li key={f.t} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 shadow-lg">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[#2A1A33]">{f.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#2A1A33]/70">{f.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MATCHING */}
      <section id="matching" className="py-24">
        <div className="wb-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                03 · Vendor Matching
              </span>
              <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-5xl text-balance">
                The right team, the first time.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#2A1A33]/70">
                Our matching engine weighs your venue, budget, aesthetic, and guest count against 200+ vetted Kerala vendors — surfacing a shortlist of three, with honest tradeoffs spelled out in plain English.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  { t: "Aesthetic matching", d: "Paste a Pinterest board or describe the mood. We translate it into vendor shortlists with matching portfolios." },
                  { t: "Availability verified", d: "Every suggestion is cross-checked with vendor calendars in real time — no ghost dates, no cold-call surprises." },
                  { t: "Transparent tradeoffs", d: "We'll tell you plainly: \u201CStark Studios is ₹40K above Kahani, but edits faster and delivers reels in 72h.\u201D" },
                  { t: "Package negotiation", d: "The concierge negotiates bundled packages — photographer + cinematographer + drone — at rates you couldn't unlock alone." },
                ].map((f) => (
                  <li key={f.t} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[#2A1A33]">{f.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#2A1A33]/70">{f.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-emerald-200 via-teal-100 to-transparent blur-3xl" />
              <div className="rounded-[2rem] wb-card p-2 transition-transform duration-700 hover:-translate-y-2">
                <div className="rounded-[1.5rem] border border-rose-100 bg-white p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50">Your brief</p>
                  <p className="mt-1 text-sm text-[#2A1A33]/85">
                    &ldquo;Kumarakom backwater wedding · 220 guests · ₹30L total · candid photography · pastel floral aesthetic&rdquo;
                  </p>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="inline-flex h-5 items-center gap-1 rounded-full bg-emerald-100 px-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      Matched
                    </span>
                    <span className="text-[10px] text-[#2A1A33]/50">3 of 212 vendors · 0.4s</span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { name: "Stark Studios", role: "Photography", match: 97, reason: "Candid-first style · shot 4 Kumarakom weddings in 2025 · pastel-grading signature", color: "from-rose-500 to-rose-400" },
                      { name: "Bloom Room Kerala", role: "Florals & décor", match: 94, reason: "Pastel-palette specialist · Taj Kumarakom preferred · suspended installations", color: "from-fuchsia-500 to-fuchsia-400" },
                      { name: "Dhe Puttu", role: "Catering", match: 92, reason: "Modern Sadya · travels to Kumarakom · ₹1,250/plate fits ₹2.75L food budget", color: "from-emerald-500 to-emerald-400" },
                    ].map((m) => (
                      <div key={m.name} className="rounded-2xl border border-rose-100 bg-white p-4 transition-all hover:border-rose-300 hover:shadow-md">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate font-bold text-[#2A1A33]">{m.name}</p>
                              <span className="text-[10px] text-[#2A1A33]/50">· {m.role}</span>
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-[#2A1A33]/70">{m.reason}</p>
                          </div>
                          <div className="flex flex-col items-end flex-shrink-0">
                            <div className={`rounded-full bg-gradient-to-r ${m.color} px-2.5 py-0.5 text-[11px] font-extrabold text-white`}>
                              {m.match}%
                            </div>
                            <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-[#2A1A33]/50">Match</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="mt-5 w-full rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 py-2.5 text-xs font-bold text-white transition-all hover:shadow-[0_10px_30px_-10px_rgba(232,115,155,0.7)]">
                    Request intros to all three →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Break: Beachfront Reception ── */}
      <section className="py-8 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-md group">
            <Image
              src="/images/kerala_beach_reception.png"
              alt="Kerala Beachfront Wedding Reception"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300 mb-2">Destinations · Beachfront Venues</span>
              <h4 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight max-w-xl">
                Vendor matching for every venue style — from heritage to beachfront.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE GRID */}
      <section id="timeline" className="py-24">
        <div className="wb-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">And more</p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-5xl text-balance">
              Twelve quieter tools that do the heavy lifting.
            </h2>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Muhurtham timing", d: "Auto-calculated auspicious windows from the panchangam." },
              { t: "Vendor contracts", d: "E-sign ready contracts, legally vetted, in English and Malayalam." },
              { t: "Payment escrow", d: "Funds held securely until vendor delivers — Razorpay-backed." },
              { t: "Baraat coordination", d: "Timing, route, transport, and music — shared live with the groom's party." },
              { t: "Gifts & hamper tracker", d: "Log incoming gifts and auto-draft thank-you notes post-wedding." },
              { t: "Attire moodboards", d: "AI-curated Kanjivaram, Kasavu, and lehenga boards by skin tone." },
              { t: "Photo share hub", d: "Guests upload their phone photos to one private, AI-curated gallery." },
              { t: "Astrology-ready dossier", d: "Horoscope-matching summary for families who still ask." },
              { t: "Weather insurance", d: "Monsoon-aware backup tents and indoor fallback plans, pre-negotiated." },
              { t: "Invitation design", d: "Printable + WhatsApp-ready e-invites in four signature styles." },
              { t: "Travel logistics", d: "Cochin airport transfers, houseboat charters, and hotel blocks." },
              { t: "Post-wedding archive", d: "Every photo, vendor contract, and receipt — yours, forever." },
            ].map((i) => (
              <div
                key={i.t}
                className="group rounded-2xl border border-rose-100 bg-white/80 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-[0_18px_40px_-20px_rgba(232,115,155,0.45)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-[#2A1A33]">{i.t}</h3>
                  <svg className="h-4 w-4 flex-shrink-0 text-[#2A1A33]/40 transition-colors group-hover:text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#2A1A33]/70">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24">
        <div className="wb-container max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">The difference</p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-5xl text-balance">
              Planning, reimagined end-to-end.
            </h2>
          </div>

          <div className="mt-16 overflow-hidden rounded-[2rem] border border-rose-200 bg-white/80 backdrop-blur-sm shadow-[0_20px_60px_-30px_rgba(232,115,155,0.45)]">
            <div className="grid grid-cols-3 divide-x divide-rose-100 text-sm">
              <div className="p-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/50">Task</div>
              <div className="p-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/50">Traditional planner</div>
              <div className="bg-rose-50/60 p-5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">Wedding Buddy</div>
            </div>
            {[
              ["Venue shortlist", "2–3 weeks, repeated site visits", "30 seconds, verified availability"],
              ["Vendor quotes", "Phone calls, delayed callbacks", "Live quotes, side-by-side"],
              ["Budget tracking", "Excel + WhatsApp screenshots", "Auto-synced, per-category alerts"],
              ["RSVP follow-ups", "Manual, in multiple languages", "AI-drafted in your voice"],
              ["Contract review", "Legal fees, weeks of back-and-forth", "Pre-vetted, e-signable in minutes"],
              ["Planner fee", "8–15% of total budget", "Flat — from ₹9,900"],
            ].map(([task, old, neu], i) => (
              <div key={i} className="grid grid-cols-3 divide-x divide-rose-100 border-t border-rose-100 text-sm">
                <div className="p-5 font-medium text-[#2A1A33]">{task}</div>
                <div className="p-5 text-[#2A1A33]/70">{old}</div>
                <div className="flex items-start gap-2 bg-rose-50/60 p-5">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#2A1A33]">{neu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="wb-container max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">Frequently asked</p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-5xl text-balance">
              Questions we hear often.
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {[
              {
                q: "Is Wedding Buddy only for Kerala weddings?",
                a: "For now, yes. Our vendor network, budget models, and rituals logic are all Kerala-native. We plan to expand to Tamil Nadu and Karnataka next, but depth over breadth — we'd rather be best in Kerala than mediocre everywhere.",
              },
              {
                q: "How is this different from a WedMeGood or a traditional planner?",
                a: "Directories show you thousands of vendors; we shortlist three. Traditional planners charge 8–15% of your budget; we charge a flat fee starting at ₹9,900. We're not a listing — we're the concierge on your side of the table.",
              },
              {
                q: "What powers the AI concierge?",
                a: "The proprietary Wedding Buddy AI — trained in-house on four years of Kerala wedding data, with a verified vendor knowledge base and a human review step. Every recommendation is grounded in real availability, real pricing, and real experience. All credit for the planning magic goes to the Wedding Buddy team.",
              },
              {
                q: "Do you store my guest list or budget?",
                a: "Yes, encrypted at rest and never shared with third parties. You own your data — export it, delete it, or migrate it anytime. We don't sell lists to vendors and never will.",
              },
              {
                q: "What does it cost?",
                a: "Free to plan. You pay a flat concierge fee (from ₹9,900) only when you start booking through us. Vendors pay us nothing — your interests stay aligned with ours.",
              },
              {
                q: "Can my parents use it too?",
                a: "Yes. The concierge speaks Malayalam and English fluently, shares updates via WhatsApp, and has a simplified \u201Cparents' view\u201D — so your mother can check the budget without learning the app.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-rose-100 bg-white/80 px-6 py-5 backdrop-blur-sm transition-all open:border-rose-300 open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-bold text-[#2A1A33]">{f.q}</span>
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-transform group-open:rotate-45">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor"><path d="M5 1h2v10H5z M1 5h10v2H1z" /></svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[#2A1A33]/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="wb-container max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-rose-200 bg-white/90 px-8 py-16 text-center shadow-[0_30px_80px_-30px_rgba(232,115,155,0.5)] sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-200 to-indigo-200 opacity-60 blur-3xl animate-wb-drift" />
            </div>
            <div className="relative">
              <h2 className="font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-6xl text-balance">
                See it in a two-minute demo.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#2A1A33]/70">
                Open the concierge, paste your rough vision, and watch the shortlist build itself. No sign-up required.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/#wb-chat"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(232,115,155,0.7)] transition-all hover:-translate-y-0.5"
                >
                  Try the concierge
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/venues"
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-7 py-3.5 text-sm font-bold text-[#2A1A33] transition-all hover:border-rose-400"
                >
                  Browse venues first
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
