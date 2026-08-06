import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDistrictBySlug } from "@/lib/kerala-venues";
import { regionsForDistrictSlug } from "@/lib/kerala-regions";
import { supabase, formatINR, storageUrl, type VenueRow } from "@/lib/supabase";

export const dynamic = "force-dynamic";

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

const VENUE_ICON: Record<string, string> = {
  Palace: "👑",
  Resort: "🌿",
  Beachfront: "🏖️",
  Heritage: "🏰",
  Estate: "🌾",
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

  const regions = regionsForDistrictSlug(district);

  let venues: VenueRow[] = [];
  let error: string | null = null;

  if (regions.length > 0) {
    const { data, error: dbError } = await supabase
      .from("venues")
      .select("*")
      .in("region", regions)
      .order("featured", { ascending: false })
      .returns<VenueRow[]>();
    if (dbError) error = dbError.message;
    else venues = data ?? [];
  }

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
            <Link href="/venues" className="hover:text-[#8B31C7] transition-colors">Venues</Link>
            <span>/</span>
            <span className="text-[#111827]">{districtData.name}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-200 bg-[#F5F0FF] text-3xl flex-shrink-0 shadow-sm animate-wb-drift">
              {districtData.emoji}
            </span>
            <div>
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827] animate-wb-fade-up">
                Venues in {districtData.name}
              </h1>
              <p className="mt-1.5 text-base sm:text-lg text-[#6B7280] animate-wb-fade-up wb-delay-100">
                {districtData.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Venue list ── */}
      <section className="py-12">
        <div className="wb-container">
          {error && (
            <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
              Could not load venues: {error}.
            </div>
          )}

          {venues.length === 0 ? (
            <div className="rounded-xl border border-purple-100 bg-[#F9FAFB] p-10 text-center">
              <p className="font-semibold text-[#111827]">No venues listed yet.</p>
              <p className="mt-1 text-sm text-[#6B7280]">More properties coming soon.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#9CA3AF] mb-6">
                <span className="font-bold text-[#6B7280]">{venues.length} venue{venues.length !== 1 ? "s" : ""}</span>
                &nbsp;·&nbsp;Pricing shown after selecting a property
              </p>

              <div className="rounded-2xl border border-purple-100 overflow-hidden divide-y divide-purple-100 shadow-sm">
                {venues.map((venue, idx) => {
                  const imageUrl = storageUrl(venue.image_path);
                  return (
                    <Link
                      key={venue.slug}
                      href={`/venues/${district}/${venue.slug}`}
                      className={`group flex items-center gap-4 px-5 py-5 transition-colors cursor-pointer ${
                        idx % 2 === 1 ? "bg-[#F4F9FF]/20" : "bg-white"
                      } hover:bg-[#F5F0FF]/30`}
                    >
                      {/* Icon / thumbnail */}
                      {imageUrl ? (
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-purple-100">
                          <Image src={imageUrl} alt={venue.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-100 bg-[#F9FAFB] text-xl flex-shrink-0 group-hover:border-[#8B31C7] group-hover:bg-[#F5F0FF] transition-colors">
                          {VENUE_ICON[venue.type] ?? "🏛️"}
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5 mb-1">
                          <p className="font-display font-bold text-base sm:text-lg text-[#111827] group-hover:text-[#8B31C7] transition-colors">
                            {venue.name}
                          </p>
                          <span className="rounded-lg border border-purple-200 bg-[#F5F0FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8B31C7]">
                            {venue.type}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B7280] truncate">{venue.location}</p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#9CA3AF]">
                          <span>From {formatINR(venue.price_from)}</span>
                          <span>·</span>
                          <span>Up to {venue.capacity_max.toLocaleString()} guests</span>
                          <span>·</span>
                          <span className="flex flex-wrap gap-1.5 font-medium">
                            {venue.highlights.slice(0, 2).map(h => (
                              <span key={h} className="rounded bg-[#F9FAFB] px-2 py-0.5 border border-purple-100 text-[10px] uppercase text-[#6B7280]">{h}</span>
                            ))}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="hidden sm:block text-xs font-bold uppercase tracking-wider text-[#9CA3AF] group-hover:text-[#8B31C7] transition-colors">
                          View pricing
                        </span>
                        <svg className="h-4 w-4 text-[#D1D5DB] group-hover:text-[#8B31C7] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Back ── */}
      <section className="pb-16 pt-4">
        <div className="wb-container">
          <Link href="/venues" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#6B7280] hover:text-[#8B31C7] transition-colors">
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            All districts
          </Link>
        </div>
      </section>

    </div>
  );
}
