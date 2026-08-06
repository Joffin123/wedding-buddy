import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

// Read-only client usable from both server components and the browser.
// RLS policies in schema.sql allow anon SELECT on public tables.
export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

// ---------- Shared types (mirror of Supabase schema) ----------
export type VenueRow = {
  id: string;
  slug: string;
  name: string;
  location: string;
  region: string;
  type: string;
  capacity_min: number;
  capacity_max: number;
  price_from: number;
  tagline: string;
  highlights: string[];
  gradient: string;
  featured: boolean;
  image_path: string | null;
  created_at: string;
};

export type VendorRow = {
  id: string;
  slug: string;
  category: "Photographers" | "Caterers" | "Decorators" | "Makeup Artists";
  name: string;
  tagline: string;
  location: string;
  price_from: number;
  price_unit: string;
  rating: number;
  reviews: number;
  specialties: string[];
  gradient: string;
  initials: string;
  verified: boolean;
  featured: boolean;
  image_path: string | null;
  created_at: string;
};

export type VenueHallRow = {
  id: string;
  venue_id: string;
  name: string;
  capacity: number;
  price_type: "flat" | "per_pax";
  price: number;
  min_pax: number | null;
  sort_order: number;
  created_at: string;
};

export type GalleryRow = {
  id: string;
  title: string;
  caption: string | null;
  tags: string[];
  image_path: string;
  created_at: string;
};

// Format INR paise-free integer → ₹XX,XX,XXX
export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

// Resolve a Storage object path (e.g. "venues/bolgatty.jpg") to a public URL.
// Returns null when no path is stored — callers should render a gradient fallback.
export function storageUrl(path: string | null): string | null {
  if (!path) return null;
  const [bucket, ...rest] = path.split("/");
  if (!bucket || rest.length === 0) return null;
  const { data } = supabase.storage.from(bucket).getPublicUrl(rest.join("/"));
  return data.publicUrl;
}
