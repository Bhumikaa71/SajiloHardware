// "use client";

// import products from "@/data/products.json";
// import ProductSection from "@/components/reusable/ProductSection";
// import { useGetNewArrivalsQuery } from "@/services/productApi";

// export default function PowerTools() {
//   const powertools = products.power_tools.filter((item) => item.powertools);
//   const {data: newArrivals} = useGetNewArrivalsQuery();

//   console.log("New Arrivals:", newArrivals);

//   return <ProductSection title="New Arrivals" products={newArrivals?.data ?? [] || []} />;
// }


// "use client";

// import ProductSection from "@/components/reusable/ProductSection";
// import {  useGetNewArrivalsQuery } from "@/services/productApi";

// export default function BestSelling() {
//   const { data: bestSellingProducts } = useGetNewArrivalsQuery();

//   return <ProductSection title="Best Selling" products={bestSellingProducts?.data ?? []} />;
// }




// "use client";

// import products from "@/data/products.json";
// import ProductSection from "@/components/reusable/ProductSection";
// import { useGetBestSellingProductsQuery } from "@/services/categoryApi";

// export default function BestSelling() {
//   // const bestSellingProducts = products.best_selling.filter(
//   //   (item) => item.best_selling === true,
//   // );
//     const { data: bestSellingProducts } = useGetBestSellingProductsQuery();

//   return <ProductSection title="Best Selling" products={bestSellingProducts?.data} />;
// }





"use client";

import ProductSection from "@/components/reusable/ProductSection";
import ProductSectionFlat from "@/components/reusable/ProductSectionFlat";
import { useGetBestSellingProductsQuery, useGetNewArrivalsQuery } from "@/services/productApi";
import { useState } from "react";

export default function NewArrivals() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useGetNewArrivalsQuery();

  const products = data?.data ?? [];
  const hasMore = products.length === limit;

  const handleLoadMore = () => {
    if (hasMore && !isFetching) setPage((prev) => prev + 1);
  };

  // With this — always render, show empty state instead:
if (isLoading && (!products || products.length === 0)) {
  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto bg-white">
      <div className="mb-6 flex items-center justify-between px-1">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shrink-0 w-[80%] sm:w-[48%] md:w-[32%] lg:w-[23%]">
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

// Only return null if NOT loading and still empty (real empty state)
if (!isLoading && (!products || products.length === 0)) return null;

  return (
    <ProductSectionFlat
      title="New Arrivals"
      products={products}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      isLoading={isLoading}
    />
  );
}