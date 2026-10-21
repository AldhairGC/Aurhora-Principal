import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
// src/app/[locale]/page.tsx
import HomeView from "@/components/landing/HomeView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "");
}

export default function HomePage() {
  return <HomeView />;
}
