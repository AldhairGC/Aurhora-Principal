// src/lib/brevo/deals.ts
//
// Creación automática de oportunidades (deals) en el CRM de Brevo.
// Cada lead del sitio se coloca en el pipeline "GoDigital" → etapa "Novedad".
// Es enriquecimiento no-crítico: cualquier fallo se registra pero nunca rompe
// el flujo del formulario. Ver docs/MARKETING_STRATEGY.md §6.

const BREVO_API_BASE = "https://api.brevo.com/v3";

// Cachea el stage ID para no llamar la API en cada request (vive mientras la
// instancia serverless esté caliente).
let cachedStageId: string | null = null;

async function getNovedadStageId(apiKey: string): Promise<string | null> {
  if (cachedStageId) return cachedStageId;

  try {
    const res = await fetch(`${BREVO_API_BASE}/crm/pipeline/details/all`, {
      headers: { "api-key": apiKey, Accept: "application/json" },
      next: { revalidate: 3600 }, // cache 1h en Next.js
    });
    if (!res.ok) return null;

    const data = await res.json();
    // La API devuelve array o { pipelines: [...] } según versión
    const pipelines = Array.isArray(data) ? data : data.pipelines ?? [];

    const pipeline = pipelines.find((p: { name?: string; pipelineName?: string }) =>
      (p.name ?? p.pipelineName ?? "").toLowerCase().includes("godigital")
    );
    if (!pipeline) {
      console.warn('[Brevo Deals] Pipeline "GoDigital" no encontrado');
      return null;
    }

    const stages: Array<{ id: string; name?: string; stageName?: string }> =
      pipeline.stages ?? pipeline.stageOrder ?? [];

    const stage = stages.find((s) =>
      (s.name ?? s.stageName ?? "").toLowerCase().includes("novedad")
    );
    if (!stage) {
      console.warn('[Brevo Deals] Etapa "Novedad" no encontrada, usando primera etapa');
      cachedStageId = stages[0]?.id ?? null;
      return cachedStageId;
    }

    cachedStageId = stage.id;
    return cachedStageId;
  } catch (err) {
    console.error("[Brevo Deals] Error obteniendo pipeline:", err);
    return null;
  }
}

async function getContactId(email: string, apiKey: string): Promise<number | null> {
  try {
    const res = await fetch(
      `${BREVO_API_BASE}/contacts/${encodeURIComponent(email)}`,
      { headers: { "api-key": apiKey, Accept: "application/json" } }
    );
    if (!res.ok) return null;
    const contact = await res.json();
    return contact.id ?? null;
  } catch {
    return null;
  }
}

interface LeadData {
  name: string;
  email: string;
  empresa?: string;
  source?: string;
  /** Líneas extra (plan, UTM, gclid…) para la descripción del deal. */
  details?: [string, string][];
}

export async function createBrevoDeal(apiKey: string, lead: LeadData): Promise<void> {
  try {
    const [stageId, contactId] = await Promise.all([
      getNovedadStageId(apiKey),
      getContactId(lead.email, apiKey),
    ]);

    if (!stageId) {
      console.warn("[Brevo Deals] Sin stage ID, deal no creado");
      return;
    }

    const dealName = lead.empresa
      ? `${lead.empresa} — ${lead.name}`
      : `Lead — ${lead.name}`;

    const dealRes = await fetch(`${BREVO_API_BASE}/crm/deals`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: dealName,
        attributes: {
          deal_stage: stageId,
          deal_description: [
            `Canal: ${lead.source ?? "web"}`,
            ...(lead.details ?? []).map(([k, v]) => `${k}: ${v}`),
          ].join("\n"),
        },
      }),
    });

    if (!dealRes.ok) {
      const err = await dealRes.text();
      console.error("[Brevo Deals] Error creando deal:", err);
      return;
    }

    const deal = await dealRes.json();

    // Vincular el deal al contacto de Brevo (para ver historial)
    if (contactId && deal.id) {
      await fetch(`${BREVO_API_BASE}/crm/deals/link-unlink/${deal.id}`, {
        method: "PATCH",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ contactIds: [contactId] }),
      });
    }

    console.log(`[Brevo Deals] ✅ Deal creado: "${dealName}"`);
  } catch (error) {
    // No-blocking: el error no rompe el flujo del formulario
    console.error("[Brevo Deals] Error inesperado:", error);
  }
}
