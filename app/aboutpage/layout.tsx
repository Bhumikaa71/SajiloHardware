// app/about/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Sajilo Hardware - Nepal's Trusted Tool Supplier",
  description:
    "Learn about Sajilo Hardware — Nepal's leading industrial tool supplier since 2011. Serving 50,000+ builders with quality tools, expert support, and fast delivery across Nepal.",
  keywords: [
    "Sajilo Hardware",
    "hardware store Nepal",
    "industrial tools Nepal",
    "construction tools Kathmandu",
    "best hardware shop Nepal",
    "tool supplier Nepal",
  ],
  openGraph: {
    title: "About Sajilo Hardware | Nepal's Trusted Tool Supplier",
    description:
      "From a small shop in Kathmandu to a nationwide supplier. Sajilo Hardware has been building Nepal one tool at a time since 2011.",
    url: "https://sajilohardware.com/about",
    siteName: "Sajilo Hardware",
    images: [
      {
        url: "https://sajilohardware.com/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Sajilo Hardware - Nepal's Trusted Tool Supplier",
      },
    ],
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sajilo Hardware | Nepal's Trusted Tool Supplier",
    description:
      "Sajilo Hardware has been supplying industrial tools to Nepal's builders since 2011.",
    images: ["https://sajilohardware.com/images/og-about.jpg"],
  },
  alternates: {
    canonical: "https://sajilohardware.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}