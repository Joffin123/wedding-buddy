import Link from "next/link";
import type { Metadata } from "next";
import { KERALA_DISTRICTS } from "@/lib/kerala-venues";

export const metadata: Metadata = {
  title: "Venues by District · Wedding Buddy",
  description: "Discover wedding venues across all 14 districts of Kerala.",
};

export default function VenuesPage() {
  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="border-b border-[#E5E7EB] py-12 sm:py-16">
        <div className="wb-container">
          <nav className="flex items-center gap-1.5 text-sm text-[#9CA3AF] mb-6">
            <Link href="/" className="hover:text-[#8B31C7] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111827]">Venues</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl animate-wb-fade-up">
            Which venue are you looking for?
          </h1>
          <p className="mt-3 text-sm text-[#6B7280] leading-relaxed max-w-md animate-wb-fade-up wb-delay-100">
            Select a district below to see all venues in that area. Pricing is shown only after you choose a property.
          </p>
        </div>
      </section>

      {/* ── District grid ── */}
      <section className="py-12">
        <div className="wb-container">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-6">All 14 districts · Kerala</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {KERALA_DISTRICTS.map((d) => (
              <Link
                key={d.slug}
                href={`/venues/${d.slug}`}
                className="group flex items-center gap-3.5 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3.5 transition-all duration-150 hover:border-[#8B31C7] hover:shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F9FAFB] text-xl flex-shrink-0 group-hover:bg-[#F5F0FF] transition-colors">
                  {d.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm text-[#111827] group-hover:text-[#8B31C7] transition-colors">{d.name}</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5 truncate">{d.tagline}</p>
                </div>
                <svg className="h-4 w-4 flex-shrink-0 text-[#D1D5DB] group-hover:text-[#8B31C7] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI prompt strip ── */}
      <section className="pb-16">
        <div className="wb-container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-6 py-5">
            <div>
              <p className="font-semibold text-sm text-[#111827]">Not sure which district?</p>
              <p className="text-sm text-[#6B7280] mt-0.5">Use the AI to get suggestions based on your guest count, style, and budget.</p>
            </div>
            <Link href="/" className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#8B31C7] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7a28b0] transition-colors">
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
