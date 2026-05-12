"use client";

import { useGetBrandsQuery } from "@/services/brandApi";
import { useGetCategoryTreeQuery } from "@/services/categoryApi";

type ShopSidebarProps = {
  priceRange: string;
  categoryName?: string;
  brandName?: string;
  setBrandName: (value: string) => void;
  setPriceRange: (value: string) => void;
  setCategoryName: (value: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
};

function ShopSidebar({
  priceRange,
  setCategoryName,
  setBrandName,
  brandName,
  categoryName,
  setPriceRange,
  isOpen = true,
  onClose,
}: ShopSidebarProps) {
  const { data: categoryTree } = useGetCategoryTreeQuery();
  const { data: brandsData } = useGetBrandsQuery();

  return (
    <>
      {/* BACKDROP (mobile only) */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-full md:h-auto w-72 md:w-64 lg:w-72
          bg-white p-4 border-r overflow-y-auto
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CATEGORIES */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">All Categories</h2>
            {categoryName && (
              <button
                onClick={() => setCategoryName("")}
                className="text-xs text-blue-500 underline"
              >
                Clear
              </button>
            )}
          </div>
          <ul className="text-sm space-y-1 text-gray-700">
            {categoryTree?.data?.map((category: any) => (
              <li
                key={category._id ?? category.slug}
                onClick={() => setCategoryName(category.slug)}
                className={`
                  cursor-pointer px-2 py-1 rounded hover:bg-gray-100
                  ${categoryName === category.slug
                    ? "font-medium text-black bg-gray-100"
                    : "text-gray-600"
                  }
                `}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* BRANDS */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Brands</h2>
            {brandName && (
              <button
                onClick={() => setBrandName("")}
                className="text-xs text-blue-500 underline"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-sm space-y-2 max-h-64 overflow-y-auto pr-2">
            {brandsData?.data?.map((brand: any) => {
              const name = (brand?.brand_name ?? brand)?.toString().trim();
              const id = brand?._id ?? name;
              const isSelected = brandName?.trim() === brand?.slug; // ← slug comparison

              return (
                <label
                  key={id}
                  className={`
                    flex items-center gap-2 cursor-pointer px-2 py-1 rounded
                    ${isSelected ? "text-black font-medium" : "text-gray-700"}
                  `}
                >
                  <input
                    type="radio"
                    name="brand-filter"
                    value={brand?.slug}
                    checked={isSelected}
                    onChange={() => setBrandName(brand?.slug)} // ← slug, not name
                    className="accent-black w-4 h-4"
                  />
                  {name}
                </label>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

export default ShopSidebar;