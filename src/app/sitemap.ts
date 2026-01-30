import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aurhora.agency";
  const locales = ["es", "en", "pt"];
  
  const routes = [
    "",
    "/quienes-somos",
    "/login",
    "/servicios/godigital",
    "/servicios/transformacion-digital",
    "/servicios/desarrollo-software",
    "/servicios/optimizacion-procesos",
    "/servicios/impulso-marketing",
    "/servicios/cultura-agil",
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add all routes for each locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: locales.reduce((acc, loc) => {
            acc[loc === "es" ? "es-MX" : loc === "en" ? "en-US" : "pt-BR"] =
              `${baseUrl}/${loc}${route}`;
            return acc;
          }, {} as Record<string, string>),
        },
      });
    });
  });

  return sitemap;
}
