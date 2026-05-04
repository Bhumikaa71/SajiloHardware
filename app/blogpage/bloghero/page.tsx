import type { Metadata } from "next";
import BlogPage from "./blog";

export const metadata: Metadata = {
  title: "Blog & Guides | Sajilo HardWare",
  description:
    "Expert hardware tips, DIY guides, tool maintenance advice, and product insights from Sajilo HardWare — Nepal's trusted hardware store.",
  keywords: [
    "hardware tools Nepal",
    "DIY guide Nepal",
    "power tools tips",
    "tool maintenance",
    "Sajilo hardware blog",
    "construction tools Nepal",
  ],
  openGraph: {
    title: "Blog & Guides | Sajilo HardWare",
    description:
      "Expert hardware tips, DIY guides, and tool maintenance advice from Sajilo HardWare.",
    url: "https://www.sajilohardware.com/blogpage/bloghero",
    siteName: "Sajilo HardWare",
    images: [
      {
        url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Sajilo HardWare Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Guides | Sajilo HardWare",
    description:
      "Expert hardware tips, DIY guides, and tool maintenance advice from Sajilo HardWare.",
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  alternates: {
    canonical: "https://www.sajilohardware.com/blogpage/bloghero",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <BlogPage />;
}
