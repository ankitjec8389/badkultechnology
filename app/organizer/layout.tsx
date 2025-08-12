import type React from "react"
import { OrganizerSidebar } from "@/components/organizer/organizer-sidebar"
import { OrganizerHeader } from "@/components/organizer/organizer-header"

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <OrganizerHeader />
      <div className="flex">
        <OrganizerSidebar />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
