"use client"

import { Home, MoreHorizontal, ChevronLeft, ChevronRight, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Approve } from "@/components/ui/approve"
import { Rejected } from "@/components/ui/rejected"

export default function Dashboard() {
  const router = useRouter()

  // const handleNavigateToHome = () => {
  //   router.push("/") // Navigates to homepage (page.tsx)
  // }

  const handleViewCampaign = (campaignId: number) => {
    router.push(`/donation?campaignId=${campaignId}`)
  }

  const [showApprove, setShowApprove] = useState(false)
  const [showRejected, setShowRejected] = useState(false)

  const handleApprove = () => {
    setShowApprove(true)
  }

  const handleReject = () => {
    setShowRejected(true)
  }

  const closeOverlay = () => {
    setShowApprove(false)
    setShowRejected(false)
  }

  const approvalCampaigns = [
    {
      id: 1,
      image: "/admin1.png",
      location: "Kampong Cham",
      author: "Cheata In Em",
      timeAgo: "2 hours ago",
      title: "Help Us Bring Clean Water to Rural Communities!",
      description:
        "Access to clean water is a basic human right, yet millions of people around the world still lack this essential resource. In rural communities, families often walk miles to collect water from unsafe sources, putting their health at risk and limiting opportunities for education and economic development.",
      goal: 2500,
    },
    {
      id: 2,
      image: "/admin2.png",
      location: "Kampot",
      author: "Sarah kim",
      timeAgo: "4 hours ago",
      title: "Build a Library for Underprivileged Children",
      description:
        "Every child deserves access to books and learning materials. Help us build a community library that will serve hundreds of children in this underserved neighborhood, providing them with educational resources and a safe space to study.",
      goal: 3200,
    },
    {
      id: 3,
      image: "/elderlymeals.jpg",
      location: "Prey Veng",
      author: "Jessica Wong",
      timeAgo: "6 hours ago",
      title: "Senior Care Program - Meals and Companionship",
      description:
        "Our elderly community members need support with daily meals and social interaction. This program will provide nutritious meals and organize activities to combat loneliness among seniors in our neighborhood.",
      goal: 1800,
    },
  ]

  const activeCampaigns = [
    {
      id: 1,
      image: "/hospitaljpg.jpg",
      location: "Kampong Speu",
      author: "Jenna Ortega",
      timeAgo: "10 days ago",
      title: "Help Donating money for this rural hospital in kampong speu province",
      description:
        "This rural hospital serves thousands of families in need of medical care. Your donations will help us purchase essential medical equipment and supplies to improve healthcare services for the community.",
      raised: 633,
      goal: 1000,
    },
    {
      id: 2,
      image: "/pregnant.jpg",
      location: "Kadal",
      author: "Kevin Hart",
      timeAgo: "5 days ago",
      title: "Thida's sorting medical help for her pregnancy",
      description:
        "Thida is a single mother who needs financial support for her pregnancy. Your contributions will help cover medical expenses and ensure a safe delivery for her and her baby.",
      raised: 360,
      goal: 1000,
    },
    {
      id: 3,
      image: "/schooljpg.jpg",
      location: "Kampong Cham",
      author: "Dr. satish kumar",
      timeAgo: "7 days ago",
      title: "Help them complete their high school degrees",
      description:
        "Many students in our community are at risk of dropping out of high school due to financial constraints. Your donations will provide scholarships and resources to help them complete their education.",
      raised: 10500,
      goal: 15000,
    },
    {
      id: 4,
      image: "/schools.jpg",
      location: "Kandal",
      author: "Sodaney",
      timeAgo: "3 days ago",
      title: "Funding school supplies in kandal province",
      description:
        "This campaign aims to provide essential school supplies to underprivileged children in Kandal province. Your support will help ensure that every child has the tools they need to succeed in their education.",
      raised: 450,
      goal: 800,
    },
    {
      id: 5,
      image: "/meals3.png",
      location: "Kampong Speu",
      author: "Kaknika Dorn",
      timeAgo: "4 days ago",
      title: "Donate for rural kid's well-being",
      description:
        "This campaign focuses on improving the well-being of rural children in Kampong Thom. Your donations will go towards providing healthcare, nutrition, and educational resources to enhance their quality of life.",
      raised: 850,
      goal: 1200,
    },
    {
      id: 6,
      image: "/meal2.png",
      location: "Kampong Chnang",
      author: "Eveheang Sok",
      timeAgo: "15 days ago",
      title: "Help them get nutritious meals",
      description:
        " This campaign aims to provide nutritious meals to families in need in Kampong Chhnang. Your contributions will help ensure that children receive the proper nutrition they need for healthy growth and development.",
      raised: 300,
      goal: 800,
    },
  ]

  const handleDeleteCampaign = (campaignId: number) => {
    // setCampaigns((prev) => prev.filter((campaign) => campaign.id !== campaignId))
    // Use parameter to satisfy linter until implemented
    console.debug("delete campaign", campaignId)
  }

  const getImagePath = (path: string) => (path?.startsWith("/") ? path : `/${path}`)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs">📊</span>
                </div>
                <span className="font-medium">Dashboard</span>
              </div>
            </div>

            <nav className="space-y-2">
              
              <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                <Link href="/">
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
                <span className="text-xs text-gray-400 ml-auto">&gt;</span>
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Cheetah!</h1>
              <p className="text-gray-600">
                All systems are up and running smoothly. You have{" "}
                <span className="text-purple-600 underline cursor-pointer">3 request approvals</span>.
              </p>
            </div>

            {/* Need of Approval Section */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Need of Approval (3)</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
                  {approvalCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="overflow-hidden flex-shrink-0 w-[800px]">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="relative w-80 h-64">
                            <div className="w-full h-full relative">
                              <Image
                                src={getImagePath(campaign.image || "/placeholder.svg")}
                                alt={campaign.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 320px"
                                className="object-cover"
                                priority={false}
                              />
                            </div>
                            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              {campaign.location}
                            </Badge>
                          </div>

                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <p className="text-sm text-gray-500 mb-1">{campaign.author}</p>
                                <p className="text-xs text-gray-400">{campaign.timeAgo}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <h3 className="font-semibold text-gray-900 mb-3">{campaign.title}</h3>

                            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                              {campaign.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Fund Goal</p>
                                <p className="font-semibold text-lg">${campaign.goal.toLocaleString()}</p>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-gray-600 bg-transparent"
                                  onClick={handleReject}
                                >
                                  Decline
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                  onClick={handleApprove}
                                >
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Active Campaign Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Active Campaign (6)</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
                  {activeCampaigns.map((campaign) => (
                    <Card key={campaign.id} className="overflow-hidden flex-shrink-0 w-[800px]">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div
                            className="relative w-80 h-64 cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => handleViewCampaign(campaign.id)}
                          >
                            <div className="w-full h-full relative">
                              <Image
                                src={getImagePath(campaign.image || "/placeholder.svg")}
                                alt={campaign.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 320px"
                                className="object-cover"
                                priority={false}
                              />
                            </div>
                            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              {campaign.location}
                            </Badge>
                          </div>

                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <p className="text-sm text-gray-500 mb-1">{campaign.author}</p>
                                <p className="text-xs text-gray-400">{campaign.timeAgo}</p>
                              </div>
                              <div className="flex gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleViewCampaign(campaign.id)}>
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteCampaign(campaign.id)}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete Campaign
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>

                            <h3
                              className="font-semibold text-gray-900 mb-3 cursor-pointer hover:text-purple-600 transition-colors"
                              onClick={() => handleViewCampaign(campaign.id)}
                            >
                              {campaign.title}
                            </h3>

                            <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                              {campaign.description}
                            </p>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex gap-4">
                                  <div>
                                    <p className="text-gray-500">Fund Raised</p>
                                    <p className="font-semibold">${campaign.raised.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Fund Goal</p>
                                    <p className="font-semibold">${campaign.goal.toLocaleString()}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-gray-500">Progress</p>
                                  <p className="font-semibold">
                                    {Math.round((campaign.raised / campaign.goal) * 100)}%
                                  </p>
                                </div>
                              </div>
                              <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {(showApprove || showRejected) && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
          {showApprove && <Approve onClose={closeOverlay} />}
          {showRejected && <Rejected onClose={closeOverlay} />}
        </div>
      )}
    </div>
  )
}
