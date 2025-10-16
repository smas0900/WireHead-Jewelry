"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = [product.image_url, ...(product.additional_images || [])].filter(Boolean)
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={images[selectedImage] || "/placeholder.svg?height=600&width=600"}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden rounded-lg bg-muted border-2 transition-all ${
                selectedImage === index ? "border-secondary" : "border-transparent hover:border-border"
              }`}
            >
              <img
                src={image || "/placeholder.svg?height=150&width=150"}
                alt={`${product.name} view ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
