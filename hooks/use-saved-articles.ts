"use client"

import { useNewsContext } from "@/context/news-context"
import { Article } from "@/models"

export function useSavedArticles() {
  const { saved, isInStorage, toggleStorage } = useNewsContext()

  const isSaved = (article: Article) => {
    return isInStorage(article, "saved")
  }

  const toggleSaved = (article: Article) => {
    toggleStorage(article, "saved")
  }

  const clearAllSaved = () => {
    saved.forEach((article) => toggleStorage(article, "saved"))
  }

  return {
    saved,
    isSaved,
    toggleSaved,
    clearAllSaved,
  }
}
