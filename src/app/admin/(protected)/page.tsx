import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { friendlyDbError } from "@/lib/format-db-error";
import { PageHeader, ErrorBanner } from "@/components/admin/ui";

export default async function AdminDashboardPage() {
  const [venues, vendors, gallery] = await Promise.all([
    supabaseAdmin.from("venues").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("vendors").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("gallery").select("*", { count: "exact", head: true }),
  ]);

  const dbError = venues.error || vendors.error || gallery.error;

  const cards = [
    { href: "/admin/venues", label: "Venues", count: venues.count ?? 0, icon: "🏛️" },
    { href: "/admin/vendors", label: "Vendors", count: vendors.count ?? 0, icon: "🤝" },
    { href: "/admin/gallery", label: "Gallery photos", count: gallery.count ?? 0, icon: "🖼️" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Manage the catalogue that powers the public site and the AI concierge." />

      {dbError && (
        <ErrorBanner
          title="Could not reach the database."
          message={`${friendlyDbError(dbError.message)} — check NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local, and confirm the Supabase project is active.`}
        />
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#8B31C7] hover:shadow-md"
          >
            <span className="text-2xl">{c.icon}</span>
            <p className="mt-3 text-3xl font-bold text-[#111827]">{c.count}</p>
            <p className="mt-1 text-sm font-semibold text-[#8B31C7]">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
