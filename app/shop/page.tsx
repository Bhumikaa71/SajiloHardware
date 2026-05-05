// "use client";

// import { useState } from "react";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
// import AllProducts from "@/components/reusable/AllProducts";
// import ShopSidebar from "@/components/reusable/AllProductSidebar";
// import HotDeals from "@/components/reusable/HotDeals";
// import { useGetAllProductsQuery } from "@/services/productApi";

// function Shop() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [priceRange, setPriceRange] = useState("all");
//   const [categoryName, setCategoryName] = useState("");
//   const [brandName, setBrandName] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { data: allProducts, isLoading } = useGetAllProductsQuery({
//     page: currentPage,
//     limit: 9,
//     category: categoryName || undefined,
//     brand: brandName || undefined,
//   });

//   return (
//     <>
//       <Navbar />
//       <HotDeals />

//       <div className="bg-gray-50 text-primarys">
//         <div className="max-w-7xl mx-auto px-4">
//           {/* MOBILE TOP BAR */}
//           <div className="md:hidden flex justify-between items-center py-3">
//             <h1 className="font-semibold text-lg">Shop</h1>
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="px-3 py-1 border rounded bg-white"
//             >
//               Filters
//             </button>
//           </div>

//           <div className="flex flex-col md:flex-row gap-6 py-4 md:py-6 items-start">
//             {sidebarOpen && (
//               <div
//                 className="fixed inset-0 bg-black/40 z-40 md:hidden"
//                 onClick={() => setSidebarOpen(false)}
//               />
//             )}

//             {/* SIDEBAR */}
//             <div
//               className={`
//                 fixed md:static top-16 left-0 z-40
//                 w-72 h-[calc(100vh-64px)] md:h-auto
//                 bg-white md:bg-transparent
//                 transform transition-transform duration-300
//                 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//               `}
//             >
//               <ShopSidebar
//                 brandName={brandName}
//                 categoryName={categoryName}
//                 priceRange={priceRange}
//                 setCategoryName={(val) => {
//                   setCategoryName(val);
//                   setCurrentPage(1);
//                 }}
//                 setBrandName={(val) => {
//                   setBrandName(val);
//                   setCurrentPage(1);
//                 }}
//                 setPriceRange={(val) => {
//                   setPriceRange(val);
//                   setCurrentPage(1);
//                 }}
//               />
//               <button
//                 className="md:hidden absolute top-3 right-3 border px-2 py-1 text-sm rounded"
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             {/* PRODUCTS */}
//             <div className="flex-1 min-w-0 w-full">
//               <AllProducts
//                 priceRange={priceRange}
//                 productList={allProducts?.data || []}
//                 isLoading={isLoading}
//                 currentPage={currentPage}
//                 totalPages={allProducts?.totalPages || 1}   // ← from backend
//                 onPageChange={(page) => setCurrentPage(page)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Shop;

"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AllProducts from "@/components/reusable/AllProducts";
import ShopSidebar from "@/components/reusable/AllProductSidebar";
import HotDeals from "@/components/reusable/HotDeals";
import { useGetAllProductsQuery } from "@/services/productApi";

function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState("all");
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: allProducts, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: 9,
    category: categoryName || undefined,
    brand: brandName || undefined,
  });

  return (
    <>
      <section className="md:pt-30 bg-white">
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

              {/* SIDEBAR */}
              <div
                className={`
                fixed md:static  top-16 left-0 z-40
                w-72 h-[calc(100vh-64px)] md:h-auto
                bg-white md:bg-transparent
                transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
              `}
              >
                <ShopSidebar
                  brandName={brandName}
                  categoryName={categoryName}
                  priceRange={priceRange}
                  setCategoryName={(val) => {
                    setCategoryName(val);
                    setCurrentPage(1);
                  }}
                  setBrandName={(val) => {
                    setBrandName(val);
                    setCurrentPage(1);
                  }}
                  setPriceRange={(val) => {
                    setPriceRange(val);
                    setCurrentPage(1);
                  }}
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
                <AllProducts
                  priceRange={priceRange}
                  productList={allProducts?.data || []}
                  isLoading={isLoading}
                  currentPage={currentPage}
                  totalPages={allProducts?.totalPages || 1} // ← from backend
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}

export default Shop;
