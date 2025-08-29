"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Target, 
  Users, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  DollarSign,
  BarChart3,
  Activity
} from "lucide-react"
import Image from "next/image"

type Campaign = {
  id: string
  title: string
  description: string
  category: string
  image_url: string | null
  goal: number
  raised: number
  location: string
  created_at: string
}

type Donor = {
  id: string
  name: string
  amount: number
  timeAgo: string
  campaign_id: string
}

type DonationStats = {
  totalRaised: number
  totalDonors: number
  activeCampaigns: number
  averageDonation: number
}

export function DonationTracker() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [donors, setDonors] = useState<Donor[]>([])
  const [stats, setStats] = useState<DonationStats>({
    totalRaised: 0,
    totalDonors: 0,
    activeCampaigns: 0,
    averageDonation: 0
  })
  const [loading, setLoading] = useState(true)
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch campaigns
      const campaignsResponse = await fetch('/api/campaigns')
      const campaignsData = await campaignsResponse.json()
      
      if (campaignsData.campaigns) {
        setCampaigns(campaignsData.campaigns)
        calculateStats(campaignsData.campaigns)
      }

      // Fetch donations (you'll need to create this API endpoint)
      // const donationsResponse = await fetch('/api/donations')
      // const donationsData = await donationsResponse.json()
      // if (donationsData.donations) {
      //   setDonors(donationsData.donations)
      // }

      // For now, use mock data
      setDonors([
        { id: "1", name: "John Smith", amount: 50, timeAgo: "2 hours ago", campaign_id: "1" },
        { id: "2", name: "Sarah Johnson", amount: 100, timeAgo: "4 hours ago", campaign_id: "1" },
        { id: "3", name: "Mike Chen", amount: 25, timeAgo: "6 hours ago", campaign_id: "2" },
        { id: "4", name: "Emma Wilson", amount: 75, timeAgo: "8 hours ago", campaign_id: "2" },
        { id: "5", name: "David Brown", amount: 30, timeAgo: "12 hours ago", campaign_id: "3" },
        { id: "6", name: "Lisa Garcia", amount: 60, timeAgo: "1 day ago", campaign_id: "1" },
        { id: "7", name: "Tom Anderson", amount: 40, timeAgo: "1 day ago", campaign_id: "3" },
        { id: "8", name: "Anna Martinez", amount: 80, timeAgo: "2 days ago", campaign_id: "2" },
      ])

    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (campaigns: Campaign[]) => {
    const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0)
    const totalDonors = donors.length
    const activeCampaigns = campaigns.filter(c => c.raised < c.goal).length // Assuming 'active' means raised < goal
    const averageDonation = totalDonors > 0 ? totalRaised / totalDonors : 0

    setStats({
      totalRaised,
      totalDonors,
      activeCampaigns,
      averageDonation
    })
  }

  const getFundedPercentage = (current: number, goal: number) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getCampaignDonors = (campaignId: string) => {
    return donors.filter(donor => donor.campaign_id === campaignId)
  }

  const getTopDonors = () => {
    return [...donors]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading donation tracker...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Raised</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRaised)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Donors</p>
                <p className="text-2xl font-bold">{stats.totalDonors}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Campaigns</p>
                <p className="text-2xl font-bold">{stats.activeCampaigns}</p>
              </div>
              <Target className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg. Donation</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.averageDonation)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Progress */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          Campaign Progress
        </h2>
        
        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/4">
                  <div className="h-48 md:h-full relative">
                    <Image
                      src={campaign.image_url || "/placeholder.svg"}
                      alt={campaign.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <Badge className="absolute top-3 left-3 bg-purple-600">
                      {campaign.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="md:w-3/4 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {campaign.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        {campaign.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {campaign.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(campaign.created_at)}
                        </span>
                      </div>
                    </div>
                    <Badge 
                      variant={campaign.raised < campaign.goal ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {campaign.raised < campaign.goal ? 'Active' : 'Completed'}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
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
                  <div className="grid grid-cols-4 gap-4 mb-4">
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
                        {getCampaignDonors(campaign.id).length}
                      </div>
                      <div className="text-xs text-gray-500">Donors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        {getCampaignDonors(campaign.id).length > 0 
                          ? formatCurrency(campaign.raised / getCampaignDonors(campaign.id).length)
                          : formatCurrency(0)
                        }
                      </div>
                      <div className="text-xs text-gray-500">Avg. Gift</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Donate Now
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
                    >
                      {selectedCampaign === campaign.id ? 'Hide' : 'Show'} Donors
                    </Button>
                  </div>
                  
                  {/* Donor List for this campaign */}
                  {selectedCampaign === campaign.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Recent Donors</h4>
                      <div className="space-y-3">
                        {getCampaignDonors(campaign.id).slice(0, 5).map((donor) => (
                          <div key={donor.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Heart className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{donor.name}</p>
                                <p className="text-xs text-gray-500">{donor.timeAgo}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">{formatCurrency(donor.amount)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Donors */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-green-600" />
          Top Donors
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {getTopDonors().map((donor, index) => (
                <div key={donor.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{donor.name}</p>
                      <p className="text-sm text-gray-500">{donor.timeAgo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600 text-lg">{formatCurrency(donor.amount)}</p>
                    <p className="text-xs text-gray-500">Donation</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
