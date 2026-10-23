import type { Metadata } from "next";
import { NotFoundView } from "@/components/site/NotFoundView";

export const metadata: Metadata = {
  title: { absolute: "Página no encontrada | Aurhora Agency" },
  robots: { index: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
