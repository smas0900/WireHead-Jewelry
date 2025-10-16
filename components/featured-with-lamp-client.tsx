"use client"

import { motion } from "framer-motion"
import { LampContainer } from "@/components/ui/lamp"
import { ScrollReveal } from "@/components/scroll-reveal"

export function FeaturedWithLampClient({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 lg:px-8 relative z-10"
        >
          <ScrollReveal>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Featured Collection
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Handpicked pieces that showcase our finest craftsmanship
              </p>
            </div>
          </ScrollReveal>

          {children}
        </motion.div>
      </LampContainer>
    </section>
  )
}
