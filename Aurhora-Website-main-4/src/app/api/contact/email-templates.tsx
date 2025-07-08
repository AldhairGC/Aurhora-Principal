import * as React from "react";

interface EmailTemplateProps {
  nombre: string;
  email?: string;
  telefono?: string;
  empresa?: string;
  mensaje?: string;
  source?: string;
}

export const AdminEmailTemplate = ({
  nombre,
  email,
  telefono,
  empresa,
  mensaje,
  source,
}: EmailTemplateProps) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <h2 style={{ color: "#333" }}>Nuevo mensaje de contacto</h2>
    <p>
      <strong>Nombre:</strong> {nombre}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <p>
      <strong>Teléfono:</strong> {telefono || "No proporcionado"}
    </p>
    <p>
      <strong>Empresa:</strong> {empresa || "No proporcionada"}
    </p>
    <p>
      <strong>Mensaje:</strong> {mensaje}
    </p>
    <p>
      <strong>Fuente:</strong> {source || "sitio web"}
    </p>
  </div>
);
