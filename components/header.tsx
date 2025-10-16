"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      //   className={`sticky top-0 z-50 border-b border-border transition-all duration-300  ${
      //     isScrolled ? "bg-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/10" : "bg-transparent"
      //   }`}
      // >

      //   className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${
      //     isScrolled
      //       ? "bg-transparent backdrop-blur-0"
      //       : "bg-transparent backdrop-blur-0"
      //   }`}
      // >

      //greyed out version
      //   className={`sticky top-0 z-50 border-b border-border transition-all duration-300  ${
      //     isScrolled ? "bg-transparent" : "bg-gray-300"
      //   }`}
      // >

      //   className={`sticky top-0 z-50 border-b border-border transition-colors duration-500 ease-in-out ${
      //     isScrolled
      //       ? "bg-transparent hover:bg-red/90"
      //       : "bg-gray-600 hover:bg-red/90"
      //   }`}
      // >

      //   className={`sticky top-0 z-50 border-b border-border pointer-events-auto transition-colors duration-500 ease-in-out ${
      //     isScrolled
      //       ? "bg-transparent hover:bg-gray-200"
      //       : "bg-transparent hover:bg-white"
      //   }`}
      // >
      className={`sticky top-0 z-50 border-b border-border pointer-events-auto transition-colors duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/10 hover:bg-gray-200"
          : "bg-white/30 backdrop-blur-md supports-[backdrop-filter]:bg-white/10 hover:bg-gray-200"
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
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Logo - Center */}
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Wirehead"
                width={120}
                height={120}
                className="h-24 w-auto md:h-28"
                priority
              />
            </Link>

            {/* Cart - Right */}
            <div className="flex justify-end md:absolute md:right-4 lg:right-8">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
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
          <nav className="hidden md:flex items-center gap-8 border-t border-border/50 pt-4 w-full justify-center">
            <Link
              href="/shop"
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/track-order"
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/shop"
                className="text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/collections"
                className="text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/track-order"
                className="text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
