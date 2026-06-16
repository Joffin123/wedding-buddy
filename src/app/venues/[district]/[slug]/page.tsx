import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getDistrictBySlug,
  getVenueBySlug,
  type Hall,
} from "@/lib/kerala-venues";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueBySlug(slug);
  if (!venue) return { title: "Venue not found" };
  return {
    title: `${venue.name} · Wedding Buddy`,
    description: venue.description,
  };
}

function formatPrice(hall: Hall): string {
  if (hall.priceType === "per_pax") {
    return `₹${hall.price.toLocaleString()} per person`;
  }
  return `₹${hall.price.toLocaleString()}`;
}

function PriceTag({ hall }: { hall: Hall }) {
  const isPerPax = hall.priceType === "per_pax";
  return (
    <div className={`rounded-xl border p-5 transition-all duration-200 hover:shadow-md ${isPerPax ? "border-blue-100 bg-blue-50/50" : "border-purple-100 bg-purple-50/50"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[#2A1A33]">{hall.name}</h4>
          <p className="mt-1 text-sm text-[#2A1A33]/55">
            Up to <span className="font-medium text-[#2A1A33]">{hall.capacity.toLocaleString()}</span> guests
            {hall.minPax ? ` · min. ${hall.minPax} pax` : ""}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xl font-bold text-[#2A1A33]">
            ₹{hall.price.toLocaleString()}
          </p>
          <p className={`text-xs font-semibold mt-0.5 ${isPerPax ? "text-blue-600" : "text-purple-600"}`}>
            {isPerPax ? "per person" : "flat rate"}
          </p>
          {isPerPax && hall.minPax && (
            <p className="text-xs text-[#2A1A33]/40 mt-0.5">
              min. ₹{(hall.price * hall.minPax).toLocaleString()}
            </p>
          )}
        </div>
      </div>
      <div className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${isPerPax ? "text-blue-700" : "text-purple-700"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${isPerPax ? "bg-blue-500" : "bg-purple-500"}`} />
        {isPerPax ? "Hotel — per pax pricing" : "Convention Centre — flat rate pricing"}
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
  const minPrice = Math.min(...venue.halls.map((h) => h.price));
  const maxCapacity = Math.max(...venue.halls.map((h) => h.capacity));

  return (
    <div className="relative w-full">
      {/* ── HEADER ── */}
      <section className="pt-12 pb-10 sm:pt-20 border-b border-gray-100">
        <div className="wb-container">
          <div className="flex items-center gap-2 text-sm text-[#2A1A33]/50">
            <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/venues" className="hover:text-rose-600 transition-colors">Venues</Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href={`/venues/${district}`} className="hover:text-rose-600 transition-colors">{districtData.name}</Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-[#2A1A33] truncate max-w-[160px]">{venue.name}</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isHotel ? "bg-blue-100 text-blue-700" :
                  isConvention ? "bg-purple-100 text-purple-700" :
                  venue.type === "Palace" ? "bg-amber-100 text-amber-700" :
                  venue.type === "Resort" ? "bg-emerald-100 text-emerald-700" :
                  venue.type === "Heritage Hall" ? "bg-orange-100 text-orange-700" :
                  "bg-teal-100 text-teal-700"
                }`}>
                  {venue.type}
                </span>
                <span className="text-sm text-[#2A1A33]/50">{districtData.emoji} {districtData.name}</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-medium tracking-tight text-[#2A1A33] sm:text-4xl animate-wb-fade-up">
                {venue.name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-[#2A1A33]/55">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {venue.address}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end lg:gap-2">
              <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-center shadow-sm min-w-[110px]">
                <p className="text-lg font-bold text-[#2A1A33]">
                  {isHotel ? `₹${minPrice.toLocaleString()}` : `₹${minPrice.toLocaleString()}`}
                </p>
                <p className="text-xs text-[#2A1A33]/50">{isHotel ? "per person (from)" : "flat rate (from)"}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-center shadow-sm min-w-[110px]">
                <p className="text-lg font-bold text-[#2A1A33]">{maxCapacity.toLocaleString()}</p>
                <p className="text-xs text-[#2A1A33]/50">max capacity</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-center shadow-sm min-w-[110px]">
                <p className="text-lg font-bold text-[#2A1A33]">{venue.halls.length}</p>
                <p className="text-xs text-[#2A1A33]/50">hall{venue.halls.length !== 1 ? "s" : ""} available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-12">
        <div className="wb-container">
          <div className="grid gap-10 lg:grid-cols-3">

            {/* LEFT: About + Highlights */}
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="font-bold text-[#2A1A33] mb-3">About this venue</h2>
                <p className="text-sm leading-relaxed text-[#2A1A33]/70">{venue.description}</p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="font-bold text-[#2A1A33] mb-4">Highlights</h2>
                <ul className="space-y-2.5">
                  {venue.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-[#2A1A33]/70">
                      <svg className="h-4 w-4 flex-shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
                <h3 className="font-bold text-[#2A1A33] text-sm">Enquire about this venue</h3>
                <p className="mt-1.5 text-xs text-[#2A1A33]/60 leading-relaxed">Contact us to check availability, request a site visit, or get a personalised quote.</p>
                <Link
                  href="/contact"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700 transition-colors"
                >
                  Send an enquiry
                </Link>
              </div>
            </div>

            {/* RIGHT: Halls & Pricing */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-[#2A1A33] text-lg">Halls &amp; Pricing</h2>
                <div className="flex items-center gap-3 text-xs">
                  {isHotel && (
                    <span className="flex items-center gap-1.5 text-blue-700">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      Per person (hotel)
                    </span>
                  )}
                  {isConvention && (
                    <span className="flex items-center gap-1.5 text-purple-700">
                      <span className="h-2 w-2 rounded-full bg-purple-500" />
                      Flat rate (convention)
                    </span>
                  )}
                  {!isHotel && !isConvention && (
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className="h-2 w-2 rounded-full bg-gray-400" />
                      Flat rate per event
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {venue.halls.map((hall) => (
                  <PriceTag key={hall.name} hall={hall} />
                ))}
              </div>

              {/* Pricing legend */}
              <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-xs text-amber-800">
                <p className="font-semibold mb-1">About these prices</p>
                {isHotel ? (
                  <p className="leading-relaxed">This is a <strong>hotel venue</strong> — pricing is per person. The rate covers the banquet space, basic setup, and service staff. Catering is billed separately per plate. Minimum guest count applies.</p>
                ) : isConvention ? (
                  <p className="leading-relaxed">This is a <strong>convention centre</strong> — pricing is a flat rate per event/day. The hall, AV equipment, and basic setup are included. Catering and decor are arranged separately.</p>
                ) : (
                  <p className="leading-relaxed">This is a <strong>{venue.type.toLowerCase()}</strong> — pricing is a flat hall rate per event. Catering, décor, and additional services are quoted separately. Contact us for a full package price.</p>
                )}
                <p className="mt-2 text-amber-700">All prices are indicative and subject to confirmation by the property. GST applicable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK ── */}
      <section className="pb-20">
        <div className="wb-container flex items-center justify-between">
          <Link
            href={`/venues/${district}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2A1A33]/50 hover:text-rose-600 transition-colors"
          >
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            All venues in {districtData.name}
          </Link>
          <Link
            href="/budget"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Build your budget
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
