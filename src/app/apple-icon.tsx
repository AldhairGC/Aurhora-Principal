import { ImageResponse } from 'next/og'
 
// Configuración de la ruta
export const runtime = 'edge'
 
// Metadatos de la imagen
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Generación del icono de Apple
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #9333EA 0%, #3B82F6 100%)',
          borderRadius: '36px',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
            display: 'flex',
            letterSpacing: '-4px',
          }}
        >
          A
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
