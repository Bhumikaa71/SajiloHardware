"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AllProducts from "@/components/reusable/AllProducts";
import ShopSidebar from "@/components/reusable/AllProductSidebar";
import HotDeals from "@/components/reusable/HotDeals";

function Shop() {
  const [priceRange, setPriceRange] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* NAVBAR — sticky is handled inside Navbar component itself */}
      <Navbar />

      <HotDeals />

      {/* PAGE WRAPPER */}
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
            {/* OVERLAY (mobile only) */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* SIDEBAR */}
            <div
              className={`
                fixed md:static top-16 left-0 z-40
                w-72 h-[calc(100vh-64px)] md:h-auto
                bg-white md:bg-transparent
                transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
              `}
            >
              <ShopSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
              <button
                className="md:hidden absolute top-3 right-3 border px-2 py-1 text-sm rounded"
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* PRODUCTS */}
            <div className="flex-1 min-w-0 w-full">
              <AllProducts priceRange={priceRange} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;
