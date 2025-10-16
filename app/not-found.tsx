import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-3xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The product you're looking for doesn't exist or has been removed from our collection.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/shop">
            <Home className="mr-2 h-5 w-5" />
            Back to Shop
          </Link>
        </Button>
      </div>
    </div>
  )
}
