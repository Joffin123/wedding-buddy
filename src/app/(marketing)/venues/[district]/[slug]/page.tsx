import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDistrictBySlug } from "@/lib/kerala-venues";
import { supabase, storageUrl, type VenueRow } from "@/lib/supabase";
import HallPricingClient from "@/components/HallPricingClient";
import type { Hall } from "@/lib/kerala-venues";

export const dynamic = "force-dynamic";

async function fetchVenue(slug: string): Promise<VenueRow | null> {
  const { data } = await supabase.from("venues").select("*").eq("slug", slug).maybeSingle<VenueRow>();
  return data ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ district: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = await fetchVenue(slug);
  if (!venue) return { title: "Venue not found" };
  return { title: `${venue.name} · Wedding Buddy`, description: venue.tagline };
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ district: string; slug: string }>;
}) {
  const { district, slug } = await params;
  const districtData = getDistrictBySlug(district);
  const venue = await fetchVenue(slug);
  if (!venue || !districtData) notFound();

  const imageUrl = storageUrl(venue.image_path);

  // The Supabase schema stores a single flat starting price per venue
  // (no per-hall breakdown), so we present it as one "hall" row.
  const halls: Hall[] = [
    {
      name: venue.name,
      capacity: venue.capacity_max,
      priceType: "flat",
      price: venue.price_from,
      minPax: venue.capacity_min || undefined,
    },
  ];

  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="border-b border-purple-100 bg-gradient-to-b from-[#FFFAF0] to-white py-12 sm:py-16">
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
                <span className="rounded border border-purple-200 bg-[#F5F0FF] px-2.5 py-0.5 text-xs font-semibold text-[#8B31C7]">
                  {venue.type}
                </span>
                <span className="text-xs text-[#9CA3AF]">{districtData.emoji} {districtData.name}</span>
                {venue.featured && (
                  <span className="rounded border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">★ Featured</span>
                )}
              </div>
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] animate-wb-fade-up">
                {venue.name}
              </h1>
              <p className="mt-2 text-base text-[#6B7280] flex items-center gap-1.5 animate-wb-fade-up wb-delay-100">
                <svg className="h-3.5 w-3.5 flex-shrink-0 text-[#8B31C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {venue.location}
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:flex-col sm:items-end">
              {[
                { label: "from (flat rate)", value: `₹${venue.price_from.toLocaleString()}` },
                { label: "max guests", value: venue.capacity_max.toLocaleString() },
                { label: "min guests", value: venue.capacity_min.toLocaleString() },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-purple-100 bg-white px-4 py-2.5 text-center min-w-[110px] shadow-sm">
                  <p className="font-sans text-lg font-black text-[#111827]">{s.value}</p>
                  <p className="text-[10px] uppercase font-semibold tracking-wider text-[#9CA3AF] mt-0.5">{s.label}</p>
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
              {/* Photo */}
              {imageUrl && (
                <div className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-purple-100 shadow-sm bg-gradient-to-br ${venue.gradient}`}>
                  <Image src={imageUrl} alt={venue.name} fill className="object-cover" />
                </div>
              )}

              {/* About */}
              <div className="rounded-xl border border-purple-100 bg-[#FEF9F3] p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B31C7] mb-3">About</p>
                <p className="text-base text-[#6B7280] leading-relaxed">{venue.tagline}</p>
              </div>

              {/* Highlights */}
              <div className="rounded-xl border border-purple-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#8B31C7] mb-3">Highlights</p>
                <ul className="space-y-2.5">
                  {venue.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-base text-[#374151]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F0FF] text-[10px] text-[#8B31C7] flex-shrink-0 font-bold">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enquiry */}
              <div className="rounded-xl border border-purple-200 bg-gradient-to-tr from-[#F5F0FF] to-pink-50/50 p-5 shadow-sm">
                <p className="font-display font-bold text-sm text-[#111827] mb-1">Enquire about this venue</p>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  Check availability, request a site visit, or get a full quote from the property.
                </p>
                <Link href="/contact" className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white hover:shadow-md transition-all cursor-pointer">
                  Send an enquiry
                </Link>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-4">

              {/* Pricing */}
              <HallPricingClient
                halls={halls}
                isHotel={false}
                isConvention={false}
                venueType={venue.type}
              />

              {/* Pricing note */}
              <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-5">
                <p className="text-xs font-semibold text-[#92400E] uppercase tracking-wider mb-2">About these prices</p>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  {`${venue.type} pricing is a flat hall rate per event. Catering, décor, and additional services are quoted separately by the property.`}
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
