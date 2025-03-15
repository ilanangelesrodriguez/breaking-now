"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button, Tabs, Tab } from "@heroui/react"
import { FaHeart, FaBookmark, FaTimes, FaTrash } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { useSavedArticles } from "@/hooks/use-saved-articles"
import { useCurrentArticle } from "@/hooks/use-current-article"
import { SavedArticleCard } from "./SavedArticleCard"

export const PageAttachment = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("favorites")
  const router = useRouter()
  const { favorites, toggleFavorite, clearAllFavorites } = useFavorites()
  const { saved, toggleSaved, clearAllSaved } = useSavedArticles()
  const { setCurrentArticle } = useCurrentArticle()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col sm:flex-row gap-3">
        <Button
          color={activeTab === "favorites" ? "danger" : "default"}
          variant="flat"
          className="shadow-md bg-background/90 backdrop-blur-sm"
          onPress={() => {
            setActiveTab("favorites")
            setIsOpen(true)
          }}
        >
          <div className="flex items-center gap-2">
            <FaHeart />
            <span>Favoritos</span>
            <span className="bg-danger/20 text-danger px-2 py-0.5 rounded-full text-xs font-medium">
              {favorites.length}
            </span>
          </div>
        </Button>
        <Button
          color={activeTab === "saved" ? "primary" : "default"}
          variant="flat"
          className="shadow-md bg-background/90 backdrop-blur-sm"
          onPress={() => {
            setActiveTab("saved")
            setIsOpen(true)
          }}
        >
          <div className="flex items-center gap-2">
            <FaBookmark />
            <span>Guardados</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
              {saved.length}
            </span>
          </div>
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-divider shadow-lg rounded-t-xl"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <div className="sticky top-0 bg-background z-10 p-4 border-b border-divider flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {activeTab === "favorites" ? "Mis Artículos Favoritos" : "Mis Artículos Guardados"}
                </h2>
                <Button isIconOnly size="sm" variant="light" onPress={() => setIsOpen(false)}>
                  <FaTimes />
                </Button>
              </div>

              <Tabs
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                className="px-4 pt-2"
                classNames={{
                  tabList: "gap-2 justify-center",
                  tab: "px-2",
                  tabContent: "group-data-[selected=true]:font-semibold",
                }}
              >
                <Tab
                  key="favorites"
                  title={
                    <div className="flex items-center gap-2">
                      <FaHeart className="text-danger" />
                      <span>Favoritos</span>
                      <span className="bg-danger/20 text-danger px-2 py-0.5 rounded-full text-xs font-medium">
                        {favorites.length}
                      </span>
                    </div>
                  }
                >
                  {favorites.length > 0 ? (
                    <div className="mt-0">
                      <div className="flex justify-end mb-3 mr-4">
                        <Button
                          size="sm"
                          variant="flat"
                          color="danger"
                          startContent={<FaTrash size={14} />}
                          onPress={clearAllFavorites}
                        >
                          Limpiar favoritos
                        </Button>
                      </div>
                      <div className="mx-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {favorites.map((article, index) => (
                          <SavedArticleCard
                            key={`fav-${index}`}
                            article={article}
                            type="favorites"
                            onRemove={() => toggleFavorite(article)}
                            onArticleClick={() => {
                              setCurrentArticle(article)
                              router.push(
                                `/article/${article.title
                                  .toLowerCase()
                                  .replace(/[^\w\s]/gi, "")
                                  .replace(/\s+/g, "-")}`,
                              )
                              setIsOpen(false)
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-default-500">
                      <FaHeart className="text-default-300 text-3xl mx-auto mb-2" />
                      <p>No tienes artículos favoritos</p>
                      <Button
                        color="primary"
                        variant="flat"
                        size="sm"
                        className="mt-2"
                        onPress={() => {
                          setIsOpen(false)
                          router.push("/")
                        }}
                      >
                        Explorar noticias
                      </Button>
                    </div>
                  )}
                </Tab>
                <Tab
                  key="saved"
                  title={
                    <div className="flex items-center gap-2">
                      <FaBookmark className="text-primary" />
                      <span>Guardados</span>
                      <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                        {saved.length}
                      </span>
                    </div>
                  }
                >
                  {saved.length > 0 ? (
                    <div className="mt-0">
                      <div className="flex justify-end mb-3 mr-4">
                        <Button
                          size="sm"
                          variant="flat"
                          color="danger"
                          startContent={<FaTrash size={14} />}
                          onPress={clearAllSaved}
                        >
                          Limpiar guardados
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mx-4">
                        {saved.map((article, index) => (
                          <SavedArticleCard
                            key={`saved-${index}`}
                            article={article}
                            type="saved"
                            onRemove={() => toggleSaved(article)}
                            onArticleClick={() => {
                              setCurrentArticle(article)
                              router.push(
                                `/article/${article.title
                                  .toLowerCase()
                                  .replace(/[^\w\s]/gi, "")
                                  .replace(/\s+/g, "-")}`,
                              )
                              setIsOpen(false)
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center pb-8 text-default-500">
                      <FaBookmark className="text-default-300 text-3xl mx-auto mb-2" />
                      <p>No tienes artículos guardados</p>
                      <Button
                        color="primary"
                        variant="flat"
                        size="sm"
                        className="mt-2"
                        onPress={() => {
                          setIsOpen(false)
                          router.push("/")
                        }}
                      >
                        Explorar noticias
                      </Button>
                    </div>
                  )}
                </Tab>
              </Tabs>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}



