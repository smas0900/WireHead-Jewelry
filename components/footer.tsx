import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Lumière Jewels</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Exquisite handcrafted jewelry with timeless elegance
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=rings" className="hover:text-copper transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=necklaces" className="hover:text-copper transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/shop?category=earrings" className="hover:text-copper transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bracelets" className="hover:text-copper transition-colors">
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/track-order" className="hover:text-copper transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-copper transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-copper transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-copper transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-copper transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-copper transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-copper transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} Lumière Jewels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
