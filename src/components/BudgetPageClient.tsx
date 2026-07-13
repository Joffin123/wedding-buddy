"use client";

import { useEffect, useState } from "react";
import BudgetClient, { type BudgetExternalUpdate } from "@/components/BudgetClient";
import BudgetChat from "@/components/BudgetChat";
import BudgetOnboarding, { type BudgetIntake } from "@/components/BudgetOnboarding";

const INTAKE_STORAGE_KEY = "wb-budget-intake";

// Kerala per-plate benchmarks (INR) used to translate PAX + food style into
// realistic catering line items instead of the flat category defaults.
function seedFromIntake(intake: BudgetIntake): BudgetExternalUpdate[] {
  const updates: BudgetExternalUpdate[] = [];
  const { pax, foodType, venuePrice } = intake;

  if (pax > 0) {
    if (foodType === "Sadya") {
      updates.push({ id: "c1", estimated: Math.round(pax * 500) });
    } else if (foodType === "Non-Veg Buffet") {
      updates.push({ id: "c2", estimated: Math.round(pax * 1800) });
    } else if (foodType === "North Indian") {
      updates.push({ id: "c2", estimated: Math.round(pax * 2000) });
    } else if (foodType === "Mixed") {
      updates.push({ id: "c1", estimated: Math.round(pax * 300) });
      updates.push({ id: "c2", estimated: Math.round(pax * 1200) });
    }
  }

  if (venuePrice) {
    updates.push({ id: "v1", estimated: venuePrice });
  }

  return updates;
}

export default function BudgetPageClient() {
  const [intake, setIntake] = useState<BudgetIntake | null>(null);
  const [externalUpdates, setExternalUpdates] = useState<BudgetExternalUpdate[]>([]);

  // Deliberately deferred to an effect: reading sessionStorage during the initial
  // render would mismatch the server-rendered (storage-less) HTML and break hydration.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(INTAKE_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as BudgetIntake;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIntake(saved);
        setExternalUpdates(seedFromIntake(saved));
      }
    } catch {
      // sessionStorage unavailable — fall back to asking again
    }
  }, []);

  function handleIntakeComplete(data: BudgetIntake) {
    setIntake(data);
    setExternalUpdates(seedFromIntake(data));
    try {
      sessionStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage failures
    }
  }

  function handleBudgetUpdate(updates: BudgetExternalUpdate[]) {
    setExternalUpdates(updates);
  }

  function editDetails() {
    setIntake(null);
    try {
      sessionStorage.removeItem(INTAKE_STORAGE_KEY);
    } catch {
      // ignore storage failures
    }
  }

  if (!intake) {
    return <BudgetOnboarding onComplete={handleIntakeComplete} />;
  }

  return (
    <>
      {/* ── Intake summary ── */}
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-purple-100 bg-[#F5F0FF]/50 px-4 py-3 text-xs text-[#2A1A33]/70">
        <span className="font-semibold text-[#8B31C7]">👥 {intake.pax} guests</span>
        <span className="text-purple-300">·</span>
        <span>🏛️ {intake.venueName ?? "venue not selected yet"}</span>
        <span className="text-purple-300">·</span>
        <span>🍽 {intake.foodType}</span>
        <button
          onClick={editDetails}
          className="ml-auto rounded-full border border-purple-200 bg-white px-3 py-1 font-semibold text-[#8B31C7] transition-colors hover:bg-[#F5F0FF] cursor-pointer"
        >
          Edit details
        </button>
      </div>

      {/* ── Budget table ── */}
      <BudgetClient externalUpdates={externalUpdates} />

      {/* ── AI Budget Chat ── */}
      <div className="mt-12 pt-10 border-t border-[#E5E7EB]">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-1">AI Budget Assistant</p>
          <h2 className="text-xl font-bold text-[#111827]">Let AI build your budget</h2>
          <p className="mt-1.5 text-sm text-[#6B7280] leading-relaxed max-w-lg">
            I already know your guest count, venue, and food style — describe anything else (style, total budget) and the AI will instantly fill in all the line items above. You can still edit anything manually.
          </p>
        </div>
        <BudgetChat onBudgetUpdate={handleBudgetUpdate} weddingContext={intake} />
      </div>
    </>
  );
}
