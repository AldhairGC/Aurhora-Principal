import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import AboutView from "@/components/about/AboutView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/quienes-somos");
}

export default function QuienesSomosPage() {
  return <AboutView />;
}
