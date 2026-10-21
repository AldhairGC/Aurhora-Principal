"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/analytics/attribution";

/** Guarda UTM, gclid y página de entrada al llegar al sitio. No renderiza nada. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
