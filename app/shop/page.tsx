import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import { ShopFilters } from "@/components/shop-filters"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Product } from "@/lib/types"

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Elegant Gold Ring",
    description: "18K gold ring with intricate filigree design",
    base_price: 1299,
    category: "rings",
    image_url: "/luxury-gold-ring.jpg",
    stock_quantity: 5,
    is_customizable: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Diamond Pendant Necklace",
    description: "Stunning diamond pendant on 14K gold chain",
    base_price: 2499,
    category: "necklaces",
    image_url: "/elegant-gold-necklace-with-diamond-pendant.jpg",
    stock_quantity: 3,
    is_customizable: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Sapphire Earrings",
    description: "Blue sapphire earrings in white gold setting",
    base_price: 1899,
    category: "earrings",
    image_url: "/sapphire-earrings-in-white-gold.jpg",
    stock_quantity: 8,
    is_customizable: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Gold Filigree Bracelet",
    description: "Delicate gold bracelet with traditional filigree work",
    base_price: 899,
    category: "bracelets",
    image_url: "/gold-filigree-bracelet.jpg",
    stock_quantity: 12,
    is_customizable: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Ruby Statement Ring",
    description: "Bold ruby ring with diamond accents",
    base_price: 3299,
    category: "rings",
    image_url: "/luxury-gold-ring.jpg",
    stock_quantity: 2,
    is_customizable: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Pearl Drop Earrings",
    description: "Classic pearl earrings with gold hooks",
    base_price: 599,
    category: "earrings",
    image_url: "/sapphire-earrings-in-white-gold.jpg",
    stock_quantity: 15,
    is_customizable: false,
    created_at: new Date().toISOString(),
  },
]

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams

  let products: Product[] = []
  let usingMockData = false

  try {
    const supabase = await getSupabaseServerClient()
    let query = supabase.from("products").select("*")

    // Filter by category
    if (params.category) {
      query = query.eq("category", params.category)
    }

    // Sort
    const sortBy = params.sort || "created_at"
    const sortOrder = sortBy === "price_low" ? "asc" : "desc"
    const sortColumn = sortBy.includes("price") ? "base_price" : "created_at"

    query = query.order(sortColumn, { ascending: sortOrder === "asc" })

    const { data, error } = await query

    if (error) throw error
    products = data || []
  } catch (error) {
    usingMockData = true
    products = MOCK_PRODUCTS

    // Apply filters to mock data
    if (params.category) {
      products = products.filter((p) => p.category === params.category)
    }

    // Apply sorting to mock data
    const sortBy = params.sort || "created_at"
    if (sortBy === "price_low") {
      products = [...products].sort((a, b) => a.base_price - b.base_price)
    } else if (sortBy === "price_high") {
      products = [...products].sort((a, b) => b.base_price - a.base_price)
    } else {
      products = [...products].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">Our Collection</h1>
          <p className="text-center text-muted-foreground mt-4 text-lg">
            Discover exquisite pieces crafted with passion and precision
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {usingMockData && (
          <Alert className="mb-6 border-amber-500/50 bg-amber-500/10">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-900 dark:text-amber-100">
              Showing sample products. Connect Supabase in the Vars section to display your actual product catalog.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ShopFilters currentCategory={params.category} currentSort={params.sort} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {products.length} {products.length === 1 ? "product" : "products"}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
