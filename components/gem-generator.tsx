"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Loader2 } from "lucide-react"

export function GemGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-gem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate gem")
      }

      const data = await response.json()
      console.log("[v0] Generated gem:", data)

      // Refresh the page to show the new gem
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate gem")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe your dream gemstone... (e.g., 'A deep purple amethyst with golden flecks and a mystical glow')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        className="resize-none"
      />
      {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{error}</div>}
      <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full">
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Gem
          </>
        )}
      </Button>
    </div>
  )
}
