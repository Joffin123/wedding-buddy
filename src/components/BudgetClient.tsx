"use client";

import { useState, useCallback, useEffect } from "react";

export interface BudgetExternalUpdate {
  id: string;
  estimated: number;
}

interface BudgetItem {
  id: string;
  name: string;
  estimated: number;
  actual: number;
  notes: string;
}

interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  items: BudgetItem[];
}

const DEFAULT_BUDGET: BudgetCategory[] = [
  {
    id: "venue", name: "Venue", icon: "🏛️",
    items: [
      { id: "v1", name: "Ceremony Venue",          estimated: 150000, actual: 0, notes: "" },
      { id: "v2", name: "Reception Venue",         estimated: 200000, actual: 0, notes: "" },
      { id: "v3", name: "Guest Accommodation",     estimated: 80000,  actual: 0, notes: "" },
      { id: "v4", name: "Venue Decorator Deposit", estimated: 25000,  actual: 0, notes: "" },
    ],
  },
  {
    id: "catering", name: "Catering & Food", icon: "🍽️",
    items: [
      { id: "c1", name: "Sadya / Traditional Feast",  estimated: 180000, actual: 0, notes: "Per plate × guest count" },
      { id: "c2", name: "Reception Dinner / Buffet",  estimated: 220000, actual: 0, notes: "" },
      { id: "c3", name: "Snacks & Tea / Coffee",      estimated: 30000,  actual: 0, notes: "" },
      { id: "c4", name: "Wedding Cake & Desserts",    estimated: 15000,  actual: 0, notes: "" },
      { id: "c5", name: "Service Staff",              estimated: 25000,  actual: 0, notes: "" },
    ],
  },
  {
    id: "decor", name: "Décor & Floral", icon: "🌸",
    items: [
      { id: "d1", name: "Mandap / Pooja Decoration", estimated: 60000,  actual: 0, notes: "" },
      { id: "d2", name: "Stage & Backdrop",          estimated: 45000,  actual: 0, notes: "" },
      { id: "d3", name: "Floral Arrangements",       estimated: 50000,  actual: 0, notes: "" },
      { id: "d4", name: "Lighting & LED Setup",      estimated: 40000,  actual: 0, notes: "" },
      { id: "d5", name: "Entrance & Aisle Décor",    estimated: 20000,  actual: 0, notes: "" },
      { id: "d6", name: "Table Centrepieces",        estimated: 15000,  actual: 0, notes: "" },
    ],
  },
  {
    id: "photo", name: "Photography & Video", icon: "📸",
    items: [
      { id: "p1", name: "Photography (Full Day)", estimated: 60000, actual: 0, notes: "" },
      { id: "p2", name: "Videography",           estimated: 55000, actual: 0, notes: "" },
      { id: "p3", name: "Drone Shots",           estimated: 15000, actual: 0, notes: "" },
      { id: "p4", name: "Pre-Wedding Shoot",     estimated: 25000, actual: 0, notes: "" },
      { id: "p5", name: "Photo Album / Prints",  estimated: 18000, actual: 0, notes: "" },
    ],
  },
  {
    id: "entertainment", name: "Entertainment", icon: "🎵",
    items: [
      { id: "e1", name: "DJ / Sound System",     estimated: 35000, actual: 0, notes: "" },
      { id: "e2", name: "Live Band / Orchestra", estimated: 50000, actual: 0, notes: "" },
      { id: "e3", name: "Cultural Performances", estimated: 30000, actual: 0, notes: "" },
      { id: "e4", name: "Mehendi Artist",        estimated: 12000, actual: 0, notes: "" },
    ],
  },
  {
    id: "bridal", name: "Bridal & Attire", icon: "👗",
    items: [
      { id: "b1", name: "Bridal Saree / Lehenga",  estimated: 80000,  actual: 0, notes: "" },
      { id: "b2", name: "Groom Attire",            estimated: 25000,  actual: 0, notes: "Mundu / Sherwani" },
      { id: "b3", name: "Bridal Jewellery",        estimated: 150000, actual: 0, notes: "Gold, polki, or rented" },
      { id: "b4", name: "Bridal Mehendi",          estimated: 8000,   actual: 0, notes: "" },
      { id: "b5", name: "Bridal Makeup & Hair",    estimated: 18000,  actual: 0, notes: "" },
      { id: "b6", name: "Family Attire (Parents)", estimated: 40000,  actual: 0, notes: "" },
    ],
  },
  {
    id: "ceremony", name: "Ceremony & Rituals", icon: "🛕",
    items: [
      { id: "r1", name: "Priest / Officiant Fees",  estimated: 15000, actual: 0, notes: "" },
      { id: "r2", name: "Pooja Items & Materials",  estimated: 20000, actual: 0, notes: "" },
      { id: "r3", name: "Elephant (Anayottam)",     estimated: 40000, actual: 0, notes: "Optional" },
      { id: "r4", name: "Fireworks / Sparklers",   estimated: 15000, actual: 0, notes: "" },
    ],
  },
  {
    id: "stationery", name: "Invitations & Stationery", icon: "💌",
    items: [
      { id: "s1", name: "Wedding Invitations",         estimated: 20000, actual: 0, notes: "" },
      { id: "s2", name: "Digital Invites & WhatsApp",  estimated: 5000,  actual: 0, notes: "" },
      { id: "s3", name: "Event Program Cards",         estimated: 5000,  actual: 0, notes: "" },
      { id: "s4", name: "Place Cards & Table Numbers", estimated: 3000,  actual: 0, notes: "" },
    ],
  },
  {
    id: "transport", name: "Transportation", icon: "🚗",
    items: [
      { id: "t1", name: "Bridal Car (Decorated)",  estimated: 12000, actual: 0, notes: "" },
      { id: "t2", name: "Guest Buses / Transport", estimated: 30000, actual: 0, notes: "" },
      { id: "t3", name: "Airport Transfers",       estimated: 20000, actual: 0, notes: "Outstation guests" },
    ],
  },
  {
    id: "other", name: "Other & Miscellaneous", icon: "📋",
    items: [
      { id: "o1", name: "Wedding Planner",         estimated: 50000, actual: 0, notes: "" },
      { id: "o2", name: "Guest Gifts / Favours",   estimated: 30000, actual: 0, notes: "" },
      { id: "o3", name: "Honeymoon Deposit",       estimated: 60000, actual: 0, notes: "" },
      { id: "o4", name: "Contingency Buffer (5%)", estimated: 0,     actual: 0, notes: "Auto-calculated" },
    ],
  },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function computeContingency(cats: BudgetCategory[]): number {
  return cats.reduce((sum, c) => {
    if (c.id === "other") return sum + c.items.filter(i => i.id !== "o4").reduce((s, i) => s + i.estimated, 0);
    return sum + c.items.reduce((s, i) => s + i.estimated, 0);
  }, 0);
}

function applyContingency(cats: BudgetCategory[]): BudgetCategory[] {
  const base = computeContingency(cats);
  return cats.map(c =>
    c.id === "other"
      ? { ...c, items: c.items.map(i => i.id === "o4" ? { ...i, estimated: Math.round(base * 0.05) } : i) }
      : c
  );
}

interface BudgetClientProps {
  externalUpdates?: BudgetExternalUpdate[];
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; headerBg: string; text: string }> = {
  venue: { bg: "bg-[#EFF6FF]/40", border: "border-blue-100", headerBg: "bg-[#EFF6FF]/70", text: "text-blue-800" },
  catering: { bg: "bg-[#FCE7F3]/40", border: "border-pink-100", headerBg: "bg-[#FCE7F3]/70", text: "text-pink-800" },
  decor: { bg: "bg-[#F0FDF4]/40", border: "border-emerald-100", headerBg: "bg-[#F0FDF4]/70", text: "text-emerald-800" },
  photo: { bg: "bg-[#FFFBEB]/40", border: "border-amber-100", headerBg: "bg-[#FFFBEB]/70", text: "text-amber-800" },
  entertainment: { bg: "bg-[#FCE7F3]/40", border: "border-pink-100", headerBg: "bg-[#FCE7F3]/70", text: "text-pink-800" },
  bridal: { bg: "bg-[#FEF3E2]/40", border: "border-orange-100", headerBg: "bg-[#FEF3E2]/70", text: "text-orange-800" },
  ceremony: { bg: "bg-[#F5F0FF]/40", border: "border-purple-100", headerBg: "bg-[#F5F0FF]/70", text: "text-purple-800" },
  stationery: { bg: "bg-[#FCE7F3]/40", border: "border-pink-100", headerBg: "bg-[#FCE7F3]/70", text: "text-pink-800" },
  transport: { bg: "bg-[#F0F9FF]/40", border: "border-sky-100", headerBg: "bg-[#F0F9FF]/70", text: "text-sky-800" },
  other: { bg: "bg-[#F3F4F6]/40", border: "border-gray-200", headerBg: "bg-[#F3F4F6]/70", text: "text-gray-800" },
};

export default function BudgetClient({ externalUpdates }: BudgetClientProps) {
  const [categories, setCategories] = useState<BudgetCategory[]>(() =>
    applyContingency(DEFAULT_BUDGET)
  );
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"estimated" | "actual">("estimated");

  useEffect(() => {
    if (!externalUpdates?.length) return;
    const updateMap = new Map(externalUpdates.map((u) => [u.id, u.estimated]));
    setCategories((prev) => {
      const next = prev.map((c) => ({
        ...c,
        items: c.items.map((i) =>
          updateMap.has(i.id) ? { ...i, estimated: updateMap.get(i.id)! } : i
        ),
      }));
      return applyContingency(next);
    });
  }, [externalUpdates]);

  const updateItem = useCallback((catId: string, itemId: string, field: "estimated" | "actual" | "notes", raw: string | number) => {
    setCategories(prev => {
      const next = prev.map(c =>
        c.id !== catId ? c : {
          ...c,
          items: c.items.map(i =>
            i.id !== itemId ? i : { ...i, [field]: field === "notes" ? raw : (Number(raw) || 0) }
          ),
        }
      );
      return field === "estimated" ? applyContingency(next) : next;
    });
  }, []);

  const totalEst = categories.reduce((s, c) => s + c.items.reduce((x, i) => x + i.estimated, 0), 0);
  const totalAct = categories.reduce((s, c) => s + c.items.reduce((x, i) => x + i.actual, 0), 0);

  async function exportToExcel() {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.aoa_to_sheet([
      ["Wedding Budget — Wedding Buddy", "", "", ""],
      ["", "", "", ""],
      ["Category", "Estimated (₹)", "Actual (₹)", "Variance (₹)"],
      ...categories.map(c => {
        const est = c.items.reduce((s, i) => s + i.estimated, 0);
        const act = c.items.reduce((s, i) => s + i.actual, 0);
        return [c.name, est, act, act - est];
      }),
      ["", "", "", ""],
      ["TOTAL", totalEst, totalAct, totalAct - totalEst],
    ]);
    ws["!cols"] = [{ wch: 30 }, { wch: 18 }, { wch: 18 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(wb, ws, "Summary");

    const ws2 = XLSX.utils.aoa_to_sheet([
      ["Category", "Item", "Estimated (₹)", "Actual (₹)", "Variance (₹)", "Notes"],
      ...categories.flatMap(c =>
        c.items.map(i => [c.name, i.name, i.estimated, i.actual, i.actual - i.estimated, i.notes])
      ),
      ["", "", "", "", "", ""],
      ["TOTAL", "", totalEst, totalAct, totalAct - totalEst, ""],
    ]);
    ws2["!cols"] = [{ wch: 22 }, { wch: 32 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, ws2, "Detailed Budget");

    XLSX.writeFile(wb, "wedding-budget.xlsx");
  }

  return (
    <div className="space-y-4">

      {/* ── Sticky totals bar ── */}
      <div className="sticky top-20 z-10 bg-white/95 backdrop-blur-md border-b border-purple-100 pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">

          {/* Totals */}
          <div className="flex gap-3">
            <div className="rounded-xl border border-purple-100 bg-white px-4 py-2 min-w-[140px] shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8B31C7]">Estimated</p>
              <p className="mt-0.5 font-sans text-lg font-bold text-[#111827]">{fmt(totalEst)}</p>
            </div>
            <div className={`rounded-xl border px-4 py-2 min-w-[140px] shadow-sm ${
              totalAct === 0 ? "border-purple-100 bg-white" :
              totalAct > totalEst ? "border-red-200 bg-red-50/70" : "border-emerald-200 bg-emerald-50/70"
            }`}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Actual</p>
              <p className={`mt-0.5 font-sans text-lg font-bold ${
                totalAct === 0 ? "text-[#D1D5DB]" :
                totalAct > totalEst ? "text-red-600" : "text-emerald-700"
              }`}>
                {totalAct === 0 ? "—" : fmt(totalAct)}
              </p>
            </div>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-xl border border-purple-100 bg-purple-50/30 p-0.5">
            {(["estimated", "actual"] as const).map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeTab === t
                    ? "bg-white border border-purple-100 text-[#8B31C7] shadow-sm"
                    : "text-[#9CA3AF] hover:text-[#8B31C7]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Export */}
          <button
            onClick={exportToExcel}
            className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-purple-100 bg-white px-3.5 py-2 text-xs font-semibold text-[#111827] hover:border-[#8B31C7] hover:text-[#8B31C7] transition-all cursor-pointer shadow-sm"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export .xlsx
          </button>
        </div>
      </div>

      {/* ── Category blocks ── */}
      {categories.map(category => {
        const catEst = category.items.reduce((s, i) => s + i.estimated, 0);
        const catAct = category.items.reduce((s, i) => s + i.actual, 0);
        const isOpen = !collapsed[category.id];
        const style = CATEGORY_COLORS[category.id] || { bg: "bg-white", border: "border-gray-200", headerBg: "bg-gray-50", text: "text-gray-800" };

        return (
          <div key={category.id} className={`rounded-2xl border ${style.border} ${style.bg} overflow-hidden shadow-sm transition-all duration-300`}>
            {/* Header */}
            <button
              onClick={() => setCollapsed(p => ({ ...p, [category.id]: !p[category.id] }))}
              className={`flex w-full items-center gap-3 px-5 py-4.5 text-left transition-colors cursor-pointer ${style.headerBg}`}
            >
              <span className="text-xl leading-none">{category.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-[#111827]">{category.name}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{category.items.length} items</p>
              </div>
              <div className="text-right flex-shrink-0 mr-2">
                <p className="font-sans text-sm font-bold text-[#111827]">{fmt(catEst)}</p>
                {catAct > 0 && (
                  <p className={`text-xs font-semibold ${catAct > catEst ? "text-red-500" : "text-emerald-700"}`}>
                    actual {fmt(catAct)}
                  </p>
                )}
              </div>
              <svg
                className={`h-4 w-4 text-[#9CA3AF] flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className={`border-t ${style.border}`}>
                {/* Column headers */}
                <div className="grid grid-cols-[1fr_130px_110px] gap-3 bg-[#F5F0FF] px-5 py-2 border-b border-purple-100">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B31C7]">Item</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B31C7] text-right">
                    {activeTab === "estimated" ? "Estimated (₹)" : "Actual (₹)"}
                  </span>
                  <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-[#8B31C7]">Notes</span>
                </div>

                {/* Rows */}
                {category.items.map(item => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_130px_110px] gap-3 border-b border-purple-50 px-5 py-3 items-center last:border-0 hover:bg-white/40 transition-colors"
                  >
                    <span className="text-sm font-medium text-[#374151]">{item.name}</span>

                    <div>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF]">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={activeTab === "estimated" ? item.estimated : item.actual}
                          onChange={e => updateItem(category.id, item.id, activeTab, e.target.value)}
                          readOnly={item.id === "o4" && activeTab === "estimated"}
                          className={`w-full rounded-lg border py-1.5 pl-6 pr-2 text-right text-sm font-medium
                            focus:outline-none focus:ring-1 focus:ring-[#8B31C7] focus:border-[#8B31C7] transition-colors
                            ${item.id === "o4" && activeTab === "estimated"
                              ? "border-purple-100 bg-[#F5F0FF]/30 text-[#9CA3AF] cursor-not-allowed"
                              : "border-purple-200 bg-white text-[#111827] hover:border-[#8B31C7]"
                            }`}
                        />
                      </div>
                    </div>

                    <div className="hidden sm:block">
                      <input
                        type="text"
                        placeholder="Notes…"
                        value={item.notes}
                        onChange={e => updateItem(category.id, item.id, "notes", e.target.value)}
                        className="w-full rounded-lg border border-purple-100 bg-white px-2.5 py-1.5 text-xs text-[#6B7280]
                          placeholder:text-[#D1D5DB] focus:outline-none focus:ring-1 focus:ring-[#8B31C7] focus:border-[#8B31C7]
                          hover:border-[#8B31C7] transition-colors"
                      />
                    </div>
                  </div>
                ))}

                {/* Subtotal */}
                <div className="flex items-center justify-end gap-4 border-t border-purple-100 bg-[#F5F0FF]/30 px-5 py-3">
                  <span className="text-xs text-[#9CA3AF]">Subtotal</span>
                  <span className="font-sans text-sm font-bold text-[#111827]">{fmt(catEst)}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Grand total ── */}
      <div className="rounded-2xl border border-purple-200 bg-gradient-to-tr from-[#F5F0FF] to-pink-50/50 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8B31C7] mb-1">Grand Total · Estimated</p>
            <p className="font-sans text-3xl font-bold text-[#111827]">{fmt(totalEst)}</p>
          </div>
          {totalAct > 0 && (
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-1">Grand Total · Actual</p>
              <p className={`font-sans text-3xl font-bold ${totalAct > totalEst ? "text-red-600" : "text-emerald-700"}`}>
                {fmt(totalAct)}
              </p>
              <p className={`text-xs font-semibold mt-1 ${totalAct > totalEst ? "text-red-500" : "text-emerald-600"}`}>
                {totalAct > totalEst ? "+" : ""}{fmt(totalAct - totalEst)} variance
              </p>
            </div>
          )}
        </div>
        <button
          onClick={exportToExcel}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8B31C7] py-3.5 text-sm font-semibold text-white hover:bg-[#7a28b0] hover:shadow-md transition-all cursor-pointer"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download as Excel (.xlsx)
        </button>
      </div>

    </div>
  );
}
