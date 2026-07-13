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

function readVendorFields(formData: FormData) {
  return {
    slug: String(formData.get("slug") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    name: String(formData.get("name") || "").trim(),
    tagline: String(formData.get("tagline") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    price_from: Number(formData.get("price_from") || 0),
    price_unit: String(formData.get("price_unit") || "").trim() || "per wedding",
    rating: Number(formData.get("rating") || 0),
    reviews: Number(formData.get("reviews") || 0),
    specialties: parseLines(formData.get("specialties")),
    gradient: String(formData.get("gradient") || "").trim() || "from-purple-200 via-pink-100 to-indigo-200",
    initials: String(formData.get("initials") || "").trim().slice(0, 3).toUpperCase(),
    verified: formData.get("verified") === "on",
    featured: formData.get("featured") === "on",
  };
}

export async function createVendor(formData: FormData) {
  await requireAdminSession();
  const fields = readVendorFields(formData);

  let image_path: string | null = null;
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    image_path = await uploadAdminImage(file, "vendors", fields.slug);
  }

  const { error } = await supabaseAdmin.from("vendors").insert({ ...fields, image_path });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/vendors");
  revalidatePath("/vendors");
  redirect("/admin/vendors");
}

export async function updateVendor(id: string, formData: FormData) {
  await requireAdminSession();
  const fields = readVendorFields(formData);
  const update: Record<string, unknown> = { ...fields };

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    update.image_path = await uploadAdminImage(file, "vendors", fields.slug);
  }

  const { error } = await supabaseAdmin.from("vendors").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/vendors");
  revalidatePath("/vendors");
  redirect("/admin/vendors");
}

export async function deleteVendor(id: string) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("vendors").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/vendors");
  revalidatePath("/vendors");
}
