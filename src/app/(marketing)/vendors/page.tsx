import type { Metadata } from "next";
import { supabase, type VendorRow } from "@/lib/supabase";
import VendorsClient from "./VendorsClient";

export const metadata: Metadata = {
  title: "Vendors · Wedding Buddy",
  description:
    "Hand-picked Kerala wedding vendors — photographers, caterers, decorators, and makeup artists, all vetted by our team.",
};

export const dynamic = "force-dynamic";

export default async function VendorsPage() {
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .order("featured", { ascending: false })
    .order("rating", { ascending: false })
    .returns<VendorRow[]>();

  return <VendorsClient vendors={data ?? []} error={error?.message ?? null} />;
}
