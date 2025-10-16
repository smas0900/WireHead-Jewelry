"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"

export function NoticeBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has closed the notice bar before
    const isClosed = localStorage.getItem("noticeBarClosed")
    if (!isClosed) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("noticeBarClosed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="bg-sage-50 border-b border-sage-200 py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center">
        <p className="text-sm text-sage-800 text-center font-sans">
          Free shipping on orders over $100 | Handcrafted with love and nature's finest materials
        </p>
        <button
          onClick={handleClose}
          className="absolute right-4 p-1 hover:bg-sage-200 rounded-full transition-colors"
          aria-label="Close notice"
        >
          <X className="h-4 w-4 text-sage-700" />
        </button>
      </div>
    </div>
  )
}
