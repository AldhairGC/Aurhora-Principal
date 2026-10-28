// Registro de solicitudes en Zoho CRM (formulario web "Sitio web aurhora.agency", módulo Posibles clientes).
// Los valores xnQsjsdp y xmIwtLD son identificadores públicos del formulario, no credenciales: Zoho los incluye
// en el HTML que se pega en cualquier sitio. Revocar el formulario en Zoho los deja sin efecto.
const ZOHO_ENDPOINT = "https://crm.zoho.com/crm/WebToLeadForm";
const ZOHO_FORM_ID = "a3e3991c138164c0687a7fe9d9b2c1e1910336e9d80e948e80b56dcc49f93d6c";
const ZOHO_FORM_KEY = "f00f85728f941f29e9bbccf96aacb9370403c60baec0cd057b4ff8d658232355068b0b4a7b961a7730927a0a791aae40";
const ZOHO_ACTION = "TGVhZHM=";

export type LeadData = {
  name?: string;
  phone?: string;
  /** Mensaje completo de la solicitud: queda en la descripción del registro. */
  summary: string;
};

/**
 * Envía la solicitud a Zoho sin bloquear al visitante: si falla, el flujo de WhatsApp sigue igual.
 * Zoho no devuelve cabeceras CORS, por eso la petición va en modo no-cors y no se lee la respuesta.
 */
export function sendLead({ name, phone, summary }: LeadData) {
  const body = new URLSearchParams({
    xnQsjsdp: ZOHO_FORM_ID,
    xmIwtLD: ZOHO_FORM_KEY,
    actionType: ZOHO_ACTION,
    // Zoho exige empresa y apellidos; sin ellos descarta el registro.
    Company: "Particular",
    "Last Name": name?.trim() || "Sin nombre (sitio web)",
    Description: summary,
  });
  if (phone?.trim()) body.set("Phone", phone.trim());
  // Campo trampa de Zoho contra bots: debe viajar vacío.
  body.set("aG9uZXlwb3Q", "");

  fetch(ZOHO_ENDPOINT, { method: "POST", mode: "no-cors", body, keepalive: true }).catch(() => {
    /* sin conexión o bloqueado: la persona sigue en WhatsApp */
  });
}
