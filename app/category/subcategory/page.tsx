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
        <div className="max-w-7xl mx-auto py-6">
          {/* PRODUCTS GRID */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
            <CategoryProducts priceRange={priceRange} category="power_tools" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SubCategory;
