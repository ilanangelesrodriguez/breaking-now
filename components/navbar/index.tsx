"use client"

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Button,
  Badge,
} from "@heroui/react"
import { link as linkStyles } from "@heroui/theme"
import { usePathname, useRouter } from "next/navigation"
import clsx from "clsx"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaNewspaper, FaSearch, FaBookmark, FaHeart } from "react-icons/fa"

import { siteConfig } from "@/config/site"
import { ThemeSwitch } from "@/components/theme-switch"
import { useFavorites } from "@/hooks/use-favorites"
import { useSavedArticles } from "@/hooks/use-saved-articles"
import { MobileMenu } from "./mobile-menu"
import { SearchOverlay } from "./search-overlay"

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { favorites } = useFavorites()
  const { saved } = useSavedArticles()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }

  return (
    <>
      <HeroUINavbar
        maxWidth="xl"
        className={`fixed top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : ""}`}
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <a
              className="flex justify-start items-center gap-2"
              href="/"
              onClick={(e) => {
                e.preventDefault()
                handleNavigation("/")
              }}
            >
              <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <FaNewspaper className="text-primary" size={24} />
              </motion.div>
              <p className="font-bold text-inherit">NewsExplorer</p>
            </a>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <NavbarItem key={item.href}>
                  <Button
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium relative py-2 text-sm bg-transparent",
                    )}
                    color="default"
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation(item.href)
                    }}
                    data-active={isActive}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="navbar-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Button>
                </NavbarItem>
              )
            })}
          </ul>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          
          <NavbarItem>
            <Button isIconOnly variant="light" aria-label="Favoritos" onPress={() => handleNavigation("/favorites")}>
              <Badge size="sm" content={favorites.length} color="danger" isInvisible={favorites.length === 0}>
                <FaHeart />
              </Badge>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button isIconOnly variant="light" aria-label="Guardados" onPress={() => handleNavigation("/saved")}>
              <Badge size="sm" content={saved.length} color="primary" isInvisible={saved.length === 0}>
                <FaBookmark />
              </Badge>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <NavbarItem>
            <Button isIconOnly variant="light" aria-label="Favoritos" onPress={() => handleNavigation("/favorites")}>
              <Badge content={favorites.length} color="danger" isInvisible={favorites.length === 0}>
                <FaHeart />
              </Badge>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button isIconOnly variant="light" aria-label="Guardados" onPress={() => handleNavigation("/saved")}>
              <Badge content={saved.length} color="primary" isInvisible={saved.length === 0}>
                <FaBookmark />
              </Badge>
            </Button>
          </NavbarItem>
          <NavbarMenuToggle />
        </NavbarContent>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </HeroUINavbar>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
