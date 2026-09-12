import { MetadataRoute } from "next";
import { CONFIG } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${CONFIG.seo.url}/sitemap.xml`,
  };
}
