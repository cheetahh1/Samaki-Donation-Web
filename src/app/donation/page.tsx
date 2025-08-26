"use client"

import { useRouter } from "next/navigation"
import { Suspense } from "react"
import DonationPlatform from "@/components/ui/donation"

export default function DonationPlatformPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      {/* Back to Dashboard Button */}
      <div className="bg-white border-b px-4 py-3">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
      </div>

      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <DonationPlatform />
      </Suspense>
    </div>
  )
}
