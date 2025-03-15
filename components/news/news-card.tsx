"use client"

import type React from "react"

import { Card, CardBody, CardFooter, Image, Button, Tooltip } from "@heroui/react"
import { motion } from "framer-motion"
import { FaClock, FaExternalLinkAlt, FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { useSavedArticles } from "@/hooks/use-saved-articles"
import { useCurrentArticle } from "@/hooks/use-current-article"
import { Article } from "@/models"

interface NewsCardProps {
  article: Article
  index: number
}

export const NewsCard = ({ article, index }: NewsCardProps) => {
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isSaved, toggleSaved } = useSavedArticles()
  const { setCurrentArticle } = useCurrentArticle()
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const placeholderImage =
    "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  const formattedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: es })
    : "Fecha desconocida"

  const articleId = article.title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")

  const handleArticleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentArticle(article)
    router.push(`/article/${articleId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="h-full">
        <CardBody className="p-0 overflow-hidden">
          <div className="relative overflow-hidden w-full h-40">
            <a href={`/article/${articleId}`} className="block w-full h-full" onClick={handleArticleClick}>
              <Image
                alt={article.title}
                className="w-full h-[50vh] object-cover transition-transform duration-500"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                src={imageError ? placeholderImage : article.urlToImage || placeholderImage}
                fallbackSrc={placeholderImage}
                onError={() => setImageError(true)}
              />
            </a>
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
              style={{ zIndex: 15 }}
            >
              <p className="text-white text-xs flex items-center gap-1">
                <FaClock className="inline" />
                {formattedDate}
              </p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2" style={{ zIndex: 15 }}>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                onPress={() => toggleFavorite(article)}
              >
                {isFavorite(article) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </Button>
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
                onPress={() => toggleSaved(article)}
              >
                {isSaved(article) ? <FaBookmark className="text-primary" /> : <FaRegBookmark />}
              </Button>
            </div>
          </div>
          <div className="p-4">
            <a
              href={`/article/${articleId}`}
              className="hover:text-primary transition-colors"
              onClick={handleArticleClick}
            >
              <Tooltip className="text-[10px]" content={article.title}>
                <h3 className="font-bold text-lg line-clamp-2 mb-2">{article.title}</h3>
              </Tooltip>
            </a>
            <p className="text-default-500 line-clamp-3 text-sm">
              {article.description || "No hay descripción disponible"}
            </p>
          </div>
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <p className="text-xs text-default-500">{article.source.name || "Fuente desconocida"}</p>
          <div className="flex items-center gap-2">
            <a
              href={`/article/${articleId}`}
              className="text-primary flex items-center gap-1 text-sm"
              onClick={handleArticleClick}
            >
              Leer más <FaExternalLinkAlt size={12} />
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
