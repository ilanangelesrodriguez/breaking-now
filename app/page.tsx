import { NewsHero } from "@/components/news/news-hero"
import { CategoryTabs } from "@/components/news/category-tabs"
import { NewsGrid } from "@/components/news/news-grid"
import { NewsPagination } from "@/components/news/news-pagination"
import { TrendingNews } from "@/components/news/trending-news"
import { PageAttachment } from "@/components/SavedArticle/page-attachment"
import { getTopHeadlines } from "@/services"

interface HomePageProps {
  searchParams: {
    category?: string
    page?: string
  }
}

export default async function Home({ searchParams }: HomePageProps) {
  const category = searchParams.category || "general"
  const page = Number.parseInt(searchParams.page || "1", 10)
  const pageSize = 9

  const newsData = await getTopHeadlines("us", category, pageSize, page)
  const trendingNews = await getTopHeadlines("us", "general", 5, 1)

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <NewsHero />

      <div className="w-full">
        <CategoryTabs />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6">Noticias principales</h2>
            <NewsGrid articles={newsData.articles} />
            <NewsPagination totalResults={newsData.totalResults} currentPage={page} pageSize={pageSize} />
          </div>

          <div className="lg:col-span-1">
            <TrendingNews articles={trendingNews.articles} />
          </div>
        </div>
      </div>

      <PageAttachment />
    </section>
  )
}


