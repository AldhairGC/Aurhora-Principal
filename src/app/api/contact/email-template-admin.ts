/**
 * Plantilla del correo de aviso al equipo (admin).
 * Devuelve HTML (string) para enviarse vía la API de Brevo.
 * Reemplaza al componente React AdminEmailTemplate (específico de Resend).
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface AdminEmailData {
  nombre: string;
  email?: string;
  telefono?: string;
  empresa?: string;
  mensaje?: string;
  source?: string;
}

export function buildAdminEmailHtml({
  nombre,
  email,
  telefono,
  empresa,
  mensaje,
  source,
}: AdminEmailData): string {
  const row = (label: string, value?: string) =>
    `<p style="margin:0 0 10px;"><strong>${label}:</strong> ${escapeHtml(value || "")}</p>`;

  const mensajeHtml = escapeHtml(mensaje || "").replace(/\n/g, "<br>");

  return `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111827;">
  <h2 style="color:#111827;">Nuevo mensaje de contacto</h2>
  ${row("Nombre", nombre)}
  ${row("Email", email || "No proporcionado")}
  ${row("Teléfono", telefono || "No proporcionado")}
  ${row("Empresa", empresa || "No proporcionada")}
  <p style="margin:0 0 10px;"><strong>Mensaje:</strong> ${mensajeHtml}</p>
  ${row("Fuente", source || "sitio web")}
</div>`;
}
