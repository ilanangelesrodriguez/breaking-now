import { Button, Card, CardBody, Tooltip, Image } from "@heroui/react"
import { formatDistanceToNow } from "date-fns"
import { FaBookmark, FaHeart } from "react-icons/fa"
import { es } from "date-fns/locale"

interface SavedArticleCardProps {
    article: any
    type: "favorites" | "saved"
    onRemove: () => void
    onArticleClick: () => void
}

export const SavedArticleCard = ({ article, type, onRemove, onArticleClick }: SavedArticleCardProps) => {
    const formattedDate = article.publishedAt
      ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: es })
      : "Fecha desconocida"
  
    const placeholderImage =
      "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  
    return (
      <Card className="w-full overflow-hidden">
        <CardBody className="py-6">
          <div className="flex h-20 border-b border-divider">
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden z-1">
              <Image
                src={article.urlToImage || placeholderImage}
                alt={article.title}
                className="w-[50vw] h-[10vh] object-cover transition-transform duration-500 z-1"
                fallbackSrc={placeholderImage}
              />
            </div>
            <div className="flex-1 p-2 flex flex-col justify-between relative">
              <div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onArticleClick()
                  }}
                  className="hover:text-primary transition-colors"
                >
                  <Tooltip content={article.title}>
                    <h3 className="font-medium text-sm line-clamp-2 pr-7">{article.title}</h3>
                  </Tooltip>
                </a>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-default-500">{formattedDate}</p>
                <p className="text-xs font-medium">{article.source.name}</p>
              </div>
              <Button
                isIconOnly
                size="sm"
                color={type === "favorites" ? "danger" : "primary"}
                variant="light"
                className="min-w-0 w-6 h-6 p-0 absolute top-1 right-1"
                onPress={onRemove}
              >
                {type === "favorites" ? <FaHeart size={12} /> : <FaBookmark size={12} />}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    )
}
