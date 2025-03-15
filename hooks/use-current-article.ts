"use client"

import { useNewsContext } from "@/context/news-context"

export function useCurrentArticle() {
  const { currentArticle, setCurrentArticle } = useNewsContext()

  return {
    currentArticle,
    setCurrentArticle,
  }
}
