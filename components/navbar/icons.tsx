import { FaGlobe, FaBriefcase, FaMicrochip, FaFilm, FaHeartbeat, FaFlask, FaFutbol } from "react-icons/fa"

export const getIconComponent = (iconName: string) => {
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
