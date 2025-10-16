import { getSupabaseServerClient } from "@/lib/supabase/server"
import { GemCard } from "@/components/gem-card"
import { GemGenerator } from "@/components/gem-generator"
import type { Gem } from "@/lib/types"

const MOCK_GEMS: Gem[] = [
  {
    id: "1",
    name: "Celestial Sapphire",
    image_url: "/generated/blue-sapphire-gemstone.png",
    color: "Blue",
    style: "Classic",
    price: 299.99,
    ai_prompt: "deep blue sapphire with starlight inclusions, luxury jewelry photography",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Sunset Ruby",
    image_url: "/generated/red-ruby-gemstone.jpg",
    color: "Red",
    style: "Vibrant",
    price: 349.99,
    ai_prompt: "red ruby with golden highlights, luxury jewelry photography",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Forest Emerald",
    image_url: "/generated/green-emerald-gemstone.jpg",
    color: "Green",
    style: "Natural",
    price: 329.99,
    ai_prompt: "rich green emerald with natural depth, luxury jewelry photography",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Moonstone Dream",
    image_url: "/generated/white-moonstone-gemstone.jpg",
    color: "White",
    style: "Ethereal",
    price: 249.99,
    ai_prompt: "white moonstone with blue shimmer, luxury jewelry photography",
    created_at: new Date().toISOString(),
  },
]

export async function GemLibrary() {
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
    <div className="space-y-12">
      {/* Gem Generator */}
      <section className="bg-card border rounded-lg p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif text-primary mb-2">Generate Your Own Gem</h2>
          <p className="text-muted-foreground mb-6">Describe your dream gemstone and our AI will create it for you.</p>
          <GemGenerator />
        </div>
      </section>

      {/* Gem Library */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-primary mb-2">Gem Library</h2>
          <p className="text-muted-foreground">
            Browse our collection of AI-generated gemstones. Click any gem to use it in your jewelry.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gems.map((gem) => (
            <GemCard key={gem.id} gem={gem} />
          ))}
        </div>
      </section>
    </div>
  )
}
