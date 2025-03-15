"use client"

import { Tabs, Tab } from "@heroui/react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { siteConfig } from "@/config/site"
import { FaGlobe, FaBriefcase, FaMicrochip, FaFilm, FaHeartbeat, FaFlask, FaFutbol } from "react-icons/fa"
import { useCallback } from "react"

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "FaGlobe":
      return <FaGlobe />
    case "FaBriefcase":
      return <FaBriefcase />
    case "FaMicrochip":
      return <FaMicrochip />
    case "FaFilm":
      return <FaFilm />
    case "FaHeartbeat":
      return <FaHeartbeat />
    case "FaFlask":
      return <FaFlask />
    case "FaFutbol":
      return <FaFutbol />
    default:
      return <FaGlobe />
  }
}

export const CategoryTabs = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "general"

  const handleCategoryChange = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("category", category)
      router.push(`/?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-8 sticky top-16 bg-background/80 backdrop-blur-md z-30 pt-4 pb-2 px-2"
    >
      <Tabs
        aria-label="Categorías de noticias"
        color="primary"
        variant="underlined"
        selectedKey={currentCategory}
        onSelectionChange={(key) => handleCategoryChange(key as string)}
        classNames={{
          base: "w-full overflow-x-auto",
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        {siteConfig.categories.map((category) => (
          <Tab
            key={category.id}
            title={
              <div className="flex items-center gap-2">
                {getIconComponent(category.icon)}
                <span>{category.name}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    </motion.div>
  )
}
