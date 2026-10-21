import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";
import LoginView from "@/components/auth/LoginView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "/login", { noindex: true });
}

export default function LoginPage() {
  return <LoginView />;
}
