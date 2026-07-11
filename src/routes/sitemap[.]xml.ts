import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BOOKS } from "@/lib/books";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly" as const },
          { path: "/about", priority: "0.8", changefreq: "monthly" as const },
          { path: "/books", priority: "0.9", changefreq: "weekly" as const },
          { path: "/news", priority: "0.7", changefreq: "weekly" as const },
          { path: "/contact", priority: "0.5", changefreq: "yearly" as const },
          ...BOOKS.map((b) => ({
            path: `/books/${b.slug}`,
            priority: "0.85",
            changefreq: "monthly" as const,
          })),
        ];

        const urls = entries
          .map(
            (e) =>
              `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
