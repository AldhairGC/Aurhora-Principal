import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import SoftwareView from "@/components/software/SoftwareView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/servicios/desarrollo-software");
}

export default function DesarrolloSoftwarePage() {
  return <SoftwareView />;
}
