import Link from "next/link";
import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { storageUrl, type GalleryRow } from "@/lib/supabase";
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
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#111827]">Gallery</h1>
          <p className="mt-1 text-sm text-[#6B7280]">{items.length} inspiration photos.</p>
        </div>
        <Link href="/admin/gallery/new" className="rounded-xl bg-[#8B31C7] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a28b0]">
          + Add photo
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load gallery: {error.message}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((g) => {
          const img = storageUrl(g.image_path);
          return (
            <div key={g.id} className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
              <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100">
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
                  <Link href={`/admin/gallery/${g.id}/edit`} className="rounded-lg border border-purple-200 px-2.5 py-1 text-xs font-semibold text-[#8B31C7] hover:bg-[#F5F0FF] transition-colors">
                    Edit
                  </Link>
                  <form action={deleteGalleryItem.bind(null, g.id)}>
                    <DeleteButton confirmText={`Delete "${g.title}"? This can't be undone.`} />
                  </form>
                </div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && !error && (
          <p className="col-span-full py-8 text-center text-sm text-[#9CA3AF]">No gallery photos yet — add your first one.</p>
        )}
      </div>
    </div>
  );
}
