
"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

type AllProductsProps = {
  priceRange: string;
  productList: any[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function AllProducts({
  priceRange,
  productList,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: AllProductsProps) {
  const [sortType, setSortType] = useState("price-asc");

  const sortedProducts = useMemo(() => {
    const sorted = [...productList];
    switch (sortType) {
      case "price-asc":
        return sorted.sort((a, b) => a.dp_price - b.dp_price);
      case "price-desc":
        return sorted.sort((a, b) => b.dp_price - a.dp_price);
      case "name-asc":
        return sorted.sort((a, b) =>
          (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase())
        );
      case "name-desc":
        return sorted.sort((a, b) =>
          (b.name || "").toLowerCase().localeCompare((a.name || "").toLowerCase())
        );
      default:
        return sorted;
    }
  }, [productList, sortType]);

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto w-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          All Products
        </h1>
      </div>

      {/* GRID or SKELETON */}
      {isLoading ? (
        <ProductGridSkeleton />
      ) : sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <span className="text-4xl mb-3">📦</span>
          <p className="text-sm">No products found</p>
        </div>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}

      {/* PAGINATION */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          {/* PREV */}
          <button
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {/* PAGE NUMBERS — smart truncation */}
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .reduce((acc: (number | string)[], page, idx, arr) => {
                if (idx > 0 && (page as number) - (arr[idx - 1] as number) > 1) {
                  acc.push("...");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 py-1 text-sm">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageChange(page as number)}
                    className={`px-3 py-1 text-sm border rounded ${
                      currentPage === page ? "bg-black text-white" : ""
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
          </div>

          {/* NEXT */}
          <button
            className="px-3 py-1 text-sm border rounded disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllProducts;