import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Eternal Elegance Ring",
    description: "A timeless 18k gold ring featuring a brilliant cut diamond",
    base_price: 2499.99,
    category: "rings",
    metal_type: "18k Gold",
    stock_quantity: 5,
    image_url: "/generated/luxury-gold-ring.jpg",
    additional_images: null,
    is_customizable: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Celestial Necklace",
    description: "Delicate gold chain with star-shaped diamond pendant",
    base_price: 1899.99,
    category: "necklaces",
    metal_type: "14k Gold",
    stock_quantity: 8,
    image_url: "/generated/elegant-gold-necklace-with-diamond-pendant.jpg",
    additional_images: null,
    is_customizable: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Royal Sapphire Earrings",
    description: "Stunning sapphire studs set in white gold",
    base_price: 3299.99,
    category: "earrings",
    metal_type: "White Gold",
    stock_quantity: 3,
    image_url: "/generated/sapphire-earrings-in-white-gold.jpg",
    additional_images: null,
    is_customizable: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Heritage Bracelet",
    description: "Classic gold bracelet with intricate filigree work",
    base_price: 1599.99,
    category: "bracelets",
    metal_type: "18k Gold",
    stock_quantity: 6,
    image_url: "/generated/gold-filigree-bracelet.jpg",
    additional_images: null,
    is_customizable: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function FeaturedProducts() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .limit(4)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching products:", error)
      throw error
    }

    if (!products || products.length === 0) {
      // Use mock data if no products in database
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  } catch (error) {
    if (error instanceof Error && error.message.includes("SUPABASE_NOT_CONFIGURED")) {
      console.log("[v0] Supabase not configured, using mock data")
      return (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
            <p className="font-medium">Demo Mode</p>
            <p className="text-amber-700">Connect Supabase to see real products. Using sample data for now.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )
    }

    // For other errors, show error message
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Unable to load products. Please try again later.</p>
      </div>
    )
  }
}
