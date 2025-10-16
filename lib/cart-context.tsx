"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem } from "@/lib/types"

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, customizationId?: string) => void
  updateQuantity: (productId: string, quantity: number, customizationId?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("[v0] Error loading cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      // Check if item already exists (same product and customization)
      const existingIndex = currentItems.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          JSON.stringify(item.customization) === JSON.stringify(newItem.customization),
      )

      if (existingIndex > -1) {
        // Update quantity if item exists
        const updated = [...currentItems]
        updated[existingIndex].quantity += newItem.quantity
        return updated
      }

      // Add new item
      return [...currentItems, newItem]
    })
  }

  const removeItem = (productId: string, customizationId?: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => {
        if (customizationId) {
          return !(
            item.product.id === productId && JSON.stringify(item.customization) === JSON.stringify(customizationId)
          )
        }
        return item.product.id !== productId
      }),
    )
  }

  const updateQuantity = (productId: string, quantity: number, customizationId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, customizationId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (customizationId) {
          if (item.product.id === productId && JSON.stringify(item.customization) === JSON.stringify(customizationId)) {
            return { ...item, quantity }
          }
        } else if (item.product.id === productId) {
          return { ...item, quantity }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = items.reduce((sum, item) => {
    let itemPrice = item.product.base_price
    if (item.customization?.gems) {
      itemPrice += item.customization.gems.reduce((gemSum, gem) => gemSum + gem.gem_price, 0)
    }
    return sum + itemPrice * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
