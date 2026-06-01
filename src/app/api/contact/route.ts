import { NextResponse } from "next/server";
import { buildUserEmailHtml } from "./email-template-user";
import { buildAdminEmailHtml } from "./email-template-admin";

// Remitente — el dominio/email debe estar autenticado en Brevo
const SENDER = {
  name: "Aurhora",
  email: process.env.BREVO_SENDER_EMAIL || "contacto@aurhora.agency",
};
const ADMIN_EMAIL = process.env.BREVO_ADMIN_EMAIL || "contacto@aurhora.agency";
// Lista de Brevo donde se agregan los leads del sitio (opcional).
const CONTACT_LIST_ID = process.env.BREVO_CONTACT_LIST_ID
  ? Number(process.env.BREVO_CONTACT_LIST_ID)
  : undefined;

type BrevoResult = { data?: unknown; error?: { message: string } };

/**
 * Crea o actualiza el contacto en el CRM de Brevo (upsert por email).
 * Es enriquecimiento, NO la vía crítica: si falla, el lead ya se notificó por
 * correo, así que solo registramos el error y seguimos.
 *
 * Atributos personalizados usados (créalos en Brevo → Contactos → Configuración
 * → Atributos de contacto, como tipo texto): EMPRESA, TELEFONO, ORIGEN, MENSAJE.
 */
async function upsertBrevoContact(params: {
  email: string;
  nombre?: string;
  telefono?: string;
  empresa?: string;
  source?: string;
  mensaje?: string;
}): Promise<BrevoResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { error: { message: "BREVO_API_KEY no está configurada" } };

  const attributes: Record<string, string> = {};
  if (params.nombre) attributes.FIRSTNAME = params.nombre;
  if (params.empresa) attributes.EMPRESA = params.empresa;
  if (params.telefono) attributes.TELEFONO = params.telefono;
  if (params.source) attributes.ORIGEN = params.source;
  if (params.mensaje) attributes.MENSAJE = params.mensaje.slice(0, 500);

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: params.email,
        attributes,
        updateEnabled: true, // upsert: no falla si el contacto ya existe
        ...(CONTACT_LIST_ID ? { listIds: [CONTACT_LIST_ID] } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return { error: { message: detail || `Brevo HTTP ${res.status}` } };
    }
    return { data: res.status === 204 ? null : await res.json() };
  } catch (err) {
    return {
      error: { message: err instanceof Error ? err.message : "Error de red con Brevo" },
    };
  }
}

/**
 * Envía un correo transaccional vía la API REST de Brevo.
 * El SDK no es necesario: fetch funciona en serverless sin dependencias extra.
 */
async function sendBrevoEmail(params: {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
}): Promise<BrevoResult> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return { error: { message: "BREVO_API_KEY no está configurada" } };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email: params.toEmail, name: params.toName }],
        subject: params.subject,
        htmlContent: params.htmlContent,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return { error: { message: detail || `Brevo HTTP ${res.status}` } };
    }
    return { data: await res.json() };
  } catch (err) {
    return {
      error: { message: err instanceof Error ? err.message : "Error de red con Brevo" },
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombre,
      email,
      telefono,
      empresa,
      mensaje,
      necesidad,
      proyecto,
      proceso,
      desafio,
      objetivos,
      source,
    } = body;

    // Determinar el campo de mensaje principal
    const mainMessage =
      mensaje ||
      necesidad ||
      proyecto ||
      proceso ||
      (desafio && objetivos
        ? `Desafío: ${desafio}\nObjetivos: ${objetivos}`
        : desafio || objetivos);

    // Validar campos requeridos
    if (!nombre || !email || !mainMessage) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    const htmlTemplate = buildUserEmailHtml(nombre, currentYear);

    // Correo de confirmación al usuario
    const userSend = await sendBrevoEmail({
      toEmail: email,
      toName: nombre,
      subject: "¡Gracias por contactar a Aurhora!",
      htmlContent: htmlTemplate,
    });
    if (userSend.error) {
      console.error("Error de Brevo (correo usuario):", userSend.error);
      return NextResponse.json(
        { error: "No se pudo enviar el correo de confirmación", detail: userSend.error.message },
        { status: 502 }
      );
    }

    // Aviso al equipo (admin)
    const adminSend = await sendBrevoEmail({
      toEmail: ADMIN_EMAIL,
      subject: `Nuevo contacto desde ${source || "sitio web"}`,
      htmlContent: buildAdminEmailHtml({
        nombre,
        email,
        telefono,
        empresa,
        mensaje: mainMessage,
        source,
      }),
    });
    if (adminSend.error) {
      console.error("Error de Brevo (correo admin):", adminSend.error);
      return NextResponse.json(
        { error: "No se pudo enviar el aviso al equipo", detail: adminSend.error.message },
        { status: 502 }
      );
    }

    // Enriquecimiento CRM: registrar/actualizar el lead en Brevo con su origen.
    // No bloquea la respuesta: el correo de aviso ya garantizó la captura.
    const crmUpsert = await upsertBrevoContact({
      email,
      nombre,
      telefono,
      empresa,
      source,
      mensaje: mainMessage,
    });
    if (crmUpsert.error) {
      console.error("Aviso: no se pudo sincronizar el contacto con Brevo CRM:", crmUpsert.error);
    }

    return NextResponse.json(
      { message: "Correos enviados exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar correos:", error);
    return NextResponse.json(
      { error: "Error al enviar los correos" },
      { status: 500 }
    );
  }
}
