import { NewsGrid } from "@/components/news/news-grid"
import { NewsPagination } from "@/components/news/news-pagination"
import { SearchHeader } from "@/components/news/search-header"
import { searchNews } from "@/services"

export default async function SearchPage(props: any) {
  // Extraemos searchParams de props
  const searchParams = props.searchParams || {}

  const query = searchParams.q || ""
  const page = Number.parseInt(searchParams.page || "1", 10)
  const sortBy = searchParams.sortBy || "publishedAt"
  const language = searchParams.language || "es"
  const pageSize = 12

  const newsData = await searchNews(query, language, sortBy, pageSize, page)

  return (
    <section className="flex flex-col items-center justify-center w-full py-8">
      <SearchHeader query={query} totalResults={newsData.totalResults} />

      <NewsGrid articles={newsData.articles} />

      <NewsPagination totalResults={newsData.totalResults} currentPage={page} pageSize={pageSize} />
    </section>
  )
}


