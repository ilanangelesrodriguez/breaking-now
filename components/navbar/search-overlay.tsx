"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Input, Button } from "@heroui/react"
import { FaSearch } from "react-icons/fa"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-md z-40 p-4 shadow-lg"
        >
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <Input
              fullWidth
              placeholder="Buscar noticias..."
              size="lg"
              startContent={<FaSearch className="text-default-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              classNames={{
                input: "text-base",
              }}
              endContent={
                <Button color="primary" size="sm" type="submit">
                  Buscar
                </Button>
              }
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
