"use client"

import { useEffect, useState } from "react"
import { NewsGrid } from "@/components/news/news-grid"
import { PageAttachment } from "@/components/SavedArticle/page-attachment"
import { FaHeart, FaTrash } from "react-icons/fa"
import { Button } from "@heroui/react"
import { motion } from "framer-motion"
import { useFavorites } from "@/hooks/use-favorites"

export default function FavoritesPage() {
  const { favorites, clearAllFavorites } = useFavorites()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse">Cargando favoritos...</div>
      </div>
    )
  }

  return (
    <section className="flex flex-col items-center justify-center w-full py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <FaHeart className="text-red-500 text-3xl" />
          <h1 className="text-4xl font-bold">Mis Favoritos</h1>
        </motion.div>

        {favorites.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-default-500">
                Tienes <span className="font-bold text-primary">{favorites.length}</span> artículos en tus favoritos
              </p>
              <Button color="danger" variant="flat" startContent={<FaTrash />} onPress={clearAllFavorites}>
                Limpiar favoritos
              </Button>
            </div>
            <NewsGrid articles={favorites} />
          </>
        ) : (
          <div className="text-center py-16 bg-default-50 rounded-lg">
            <FaHeart className="text-default-300 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No tienes favoritos</h2>
            <p className="text-default-500 mb-6">Marca artículos como favoritos para verlos aquí</p>
            <Button color="primary" href="/">
              Explorar noticias
            </Button>
          </div>
        )}
      </div>
      <PageAttachment />
    </section>
  )
}
