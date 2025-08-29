"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Approve } from "@/components/ui/created"
import { ImageUpload } from "@/components/ui/image_upload"
import { Heart, Target, Users, Calendar, MapPin, DollarSign } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

type Campaign = {
  id: string
  title: string
  description: string
  category: string
  image_url: string | null
  goal: number
  raised: number
  status: string
  created_at: string
  created_by: string
}

type Donor = {
  name: string
  amount: number
  timeAgo: string
}

export default function FundraisingPage() {
  const [showApproval, setShowApproval] = useState(false)
  const [campaignImage, setCampaignImage] = useState<string | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [donationAmounts, setDonationAmounts] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    category: "Well-being",
    location: "",
    organizationName: "",
    contactEmail: "",
    contactPhone: "",
  })

  const categories = ["Medical", "Education", "Well-being", "Emergency", "Community"]

  const mockDonors: Donor[] = [
    { name: "John Smith", amount: 50, timeAgo: "2 hours ago" },
    { name: "Sarah Johnson", amount: 100, timeAgo: "4 hours ago" },
    { name: "Mike Chen", amount: 25, timeAgo: "6 hours ago" },
    { name: "Emma Wilson", amount: 75, timeAgo: "8 hours ago" },
    { name: "David Brown", amount: 30, timeAgo: "12 hours ago" },
  ]

  const router = useRouter()

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      if (data.campaigns) {
        setCampaigns(data.campaigns)
        // Initialize donation amounts for each campaign
        const initialAmounts: { [key: string]: string } = {}
        data.campaigns.forEach((campaign: Campaign) => {
          initialAmounts[campaign.id] = ""
        })
        setDonationAmounts(initialAmounts)
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDonationAmountChange = (campaignId: string, amount: string) => {
    setDonationAmounts(prev => ({ ...prev, [campaignId]: amount }))
  }

  const handleDonate = (campaign: Campaign) => {
    const amount = donationAmounts[campaign.id]
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount')
      return
    }
    
    // Navigate to payment page with campaign and amount info
    router.push(`/payment?campaignId=${campaign.id}&amount=${amount}&title=${encodeURIComponent(campaign.title)}`)
  }

  const handleCreate = async () => {
    if (!formData.title || !formData.goalAmount || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    try {
      // Use a real user ID from your existing profiles (using cheata's profile ID)
      const userId = '64170e75-6a1c-4d60-ab21-e949a1361a63'
      
      // Create campaign in database
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          goalAmount: parseFloat(formData.goalAmount),
          userId: userId,
          category: formData.category,
          imageUrl: campaignImage,
          location: formData.location
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        console.log('Campaign created successfully:', data)
        setShowApproval(true)
        // Refresh campaigns list
        fetchCampaigns()
        // Reset form
        setFormData({
          title: "",
          description: "",
          goalAmount: "",
          category: "Well-being",
          location: "",
          organizationName: "",
          contactEmail: "",
          contactPhone: "",
        })
        setCampaignImage(null)
      } else {
        alert('Failed to create campaign: ' + data.error)
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
      alert('Error creating campaign. Please try again.')
    }
  }

  const closeApproval = () => {
    setShowApproval(false)
    // Reset form after successful creation
    setFormData({
      title: "",
      description: "",
      goalAmount: "",
      category: "Well-being",
      location: "",
      organizationName: "",
      contactEmail: "",
      contactPhone: "",
    })
    setCampaignImage(null)
  }

  const getFundedPercentage = (current: number, goal: number) => {
    if (goal === 0) return 0
    return Math.round((current / goal) * 100)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fundraising Campaigns</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create your own fundraising campaign or track existing ones. Help make a difference in communities around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fundraising Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Heart className="w-6 h-6 text-purple-600" />
                  Create Campaign
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Title *
                  </label>
                  <Input
                    placeholder="Enter campaign title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Describe your campaign goals and impact"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="w-full min-h-[100px] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Amount (USD) *
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.goalAmount}
                    onChange={(e) => handleInputChange("goalAmount", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name
                  </label>
                  <Input
                    placeholder="Your organization name"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange("organizationName", e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Image
                  </label>
                  <ImageUpload onImageUpload={setCampaignImage} currentImage={campaignImage} />
                </div>

                <Button
                  onClick={handleCreate}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
                >
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Listings and Donation Tracker */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Campaigns */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-600" />
                Active Campaigns
              </h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading campaigns...</p>
                </div>
              ) : campaigns.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No campaigns yet</h3>
                    <p className="text-gray-500">Be the first to create a fundraising campaign!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="h-48 md:h-full relative">
                            <Image
                              src={campaign.image_url || "/placeholder.svg"}
                              alt={campaign.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <Badge className="absolute top-3 left-3 bg-purple-600">
                              {campaign.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                              {campaign.title}
                            </h3>
                            <Badge 
                              variant={campaign.raised < campaign.goal ? 'default' : 'secondary'}
                              className="ml-2"
                            >
                              {campaign.raised < campaign.goal ? 'Active' : 'Completed'}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {campaign.description}
                          </p>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">
                                {formatCurrency(campaign.raised)} raised
                              </span>
                              <span className="text-sm text-gray-500">
                                {getFundedPercentage(campaign.raised, campaign.goal)}% funded
                              </span>
                            </div>
                            <Progress 
                              value={getFundedPercentage(campaign.raised, campaign.goal)} 
                              className="h-3"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Goal: {formatCurrency(campaign.goal)}
                            </p>
                          </div>
                          
                          {/* Campaign Stats */}
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-purple-600">
                                {formatCurrency(campaign.raised)}
                              </div>
                              <div className="text-xs text-gray-500">Raised</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-blue-600">
                                {formatCurrency(campaign.goal)}
                              </div>
                              <div className="text-xs text-gray-500">Goal</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-semibold text-green-600">
                                {mockDonors.length}
                              </div>
                              <div className="text-xs text-gray-500">Donors</div>
                            </div>
                          </div>
                          
                          {/* Donation Input */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Donation Amount (USD)
                            </label>
                            <Input
                              type="number"
                              placeholder="Enter amount"
                              value={donationAmounts[campaign.id] || ""}
                              onChange={(e) => handleDonationAmountChange(campaign.id, e.target.value)}
                              className="w-full mb-3"
                              min="1"
                            />
                            <Button 
                              onClick={() => handleDonate(campaign)}
                              className="w-full bg-purple-600 hover:bg-purple-700"
                            >
                              Donate Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Donations */}
            {campaigns.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-600" />
                  Recent Donations
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {mockDonors.map((donor, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Heart className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{donor.name}</p>
                              <p className="text-sm text-gray-500">{donor.timeAgo}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">{formatCurrency(donor.amount)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      {showApproval && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <Approve onClose={closeApproval} />
        </div>
      )}
    </div>
  )
}
