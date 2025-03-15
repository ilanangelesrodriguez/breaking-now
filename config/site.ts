export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "NewsExplorer",
  description: "Explora las noticias del mundo en un solo lugar",
  navItems: [
    {
      label: "Categorías",
      href: "/categories",
    },
    {
      label: "Tendencias",
      href: "/trending",
    },
  ],
  navMenuItems: [
    {
      label: "Perfil",
      href: "/profile",
    },
    {
      label: "Mis Noticias",
      href: "/my-news",
    },
    {
      label: "Configuración",
      href: "/settings",
    },
    {
      label: "Ayuda",
      href: "/help",
    },
    {
      label: "Cerrar Sesión",
      href: "/logout",
    },
  ],
  categories: [
    { id: "general", name: "General", icon: "FaGlobe" },
    { id: "business", name: "Negocios", icon: "FaBriefcase" },
    { id: "technology", name: "Tecnología", icon: "FaMicrochip" },
    { id: "entertainment", name: "Entretenimiento", icon: "FaFilm" },
    { id: "health", name: "Salud", icon: "FaHeartbeat" },
    { id: "science", name: "Ciencia", icon: "FaFlask" },
    { id: "sports", name: "Deportes", icon: "FaFutbol" },
  ],
  links: {
    github: "https://github.com/newsexplorer",
    twitter: "https://twitter.com/newsexplorer",
    facebook: "https://facebook.com/newsexplorer",
    instagram: "https://instagram.com/newsexplorer",
  },
}

