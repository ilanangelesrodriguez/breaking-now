import { NewsGrid } from "@/components/news/news-grid"
import { PageAttachment } from "@/components/SavedArticle/page-attachment"
import { siteConfig } from "@/config/site"
import { getTopHeadlines } from "@/services"

export default async function CategoriesPage() {

    const categoriesWithArticles = await Promise.all(
    siteConfig.categories.map(async (category) => {
      const data = await getTopHeadlines("us", category.id, 6, 1)
      return {
        ...category,
        articles: data.articles,
      }
    }),
  )

  return (
    <section className="flex flex-col items-center justify-center w-full py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Categorías</h1>
        <div className="grid gap-12 mt-8">
          {categoriesWithArticles.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold">{category.name}</h2>
              </div>
              <NewsGrid articles={category.articles} />
            </div>
          ))}
        </div>
      </div>
      <PageAttachment />
    </section>
  )
}

