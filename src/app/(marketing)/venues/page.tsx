import Link from "next/link";
import Image from "next/image";
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
      <section className="border-b border-purple-100 bg-gradient-to-b from-[#FFFAF0] via-[#FEF9F3] to-white py-12 sm:py-16 relative overflow-hidden">
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
          <Image
            src="/wedding-buddy-logo.png"
            alt=""
            width={600}
            height={537}
            className="opacity-[0.03] scale-125 object-contain"
            priority
          />
        </div>
        <div className="wb-container relative z-10">
          <nav className="flex items-center gap-1.5 text-sm font-semibold text-[#9CA3AF] mb-6">
            <Link href="/" className="hover:text-[#8B31C7] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111827]">Venues</span>
          </nav>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827] animate-wb-fade-up">
            Which venue are you looking for?
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl animate-wb-fade-up wb-delay-100">
            Select a district below to see all venues in that area. Pricing is shown only after you choose a property.
          </p>
        </div>
      </section>

      {/* ── District grid ── */}
      <section className="py-12">
        <div className="wb-container">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-6">All 14 districts · Kerala</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {KERALA_DISTRICTS.map((d) => (
              <Link
                key={d.slug}
                href={`/venues/${d.slug}`}
                className="group flex items-center gap-3.5 rounded-xl border border-purple-100 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8B31C7] hover:shadow-md cursor-pointer"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F9FAFB] text-xl flex-shrink-0 group-hover:bg-[#F5F0FF] transition-colors">
                  {d.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base text-[#111827] group-hover:text-[#8B31C7] transition-colors">{d.name}</p>
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

      {/* ── Image Section Break ── */}
      <section className="pb-4 pt-6 bg-white relative overflow-hidden">
        <div className="wb-container">
          <div className="relative h-[280px] w-full rounded-4xl overflow-hidden shadow-md group">
            <Image
              src="/images/kerala_backwater_wedding.png"
              alt="Kerala Backwater Wedding Venue"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300 mb-2">Backwaters · Lake Resorts</span>
              <h4 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold text-white leading-tight max-w-xl">
                Houseboat weddings, lakeside mandaps, and backwater estates.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI prompt strip (Stage 2 Dark Premium) ── */}
      <section className="pb-16 pt-6">
        <div className="wb-container">
          <div className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-2xl border border-[#3E2568]/45 bg-gradient-to-br from-[#1A0E2E] via-[#0E071A] to-[#120B24] px-6 py-6.5 shadow-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,49,199,0.08)_0%,transparent_50%)] pointer-events-none" />
            <div className="relative z-10">
              <p className="font-display font-bold text-lg text-white">Not sure which district?</p>
              <p className="text-sm sm:text-base text-purple-200/70 mt-1">Use the AI to get suggestions based on your guest count, style, and budget.</p>
            </div>
            <Link href="/" className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-5 py-3 text-sm font-bold text-white hover:shadow-md hover:shadow-purple-500/25 transition-all cursor-pointer">
              Ask the AI
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
