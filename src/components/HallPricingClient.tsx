"use client";

import { useState } from "react";
import type { Hall } from "@/lib/kerala-venues";

type NonVegOption = "veg" | "nv1" | "nv2" | "nv3";

const NON_VEG_OPTIONS: { id: NonVegOption; label: string; addonPct: number }[] = [
  { id: "veg",  label: "Veg / Sadya",    addonPct: 0   },
  { id: "nv1",  label: "1 Non-Veg item", addonPct: 0.06 },
  { id: "nv2",  label: "2 Non-Veg items", addonPct: 0.12 },
  { id: "nv3",  label: "3 Non-Veg items", addonPct: 0.20 },
];

function effectivePrice(base: number, option: NonVegOption): number {
  const opt = NON_VEG_OPTIONS.find((o) => o.id === option)!;
  return Math.round(base * (1 + opt.addonPct) / 100) * 100;
}

function INR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

interface HallPricingClientProps {
  halls: Hall[];
  isHotel: boolean;
  isConvention: boolean;
  venueType: string;
}

export default function HallPricingClient({ halls, isHotel, isConvention, venueType }: HallPricingClientProps) {
  const [selectedOption, setSelectedOption] = useState<NonVegOption>("veg");

  const hasPerPax = halls.some((h) => h.priceType === "per_pax");

  return (
    <div className="rounded-xl border border-purple-100 bg-white overflow-hidden shadow-sm">
      {/* Card header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4.5 border-b border-purple-100 bg-[#F5F0FF]/50">
        <p className="font-display font-bold text-sm text-[#111827]">Halls &amp; Pricing</p>
        <span className={`rounded-lg px-2.5 py-0.5 text-[11px] font-semibold border ${
          isHotel ? "bg-[#F5F0FF] border-purple-200 text-[#8B31C7]" : "bg-[#FFFBEB] border-amber-200 text-[#92400E]"
        }`}>
          {isHotel ? "Per person · hotel" : isConvention ? "Flat rate · convention" : "Flat rate per event"}
        </span>
      </div>

      {/* Food option selector — only for per-pax venues */}
      {hasPerPax && (
        <div className="border-b border-purple-100 px-5 py-3.5 bg-white">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B31C7] mb-2.5">
            Food / catering selection
          </p>
          <div className="flex flex-wrap gap-2">
            {NON_VEG_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  selectedOption === opt.id
                    ? "border-[#8B31C7] bg-[#F5F0FF] text-[#8B31C7] shadow-sm"
                    : "border-purple-100 bg-white text-[#6B7280] hover:border-[#8B31C7] hover:text-[#8B31C7]"
                }`}
              >
                {opt.label}
                {opt.addonPct > 0 && (
                  <span className="ml-1 text-[9px] opacity-70">
                    +{Math.round(opt.addonPct * 100)}%
                  </span>
                )}
              </button>
            ))}
          </div>
          {selectedOption !== "veg" && (
            <p className="mt-2 text-[11px] text-[#9CA3AF]">
              Rates reflect the additional cost per person for non-vegetarian dishes. Prices are indicative.
            </p>
          )}
        </div>
      )}

      {/* Hall rows */}
      <div className="divide-y divide-purple-50">
        {halls.map((hall, idx) => {
          const isPerPax = hall.priceType === "per_pax";
          const displayPrice = isPerPax ? effectivePrice(hall.price, selectedOption) : hall.price;

          return (
            <div key={hall.name} className={`flex items-center justify-between gap-4 px-5 py-4 transition-colors ${idx % 2 === 1 ? "bg-[#F4F9FF]/40" : "bg-white"}`}>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-[#111827]">{hall.name}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  Up to {hall.capacity.toLocaleString()} guests
                  {hall.minPax ? ` · min. ${hall.minPax} pax` : ""}
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-0.5">
                <p className="font-sans font-bold text-sm text-[#111827]">{INR(displayPrice)}</p>
                <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                  isPerPax ? "bg-[#F5F0FF] text-[#8B31C7]" : "bg-[#FFFBEB] text-[#92400E]"
                }`}>
                  {isPerPax ? "per person" : "flat rate"}
                </span>
                {isPerPax && hall.minPax && (
                  <p className="text-[11px] text-[#9CA3AF]">
                    min. {INR(displayPrice * hall.minPax)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
