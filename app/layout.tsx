import type React from "react"
import "@/styles/globals.css"
import type { Metadata, Viewport } from "next"
import { Link } from "@heroui/link"
import clsx from "clsx"

import { Providers } from "./providers"
import { fontSans } from "@/config/fonts"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: {
    default: "NewsExplorer - Explora las noticias del mundo",
    template: `%s - NewsExplorer`,
  },
  description: "Mantente informado con las últimas noticias de fuentes confiables",
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://github.com/ilanangelesrodriguez"
                title="Mi Perfil"
              >
                <span className="text-default-600">Desarrollado por </span>
                <p className="text-primary">Ilan Angeles</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}

