"use client"

import type React from "react"

import { motion } from "framer-motion"
import { FaSearch, FaChevronDown, FaBookmark, FaShare } from "react-icons/fa"
import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export const NewsHero = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentBackground, setCurrentBackground] = useState(0)
  const router = useRouter()

  const backgrounds = [
    "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3856050/pexels-photo-3856050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1369476/pexels-photo-1369476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [backgrounds.length])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-[600px] flex items-center justify-center mb-12"
    >
      {backgrounds.map((bg, index) => (
        <motion.div
          key={bg}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${bg}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentBackground === index ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-0" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-2"
        >
          <Chip color="primary" variant="faded" className="mb-4">
            Noticias en tiempo real
          </Chip>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Explora las noticias del mundo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-gray-200 mb-8"
        >
          Mantente informado con las últimas noticias de fuentes confiables
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Input
            classNames={{
              base: "max-w-md",
              input: "text-base",
            }}
            placeholder="Buscar noticias..."
            size="lg"
            startContent={<FaSearch className="text-default-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button color="primary" size="lg" type="submit">
            Buscar
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2"
        >
          <p className="text-white mr-2">Tendencias:</p>
          {["COVID-19", "Economía", "Tecnología", "Deportes", "Política"].map((tag) => (
            <Chip
              key={tag}
              variant="flat"
              color="default"
              className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
              onClick={() => router.push(`/search?q=${tag}`)}
            >
              {tag}
            </Chip>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button
          isIconOnly
          variant="light"
          aria-label="Scroll down"
          className="text-white animate-bounce"
          onPress={scrollToContent}
        >
          <FaChevronDown />
        </Button>
      </motion.div>

    </motion.div>
  )
}
