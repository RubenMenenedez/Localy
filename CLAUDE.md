@AGENTS.md

# Website Builder — reglas del proyecto

SaaS multi-tenant donde negocios locales crean su web con un cuestionario, pagan setup + suscripción mensual y gestionan citas y mensajes desde un panel. Cada negocio se identifica por su subdominio (`negocio.dominio.com`) mediante middleware. Las webs públicas se renderizan desde la base de datos; no se generan archivos por cliente.

## Stack
- Next.js (App Router) + TypeScript estricto, Tailwind CSS
- PostgreSQL en Neon + Prisma 7 (driver adapter obligatorio, cliente generado en `lib/generated/prisma`, config en `prisma.config.ts`; migraciones con `DATABASE_URL_UNPOOLED`)
- Neon Auth (Better Auth gestionado; usuarios en el esquema `neon_auth`), configurado en `neon.ts` y aplicado con `neon deploy`
  - Servidor: `lib/auth/server.ts` (`auth.getSession()`); cliente: `lib/auth/client.ts`; `requireUser()` en `lib/auth/session.ts`.
  - No hay modelo `User` en Prisma: las tablas propias guardan `userId` (UUID indexado, sin FK) y la propiedad se comprueba en `/lib`.
  - Rol de plataforma: `session.user.role` (`"user"` / `"admin"`, plugin admin). No duplicarlo en Prisma.
  - Plugins y proveedores se configuran en Neon (Console / `neon neon-auth`), no pasando `plugins` al SDK.
- Desarrollo contra la rama Neon `development` (`neon checkout`); nunca migrar `production` desde local.
- Stripe (Checkout setup + suscripción, webhooks, Customer Portal), Zod
- Consultar la documentación oficial actual de cada herramienta antes de usar una API; no asumir de memoria. Para Next.js, leer `node_modules/next/dist/docs/`.

## Reglas de trabajo (obligatorias)
- **Por fases.** Al terminar una fase: parar, resumir lo hecho, archivos creados/modificados y lo pendiente. No empezar la siguiente sin confirmación.
- **Preguntar antes** de decisiones importantes: arquitectura, nuevas dependencias (justificarlas), cambios de alcance.
- **No sobreconstruir.** Nada de archivos, componentes, utilidades, páginas o features que la fase no necesite. Nada "por si acaso".
- **Estructura:** lógica de negocio y acceso a datos en `/lib`, componentes UI pequeños y de responsabilidad única en `/components`, rutas en `/app`.
- **Sin código muerto** ni comentarios obvios. Comentar solo lo que no se entiende leyendo el código.
- **Validación con Zod** de toda entrada: formularios, API, webhooks.
- **Permisos:** comprobar siempre que un usuario solo accede a los datos de su propio negocio.
- **Secretos:** nunca hardcodear claves. Toda variable va en `.env.example` con un comentario explicando su uso.
- **Tests solo para lógica crítica:** cálculo de huecos de citas, webhooks de Stripe y permisos por negocio.
- **Errores:** corregir en el sitio; no crear versiones alternativas del mismo archivo.

## CHECKLIST.md
- Cada vez que algo requiera un recurso externo o un paso de configuración, añadirlo en ese momento con el formato:
  `- [ ] Qué se necesita — para qué sirve — fase en que se añadió — quién lo hace (yo / Claude)`
- Marcar con `[x]` lo completado. Revisar y actualizar al final de cada fase.
- La sección de variables de entorno debe estar sincronizada con `.env.example`.

## Fuera de alcance (no construir salvo petición)
Dominios propios por cliente, editor visual drag-and-drop, app móvil, varias plantillas por tipo de negocio.

## Idiomas
Multi-idioma en alcance: inglés por defecto, más español, con selector para toda la UI de la plataforma (cuestionario, panel y pantallas de acceso). Añadir un idioma debe consistir solo en añadir un archivo de traducciones.

## Comandos
- `npm run dev` / `npm run build` / `npm run lint` / `npm run typecheck`
- `npx prisma migrate dev` para crear/aplicar migraciones; `npx prisma generate` regenera el cliente (también en `postinstall`).
