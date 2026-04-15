"use client";

import products from "@/data/products.json";
import ProductSection from "@/components/reusable/ProductSection";

export default function SafetyGearTools() {
  const powertools = products.power_tools.filter((item) => item.powertools);

  return <ProductSection title="SafetyGear Tools" products={powertools} />;
}
