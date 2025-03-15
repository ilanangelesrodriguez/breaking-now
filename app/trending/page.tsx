import { NewsGrid } from "@/components/news/news-grid"
import { PageAttachment } from "@/components/SavedArticle/page-attachment"
import { getTopHeadlines } from "@/services"
import { FaFire, FaChartLine } from "react-icons/fa"

export default async function TrendingPage() {

  const usNews = await getTopHeadlines("us", "general", 6, 1)
  const ukNews = await getTopHeadlines("gb", "general", 6, 1)
  const canadaNews = await getTopHeadlines("ca", "general", 6, 1)

  return (
    <section className="flex flex-col items-center justify-center w-full py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <FaFire className="text-red-500 text-3xl" />
          <h1 className="text-4xl font-bold">Tendencias</h1>
        </div>

        <p className="text-default-500 mb-12">Las noticias más populares y tendencias del momento a nivel mundial.</p>

        <div className="grid gap-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-primary" />
              <h2 className="text-2xl font-bold">Estados Unidos</h2>
            </div>
            <NewsGrid articles={usNews.articles} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-primary" />
              <h2 className="text-2xl font-bold">Reino Unido</h2>
            </div>
            <NewsGrid articles={ukNews.articles} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FaChartLine className="text-primary" />
              <h2 className="text-2xl font-bold">Canadá</h2>
            </div>
            <NewsGrid articles={canadaNews.articles} />
          </div>
        </div>
      </div>
      <PageAttachment />
    </section>
  )
}

