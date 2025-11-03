// import Link from "next/link"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Sparkles } from "lucide-react"
// import type { Product } from "@/lib/types"

// interface ProductCardProps {
//   product: Product
// }

// export function ProductCard({ product }: ProductCardProps) {
//   return (
//     <Card className="group overflow-hidden border-border hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 ease-out">
//       <Link href={`/product/${product.id}`}>
//         <div className="relative aspect-square overflow-hidden bg-muted">
//           <img
//             src={product.image_url || "/placeholder.jpg?height=400&width=400"}
//             alt={product.name}
//             className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
//           />
//           {product.is_customizable && (
//             <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-transform duration-300 group-hover:scale-110">
//               <Sparkles className="h-3 w-3" />
//               Customizable
//             </div>
//           )}
//         </div>
//       </Link>
//       <CardContent className="p-4 space-y-2">
//         <Link href={`/product/${product.id}`}>
//           <h3 className="font-semibold text-lg hover:text-secondary transition-colors line-clamp-1">{product.name}</h3>
//         </Link>
//         <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
//         <div className="flex items-baseline gap-2">
//           <span className="text-2xl font-bold text-secondary">${product.base_price.toFixed(2)}</span>
//           {product.metal_type && <span className="text-xs text-muted-foreground">{product.metal_type}</span>}
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0">
//         <Button
//           asChild
//           className="w-full bg-transparent transition-all duration-300 group-hover:bg-primary group-hover:text-background"
//           variant="outline"
//         >
//           <Link href={`/product/${product.id}`}>View Details</Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-150 overflow-hidden bg-muted rounded-lg mb-4">
          <img
            src={"/placeholder.jpg?height=400&width=400"}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          />
          {product.is_customizable && (
            <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-transform duration-300 group-hover:scale-110">
              <Sparkles className="h-3 w-3" />
              Customizable
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg hover:text-secondary transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-secondary">${product.base_price.toFixed(2)}</span>
          {product.metal_type && <span className="text-xs text-muted-foreground">{product.metal_type}</span>}
        </div>
        <Button
          asChild
          className="w-full bg-transparent transition-all duration-300 group-hover:bg-primary group-hover:text-background mt-3"
          variant="outline"
        >
          <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  )
}