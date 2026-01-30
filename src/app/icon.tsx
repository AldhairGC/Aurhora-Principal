import { ImageResponse } from 'next/og'
 
// Configuración de la ruta
export const runtime = 'edge'
 
// Metadatos de la imagen
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Generación del icono
export default function Icon() {
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
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
            display: 'flex',
            letterSpacing: '-1px',
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
