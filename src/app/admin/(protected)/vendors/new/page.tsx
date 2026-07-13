import Link from "next/link";
import VendorForm from "@/components/admin/VendorForm";
import { createVendor } from "../actions";

export default function NewVendorPage() {
  return (
    <div>
      <Link href="/admin/vendors" className="text-sm font-semibold text-[#8B31C7] hover:underline">← Back to vendors</Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-[#111827]">Add vendor</h1>
      <div className="mt-6">
        <VendorForm action={createVendor} submitLabel="Create vendor" />
      </div>
    </div>
  );
}
