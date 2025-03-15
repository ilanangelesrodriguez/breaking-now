"use client";
import { Skeleton } from "@heroui/react"
import { FaSearch } from "react-icons/fa"

export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center w-full py-8">
      <div className="w-full mb-8">
        <div className="flex items-center gap-3 mb-6">
          <FaSearch className="text-primary" size={24} />
          <Skeleton className="h-10 w-80 rounded-lg" />
        </div>

        <Skeleton className="h-5 w-40 rounded-lg mb-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="rounded-lg">
              <div className="h-[300px] rounded-lg bg-default-300"></div>
            </Skeleton>
          ))}
      </div>
    </section>
  )
}


  