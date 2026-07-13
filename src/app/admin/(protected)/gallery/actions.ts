"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { uploadAdminImage } from "@/lib/admin-upload";

function parseTags(value: FormDataEntryValue | null): string[] {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createGalleryItem(formData: FormData) {
  await requireAdminSession();

  const title = String(formData.get("title") || "").trim();
  const caption = String(formData.get("caption") || "").trim() || null;
  const tags = parseTags(formData.get("tags"));

  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) throw new Error("A photo is required for new gallery items");
  const image_path = await uploadAdminImage(file, "gallery", title || "photo");

  const { error } = await supabaseAdmin.from("gallery").insert({ title, caption, tags, image_path });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function updateGalleryItem(id: string, formData: FormData) {
  await requireAdminSession();

  const title = String(formData.get("title") || "").trim();
  const caption = String(formData.get("caption") || "").trim() || null;
  const tags = parseTags(formData.get("tags"));

  const update: Record<string, unknown> = { title, caption, tags };
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    update.image_path = await uploadAdminImage(file, "gallery", title || "photo");
  }

  const { error } = await supabaseAdmin.from("gallery").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/gallery");
}
