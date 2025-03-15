"use client"

import { Pagination } from "@heroui/pagination"
import { useRouter, useSearchParams } from "next/navigation"

interface NewsPaginationProps {
  totalResults: number
  currentPage: number
  pageSize: number
  category?: string
}

export const NewsPagination = ({ totalResults, currentPage, pageSize, category }: NewsPaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(totalResults / pageSize)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())

    if (category && category !== "general") {
      params.set("category", category)
    }

    router.push(`?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center my-8">
      <Pagination
        total={totalPages}
        initialPage={currentPage}
        onChange={handlePageChange}
        color="primary"
        showControls
      />
    </div>
  )
}

