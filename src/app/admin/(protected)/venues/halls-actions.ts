"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { friendlyDbError } from "@/lib/format-db-error";

function readHallFields(formData: FormData) {
  const priceType = String(formData.get("price_type") || "flat");
  const minPaxRaw = String(formData.get("min_pax") || "").trim();
  return {
    name: String(formData.get("name") || "").trim(),
    capacity: Number(formData.get("capacity") || 0),
    price_type: priceType === "per_pax" ? "per_pax" : "flat",
    price: Number(formData.get("price") || 0),
    min_pax: minPaxRaw ? Number(minPaxRaw) : null,
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

function revalidateVenue(venueId: string, slug?: string) {
  revalidatePath(`/admin/venues/${venueId}/edit`);
  revalidatePath("/venues");
  if (slug) revalidatePath(`/venues/[district]/${slug}`, "page");
}

export async function createHall(venueId: string, venueSlug: string, formData: FormData) {
  await requireAdminSession();
  const fields = readHallFields(formData);

  const { error } = await supabaseAdmin.from("venue_halls").insert({ venue_id: venueId, ...fields });
  if (error) throw new Error(friendlyDbError(error.message));

  revalidateVenue(venueId, venueSlug);
}

export async function updateHall(hallId: string, venueId: string, venueSlug: string, formData: FormData) {
  await requireAdminSession();
  const fields = readHallFields(formData);

  const { error } = await supabaseAdmin.from("venue_halls").update(fields).eq("id", hallId);
  if (error) throw new Error(friendlyDbError(error.message));

  revalidateVenue(venueId, venueSlug);
}

export async function deleteHall(hallId: string, venueId: string, venueSlug: string) {
  await requireAdminSession();
  const { error } = await supabaseAdmin.from("venue_halls").delete().eq("id", hallId);
  if (error) throw new Error(friendlyDbError(error.message));

  revalidateVenue(venueId, venueSlug);
}
