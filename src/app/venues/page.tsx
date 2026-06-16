import Link from "next/link";
import type { Metadata } from "next";
import { KERALA_DISTRICTS } from "@/lib/kerala-venues";

export const metadata: Metadata = {
  title: "Venues by District · Wedding Buddy",
  description: "Discover wedding venues across all 14 districts of Kerala — palaces, resorts, convention centres, and heritage halls.",
};

export default function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  return (
    <div className="relative w-full">
      {/* ── HEADER ── */}
      <section className="pt-12 pb-10 sm:pt-20 border-b border-gray-100">
        <div className="wb-container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-[#2A1A33]/50">
              <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-[#2A1A33]">Venues</span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.1] tracking-tight text-[#2A1A33] sm:text-5xl animate-wb-fade-up text-balance">
              Which venue are you{" "}
              <span className="wb-gradient-text italic animate-wb-shimmer">looking for?</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#2A1A33]/60 animate-wb-fade-up wb-delay-100">
              Select a district to see all wedding venues — convention centres, hotels, resorts, and heritage halls.
            </p>
          </div>
        </div>
      </section>

      {/* ── DISTRICT GRID ── */}
      <section className="py-14">
        <div className="wb-container">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#2A1A33]/40">
            All 14 Districts of Kerala
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {KERALA_DISTRICTS.map((d, i) => (
              <Link
                key={d.slug}
                href={`/venues/${d.slug}`}
                className="group flex items-start gap-3.5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-[0_12px_32px_-12px_rgba(232,115,155,0.3)]"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-2xl">
                  {d.emoji}
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-[#2A1A33] group-hover:text-rose-600 transition-colors leading-tight">
                    {d.name}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#2A1A33]/50 line-clamp-2">{d.tagline}</p>
                </div>
                <svg className="ml-auto flex-shrink-0 h-4 w-4 text-[#2A1A33]/25 group-hover:text-rose-400 transition-colors mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HELPER STRIP ── */}
      <section className="pb-20">
        <div className="wb-container max-w-4xl">
          <div className="flex flex-col gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-[#2A1A33]">Not sure which district?</p>
              <p className="mt-1 text-sm text-[#2A1A33]/60">Use our AI concierge to get venue suggestions based on your guest count, style, and budget.</p>
            </div>
            <Link
              href="/#wb-chat"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5"
            >
              Ask the AI
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
