
"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AllProducts from "@/components/reusable/AllProducts";
import HotDeals from "@/components/reusable/HotDeals";
import {
  useGetAllProductsQuery,
  useGetProductByCategoriesQuery,
} from "@/services/productApi";
import { useParams } from "next/navigation";


function ProductsByCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange] = useState("all");
  const [categoryName] = useState("");
  const [brandName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ FIXED PARAMS
  const params = useParams();
  const subCategoriesName = params?.slug as string;

  const { data: categoryProducts, isLoading } =
    useGetProductByCategoriesQuery({
      categorySlug: subCategoriesName,
      page: currentPage,
      limit: 9,
    });

  const { data: allProducts } = useGetAllProductsQuery({
    page: currentPage,
    limit: 9,
    category: categoryName || undefined,
    brand: brandName || undefined,
  });

  return (
    <div className="bg-white">
      <Navbar />

      <div className="lg:pt-30">
        <HotDeals />
      </div>

      <div className="bg-gray-50 text-primarys">
        <div className="max-w-7xl mx-auto px-4">
          {/* MOBILE TOP BAR */}
          <div className="md:hidden flex justify-between items-center py-3">
            <h1 className="font-semibold text-lg">Shop</h1>
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-3 py-1 border rounded bg-white"
            >
              Filters
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 py-4 md:py-6 items-start">
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* PRODUCTS */}
            <div className="flex-1 min-w-0 w-full">
              <AllProducts
                priceRange={priceRange}
                productList={categoryProducts?.data || []}
                isLoading={isLoading}
                currentPage={currentPage}
                totalPages={categoryProducts?.totalPages || 1}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductsByCategory;