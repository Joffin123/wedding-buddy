import Image from "next/image";
import { storageUrl, type VendorRow } from "@/lib/supabase";
import { Card, FormSection, fieldClass, labelClass, SubmitButton, CancelLink } from "@/components/admin/ui";

const CATEGORIES = ["Photographers", "Caterers", "Decorators", "Makeup Artists"];

export default function VendorForm({
  action,
  vendor,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  vendor?: VendorRow;
  submitLabel: string;
}) {
  const currentImage = vendor ? storageUrl(vendor.image_path) : null;

  return (
    <form action={action}>
      <Card className="max-w-2xl space-y-6 p-6">
        <FormSection title="Basic info">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">Name</label>
              <input id="name" name="name" required defaultValue={vendor?.name} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="slug">Slug (URL-safe, unique)</label>
              <input id="slug" name="slug" required defaultValue={vendor?.slug} placeholder="lens-and-light-studio" className={fieldClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="category">Category</label>
              <select id="category" name="category" required defaultValue={vendor?.category ?? CATEGORIES[0]} className={fieldClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="location">Location</label>
              <input id="location" name="location" required defaultValue={vendor?.location} placeholder="Kochi" className={fieldClass} />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="tagline">Tagline</label>
            <input id="tagline" name="tagline" required defaultValue={vendor?.tagline} className={fieldClass} />
          </div>
        </FormSection>

        <FormSection title="Pricing & reputation">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="price_from">Starting price (₹)</label>
              <input id="price_from" name="price_from" type="number" min="0" step="500" required defaultValue={vendor?.price_from} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="price_unit">Price unit</label>
              <input id="price_unit" name="price_unit" defaultValue={vendor?.price_unit} placeholder="per wedding / per plate" className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="initials">Initials (fallback avatar)</label>
              <input id="initials" name="initials" maxLength={3} defaultValue={vendor?.initials} placeholder="LL" className={fieldClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="rating">Rating (0–5)</label>
              <input id="rating" name="rating" type="number" min="0" max="5" step="0.1" defaultValue={vendor?.rating} className={fieldClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="reviews">Review count</label>
              <input id="reviews" name="reviews" type="number" min="0" defaultValue={vendor?.reviews} className={fieldClass} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Presentation">
          <div>
            <label className={labelClass} htmlFor="specialties">Specialties (one per line)</label>
            <textarea
              id="specialties"
              name="specialties"
              rows={4}
              defaultValue={vendor?.specialties?.join("\n")}
              placeholder={"Candid photography\nDrone coverage\nSame-day edits"}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gradient">Fallback gradient (Tailwind classes)</label>
            <input id="gradient" name="gradient" defaultValue={vendor?.gradient} placeholder="from-purple-200 via-pink-100 to-indigo-200" className={fieldClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="image">Photo {vendor ? "(leave empty to keep current)" : ""}</label>
            {currentImage && (
              <div className="relative mt-2 h-24 w-24 overflow-hidden rounded-xl border border-gray-200">
                <Image src={currentImage} alt={vendor?.name || ""} fill className="object-cover" />
              </div>
            )}
            <input id="image" name="image" type="file" accept="image/*" className="mt-2 w-full text-sm" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-[#374151]">
              <input type="checkbox" name="verified" defaultChecked={vendor?.verified} className="h-4 w-4 rounded border-gray-300 text-[#8B31C7] focus:ring-[#8B31C7]" />
              Verified
            </label>
            <label className="flex items-center gap-2 text-sm text-[#374151]">
              <input type="checkbox" name="featured" defaultChecked={vendor?.featured} className="h-4 w-4 rounded border-gray-300 text-[#8B31C7] focus:ring-[#8B31C7]" />
              Featured
            </label>
          </div>
        </FormSection>

        <div className="flex gap-3 border-t border-gray-100 pt-5">
          <SubmitButton>{submitLabel}</SubmitButton>
          <CancelLink href="/admin/vendors" />
        </div>
      </Card>
    </form>
  );
}
