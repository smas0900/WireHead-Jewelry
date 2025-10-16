"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ShoppingCart, Minus, Plus } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/lib/types"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      product,
      quantity,
    })
    alert("Added to cart!")
  }

  return (
    <div className="space-y-6">
      {/* Product Title & Price */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-secondary">${product.base_price.toFixed(2)}</span>
          {product.metal_type && (
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">{product.metal_type}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-sm max-w-none">
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      {/* Customization Notice */}
      {product.is_customizable && (
        <Card className="p-4 bg-secondary/10 border-secondary/20">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">AI Customization Available</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This piece can be customized with AI-generated gemstones. Add unique, personalized gems to make it truly
                yours.
              </p>
              <Button asChild variant="link" className="h-auto p-0 text-secondary">
                <Link href={`/customize?product=${product.id}`}>Customize This Piece →</Link>
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {product.stock_quantity > 0 ? (
          <>
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">
              {product.stock_quantity} {product.stock_quantity === 1 ? "piece" : "pieces"} in stock
            </span>
          </>
        ) : (
          <>
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-sm text-muted-foreground">Out of stock</span>
          </>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
            disabled={quantity >= product.stock_quantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="space-y-3 pt-4">
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90"
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        {product.is_customizable && (
          <Button asChild size="lg" variant="outline" className="w-full border-secondary text-secondary bg-transparent">
            <Link href={`/customize?product=${product.id}`}>
              <Sparkles className="mr-2 h-5 w-5" />
              Customize First
            </Link>
          </Button>
        )}
      </div>

      {/* Product Details */}
      <div className="border-t border-border pt-6 space-y-4">
        <h3 className="font-semibold">Product Details</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Category</dt>
            <dd className="font-medium capitalize">{product.category}</dd>
          </div>
          {product.metal_type && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Metal</dt>
              <dd className="font-medium">{product.metal_type}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted-foreground">SKU</dt>
            <dd className="font-medium font-mono text-xs">{product.id.slice(0, 8).toUpperCase()}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
