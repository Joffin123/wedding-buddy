import type { Metadata } from "next";
import { supabase, type VenueRow } from "@/lib/supabase";
import VenuesClient from "@/components/VenuesClient";

export const metadata: Metadata = {
  title: "Venues · Wedding Buddy",
  description:
    "Discover Kerala's most breathtaking wedding venues — palaces, backwater resorts, beachfront estates, and heritage halls.",
};

export const dynamic = "force-dynamic";

export default async function VenuesPage() {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .order("featured", { ascending: false })
    .order("name")
    .returns<VenueRow[]>();

  const venues = data ?? [];

  return (
    <div className="relative w-full">
      {/* ── HEADER ── */}
      <section className="pt-12 pb-10 sm:pt-20">
        <div className="wb-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600 animate-wb-fade-up">Venues</p>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.08] tracking-tight text-[#2A1A33] sm:text-6xl md:text-7xl text-balance animate-wb-fade-up wb-delay-100">
              Kerala&apos;s most
              <span className="block wb-gradient-text italic animate-wb-shimmer pb-1">breathtaking venues.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#2A1A33]/70 sm:text-lg animate-wb-fade-up wb-delay-200">
              Hand-picked estates across palaces, backwater resorts, and beachfront cliffs. Every venue vetted, every rate transparent, every date verified with the property.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTERS + GRID (client) ── */}
      <section className="pb-24">
        <div className="wb-container">
          {error && (
            <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
              Could not load venues: {error.message}. Did you run the schema SQL in Supabase? See{" "}
              <code className="rounded bg-white px-1">supabase/README.md</code>.
            </div>
          )}

          {venues.length === 0 && !error ? (
            <div className="rounded-3xl border border-rose-200 bg-white/80 p-10 text-center">
              <p className="font-display text-2xl text-[#2A1A33]">No venues yet.</p>
              <p className="mt-3 text-sm text-[#2A1A33]/70">
                Paste <code className="rounded bg-rose-50 px-1">supabase/schema.sql</code> into the Supabase SQL Editor, then run{" "}
                <code className="rounded bg-rose-50 px-1">npm run db:seed</code>.
              </p>
            </div>
          ) : (
            <VenuesClient venues={venues} />
          )}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="pb-24">
        <div className="wb-container max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-rose-200 bg-gradient-to-br from-rose-50 via-white to-indigo-50 p-10 sm:p-14 shadow-[0_30px_80px_-30px_rgba(232,115,155,0.5)]">
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-indigo-200/70 blur-3xl animate-wb-float-slow" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-rose-200/70 blur-3xl animate-wb-drift" />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-3xl font-medium tracking-tight text-[#2A1A33] sm:text-4xl text-balance leading-tight">
                  Can&apos;t pick? Let the AI decide.
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#2A1A33]/70">
                  Tell the concierge your date, budget, and guest count — get a shortlist of three venues with real availability in under thirty seconds.
                </p>
              </div>
              <a
                href="/#wb-chat"
                className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_40px_-10px_rgba(232,115,155,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_60px_-10px_rgba(232,115,155,0.75)]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Ask the concierge
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
