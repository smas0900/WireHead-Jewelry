"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ShopFiltersProps {
  currentCategory?: string
  currentSort?: string
}

export function ShopFilters({ currentCategory, currentSort }: ShopFiltersProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    return params.toString()
  }

  const categories = [
    { label: "All Products", value: "" },
    { label: "Rings", value: "rings" },
    { label: "Necklaces", value: "necklaces" },
    { label: "Earrings", value: "earrings" },
    { label: "Bracelets", value: "bracelets" },
  ]

  const sortOptions = [
    { label: "Newest First", value: "created_at" },
    { label: "Price: Low to High", value: "price_low" },
    { label: "Price: High to Low", value: "price_high" },
  ]

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentCategory || ""}>
            {categories.map((category) => (
              <Link
                key={category.value}
                href={pathname + "?" + createQueryString("category", category.value)}
                className="flex items-center space-x-2 py-2 hover:text-secondary transition-colors"
              >
                <RadioGroupItem value={category.value} id={`category-${category.value}`} />
                <Label htmlFor={`category-${category.value}`} className="cursor-pointer flex-1">
                  {category.label}
                </Label>
              </Link>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Sort Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentSort || "created_at"}>
            {sortOptions.map((option) => (
              <Link
                key={option.value}
                href={pathname + "?" + createQueryString("sort", option.value)}
                className="flex items-center space-x-2 py-2 hover:text-secondary transition-colors"
              >
                <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                <Label htmlFor={`sort-${option.value}`} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </Link>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
