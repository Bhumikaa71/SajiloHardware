"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AllProducts from "@/components/reusable/AllProducts";
import ShopSidebar from "@/components/reusable/AllProductSidebar";
import HotDeals from "@/components/reusable/HotDeals";
import { useGetAllProductsQuery, useGetProductByCategoriesQuery } from "@/services/productApi";
import { get } from "http";
import { useParams } from "next/dist/client/components/navigation";

function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState("all");
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const subCategoriesName = useParams().slug as string;
  const {data: categoryProducts} = useGetProductByCategoriesQuery({ categorySlug: subCategoriesName, page: currentPage, limit: 9 });


  const { data: allProducts, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: 9,
    category: categoryName || undefined,
    brand: brandName || undefined,
  });



  return (
    <>
      <Navbar />
      <HotDeals />

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
                totalPages={categoryProducts?.totalPages || 1}   // ← from backend
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;