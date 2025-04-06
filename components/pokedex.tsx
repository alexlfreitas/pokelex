"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react"
import { PokemonDetail } from "./pokemon-detail"
import { PokemonList } from "./pokemon-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Pokemon = {
  id: number
  name: string
  types: string[]
  sprite: string
  height: number
  weight: number
}

export function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [view, setView] = useState<"list" | "detail">("list")
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true)
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        const data = await response.json()

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const res = await fetch(pokemon.url)
            const detail = await res.json()
            return {
              id: detail.id,
              name: detail.name,
              types: detail.types.map((type: { type: { name: string } }) => type.type.name),
              sprite: detail.sprites.front_default,
              height: detail.height,
              weight: detail.weight,
            }
          }),
        )

        setPokemons(pokemonDetails)
      } catch (error) {
        console.error("Error fetching Pokemon:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  const filteredPokemon = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || pokemon.id.toString().includes(searchTerm),
  )

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchTerm])

  const handleSearch = () => {
    if (view === "detail") {
      setView("list")
    }
  }

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
    setView("detail")
  }

  const handlePrevPokemon = () => {
    if (selectedPokemon && selectedPokemon.id > 1) {
      const prevPokemon = pokemons.find((p) => p.id === selectedPokemon.id - 1)
      if (prevPokemon) setSelectedPokemon(prevPokemon)
    }
  }

  const handleNextPokemon = () => {
    if (selectedPokemon && selectedPokemon.id < 151) {
      const nextPokemon = pokemons.find((p) => p.id === selectedPokemon.id + 1)
      if (nextPokemon) setSelectedPokemon(nextPokemon)
    }
  }

  // Navigation in list view
  const handleUpNavigation = () => {
    if (view === "list" && filteredPokemon.length > 0) {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }
  }

  const handleDownNavigation = () => {
    if (view === "list" && filteredPokemon.length > 0) {
      setSelectedIndex((prev) => (prev < filteredPokemon.length - 1 ? prev + 1 : prev))
    }
  }

  const handleAButtonPress = () => {
    if (view === "list" && filteredPokemon.length > 0) {
      handleSelectPokemon(filteredPokemon[selectedIndex])
    }
  }

  const handleBButtonPress = () => {
    if (view === "detail") {
      setView("list")
    }
  }

  return (
    <div className="flex w-full md:m-auto md:max-w-md">
      <div className="w-full bg-[#e50000] p-6 rounded-xl shadow-2xl border-4 border-[#8b0000] flex flex-col">
        <div className="bg-[#ff9298] p-4 rounded-lg border-4 border-[#8b0000] mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <h1 className="font-bold text-[#8b0000] text-xl font-mono">POKEDEX</h1>
            </div>
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-[#8b0000]"></div>
              <div className="w-1 h-3 bg-[#8b0000]"></div>
              <div className="w-1 h-3 bg-[#8b0000]"></div>
              <div className="w-1 h-3 bg-[#8b0000]"></div>
            </div>
          </div>

          <div className="bg-[#8b0000] p-4 rounded-md min-h-[320px] font-mono text-[#ff9298]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-center animate-pulse">Loading...</p>
              </div>
            ) : view === "list" ? (
              <PokemonList
                pokemons={filteredPokemon}
                onSelectPokemon={handleSelectPokemon}
                selectedIndex={selectedIndex}
              />
            ) : (
              <PokemonDetail
                pokemon={selectedPokemon!}
                onBack={() => setView("list")}
                onPrev={handlePrevPokemon}
                onNext={handleNextPokemon}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 itens-center justify-center">

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-36 aspect-square bg-zinc-800 rounded-full flex-shrink-0">
              <div className="grid grid-cols-3 grid-rows-3 gap-1 w-[120px] h-[120px]">
                <Button
                  variant="outline"
                  size="icon"
                  className="col-start-2 row-start-1 bg-zinc-700 hover:bg-zinc-600 border-0 text-zinc-300 hover:text-zinc-300"
                  onClick={handleUpNavigation}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="col-start-1 row-start-2 bg-zinc-700 hover:bg-zinc-600 border-0 text-zinc-300 hover:text-zinc-300"
                  onClick={() => (view === "detail" ? handlePrevPokemon() : null)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="col-start-2 row-start-2 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="col-start-3 row-start-2 bg-zinc-700 hover:bg-zinc-600 border-0 text-zinc-300 hover:text-zinc-300"
                  onClick={() => (view === "detail" ? handleNextPokemon() : null)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="col-start-2 row-start-3 bg-zinc-700 hover:bg-zinc-600 border-0 text-zinc-300 hover:text-zinc-300"
                  onClick={handleDownNavigation}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex">
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#8b0000] text-[#ff9298] border-[#610000] placeholder:text-[#ff9298]/50"
                />
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <Button
                  className="rounded-full w-12 h-12 bg-amber-500 border-2 border-amber-800 hover:bg-amber-600 font-bold"
                  onClick={handleBButtonPress}
                >
                  B
                </Button>
                <Button
                  className="rounded-full w-12 h-12 bg-emerald-600 border-2 border-emerald-800 hover:bg-emerald-700 font-bold"
                  onClick={handleAButtonPress}
                >
                  A
                </Button>
              </div>
            </div>
          </div>

          
        </div>

      </div>
    </div>
  )
}

