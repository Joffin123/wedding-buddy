"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/venues", label: "Venues" },
  { href: "/admin/vendors", label: "Vendors" },
  { href: "/admin/gallery", label: "Gallery" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 items-center gap-1">
      {NAV.map((item) => {
        const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              isActive ? "bg-[#F5F0FF] text-[#8B31C7]" : "text-[#4B5563] hover:bg-gray-50 hover:text-[#111827]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
