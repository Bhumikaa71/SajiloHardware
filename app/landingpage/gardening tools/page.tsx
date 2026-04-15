"use client";

import products from "@/data/products.json";
import ProductSection from "@/components/reusable/ProductSection";

export default function GardeningTools() {
  const gardeningtools = products.gardening_tools.filter(
    (item) => item.gardening === true,
  );

  return <ProductSection title="PLumbing Tools" products={gardeningtools} />;
}
