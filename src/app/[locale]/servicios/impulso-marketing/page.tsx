import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import MarketingView from "@/components/marketing/MarketingView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/servicios/impulso-marketing");
}

export default function ImpulsoMarketingPage() {
  return <MarketingView />;
}
