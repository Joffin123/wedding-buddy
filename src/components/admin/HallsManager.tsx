"use client";

import { useState } from "react";
import type { VenueHallRow } from "@/lib/supabase";
import { createHall, updateHall, deleteHall } from "@/app/admin/(protected)/venues/halls-actions";
import { fieldClass, labelClass } from "@/components/admin/ui";

function HallRow({
  hall,
  venueId,
  venueSlug,
}: {
  hall: VenueHallRow;
  venueId: string;
  venueSlug: string;
}) {
  const [editing, setEditing] = useState(false);
  const boundUpdate = updateHall.bind(null, hall.id, venueId, venueSlug);
  const boundDelete = deleteHall.bind(null, hall.id, venueId, venueSlug);

  if (!editing) {
    return (
      <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 last:border-b-0">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#111827]">{hall.name}</p>
          <p className="mt-0.5 text-xs text-[#6B7280]">
            Up to {hall.capacity.toLocaleString()} guests
            {hall.min_pax ? ` · min. ${hall.min_pax} pax` : ""}
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-[#111827]">₹{hall.price.toLocaleString("en-IN")}</p>
            <p className="text-[11px] text-[#9CA3AF]">{hall.price_type === "per_pax" ? "per person" : "flat rate"}</p>
          </div>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-[#374151] transition-colors hover:border-[#8B31C7] hover:text-[#8B31C7]"
          >
            Edit
          </button>
          <form action={boundDelete}>
            <button
              type="submit"
              onClick={(e) => {
                if (!confirm(`Delete "${hall.name}"? This can't be undone.`)) e.preventDefault();
              }}
              className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <form
      action={async (formData) => {
        await boundUpdate(formData);
        setEditing(false);
      }}
      className="border-b border-gray-100 px-4 py-4 last:border-b-0"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Hall name</label>
          <input name="name" required defaultValue={hall.name} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Capacity (max guests)</label>
          <input name="capacity" type="number" min="1" required defaultValue={hall.capacity} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Price type</label>
          <select name="price_type" defaultValue={hall.price_type} className={fieldClass}>
            <option value="flat">Flat rate</option>
            <option value="per_pax">Per person</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Price (₹)</label>
          <input name="price" type="number" min="0" step="500" required defaultValue={hall.price} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Min. pax (per-person pricing only)</label>
          <input name="min_pax" type="number" min="0" defaultValue={hall.min_pax ?? ""} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Sort order</label>
          <input name="sort_order" type="number" defaultValue={hall.sort_order} className={fieldClass} />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button type="submit" className="rounded-lg bg-[#8B31C7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#7a28b0]">
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function AddHallForm({ venueId, venueSlug }: { venueId: string; venueSlug: string }) {
  const [open, setOpen] = useState(false);
  const boundCreate = createHall.bind(null, venueId, venueSlug);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 rounded-lg border border-dashed border-purple-200 px-3 py-2 text-xs font-semibold text-[#8B31C7] hover:bg-[#F5F0FF]"
      >
        + Add hall
      </button>
    );
  }

  return (
    <form
      action={async (formData) => {
        await boundCreate(formData);
        setOpen(false);
      }}
      className="mt-3 rounded-xl border border-purple-100 bg-[#F9FAFB] p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Hall name</label>
          <input name="name" required placeholder="Platinum Hall" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Capacity (max guests)</label>
          <input name="capacity" type="number" min="1" required placeholder="2000" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Price type</label>
          <select name="price_type" defaultValue="flat" className={fieldClass}>
            <option value="flat">Flat rate</option>
            <option value="per_pax">Per person</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Price (₹)</label>
          <input name="price" type="number" min="0" step="500" required placeholder="300000" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Min. pax (per-person pricing only)</label>
          <input name="min_pax" type="number" min="0" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Sort order</label>
          <input name="sort_order" type="number" defaultValue={0} className={fieldClass} />
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button type="submit" className="rounded-lg bg-[#8B31C7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#7a28b0]">
          Add hall
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function HallsManager({
  venueId,
  venueSlug,
  halls,
}: {
  venueId: string;
  venueSlug: string;
  halls: VenueHallRow[];
}) {
  return (
    <div>
      {halls.length === 0 ? (
        <p className="px-1 py-2 text-sm text-[#9CA3AF]">
          No halls yet — this venue currently falls back to its single starting price/capacity above.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          {halls.map((hall) => (
            <HallRow key={hall.id} hall={hall} venueId={venueId} venueSlug={venueSlug} />
          ))}
        </div>
      )}
      <AddHallForm venueId={venueId} venueSlug={venueSlug} />
    </div>
  );
}
