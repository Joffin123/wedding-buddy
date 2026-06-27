"use client";

import { useState } from "react";
import BudgetClient, { type BudgetExternalUpdate } from "@/components/BudgetClient";
import BudgetChat from "@/components/BudgetChat";

export default function BudgetPageClient() {
  const [externalUpdates, setExternalUpdates] = useState<BudgetExternalUpdate[]>([]);

  function handleBudgetUpdate(updates: BudgetExternalUpdate[]) {
    setExternalUpdates(updates);
  }

  return (
    <>
      {/* ── Budget table ── */}
      <BudgetClient externalUpdates={externalUpdates} />

      {/* ── AI Budget Chat ── */}
      <div className="mt-12 pt-10 border-t border-[#E5E7EB]">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-1">AI Budget Assistant</p>
          <h2 className="text-xl font-bold text-[#111827]">Let AI build your budget</h2>
          <p className="mt-1.5 text-sm text-[#6B7280] leading-relaxed max-w-lg">
            Describe your wedding — guest count, location, style, total budget — and the AI will instantly fill in all the line items above. You can still edit anything manually.
          </p>
        </div>
        <BudgetChat onBudgetUpdate={handleBudgetUpdate} />
      </div>
    </>
  );
}
