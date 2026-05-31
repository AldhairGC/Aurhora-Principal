/**
 * Plantilla del correo de confirmación al usuario (cliente).
 * Diseño Aurora: claro, limpio, gradiente firma. HTML robusto para clientes de
 * correo (tablas + estilos inline + colores sólidos de fallback para gradientes).
 * Función serverless-safe (no lee del filesystem).
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildUserEmailHtml(nombre: string, year: number | string): string {
  const safeNombre = escapeHtml(nombre);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Gracias por contactar a Aurhora</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F4F5;-webkit-font-smoothing:antialiased;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <span style="display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">Confirmamos tu solicitud. En breve te contactaremos.</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F4F5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border:1px solid #E4E4E7;border-radius:16px;overflow:hidden;">
          <!-- Barra de gradiente firma -->
          <tr>
            <td style="height:5px;line-height:5px;font-size:0;background-color:#4F46E5;background-image:linear-gradient(90deg,#7C3AED 0%,#4F46E5 50%,#06B6D4 100%);">&nbsp;</td>
          </tr>
          <!-- Marca -->
          <tr>
            <td style="padding:32px 40px 0;">
              <span style="font-size:22px;font-weight:700;color:#09090B;letter-spacing:-0.5px;">Aurhora</span>
              <span style="font-size:14px;color:#71717A;">&nbsp;Agency</span>
            </td>
          </tr>
          <!-- Cuerpo -->
          <tr>
            <td style="padding:24px 40px 0;">
              <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#09090B;font-weight:700;">¡Hola, ${safeNombre}!</h1>
              <p style="margin:0 0 22px;font-size:16px;line-height:1.6;color:#52525B;">
                Hemos recibido tu solicitud. <strong style="color:#09090B;">Tu mensaje ya está en manos de nuestro equipo de especialistas.</strong>
              </p>
              <!-- Caja destacada -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F3FF;border:1px solid #E9E5FF;border-radius:12px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#4F46E5;">¿Qué sigue ahora?</p>
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#52525B;">
                      Un especialista de Aurhora te contactará personalmente en las próximas <strong style="color:#09090B;">24 horas hábiles</strong> para dar seguimiento y agendar tu sesión estratégica.
                    </p>
                  </td>
                </tr>
              </table>
              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px;">
                <tr>
                  <td style="border-radius:12px;background-color:#4F46E5;background-image:linear-gradient(90deg,#7C3AED 0%,#4F46E5 50%,#06B6D4 100%);">
                    <a href="https://www.aurhora.agency" target="_blank" style="display:inline-block;padding:14px 30px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:12px;">Conoce nuestros servicios &rarr;</a>
                  </td>
                </tr>
              </table>
              <p style="margin:26px 0 0;font-size:16px;line-height:1.6;color:#52525B;">
                Atentamente,<br><strong style="color:#09090B;">El equipo de Aurhora</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px 32px;">
              <div style="height:1px;line-height:1px;font-size:0;background-color:#E4E4E7;margin-bottom:20px;">&nbsp;</div>
              <p style="margin:0;font-size:12px;line-height:1.7;color:#A1A1AA;">
                ¿Tienes una pregunta urgente? Escríbenos a <a href="mailto:contacto@aurhora.agency" style="color:#4F46E5;text-decoration:none;">contacto@aurhora.agency</a> o por <a href="https://wa.me/5215582991282" target="_blank" style="color:#4F46E5;text-decoration:none;">WhatsApp</a>.<br><br>
                Aurhora Agency &copy; ${year}. Todos los derechos reservados.<br>
                Recibiste este correo porque llenaste un formulario en nuestro sitio.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:11px;color:#A1A1AA;">www.aurhora.agency</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
