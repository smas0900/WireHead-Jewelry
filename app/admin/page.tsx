import { redirect } from "next/navigation"

export default function AdminPage() {
  // Redirect to products management by default
  redirect("/admin/products")
}
