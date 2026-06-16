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
    description: `Browse all wedding venues in ${d.name}, Kerala.`,
  };
}

const VENUE_ICON: Record<KeralaVenue["type"], string> = {
  Hotel: "🏨",
  "Convention Centre": "🏛️",
  Resort: "🌿",
  Palace: "👑",
  "Heritage Hall": "🏰",
  "Beach Resort": "🏖️",
  Houseboat: "🚣",
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
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="border-b border-[#E5E7EB] py-12 sm:py-16">
        <div className="wb-container">
          <nav className="flex items-center gap-1.5 text-sm text-[#9CA3AF] mb-6">
            <Link href="/" className="hover:text-[#8B31C7] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/venues" className="hover:text-[#8B31C7] transition-colors">Venues</Link>
            <span>/</span>
            <span className="text-[#111827]">{districtData.name}</span>
          </nav>

          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F5F0FF] text-2xl flex-shrink-0">
              {districtData.emoji}
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl animate-wb-fade-up">
                Venues in {districtData.name}
              </h1>
              <p className="mt-1 text-sm text-[#6B7280] animate-wb-fade-up wb-delay-100">
                {districtData.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Venue list ── */}
      <section className="py-10">
        <div className="wb-container">
          {venues.length === 0 ? (
            <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-10 text-center">
              <p className="font-semibold text-[#111827]">No venues listed yet.</p>
              <p className="mt-1 text-sm text-[#6B7280]">More properties coming soon.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-[#9CA3AF] mb-5">
                <span className="font-semibold text-[#6B7280]">{venues.length} venue{venues.length !== 1 ? "s" : ""}</span>
                &nbsp;·&nbsp;Pricing shown after selecting a property
              </p>

              <div className="rounded-xl border border-[#E5E7EB] overflow-hidden divide-y divide-[#E5E7EB]">
                {venues.map((venue) => (
                  <Link
                    key={venue.slug}
                    href={`/venues/${district}/${venue.slug}`}
                    className="group flex items-center gap-4 bg-white px-5 py-4 hover:bg-[#FAFAFA] transition-colors"
                  >
                    {/* Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-lg flex-shrink-0 group-hover:border-[#8B31C7] group-hover:bg-[#F5F0FF] transition-colors">
                      {VENUE_ICON[venue.type]}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm text-[#111827] group-hover:text-[#8B31C7] transition-colors">
                          {venue.name}
                        </p>
                        <span className="rounded border border-[#E5E7EB] bg-white px-2 py-0.5 text-[11px] font-medium text-[#6B7280]">
                          {venue.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] truncate">{venue.address}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-[#9CA3AF]">
                        <span>{venue.halls.length} hall{venue.halls.length !== 1 ? "s" : ""}</span>
                        <span>·</span>
                        <span>Up to {Math.max(...venue.halls.map(h => h.capacity)).toLocaleString()} guests</span>
                        <span>·</span>
                        <span className="flex flex-wrap gap-1.5">
                          {venue.highlights.slice(0, 2).map(h => (
                            <span key={h} className="rounded bg-[#F9FAFB] px-1.5 py-0.5 border border-[#E5E7EB]">{h}</span>
                          ))}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="hidden sm:block text-xs font-medium text-[#9CA3AF] group-hover:text-[#8B31C7] transition-colors">
                        View pricing
                      </span>
                      <svg className="h-4 w-4 text-[#D1D5DB] group-hover:text-[#8B31C7] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Back ── */}
      <section className="pb-16">
        <div className="wb-container">
          <Link href="/venues" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6B7280] hover:text-[#8B31C7] transition-colors">
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            All districts
          </Link>
        </div>
      </section>

    </div>
  );
}
