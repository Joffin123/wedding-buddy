"use client";

import { useState, useCallback } from "react";

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
    id: "venue",
    name: "Venue",
    icon: "🏛️",
    items: [
      { id: "venue-ceremony", name: "Ceremony Venue", estimated: 150000, actual: 0, notes: "" },
      { id: "venue-reception", name: "Reception Venue", estimated: 200000, actual: 0, notes: "" },
      { id: "venue-accommodation", name: "Guest Accommodation", estimated: 80000, actual: 0, notes: "" },
      { id: "venue-decorator-deposit", name: "Venue Decorator Deposit", estimated: 25000, actual: 0, notes: "" },
    ],
  },
  {
    id: "catering",
    name: "Catering & Food",
    icon: "🍽️",
    items: [
      { id: "cat-sadya", name: "Sadya / Traditional Feast", estimated: 180000, actual: 0, notes: "Per plate × guest count" },
      { id: "cat-reception-food", name: "Reception Dinner / Buffet", estimated: 220000, actual: 0, notes: "" },
      { id: "cat-snacks", name: "Snacks & Tea / Coffee", estimated: 30000, actual: 0, notes: "" },
      { id: "cat-cake", name: "Wedding Cake & Desserts", estimated: 15000, actual: 0, notes: "" },
      { id: "cat-service", name: "Service Staff", estimated: 25000, actual: 0, notes: "" },
    ],
  },
  {
    id: "decor",
    name: "Décor & Floral",
    icon: "🌸",
    items: [
      { id: "decor-mandap", name: "Mandap / Pooja Decoration", estimated: 60000, actual: 0, notes: "" },
      { id: "decor-stage", name: "Stage & Backdrop Decoration", estimated: 45000, actual: 0, notes: "" },
      { id: "decor-floral", name: "Floral Arrangements", estimated: 50000, actual: 0, notes: "" },
      { id: "decor-lighting", name: "Lighting & LED Setup", estimated: 40000, actual: 0, notes: "" },
      { id: "decor-entrance", name: "Entrance & Aisle Decor", estimated: 20000, actual: 0, notes: "" },
      { id: "decor-table", name: "Table Centrepieces", estimated: 15000, actual: 0, notes: "" },
    ],
  },
  {
    id: "photo",
    name: "Photography & Video",
    icon: "📸",
    items: [
      { id: "photo-photographer", name: "Photography (Full Day)", estimated: 60000, actual: 0, notes: "" },
      { id: "photo-video", name: "Videography / Cinematography", estimated: 55000, actual: 0, notes: "" },
      { id: "photo-drone", name: "Drone Shots", estimated: 15000, actual: 0, notes: "" },
      { id: "photo-prewedding", name: "Pre-Wedding Shoot", estimated: 25000, actual: 0, notes: "" },
      { id: "photo-album", name: "Photo Album / Prints", estimated: 18000, actual: 0, notes: "" },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎵",
    items: [
      { id: "ent-dj", name: "DJ / Sound System", estimated: 35000, actual: 0, notes: "" },
      { id: "ent-band", name: "Live Band / Orchestra", estimated: 50000, actual: 0, notes: "" },
      { id: "ent-cultural", name: "Cultural Performances", estimated: 30000, actual: 0, notes: "" },
      { id: "ent-mehendi", name: "Mehendi Artist (evening)", estimated: 12000, actual: 0, notes: "" },
    ],
  },
  {
    id: "bridal",
    name: "Bridal & Attire",
    icon: "👗",
    items: [
      { id: "bridal-saree", name: "Bridal Saree / Lehenga", estimated: 80000, actual: 0, notes: "" },
      { id: "bridal-groom", name: "Groom Attire (Mundu / Sherwani)", estimated: 25000, actual: 0, notes: "" },
      { id: "bridal-jewellery", name: "Bridal Jewellery", estimated: 150000, actual: 0, notes: "Gold, polki, or rented" },
      { id: "bridal-mehendi-bridal", name: "Bridal Mehendi", estimated: 8000, actual: 0, notes: "" },
      { id: "bridal-makeup", name: "Bridal Makeup & Hair", estimated: 18000, actual: 0, notes: "" },
      { id: "bridal-family", name: "Family Attire (Parents)", estimated: 40000, actual: 0, notes: "" },
    ],
  },
  {
    id: "ceremony",
    name: "Ceremony & Rituals",
    icon: "🛕",
    items: [
      { id: "cer-priest", name: "Priest / Officiant Fees", estimated: 15000, actual: 0, notes: "" },
      { id: "cer-pooja", name: "Pooja Items & Ritual Materials", estimated: 20000, actual: 0, notes: "" },
      { id: "cer-elephant", name: "Elephant (Anayottam)", estimated: 40000, actual: 0, notes: "Optional" },
      { id: "cer-fireworks", name: "Fireworks / Sparklers", estimated: 15000, actual: 0, notes: "" },
    ],
  },
  {
    id: "stationery",
    name: "Invitations & Stationery",
    icon: "💌",
    items: [
      { id: "stat-invite", name: "Wedding Invitations", estimated: 20000, actual: 0, notes: "" },
      { id: "stat-digital", name: "Digital Invites & WhatsApp", estimated: 5000, actual: 0, notes: "" },
      { id: "stat-program", name: "Event Program Cards", estimated: 5000, actual: 0, notes: "" },
      { id: "stat-namecards", name: "Place Cards & Table Numbers", estimated: 3000, actual: 0, notes: "" },
    ],
  },
  {
    id: "transport",
    name: "Transportation",
    icon: "🚗",
    items: [
      { id: "trans-bridal-car", name: "Bridal Car (Decorated)", estimated: 12000, actual: 0, notes: "" },
      { id: "trans-guest", name: "Guest Buses / Transport", estimated: 30000, actual: 0, notes: "" },
      { id: "trans-airport", name: "Airport Transfers (Outstation guests)", estimated: 20000, actual: 0, notes: "" },
    ],
  },
  {
    id: "other",
    name: "Other & Miscellaneous",
    icon: "📋",
    items: [
      { id: "other-planner", name: "Wedding Planner / Coordinator", estimated: 50000, actual: 0, notes: "" },
      { id: "other-favours", name: "Guest Gifts / Wedding Favours", estimated: 30000, actual: 0, notes: "" },
      { id: "other-honeymoon", name: "Honeymoon Travel Deposit", estimated: 60000, actual: 0, notes: "" },
      { id: "other-contingency", name: "Contingency / Buffer (5%)", estimated: 0, actual: 0, notes: "Auto-calculated" },
    ],
  },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function BudgetClient() {
  const [categories, setCategories] = useState<BudgetCategory[]>(() => {
    const total = DEFAULT_BUDGET.reduce(
      (sum, c) => sum + c.items.reduce((s, i) => s + i.estimated, 0),
      0
    );
    return DEFAULT_BUDGET.map((c) => {
      if (c.id === "other") {
        return {
          ...c,
          items: c.items.map((item) =>
            item.id === "other-contingency"
              ? { ...item, estimated: Math.round(total * 0.05) }
              : item
          ),
        };
      }
      return c;
    });
  });

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"estimated" | "actual">("estimated");

  const updateItem = useCallback(
    (catId: string, itemId: string, field: "estimated" | "actual" | "notes", value: string | number) => {
      setCategories((prev) =>
        prev.map((c) => {
          if (c.id !== catId) return c;
          const updated = {
            ...c,
            items: c.items.map((item) =>
              item.id === itemId ? { ...item, [field]: field === "notes" ? value : Number(value) || 0 } : item
            ),
          };
          if (field === "estimated") {
            const newTotal = prev.reduce((sum, cat) => {
              if (cat.id === "other") return sum;
              return sum + cat.items.reduce((s, i) => (i.id === itemId && cat.id === catId ? s + (Number(value) || 0) : s + i.estimated), 0);
            }, 0);
            return {
              ...updated,
              items: updated.items.map((item) =>
                item.id === "other-contingency"
                  ? { ...item, estimated: Math.round(newTotal * 0.05) }
                  : item
              ),
            };
          }
          return updated;
        })
      );
    },
    []
  );

  const totalEstimated = categories.reduce(
    (sum, c) => sum + c.items.reduce((s, i) => s + i.estimated, 0),
    0
  );
  const totalActual = categories.reduce(
    (sum, c) => sum + c.items.reduce((s, i) => s + i.actual, 0),
    0
  );

  function toggleCollapse(id: string) {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  async function exportToExcel() {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();

    // Summary sheet
    const summaryData = [
      ["Wedding Budget — Wedding Buddy", ""],
      ["", ""],
      ["Category", "Estimated (₹)", "Actual (₹)", "Variance (₹)"],
      ...categories.map((c) => {
        const est = c.items.reduce((s, i) => s + i.estimated, 0);
        const act = c.items.reduce((s, i) => s + i.actual, 0);
        return [c.icon + " " + c.name, est, act, act - est];
      }),
      ["", "", "", ""],
      ["TOTAL", totalEstimated, totalActual, totalActual - totalEstimated],
    ];
    const ws = XLSX.utils.aoa_to_sheet(summaryData);
    ws["!cols"] = [{ wch: 30 }, { wch: 18 }, { wch: 18 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(wb, ws, "Summary");

    // Detail sheet
    const detailData = [
      ["Category", "Item", "Estimated (₹)", "Actual (₹)", "Variance (₹)", "Notes"],
      ...categories.flatMap((c) =>
        c.items.map((item) => [
          c.name,
          item.name,
          item.estimated,
          item.actual,
          item.actual - item.estimated,
          item.notes,
        ])
      ),
      ["", "", "", "", "", ""],
      ["TOTAL", "", totalEstimated, totalActual, totalActual - totalEstimated, ""],
    ];
    const ws2 = XLSX.utils.aoa_to_sheet(detailData);
    ws2["!cols"] = [{ wch: 24 }, { wch: 32 }, { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, ws2, "Detailed Budget");

    XLSX.writeFile(wb, "wedding-budget.xlsx");
  }

  return (
    <div className="space-y-6">
      {/* ── TOTALS BAR ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sticky top-[88px] z-10 bg-white pt-2 pb-4 border-b border-gray-100">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2A1A33]/40">Total Estimated</p>
          <p className="mt-1 text-2xl font-bold text-[#2A1A33]">{fmt(totalEstimated)}</p>
        </div>
        <div className={`rounded-2xl border p-4 shadow-sm text-center ${totalActual === 0 ? "border-gray-100 bg-white" : totalActual > totalEstimated ? "border-red-100 bg-red-50" : "border-emerald-100 bg-emerald-50"}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2A1A33]/40">Total Actual</p>
          <p className={`mt-1 text-2xl font-bold ${totalActual === 0 ? "text-[#2A1A33]/30" : totalActual > totalEstimated ? "text-red-600" : "text-emerald-700"}`}>
            {totalActual === 0 ? "—" : fmt(totalActual)}
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex gap-2 flex-1">
            {(["estimated", "actual"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 rounded-xl py-1.5 text-xs font-semibold transition-all ${activeTab === t ? "bg-[#2A1A33] text-white" : "text-[#2A1A33]/50 hover:text-[#2A1A33]"}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors flex-shrink-0"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export .xlsx
          </button>
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      {categories.map((category) => {
        const catEstimated = category.items.reduce((s, i) => s + i.estimated, 0);
        const catActual = category.items.reduce((s, i) => s + i.actual, 0);
        const isCollapsed = collapsed[category.id];

        return (
          <div key={category.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            {/* Category header */}
            <button
              onClick={() => toggleCollapse(category.id)}
              className="flex w-full items-center gap-3 p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">{category.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-[#2A1A33]">{category.name}</h3>
                <p className="text-xs text-[#2A1A33]/40 mt-0.5">{category.items.length} items</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-[#2A1A33]">{fmt(catEstimated)}</p>
                {catActual > 0 && (
                  <p className={`text-xs font-semibold ${catActual > catEstimated ? "text-red-500" : "text-emerald-600"}`}>
                    actual: {fmt(catActual)}
                  </p>
                )}
              </div>
              <svg
                className={`h-4 w-4 flex-shrink-0 text-[#2A1A33]/30 transition-transform ${isCollapsed ? "" : "rotate-180"}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {!isCollapsed && (
              <div className="border-t border-gray-50">
                {/* Column headers */}
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#2A1A33]/35 bg-gray-50/60">
                  <span>Item</span>
                  <span className="w-28 text-right">{activeTab === "estimated" ? "Estimated (₹)" : "Actual (₹)"}</span>
                  <span className="w-24 hidden sm:block">Notes</span>
                </div>
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 sm:grid-cols-[1fr_auto_auto] border-t border-gray-50 px-5 py-3 items-center"
                  >
                    <span className="text-sm text-[#2A1A33]">{item.name}</span>
                    <div className="w-28 flex-shrink-0">
                      <div className="relative">
                        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#2A1A33]/40">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={activeTab === "estimated" ? item.estimated : item.actual}
                          onChange={(e) =>
                            updateItem(category.id, item.id, activeTab, e.target.value)
                          }
                          className={`w-full rounded-lg border py-1.5 pl-6 pr-2 text-right text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-300 ${
                            item.id === "other-contingency" && activeTab === "estimated"
                              ? "bg-amber-50 border-amber-200 text-amber-800 cursor-not-allowed"
                              : "border-gray-200 bg-white text-[#2A1A33]"
                          }`}
                          readOnly={item.id === "other-contingency" && activeTab === "estimated"}
                        />
                      </div>
                    </div>
                    <div className="hidden sm:block w-24 flex-shrink-0">
                      <input
                        type="text"
                        placeholder="Notes…"
                        value={item.notes}
                        onChange={(e) => updateItem(category.id, item.id, "notes", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-[#2A1A33]/70 placeholder:text-[#2A1A33]/25 focus:outline-none focus:ring-2 focus:ring-rose-300"
                      />
                    </div>
                  </div>
                ))}

                {/* Category subtotal */}
                <div className="flex items-center justify-end gap-6 border-t border-gray-100 bg-gray-50/50 px-5 py-3 text-sm">
                  <span className="text-[#2A1A33]/50 font-medium">Subtotal</span>
                  <span className="font-bold text-[#2A1A33]">{fmt(catEstimated)}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ── GRAND TOTAL ── */}
      <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#2A1A33]/60 uppercase tracking-wider">Grand Total (Estimated)</p>
            <p className="mt-1 font-display text-4xl font-medium text-[#2A1A33]">{fmt(totalEstimated)}</p>
          </div>
          {totalActual > 0 && (
            <div className="text-right">
              <p className="text-sm font-semibold text-[#2A1A33]/60 uppercase tracking-wider">Grand Total (Actual)</p>
              <p className={`mt-1 font-display text-4xl font-medium ${totalActual > totalEstimated ? "text-red-600" : "text-emerald-700"}`}>
                {fmt(totalActual)}
              </p>
              <p className={`text-sm font-semibold mt-1 ${totalActual > totalEstimated ? "text-red-500" : "text-emerald-600"}`}>
                {totalActual > totalEstimated ? "+" : ""}{fmt(totalActual - totalEstimated)} variance
              </p>
            </div>
          )}
        </div>
        <button
          onClick={exportToExcel}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Budget as Excel (.xlsx)
        </button>
      </div>
    </div>
  );
}
