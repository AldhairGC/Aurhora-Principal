import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import GoDigitalView from "@/components/godigital/GoDigitalView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/servicios/godigital");
}

export default function GoDigitalPage() {
  return <GoDigitalView />;
}
