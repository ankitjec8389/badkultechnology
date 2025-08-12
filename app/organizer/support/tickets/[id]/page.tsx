import { TicketViewOrganizer } from "@/components/organizer/ticket-view-organizer"

export default function OrganizerTicketPage({ params }: { params: { id: string } }) {
  return <TicketViewOrganizer ticketId={params.id} />
}
