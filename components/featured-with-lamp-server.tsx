import { FeaturedProducts } from "@/components/featured-products"
import { FeaturedWithLampClient } from "./featured-with-lamp-client"

export default async function FeaturedWithLampServer() {
  // Here we just render both together:
  // The FeaturedProducts (Server) will fetch from Supabase
  // The Lamp background (Client) wraps around it
  return (
    <FeaturedWithLampClient>
      <FeaturedProducts />
    </FeaturedWithLampClient>
  )
}
