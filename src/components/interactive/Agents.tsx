"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Brain, Check, FileSearch, Gauge, Inbox, MessageCircle, ShieldAlert, Target, UserRound, Users, Wrench, type LucideIcon } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/* Ejemplos de diseño: describen cómo se arma un agente, no resultados de clientes. */
type Case = {
  id: string;
  label: string;
  icon: LucideIcon;
  trigger: string;
  knowledge: string;
  reasoning: string;
  tools: string[];
  limits: string;
  human: string;
  metric: string;
};

const CASES: Case[] = [
  {
    id: "atencion",
    label: "Atención por WhatsApp",
    icon: MessageCircle,
    trigger: "Un cliente escribe por WhatsApp a cualquier hora.",
    knowledge: "Catálogo, precios vigentes, políticas, horarios y preguntas frecuentes.",
    reasoning: "Entiende qué necesita, responde o decide qué acción ejecutar.",
    tools: ["Consultar disponibilidad", "Crear pedido o cita", "Registrar en el CRM"],
    limits: "No ofrece descuentos ni promete fechas que no estén confirmadas.",
    human: "Quejas, casos sensibles o cuando el cliente pide hablar con alguien.",
    metric: "Tiempo de primera respuesta y casos resueltos sin escalar.",
  },
  {
    id: "ventas",
    label: "Calificación de solicitudes",
    icon: Target,
    trigger: "Llega una solicitud desde el sitio o una campaña.",
    knowledge: "Perfil de cliente ideal, servicios y criterios de calificación.",
    reasoning: "Hace las preguntas que faltan, califica y prioriza.",
    tools: ["Completar datos de la empresa", "Agendar llamada", "Crear oportunidad en el CRM"],
    limits: "No cotiza; deja lista la información para el asesor.",
    human: "Las oportunidades calificadas pasan a una persona de ventas.",
    metric: "Solicitudes calificadas y tiempo hasta el primer contacto.",
  },
  {
    id: "documentos",
    label: "Facturas y pedidos",
    icon: FileSearch,
    trigger: "Llega una factura o un pedido por correo.",
    knowledge: "Proveedores, órdenes de compra y reglas de validación.",
    reasoning: "Extrae los datos, compara y decide si registra o señala una diferencia.",
    tools: ["Leer PDF o imagen", "Validar contra la orden de compra", "Registrar en el ERP"],
    limits: "Pagos y diferencias relevantes siempre requieren aprobación.",
    human: "Diferencias, documentos ilegibles o proveedores nuevos.",
    metric: "Documentos procesados y errores de captura evitados.",
  },
  {
    id: "conocimiento",
    label: "Asistente interno",
    icon: BookOpen,
    trigger: "Una persona del equipo hace una pregunta.",
    knowledge: "Manuales, políticas y procesos internos autorizados.",
    reasoning: "Busca en las fuentes, responde y cita de dónde sacó la información.",
    tools: ["Buscar en documentos", "Citar la fuente", "Abrir un ticket"],
    limits: "Solo consulta los documentos que corresponden al puesto de quien pregunta.",
    human: "Si no encuentra la respuesta, la canaliza al área responsable.",
    metric: "Preguntas resueltas y tiempo de búsqueda ahorrado.",
  },
];

