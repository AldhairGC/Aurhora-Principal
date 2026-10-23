import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "@/lib/router";
import { OPEN_COOKIE_SETTINGS_EVENT, readPreferences, saveConsent, type CookiePreferences } from "@/lib/consent";

const CATEGORIES: { key: keyof CookiePreferences | "necessary"; title: string; desc: string }[] = [
  { key: "necessary", title: "Necesarias", desc: "Hacen que el sitio funcione y recuerdan tu elección de cookies y el tema. Siempre activas." },
  { key: "analytics", title: "Analítica", desc: "Google Analytics y Microsoft Clarity: nos ayudan a entender cómo se usa el sitio." },
  { key: "marketing", title: "Marketing", desc: "Google Ads y Meta: miden campañas y muestran anuncios relevantes." },
];

/** First-visit cookie banner with per-category settings; reopened from the footer. */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({ analytics: false, marketing: false });

  useEffect(() => {
    const saved = readPreferences();
    if (saved) setPrefs(saved);
    else setOpen(true);
    const reopen = () => {
      setPrefs(readPreferences() ?? { analytics: false, marketing: false });
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const decide = (p: CookiePreferences) => {
    saveConsent(p);
    setPrefs(p);
    setOpen(false);
    setDetails(false);
  };

  if (!open) return null;

  const btn = "inline-flex min-h-[44px] items-center justify-center rounded-[12px] px-4 text-[14.5px] font-medium transition";
  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-desc" className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6">
      <div className="mx-auto max-h-[85vh] max-w-3xl overflow-y-auto rounded-[24px] border border-line-strong bg-raised p-5 md:p-7">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden="true" />
          <div className="min-w-0">
            <h2 id="cookie-title" className="font-display text-[18px] font-semibold tracking-tight">Cookies en este sitio</h2>
            <p id="cookie-desc" className="mt-1.5 text-[14px] leading-relaxed text-mute">
              Usamos cookies necesarias para que el sitio funcione. Con tu permiso, también usamos cookies de analítica y marketing para medir visitas y campañas. Puedes cambiar tu elección cuando quieras desde "Preferencias de cookies", al pie de la página.{" "}
              <Link to="cookies" className="underline underline-offset-2 hover:text-ink">Política de cookies</Link>
            </p>
          </div>
        </div>

        {details && (
          <ul className="mt-5 flex flex-col divide-y divide-line rounded-[16px] border border-line">
            {CATEGORIES.map((c) => {
              const fixed = c.key === "necessary";
              const id = `cookie-${c.key}`;
              return (
                <li key={c.key} className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <label htmlFor={id} className="text-[14.5px] font-medium">{c.title}</label>
                    <p className="mt-0.5 text-[13px] leading-snug text-mute">{c.desc}</p>
                  </div>
                  <Switch
                    id={id}
                    checked={fixed ? true : prefs[c.key as keyof CookiePreferences]}
                    disabled={fixed}
                    onCheckedChange={(v) => !fixed && setPrefs((p) => ({ ...p, [c.key]: v }))}
                  />
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
          {details ? (
            <button type="button" onClick={() => decide(prefs)} className={`${btn} border border-line-strong hover:bg-sunken`}>Guardar preferencias</button>
          ) : (
            <button type="button" onClick={() => setDetails(true)} className={`${btn} text-mute hover:text-ink`}>Configurar</button>
          )}
          <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className={`${btn} border border-line-strong hover:bg-sunken`}>Rechazar opcionales</button>
          <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={`${btn} bg-ink text-bg hover:bg-ink-soft`}>Aceptar todas</button>
        </div>
      </div>
    </div>
  );
}
