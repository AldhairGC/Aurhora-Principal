import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteView } from "@/components/site/SiteView";
import { SITE } from "@/content/site";
import { ALL_VIEWS, slugOf, viewOf } from "@/lib/routes";
import { jsonLdFor, seoFor } from "@/lib/seo";

type Props = { params: Promise<{ slug?: string[] }> };

// Every page is prebuilt; any other path is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_VIEWS.map((view) => {
    const slug = slugOf(view);
    return { slug: slug === "/" ? [] : slug.slice(1).split("/") };
  });
}

async function viewFromParams(params: Props["params"]) {
  const { slug } = await params;
  return viewOf("/" + (slug ?? []).join("/"));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const view = await viewFromParams(params);
  if (!view) return {};
  const seo = seoFor(view);
  const url = SITE.url + (seo.slug === "/" ? "" : seo.slug);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: SITE.name,
      url,
      title: seo.title,
      description: seo.description,
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

export default async function Page({ params }: Props) {
  const view = await viewFromParams(params);
  if (!view) notFound();
  // "<" escaped so content can never close the script tag.
  const ld = JSON.stringify(jsonLdFor(view)).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <SiteView view={view} />
    </>
  );
}
