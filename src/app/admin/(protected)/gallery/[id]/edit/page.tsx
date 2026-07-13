import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { GalleryRow } from "@/lib/supabase";
import GalleryForm from "@/components/admin/GalleryForm";
import { updateGalleryItem } from "../../actions";

export default async function EditGalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: item } = await supabaseAdmin.from("gallery").select("*").eq("id", id).maybeSingle<GalleryRow>();

  if (!item) notFound();

  return (
    <div>
      <Link href="/admin/gallery" className="text-sm font-semibold text-[#8B31C7] hover:underline">← Back to gallery</Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-[#111827]">Edit {item.title}</h1>
      <div className="mt-6">
        <GalleryForm action={updateGalleryItem.bind(null, id)} item={item} submitLabel="Save changes" />
      </div>
    </div>
  );
}
