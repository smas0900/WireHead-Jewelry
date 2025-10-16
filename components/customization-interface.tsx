import { getSupabaseServerClient } from "@/lib/supabase/server"
import { CustomizationClient } from "@/components/customization-client"
import type { Product, Gem } from "@/lib/types"

const MOCK_PRODUCT: Product = {
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
}

const MOCK_GEMS: Gem[] = [
  {
    id: "1",
    name: "Celestial Sapphire",
    image_url: "/generated/blue-sapphire-gemstone.png",
    color: "Blue",
    style: "Classic",
    price: 299.99,
    ai_prompt: "deep blue sapphire with starlight inclusions",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sunset Ruby",
    image_url: "/generated/red-ruby-gemstone.jpg",
    color: "Red",
    style: "Vibrant",
    price: 349.99,
    ai_prompt: "red ruby with golden highlights",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Forest Emerald",
    image_url: "/generated/green-emerald-gemstone.jpg",
    color: "Green",
    style: "Natural",
    price: 329.99,
    ai_prompt: "rich green emerald with natural depth",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Moonstone Dream",
    image_url: "/generated/white-moonstone-gemstone.jpg",
    color: "White",
    style: "Ethereal",
    price: 249.99,
    ai_prompt: "white moonstone with blue shimmer",
    created_at: new Date().toISOString(),
  },
]

interface CustomizationInterfaceProps {
  productId: string
}

export async function CustomizationInterface({ productId }: CustomizationInterfaceProps) {
  let product: Product | null = MOCK_PRODUCT
  let gems: Gem[] = MOCK_GEMS

  try {
    const supabase = await getSupabaseServerClient()

    // Fetch product
    const { data: productData } = await supabase.from("products").select("*").eq("id", productId).single()

    if (productData) {
      product = productData
    }

    // Fetch gems
    const { data: gemsData } = await supabase.from("gems").select("*").order("created_at", { ascending: false })

    if (gemsData && gemsData.length > 0) {
      gems = gemsData
    }
  } catch (error) {
    console.log("[v0] Using mock data for customization")
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    )
  }

  if (!product.is_customizable) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">This product is not customizable</p>
      </div>
    )
  }

  return <CustomizationClient product={product} gems={gems} />
}
