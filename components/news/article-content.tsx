"use client"

import {
  FaCalendarAlt,
  FaUser,
  FaNewspaper,
  FaArrowLeft,
  FaBookmark,
  FaRegBookmark,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Image from "next/image"
import { Button, Chip, Divider } from "@heroui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFavorites } from "@/hooks/use-favorites"
import { useSavedArticles } from "@/hooks/use-saved-articles"
import { useCurrentArticle } from "@/hooks/use-current-article"
import { Article } from "@/models"

interface ArticleContentProps {
  article?: Article | null
}

export function ArticleContent({ article: propArticle }: ArticleContentProps) {
  const router = useRouter()
  const { currentArticle } = useCurrentArticle()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isSaved, toggleSaved } = useSavedArticles()
  const [imageError, setImageError] = useState(false)

  const article = propArticle || currentArticle

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
        <p className="text-default-500 mb-6">Lo sentimos, no pudimos encontrar el artículo que estás buscando.</p>
        <Button color="primary" onPress={() => router.push("/")}>
          Volver a inicio
        </Button>
      </div>
    )
  }

  const formattedDate = article.publishedAt
    ? format(new Date(article.publishedAt), "PPP", { locale: es })
    : "Fecha desconocida"

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Button variant="light" className="flex items-center gap-2 text-primary mb-6" onClick={() => router.push("/")}>
        <FaArrowLeft /> Volver a inicio
      </Button>

      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

        <div className="flex flex-wrap gap-4 text-default-500 mb-6">
          <div className="flex items-center gap-1">
            <FaCalendarAlt />
            <span>{formattedDate}</span>
          </div>
          {article.author && (
            <div className="flex items-center gap-1">
              <FaUser />
              <span>{article.author}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <FaNewspaper />
            <span>{article.source.name}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Chip color="primary" variant="flat">
            Noticias
          </Chip>
        </div>

        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="flat"
            color={isFavorite(article) ? "danger" : "default"}
            onPress={() => toggleFavorite(article)}
          >
            {isFavorite(article) ? <FaHeart /> : <FaRegHeart />}
          </Button>
          <Button
            isIconOnly
            variant="flat"
            color={isSaved(article) ? "primary" : "default"}
            onPress={() => toggleSaved(article)}
          >
            {isSaved(article) ? <FaBookmark /> : <FaRegBookmark />}
          </Button>
          <Button as="a" href={article.url} target="_blank" rel="noopener noreferrer" color="primary">
            Leer artículo completo
          </Button>
        </div>
      </div>

      {article.urlToImage && !imageError ? (
        <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
          <Image
            src={article.urlToImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            priority
            onError={() => setImageError(true)}
            unoptimized
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm">{article.description}</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-[200px] mb-6 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Imagen no disponible</p>
        </div>
      )}

      <div className="prose max-w-none dark:prose-invert">
        <p className="text-xl mb-6">{article.description}</p>
        <div className="whitespace-pre-line">{article.content || "No hay contenido disponible."}</div>
      </div>

      <Divider className="my-8" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-bold">{article.author || "Autor desconocido"}</p>
            <p className="text-sm text-default-500">Periodista en {article.source.name}</p>
          </div>
        </div>

        <div>
          <Button as="a" href={article.url} target="_blank" rel="noopener noreferrer">
            Leer artículo original
          </Button>
        </div>
      </div>
    </div>
  )
}
