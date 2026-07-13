import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { GalleryRow } from "@/lib/supabase";
import GalleryForm from "@/components/admin/GalleryForm";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { updateGalleryItem } from "../../actions";

export default async function EditGalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: item } = await supabaseAdmin.from("gallery").select("*").eq("id", id).maybeSingle<GalleryRow>();

  if (!item) notFound();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/gallery" label="Back to gallery" />
      <PageHeader title={`Edit ${item.title}`} />
      <GalleryForm action={updateGalleryItem.bind(null, id)} item={item} submitLabel="Save changes" />
    </div>
  );
}
