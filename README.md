# 📰 Breaking Now

## 📋 Descripción

Breaking Now es una aplicación web moderna desarrollada con Next.js que permite a los usuarios explorar noticias en tiempo real de diversas fuentes utilizando la API de News API. Diseñada como solución al desafío de DataExplorer, esta plataforma interactiva ofrece una experiencia intuitiva para descubrir, filtrar y leer las últimas noticias de diferentes categorías a nivel mundial.

La aplicación permite a los usuarios mantenerse informados sobre los acontecimientos más relevantes, guardar sus artículos favoritos para lectura posterior, y personalizar su experiencia de navegación según sus intereses. Con una interfaz atractiva y funcional, Breaking Now transforma la manera en que consumimos noticias digitales.

## ✨ Características

- 🔍 **Exploración por categorías**: Navega por noticias filtradas por categorías como General, Negocios, Tecnología, Entretenimiento, Salud, Ciencia y Deportes.
- 🔎 **Búsqueda avanzada**: Busca noticias específicas con opciones de filtrado por idioma y ordenamiento (relevancia, popularidad o fecha).
- 📄 **Visualización de artículos**: Lee artículos completos con imágenes y enlaces a las fuentes originales.
- ❤️ **Sistema de favoritos**: Guarda artículos en favoritos utilizando localStorage para acceder a ellos posteriormente.
- 📑 **Artículos guardados**: Almacena artículos para lectura posterior con persistencia en el navegador.
- 📱 **Interfaz responsiva**: Diseño adaptable a dispositivos móviles y de escritorio.
- 🌓 **Modo oscuro/claro**: Soporte para tema claro y oscuro según preferencia del usuario.
- 🔄 **Actualización en tiempo real**: Obtén las noticias más recientes con un simple clic.
- ⚡ **Carga optimizada**: Implementación de Server Components para mejorar el rendimiento.
- 📊 **Paginación**: Navega fácilmente entre múltiples páginas de resultados.

## 🛠️ Tecnologías utilizadas

- 🔷 **Next.js 14**: Framework de React con soporte para Server Components y App Router.
- ⚛️ **React**: Biblioteca para construir interfaces de usuario.
- 📘 **TypeScript**: Superset de JavaScript con tipado estático.
- 🎨 **Tailwind CSS**: Framework de CSS utilitario para estilos.
- 🦸 **HeroUI**: Componentes UI personalizados basados en Tailwind.
- 🎭 **Framer Motion**: Biblioteca para animaciones fluidas.
- 🌐 **News API**: API externa para obtener datos de noticias en tiempo real.
- 💾 **LocalStorage API**: Para persistencia de datos en el navegador.

## 🔑 Variables de entorno

- `NEWS_API_KEY`: Clave de API para acceder a News API (obligatoria)

## 🌐 Endpoints de API utilizados

La aplicación utiliza los siguientes endpoints de News API:

- 📰 **Top Headlines**: `GET https://newsapi.org/v2/top-headlines`
  - Parámetros: country, category, pageSize, page
  - Utilizado para obtener las noticias principales y por categoría

- 🔍 **Everything**: `GET https://newsapi.org/v2/everything`
  - Parámetros: q (query), language, sortBy, pageSize, page
  - Utilizado para búsquedas y para obtener artículos específicos

## 🔄 CI/CD y Flujo de Trabajo

### 🚀 Integración y Despliegue Continuo

Breaking News utiliza GitHub Actions para automatizar el proceso de integración y despliegue continuo:

- 🧪 **Pruebas Automáticas**: Cada pull request y push a las ramas principales activa pruebas automáticas y linting.
- 🚀 **Despliegue Automático**: Los cambios en la rama `main` se despliegan automáticamente a producción.
- 📦 **Releases Automáticos**: La creación de tags con el formato `v*.*.*` genera automáticamente releases en GitHub.

### 🌊 Git Flow

Este proyecto sigue la metodología Git Flow para gestionar el desarrollo:

- 🛠️ **main**: Rama de producción estable
- 🧪 **develop**: Rama de desarrollo e integración
- ✨ **feature/**: Ramas para nuevas características
- 🐛 **hotfix/**: Ramas para correcciones urgentes
- 🚀 **release/**: Ramas para preparar nuevas versiones

#### Flujo de trabajo:

1. Se crean ramas `feature/nombre-caracteristica` desde `develop`
2. Al completar la característica, se fusiona de vuelta a `develop` mediante pull request
3. Para preparar un release, se crea una rama `release/v*.*.*` desde `develop`
4. Después de pruebas, la rama `release` se fusiona tanto en `main` como en `develop`
5. Se crea un tag en `main` para generar automáticamente un release

## 🧩 Componentes principales

### 🖥️ Server Components

- **Página principal**: Muestra noticias por categoría con pestañas interactivas
- **Página de búsqueda**: Interfaz para buscar y filtrar noticias con múltiples criterios
- **Página de artículo**: Visualización detallada de un artículo individual
- **Páginas de categorías**: Secciones dedicadas para cada categoría de noticias
- **Páginas de favoritos y guardados**: Acceso a artículos guardados por el usuario

### 💻 Client Components

- **NewsHero**: Banner principal con búsqueda y tendencias
- **CategoryTabs**: Pestañas para filtrar por categoría
- **NewsGrid**: Cuadrícula para mostrar tarjetas de noticias
- **NewsCard**: Tarjeta individual para cada noticia con opciones para guardar y marcar como favorito
- **TrendingNews**: Sección lateral de noticias tendencia
- **ArticleContent**: Contenido detallado de un artículo
- **SearchHeader**: Cabecera de la página de búsqueda con filtros avanzados
- **NewsPagination**: Paginación para navegar entre resultados
- **PageAttachment**: Panel flotante para acceder rápidamente a favoritos y guardados


## ❓ Solución de problemas

### 🔒 Error 401 (Unauthorized)

Si recibes un error 401 al intentar acceder a la API, verifica:
- Que tu clave de API sea válida y esté correctamente configurada en las variables de entorno
- Que estés utilizando la API desde componentes del servidor, ya que News API no permite solicitudes desde el navegador en su plan gratuito

### 🖼️ Imágenes no cargadas

Si las imágenes no se cargan correctamente:
- Verifica que el dominio de la imagen esté permitido en la configuración de Next.js
- Asegúrate de que las URLs de las imágenes sean válidas y accesibles

### 📝 Errores de TypeScript

Si encuentras errores de tipado:
- Verifica que todas las interfaces y tipos estén correctamente definidos
- Asegúrate de que los componentes reciban las props con los tipos correctos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## 👨‍💻 Autor

**Ilan Angeles Rodriguez**
- GitHub: [ilanangelesrodriguez](https://github.com/ilanangelesrodriguez)
