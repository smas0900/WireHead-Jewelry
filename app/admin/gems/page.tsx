import { getSupabaseServerClient } from "@/lib/supabase/server"
import { GemsTable } from "@/components/gems-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { Gem } from "@/lib/types"

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
]

export default async function AdminGemsPage() {
  let gems: Gem[] = MOCK_GEMS

  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from("gems").select("*").order("created_at", { ascending: false })

    if (!error && data && data.length > 0) {
      gems = data
    }
  } catch (error) {
    console.log("[v0] Using mock gem data")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-primary">Gem Library</h1>
          <p className="text-muted-foreground">Manage AI-generated gemstones</p>
        </div>
        <Button asChild>
          <Link href="/customize">
            <Plus className="w-4 h-4 mr-2" />
            Generate New Gem
          </Link>
        </Button>
      </div>

      <GemsTable gems={gems} />
    </div>
  )
}
