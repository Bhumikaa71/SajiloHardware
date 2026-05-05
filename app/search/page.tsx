// "use client";

// import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";
// import { useSearchParams } from "next/navigation";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query");

//   return (
//     <>
//       <Navbar />

//       <div className="bg-white min-h-screen -mt-14">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-16 sm:mt-0 lg:mt-24 pt-20 lg:pt-38">
//           <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black">
//             Search Results for:{" "}
//             <span className="text-primarys break-words">{query}</span>
//           </h1>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductSection from "@/components/reusable/ProductSection";
import { useSearchProductsQuery } from "@/services/productApi";
import ProductSectionFlat from "@/components/reusable/ProductSectionFlat";

export default function SearchPage() {
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

    // 1. Read the correct data key based on your response payload (Array inside data)
    const responseData = (data as any)?.data || [];
    const newProducts = Array.isArray(responseData) ? responseData : [];

    setProducts((prev) => {
      const next = page === 1 ? newProducts : [...prev, ...newProducts];
      
      // 2. Safely compute hasMore
      setHasMore(newProducts.length > 0 && next.length < (data as any)?.results);

      return next;
    });
  // Added page and data to the dependency array to correctly trigger updates when new pages are fetched
  }, [data, page]);

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Navbar />

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

      <Footer />
    </>
  );
}