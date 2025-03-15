import type { NewsResponse } from "@/models/news-response.model"

const API_BASE_URL = "https://newsapi.org/v2"
const DEFAULT_REVALIDATION_TIME = 3600

export const getApiKey = (): string => {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) {
    console.warn("NEWS_API_KEY no está definido en las variables de entorno")
    return ""
  }
  return apiKey
}

export async function fetchFromNewsApi(
  endpoint: string,
  params: Record<string, string | number>,
): Promise<NewsResponse> {
  try {
    const apiKey = getApiKey()

    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })

    queryParams.append("apiKey", apiKey)
    const url = `${API_BASE_URL}/${endpoint}?${queryParams.toString()}`

    const response = await fetch(url, {
      next: { revalidate: DEFAULT_REVALIDATION_TIME },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching from News API (${endpoint}):`, error)
    return {
      status: "error",
      totalResults: 0,
      articles: [],
    }
  }
}
