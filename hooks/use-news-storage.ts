"use client"

import { Article } from "@/models"
import { useState, useEffect, useCallback } from "react"

type StorageType = "favorites" | "saved"

export function useNewsStorage() {
  const [favorites, setFavorites] = useState<Article[]>([])
  const [saved, setSaved] = useState<Article[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedFavorites = localStorage.getItem("news-favorites")
        const storedSaved = localStorage.getItem("news-saved")

        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : [])
        setSaved(storedSaved ? JSON.parse(storedSaved) : [])
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

  const isInStorage = useCallback(
    (article: Article, type: StorageType) => {
      const items = type === "favorites" ? favorites : saved
      return items.some((item) => item.title === article.title)
    },
    [favorites, saved],
  )

  const toggleStorage = useCallback(
    (article: Article, type: StorageType) => {
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
    },
    [isInStorage],
  )

  return {
    favorites,
    saved,
    isInStorage,
    toggleStorage,
    isLoaded,
  }
}
