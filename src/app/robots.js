const SITE_URL = "https://flavour-find-development.vercel.app";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/pinboard"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
