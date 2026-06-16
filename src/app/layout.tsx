import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import WeddingPattern from "@/components/WeddingPattern";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Wedding Buddy — AI Wedding Concierge for Kerala",
  description:
    "Plan a luxurious Kerala wedding with the Wedding Buddy AI concierge. Discover premium venues, curated vendors, and intelligent budgeting — crafted for the modern Indian couple.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${fraunces.variable} scroll-smooth`}>
      <body className="relative min-h-screen text-[#2A1A33] antialiased selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden font-sans">
        <WeddingPattern />

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50">
          <div className="wb-container mt-4">
            <div className="flex h-16 items-center justify-between rounded-2xl border border-rose-200/60 bg-white/80 px-4 backdrop-blur-xl sm:px-6 shadow-[0_10px_40px_-18px_rgba(232,115,155,0.45)]">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-indigo-100 ring-1 ring-rose-200/80 shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3 overflow-hidden">
                  <Image
                    src="/wedding-buddy-logo.png"
                    alt="Wedding Buddy"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                    priority
                  />
                </div>
                <span className="text-[17px] font-extrabold tracking-tight text-[#2A1A33]">
                  Wedding Buddy
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#2A1A33]/70">
                {[
                  { href: "/venues", label: "Venues" },
                  { href: "/budget", label: "Budget" },
                  { href: "/vendors", label: "Vendors" },
                  { href: "/contact", label: "Contact" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="relative group transition-colors hover:text-rose-600">
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-rose-400 via-amber-400 to-indigo-400 rounded-full transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <Link
                  href="/contact"
                  className="hidden sm:inline-flex text-sm font-semibold text-[#2A1A33]/70 hover:text-rose-600 transition-colors px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  href="/#wb-chat"
                  className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(232,115,155,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(232,115,155,0.7)]"
                >
                  <span className="relative z-10">Ask AI</span>
                  <svg className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow w-full relative pt-24 bg-white">{children}</main>

        {/* Footer */}
        <footer className="relative mt-16 border-t border-gray-100 bg-white">
          <div className="wb-container py-16">
            <div className="grid gap-10 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-indigo-100 ring-1 ring-rose-200/80">
                    <Image src="/wedding-buddy-logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                  </div>
                  <span className="text-lg font-extrabold tracking-tight text-[#2A1A33]">Wedding Buddy</span>
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#2A1A33]/70">
                  A modern AI wedding concierge crafted for Kerala&apos;s most discerning couples. From backwater ceremonies in Kumarakom to palace receptions in Kochi — planned with intelligent elegance, entirely by <span className="font-semibold text-rose-600">Wedding Buddy</span>.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/50">Explore</h4>
                <ul className="mt-4 space-y-2.5 text-sm text-[#2A1A33]/80">
                  <li><Link href="/venues" className="hover:text-rose-600 transition-colors">Venues</Link></li>
                  <li><Link href="/budget" className="hover:text-rose-600 transition-colors">Budget Builder</Link></li>
                  <li><Link href="/vendors" className="hover:text-rose-600 transition-colors">Vendors</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1A33]/50">Company</h4>
                <ul className="mt-4 space-y-2.5 text-sm text-[#2A1A33]/80">
                  <li><Link href="/contact" className="hover:text-rose-600 transition-colors">Contact</Link></li>
                  <li><Link href="/contact" className="hover:text-rose-600 transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-rose-600 transition-colors">Privacy</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-rose-200/60 pt-6 text-xs text-[#2A1A33]/60 sm:flex-row sm:items-center">
              <p>© 2026 Wedding Buddy. Crafted with love in Kerala.</p>
              <p className="tracking-[0.18em] uppercase">Made for the modern Indian couple</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
