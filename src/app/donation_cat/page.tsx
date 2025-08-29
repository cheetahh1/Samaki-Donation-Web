"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Users, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Campaign = {
  id: string
  title: string
  description: string
  category: "Medical" | "Education" | "Well-being"
  image: string
  raised: number
  goal: number
  fundedPercentage: number
  location?: string
}

type Donor = {
  name: string
  amount: number
  timeAgo: string
}

const donors: Donor[] = [
  { name: "John Smith", amount: 50, timeAgo: "2 hours ago" },
  { name: "Sarah Johnson", amount: 100, timeAgo: "4 hours ago" },
  { name: "Mike Chen", amount: 25, timeAgo: "6 hours ago" },
  { name: "Emma Wilson", amount: 75, timeAgo: "8 hours ago" },
  { name: "David Brown", amount: 30, timeAgo: "12 hours ago" },
  { name: "Lisa Garcia", amount: 60, timeAgo: "1 day ago" },
  { name: "Tom Anderson", amount: 40, timeAgo: "1 day ago" },
  { name: "Anna Martinez", amount: 80, timeAgo: "2 days ago" },
  { name: "Chris Taylor", amount: 35, timeAgo: "2 days ago" },
  { name: "Maria Rodriguez", amount: 90, timeAgo: "3 days ago" },
]

export default function DonationPlatform() {
  const [currentView, setCurrentView] = useState<"categories" | "detail">("categories")
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [liveCampaigns, setLiveCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  const categories = ["all", "Medical", "Education", "Well-being"]

  // Fetch campaigns from Supabase
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch("/api/campaigns")
        const data = await res.json()

        if (data.campaigns) {
          const mapped = data.campaigns.map((c: { id: string; title: string; description: string; category?: string; image_url?: string; current_amount?: number; goal_amount?: number; location?: string }) => ({
            id: c.id,
            title: c.title,
            description: c.description,
            category: c.category || "Well-being",
            image: c.image_url || "/placeholder.svg",
            raised: c.current_amount || 0,
            goal: c.goal_amount || 0,
            fundedPercentage: c.goal_amount && c.current_amount
              ? Math.round((c.current_amount / c.goal_amount) * 100)
              : 0,
            location: c.location || "",
          }))
          setLiveCampaigns(mapped)
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  const filteredCampaigns =
    selectedCategory === "all"
      ? liveCampaigns
      : liveCampaigns.filter((campaign) => campaign.category === selectedCategory)

  const handleCampaignClick = (campaign: Campaign) => {
    const liveCampaign = liveCampaigns.find((c) => c.id === campaign.id) || campaign
    setSelectedCampaign(liveCampaign)
    setCurrentView("detail")
  }

  const handleBackToCategories = () => {
    setCurrentView("categories")
    setSelectedCampaign(null)
  }

  const getCampaignContent = (campaign: Campaign) => {
    // Optional: add more images per campaign if needed
    return {
      fullDescription: campaign.description,
      images: [campaign.image, campaign.image, campaign.image],
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading campaigns...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "categories" ? (
          <>
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Discover charity campaigns on Samaki
                </h1>
                <p className="text-lg text-gray-600">Help others by donating to these campaigns</p>
              </div>
              <div className="flex-1">
                <div className="w-full h-64 relative rounded-2xl shadow-lg overflow-hidden">
                  <Image
                    src="/ruralhouse.png"
                    alt="Education campaigns"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "border-purple-200 text-purple-600 hover:bg-purple-50"
                  }
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <Card
                  key={campaign.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
                  onClick={() => handleCampaignClick(campaign)}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${
                        campaign.category === "Medical"
                          ? "bg-purple-600"
                          : campaign.category === "Education"
                          ? "bg-blue-600"
                          : "bg-green-600"
                      } text-white`}
                    >
                      {campaign.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                        {campaign.title}
                      </h3>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-sm mb-3">
                        <span className="text-purple-600 font-semibold">
                          ${campaign.raised} Raised
                        </span>
                        <span className="text-gray-600">{campaign.fundedPercentage}% funded</span>
                      </div>
                      <Progress value={campaign.fundedPercentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Campaign Detail View */
          selectedCampaign && (
            <div className="relative">
              <Button
                variant="outline"
                onClick={handleBackToCategories}
                className="mb-6 bg-transparent"
              >
                ← Back to campaigns
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">{selectedCampaign.title}</h1>

                  <div className="mb-6 w-full h-64 relative rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src={selectedCampaign.image || "/placeholder.svg"}
                      alt={selectedCampaign.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">Samaki Organization</span>
                  </div>

                  <Badge className="bg-green-100 text-green-800 mb-6">🛡️ Donation Protected</Badge>

                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-700 leading-relaxed">
                      {getCampaignContent(selectedCampaign).fullDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {getCampaignContent(selectedCampaign).images.map((image, index) => (
                      <div
                        key={index}
                        className="w-full h-24 relative rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${selectedCampaign.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 sticky top-6">
                    <div className="mb-6">
                      <div className="text-2xl font-bold mb-1">${selectedCampaign.raised} USD raised</div>
                      <div className="text-purple-200 text-sm mb-4">Goal: ${selectedCampaign.goal}</div>
                      <Progress value={selectedCampaign.fundedPercentage} className="h-2 mb-4 bg-purple-500" />
                      <Button asChild className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                        <Link href="/payment">Donate now</Link>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  )
}
