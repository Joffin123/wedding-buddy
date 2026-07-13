import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import { logoutAction } from "./actions";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/venues", label: "Venues" },
  { href: "/admin/vendors", label: "Vendors" },
  { href: "/admin/gallery", label: "Gallery" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="sticky top-0 z-20 border-b border-purple-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B31C7] via-fuchsia-500 to-indigo-500 text-xs font-bold text-white">
              WB
            </div>
            <span className="font-display text-sm font-bold text-[#111827]">Admin</span>
          </Link>

          <nav className="flex flex-1 items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[#374151] transition-colors hover:bg-[#F5F0FF] hover:text-[#8B31C7]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" target="_blank" className="text-xs font-semibold text-[#9CA3AF] hover:text-[#8B31C7] transition-colors">
            View site ↗
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-purple-200 px-3 py-1.5 text-xs font-semibold text-[#8B31C7] transition-colors hover:bg-[#F5F0FF] cursor-pointer"
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
