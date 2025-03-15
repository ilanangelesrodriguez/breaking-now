"use client"

import { Article } from "@/models"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type StorageType = "favorites" | "saved"

interface NewsContextType {
  favorites: Article[]
  saved: Article[]
  currentArticle: Article | null
  isLoaded: boolean
  isInStorage: (article: Article, type: StorageType) => boolean
  toggleStorage: (article: Article, type: StorageType) => void
  setCurrentArticle: (article: Article | null) => void
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Article[]>([])
  const [saved, setSaved] = useState<Article[]>([])
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedFavorites = localStorage.getItem("news-favorites")
        const storedSaved = localStorage.getItem("news-saved")
        const storedArticle = localStorage.getItem("news-current-article")

        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : [])
        setSaved(storedSaved ? JSON.parse(storedSaved) : [])
        setCurrentArticle(storedArticle ? JSON.parse(storedArticle) : null)
        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading from localStorage:", error)
        setIsLoaded(true)
      }
    }
  }, [])

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("news-favorites", JSON.stringify(favorites))
    }
  }, [favorites, isLoaded])

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("news-saved", JSON.stringify(saved))
    }
  }, [saved, isLoaded])

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && currentArticle) {
      localStorage.setItem("news-current-article", JSON.stringify(currentArticle))
    }
  }, [currentArticle, isLoaded])

  const isInStorage = (article: Article, type: StorageType) => {
    if (!article) return false
    const items = type === "favorites" ? favorites : saved
    return items.some((item) => item.title === article.title)
  }

  const toggleStorage = (article: Article, type: StorageType) => {
    if (!article) return

    if (type === "favorites") {
      setFavorites((prev) => {
        if (isInStorage(article, "favorites")) {
          return prev.filter((item) => item.title !== article.title)
        } else {
          return [...prev, article]
        }
      })
    } else {
      setSaved((prev) => {
        if (isInStorage(article, "saved")) {
          return prev.filter((item) => item.title !== article.title)
        } else {
          return [...prev, article]
        }
      })
    }
  }

  const updateCurrentArticle = (article: Article | null) => {
    setCurrentArticle(article)
  }

  return (
    <NewsContext.Provider
      value={{
        favorites,
        saved,
        currentArticle,
        isLoaded,
        isInStorage,
        toggleStorage,
        setCurrentArticle: updateCurrentArticle,
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}

export function useNewsContext() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error("useNewsContext must be used within a NewsProvider")
  }
  return context
}

