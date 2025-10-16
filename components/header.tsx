"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ease-in-out group ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/30 border-border text-foreground"
          : "bg-transparent border-white/20 text-white hover:bg-white/30 hover:backdrop-blur-md hover:supports-[backdrop-filter]:bg-white/30 hover:border-border hover:text-foreground"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center py-4">
          {/* Top Row: Logo */}
          <div className="grid grid-cols-3 items-center w-full mb-4 md:flex md:justify-center">
            {/* Mobile Menu Button - Left */}
            <div className="flex justify-start md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`transition-colors duration-500 ${isScrolled ? "" : "text-white hover:text-foreground group-hover:text-foreground"}`}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Logo - Center */}
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/wirehead-logo.png"
                alt="Wirehead"
                width={120}
                height={120}
                className="h-24 w-auto md:h-28 transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Cart - Right */}
            <div className="flex justify-end md:absolute md:right-4 lg:right-8">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative transition-colors duration-500 ${isScrolled ? "" : "text-white hover:text-foreground group-hover:text-foreground"}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Row: Desktop Navigation */}
          <nav
            className={`hidden md:flex items-center gap-8 border-t pt-4 w-full justify-center transition-colors duration-500 ${
              isScrolled ? "border-border/50" : "border-white/20 group-hover:border-border/50"
            }`}
          >
            <Link
              href="/shop"
              className={`text-sm font-medium transition-all duration-500 ${
                isScrolled ? "hover:text-secondary" : "group-hover:text-foreground hover:text-foreground"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className={`text-sm font-medium transition-all duration-500 ${
                isScrolled ? "hover:text-secondary" : "group-hover:text-foreground hover:text-foreground"
              }`}
            >
              Collections
            </Link>
            <Link
              href="/track-order"
              className={`text-sm font-medium transition-all duration-500 ${
                isScrolled ? "hover:text-secondary" : "group-hover:text-foreground hover:text-foreground"
              }`}
            >
              Track Order
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-all duration-500 ${
                isScrolled ? "hover:text-secondary" : "group-hover:text-foreground hover:text-foreground"
              }`}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            className={`md:hidden py-4 border-t transition-colors duration-500 ${isScrolled ? "border-border" : "border-white/20 group-hover:border-border"}`}
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                className={`text-sm font-medium transition-all duration-500 ${
                  isScrolled ? "hover:text-secondary" : "group-hover:text-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className={`text-sm font-medium transition-all duration-500 ${
                  isScrolled ? "hover:text-secondary" : "group-hover:text-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/track-order"
                className={`text-sm font-medium transition-all duration-500 ${
                  isScrolled ? "hover:text-secondary" : "group-hover:text-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-all duration-500 ${
                  isScrolled ? "hover:text-secondary" : "group-hover:text-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
