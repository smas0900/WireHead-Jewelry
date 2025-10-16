import { notFound } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { RelatedProducts } from "@/components/related-products"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()

  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error || !product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Product Details */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <ProductGallery product={product} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <RelatedProducts currentProductId={id} category={product.category} />
        </div>
      </div>
    </div>
  )
}
