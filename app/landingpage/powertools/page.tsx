"use client";

import products from "@/data/products.json";
import ProductSection from "@/components/reusable/ProductSection";

export default function PowerTools() {
  const powertools = products.power_tools.filter((item) => item.powertools);

  return <ProductSection title="Power Tools" products={powertools} />;
}
