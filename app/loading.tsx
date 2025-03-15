"use client";

import { Skeleton } from "@heroui/react"

export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <Skeleton className="w-full h-[600px] rounded-lg mb-12" />

      <div className="w-full">
        <Skeleton className="w-full h-16 rounded-lg mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Skeleton className="h-10 w-60 rounded-lg mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="rounded-lg">
                    <div className="h-[300px] rounded-lg bg-default-300"></div>
                  </Skeleton>
                ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Skeleton className="h-[500px] rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

