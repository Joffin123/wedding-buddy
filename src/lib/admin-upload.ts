import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Uploads to the public `images` bucket under images/<folder>/<slug>-<timestamp>.<ext>
// and returns the DB-stored path convention: "images/<folder>/<file>".
export async function uploadAdminImage(
  file: File,
  folder: "venues" | "vendors" | "gallery",
  slug: string
): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "image";
  const filename = `${safeSlug}-${Date.now()}.${ext}`;
  const storagePath = `${folder}/${filename}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabaseAdmin.storage
    .from("images")
    .upload(storagePath, buffer, { contentType: file.type || "image/jpeg", upsert: true });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  return `images/${storagePath}`;
}
