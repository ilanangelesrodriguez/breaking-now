"use client"

import { useNewsContext } from "@/context/news-context"
import { Article } from "@/models"

export function useFavorites() {
  const { favorites, isInStorage, toggleStorage } = useNewsContext()

  const isFavorite = (article: Article) => {
    return isInStorage(article, "favorites")
  }

  const toggleFavorite = (article: Article) => {
    toggleStorage(article, "favorites")
  }

  const clearAllFavorites = () => {
    favorites.forEach((article) => toggleStorage(article, "favorites"))
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearAllFavorites,
  }
}
