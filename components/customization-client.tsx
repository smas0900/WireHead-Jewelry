"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { GemCard } from "@/components/gem-card"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Product, Gem } from "@/lib/types"

interface CustomizationClientProps {
  product: Product
  gems: Gem[]
}

export function CustomizationClient({ product, gems }: CustomizationClientProps) {
  const [selectedGem, setSelectedGem] = useState<Gem | null>(null)
  const { addItem } = useCart()
  const router = useRouter()

  const totalPrice = selectedGem ? product.base_price + selectedGem.price : product.base_price

  const handleAddToCart = () => {
    if (!selectedGem) return

    addItem({
      product,
      quantity: 1,
      customization: {
        gems: [
          {
            gem_id: selectedGem.id,
            gem_name: selectedGem.name,
            gem_price: selectedGem.price,
          },
        ],
      },
    })

    router.push("/cart")
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Preview Section */}
      <div className="space-y-6">
        <Link
          href="/customize"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gem Library
        </Link>

        <div className="bg-card border rounded-lg p-8">
          <h2 className="text-xl font-serif text-primary mb-4">Preview</h2>
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
            <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {selectedGem && (
              <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <Image
                  src={selectedGem.image_url || "/placeholder.svg"}
                  alt={selectedGem.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            {selectedGem && (
              <p className="text-sm text-muted-foreground">
                with <span className="text-secondary font-medium">{selectedGem.name}</span>
              </p>
            )}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base Price:</span>
                <span>${product.base_price.toFixed(2)}</span>
              </div>
              {selectedGem && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gem:</span>
                  <span>+${selectedGem.price.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-serif text-primary pt-2 border-t">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleAddToCart} disabled={!selectedGem} className="w-full" size="lg">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add Customized Piece to Cart
        </Button>
      </div>

      {/* Gem Selection */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif text-primary mb-2">Select Your Gem</h2>
          <p className="text-muted-foreground">
            Choose from our AI-generated gemstones to customize your jewelry piece.
          </p>
        </div>

        {selectedGem && (
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            <p className="text-sm font-medium text-secondary mb-1">Selected Gem</p>
            <p className="text-lg font-semibold">{selectedGem.name}</p>
            <p className="text-sm text-muted-foreground">{selectedGem.ai_prompt}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
          {gems.map((gem) => (
            <GemCard key={gem.id} gem={gem} onSelect={setSelectedGem} />
          ))}
        </div>
      </div>
    </div>
  )
}
