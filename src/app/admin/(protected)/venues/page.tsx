import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { storageUrl, formatINR, type VenueRow } from "@/lib/supabase";
import { friendlyDbError } from "@/lib/format-db-error";
import { PageHeader, ErrorBanner, EmptyState, EditLink, Card } from "@/components/admin/ui";
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
    <div className="space-y-6">
      <PageHeader
        title="Venues"
        description={`${venues.length} venue${venues.length === 1 ? "" : "s"} in the catalogue.`}
        action={{ href: "/admin/venues/new", label: "+ Add venue" }}
      />

      {error && <ErrorBanner title="Could not load venues." message={friendlyDbError(error.message)} />}

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">
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
                <tr key={v.id} className="border-t border-gray-100 transition-colors hover:bg-gray-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {img && <Image src={img} alt={v.name} fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{v.name}</p>
                        <p className="text-xs text-[#9CA3AF]">{v.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#4B5563]">{v.region}</td>
                  <td className="px-4 py-3 text-[#4B5563]">{v.type}</td>
                  <td className="px-4 py-3 text-[#4B5563]">{formatINR(v.price_from)}</td>
                  <td className="px-4 py-3">{v.featured ? "★" : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <EditLink href={`/admin/venues/${v.id}/edit`} />
                      <form action={deleteVenue.bind(null, v.id)}>
                        <DeleteButton confirmText={`Delete "${v.name}"? This can't be undone.`} />
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {venues.length === 0 && !error && <EmptyState message="No venues yet — add your first one." />}
      </Card>
    </div>
  );
}
