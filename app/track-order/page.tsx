"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Search, CheckCircle2, Truck, Clock, XCircle } from "lucide-react"
import type { Order, OrderItem } from "@/lib/types"

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setLoading(true)
    setError("")
    setOrder(null)
    setOrderItems([])

    try {
      const response = await fetch(`/api/track-order?tracking=${encodeURIComponent(trackingNumber)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch order")
      }

      setOrder(data.order)
      setOrderItems(data.items || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order not found. Please check your tracking number.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="h-6 w-6 text-green-600" />
      case "shipped":
        return <Truck className="h-6 w-6 text-blue-600" />
      case "processing":
        return <Clock className="h-6 w-6 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-6 w-6 text-red-600" />
      default:
        return <Package className="h-6 w-6 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "shipped":
        return "text-blue-600 bg-blue-50"
      case "processing":
        return "text-yellow-600 bg-yellow-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage/10 to-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Package className="h-16 w-16 mx-auto mb-4 text-copper" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Track Your Order</h1>
          <p className="text-lg text-muted-foreground">Enter your tracking number to see the status of your order</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Tracking Number</CardTitle>
            <CardDescription>You can find your tracking number in the order confirmation email</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrack} className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="bg-copper hover:bg-copper/90">
                {loading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Track Order
                  </>
                )}
              </Button>
            </form>
            {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          </CardContent>
        </Card>

        {order && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order Status</CardTitle>
                    <CardDescription>Order ID: {order.id}</CardDescription>
                  </div>
                  {getStatusIcon(order.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}
                >
                  {order.status.toUpperCase()}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{order.customer_name}</p>
                      <p>{order.customer_email}</p>
                      {order.customer_phone && <p>{order.customer_phone}</p>}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p className="text-sm text-muted-foreground">{order.shipping_address}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Order Date</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Total Amount</h3>
                    <p className="text-2xl font-bold text-copper">${order.total_amount.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {orderItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-4 border-b last:border-0">
                        <div>
                          <h4 className="font-semibold">{item.product_name}</h4>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${(item.unit_price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
