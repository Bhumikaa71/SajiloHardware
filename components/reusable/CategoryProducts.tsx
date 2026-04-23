/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import products from "@/data/products.json";
import ProductGrid from "./ProductGrid";

type ProductCategory = keyof typeof products;

type AllProductsProps = {
  priceRange: string;
  category: ProductCategory;
};

const ITEMS_PER_PAGE = 6;

function CategoryProducts({ priceRange, category }: AllProductsProps) {
  const allProducts = useMemo(() => {
    return products[category] || [];
  }, [category]);

  const [sortType, setSortType] = useState("price-asc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);

      filtered = filtered.filter(
        (product: any) => product.price >= min && product.price <= max,
      );
    }

    switch (sortType) {
      case "price-asc":
        return filtered.sort((a: any, b: any) => a.price - b.price);

      case "price-desc":
        return filtered.sort((a: any, b: any) => b.price - a.price);

      case "name-asc":
        return filtered.sort((a: any, b: any) =>
          (a.name || "")
            .toLowerCase()
            .localeCompare((b.name || "").toLowerCase()),
        );

      case "name-desc":
        return filtered.sort((a: any, b: any) =>
          (b.name || "")
            .toLowerCase()
            .localeCompare((a.name || "").toLowerCase()),
        );

      default:
        return filtered;
    }
  }, [priceRange, sortType, allProducts]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE,
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* HEADER */}
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        {/* TITLE */}
        <h1 className="text-base sm:text-lg md:text-2xl font-semibold text-gray-800 capitalize">
          {category.replace(/_/g, " ")} Products
        </h1>

        {/* CONTROLS (SORT + FILTER) */}
        <div className="flex flex-row items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* SORT */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Sort By:
            </span>

            <select
              className="border px-3 py-2 rounded-md text-sm outline-none flex-1 md:flex-none min-w-0"
              value={sortType}
              onChange={(e) => {
                setSortType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </select>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="w-full">
        <ProductGrid products={paginatedProducts} />
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-2 mt-8 flex-nowrap">
        {/* PREV */}
        <button
          className="px-4 py-2 text-sm sm:text-base border rounded-md disabled:opacity-50 sm:w-auto"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        <div className="flex flex-wrap justify-center gap-2 max-w-full overflow-x-auto">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm sm:text-base border rounded-md whitespace-nowrap ${
                currentPage === i + 1 ? "bg-black text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* NEXT */}
        <button
          className="px-4 py-2 text-sm sm:text-base border rounded-md disabled:opacity-50 sm:w-auto"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CategoryProducts;
