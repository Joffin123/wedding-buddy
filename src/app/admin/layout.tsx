import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
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
  title: "Wedding Buddy Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white text-[#111827] antialiased font-sans">{children}</body>
    </html>
  );
}
