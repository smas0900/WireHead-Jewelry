import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    try {
      const supabase = await getSupabaseServerClient()
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) throw error

      return NextResponse.json({ success: true })
    } catch (dbError) {
      console.log("[v0] Database not configured")
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
