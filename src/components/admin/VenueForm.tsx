import Image from "next/image";
import { storageUrl, type VenueRow } from "@/lib/supabase";
import { Card, FormSection, fieldClass, labelClass, SubmitButton, CancelLink } from "@/components/admin/ui";

const REGIONS = ["Kochi", "Kumarakom", "Munnar", "Thekkady", "Wayanad", "Varkala", "Thiruvananthapuram", "Kollam", "Alappuzha", "Thrissur", "Palakkad", "Kozhikode", "Kannur", "Kasaragod"];
const TYPES = ["Palace", "Resort", "Beachfront", "Heritage", "Estate", "Houseboat"];

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
    <form action={action}>
      <Card className="max-w-2xl space-y-6 p-6">
        <FormSection title="Basic info">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">Name</label>
              <input id="name" name="name" required defaultValue={venue?.name} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="slug">Slug (URL-safe, unique)</label>
              <input id="slug" name="slug" required defaultValue={venue?.slug} placeholder="bolgatty-palace" className={fieldClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="location">Location</label>
              <input id="location" name="location" required defaultValue={venue?.location} placeholder="Bolgatty Island, Kochi" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="region">Region</label>
              <input id="region" name="region" required defaultValue={venue?.region} list="regions" className={fieldClass} />
              <datalist id="regions">
                {REGIONS.map((r) => <option key={r} value={r} />)}
              </datalist>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="type">Type</label>
            <input id="type" name="type" required defaultValue={venue?.type} list="types" className={fieldClass} />
            <datalist id="types">
              {TYPES.map((t) => <option key={t} value={t} />)}
            </datalist>
          </div>

          <div>
            <label className={labelClass} htmlFor="tagline">Tagline</label>
            <input id="tagline" name="tagline" required defaultValue={venue?.tagline} className={fieldClass} />
          </div>
        </FormSection>

        <FormSection title="Capacity & pricing">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="capacity_min">Min capacity</label>
              <input id="capacity_min" name="capacity_min" type="number" min="0" required defaultValue={venue?.capacity_min} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="capacity_max">Max capacity</label>
              <input id="capacity_max" name="capacity_max" type="number" min="0" required defaultValue={venue?.capacity_max} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="price_from">Starting price (₹)</label>
              <input id="price_from" name="price_from" type="number" min="0" step="1000" required defaultValue={venue?.price_from} className={fieldClass} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Presentation">
          <div>
            <label className={labelClass} htmlFor="highlights">Highlights (one per line)</label>
            <textarea
              id="highlights"
              name="highlights"
              rows={4}
              defaultValue={venue?.highlights?.join("\n")}
              placeholder={"Backwater views\nIn-house catering\nFree parking"}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gradient">Fallback gradient (Tailwind classes)</label>
            <input id="gradient" name="gradient" defaultValue={venue?.gradient} placeholder="from-purple-200 via-pink-100 to-indigo-200" className={fieldClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="image">Photo {venue ? "(leave empty to keep current)" : ""}</label>
            {currentImage && (
              <div className="relative mt-2 h-24 w-36 overflow-hidden rounded-xl border border-gray-200">
                <Image src={currentImage} alt={venue?.name || ""} fill className="object-cover" />
              </div>
            )}
            <input id="image" name="image" type="file" accept="image/*" className="mt-2 w-full text-sm" />
          </div>

          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input type="checkbox" name="featured" defaultChecked={venue?.featured} className="h-4 w-4 rounded border-gray-300 text-[#8B31C7] focus:ring-[#8B31C7]" />
            Featured
          </label>
        </FormSection>

        <div className="flex gap-3 border-t border-gray-100 pt-5">
          <SubmitButton>{submitLabel}</SubmitButton>
          <CancelLink href="/admin/venues" />
        </div>
      </Card>
    </form>
  );
}
