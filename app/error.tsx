"use client"

import { useEffect } from "react"
import { Button } from "@heroui/button"
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
      <h2 className="text-2xl font-bold mb-4">¡Algo salió mal!</h2>
      <p className="text-default-500 max-w-md mb-6">
        Lo sentimos, ha ocurrido un error al cargar esta página. Puedes intentar recargarla o volver a la página de
        inicio.
      </p>
      <div className="flex gap-4">
        <Button color="primary" startContent={<FaRedo />} onClick={() => reset()}>
          Intentar de nuevo
        </Button>
        <Button variant="bordered" startContent={<FaHome />} onClick={() => (window.location.href = "/")}>
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}

