import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { CATALOG, SITE, UNIT_LABEL } from "@/content/site";
import { buildMessage, copyText, whatsappUrl } from "@/lib/whatsapp";
import { todayISO } from "@/lib/hours";
import { Link, useRouter } from "@/lib/router";
import { CopyValue } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";


type Form = {
  unit: string;
  service: string;
  name: string;
  space: string;
  zone: string;
  detail: string;
  priority: string;
  date: string;
  slot: string;
};

const SPACES = ["Casa o departamento", "Local comercial", "Oficina", "Negocio o proyecto digital", "Otro"];
const PRIORITIES = ["Lo antes posible", "Tengo una fecha en mente", "Solo quiero información"];
const STEPS = ["Qué necesitas", "Tu espacio", "Cuándo"];
const PHYSICAL = new Set(["facilities", "integra"]);

export function ContactWizard() {
  const { prefill } = useRouter();
  const startUnit = prefill.unit && CATALOG[prefill.unit] ? prefill.unit : "orientacion";
  const startService = prefill.service && CATALOG[startUnit].includes(prefill.service) ? prefill.service : CATALOG[startUnit][0];

  const { register, watch, setValue, trigger, formState: { errors } } = useForm<Form>({
    mode: "onTouched",
    defaultValues: {
      unit: startUnit,
      service: startService,
      name: "",
      space: startUnit === "digital" ? "Negocio o proyecto digital" : "",
      zone: "",
      detail: "",
      priority: "Lo antes posible",
      date: "",
      slot: "Por acordar",
    },
  });
  const [step, setStep] = useState(0);
  const previewRef = useRef<HTMLPreElement>(null);
  const v = watch();
  const needsZone = PHYSICAL.has(v.unit);

  // Keep the service valid when the unit changes
  useEffect(() => {
    if (!CATALOG[v.unit].includes(v.service)) setValue("service", CATALOG[v.unit][0]);
  }, [v.unit, v.service, setValue]);

  const message = buildMessage({
    unit: UNIT_LABEL[v.unit],
    service: v.service,
    name: v.name,
    space: v.space,
    zone: v.zone,
    detail: v.detail,
    priority: v.priority,
    date: v.date,
    slot: v.slot,
    origin: prefill.origin,
  });

  const next = async () => {
    const fields: (keyof Form)[][] = [["unit", "service"], ["zone", "detail"], ["date"]];
    if (await trigger(fields[step])) {
      track("form_progress", { form: "contacto", step: step + 2, unit: v.unit });
      setStep((s) => Math.min(s + 1, 2));
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <form onSubmit={(e) => e.preventDefault()} noValidate className="min-w-0 rounded-[24px] border border-line bg-raised lg:col-span-7" data-unit={v.unit === "orientacion" ? undefined : v.unit}>
        {/* progress */}
        <ol className="grid grid-cols-3 border-b border-line" aria-label="Pasos de la solicitud">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                onClick={async () => { if (i < step || (await trigger())) setStep(i); }}
                aria-current={i === step ? "step" : undefined}
                className={cn("flex w-full flex-col gap-2 px-4 py-4 text-left transition md:px-6", i === step ? "text-ink" : "text-mute hover:text-ink")}
              >
                <span className={cn("h-1 rounded-full transition-colors", i <= step ? "bg-unit" : "bg-line")} />
                <span className="eyebrow tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="hidden text-[14px] font-medium sm:block">{s}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="p-5 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              {step === 0 && (
                <fieldset className="flex flex-col gap-6">
                  <legend className="font-display text-[24px] font-semibold tracking-tight">¿Cómo podemos ayudarte?</legend>
                  <div>
                    <p id="unit-label" className="mb-2 text-[14px] font-medium">Especialidad</p>
                    <div role="radiogroup" aria-labelledby="unit-label" className="grid grid-cols-2 gap-2 md:grid-cols-4">
                      {Object.keys(CATALOG).map((u) => (
                        <label key={u} data-unit={u === "orientacion" ? undefined : u} className={cn("flex min-h-[64px] cursor-pointer items-center rounded-[12px] border px-3 py-2 text-[14px] font-medium transition", v.unit === u ? "border-unit bg-unit-soft text-ink" : "border-line text-ink-soft hover:border-line-strong")}>
                          <input type="radio" value={u} {...register("unit")} className="sr-only" />
                          {UNIT_LABEL[u]}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="f-service" className="mb-2 block text-[14px] font-medium">Servicio de interés</label>
                      <select id="f-service" {...register("service", { required: true })} className={inputCls}>
                        {CATALOG[v.unit].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="f-name" className="mb-2 block text-[14px] font-medium">Tu nombre <span className="font-normal text-mute">· opcional</span></label>
                      <input id="f-name" {...register("name", { maxLength: 80 })} autoComplete="given-name" placeholder="¿Cómo te llamamos?" className={inputCls} />
                    </div>
                  </div>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset className="flex flex-col gap-6">
                  <legend className="font-display text-[24px] font-semibold tracking-tight">Cuéntanos un poco más</legend>
                  <div>
                    <p id="space-label" className="mb-2 text-[14px] font-medium">Tipo de espacio o negocio</p>
                    <div role="radiogroup" aria-labelledby="space-label" className="flex flex-wrap gap-2">
                      {SPACES.map((s) => (
                        <label key={s} className={cn("cursor-pointer rounded-full border px-3.5 py-2 text-[13.5px] transition", v.space === s ? "border-unit bg-unit text-unit-on" : "border-line hover:border-line-strong")}>
                          <input type="radio" value={s} {...register("space")} className="sr-only" />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="f-zone" className="mb-2 block text-[14px] font-medium">
                      Colonia, alcaldía o municipio {!needsZone && <span className="font-normal text-mute">· opcional</span>}
                    </label>
                    <input
                      id="f-zone"
                      list="zone-list"
                      {...register("zone", { validate: (z) => !needsZone || z.trim().length > 1 || "Indica tu zona para confirmar traslado." })}
                      autoComplete="address-level2"
                      placeholder="Ej. Naucalpan"
                      aria-invalid={!!errors.zone}
                      aria-describedby={errors.zone ? "zone-err" : undefined}
                      className={cn(inputCls, errors.zone && "border-danger")}
                    />
                    <datalist id="zone-list">{SITE.zones.map((z) => <option key={z} value={z} />)}</datalist>
                    {errors.zone && <p id="zone-err" className="mt-1.5 text-[13px] text-danger">{errors.zone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-detail" className="mb-2 block text-[14px] font-medium">¿Qué te gustaría resolver? <span className="font-normal text-mute">· opcional</span></label>
                    <textarea id="f-detail" rows={4} {...register("detail", { maxLength: { value: 1200, message: "Máximo 1,200 caracteres." } })} placeholder="Cuéntanos qué ocurre o qué tienes en mente." className={cn(inputCls, "h-auto py-3")} />
                    <div className="mt-1.5 flex justify-between text-[12.5px] text-mute">
                      <span>Las fotos se comparten directo en WhatsApp.</span>
                      <span className="tabular">{v.detail.length}/1200</span>
                    </div>
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="flex flex-col gap-6">
                  <legend className="font-display text-[24px] font-semibold tracking-tight">¿Cuándo te gustaría?</legend>
                  <div role="radiogroup" aria-label="Preferencia" className="flex flex-col gap-2">
                    {PRIORITIES.map((p) => (
                      <label key={p} className={cn("flex cursor-pointer items-center gap-3 rounded-[12px] border px-4 py-3 text-[15px] transition", v.priority === p ? "border-unit bg-unit-soft" : "border-line hover:border-line-strong")}>
                        <input type="radio" value={p} {...register("priority")} className="h-4 w-4 accent-[rgb(var(--unit))]" />
                        {p}
                      </label>
                    ))}
                  </div>
                  {v.priority === "Tengo una fecha en mente" && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="f-date" className="mb-2 block text-[14px] font-medium">Día preferido</label>
                        <input id="f-date" type="date" min={todayISO()} {...register("date", { validate: (d) => !d || d >= todayISO() || "Elige una fecha a partir de hoy." })} className={inputCls} />
                        {errors.date && <p className="mt-1.5 text-[13px] text-danger">{errors.date.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="f-slot" className="mb-2 block text-[14px] font-medium">Horario preferido</label>
                        <select id="f-slot" {...register("slot")} className={inputCls}>
                          <option>Por acordar</option>
                          <option>Mañana</option>
                          <option>Tarde</option>
                        </select>
                      </div>
                    </div>
                  )}
                  <p className="rounded-[12px] bg-sunken p-4 text-[13.5px] leading-relaxed text-mute">
                    Tu preferencia no reserva un horario. El equipo confirma disponibilidad, costo y cita contigo por WhatsApp.
                  </p>
                </fieldset>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
            <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex min-h-[44px] items-center gap-2 rounded-[12px] px-3 text-[15px] text-mute transition hover:text-ink disabled:invisible">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Atrás
            </button>
            {step < 2 ? (
              <button type="button" onClick={next} className="inline-flex min-h-[46px] items-center gap-2 rounded-[12px] bg-ink px-5 text-[15px] font-medium text-bg transition hover:bg-ink-soft">
                Continuar <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (v.date && v.date < todayISO()) { e.preventDefault(); trigger("date"); return; }
                  track("generate_lead", { method: "whatsapp", unit: v.unit, service: v.service, priority: v.priority, source: prefill.origin ?? "contacto" });
                }}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-[12px] bg-[#1f9d55] px-5 text-[15px] font-medium text-white transition hover:brightness-110"
              >
                Continuar en WhatsApp <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
          {/* Aviso de privacidad simplificado: visible en todos los pasos, antes de enviar datos. */}
          <p className="mt-5 text-[12.5px] leading-relaxed text-mute">
            Aurhora Agency usa los datos que compartes para atender tu solicitud, cotizar y coordinar el servicio. Si no quieres recibir información de nuestros servicios, dínoslo en tu mensaje. Consulta el{" "}
            <Link to="privacidad" className="underline underline-offset-2 hover:text-ink">Aviso de privacidad</Link>.
          </p>
        </div>
      </form>

      <aside className="flex min-w-0 flex-col gap-4 lg:col-span-5">
        <div className="rounded-[24px] bg-night p-6 text-on-night md:p-7">
          <p className="eyebrow text-on-night-mute">Tu solicitud, en contexto</p>
          <h2 className="mt-3 font-display text-[26px] font-semibold leading-tight tracking-tight">Seguimos por WhatsApp.</h2>
          <dl className="mt-5 divide-y divide-night-line border-y border-night-line text-[14px]">
            {[
              ["Especialidad", UNIT_LABEL[v.unit]],
              ["Servicio", v.service],
              ["Zona", v.zone || "Por indicar"],
              ["Preferencia", v.priority + (v.priority === "Tengo una fecha en mente" && v.date ? ` · ${v.date}` : "")],
            ].map(([k, val]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-on-night-mute">{k}</dt>
                <dd className="text-right font-medium">{val}</dd>
              </div>
            ))}
          </dl>
          <details className="group mt-5">
            <summary className="cursor-pointer list-none text-[14px] font-medium text-on-night-mute hover:text-on-night">
              <span className="group-open:hidden">Ver mi mensaje ↓</span>
              <span className="hidden group-open:inline">Ocultar mensaje ↑</span>
            </summary>
            <pre ref={previewRef} className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-[12px] bg-night-raised p-4 font-mono text-[12.5px] leading-relaxed text-on-night">{message}</pre>
          </details>
          <button
            type="button"
            onClick={async () => {
              const el = previewRef.current;
              el?.closest("details")?.setAttribute("open", "");
              const ok = await copyText(message, el);
              track("select_content", { content_type: "contact_message_copy", content_id: v.service });
              toast(ok ? "Solicitud copiada" : "Seleccionamos el mensaje para que lo copies");
            }}
            className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-on-night underline-offset-4 hover:underline"
          >
            <Copy className="h-4 w-4" aria-hidden="true" /> Copiar solicitud
          </button>
        </div>
        <div className="rounded-[24px] border border-line bg-raised p-6">
          <p className="eyebrow text-mute">También puedes llamarnos</p>
          <p className="mt-3 font-display text-[22px] font-semibold tracking-tight"><CopyValue value={SITE.phoneDisplay} label="Teléfono" /></p>
          <p className="mt-1 text-[14px] text-mute"><CopyValue value={SITE.email} label="Correo" /></p>
          <ul className="mt-4 space-y-1.5 text-[13.5px] text-mute">
            {["Los datos solo viajan en el mensaje que tú decides enviar.", "Atención humana; sin bots en esta etapa.", "Lunes a viernes de 8:00 a 20:00 y sábados de 8:00 a 16:00, hora de CDMX."].map((t) => (
              <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

const inputCls = "h-12 w-full rounded-[12px] border border-line bg-bg px-3.5 text-[15px] outline-none transition placeholder:text-mute/70 focus:border-unit focus:ring-2 focus:ring-unit/20";
