"use client"

import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, Sparkles } from "lucide-react"
import type { CartItem } from "@/lib/types"

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart()

  const itemPrice = item.product.base_price
  const customizationPrice = item.customization?.gems
    ? item.customization.gems.reduce((sum, gem) => sum + gem.gem_price, 0)
    : 0
  const totalItemPrice = (itemPrice + customizationPrice) * item.quantity

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
            <Image
              src={item.product.image_url || "/placeholder.svg"}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-primary">{item.product.name}</h3>
                {item.customization?.gems && item.customization.gems.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-secondary mt-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Customized with {item.customization.gems[0].gem_name}</span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.product.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <div>Base Price: ${itemPrice.toFixed(2)}</div>
              {customizationPrice > 0 && <div>Customization: +${customizationPrice.toFixed(2)}</div>}
            </div>

            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock_quantity}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              {/* Total Price */}
              <div className="text-lg font-semibold text-secondary">${totalItemPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
