"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import type { Gem } from "@/lib/types"

interface GemCardProps {
  gem: Gem
  onSelect?: (gem: Gem) => void
}

export function GemCard({ gem, onSelect }: GemCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          <Image
            src={gem.image_url || "/placeholder.svg"}
            alt={gem.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-primary">{gem.name}</h3>
              {gem.color && (
                <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">{gem.color}</span>
              )}
            </div>
            {gem.ai_prompt && <p className="text-sm text-muted-foreground line-clamp-2">{gem.ai_prompt}</p>}
            <p className="text-lg font-semibold text-secondary mt-2">+${gem.price.toFixed(2)}</p>
          </div>
          {onSelect && (
            <Button onClick={() => onSelect(gem)} className="w-full" size="sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Use This Gem
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
