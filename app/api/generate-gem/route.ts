import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Check if Fal is configured
    const falKey = process.env.FAL_KEY

    if (!falKey) {
      // Return a placeholder response if Fal is not configured
      return NextResponse.json({
        message: "Fal AI not configured. Please add FAL_KEY to your environment variables.",
        gem: {
          name: "Custom Gem",
          description: prompt,
          image_url: "/gemstone.jpg",
          prompt,
        },
      })
    }

    // TODO: Implement Fal AI gem generation
    // For now, return a placeholder
    const gemData = {
      name: prompt.split(" ").slice(0, 3).join(" "),
      description: prompt,
      image_url: "/gemstone.jpg",
      prompt,
    }

    // Try to save to database
    try {
      const supabase = await getSupabaseServerClient()
      const { data, error } = await supabase.from("gems").insert([gemData]).select().single()

      if (error) throw error

      return NextResponse.json({ gem: data })
    } catch (dbError) {
      // If database save fails, still return the gem data
      console.log("[v0] Database not configured, returning gem without saving")
      return NextResponse.json({ gem: gemData })
    }
  } catch (error) {
    console.error("[v0] Error generating gem:", error)
    return NextResponse.json({ error: "Failed to generate gem" }, { status: 500 })
  }
}
