import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { storageUrl, type VendorRow } from "@/lib/supabase";
import { friendlyDbError } from "@/lib/format-db-error";
import { PageHeader, ErrorBanner, EmptyState, EditLink, Card } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteVendor } from "./actions";

export default async function AdminVendorsPage() {
  const { data, error } = await supabaseAdmin
    .from("vendors")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<VendorRow[]>();

  const vendors = data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendors"
        description={`${vendors.length} vendor${vendors.length === 1 ? "" : "s"} in the catalogue.`}
        action={{ href: "/admin/vendors/new", label: "+ Add vendor" }}
      />

      {error && <ErrorBanner title="Could not load vendors." message={friendlyDbError(error.message)} />}

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">
            <tr>
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => {
              const img = storageUrl(v.image_path);
              return (
                <tr key={v.id} className="border-t border-gray-100 transition-colors hover:bg-gray-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                        {img && <Image src={img} alt={v.name} fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{v.name}</p>
                        <p className="text-xs text-[#9CA3AF]">{v.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#4B5563]">{v.category}</td>
                  <td className="px-4 py-3 text-[#4B5563]">★ {Number(v.rating).toFixed(1)} ({v.reviews})</td>
                  <td className="px-4 py-3 text-[#4B5563]">₹{v.price_from.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-xs text-[#4B5563]">
                    {v.verified && <span className="mr-1">✓ Verified</span>}
                    {v.featured && <span>★ Featured</span>}
                    {!v.verified && !v.featured && "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <EditLink href={`/admin/vendors/${v.id}/edit`} />
                      <form action={deleteVendor.bind(null, v.id)}>
                        <DeleteButton confirmText={`Delete "${v.name}"? This can't be undone.`} />
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {vendors.length === 0 && !error && <EmptyState message="No vendors yet — add your first one." />}
      </Card>
    </div>
  );
}
