const SITE_URL = "https://flavour-find-development.vercel.app";

export default function sitemap() {
  const routes = ["", "/find"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