export function AgentBlueprint({ className }: { className?: string }) {
  const [id, setId] = useState(CASES[0].id);
  const c = CASES.find((x) => x.id === id)!;

  const steps: { icon: LucideIcon; label: string; body: React.ReactNode; tone?: "warn" | "human" | "metric" }[] = [
    { icon: Inbox, label: "Disparador", body: c.trigger },
    { icon: BookOpen, label: "Contexto y conocimiento", body: c.knowledge },
    { icon: Brain, label: "Razona y decide", body: c.reasoning },
    {
      icon: Wrench,
      label: "Usa herramientas",
      body: (
        <span className="mt-1 flex flex-wrap gap-1.5">
          {c.tools.map((t) => (
            <span key={t} className="rounded-full border border-unit-night/40 bg-unit-night/10 px-2.5 py-0.5 text-[12.5px] text-on-night">{t}</span>
          ))}
        </span>
      ),
    },
    { icon: ShieldAlert, label: "Límites", body: c.limits, tone: "warn" },
    { icon: UserRound, label: "Pasa a una persona cuando…", body: c.human, tone: "human" },
    { icon: Gauge, label: "Se mide con", body: c.metric, tone: "metric" },
  ];

  return (
    <div data-unit="digital" className={cn("grid gap-4 lg:grid-cols-[0.8fr_1.2fr]", className)}>
      <div role="tablist" aria-label="Casos de uso" className="flex flex-col gap-2">
        {CASES.map((x) => {
          const on = x.id === id;
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => { setId(x.id); track("select_content", { content_type: "agent_use_case", content_id: x.id }); }}
              className={cn("flex items-center gap-3 rounded-[12px] border p-4 text-left transition", on ? "border-unit-night/60 bg-night-raised text-on-night" : "border-night-line text-on-night-mute hover:border-night-line hover:bg-night-raised/60 hover:text-on-night")}
            >
              <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-[12px]", on ? "bg-unit-night text-night" : "bg-night-raised text-unit-night")}>
                <x.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-[17px] font-semibold tracking-tight">{x.label}</span>
            </button>
          );
        })}
        <p className="mt-2 px-1 text-[12.5px] leading-snug text-on-night-mute">Ejemplos de diseño. Cada agente se define con tu proceso, tus datos y tus reglas.</p>
      </div>

      <div className="relative min-w-0 overflow-hidden rounded-[16px] border border-night-line bg-night-raised p-5 md:p-6" role="tabpanel">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow text-on-night-mute">Anatomía de un agente</span>
          <span className="eyebrow rounded-full border border-night-line px-2.5 py-1 text-unit-night">{c.label}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.ol key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="relative flex flex-col">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-unit-night/70 via-night-line to-mint/60" />
            {steps.map((s, i) => (
              <motion.li key={s.label} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="relative grid grid-cols-[40px_1fr] gap-3 py-2.5">
                <span className={cn("relative z-10 grid h-10 w-10 place-items-center rounded-full border", s.tone === "warn" ? "border-warn/50 bg-night text-warn" : s.tone === "human" ? "border-mint/50 bg-night text-mint" : s.tone === "metric" ? "border-cyan/50 bg-night text-cyan" : "border-unit-night/50 bg-night text-unit-night")}>
                  <s.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="eyebrow text-on-night-mute">{s.label}</p>
                  <div className="mt-1 text-[14.5px] leading-relaxed text-on-night">{s.body}</div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </div>
  );
}

const COMPARE_ROWS: { label: string; chatbot: string; auto: string; agent: string }[] = [
  { label: "Cómo funciona", chatbot: "Sigue un menú o respuestas predefinidas", auto: "Ejecuta reglas fijas paso a paso", agent: "Entiende el caso, decide y usa herramientas" },
  { label: "Casos nuevos o ambiguos", chatbot: "Se queda corto", auto: "Se detiene o falla", agent: "Los interpreta o los pasa a una persona" },
  { label: "Usa tus sistemas", chatbot: "Poco o nada", auto: "Sí, con integraciones", agent: "Sí, con permisos y límites definidos" },
  { label: "Ideal para", chatbot: "Preguntas muy simples", auto: "Procesos predecibles y repetitivos", agent: "Atención, ventas y operación con variación" },
];

export function AgentComparison({ night, className }: { night?: boolean; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-[16px] border", night ? "border-night-line bg-night-raised text-on-night" : "border-line bg-raised", className)}>
      <table className="w-full min-w-[640px] text-left text-[14px]">
        <caption className="sr-only">Diferencias entre chatbot, automatización y agente de IA</caption>
        <thead>
          <tr className={cn("border-b", night ? "border-night-line" : "border-line")}>
            <th scope="col" className={cn("p-4 font-medium", night ? "text-on-night-mute" : "text-mute")}>&nbsp;</th>
            <th scope="col" className="p-4 font-display text-[16px] font-semibold tracking-tight">Chatbot tradicional</th>
            <th scope="col" className="p-4 font-display text-[16px] font-semibold tracking-tight">Automatización</th>
            <th scope="col" className={cn("p-4 font-display text-[16px] font-semibold tracking-tight", night ? "text-unit-night" : "text-unit")}>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" aria-hidden="true" />Agente de IA</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((r) => (
            <tr key={r.label} className={cn("border-b last:border-0", night ? "border-night-line" : "border-line")}>
              <th scope="row" className={cn("p-4 align-top font-medium", night ? "text-on-night-mute" : "text-mute")}>{r.label}</th>
              <td className="p-4 align-top">{r.chatbot}</td>
              <td className="p-4 align-top">{r.auto}</td>
              <td className="p-4 align-top">
                <span className="flex items-start gap-2"><Check className={cn("mt-0.5 h-4 w-4 shrink-0", night ? "text-unit-night" : "text-unit")} aria-hidden="true" />{r.agent}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
