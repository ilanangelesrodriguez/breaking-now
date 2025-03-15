"use client"

import { useEffect, useState } from "react"
import { NewsGrid } from "@/components/news/news-grid"
import { PageAttachment } from "@/components/SavedArticle/page-attachment"
import { FaBookmark, FaTrash } from "react-icons/fa"
import { Button } from "@heroui/react"
import { motion } from "framer-motion"
import { useSavedArticles } from "@/hooks/use-saved-articles"

export default function SavedPage() {
  const { saved, clearAllSaved } = useSavedArticles()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse">Cargando artículos guardados...</div>
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
          <FaBookmark className="text-primary text-3xl" />
          <h1 className="text-4xl font-bold">Artículos Guardados</h1>
        </motion.div>

        {saved.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-default-500">
                Tienes <span className="font-bold text-primary">{saved.length}</span> artículos guardados
              </p>
              <Button color="danger" variant="flat" startContent={<FaTrash />} onPress={clearAllSaved}>
                Limpiar guardados
              </Button>
            </div>
            <NewsGrid articles={saved} />
          </>
        ) : (
          <div className="text-center py-16 bg-default-50 rounded-lg">
            <FaBookmark className="text-default-300 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No tienes artículos guardados</h2>
            <p className="text-default-500 mb-6">Guarda artículos para leerlos más tarde</p>
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



