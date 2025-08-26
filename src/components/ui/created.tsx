"use client"

import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApproveProps {
  onClose?: () => void
  className?: string
}

export function Approve({ onClose, className }: ApproveProps) {
  return (
    <div className={cn("relative w-80 p-6 rounded-2xl bg-purple-200 text-center", className)}>
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-purple-300 rounded-full transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-purple-800" />
        </button>
      )}

      {/* Success Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full border-2 border-purple-800 flex items-center justify-center">
          <Check className="w-8 h-8 text-purple-800" />
        </div>
      </div>

      {/* Message */}
      <p className="text-purple-900 font-medium text-sm leading-relaxed">Wait for Approval!</p>
    </div>
  )
}
