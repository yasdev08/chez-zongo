import { MetadataRoute } from "next";
import { CONFIG } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CONFIG.seo.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
