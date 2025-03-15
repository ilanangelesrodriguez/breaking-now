"use client"

import { useEffect, useState } from "react"
import { ArticleContent } from "@/components/news/article-content"
import { PageAttachment } from "@/components/SavedArticle/page-attachment"
import { useCurrentArticle } from "@/hooks/use-current-article"
import { useParams } from "next/navigation"
import { Article } from "@/models"
import { searchNews } from "@/services"

export default function ArticlePage() {
  const { id } = useParams() as { id: string }
  const { currentArticle } = useCurrentArticle()
  const [isLoading, setIsLoading] = useState(!currentArticle)
  const [fetchedArticle, setFetchedArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      if (!currentArticle && id) {
        setIsLoading(true)
        try {
          const searchTerm = id.replace(/-/g, " ")
          const response = await searchNews(searchTerm, "es", "relevancy", 1, 1)
          const article = response.articles.length > 0 ? response.articles[0] : null
          setFetchedArticle(article)
        } catch (error) {
          console.error("Error fetching article:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchArticle()
  }, [currentArticle, id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse">Cargando artículo...</div>
      </div>
    )
  }

  const article = currentArticle || fetchedArticle

  return (
    <>
      <ArticleContent article={article} />
      <PageAttachment />
    </>
  )
}


