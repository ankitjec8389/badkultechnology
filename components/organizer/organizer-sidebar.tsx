"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Calendar,
  Home,
  Library,
  MessageSquare,
  Plus,
  Settings,
  TrendingUp,
  Users,
  Menu,
  X,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/organizer", icon: Home },
  { name: "View Trips", href: "/organizer/trips", icon: Calendar },
  { name: "Create Trip", href: "/organizer/create-trip", icon: Plus },
  { name: "Trip Analytics", href: "/organizer/analytics/trips", icon: BarChart3 },
  { name: "Organization Analytics", href: "/organizer/analytics/organization", icon: TrendingUp },
  { name: "Market Insights", href: "/organizer/analytics/market", icon: TrendingUp },
  { name: "Library", href: "/organizer/library", icon: Library },
  { name: "User Queries", href: "/organizer/queries", icon: MessageSquare },
  { name: "Leads", href: "/organizer/leads", icon: Users },
  { name: "Team Members", href: "/organizer/team", icon: Users },
  { name: "Settings", href: "/organizer/settings", icon: Settings },
]

const bottomNavigation = [{ name: "Support Center", href: "/organizer/support", icon: HelpCircle }]

export function OrganizerSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 w-64 min-h-screen transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          "fixed inset-y-0 left-0 z-40",
        )}
      >
        <nav className="p-4 space-y-2 flex flex-col h-full">
          <div className="flex-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="border-t pt-4">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
