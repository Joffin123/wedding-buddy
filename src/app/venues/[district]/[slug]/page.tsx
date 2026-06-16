import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDistrictBySlug, getVenueBySlug, type Hall } from "@/lib/kerala-venues";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) return { title: "Venue not found" };
  return { title: `${venue.name} · Wedding Buddy`, description: venue.description };
}

function HallRow({ hall }: { hall: Hall }) {
  const isPerPax = hall.priceType === "per_pax";
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-[#E5E7EB] last:border-0">
      <div className="min-w-0">
        <p className="font-semibold text-sm text-[#111827]">{hall.name}</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">
          Up to {hall.capacity.toLocaleString()} guests
          {hall.minPax ? ` · min. ${hall.minPax} pax` : ""}
        </p>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
        <p className="font-bold text-[#111827]">₹{hall.price.toLocaleString()}</p>
        <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
          isPerPax
            ? "bg-[#F5F0FF] text-[#8B31C7]"
            : "bg-[#FFFBEB] text-[#92400E]"
        }`}>
          {isPerPax ? "per person" : "flat rate"}
        </span>
        {isPerPax && hall.minPax && (
          <p className="text-[11px] text-[#9CA3AF]">min. ₹{(hall.price * hall.minPax).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ district: string; slug: string }>;
}) {
  const { district, slug } = await params;
  const districtData = getDistrictBySlug(district);
  const venue = getVenueBySlug(slug);
  if (!venue || !districtData) notFound();

  const isHotel = venue.type === "Hotel" || venue.type === "Beach Resort";
  const isConvention = venue.type === "Convention Centre";
  const minPrice = Math.min(...venue.halls.map(h => h.price));
  const maxCapacity = Math.max(...venue.halls.map(h => h.capacity));

  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="border-b border-[#E5E7EB] py-12 sm:py-16">
        <div className="wb-container">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[#9CA3AF] mb-6">
            <Link href="/" className="hover:text-[#8B31C7] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/venues" className="hover:text-[#8B31C7] transition-colors">Venues</Link>
            <span>/</span>
            <Link href={`/venues/${district}`} className="hover:text-[#8B31C7] transition-colors">{districtData.name}</Link>
            <span>/</span>
            <span className="text-[#111827] truncate max-w-[200px]">{venue.name}</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-0.5 text-xs font-medium text-[#6B7280]">
                  {venue.type}
                </span>
                <span className="text-xs text-[#9CA3AF]">{districtData.emoji} {districtData.name}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl animate-wb-fade-up">
                {venue.name}
              </h1>
              <p className="mt-2 text-sm text-[#6B7280] flex items-center gap-1.5 animate-wb-fade-up wb-delay-100">
                <svg className="h-3.5 w-3.5 flex-shrink-0 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {venue.address}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:flex-col sm:items-end">
              {[
                { label: isHotel ? "from (per pax)" : "from (flat rate)", value: `₹${minPrice.toLocaleString()}` },
                { label: "max guests", value: maxCapacity.toLocaleString() },
                { label: "halls", value: String(venue.halls.length) },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-center min-w-[100px]">
                  <p className="text-base font-bold text-[#111827]">{s.value}</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content grid ── */}
      <section className="py-10">
        <div className="wb-container">
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Left column */}
            <div className="space-y-4 lg:col-span-1">
              {/* About */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">About</p>
                <p className="text-sm text-[#6B7280] leading-relaxed">{venue.description}</p>
              </div>

              {/* Highlights */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">Highlights</p>
                <ul className="space-y-2">
                  {venue.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-[#374151]">
                      <svg className="h-3.5 w-3.5 flex-shrink-0 text-[#8B31C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enquiry */}
              <div className="rounded-xl border border-[#8B31C7]/20 bg-[#F5F0FF] p-5">
                <p className="font-semibold text-sm text-[#111827] mb-1">Enquire about this venue</p>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  Check availability, request a site visit, or get a full quote from the property.
                </p>
                <Link href="/contact" className="flex w-full items-center justify-center rounded-lg bg-[#8B31C7] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7a28b0] transition-colors">
                  Send an enquiry
                </Link>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-4">

              {/* Halls & Pricing */}
              <div className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                  <p className="font-semibold text-sm text-[#111827]">Halls &amp; Pricing</p>
                  <span className={`rounded px-2.5 py-0.5 text-[11px] font-semibold ${
                    isHotel ? "bg-[#F5F0FF] text-[#8B31C7]" : "bg-[#FFFBEB] text-[#92400E]"
                  }`}>
                    {isHotel ? "Per person · hotel" : isConvention ? "Flat rate · convention" : "Flat rate per event"}
                  </span>
                </div>
                <div className="px-5">
                  {venue.halls.map(hall => <HallRow key={hall.name} hall={hall} />)}
                </div>
              </div>

              {/* Pricing note */}
              <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-5">
                <p className="text-xs font-semibold text-[#92400E] uppercase tracking-wider mb-2">About these prices</p>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  {isHotel
                    ? "Hotel pricing is per person and covers the banquet space, basic setup, and service staff. Catering is billed separately per plate. Minimum guest count applies."
                    : isConvention
                    ? "Convention centre pricing is a flat rate per event. The hall, AV equipment, and basic setup are included. Catering and décor are arranged separately."
                    : `${venue.type} pricing is a flat hall rate per event. Catering, décor, and additional services are quoted separately by the property.`}
                </p>
                <p className="mt-2 text-xs text-[#92400E]/70">Prices are indicative and subject to property confirmation. GST applicable.</p>
              </div>

              {/* Budget link */}
              <div className="flex justify-end">
                <Link href="/budget" className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#111827] hover:bg-[#F9FAFB] transition-colors">
                  Add to budget planner
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back ── */}
      <section className="pb-16">
        <div className="wb-container">
          <Link href={`/venues/${district}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6B7280] hover:text-[#8B31C7] transition-colors">
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            All venues in {districtData.name}
          </Link>
        </div>
      </section>

    </div>
  );
}
