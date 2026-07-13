"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { uploadAdminImage } from "@/lib/admin-upload";

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readVenueFields(formData: FormData) {
  return {
    slug: String(formData.get("slug") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    region: String(formData.get("region") || "").trim(),
    type: String(formData.get("type") || "").trim(),
    capacity_min: Number(formData.get("capacity_min") || 0),
    capacity_max: Number(formData.get("capacity_max") || 0),
    price_from: Number(formData.get("price_from") || 0),
    tagline: String(formData.get("tagline") || "").trim(),
    highlights: parseLines(formData.get("highlights")),
    gradient: String(formData.get("gradient") || "").trim() || "from-purple-200 via-pink-100 to-indigo-200",
    featured: formData.get("featured") === "on",
  };
}

export async function createVenue(formData: FormData) {
  await requireAdminSession();
  const fields = readVenueFields(formData);

  let image_path: string | null = null;
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    image_path = await uploadAdminImage(file, "venues", fields.slug);
  }

  const { error } = await supabaseAdmin.from("venues").insert({ ...fields, image_path });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/venues");
  revalidatePath("/venues");
  redirect("/admin/venues");
}

export async function updateVenue(id: string, formData: FormData) {
  await requireAdminSession();
  const fields = readVenueFields(formData);
  const update: Record<string, unknown> = { ...fields };

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    update.image_path = await uploadAdminImage(file, "venues", fields.slug);
  }

  const { error } = await supabaseAdmin.from("venues").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/venues");
  revalidatePath("/venues");
  redirect("/admin/venues");
}

export async function deleteVenue(id: string) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("venues").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/venues");
  revalidatePath("/venues");
}
