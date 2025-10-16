"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Package, Sparkles, ShoppingBag, LayoutDashboard, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/gems", label: "Gems", icon: Sparkles },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  ]

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      localStorage.removeItem("admin_session")
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <nav className="bg-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-secondary" />
            <span className="font-semibold text-lg">Admin Dashboard</span>
          </div>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Store
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
