"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Users, Heart } from "lucide-react"
import { useSearchParams } from "next/navigation"

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

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Help donating money for this rural hospital in Kampong Speu province",
    description: "Support medical care for rural communities",
    category: "Medical",
    image: "/hospitaljpg.jpg",
    raised: 633,
    goal: 1000,
    fundedPercentage: 63,
    location: "Kampong Speu, Cambodia",
  },
  {
    id: "2",
    title: "Help them complete their high school degrees",
    description: "Education support for underprivileged students",
    category: "Education",
    image: "/schhool.jpg",
    raised: 10500,
    goal: 15000,
    fundedPercentage: 70,
  },
  {
    id: "3",
    title: "Donate for rural kid's well-being",
    description: "Improving living conditions for rural children",
    category: "Well-being",
    image: "/well-being.jpg",
    raised: 860,
    goal: 1200,
    fundedPercentage: 72,
  },
  {
    id: "4",
    title: "Thida's sorting medical help for her pregnancy",
    description: "Medical assistance for expectant mothers",
    category: "Medical",
    image: "/pregg.jpg",
    raised: 360,
    goal: 600,
    fundedPercentage: 60,
  },
  {
    id: "5",
    title: "Funding school supplies in kandal province",
    description: "Educational materials for rural schools",
    category: "Education",
    image: "/sla.jpg",
    raised: 450,
    goal: 800,
    fundedPercentage: 56,
  },
  {
    id: "6",
    title: "Clean water access for rural communities",
    description: "Providing safe drinking water and sanitation facilities",
    category: "Well-being",
    image: "/water-rural.jpg",
    raised: 420,
    goal: 800,
    fundedPercentage: 53,
  },
]

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
  const searchParams = useSearchParams()
  const [currentView, setCurrentView] = useState<"categories" | "detail">("categories")
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [liveCampaigns, setLiveCampaigns] = useState<Campaign[]>(initialCampaigns)

  const categories = ["all", "Medical", "Education", "Well-being"]

  useEffect(() => {
    const campaignId = searchParams.get("campaignId")
    if (campaignId) {
      const campaign = initialCampaigns.find((c) => c.id === campaignId)
      if (campaign) {
        setSelectedCampaign(campaign)
        setCurrentView("detail")
      }
    }
  }, [searchParams])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCampaigns((prevCampaigns) =>
        prevCampaigns.map((campaign) => {
          if (Math.random() < 0.1) {
            const donationAmount = Math.floor(Math.random() * 50) + 5
            const newRaised = campaign.raised + donationAmount
            const newPercentage = Math.min(Math.round((newRaised / campaign.goal) * 100), 100)

            console.log(`[v0] New donation of $${donationAmount} to ${campaign.title}`)

            return {
              ...campaign,
              raised: newRaised,
              fundedPercentage: newPercentage,
            }
          }
          return campaign
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
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

  useEffect(() => {
    if (selectedCampaign) {
      const updatedCampaign = liveCampaigns.find((c) => c.id === selectedCampaign.id)
      if (updatedCampaign) {
        setSelectedCampaign(updatedCampaign)
      }
    }
  }, [liveCampaigns, selectedCampaign])

  const handleBackToCategories = () => {
    setCurrentView("categories")
    setSelectedCampaign(null)
  }

  const getCampaignContent = (campaign: Campaign) => {
    const contentMap: Record<string, { fullDescription: string; images: string[] }> = {
      "1": {
        fullDescription:
          "In the heart of Kampong Speu, a small rural hospital is doing its best to serve thousands of families—but it's running out of time and resources. With outdated equipment, medicine shortages, and limited staff, even basic care becomes a daily struggle. Mothers give birth without proper support. Children wait hours for treatment. Elders walk miles for help that may not arrive. This hospital is more than a building, it's a lifeline. And right now, it needs ours.",
        images: ["/hospital2.jpg", "/hospital3.jpg", "/doc1.png"],
      },
      "2": {
        fullDescription:
          "Thida is a young expectant mother in a remote village who needs urgent medical assistance for a safe delivery. Like many women in rural areas, she lacks access to proper prenatal care, skilled birth attendants, and emergency medical services. Your support will help cover medical expenses, transportation to healthcare facilities, and ensure both mother and baby receive the care they need during this critical time.",
        images: ["/pregnant.jpg", "/pregnancy.jpg", "/preg.jpg"],
      },
      "3": {
        fullDescription:
          "Education is the key to breaking the cycle of poverty, but many bright students in rural areas lack the resources to complete their high school education. Without proper textbooks, school supplies, and support, these talented young minds are forced to abandon their dreams. Your donation can provide scholarships, learning materials, and mentorship programs that will help these students graduate and pursue higher education, creating a brighter future for their communities.",
        images: ["/kids.png", "/schooljpg.jpg", "/schools.jpg"],
      },
       "4": {
        fullDescription:
          "Students in Kandal province are eager to learn but lack basic school supplies like textbooks, notebooks, pencils, and educational materials. Many families cannot afford these essentials, forcing children to share limited resources or go without. This campaign aims to provide comprehensive school supply packages, improve classroom resources, and ensure every child has the tools they need to succeed in their education.",
        images: ["/kids.png", "/kidschool.jpg", "/donate page.png"],
      },
      "5": {
        fullDescription:
          "Access to clean, safe drinking water is a fundamental human right, yet many rural communities still lack this basic necessity. Contaminated water sources lead to waterborne diseases, affecting children's health and preventing them from attending school. This project will install water purification systems, build wells, and provide sanitation facilities to ensure communities have sustainable access to clean water for drinking, cooking, and hygiene.",
        images: ["/nutrition.jpg", "/ruralpng.png", "/ruralkidjpg.jpg"],
      },
      "6": {
        fullDescription:
          "Rural children face numerous challenges that affect their overall well-being and development. Limited access to nutritious food, clean water, healthcare, and safe play areas impacts their physical and mental health. This campaign focuses on improving living conditions by providing essential resources, creating safe spaces for children to learn and play, and ensuring they have access to basic necessities for healthy growth and development.",
        images: ["/meals3.png", "/meal2.png", "/mealspng.png"],
      },
    }

    return (
      contentMap[campaign.id] || {
        fullDescription: campaign.description,
        images: [campaign.image, campaign.image, campaign.image],
      }
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "categories" ? (
          <>
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover charity campaigns on Samaki</h1>
                <p className="text-lg text-gray-600">Help others by donating to these campaigns</p>
              </div>
              <div className="flex-1">
                <img
                  src="/ruralhouse.png"
                  alt="Education campaigns"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Browse Campaigns Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse these campaigns</h2>

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
                    <div className="relative">
                      <img
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        className="w-full h-48 object-cover"
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
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{campaign.title}</h3>
                      </div>
                      <div>
                        <div className="flex justify-between items-center text-sm mb-3">
                          <span className="text-purple-600 font-semibold">${campaign.raised} Raised</span>
                          <span className="text-gray-600">{campaign.fundedPercentage}% funded</span>
                        </div>
                        <Progress value={campaign.fundedPercentage} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Campaign Detail View */
          selectedCampaign && (
            <div className="relative">
              <Button variant="outline" onClick={handleBackToCategories} className="mb-6 bg-transparent">
                ← Back to campaigns
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">{selectedCampaign.title}</h1>

                  <div className="mb-6">
                    <img
                      src={selectedCampaign.image || "/placeholder.svg"}
                      alt={selectedCampaign.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">Samaki Organization</span>
                  </div>

                  <Badge className="bg-green-100 text-green-800 mb-6">🛡️ Donation Protected</Badge>

                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {getCampaignContent(selectedCampaign).fullDescription}
                    </p>
                  </div>

                  {/* Additional Images */}
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {getCampaignContent(selectedCampaign).images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${selectedCampaign.title} - Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Donation Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 sticky top-6">
                    <div className="mb-6">
                      <div className="text-2xl font-bold mb-1">${selectedCampaign.raised} USD raised</div>
                      <div className="text-purple-200 text-sm mb-4">Goal: ${selectedCampaign.goal}</div>
                      <Progress value={selectedCampaign.fundedPercentage} className="h-2 mb-4 bg-purple-500" />
                      <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                        Donate now
                      </Button>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" />
                        <span className="text-sm">13 people just donated</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">L</span>
                        </div>
                        <div className="text-sm">
                          <div>Learning Lao</div>
                          <div className="text-purple-200 text-xs">$50 • Top Donation</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">A</span>
                        </div>
                        <div className="text-sm">
                          <div>Amazing Team</div>
                          <div className="text-purple-200 text-xs">$25 • Top Donation</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">A</span>
                        </div>
                        <div className="text-sm">
                          <div>Alannah R</div>
                          <div className="text-purple-200 text-xs">$15 • First Donation</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                      onClick={() => setShowLeaderboard(true)}
                    >
                      See more →
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Leaderboard Overlay */}
      {showLeaderboard && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Top Donors</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLeaderboard(false)}
                className="text-white hover:bg-purple-500"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {donors.map((donor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-700">{donor.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{donor.name}</div>
                        <div className="text-sm text-gray-500">{donor.timeAgo}</div>
                      </div>
                    </div>
                    <div className="text-purple-600 font-semibold">${donor.amount}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Donate now</Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <span>🇺🇸 United States • English</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <span>2010-2025 Samaki</span>
            <a href="#" className="hover:text-purple-600">
              Terms & Privacy Notice
            </a>
            <a href="#" className="hover:text-purple-600">
              Legal
            </a>
            <a href="#" className="hover:text-purple-600">
              Accessibility Statement
            </a>
            <a href="#" className="hover:text-purple-600">
              Cookie Policy
            </a>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-2">
            <a href="#" className="hover:text-purple-600">
              Manage Cookie Preferences
            </a>
            <a href="#" className="hover:text-purple-600">
              Your Privacy Choices
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
