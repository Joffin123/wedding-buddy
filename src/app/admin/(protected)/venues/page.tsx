import Link from "next/link";
import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { storageUrl, formatINR, type VenueRow } from "@/lib/supabase";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteVenue } from "./actions";

export default async function AdminVenuesPage() {
  const { data, error } = await supabaseAdmin
    .from("venues")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<VenueRow[]>();

  const venues = data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#111827]">Venues</h1>
          <p className="mt-1 text-sm text-[#6B7280]">{venues.length} venues in the catalogue.</p>
        </div>
        <Link href="/admin/venues/new" className="rounded-xl bg-[#8B31C7] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a28b0]">
          + Add venue
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load venues: {error.message}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F5F0FF] text-[10px] font-bold uppercase tracking-widest text-[#8B31C7]">
            <tr>
              <th className="px-4 py-3">Venue</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((v) => {
              const img = storageUrl(v.image_path);
              return (
                <tr key={v.id} className="border-t border-purple-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-purple-100 to-pink-100">
                        {img && <Image src={img} alt={v.name} fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{v.name}</p>
                        <p className="text-xs text-[#9CA3AF]">{v.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#374151]">{v.region}</td>
                  <td className="px-4 py-3 text-[#374151]">{v.type}</td>
                  <td className="px-4 py-3 text-[#374151]">{formatINR(v.price_from)}</td>
                  <td className="px-4 py-3">{v.featured ? "★" : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/venues/${v.id}/edit`} className="rounded-lg border border-purple-200 px-2.5 py-1 text-xs font-semibold text-[#8B31C7] hover:bg-[#F5F0FF] transition-colors">
                        Edit
                      </Link>
                      <form action={deleteVenue.bind(null, v.id)}>
                        <DeleteButton confirmText={`Delete "${v.name}"? This can't be undone.`} />
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {venues.length === 0 && !error && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-[#9CA3AF]">
                  No venues yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
