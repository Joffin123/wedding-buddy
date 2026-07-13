import Image from "next/image";
import { storageUrl, type VenueRow } from "@/lib/supabase";

const REGIONS = ["Kochi", "Kumarakom", "Munnar", "Thekkady", "Wayanad", "Varkala", "Thiruvananthapuram", "Kollam", "Alappuzha", "Thrissur", "Palakkad", "Kozhikode", "Kannur", "Kasaragod"];
const TYPES = ["Palace", "Resort", "Beachfront", "Heritage", "Estate", "Houseboat"];

const inputClass =
  "mt-1 w-full rounded-xl border border-purple-200 bg-white px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#8B31C7] focus:border-[#8B31C7]";
const labelClass = "text-xs font-semibold text-[#374151]";

export default function VenueForm({
  action,
  venue,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  venue?: VenueRow;
  submitLabel: string;
}) {
  const currentImage = venue ? storageUrl(venue.image_path) : null;

  return (
    <form action={action} className="max-w-2xl space-y-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Name</label>
          <input id="name" name="name" required defaultValue={venue?.name} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="slug">Slug (URL-safe, unique)</label>
          <input id="slug" name="slug" required defaultValue={venue?.slug} placeholder="bolgatty-palace" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="location">Location</label>
          <input id="location" name="location" required defaultValue={venue?.location} placeholder="Bolgatty Island, Kochi" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="region">Region</label>
          <input id="region" name="region" required defaultValue={venue?.region} list="regions" className={inputClass} />
          <datalist id="regions">
            {REGIONS.map((r) => <option key={r} value={r} />)}
          </datalist>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass} htmlFor="type">Type</label>
          <input id="type" name="type" required defaultValue={venue?.type} list="types" className={inputClass} />
          <datalist id="types">
            {TYPES.map((t) => <option key={t} value={t} />)}
          </datalist>
        </div>
        <div>
          <label className={labelClass} htmlFor="capacity_min">Min capacity</label>
          <input id="capacity_min" name="capacity_min" type="number" min="0" required defaultValue={venue?.capacity_min} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="capacity_max">Max capacity</label>
          <input id="capacity_max" name="capacity_max" type="number" min="0" required defaultValue={venue?.capacity_max} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="price_from">Starting price (₹)</label>
        <input id="price_from" name="price_from" type="number" min="0" step="1000" required defaultValue={venue?.price_from} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="tagline">Tagline</label>
        <input id="tagline" name="tagline" required defaultValue={venue?.tagline} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="highlights">Highlights (one per line)</label>
        <textarea
          id="highlights"
          name="highlights"
          rows={4}
          defaultValue={venue?.highlights?.join("\n")}
          placeholder={"Backwater views\nIn-house catering\nFree parking"}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="gradient">Fallback gradient (Tailwind classes)</label>
        <input id="gradient" name="gradient" defaultValue={venue?.gradient} placeholder="from-purple-200 via-pink-100 to-indigo-200" className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="image">Photo {venue ? "(leave empty to keep current)" : ""}</label>
        {currentImage && (
          <div className="relative mt-2 h-24 w-36 overflow-hidden rounded-xl border border-purple-100">
            <Image src={currentImage} alt={venue?.name || ""} fill className="object-cover" />
          </div>
        )}
        <input id="image" name="image" type="file" accept="image/*" className="mt-2 w-full text-sm" />
      </div>

      <label className="flex items-center gap-2 text-sm text-[#374151]">
        <input type="checkbox" name="featured" defaultChecked={venue?.featured} className="h-4 w-4 rounded border-purple-300 text-[#8B31C7] focus:ring-[#8B31C7]" />
        Featured
      </label>

      <button type="submit" className="rounded-xl bg-[#8B31C7] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a28b0] cursor-pointer">
        {submitLabel}
      </button>
    </form>
  );
}
