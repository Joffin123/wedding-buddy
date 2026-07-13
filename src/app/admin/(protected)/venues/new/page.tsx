import VenueForm from "@/components/admin/VenueForm";
import { BackLink, PageHeader } from "@/components/admin/ui";
import { createVenue } from "../actions";

export default function NewVenuePage() {
  return (
    <div className="space-y-6">
      <BackLink href="/admin/venues" label="Back to venues" />
      <PageHeader title="Add venue" />
      <VenueForm action={createVenue} submitLabel="Create venue" />
    </div>
  );
}
