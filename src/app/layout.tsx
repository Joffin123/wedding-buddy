import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wedding Buddy — Kerala Wedding Planning",
  description:
    "Plan your Kerala wedding — venues by district, budget builder, vendor directory, and AI guidance.",
};

const NAV_LINKS = [
  { href: "/venues",  label: "Venues"  },
  { href: "/budget",  label: "Budget"  },
  { href: "/vendors", label: "Vendors" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#111827] antialiased font-sans overflow-x-hidden">

        {/* ── Header ── */}
        <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-[#E5E7EB] bg-white">
          <div className="wb-container flex h-full items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] overflow-hidden group-hover:border-[#8B31C7] transition-colors">
                <Image
                  src="/wedding-buddy-logo.png"
                  alt="Wedding Buddy"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                  priority
                />
              </div>
              <span className="text-[15px] font-bold tracking-tight text-[#111827]">
                Wedding Buddy
              </span>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-medium text-[#6B7280] hover:text-[#8B31C7] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden sm:block text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                Sign in
              </Link>
              <Link href="/venues" className="inline-flex items-center rounded-lg bg-[#8B31C7] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7a28b0] transition-colors">
                Get started
              </Link>
            </div>

          </div>
        </header>

        <main className="w-full pt-14 bg-white">{children}</main>

        {/* ── Footer ── */}
        <footer className="mt-20 border-t border-[#E5E7EB] bg-white">
          <div className="wb-container py-12">
            <div className="grid gap-8 sm:grid-cols-4">

              {/* Brand */}
              <div className="sm:col-span-2">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] overflow-hidden">
                    <Image src="/wedding-buddy-logo.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                  </div>
                  <span className="font-bold text-[#111827]">Wedding Buddy</span>
                </Link>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#6B7280]">
                  Kerala&apos;s wedding planning platform — venues, vendors, budgets, and AI guidance in one place.
                </p>
              </div>

              {/* Explore */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">Explore</p>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li><Link href="/venues"  className="hover:text-[#8B31C7] transition-colors">Venues</Link></li>
                  <li><Link href="/budget"  className="hover:text-[#8B31C7] transition-colors">Budget Builder</Link></li>
                  <li><Link href="/vendors" className="hover:text-[#8B31C7] transition-colors">Vendors</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">Company</p>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li><Link href="/contact" className="hover:text-[#8B31C7] transition-colors">Contact</Link></li>
                  <li><Link href="/contact" className="hover:text-[#8B31C7] transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-[#8B31C7] transition-colors">Privacy</Link></li>
                </ul>
              </div>

            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-[#E5E7EB] pt-6 text-xs text-[#9CA3AF]">
              <p>© 2026 Wedding Buddy. Made in Kerala.</p>
              <p>Crafted for the modern Indian couple</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
