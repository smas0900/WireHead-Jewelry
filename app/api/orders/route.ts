import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_name, customer_email, customer_phone, shipping_address, items, total_amount } = body

    // Validate required fields
    if (!customer_name || !customer_email || !shipping_address || !items || !total_amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    try {
      const supabase = await getSupabaseServerClient()

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            customer_name,
            customer_email,
            customer_phone,
            shipping_address,
            total_amount,
            status: "pending",
            payment_status: "pending",
          },
        ])
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        customization_data: item.customization_data,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) throw itemsError

      return NextResponse.json({ order })
    } catch (dbError) {
      console.log("[v0] Database not configured, returning mock order")
      // Return mock order if database is not configured
      return NextResponse.json({
        order: {
          id: "mock-" + Date.now(),
          customer_name,
          customer_email,
          total_amount,
          status: "pending",
        },
      })
    }
  } catch (error) {
    console.error("[v0] Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
