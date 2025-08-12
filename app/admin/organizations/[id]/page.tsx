import { OrganizationDetail } from "@/components/admin/organization-detail"

export default function OrganizationDetailPage({ params }: { params: { id: string } }) {
  return <OrganizationDetail organizationId={params.id} />
}
