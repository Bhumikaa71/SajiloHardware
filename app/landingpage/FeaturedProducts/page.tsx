"use client";

import products from "@/data/products.json";
import ProductSection from "@/components/reusable/ProductSection";

export default function FeaturedProducts() {
  const featuredProducts = products.featured_products.filter(
    (item) => item.featured === true,
  );

  return (
    <ProductSection title="Featured Products" products={featuredProducts} />
  );
}
