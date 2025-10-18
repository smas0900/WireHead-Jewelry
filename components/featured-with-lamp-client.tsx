// "use client"

// import { motion } from "framer-motion"
// import { LampContainer } from "@/components/ui/lamp"
// import { ScrollReveal } from "@/components/scroll-reveal"

// export function FeaturedWithLampClient({ children }: { children: React.ReactNode }) {
//   return (
//     <section className="relative py-20 bg-background overflow-hidden ">

//       <LampContainer>
//         <motion.div
//           initial={{ opacity: 0, y: 100 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="container mx-auto px-4 lg:px-8 relative z-10"
//         >
//           <ScrollReveal>
//             <div className="text-center space-y-4 mb-12">
//               <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
//                 Featured Collection
//               </h2>
//               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                 Handpicked pieces that showcase our finest craftsmanship
//               </p>
//             </div>
//           </ScrollReveal>

//           {children}
//         </motion.div>
        
//       </LampContainer>

 

//     </section>
//   )
// }
// "use client"

// import { motion } from "framer-motion"
// import { LampContainer } from "@/components/ui/lamp"
// import { ScrollReveal } from "@/components/scroll-reveal"

// export function FeaturedWithLampClient({ children }: { children: React.ReactNode }) {
//   return (
//     <section className="relative py-20 bg-background overflow-hidden">
//       {/* Fix lamp background */}
//       <div className="absolute inset-0 -z-10">
//         <LampContainer />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="container mx-auto px-4 lg:px-8 relative z-10"
//       >
//         <ScrollReveal>
//           <div className="text-center space-y-4 mb-12">
//             <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
//               Featured Collection
//             </h2>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Handpicked pieces that showcase our finest craftsmanship
//             </p>
//           </div>
//         </ScrollReveal>

//         {children}
//       </motion.div>
//     </section>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { LampContainer } from "@/components/ui/lamp"
import { ScrollReveal } from "@/components/scroll-reveal"

export function FeaturedWithLampClient({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#dcdcdc] via-[#e8e0f8] to-[#f3f3f3] overflow-hidden">
      {/* Lamp background effect */}
      <LampContainer>
        {/* Animated content container */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 lg:px-8 relative z-10"
        >
          {/* Heading and subheading with reveal animation */}
          <ScrollReveal>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#3b2f4a] drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                Featured Collection
              </h2>
              <p className="text-[#6f6185] text-lg max-w-2xl mx-auto">
                Handcrafted wire jewelry blending silver elegance with artistic detail.
              </p>
            </div>
          </ScrollReveal>

          {/* Featured products or child elements */}
          {children}
        </motion.div>
      </LampContainer>

      {/* Optional soft gradient glow overlay for added shine */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-white/30 via-transparent to-transparent blur-3xl opacity-40"></div>
    </section>
  )
}
