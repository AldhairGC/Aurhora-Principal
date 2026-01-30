import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher para aplicar el middleware a todas las rutas excepto:
  // - api routes
  // - archivos estáticos (_next)
  // - archivos con extensión (imágenes, etc.)
  matcher: ['/', '/(es|en|pt)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
