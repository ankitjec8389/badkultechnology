import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Ragir</h1>
          <p className="text-xl text-gray-600">Your travel companion for amazing group experiences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Organizer Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage your trips, view analytics, and handle bookings</p>
              <Link href="/organizer">
                <Button className="w-full">Go to Organizer Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage organizations, moderate content, and view platform analytics</p>
              <Link href="/admin">
                <Button className="w-full">Go to Admin Panel</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compare Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Compare multiple trips side by side to make the best choice</p>
              <Link href="/compare">
                <Button className="w-full">Compare Trips</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
