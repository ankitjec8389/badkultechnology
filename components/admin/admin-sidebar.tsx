"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  MessageSquare,
  Settings,
  FileText,
  BarChart3,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: BarChart3,
  },
  {
    name: "Organizations",
    href: "/admin/organizations",
    icon: Building2,
    children: [
      { name: "Pending Approvals", href: "/admin/organizations/pending" },
      { name: "Active Organizations", href: "/admin/organizations/active" },
      { name: "Rejected Applications", href: "/admin/organizations/rejected" },
    ],
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: Users,
    children: [
      { name: "All Users", href: "/admin/users/all" },
      { name: "Travelers", href: "/admin/users/travelers" },
      { name: "Trip Leaders", href: "/admin/users/leaders" },
    ],
  },
  {
    name: "Content Moderation",
    href: "/admin/moderation",
    icon: Shield,
    children: [
      { name: "Trip Reviews", href: "/admin/moderation/trips" },
      { name: "Reported Content", href: "/admin/moderation/reports" },
      { name: "Flagged Reviews", href: "/admin/moderation/reviews" },
    ],
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: TrendingUp,
    children: [
      { name: "Platform Overview", href: "/admin/analytics/platform" },
      { name: "User Demographics", href: "/admin/analytics/demographics" },
      { name: "Market Insights", href: "/admin/analytics/market" },
    ],
  },
  {
    name: "Support Center",
    href: "/admin/support",
    icon: MessageSquare,
    children: [
      { name: "Open Tickets", href: "/admin/support/open" },
      { name: "Resolved Tickets", href: "/admin/support/resolved" },
      { name: "Knowledge Base", href: "/admin/support/kb" },
    ],
  },
  {
    name: "CMS",
    href: "/admin/cms",
    icon: FileText,
    children: [
      { name: "Pages", href: "/admin/cms/pages" },
      { name: "Announcements", href: "/admin/cms/announcements" },
      { name: "Featured Trips", href: "/admin/cms/featured" },
    ],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white border-r border-gray-200 w-64 flex-shrink-0 transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "fixed md:relative z-40 h-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Ragir Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>

                {/* Sub-navigation */}
                {item.children && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-lg transition-colors",
                          pathname === child.href ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50",
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}
