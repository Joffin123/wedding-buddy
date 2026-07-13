import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { VenueRow } from "@/lib/supabase";
import VenueForm from "@/components/admin/VenueForm";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { updateVenue } from "../../actions";

export default async function EditVenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: venue } = await supabaseAdmin.from("venues").select("*").eq("id", id).maybeSingle<VenueRow>();

  if (!venue) notFound();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/venues" label="Back to venues" />
      <PageHeader title={`Edit ${venue.name}`} />
      <VenueForm action={updateVenue.bind(null, id)} venue={venue} submitLabel="Save changes" />
    </div>
  );
}
