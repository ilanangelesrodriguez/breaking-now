"use client"

import type React from "react"

import { motion } from "framer-motion"
import { FaFire, FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from "react-icons/fa"
import { Card, CardBody, Button, Avatar, Tooltip } from "@heroui/react"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { useSavedArticles } from "@/hooks/use-saved-articles"
import { useCurrentArticle } from "@/hooks/use-current-article"
import { Article } from "@/models"

interface TrendingNewsProps {
  articles: Article[]
}

export const TrendingNews = ({ articles }: TrendingNewsProps) => {
  
    if (!articles || articles.length === 0) return null
  const trendingArticles = articles.slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 sticky top-32"
    >
      <div className="flex items-center gap-2 mb-4">
        <FaFire className="text-red-500" />
        <h2 className="text-2xl font-bold">Tendencias</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {trendingArticles.map((article, index) => (
          <TrendingNewsItem key={`trending-${index}`} article={article} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

interface TrendingNewsItemProps {
  article: Article
  index: number
}

const TrendingNewsItem = ({ article, index }: TrendingNewsItemProps) => {
  const router = useRouter()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isSaved, toggleSaved } = useSavedArticles()
  const { setCurrentArticle } = useCurrentArticle()

  // Generar un ID único para el artículo basado en su título
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="w-full">
        <CardBody className="p-3">
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold text-primary">{index + 1}</div>
            <div className="flex-1">
              <a
                href={`/article/${articleId}`}
                className="hover:text-primary transition-colors"
                onClick={handleArticleClick}
              >
                <h4 className="font-medium text-sm line-clamp-2">
                  <Tooltip className="text-xs" content={article.title}>
                    {article.title}
                  </Tooltip>
                </h4>
              </a>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center gap-1">
                  <Avatar src={article.urlToImage || "/placeholder.svg"} size="sm" className="w-5 h-5" />
                  <span className="text-xs text-default-500">{article.source.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="w-6 h-6 min-w-0 p-0"
                    onPress={() => toggleFavorite(article)}
                  >
                    {isFavorite(article) ? (
                      <FaHeart className="text-red-500 text-xs" />
                    ) : (
                      <FaRegHeart className="text-xs" />
                    )}
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="w-6 h-6 min-w-0 p-0"
                    onPress={() => toggleSaved(article)}
                  >
                    {isSaved(article) ? (
                      <FaBookmark className="text-primary text-xs" />
                    ) : (
                      <FaRegBookmark className="text-xs" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

