import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { supabase, storageUrl, formatINR, type VenueRow } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Venues · Wedding Buddy",
  description:
    "Discover Kerala's most breathtaking wedding venues — palaces, backwater resorts, beachfront estates, and heritage halls.",
};

export const dynamic = "force-dynamic";

const regions = ["All Kerala", "Kochi", "Kumarakom", "Munnar", "Thekkady", "Wayanad", "Varkala", "Thiruvananthapuram"];
const types = ["Palace", "Resort", "Beachfront", "Heritage", "Estate", "Houseboat"];

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
      {/* HEADER */}
      <section className="pt-12 pb-16 sm:pt-20">
        <div className="wb-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-600 animate-wb-fade-up">Venues</p>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.08] tracking-tight text-[#2A1A33] sm:text-6xl md:text-7xl text-balance animate-wb-fade-up wb-delay-100">
              Kerala&apos;s most
              <span className="block wb-gradient-text italic animate-wb-shimmer pb-1">
                breathtaking venues.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#2A1A33]/70 sm:text-lg animate-wb-fade-up wb-delay-200">
              Hand-picked estates across palaces, backwater resorts, and beachfront cliffs. Every venue vetted, every rate transparent, every date verified with the property.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-12 space-y-4 animate-wb-fade-up wb-delay-300">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50 mb-3">Region</p>
              <div className="flex flex-wrap gap-2">
                {regions.map((r, i) => (
                  <button
                    key={r}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                      i === 0
                        ? "border-rose-400 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 text-white shadow-md"
                        : "border-rose-200 bg-white/80 text-[#2A1A33]/80 hover:-translate-y-0.5 hover:border-rose-400 hover:bg-white hover:text-rose-700"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2A1A33]/50 mb-3">Type</p>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    className="rounded-full border border-rose-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#2A1A33]/80 transition-all hover:-translate-y-0.5 hover:border-rose-400 hover:bg-white hover:text-rose-700"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-24">
        <div className="wb-container">
          {error && (
            <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
              Could not load venues: {error.message}. Did you run the schema SQL in Supabase? See <code className="px-1 bg-white rounded">supabase/README.md</code>.
            </div>
          )}

          {venues.length === 0 && !error && (
            <div className="rounded-3xl border border-rose-200 bg-white/80 p-10 text-center">
              <p className="font-display text-2xl text-[#2A1A33]">No venues yet.</p>
              <p className="mt-3 text-sm text-[#2A1A33]/70">
                Paste <code className="px-1 bg-rose-50 rounded">supabase/schema.sql</code> into the Supabase SQL Editor, then run <code className="px-1 bg-rose-50 rounded">npm run db:seed</code>.
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v, idx) => {
              const imageUrl = storageUrl(v.image_path);
              const capacity = `${v.capacity_min} – ${v.capacity_max} guests`;
              return (
                <article
                  key={v.id}
                  style={{ animationDelay: `${idx * 70}ms` }}
                  className="group relative overflow-hidden rounded-3xl border border-rose-100 bg-white/90 shadow-[0_10px_40px_-24px_rgba(232,115,155,0.4)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-rose-300 hover:shadow-[0_24px_60px_-24px_rgba(232,115,155,0.55)] animate-wb-fade-up"
                >
                  <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${v.gradient}`}>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={v.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 opacity-70"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.7), transparent 50%), radial-gradient(circle at 70% 80%, rgba(232,115,155,0.22), transparent 50%)",
                          }}
                        />
                        <svg
                          className="absolute inset-0 h-full w-full text-white/70 transition-transform duration-700 group-hover:scale-105"
                          viewBox="0 0 400 300"
                          fill="none"
                          preserveAspectRatio="xMidYMid slice"
                          aria-hidden
                        >
                          <path d="M0 220 L80 170 L140 200 L200 150 L260 180 L320 140 L400 170 L400 300 L0 300 Z" fill="currentColor" />
                          <path d="M0 250 L60 230 L120 245 L200 220 L280 240 L360 220 L400 235 L400 300 L0 300 Z" fill="currentColor" opacity="0.6" />
                          <circle cx="340" cy="60" r="20" fill="currentColor" opacity="0.7" />
                        </svg>
                      </>
                    )}

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 z-10">
                      <span className="rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2A1A33] backdrop-blur-md">
                        {v.type}
                      </span>
                      {v.featured && (
                        <span className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/75 to-transparent p-5 pt-16 z-10">
                      <h3 className="font-display text-2xl font-medium leading-tight text-[#2A1A33]">{v.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[#2A1A33]/70">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {v.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-[#2A1A33]/80">{v.tagline}</p>

                    <ul className="mt-4 space-y-1.5">
                      {v.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-[#2A1A33]/70 leading-relaxed">
                          <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-end justify-between border-t border-rose-100 pt-4">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/45">From</p>
                        <p className="mt-0.5 font-display text-xl font-medium text-[#2A1A33] leading-tight">{formatINR(v.price_from)}</p>
                        <p className="mt-0.5 text-[11px] text-[#2A1A33]/50">{capacity}</p>
                      </div>
                      <Link
                        href="/contact"
                        className="group/btn inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 transition-all hover:bg-gradient-to-r hover:from-rose-500 hover:to-indigo-500 hover:text-white"
                      >
                        View
                        <svg className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA strip */}
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
              <Link
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
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
