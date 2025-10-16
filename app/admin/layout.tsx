"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false)
      return
    }

    // Verify admin authentication
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/admin/verify")
        const data = await response.json()

        if (data.authenticated) {
          setIsAuthenticated(true)
        } else {
          router.push("/admin/login")
        }
      } catch (error) {
        console.error("[v0] Auth verification error:", error)
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [pathname, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-copper-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Show login page content directly
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Show admin panel if authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30">
        <AdminNav />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    )
  }

  // Fallback (shouldn't reach here due to redirects)
  return null
}
