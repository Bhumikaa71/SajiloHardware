"use client";

import products from "@/data/products.json";
import ProductSection from "@/components/reusable/ProductSection";

export default function BestSelling() {
  const bestSellingProducts = products.best_selling.filter(
    (item) => item.best_selling === true,
  );

  return <ProductSection title="Best Selling" products={bestSellingProducts} />;
}
