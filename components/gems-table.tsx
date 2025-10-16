"use client"

import { useState } from "react"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import type { Gem } from "@/lib/types"

interface GemsTableProps {
  gems: Gem[]
}

export function GemsTable({ gems }: GemsTableProps) {
  const [localGems, setLocalGems] = useState(gems)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gem?")) return

    try {
      const response = await fetch(`/api/gems/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete gem")

      setLocalGems(localGems.filter((g) => g.id !== id))
    } catch (error) {
      console.error("[v0] Error deleting gem:", error)
      alert("Failed to delete gem")
    }
  }

  return (
    <div className="bg-card border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Style</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>AI Prompt</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localGems.map((gem) => (
            <TableRow key={gem.id}>
              <TableCell>
                <div className="relative w-12 h-12 bg-muted rounded overflow-hidden">
                  <Image src={gem.image_url || "/placeholder.svg"} alt={gem.name} fill className="object-cover" />
                </div>
              </TableCell>
              <TableCell className="font-medium">{gem.name}</TableCell>
              <TableCell>
                {gem.color && (
                  <Badge variant="outline" className="capitalize">
                    {gem.color}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {gem.style && (
                  <Badge variant="secondary" className="capitalize">
                    {gem.style}
                  </Badge>
                )}
              </TableCell>
              <TableCell>${gem.price.toFixed(2)}</TableCell>
              <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{gem.ai_prompt}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleDelete(gem.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
