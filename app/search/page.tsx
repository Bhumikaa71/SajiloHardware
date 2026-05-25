"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductSectionFlat from "@/components/reusable/ProductSectionFlat";
import { useSearchProductsQuery } from "@/services/productApi";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch data using the RTK Query hook
  const { data, isLoading, isFetching } = useSearchProductsQuery(
    { query, page },
    {
      skip: !query, // Skip the query if there is no search query
    }
  );

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    if (!data) return;

    // Read the correct data key based on your response payload (Array inside data)
    const responseData = (data as any)?.data || [];
    const newProducts = Array.isArray(responseData) ? responseData : [];

    setProducts((prev) => {
      const next = page === 1 ? newProducts : [...prev, ...newProducts];
      
      // Safely compute hasMore
      setHasMore(newProducts.length > 0 && next.length < (data as any)?.results);

      return next;
    });
  }, [data, page]);

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white min-h-screen -mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-10 sm:mt-0 lg:mt-24 pt-10 lg:pt-25">
        {/* Product Section Display */}
        {isLoading && products.length === 0 ? (
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="shrink-0 w-[48%] md:w-[32%] lg:w-[23%]">
                <div className="rounded-2xl border border-gray-100 p-3 flex flex-col gap-3">
                  <div className="w-full aspect-square bg-gray-200 rounded-xl animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-9 bg-gray-200 rounded-xl animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <ProductSectionFlat
            title={`Found results for "${query}"`}
            products={products}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            isLoading={isFetching}
          />
        ) : (
          // Empty State
          !isLoading && (
            <div className="text-center py-20 text-gray-500">
              No products found for the search term. Try a different term.
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
          </div>
        }
      >
        <SearchContent />
      </Suspense>
      <Footer />
    </>
  );
}