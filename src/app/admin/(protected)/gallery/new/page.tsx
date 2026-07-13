import Link from "next/link";
import GalleryForm from "@/components/admin/GalleryForm";
import { createGalleryItem } from "../actions";

export default function NewGalleryItemPage() {
  return (
    <div>
      <Link href="/admin/gallery" className="text-sm font-semibold text-[#8B31C7] hover:underline">← Back to gallery</Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-[#111827]">Add photo</h1>
      <div className="mt-6">
        <GalleryForm action={createGalleryItem} submitLabel="Add photo" />
      </div>
    </div>
  );
}
