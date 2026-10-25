import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/posts"],
        disallow: ["/admin", "/dashboard", "/api/"],
      },
    ],
    sitemap: "https://studenthub.example.com/sitemap.xml",
  };
}
