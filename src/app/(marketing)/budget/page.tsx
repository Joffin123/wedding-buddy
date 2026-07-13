import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BudgetPageClient from "@/components/BudgetPageClient";

export const metadata: Metadata = {
  title: "Wedding Budget Builder · Wedding Buddy",
  description: "Build your complete Kerala wedding budget. Edit every line item, track actuals, and export to Excel.",
};

export default function BudgetPage() {
  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="border-b border-purple-100 bg-gradient-to-b from-[#FFFAF0] via-[#FEF9F3] to-white py-20 sm:py-28 relative overflow-hidden">
        {/* Background logo watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
          <Image
            src="/wedding-buddy-logo.png"
            alt=""
            width={600}
            height={600}
            className="opacity-[0.03] scale-125 object-contain"
            priority
          />
        </div>
        <div className="wb-container relative z-10">
          <nav className="flex items-center gap-1.5 text-sm font-semibold text-[#9CA3AF] mb-6">
            <Link href="/" className="hover:text-[#8B31C7] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111827]">Budget Builder</span>
          </nav>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827] animate-wb-fade-up">
                Wedding Budget Builder
              </h1>
              <p className="mt-3 text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl animate-wb-fade-up wb-delay-100">
                Pre-filled with Kerala wedding averages across 10 categories and 50+ line items.
                Edit any amount, track actuals, and export to Excel to share with family.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs animate-wb-fade-up wb-delay-200">
              {["10 categories", "50+ items", "Excel export"].map(tag => (
                <span key={tag} className="rounded-xl border border-purple-200 bg-[#F5F0FF] px-3 py-1 font-bold text-[#8B31C7]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-purple-100 pt-6">
            {[
              "Review defaults — Kerala wedding averages",
              "Click any amount to edit — totals update instantly",
              "Switch to Actual to track real spending",
              "Export to Excel and share with family",
            ].map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-sm font-semibold text-[#2A1A33]/70">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5F0FF] text-[10px] font-bold text-[#8B31C7] flex-shrink-0">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Budget ── */}
      <section className="py-16 sm:py-24 pb-24">
        <div className="wb-container max-w-4xl">
          <BudgetPageClient />
        </div>
      </section>

      {/* ── Image Section Break ── */}
      <section className="py-8 bg-white relative overflow-hidden">
        <div className="wb-container max-w-4xl">
          <div className="relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-md group">
            <Image
              src="/images/traditional_kerala_marriage.png"
              alt="Traditional Kerala Wedding Break"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-8 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300 mb-2">Heritage · Golden Decor</span>
              <h4 className="font-display text-lg sm:text-2xl md:text-4xl font-extrabold text-white leading-tight max-w-xl">
                Traditional Sadya catering and custom mandaps.
              </h4>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
