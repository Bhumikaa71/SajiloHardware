// app/sitemap.ts
import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Homepage
    {
      url: `${BASE_URL}`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "daily",
      priority: 1.0,
    },

    // Shop
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "daily",
      priority: 0.9,
    },

    // Cart
    {
      url: `${BASE_URL}/addtocart`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "never",
      priority: 0.1, // ⬇ lowered — no SEO value in indexing the cart
    },

    // Auth
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "yearly",
      priority: 0.3,
    },

    // About
    {
      url: `${BASE_URL}/aboutpage`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // Blog
    {
      url: `${BASE_URL}/blogpage/bloghero`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "weekly",
      priority: 0.6,
    },

    // Category
    {
      url: `${BASE_URL}/category/subcategory`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Legal
    {
      url: `${BASE_URL}/privacypage/termsandcondition`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/privacypage/privacypolicy`,
      lastModified: new Date("2026-05-04T10:30:05+00:00"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}


