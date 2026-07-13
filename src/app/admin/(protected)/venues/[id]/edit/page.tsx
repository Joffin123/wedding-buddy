import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { VenueRow } from "@/lib/supabase";
import VenueForm from "@/components/admin/VenueForm";
import { updateVenue } from "../../actions";

export default async function EditVenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: venue } = await supabaseAdmin.from("venues").select("*").eq("id", id).maybeSingle<VenueRow>();

  if (!venue) notFound();

  return (
    <div>
      <Link href="/admin/venues" className="text-sm font-semibold text-[#8B31C7] hover:underline">← Back to venues</Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-[#111827]">Edit {venue.name}</h1>
      <div className="mt-6">
        <VenueForm action={updateVenue.bind(null, id)} venue={venue} submitLabel="Save changes" />
      </div>
    </div>
  );
}
