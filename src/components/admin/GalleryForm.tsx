import Image from "next/image";
import { storageUrl, type GalleryRow } from "@/lib/supabase";
import { Card, FormSection, fieldClass, labelClass, SubmitButton, CancelLink } from "@/components/admin/ui";

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
    <form action={action}>
      <Card className="max-w-2xl space-y-6 p-6">
        <FormSection title="Details">
          <div>
            <label className={labelClass} htmlFor="title">Title</label>
            <input id="title" name="title" required defaultValue={item?.title} className={fieldClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="caption">Caption (optional)</label>
            <textarea id="caption" name="caption" rows={2} defaultValue={item?.caption ?? ""} className={fieldClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="tags">Tags (comma-separated)</label>
            <input id="tags" name="tags" defaultValue={item?.tags?.join(", ")} placeholder="mandap, floral, backwater" className={fieldClass} />
          </div>
        </FormSection>

        <FormSection title="Photo">
          <div>
            <label className={labelClass} htmlFor="image">Photo {item ? "(leave empty to keep current)" : "(required)"}</label>
            {currentImage && (
              <div className="relative mt-2 h-28 w-28 overflow-hidden rounded-xl border border-gray-200">
                <Image src={currentImage} alt={item?.title || ""} fill className="object-cover" />
              </div>
            )}
            <input id="image" name="image" type="file" accept="image/*" required={!item} className="mt-2 w-full text-sm" />
          </div>
        </FormSection>

        <div className="flex gap-3 border-t border-gray-100 pt-5">
          <SubmitButton>{submitLabel}</SubmitButton>
          <CancelLink href="/admin/gallery" />
        </div>
      </Card>
    </form>
  );
}
