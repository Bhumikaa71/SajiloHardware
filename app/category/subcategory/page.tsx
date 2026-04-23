"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CategoryProducts from "@/components/reusable/CategoryProducts";

function SubCategory() {
  const [priceRange] = useState("all");

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen text-primarys">
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-0 max-w-7xl mx-auto py-4 sm:py-6 md:py-8">
          {/* PRODUCTS CONTAINER */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 md:p-6 lg:p-8">
            <CategoryProducts priceRange={priceRange} category="power_tools" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SubCategory;
