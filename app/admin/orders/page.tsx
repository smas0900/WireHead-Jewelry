import { getSupabaseServerClient } from "@/lib/supabase/server"
import { OrdersTable } from "@/components/orders-table"
import type { Order } from "@/lib/types"

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    customer_name: "Jane Smith",
    customer_email: "jane@example.com",
    customer_phone: "+1 234 567 8900",
    shipping_address: "123 Main St, New York, NY 10001",
    total_amount: 2799.98,
    status: "pending",
    payment_status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default async function AdminOrdersPage() {
  let orders: Order[] = MOCK_ORDERS

  try {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

    if (!error && data && data.length > 0) {
      orders = data
    }
  } catch (error) {
    console.log("[v0] Using mock order data")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-primary">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}
