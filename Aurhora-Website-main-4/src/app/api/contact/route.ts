import { NextResponse } from "next/server";
import { Resend } from "resend";
import { AdminEmailTemplate } from "./email-templates";
import { promises as fs } from "fs";
import path from "path";

// Inicializar Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

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
    // Leer la plantilla HTML y reemplazar el nombre
    const templatePath = path.join(
      process.cwd(),
      "src/app/api/contact/email-template-user.html"
    );
    let htmlTemplate = await fs.readFile(templatePath, "utf8");
    htmlTemplate = htmlTemplate
      .replace("[Nombre del Cliente]", nombre)
      .replace("{{year}}", currentYear.toString());

    // Enviar correo al usuario
    await resend.emails.send({
      from: "Aurhora <contacto@aurhora.it.com>",
      to: email,
      subject: "¡Gracias por contactar a Aurhora!",
      html: htmlTemplate,
    });

    // Espera 600ms antes de enviar el siguiente correo
    await new Promise((r) => setTimeout(r, 600));

    // Enviar correo al admin
    await resend.emails.send({
      from: "Aurhora <contacto@aurhora.it.com>",
      to: "contacto@aurhora.it.com",
      subject: `Nuevo contacto desde ${source || "sitio web"}`,
      react: AdminEmailTemplate({
        nombre,
        email,
        telefono,
        empresa,
        mensaje: mainMessage,
        source,
      }),
    });

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
