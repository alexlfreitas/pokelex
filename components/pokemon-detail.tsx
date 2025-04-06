"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Pokemon = {
  id: number
  name: string
  types: string[]
  sprite: string
  height: number
  weight: number
}

interface PokemonDetailProps {
  pokemon: Pokemon
  onBack: () => void
  onPrev: () => void
  onNext: () => void
}

export function PokemonDetail({ pokemon, onBack, onPrev, onNext }: PokemonDetailProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <Button variant="link" onClick={onBack} className="p-0 text-[#9bbc0f] hover:text-[#9bbc0f] hover:underline">
          Back
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            className="h-6 w-6 p-0 hover:bg-[#610000]"
            disabled={pokemon.id <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>#{pokemon.id.toString().padStart(3, "0")}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="h-6 w-6 p-0 hover:bg-[#610000]"
            disabled={pokemon.id >= 151}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <h2 className="text-lg font-bold text-center capitalize mb-2">{pokemon.name}</h2>

      <div className="flex justify-center mb-2">
        {pokemon.sprite ? (
          <div className="w-24 h-24 flex items-center justify-center">
            <img
              src={pokemon.sprite || "/placeholder.svg"}
              alt={pokemon.name}
              className="pixelated max-w-full max-h-full"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        ) : (
          <div className="w-24 h-24 flex items-center justify-center border border-dashed">
            <span>?</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-[#610000] p-1 rounded">
          <span className="font-bold">Types:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {pokemon.types.map((type) => (
              <span key={type} className="uppercase">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#610000] p-1 rounded">
          <div>
            <span className="font-bold">Height:</span> {pokemon.height / 10}m
          </div>
          <div>
            <span className="font-bold">Weight:</span> {pokemon.weight / 10}kg
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-center">Press A to select, B to go back</div>
    </div>
  )
}

