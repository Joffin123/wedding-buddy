import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { storageUrl, type GalleryRow } from "@/lib/supabase";
import { friendlyDbError } from "@/lib/format-db-error";
import { PageHeader, ErrorBanner, EmptyState, EditLink, Card } from "@/components/admin/ui";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteGalleryItem } from "./actions";

export default async function AdminGalleryPage() {
  const { data, error } = await supabaseAdmin
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<GalleryRow[]>();

  const items = data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery"
        description={`${items.length} inspiration photo${items.length === 1 ? "" : "s"}.`}
        action={{ href: "/admin/gallery/new", label: "+ Add photo" }}
      />

      {error && <ErrorBanner title="Could not load gallery." message={friendlyDbError(error.message)} />}

      {items.length === 0 && !error ? (
        <Card>
          <EmptyState message="No gallery photos yet — add your first one." />
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((g) => {
            const img = storageUrl(g.image_path);
            return (
              <Card key={g.id} className="overflow-hidden">
                <div className="relative aspect-square bg-gray-100">
                  {img && <Image src={img} alt={g.title} fill className="object-cover" />}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-[#111827]">{g.title}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {g.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[#F5F0FF] px-2 py-0.5 text-[10px] font-semibold text-[#8B31C7]">{t}</span>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <EditLink href={`/admin/gallery/${g.id}/edit`} />
                    <form action={deleteGalleryItem.bind(null, g.id)}>
                      <DeleteButton confirmText={`Delete "${g.title}"? This can't be undone.`} />
                    </form>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
