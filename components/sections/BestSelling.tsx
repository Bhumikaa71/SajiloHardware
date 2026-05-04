"use client";

import ProductSection from "@/components/reusable/ProductSection";
import { useGetBestSellingProductsQuery } from "@/services/productApi";
import { useState } from "react";

export default function BestSelling() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetBestSellingProductsQuery({ page, limit });

  const products = data?.data ?? [];
  const hasMore = products.length === limit;

  const handleLoadMore = () => {
    if (hasMore && !isLoading) setPage((prev) => prev + 1);
  };

  const isFirstLoad = !data && isLoading;

  if (isFirstLoad) {
    return (
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto bg-white">
        <div className="mb-6 flex items-center justify-between px-1">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[23%]"
            >
              <div className="rounded-2xl border border-gray-100 p-3 flex flex-col gap-3">
                <div className="w-full aspect-square bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-9 bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-9 bg-green-100 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <ProductSection
      title="Best Selling"
      products={products}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
}
