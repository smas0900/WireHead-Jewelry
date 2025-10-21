import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HeroSlider } from "@/components/hero-slider";
import FeaturedWithLampServer from "@/components/featured-with-lamp-server";
import MovingCards from "@/components/moving-cards"; //
import { PixelImage } from "@/components/ui/pixel-image"


export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <HeroSlider />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-accent/40 via-foreground/50 to-background/95" />
        {/* </CHANGE> */}

        <div className="container mx-auto px-4 lg:px-8 pb-12 relative z-20">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white shadow-2xl border-2 border-white/20 animate-in fade-in duration-1000 delay-300 text-lg px-8 py-6"
          >
            <Link href="/shop">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background ">

        <FeaturedWithLampServer />

      </section>

      {/* Craftsmanship Section */}



      <section className="relative py-32 overflow-hidden">
        {/* Full background pixel image */}
        <div className="absolute inset-0 -z-10">
          <PixelImage
            src="/jewelry-craftsmanship.jpg"
            customGrid={{ rows: 4, cols: 6 }}
            className="w-full h-full object-cover"
            triggerOnScroll={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-accent/60 via-foreground/60 to-accent/60" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-background">
                Handcrafted with Nature's Beauty
              </h2>
              <p className="text-lg md:text-xl text-background/90 leading-relaxed">
                Every piece is lovingly crafted by hand using traditional
                wire-wrapping techniques and natural gemstones. Our artisan
                approach celebrates the organic beauty found in nature, creating
                wearable art that connects you to the earth.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-4 bg-primary hover:bg-primary/90 text-background"
              >
                <Link href="/shop">
                  Discover Our Craft
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Shop by Category
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Rings",
                image: "/luxury-gold-ring.jpg",
                category: "rings",
              },
              {
                name: "Necklaces",
                image: "/elegant-pearl-necklace.jpg",
                category: "necklaces",
              },
              {
                name: "Earrings",
                image: "/diamond-drop-earrings.jpg",
                category: "earrings",
              },
              {
                name: "Bracelets",
                image: "/gold-bracelet.jpg",
                category: "bracelets",
              },
            ].map((category, index) => (
              <ScrollReveal key={category.name} delay={index * 100}>
                <Link
                  href={`/shop?category=${category.category}`}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-muted hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out border-2 border-transparent hover:border-primary/50"
                >
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end p-6 transition-all duration-500 group-hover:from-primary/80">
                    <h3 className="text-2xl font-bold text-background transition-transform duration-500 group-hover:translate-x-2">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* New Handcrafted with Nature's Beauty Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/jewelry-craftsmanship.jpg"
            alt="Nature-inspired jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-accent/60 to-foreground/70" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-background">
                Handcrafted with Nature's Beauty
              </h2>
              <p className="text-lg md:text-xl text-background/90 leading-relaxed">
                Each gemstone is carefully selected for its unique character and
                natural beauty. Our copper and silver wire-wrapping techniques
                honor ancient traditions while creating contemporary designs
                that celebrate the raw elegance of nature's treasures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-background"
                >
                  <Link href="/shop">
                    View All Pieces
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-background text-background hover:bg-background/20 bg-transparent"
                >
                  <Link href="/about">Learn Our Story</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Scrolling Cards Section */}
      <section className="py-24 bg-accent/10">
        <ScrollReveal>


          <MovingCards />

        </ScrollReveal>
      </section>


    </div >
  );
}
