import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    // Verify token (basic verification)
    try {
      const decoded = Buffer.from(token.value, "base64").toString()
      const [adminId, timestamp] = decoded.split(":")

      // Check if token is expired (7 days)
      const tokenAge = Date.now() - Number.parseInt(timestamp)
      const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

      if (tokenAge > maxAge) {
        return NextResponse.json({ authenticated: false }, { status: 401 })
      }

      return NextResponse.json({ authenticated: true, adminId })
    } catch {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }
  } catch (error) {
    console.error("[v0] Admin verify error:", error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
