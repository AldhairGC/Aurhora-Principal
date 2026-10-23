import type { NextConfig } from "next";

/*
  The previous site lived under /es, /en and /pt with other service URLs. Spanish is now
  the only language and the pages moved, so each old URL redirects (301) to its new page.
*/
const OLD_TO_NEW: [string, string][] = [
  ["/servicios/desarrollo-software", "/digital/software-a-la-medida"],
  ["/servicios/godigital", "/digital/godigital"],
  ["/servicios/impulso-marketing", "/digital/marketing-digital"],
  ["/servicios/transformacion-digital", "/digital/consultoria-ia"],
  ["/servicios/optimizacion-procesos", "/digital/consultoria-ia"],
  ["/servicios/cultura-agil", "/digital/consultoria-ia"],
  ["/quienes-somos", "/nosotros"],
  ["/aviso-privacidad", "/aviso-de-privacidad"],
  ["/terminos-condiciones", "/terminos-y-condiciones"],
  ["/login", "/"],
];
const LOCALE = ":locale(es|en|pt)";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  compress: true,
  productionBrowserSourceMaps: false,

  async redirects() {
    return [
      ...OLD_TO_NEW.flatMap(([from, to]) => [
        { source: `/${LOCALE}${from}`, destination: to, permanent: true },
        { source: from, destination: to, permanent: true },
      ]),
      { source: `/${LOCALE}`, destination: "/", permanent: true },
      { source: `/${LOCALE}/:path*`, destination: "/:path*", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff|woff2|ttf|eot|ico|svg|png|jpg|jpeg|gif|webp|avif)$",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
