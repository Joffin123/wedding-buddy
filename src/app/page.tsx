import Link from "next/link";
import InlineChat from "@/components/InlineChat";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* ======================= HERO: AI CHATBOT ======================= */}
      <section className="relative pt-4 pb-20 sm:pt-8">
        <div className="wb-container">
          {/* Intro headline above the chat */}
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-600 backdrop-blur-md animate-wb-fade-up shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
              </span>
              Kerala&apos;s AI Wedding Concierge
            </div>

            <h1 className="mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-[#2A1A33] sm:text-5xl md:text-6xl animate-wb-fade-up wb-delay-100 text-balance">
              Plan your wedding{" "}
              <span className="wb-gradient-text italic animate-wb-shimmer">in a single conversation.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#2A1A33]/70 sm:text-base animate-wb-fade-up wb-delay-200 text-balance">
              Chat with the concierge below — ask for venues, vendors, or inspiration. Every answer pulls from our curated Kerala catalogue with real photos and pricing.
            </p>
          </div>

          {/* The chat itself */}
          <div className="mx-auto max-w-5xl animate-wb-scale-in wb-delay-200">
            <InlineChat />
          </div>

          {/* Trust strip */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2A1A33]/50 animate-wb-fade-in wb-delay-500">
            <span>As featured in</span>
            <span className="text-[#2A1A33]/80">Vogue India</span>
            <span className="hidden sm:inline text-rose-300">·</span>
            <span className="text-[#2A1A33]/80">Condé Nast Traveller</span>
            <span className="hidden sm:inline text-rose-300">·</span>
            <span className="text-[#2A1A33]/80">WeddingSutra</span>
            <span className="hidden sm:inline text-rose-300">·</span>
            <span className="text-[#2A1A33]/80">The Hindu</span>
          </div>
        </div>
      </section>

      {/* ======================= VALUE PROPS ======================= */}
      <section id="features" className="relative py-24">
        <div className="wb-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">Why Wedding Buddy</p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-5xl text-balance">
              An entire planning team, in one conversation.
            </h2>
            <p className="mt-5 text-[#2A1A33]/70 leading-relaxed">
              Four years of Kerala wedding data, trained with the taste of top planners, available the moment inspiration strikes.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "AI concierge",
                body: "Chat your way to a shortlist. Ask for backwater venues under ₹5L, and get a curated list in seconds — with photos, capacity, and real availability.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
                tint: "rose",
              },
              {
                title: "Smart budget",
                body: "Set your ceiling; our model allocates intelligently across venue, catering, décor, and attire — with live overrun alerts as you book.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m-6 4h6m-6 4h4m5 5H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />,
                tint: "indigo",
              },
              {
                title: "Curated vendors",
                body: "Every photographer, caterer, and decorator is vetted by Kerala wedding veterans. No cold outreach — we introduce you directly.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
                tint: "fuchsia",
              },
              {
                title: "Guest list manager",
                body: "Import from WhatsApp or contacts. Track RSVPs, dietary preferences, and seating — with gentle auto-follow-ups in your voice.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
                tint: "emerald",
              },
              {
                title: "Timeline & rituals",
                body: "From muhurtham timings to reception flow — AI-built timelines that respect tradition while keeping vendors perfectly synced.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                tint: "amber",
              },
              {
                title: "Private & secure",
                body: "Your guest list, your budget, your choices — encrypted and never shared. No third-party ads, no data sold. Ever.",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                tint: "sky",
              },
            ].map((f, idx) => {
              const tints: Record<string, { card: string; icon: string; halo: string }> = {
                rose: { card: "from-rose-50 to-white", icon: "from-rose-500 to-rose-400", halo: "bg-rose-200/40" },
                indigo: { card: "from-indigo-50 to-white", icon: "from-indigo-500 to-indigo-400", halo: "bg-indigo-200/40" },
                fuchsia: { card: "from-fuchsia-50 to-white", icon: "from-fuchsia-500 to-fuchsia-400", halo: "bg-fuchsia-200/40" },
                emerald: { card: "from-emerald-50 to-white", icon: "from-emerald-500 to-emerald-400", halo: "bg-emerald-200/40" },
                amber: { card: "from-amber-50 to-white", icon: "from-amber-500 to-amber-400", halo: "bg-amber-200/40" },
                sky: { card: "from-sky-50 to-white", icon: "from-sky-500 to-sky-400", halo: "bg-sky-200/40" },
              };
              const t = tints[f.tint];
              return (
                <div
                  key={f.title}
                  className={`group relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-br ${t.card} p-7 shadow-[0_10px_40px_-24px_rgba(232,115,155,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(232,115,155,0.6)]`}
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className={`mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${t.icon} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {f.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-[#2A1A33]">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2A1A33]/70">{f.body}</p>
                  <div className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full ${t.halo} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================= HOW IT WORKS ======================= */}
      <section className="relative py-24">
        <div className="wb-container max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">How it works</p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-5xl text-balance">
              From engagement to &ldquo;I do&rdquo; in three steps.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Tell us your vision", body: "Share your date, budget, style, and guest count. Five minutes is all it takes to brief your concierge." },
              { step: "02", title: "Review the shortlist", body: "Get a personalised dossier — venues, vendors, and a draft timeline — curated by AI and vetted by our team." },
              { step: "03", title: "Book with one tap", body: "Lock in dates, sign contracts, and pay securely. We handle the back-and-forth; you stay in the moment." },
            ].map((s, i) => (
              <div
                key={s.step}
                className="relative rounded-3xl border border-rose-100 bg-white/80 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-rose-300 hover:shadow-[0_24px_60px_-24px_rgba(232,115,155,0.45)]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl font-medium text-transparent [-webkit-text-stroke:1px_rgba(232,115,155,0.55)]">
                    {s.step}
                  </span>
                  {i < 2 && (
                    <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-rose-300 to-transparent" />
                  )}
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#2A1A33]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2A1A33]/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= TESTIMONIAL ======================= */}
      <section className="relative py-24">
        <div className="wb-container max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-indigo-50 p-10 sm:p-14 shadow-[0_30px_80px_-30px_rgba(232,115,155,0.45)]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-rose-200/60 blur-3xl animate-wb-drift" />
              <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-indigo-200/60 blur-3xl animate-wb-float-slow" />
            </div>
            <div className="relative">
              <svg className="h-8 w-8 text-rose-400" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
                <path d="M10 8c-3 0-6 2-6 6v10h10V14H8c0-2 1-4 2-4V8zm14 0c-3 0-6 2-6 6v10h10V14h-6c0-2 1-4 2-4V8z" />
              </svg>
              <p className="mt-6 font-display text-2xl font-normal leading-relaxed text-[#2A1A33] sm:text-3xl text-balance">
                &ldquo;Wedding Buddy planned our Kumarakom ceremony in nine days flat. The concierge found us a houseboat, a Sadya caterer, and a photographer who understood our families — all within budget. It felt less like planning and more like having a very clever friend.&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-indigo-500 font-bold text-white shadow-lg">
                  AR
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2A1A33]">Aishwarya &amp; Rohan</p>
                  <p className="text-xs text-[#2A1A33]/60">Married in Kumarakom, December 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section id="start" className="relative py-24">
        <div className="wb-container max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-rose-200 bg-white/90 px-8 py-16 text-center shadow-[0_30px_80px_-30px_rgba(232,115,155,0.5)] sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-rose-300 to-indigo-300 opacity-50 blur-3xl animate-wb-drift" />
            </div>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600">
                Your date is waiting
              </p>
              <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-[#2A1A33] sm:text-6xl text-balance">
                Begin with a single message.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#2A1A33]/70">
                No credit card. No commitment. Just a wedding planned beautifully, from the first &ldquo;yes&rdquo; to the last dance.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/#wb-chat"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(232,115,155,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-10px_rgba(232,115,155,0.75)]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Start planning with AI
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-7 py-3.5 text-sm font-bold text-[#2A1A33] transition-all duration-300 hover:border-rose-400"
                >
                  See every feature
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
