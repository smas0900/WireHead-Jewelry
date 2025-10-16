import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, User, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"
import type { Order, OrderItem } from "@/lib/types"

const MOCK_ORDER: Order = {
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
}

const MOCK_ORDER_ITEMS: OrderItem[] = [
  {
    id: "1",
    order_id: "1",
    product_id: "1",
    product_name: "Eternal Elegance Ring",
    quantity: 1,
    unit_price: 2499.99,
    customization_data: {
      gems: [
        {
          gem_id: "1",
          gem_name: "Celestial Sapphire",
          gem_price: 299.99,
        },
      ],
    },
    created_at: new Date().toISOString(),
  },
]

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  let order: Order | null = MOCK_ORDER
  let orderItems: OrderItem[] = MOCK_ORDER_ITEMS

  try {
    const supabase = await getSupabaseServerClient()

    const { data: orderData } = await supabase.from("orders").select("*").eq("id", params.id).single()

    if (orderData) {
      order = orderData
    }

    const { data: itemsData } = await supabase.from("order_items").select("*").eq("order_id", params.id)

    if (itemsData && itemsData.length > 0) {
      orderItems = itemsData
    }
  } catch (error) {
    console.log("[v0] Using mock order data")
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/orders">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif text-primary">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
          <p className="text-muted-foreground">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start pb-4 border-b last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    {item.customization_data?.gems && item.customization_data.gems.length > 0 && (
                      <p className="text-sm text-secondary">
                        Customized with {item.customization_data.gems[0].gem_name}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.unit_price * item.quantity).toFixed(2)}</p>
                    {item.customization_data?.gems && (
                      <p className="text-sm text-muted-foreground">
                        +${item.customization_data.gems.reduce((sum, gem) => sum + gem.gem_price, 0).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 border-t font-semibold text-lg">
                <span>Total</span>
                <span className="text-secondary">${order.total_amount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <p className="font-medium">{order.customer_name}</p>
                <p className="text-muted-foreground">{order.customer_email}</p>
                {order.customer_phone && <p className="text-muted-foreground">{order.customer_phone}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{order.shipping_address}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Order Status</span>
                <Badge className="capitalize">{order.status}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Payment Status</span>
                <Badge variant="secondary" className="capitalize">
                  {order.payment_status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
