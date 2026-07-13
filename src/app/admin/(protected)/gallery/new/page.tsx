import GalleryForm from "@/components/admin/GalleryForm";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { createGalleryItem } from "../actions";

export default function NewGalleryItemPage() {
  return (
    <div className="space-y-6">
      <BackLink href="/admin/gallery" label="Back to gallery" />
      <PageHeader title="Add photo" />
      <GalleryForm action={createGalleryItem} submitLabel="Add photo" />
    </div>
  );
}
