"use client";

type ShopSidebarProps = {
  priceRange: string;
  setPriceRange: (value: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
};

function CategorySidebar({
  priceRange,
  setPriceRange,
  isOpen = true,
  onClose,
}: ShopSidebarProps) {
  const brands = [
    "TOTAL",
    "Ingco",
    "Dingqi",
    "Dewalt",
    "Stanley",
    "Milwaukee",
    "Deli",
    "Makita",
    "Havit",
    "Brite",
    "Philips",
    "Huntkey",
    "Phoenix",
    "IHS",
    "Syka",
    "Litmus Wires",
    "Osram",
    "Wipro",
    "HICO",
    "NEBO",
    "MCPOWERED",
    "Naturehike",
    "Primus",
    "PETZL",
  ];

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
          h-full md:h-auto
          w-72 md:w-64 lg:w-72
          bg-white p-4 border-r
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CATEGORIES */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Sub Categories</h2>

          <ul className="text-sm space-y-1 text-gray-700">
            <li>Wiring Cable</li>
            <li>Power socket box</li>
            <li>Multi-plugs</li>
            <li>Lights</li>
            <li>Accessories</li>
            <li>Cordless Light</li>
            <li>Stabilizer</li>
          </ul>
        </div>

        {/* PRICE FILTER */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Price</h2>

          <div className="text-sm space-y-2 text-gray-700">
            {[
              { label: "All Prices", value: "all" },
              { label: "Rs0 - Rs500", value: "0-500" },
              { label: "Rs500 - Rs1500", value: "500-1500" },
              { label: "Rs1500 - Rs5000", value: "1500-5000" },
            ].map((item) => (
              <label key={item.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="price"
                  value={item.value}
                  checked={priceRange === item.value}
                  onChange={(e) => setPriceRange(e.target.value)}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        {/* BRANDS */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Brands</h2>

          <div className="text-sm space-y-2 max-h-64 overflow-y-auto pr-2">
            {brands.map((brand, index) => (
              <label
                key={index}
                className="flex items-center gap-2 text-gray-700"
              >
                <input type="checkbox" />
                {brand}
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

export default CategorySidebar;
