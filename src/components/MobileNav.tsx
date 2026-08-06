"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/venues",
    label: "Venues",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    href: "/budget",
    label: "Budget Builder",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/vendors",
    label: "Vendors",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: "/features",
    label: "Features",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setIsOpen(false), []);

  // Wait for client mount before portalling
  useEffect(() => { setMounted(true); }, []);

  // Close on route change
  useEffect(() => { close(); }, [pathname, close]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") close(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      {/* ── Hamburger button (stays inside header) ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="flex md:hidden h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-purple-50 transition-colors"
      >
        <span className="block h-[2px] w-[22px] rounded-full bg-[#2A1A33] transition-all duration-300" />
        <span className="block h-[2px] w-[16px] rounded-full bg-[#2A1A33] transition-all duration-300" />
        <span className="block h-[2px] w-[22px] rounded-full bg-[#2A1A33] transition-all duration-300" />
      </button>

      {/*
        Portal: backdrop + sidebar are rendered at document.body level.
        This is required because the <header> has backdrop-filter (backdrop-blur-md)
        which creates a new CSS containing block — any position:fixed child inside
        it gets clipped to the header box instead of the full viewport.
      */}
      {mounted && createPortal(
        <>
          {/* Backdrop */}
          <div
            onClick={close}
            aria-hidden="true"
            className={`fixed inset-0 z-[200] bg-[#2A1A33]/50 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          />

          {/* Sidebar drawer */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={`fixed top-0 left-0 z-[210] flex h-full w-[82vw] max-w-[320px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-purple-100 bg-[#FFFAF0]/70">
              <Link href="/" onClick={close} className="flex items-center gap-2.5">
                <Image
                  src="/wedding-buddy-logo.png"
                  alt="Wedding Buddy"
                  width={28}
                  height={25}
                  className="w-7 object-contain"
                />
                <span className="font-display text-sm font-extrabold bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 bg-clip-text text-transparent">
                  Wedding Buddy
                </span>
              </Link>
              <button
                onClick={close}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#6B7280] hover:bg-purple-50 hover:text-[#8B31C7] transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-0.5">
              {NAV_LINKS.map((l) => {
                const isActive =
                  pathname === l.href ||
                  (l.href !== "/" && pathname.startsWith(l.href));
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={close}
                    className={`flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all duration-150 ${
                      isActive
                        ? "bg-[#F5F0FF] text-[#8B31C7]"
                        : "text-[#374151] hover:bg-[#F9FAFB] hover:text-[#8B31C7]"
                    }`}
                  >
                    <span className={`flex-shrink-0 ${isActive ? "text-[#8B31C7]" : "text-[#9CA3AF]"}`}>
                      {l.icon}
                    </span>
                    {l.label}
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8B31C7]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <div className="border-t border-purple-100 bg-[#FFFAF0]/50 p-5">
              <Link
                href="/venues"
                onClick={close}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B31C7] to-fuchsia-600 px-5 py-3.5 text-[15px] font-bold text-white shadow-md shadow-purple-500/20 transition-all active:scale-[0.98]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                </svg>
                Get started
              </Link>
              <p className="mt-4 text-center text-[11px] text-[#9CA3AF]">© 2026 Wedding Buddy · Made in Kerala</p>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
