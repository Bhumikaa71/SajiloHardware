"use client";

import products from "@/data/products.json";
import ProductSection from "@/components/reusable/ProductSection";

export default function HandTools() {
  const handtools = products.hand_tools.filter(
    (item) => item.handtools === true,
  );

  return <ProductSection title="Electrical Tools" products={handtools} />;
}
