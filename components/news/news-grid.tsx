"use client"

import { motion } from "framer-motion"
import { NewsCard } from "./news-card"
import { Article } from "@/models"

interface NewsGridProps {
  articles: Article[]
}

export const NewsGrid = ({ articles }: NewsGridProps) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-default-500">No se encontraron noticias</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
    >
      {articles.map((article, index) => (
        <NewsCard key={`${article.title}-${index}`} article={article} index={index} />
      ))}
    </motion.div>
  )
}

