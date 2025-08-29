"use client"

import { DonationTracker } from "@/components/ui/donation-tracker"

export default function DonationTrackerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Donation Tracker</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track fundraising progress, monitor donations, and see the impact of your campaigns in real-time.
          </p>
        </div>

        {/* Donation Tracker Component */}
        <DonationTracker />
      </main>
    </div>
  )
}
