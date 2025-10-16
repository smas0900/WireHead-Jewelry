import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ProductsTable } from "@/components/products-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
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
]

export default async function AdminProductsPage() {
  let products: Product[] = MOCK_PRODUCTS

  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (!error && data && data.length > 0) {
      products = data
    }
  } catch (error) {
    console.log("[v0] Using mock product data")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-primary">Products</h1>
          <p className="text-muted-foreground">Manage your jewelry collection</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <ProductsTable products={products} />
    </div>
  )
}
