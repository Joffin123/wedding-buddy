import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import "../globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-[#111827] antialiased font-sans overflow-x-hidden">

        {/* ── Header ── */}
        <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-purple-100 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
          <div className="wb-container grid grid-cols-3 items-center h-full">

            {/* Left: Nav (desktop) + Hamburger (mobile) */}
            <div className="flex items-center justify-start">
              <MobileNav />
              <nav className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-base font-semibold text-[#6B7280] hover:text-[#8B31C7] transition-all relative py-2 group/nav"
                  >
                    {l.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8B31C7] transition-all duration-300 group-hover/nav:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="flex items-center justify-center col-span-1">
              <Link href="/" className="flex flex-col items-center justify-center gap-1.5 group py-1.5">
                <Image
                  src="/wedding-buddy-logo.png"
                  alt="Wedding Buddy"
                  width={30}
                  height={27}
                  className="w-7.5 object-contain group-hover:scale-110 transition-transform duration-300"
                  priority
                />
                <span className="font-display text-[10px] sm:text-[11px] font-black uppercase tracking-[0.16em] bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 bg-clip-text text-transparent group-hover:brightness-110 transition-all text-center">
                  Wedding Buddy
                </span>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end">
              <Link href="/venues" className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-3.5 py-2 text-sm font-bold text-white hover:shadow-md hover:shadow-purple-500/20 transition-all cursor-pointer md:px-5 md:py-2.5 md:text-[15px]">
                <span className="hidden sm:inline">Get started</span>
                <span className="sm:hidden">Start</span>
              </Link>
            </div>

          </div>
        </header>

        <main className="w-full pt-20 bg-white">{children}</main>

        {/* ── Footer ── */}
        <footer className="mt-20 border-t border-purple-100 bg-[#FFFAF0]/30">
          <div className="wb-container py-16">
            <div className="grid gap-8 sm:grid-cols-4">

              {/* Brand */}
              <div className="sm:col-span-2">
                <Link href="/" className="flex items-center gap-3 group">
                  <Image src="/wedding-buddy-logo.png" alt="Wedding Buddy" width={32} height={29} className="w-8 object-contain" />
                  <span className="font-display text-lg font-extrabold bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 bg-clip-text text-transparent">Wedding Buddy</span>
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
