import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { VendorRow } from "@/lib/supabase";
import VendorForm from "@/components/admin/VendorForm";
import { updateVendor } from "../../actions";

export default async function EditVendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: vendor } = await supabaseAdmin.from("vendors").select("*").eq("id", id).maybeSingle<VendorRow>();

  if (!vendor) notFound();

  return (
    <div>
      <Link href="/admin/vendors" className="text-sm font-semibold text-[#8B31C7] hover:underline">← Back to vendors</Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-[#111827]">Edit {vendor.name}</h1>
      <div className="mt-6">
        <VendorForm action={updateVendor.bind(null, id)} vendor={vendor} submitLabel="Save changes" />
      </div>
    </div>
  );
}
