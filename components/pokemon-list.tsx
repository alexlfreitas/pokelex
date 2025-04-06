"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useRef } from "react"

type Pokemon = {
  id: number
  name: string
  types: string[]
  sprite: string
  height: number
  weight: number
}

interface PokemonListProps {
  pokemons: Pokemon[]
  onSelectPokemon: (pokemon: Pokemon) => void
  selectedIndex: number
}

export function PokemonList({ pokemons, onSelectPokemon, selectedIndex }: PokemonListProps) {
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([])

  // Auto-scroll to keep selected item in view
  useEffect(() => {
    if (listItemRefs.current[selectedIndex]) {
      listItemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }
  }, [selectedIndex])

  if (pokemons.length === 0) {
    return <p className="text-center">No Pokemon found</p>
  }

  return (
    <div>
      <h2 className="text-lg mb-2 uppercase">Pokemon List</h2>
      <ScrollArea className="h-[250px] pr-2">
        <ul className="space-y-1">
          {pokemons.map((pokemon, index) => (
            <li
              key={pokemon.id}
              ref={(el) => (listItemRefs.current[index] = el)}
              className={`flex items-center justify-between p-1 cursor-pointer ${
                index === selectedIndex ? "bg-[#610000]" : "hover:bg-[#610000]/50"
              }`}
              onClick={() => onSelectPokemon(pokemon)}
            >
              <div className="flex items-center">
                <span className="mr-2 font-bold">#{pokemon.id.toString().padStart(3, "0")}</span>
                <span className="capitalize">{pokemon.name}</span>
              </div>
              <div className="flex space-x-1">
                {pokemon.types.map((type) => (
                  <span key={type} className="text-xs uppercase">
                    {type.slice(0, 4)}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}

