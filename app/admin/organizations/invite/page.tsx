import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InviteOrganization } from "@/components/admin/invite-organization"

export default function InviteOrganizationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Invite Organization</h1>
        <p className="text-muted-foreground">Manually onboard a new tour organizer to the platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Invitation</CardTitle>
          <CardDescription>
            Send an invitation to a tour organizer to join the Ragir platform. They will receive an email with
            registration instructions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InviteOrganization />
        </CardContent>
      </Card>
    </div>
  )
}
