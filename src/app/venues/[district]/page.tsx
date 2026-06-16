import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDistrictBySlug, getVenuesByDistrict, type KeralaVenue } from "@/lib/kerala-venues";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string }>;
}): Promise<Metadata> {
  const { district } = await params;
  const d = getDistrictBySlug(district);
  if (!d) return { title: "District not found" };
  return {
    title: `Wedding Venues in ${d.name} · Wedding Buddy`,
    description: `Browse all wedding venues in ${d.name}, Kerala — hotels, convention centres, resorts, and heritage halls.`,
  };
}

const TYPE_BADGE: Record<KeralaVenue["type"], { bg: string; text: string }> = {
  Hotel: { bg: "bg-blue-50", text: "text-blue-700" },
  "Convention Centre": { bg: "bg-purple-50", text: "text-purple-700" },
  Resort: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Palace: { bg: "bg-amber-50", text: "text-amber-700" },
  "Heritage Hall": { bg: "bg-orange-50", text: "text-orange-700" },
  "Beach Resort": { bg: "bg-sky-50", text: "text-sky-700" },
  Houseboat: { bg: "bg-teal-50", text: "text-teal-700" },
};

export default async function DistrictVenuesPage({
  params,
}: {
  params: Promise<{ district: string }>;
}) {
  const { district } = await params;
  const districtData = getDistrictBySlug(district);
  if (!districtData) notFound();

  const venues = getVenuesByDistrict(districtData.name);

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
            <span className="text-[#2A1A33]">{districtData.name}</span>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-3xl flex-shrink-0">
              {districtData.emoji}
            </div>
            <div>
              <h1 className="font-display text-3xl font-medium tracking-tight text-[#2A1A33] sm:text-4xl animate-wb-fade-up">
                All Venues in {districtData.name}
              </h1>
              <p className="mt-1 text-sm text-[#2A1A33]/55 animate-wb-fade-up wb-delay-100">
                {districtData.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VENUE LIST ── */}
      <section className="py-12">
        <div className="wb-container">
          {venues.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
              <p className="font-display text-2xl text-[#2A1A33]">No venues listed yet.</p>
              <p className="mt-3 text-sm text-[#2A1A33]/60">We&apos;re adding more properties across Kerala. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="mb-6 text-sm text-[#2A1A33]/50">
                <span className="font-semibold text-[#2A1A33]">{venues.length} venues</span> found in {districtData.name}
              </p>
              {venues.map((venue, i) => {
                const badge = TYPE_BADGE[venue.type];
                return (
                  <Link
                    key={venue.slug}
                    href={`/venues/${district}/${venue.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-[0_12px_32px_-12px_rgba(232,115,155,0.3)] sm:flex-row sm:items-center sm:gap-5"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {/* Icon placeholder */}
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-indigo-100 text-2xl">
                      {venue.type === "Hotel" ? "🏨" :
                       venue.type === "Convention Centre" ? "🏛️" :
                       venue.type === "Resort" ? "🌿" :
                       venue.type === "Palace" ? "👑" :
                       venue.type === "Heritage Hall" ? "🏰" :
                       venue.type === "Beach Resort" ? "🏖️" :
                       "🚣"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-[#2A1A33] group-hover:text-rose-600 transition-colors">
                          {venue.name}
                        </h2>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.bg} ${badge.text}`}>
                          {venue.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[#2A1A33]/50 truncate">{venue.address}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#2A1A33]/55">
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {venue.halls.length} hall{venue.halls.length !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Up to {Math.max(...venue.halls.map((h) => h.capacity)).toLocaleString()} guests
                        </span>
                        <span className="flex flex-wrap gap-1.5">
                          {venue.highlights.slice(0, 2).map((h) => (
                            <span key={h} className="rounded-full bg-gray-100 px-2 py-0.5 text-[#2A1A33]/60">{h}</span>
                          ))}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="hidden sm:block text-sm font-semibold text-rose-600">View pricing</span>
                      <svg className="h-4 w-4 text-[#2A1A33]/30 group-hover:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── BACK ── */}
      <section className="pb-20">
        <div className="wb-container">
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2A1A33]/50 hover:text-rose-600 transition-colors"
          >
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            View all districts
          </Link>
        </div>
      </section>
    </div>
  );
}
