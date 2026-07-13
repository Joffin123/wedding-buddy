import VendorForm from "@/components/admin/VendorForm";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { createVendor } from "../actions";

export default function NewVendorPage() {
  return (
    <div className="space-y-6">
      <BackLink href="/admin/vendors" label="Back to vendors" />
      <PageHeader title="Add vendor" />
      <VendorForm action={createVendor} submitLabel="Create vendor" />
    </div>
  );
}
