import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import AdminNav from "@/components/admin/AdminNav";
import { logoutAction } from "./actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#8B31C7] text-xs font-bold text-white">
              WB
            </div>
            <span className="font-display text-sm font-bold text-[#111827]">Admin</span>
          </Link>

          <AdminNav />

          <Link href="/" target="_blank" className="text-xs font-semibold text-[#9CA3AF] transition-colors hover:text-[#8B31C7]">
            View site ↗
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#374151] transition-colors hover:border-red-200 hover:text-red-600 cursor-pointer"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
