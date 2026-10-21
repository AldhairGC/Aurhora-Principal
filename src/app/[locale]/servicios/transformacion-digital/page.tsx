import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import TransformView from "@/components/transform/TransformView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/servicios/transformacion-digital");
}

export default function TransformacionDigitalPage() {
  return <TransformView />;
}
