import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export async function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const supabase = await getSupabaseServerClient()

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", currentProductId)
    .limit(4)

  if (error || !products || products.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">You May Also Like</h2>
        <p className="text-muted-foreground">Similar pieces from our collection</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
