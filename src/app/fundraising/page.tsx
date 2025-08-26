"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Approve } from "@/components/ui/created"
import { ImageUpload } from "@/components/ui/image_upload"

export default function FundraisingPage() {
  const [showApproval, setShowApproval] = useState(false)
  const [campaignImage, setCampaignImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    organizationName: "",
    campaignDescription: "",
    amountRaising: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreate = () => {
    setShowApproval(true)
  }

  const closeApproval = () => {
    setShowApproval(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-4xl mx-auto py-8 px-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Illustration */}
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 relative overflow-hidden">
            </div>

            


          <div className="p-8">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Fundraising your own campaign</h1>
                <p className="text-lg text-gray-600">Help others by donating to these campaigns</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Name of organization</label>
                  <Input
                    placeholder="Enter here"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange("organizationName", e.target.value)}
                    className="w-full h-12 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Description of the campaign</label>
                  <Textarea
                    placeholder="Enter here"
                    value={formData.campaignDescription}
                    onChange={(e) => handleInputChange("campaignDescription", e.target.value)}
                    className="w-full min-h-[120px] resize-none text-lg"
                  />
                </div>

                <div className="relative">
                  <label className="block text-lg font-medium text-gray-900 mb-3">Image of the campaign</label>
                  <ImageUpload onImageUpload={setCampaignImage} currentImage={campaignImage} />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-3">Amount raising</label>
                  <Input
                    placeholder="Enter here"
                    value={formData.amountRaising}
                    onChange={(e) => handleInputChange("amountRaising", e.target.value)}
                    className="w-full h-12 text-lg"
                  />
                </div>
              </div>

              {/* Create Button */}
              <div className="pt-4">
                <Button
                  onClick={handleCreate}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full font-medium text-lg"
                >
                  Create
                </Button>
              </div>
            </div>
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
