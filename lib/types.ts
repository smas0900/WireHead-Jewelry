export interface Product {
  id: string
  name: string
  description: string | null
  base_price: number
  category: string
  metal_type: string | null
  stock_quantity: number
  image_url: string | null
  additional_images: string[] | null
  is_customizable: boolean
  created_at: string
  updated_at: string
}

export interface Gem {
  id: string
  name: string
  image_url: string
  color: string | null
  style: string | null
  price: number
  ai_prompt: string | null
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  shipping_address: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  payment_status: "pending" | "paid" | "failed"
  tracking_number: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  quantity: number
  unit_price: number
  customization_data: CustomizationData | null
  created_at: string
}

export interface CustomizationData {
  gems: {
    gem_id: string
    gem_name: string
    gem_price: number
    position?: { x: number; y: number }
  }[]
}

export interface CartItem {
  product: Product
  quantity: number
  customization?: CustomizationData
}
