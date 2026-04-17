/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import products from "@/data/products.json";
import ProductGrid from "./ProductGrid";

type AllProductsProps = {
  priceRange: string;
};

const ITEMS_PER_PAGE = 9;

function AllProducts({ priceRange }: AllProductsProps) {
  const allProducts = Object.values(products).flat();

  const [sortType, setSortType] = useState("price-asc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // FILTER
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);

      filtered = filtered.filter(
        (product: any) => product.price >= min && product.price <= max,
      );
    }

    // SORT
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

  // PAGINATION
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE,
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto w-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        {/* TITLE */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          All Products
        </h1>

        {/* SORT */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <span className="text-sm text-gray-600 hidden sm:block">
            Sort By:
          </span>

          <select
            className="border px-3 py-2 rounded text-sm outline-none w-full sm:w-auto"
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

      {/* GRID */}
      <ProductGrid products={paginatedProducts} />

      {/* PAGINATION */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
        {/* PREV */}
        <button
          className="px-3 py-1 text-sm sm:text-base border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm sm:text-base border rounded ${
                currentPage === i + 1 ? "bg-black text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* NEXT */}
        <button
          className="px-3 py-1 text-sm sm:text-base border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
