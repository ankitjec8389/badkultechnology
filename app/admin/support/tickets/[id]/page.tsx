import { TicketView } from "@/components/admin/ticket-view"

export default function TicketViewPage({ params }: { params: { id: string } }) {
  return <TicketView ticketId={params.id} />
}
