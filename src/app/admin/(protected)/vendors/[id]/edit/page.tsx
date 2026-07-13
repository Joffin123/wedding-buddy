import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { VendorRow } from "@/lib/supabase";
import VendorForm from "@/components/admin/VendorForm";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { updateVendor } from "../../actions";

export default async function EditVendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: vendor } = await supabaseAdmin.from("vendors").select("*").eq("id", id).maybeSingle<VendorRow>();

  if (!vendor) notFound();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/vendors" label="Back to vendors" />
      <PageHeader title={`Edit ${vendor.name}`} />
      <VendorForm action={updateVendor.bind(null, id)} vendor={vendor} submitLabel="Save changes" />
    </div>
  );
}
