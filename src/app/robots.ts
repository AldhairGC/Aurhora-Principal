import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  // /_next/ queda permitido: los buscadores necesitan JS y CSS para renderizar.
  // /login se excluye con robots noindex en la propia página (no aquí, para que
  // Google pueda leer esa etiqueta).
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
