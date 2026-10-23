import { useSyncExternalStore } from "react";
import { Activity, SearchCheck } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "@/lib/router";
import { jsonLdFor, seoFor } from "@/lib/seo";
import { getEventLog, subscribeEvents } from "@/lib/analytics";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

/** Prototype-only panel: shows the SEO record and the dataLayer events for the current view. */
export function SeoInspector() {
  const { view } = useRouter();
  const seo = seoFor(view);
  useSyncExternalStore(subscribeEvents, () => getEventLog().length + ":" + (getEventLog()[0]?.at ?? 0), () => "");
  const log = getEventLog();
  const tLen = seo.title.length;
  const dLen = seo.description.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className="eyebrow inline-flex items-center gap-2 rounded-full border border-night-line px-3 py-1.5 text-on-night-mute hover:text-on-night">
          <SearchCheck className="h-3.5 w-3.5" aria-hidden="true" /> Ficha SEO y medición
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-lg overflow-y-auto border-line bg-bg p-0 text-ink sm:max-w-lg">
        <div className="border-b border-line px-5 py-4">
          <SheetTitle className="font-display text-[20px] font-semibold tracking-tight">Ficha SEO y medición</SheetTitle>
          <p className="mt-1 text-[13px] text-mute">Lo que esta página tendrá en el sitio en producción. En el artifact no se indexa ni se envía nada.</p>
        </div>
        <Tabs defaultValue="seo" className="p-5">
          <TabsList className="grid w-full grid-cols-3 rounded-[12px] bg-sunken p-1">
            <TabsTrigger value="seo" className="rounded-[8px] text-[13px] data-[state=active]:bg-raised">Metadatos</TabsTrigger>
            <TabsTrigger value="ld" className="rounded-[8px] text-[13px] data-[state=active]:bg-raised">Schema</TabsTrigger>
            <TabsTrigger value="ev" className="rounded-[8px] text-[13px] data-[state=active]:bg-raised">Eventos ({log.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="seo" className="mt-5 flex flex-col gap-5">
            <div className="rounded-[12px] border border-line bg-raised p-4">
              <p className="eyebrow text-mute">Vista previa en Google</p>
              <p className="mt-3 truncate text-[12.5px] text-mute">{SITE.url.replace("https://", "")}{seo.slug === "/" ? "" : seo.slug}</p>
              <p className="mt-1 text-[18px] leading-snug [overflow-wrap:anywhere]" style={{ color: "rgb(var(--focus))" }}>{seo.title}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">{seo.description}</p>
            </div>
            <dl className="grid gap-3 text-[13.5px]">
              <Row label="URL de producción" value={SITE.url + (seo.slug === "/" ? "/" : seo.slug)} />
              <Row label="Title" value={`${tLen} caracteres`} warn={tLen > 65} hint="Ideal: 50 a 65" />
              <Row label="Description" value={`${dLen} caracteres`} warn={dLen < 120 || dLen > 160} hint="Ideal: 120 a 160" />
            </dl>
            <div>
              <p className="eyebrow text-mute">Palabras clave objetivo</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {seo.keywords.map((k, i) => (
                  <li key={k} className={cn("rounded-full px-2.5 py-1 text-[12.5px]", i === 0 ? "bg-ink text-bg" : "bg-sunken text-ink-soft")}>{k}</li>
                ))}
              </ul>
              <p className="mt-2 text-[12px] text-mute">La primera es la principal. Validar volumen y dificultad en Google Keyword Planner antes de publicar.</p>
            </div>
          </TabsContent>

          <TabsContent value="ld" className="mt-5">
            <p className="mb-2 text-[13px] text-mute">JSON-LD que se renderizará en el servidor para esta página.</p>
            <pre className="max-h-[65vh] overflow-auto rounded-[12px] bg-night p-4 font-mono text-[11.5px] leading-relaxed text-on-night">{JSON.stringify(jsonLdFor(view), null, 2)}</pre>
          </TabsContent>

          <TabsContent value="ev" className="mt-5">
            <p className="mb-3 flex items-center gap-2 text-[13px] text-mute"><Activity className="h-4 w-4" aria-hidden="true" /> Eventos enviados a <code className="font-mono">dataLayer</code> en esta visita.</p>
            {log.length === 0 ? (
              <p className="rounded-[12px] bg-sunken p-4 text-[13px] text-mute">Navega o usa una herramienta para ver eventos aquí.</p>
            ) : (
              <ol className="flex flex-col gap-2">
                {log.map((e) => (
                  <li key={e.at + e.event} className="rounded-[12px] border border-line bg-raised p-3">
                    <div className="flex items-center justify-between gap-3">
                      <code className="font-mono text-[13px] font-medium">{e.event}</code>
                      <span className="tabular text-[11.5px] text-mute">{new Date(e.at).toLocaleTimeString("es-MX")}</span>
                    </div>
                    <p className="mt-1 break-words font-mono text-[11.5px] text-mute">{JSON.stringify(e.params)}</p>
                  </li>
                ))}
              </ol>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value, warn, hint }: { label: string; value: string; warn?: boolean; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
      <dt className="text-mute">{label}</dt>
      <dd className={cn("text-right [overflow-wrap:anywhere]", warn && "text-warn")}>
        {value}
        {hint && <span className="ml-2 text-[11.5px] text-mute">{hint}</span>}
      </dd>
    </div>
  );
}
