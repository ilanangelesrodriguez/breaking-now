"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { NavbarMenu, NavbarMenuItem, Button, Divider, Input } from "@heroui/react"
import { FaSearch, FaHome } from "react-icons/fa"
import { siteConfig } from "@/config/site"
import { ThemeSwitch } from "@/components/theme-switch"
import { getIconComponent } from "./icons"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      onClose()
    }
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <NavbarMenu className="pt-6 px-4">
      <form onSubmit={handleSearch} className="mb-6">
        <Input
          fullWidth
          placeholder="Buscar noticias..."
          size="lg"
          startContent={<FaSearch className="text-default-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          classNames={{
            input: "text-xs",
          }}
          endContent={
            <Button color="primary" size="sm" type="submit">
              Buscar
            </Button>
          }
        />
      </form>

      <div className="grid grid-cols-1 gap-2 mb-6">
        <NavbarMenuItem>
          <Button
            onPress={() => handleNavigation("/")}
            variant={pathname === "/" ? "solid" : "light"}
            color={pathname === "/" ? "primary" : "default"}
            className="w-full justify-start"
            size="sm"
          >
            Inicio
          </Button>
        </NavbarMenuItem>
        {siteConfig.navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Button
              onPress={() => handleNavigation(item.href)}
              variant={pathname === item.href ? "solid" : "light"}
              color={pathname === item.href ? "primary" : "default"}
              className="w-full justify-start"
              size="sm"
            >
              {item.label}
            </Button>
          </NavbarMenuItem>
        ))}
      </div>

      <Divider className="my-4" />
      <h3 className="text-lg font-semibold mb-2">Categorías</h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {siteConfig.categories.map((category) => (
          <NavbarMenuItem key={category.id}>
            <Button
              onPress={() => handleNavigation(`/?category=${category.id}`)}
              variant="flat"
              className="w-full justify-start"
              startContent={getIconComponent(category.icon)}
              size="sm"
            >
              {category.name}
            </Button>
          </NavbarMenuItem>
        ))}
      </div>

      <Divider className="my-4" />
      <NavbarMenuItem className="mt-4">
        <div className="flex items-center justify-between">
          <span>Modo oscuro</span>
          <ThemeSwitch />
        </div>
      </NavbarMenuItem>
    </NavbarMenu>
  )
}
