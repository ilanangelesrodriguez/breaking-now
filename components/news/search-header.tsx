"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaSearch, FaArrowLeft, FaFilter, FaGlobe } from "react-icons/fa"
import { Button, Input, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react"
import Link from "next/link"

interface SearchHeaderProps {
  query: string
  totalResults: number
}

export function SearchHeader({ query, totalResults }: SearchHeaderProps) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(query)
  const [selectedSortBy, setSelectedSortBy] = useState("publishedAt")
  const [selectedLanguage, setSelectedLanguage] = useState("es")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`)
    }
  }

  const handleSortByChange = (sortBy: string) => {
    setSelectedSortBy(sortBy)
    updateSearchParams("sortBy", sortBy)
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    updateSearchParams("language", language)
  }

  const updateSearchParams = (param: string, value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set(param, value)
    if (query) {
      url.searchParams.set("q", query)
    }
    router.push(url.pathname + url.search)
  }

  const removeFilter = (filter: string) => {
    const newFilters = activeFilters.filter((f) => f !== filter)
    setActiveFilters(newFilters)
  }

  const sortByOptions = [
    { key: "publishedAt", label: "Más recientes" },
    { key: "relevancy", label: "Relevancia" },
    { key: "popularity", label: "Popularidad" },
  ]

  const languageOptions = [
    { key: "es", label: "Español" },
    { key: "en", label: "Inglés" },
    { key: "fr", label: "Francés" },
    { key: "de", label: "Alemán" },
  ]

  return (
    <div className="w-full mb-8">
      <Link href="/" className="flex items-center gap-2 text-primary mb-4">
        <FaArrowLeft /> Volver a inicio
      </Link>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <FaSearch className="text-primary hidden md:block" size={24} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Resultados para: {query}</h1>
          <p className="text-default-500">Se encontraron {totalResults} resultados</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Buscar noticias..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            startContent={<FaSearch className="text-default-400" />}
          />
          <Button color="primary" type="submit">
            Buscar
          </Button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" startContent={<FaFilter />} endContent={selectedSortBy !== "publishedAt" && "✓"}>
              Ordenar por
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Ordenar por"
            selectedKeys={[selectedSortBy]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string
              if (selected) handleSortByChange(selected)
            }}
            selectionMode="single"
          >
            {sortByOptions.map((option) => (
              <DropdownItem key={option.key}>{option.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat" startContent={<FaGlobe />} endContent={selectedLanguage !== "es" && "✓"}>
              Idioma
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Idioma"
            selectedKeys={[selectedLanguage]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string
              if (selected) handleLanguageChange(selected)
            }}
            selectionMode="single"
          >
            {languageOptions.map((option) => (
              <DropdownItem key={option.key}>{option.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <div className="flex-1 flex flex-wrap gap-2 mt-2 md:mt-0">
          {activeFilters.map((filter) => (
            <Chip key={filter} onClose={() => removeFilter(filter)} variant="flat" color="primary">
              {filter}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}

