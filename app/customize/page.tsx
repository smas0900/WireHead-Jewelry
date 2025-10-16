import { Suspense } from "react"
import { GemLibrary } from "@/components/gem-library"
import { CustomizationInterface } from "@/components/customization-interface"
import { Sparkles } from "lucide-react"

export default function CustomizePage({
  searchParams,
}: {
  searchParams: { product?: string }
}) {
  const productId = searchParams.product

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Customization
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-primary">Create Your Perfect Piece</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Browse our library of AI-generated gemstones or create your own. Add unique gems to any customizable
              jewelry piece to make it truly one-of-a-kind.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {productId ? (
          <Suspense fallback={<div className="text-center py-12">Loading customization...</div>}>
            <CustomizationInterface productId={productId} />
          </Suspense>
        ) : (
          <Suspense fallback={<div className="text-center py-12">Loading gem library...</div>}>
            <GemLibrary />
          </Suspense>
        )}
      </div>
    </div>
  )
}
