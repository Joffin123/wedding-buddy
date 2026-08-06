import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { VenueRow, VenueHallRow } from "@/lib/supabase";
import VenueForm from "@/components/admin/VenueForm";
import HallsManager from "@/components/admin/HallsManager";
import { Card, FormSection, BackLink, PageHeader } from "@/components/admin/ui";
import { updateVenue } from "../../actions";

export default async function EditVenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: venue } = await supabaseAdmin.from("venues").select("*").eq("id", id).maybeSingle<VenueRow>();

  if (!venue) notFound();

  const { data: halls } = await supabaseAdmin
    .from("venue_halls")
    .select("*")
    .eq("venue_id", id)
    .order("sort_order", { ascending: true })
    .returns<VenueHallRow[]>();

  return (
    <div className="space-y-6">
      <BackLink href="/admin/venues" label="Back to venues" />
      <PageHeader title={`Edit ${venue.name}`} />
      <VenueForm action={updateVenue.bind(null, id)} venue={venue} submitLabel="Save changes" />

      <Card className="max-w-2xl p-6">
        <FormSection title="Halls & pricing">
          <p className="text-xs text-[#6B7280]">
            Add multiple halls (e.g. Platinum / Gold / Silver) with their own capacity and pricing.
            Shown on the public venue page instead of the single starting price above.
          </p>
          <HallsManager venueId={id} venueSlug={venue.slug} halls={halls ?? []} />
        </FormSection>
      </Card>
    </div>
  );
}
