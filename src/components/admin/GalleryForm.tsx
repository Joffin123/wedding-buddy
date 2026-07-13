import Image from "next/image";
import { storageUrl, type GalleryRow } from "@/lib/supabase";

const inputClass =
  "mt-1 w-full rounded-xl border border-purple-200 bg-white px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#8B31C7] focus:border-[#8B31C7]";
const labelClass = "text-xs font-semibold text-[#374151]";

export default function GalleryForm({
  action,
  item,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  item?: GalleryRow;
  submitLabel: string;
}) {
  const currentImage = item ? storageUrl(item.image_path) : null;

  return (
    <form action={action} className="max-w-2xl space-y-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
      <div>
        <label className={labelClass} htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={item?.title} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="caption">Caption (optional)</label>
        <textarea id="caption" name="caption" rows={2} defaultValue={item?.caption ?? ""} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="tags">Tags (comma-separated)</label>
        <input id="tags" name="tags" defaultValue={item?.tags?.join(", ")} placeholder="mandap, floral, backwater" className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="image">Photo {item ? "(leave empty to keep current)" : "(required)"}</label>
        {currentImage && (
          <div className="relative mt-2 h-28 w-28 overflow-hidden rounded-xl border border-purple-100">
            <Image src={currentImage} alt={item?.title || ""} fill className="object-cover" />
          </div>
        )}
        <input id="image" name="image" type="file" accept="image/*" required={!item} className="mt-2 w-full text-sm" />
      </div>

      <button type="submit" className="rounded-xl bg-[#8B31C7] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#7a28b0] cursor-pointer">
        {submitLabel}
      </button>
    </form>
  );
}
