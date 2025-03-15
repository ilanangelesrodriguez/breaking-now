import type { NewsResponse } from "@/models/news-response.model"
import { cache } from "react"
import { fetchFromNewsApi } from "./base"

/**
 * Obtiene los titulares principales de la API de noticias
 * @param country Código del país (por defecto: "us")
 * @param category Categoría de noticias
 * @param pageSize Número de resultados por página (por defecto: 10)
 * @param page Número de página (por defecto: 1)
 * @returns Promesa con NewsResponse
 */
export const getTopHeadlines = cache(
  async (country = "us", category?: string, pageSize = 10, page = 1): Promise<NewsResponse> => {
    const params: Record<string, string | number> = {
      country,
      pageSize,
      page,
    }

    if (category && category !== "general") {
      params.category = category
    }

    return fetchFromNewsApi("top-headlines", params)
  },
)

