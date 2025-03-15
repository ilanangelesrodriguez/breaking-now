import type { NewsResponse } from "@/models/news-response.model"
import { fetchFromNewsApi } from "./base"
import { cache } from "react"

/**
 * Busca artículos de noticias utilizando la API de Noticias
 * @param query Consulta de búsqueda
 * @param language Código de idioma (por defecto: "es")
 * @param sortBy Método de ordenación (por defecto: "publishedAt")
 * @param pageSize Número de resultados por página (por defecto: 10)
 * @param page Número de página (por defecto: 1)
 * @returns Promesa con NewsResponse
 */
export const searchNews = cache(
  async (query: string, language = "es", sortBy = "publishedAt", pageSize = 10, page = 1): Promise<NewsResponse> => {
    const params: Record<string, string | number> = {
      q: query,
      language,
      sortBy,
      pageSize,
      page,
    }

    return fetchFromNewsApi("everything", params)
  },
)

