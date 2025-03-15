"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { MdLock } from "react-icons/md"

export default function Unauthorized() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <MdLock className="w-24 h-24 mx-auto text-red-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">401 - No autorizado</h1>
        <p className="text-xl mb-4">Lo sentimos, no tienes permiso para acceder a esta página.</p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 30 }}
        >
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Volver al inicio
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
