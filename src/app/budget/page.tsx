import type { Metadata } from "next";
import Link from "next/link";
import BudgetClient from "@/components/BudgetClient";

export const metadata: Metadata = {
  title: "Wedding Budget Builder · Wedding Buddy",
  description: "Build your complete Kerala wedding budget. Edit every line item, track actuals vs estimates, and export to Excel.",
};

export default function BudgetPage() {
  return (
    <div className="relative w-full">
      {/* ── HEADER ── */}
      <section className="pt-12 pb-10 sm:pt-20 border-b border-gray-100">
        <div className="wb-container">
          <div className="flex items-center gap-2 text-sm text-[#2A1A33]/50">
            <Link href="/" className="hover:text-rose-600 transition-colors">Home</Link>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-[#2A1A33]">Budget Builder</span>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-[#2A1A33] sm:text-5xl animate-wb-fade-up">
                Build your{" "}
                <span className="wb-gradient-text italic animate-wb-shimmer">wedding budget.</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[#2A1A33]/60 animate-wb-fade-up wb-delay-100">
                Every cost category for a Kerala wedding — from venue and Sadya to décor and photography. Edit any amount, track actuals, and export to Excel.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 animate-wb-fade-up wb-delay-200">
              <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Editable estimates
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Excel export
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> 10 categories
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="py-8 border-b border-gray-100">
        <div className="wb-container">
          <div className="flex flex-wrap gap-6 text-sm text-[#2A1A33]/55">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A1A33] text-[10px] font-bold text-white flex-shrink-0">1</div>
              Review all line items — defaults are Kerala wedding averages
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A1A33] text-[10px] font-bold text-white flex-shrink-0">2</div>
              Click any amount to edit — totals update instantly
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A1A33] text-[10px] font-bold text-white flex-shrink-0">3</div>
              Switch to &ldquo;Actual&rdquo; tab to track real spending
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A1A33] text-[10px] font-bold text-white flex-shrink-0">4</div>
              Export to Excel and share with family
            </div>
          </div>
        </div>
      </section>

      {/* ── BUDGET TABLE ── */}
      <section className="py-10 pb-20">
        <div className="wb-container max-w-4xl">
          <BudgetClient />
        </div>
      </section>
    </div>
  );
}
