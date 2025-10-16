import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const trackingNumber = searchParams.get("tracking")

    if (!trackingNumber) {
      return NextResponse.json({ error: "Tracking number is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Fetch order by tracking number
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("tracking_number", trackingNumber)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found with this tracking number" }, { status: 404 })
    }

    // Fetch order items
    const { data: items, error: itemsError } = await supabase.from("order_items").select("*").eq("order_id", order.id)

    if (itemsError) {
      console.error("Error fetching order items:", itemsError)
    }

    return NextResponse.json({
      order,
      items: items || [],
    })
  } catch (error) {
    console.error("Error tracking order:", error)
    return NextResponse.json({ error: "Failed to track order" }, { status: 500 })
  }
}
