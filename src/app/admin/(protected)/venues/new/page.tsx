import Link from "next/link";
import VenueForm from "@/components/admin/VenueForm";
import { createVenue } from "../actions";

export default function NewVenuePage() {
  return (
    <div>
      <Link href="/admin/venues" className="text-sm font-semibold text-[#8B31C7] hover:underline">← Back to venues</Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-[#111827]">Add venue</h1>
      <div className="mt-6">
        <VenueForm action={createVenue} submitLabel="Create venue" />
      </div>
    </div>
  );
}
