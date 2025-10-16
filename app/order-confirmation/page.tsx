"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-secondary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-serif text-primary">Order Confirmed!</h1>
              <p className="text-muted-foreground">Thank you for your purchase</p>
            </div>

            {orderId && (
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="font-mono font-semibold">{orderId}</p>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <p className="text-sm text-muted-foreground">
                We've sent a confirmation email with your order details. Your jewelry will be carefully crafted and
                shipped soon.
              </p>
            </div>

            <div className="flex gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
