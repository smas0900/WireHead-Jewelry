// "use client"

// import { useEffect, useMemo, useState } from "react"

// import { cn } from "@/lib/utils"

// type Grid = {
//   rows: number
//   cols: number
// }

// const DEFAULT_GRIDS: Record<string, Grid> = {
//   "6x4": { rows: 4, cols: 6 },
//   "8x8": { rows: 8, cols: 8 },
//   "8x3": { rows: 3, cols: 8 },
//   "4x6": { rows: 6, cols: 4 },
//   "3x8": { rows: 8, cols: 3 },
// }

// type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

// interface PixelImageProps {
//   src: string
//   grid?: PredefinedGridKey
//   customGrid?: Grid
//   grayscaleAnimation?: boolean
//   pixelFadeInDuration?: number // in ms
//   maxAnimationDelay?: number // in ms
//   colorRevealDelay?: number // in ms
// }

// export const PixelImage = ({
//   src,
//   grid = "6x4",
//   grayscaleAnimation = true,
//   pixelFadeInDuration = 1000,
//   maxAnimationDelay = 1200,
//   colorRevealDelay = 1300,
//   customGrid,
// }: PixelImageProps) => {
//   const [isVisible, setIsVisible] = useState(false)
//   const [showColor, setShowColor] = useState(false)

//   const MIN_GRID = 1
//   const MAX_GRID = 16

//   const { rows, cols } = useMemo(() => {
//     const isValidGrid = (grid?: Grid) => {
//       if (!grid) return false
//       const { rows, cols } = grid
//       return (
//         Number.isInteger(rows) &&
//         Number.isInteger(cols) &&
//         rows >= MIN_GRID &&
//         cols >= MIN_GRID &&
//         rows <= MAX_GRID &&
//         cols <= MAX_GRID
//       )
//     }

//     return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
//   }, [customGrid, grid])

//   useEffect(() => {
//     setIsVisible(true)
//     const colorTimeout = setTimeout(() => {
//       setShowColor(true)
//     }, colorRevealDelay)
//     return () => clearTimeout(colorTimeout)
//   }, [colorRevealDelay])

//   const pieces = useMemo(() => {
//     const total = rows * cols
//     return Array.from({ length: total }, (_, index) => {
//       const row = Math.floor(index / cols)
//       const col = index % cols

//       // const clipPath = `polygon(
//       //   ${col * (100 / cols)}% ${row * (100 / rows)}%,
//       //   ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
//       //   ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
//       //   ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
//       // )`
//       const epsilon = 0.2 // overlap percentage (~0.2%)
//       const stepX = 100 / cols
//       const stepY = 100 / rows

//       const clipPath = `polygon(
//   ${col * stepX - epsilon}% ${row * stepY - epsilon}%,
//   ${(col + 1) * stepX + epsilon}% ${row * stepY - epsilon}%,
//   ${(col + 1) * stepX + epsilon}% ${(row + 1) * stepY + epsilon}%,
//   ${col * stepX - epsilon}% ${(row + 1) * stepY + epsilon}%
// )`

//       const delay = Math.random() * maxAnimationDelay
//       return {
//         clipPath,
//         delay,
//       }
//     })
//   }, [rows, cols, maxAnimationDelay])

//   return (
//     <div className="relative w-full h-[50vh] select-none">
//       {pieces.map((piece, index) => (
//         <div
//           key={index}
//           className={cn(
//             "pixel-piece absolute inset-0 transition-all ease-out",
//             isVisible ? "opacity-100" : "opacity-0"
//           )}
//           style={{
//             clipPath: piece.clipPath,
//             transitionDelay: `${piece.delay}ms`,
//             transitionDuration: `${pixelFadeInDuration}ms`,
//           }}
//         >
//           <img
//             src={src}
//             alt={`Pixel image piece ${index + 1}`}
//             className={cn(
//               "z-1 object-cover w-full h-full",
//               grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
//             )}
//             style={{
//               transition: grayscaleAnimation
//                 ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
//                 : "none",
//             }}
//             draggable={false}
//           />
//         </div>
//       ))}
//     </div>
//   )
// }


"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Grid = { rows: number; cols: number }

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number
  maxAnimationDelay?: number
  colorRevealDelay?: number
  triggerOnScroll?: boolean // 👈 new prop
}

export const PixelImage = ({
  src,
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  triggerOnScroll = false, // default: no scroll trigger
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(!triggerOnScroll)
  const [showColor, setShowColor] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false
      const { rows, cols } = grid
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }
    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  // 👇 Optional scroll trigger
  useEffect(() => {
    if (!triggerOnScroll) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const timeout = setTimeout(() => setShowColor(true), colorRevealDelay)
          return () => clearTimeout(timeout)
        }
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [triggerOnScroll, colorRevealDelay])

  // 👇 Immediate animation (no scroll trigger)
  useEffect(() => {
    if (!triggerOnScroll) {
      setIsVisible(true)
      const timeout = setTimeout(() => setShowColor(true), colorRevealDelay)
      return () => clearTimeout(timeout)
    }
  }, [triggerOnScroll, colorRevealDelay])

  const pieces = useMemo(() => {
    const total = rows * cols
    const epsilon = 0.2 // overlap to remove visible gaps
    const stepX = 100 / cols
    const stepY = 100 / rows

    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols
      const clipPath = `polygon(
        ${col * stepX - epsilon}% ${row * stepY - epsilon}%,
        ${(col + 1) * stepX + epsilon}% ${row * stepY - epsilon}%,
        ${(col + 1) * stepX + epsilon}% ${(row + 1) * stepY + epsilon}%,
        ${col * stepX - epsilon}% ${(row + 1) * stepY + epsilon}%
      )`
      const delay = Math.random() * maxAnimationDelay
      return { clipPath, delay }
    })
  }, [rows, cols, maxAnimationDelay])

  return (
    <div ref={containerRef} className="relative w-full h-[50vh] select-none overflow-hidden">
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "pixel-piece absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              "z-1 object-cover w-full h-full",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              transform: "scale(1.01)", // hide gaps fully
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
