import type { Metadata } from "next";
import Link from "next/link";
import BudgetClient from "@/components/BudgetClient";

export const metadata: Metadata = {
  title: "Wedding Budget Builder · Wedding Buddy",
  description: "Build your complete Kerala wedding budget. Edit every line item, track actuals, and export to Excel.",
};

export default function BudgetPage() {
  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="border-b border-[#E5E7EB] py-12 sm:py-16">
        <div className="wb-container">
          <nav className="flex items-center gap-1.5 text-sm text-[#9CA3AF] mb-6">
            <Link href="/" className="hover:text-[#8B31C7] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#111827]">Budget Builder</span>
          </nav>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl animate-wb-fade-up">
                Wedding Budget Builder
              </h1>
              <p className="mt-3 text-sm text-[#6B7280] leading-relaxed max-w-xl animate-wb-fade-up wb-delay-100">
                Pre-filled with Kerala wedding averages across 10 categories and 50+ line items.
                Edit any amount, track actuals, and export to Excel to share with family.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs animate-wb-fade-up wb-delay-200">
              {["10 categories", "50+ items", "Excel export"].map(tag => (
                <span key={tag} className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1 font-medium text-[#6B7280]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <ol className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-[#E5E7EB] pt-5">
            {[
              "Review defaults — Kerala wedding averages",
              "Click any amount to edit — totals update instantly",
              "Switch to Actual to track real spending",
              "Export to Excel and share with family",
            ].map((s, i) => (
              <li key={s} className="flex items-center gap-2 text-xs text-[#9CA3AF]">
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
      <section className="py-10 pb-20">
        <div className="wb-container max-w-4xl">
          <BudgetClient />
        </div>
      </section>

    </div>
  );
}
