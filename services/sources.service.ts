import type { NewsResponse } from "@/models/news-response.model"
import { fetchFromNewsApi } from "./base"
import { cache } from "react"

/**
 * Fetches news from specific sources using the News API
 * @param sources Comma-separated list of source IDs
 * @param pageSize Number of results per page (default: 10)
 * @param page Page number (default: 1)
 * @returns Promise with NewsResponse
 */
export const getNewsBySource = cache(async (sources: string, pageSize = 10, page = 1): Promise<NewsResponse> => {
  const params: Record<string, string | number> = {
    sources,
    pageSize,
    page,
  }

  return fetchFromNewsApi("top-headlines", params)
})
