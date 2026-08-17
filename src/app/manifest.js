export default function manifest() {
  return {
    name: "FlavourFind — AI Food Discovery",
    short_name: "FlavourFind",
    description:
      "AI-powered food discovery. Find restaurants and takeaways that match your cravings, dietary needs and cuisine.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FFA500",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
