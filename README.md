# Aurhora Agency Website - Sitio Oficial

![Aurhora Agency](public/file.svg)

**Impulsando la Innovación con Resultados que Transforman.**

Sitio web corporativo de Aurhora Agency, una agencia especializada en transformación digital, desarrollo de software y optimización de procesos.

## 🚀 Características

- ✨ **Diseño moderno y responsivo** con animaciones fluidas
- 🌓 **Modo oscuro/claro** con persistencia en localStorage
- 🌍 **Multiidioma** (Español MX, English US, Português BR)
- 📊 **Analytics integrado** (Google Analytics, GTM, Microsoft Clarity) con eventos de conversión
- 📧 **Sistema de contacto** con envío de emails vía Brevo
- 💬 **Botón flotante de WhatsApp** para contacto directo
- ⚡ **Optimizado para rendimiento** con Next.js 15 y React 19
- 🎨 **Tailwind CSS** para estilos modulares y mantenibles

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm, yarn, pnpm o bun

## 🛠️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/AldhairGC/Aurhora-Principal.git
cd "Aurhora Agency Website"
```

2. Instala las dependencias:

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Configura las variables de entorno:

Crea un archivo `.env.local` basándote en `.env.example`:

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tu API key de Brevo y el número de WhatsApp:

```env
BREVO_API_KEY=tu_api_key_aqui
BREVO_SENDER_EMAIL=contacto@aurhora.agency
BREVO_ADMIN_EMAIL=contacto@aurhora.agency
NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678
```

## 🚦 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo en http://localhost:3000

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Linting
npm run lint         # Ejecuta ESLint para verificar el código
```

## 📁 Estructura del Proyecto

```
Aurhora Agency Website/
├── public/              # Archivos estáticos (imágenes, iconos)
├── src/
│   ├── app/            # App Router de Next.js
│   │   ├── api/        # API Routes
│   │   │   └── contact/    # Endpoint de contacto
│   │   ├── servicios/      # Páginas de servicios
│   │   ├── globals.css     # Estilos globales
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página de inicio
│   ├── components/     # Componentes React reutilizables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AurhoraLanding.tsx
│   │   └── ClientProviders.tsx
│   ├── context/        # Contextos de React
│   │   ├── ThemeContext.tsx    # Gestión de tema dark/light
│   │   └── I18nContext.tsx     # Sistema de internacionalización
│   ├── hooks/          # Custom hooks
│   │   └── useContactForm.ts
│   └── config/         # Archivos de configuración
│       └── services.config.ts
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── eslint.config.mjs   # Configuración de ESLint
├── next.config.ts      # Configuración de Next.js
├── package.json        # Dependencias del proyecto
├── postcss.config.mjs  # Configuración de PostCSS
├── tailwind.config.ts  # Configuración de Tailwind CSS
└── tsconfig.json       # Configuración de TypeScript
```

## 🌐 Servicios Disponibles

1. **GoDigital Suite** - Ecosistema digital integral
2. **Transformación Digital** - Estrategia e innovación
3. **Desarrollo de Software** - Productos digitales a medida
4. **Optimización de Procesos** - Sistemas de gestión de calidad
5. **Marketing Digital** - Estrategias de posicionamiento
6. **Cultura Ágil** - Transformación organizacional

## 🔧 Tecnologías Utilizadas

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Email:** [Brevo](https://brevo.com/)
- **Analytics:** Google Analytics, GTM, Microsoft Clarity

## 📧 Configuración de Email

El sistema de contacto utiliza [Brevo](https://brevo.com/) para el envío de correos electrónicos transaccionales.

1. Crea una cuenta en [Brevo](https://brevo.com/)
2. Genera una API key (SMTP & API → API Keys)
3. Verifica tu dominio `aurhora.agency` (remitente autenticado)
4. Agrega `BREVO_API_KEY`, `BREVO_SENDER_EMAIL` y `BREVO_ADMIN_EMAIL` a tu archivo `.env.local`

## 🌍 Internacionalización

El proyecto soporta tres idiomas:

- 🇲🇽 Español (México) - `es-MX` (por defecto)
- 🇺🇸 English (US) - `en-US`
- 🇧🇷 Português (Brasil) - `pt-BR`

Las traducciones están implementadas usando un contexto personalizado en `src/context/I18nContext.tsx`.

## 🎨 Sistema de Temas

El sitio incluye soporte para modo oscuro y claro:

- Toggle manual en el header
- Persistencia en localStorage
- Transiciones suaves entre temas
- Clases de Tailwind adaptadas por tema

## 📊 Analytics

El sitio tiene integrado:

- **Google Tag Manager:** GTM-TMP9R7B6
- **Google Analytics:** G-SQKR312YQR
- **Microsoft Clarity:** rxjrrdz9v5

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros Servicios

El proyecto es compatible con cualquier plataforma que soporte Next.js:

- Netlify
- AWS Amplify
- Google Cloud Run
- Docker

## 📝 Licencia

© 2026 Aurhora Agency. Todos los derechos reservados.

## 📞 Contacto

- **Email:** contacto@aurhora.agency
- **LinkedIn:** [Aurhora Agency](https://linkedin.com/company/aurhora-agency)
- **Instagram:** [@aurhora.agency](https://instagram.com/aurhora.agency)
- **Facebook:** [Aurhora Agency](https://facebook.com/aurhora.agency)

## 👥 Equipo de Desarrollo

Desarrollado con ❤️ por el equipo de Aurhora Agency.

---

**Impulsando la Innovación con Resultados que Transforman.**
