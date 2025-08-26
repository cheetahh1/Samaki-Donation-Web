"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Upload, CreditCard, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Approve } from "@/components/ui/successful"
import Link from "next/link"

export default function DonationPage() {
  const [donationAmount, setDonationAmount] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [hideNameFromPublic, setHideNameFromPublic] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("google-pay")
  const [showSuccess, setShowSuccess] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 relative">
      <div className={`max-w-4xl mx-auto transition-all duration-300 ${showSuccess ? "blur-sm" : ""}`}>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex">
            {/* Main Form */}
            <div className="flex-1 p-8">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Link href="/donation_cat">
                  <ArrowLeft className="w-5 h-5" />
                  </Link>
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">Make a Donation</h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Donation Amount */}
                <div>
                  <h2 className="text-lg font-medium text-purple-600 mb-4">Enter Your Donation</h2>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-medium text-gray-700">
                      $
                    </span>
                    <input
                      type="text"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder=".00"
                      className="w-full pl-12 pr-4 py-4 text-2xl font-medium bg-purple-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Donation Details */}
                <div>
                  <h2 className="text-lg font-medium text-purple-600 mb-4">Donation Details</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your First Name</label>
                      <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter First Name"
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Last Name</label>
                      <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter Last Name"
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="hide-name"
                      checked={hideNameFromPublic}
                      onCheckedChange={(checked) => setHideNameFromPublic(checked as boolean)}
                    />
                    <label htmlFor="hide-name" className="text-sm text-gray-600">
                      Hide name from everyone but the organizer
                    </label>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email"
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>

                  {/* Profile Image Upload and FAQ */}
                  <div className="flex gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Add Profile Image</label>
                      <p className="text-xs text-gray-500 mb-3">This would show alongside your donation</p>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          id="profile-upload"
                        />
                        <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center hover:border-purple-400 cursor-pointer overflow-hidden">
                          {profileImage ? (
                            <img
                              src={profileImage || "/placeholder.svg"}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Upload className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        {profileImage && (
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <label htmlFor="profile-upload" className="text-xs text-purple-600 mt-2 cursor-pointer block">
                        {profileImage ? "Change photo" : "Upload photo"}
                      </label>
                    </div>

                    <div className="flex-1 bg-purple-50 border border-purple-100 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-purple-600 mb-4">Donation FAQ</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            When will the campaign get my payment?
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Your payment is sent directly to them so it is immediately helps their campaign.
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">How secure is the payment?</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            The payment is highly secure because we use cutting-edge technology like Mongoose and
                            more.js).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          value="google-pay"
                          checked={paymentMethod === "google-pay"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 ${paymentMethod === "google-pay" ? "border-purple-600 bg-purple-600" : "border-gray-300"}`}
                        >
                          {paymentMethod === "google-pay" && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                          )}
                        </div>
                        <img
                          src="/google-pay.png"
                          alt="Google Pay"
                          className="h-6 mr-2 bg-transparent mix-blend-multiply"
                          style={{ backgroundColor: "transparent" }}
                        />
                        <span className="text-sm font-medium">Google Pay</span>
                      </label>

                      <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="payment"
                          value="credit-debit"
                          checked={paymentMethod === "credit-debit"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 ${paymentMethod === "credit-debit" ? "border-purple-600 bg-purple-600" : "border-gray-300"}`}
                        >
                          {paymentMethod === "credit-debit" && (
                            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                          )}
                        </div>
                        <CreditCard className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Credit or Debit</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-xl text-lg"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <img
                        src="/google-pay.png"
                        alt="Google Pay"
                        className="h-7 bg-transparent mix-blend-multiply"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <span className="text-white">|</span>
                      <img
                        src="/visa-logo.png"
                        alt="VISA"
                        className="h-10 bg-transparent mix-blend-multiply"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <span className="text-white">....5 701</span>
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <Approve onClose={handleCloseSuccess} />
        </div>
      )}
    </div>
  )
}
