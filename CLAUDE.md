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

## Idiomas (next-intl)
- **Todo texto visible para el usuario pasa por next-intl; nunca texto hardcodeado** en componentes, páginas, metadata, errores mostrados ni emails. Esto incluye nombres de marca y placeholders.
- Inglés por defecto (`en`) y español (`es`). Mensajes en `messages/<locale>.json`; `messages/en.json` es la referencia de tipos (`global.d.ts`).
- Añadir un idioma: crear `messages/<code>.json` con las mismas claves que `en.json` y añadir el código a `locales` en `lib/i18n/config.ts`.
- UI de la plataforma (cuestionario, panel, acceso): idioma de la cookie `locale` (sin prefijos en la URL), cambiado con `LanguageSelector` → acción `setLocale`. Config en `lib/i18n/request.ts`.
- Textos de la UI de Neon Auth: namespace `auth` de cada archivo de mensajes, pasado como `localization` en `AuthProvider`.
- Web pública de cada negocio: idioma de `Business.language` (elegido por el dueño); la cookie del visitante no lo cambia.
- Server components: `getTranslations`; client components: `useTranslations`.

## Fases
0. Proyecto base ✅ · 1. Modelo de datos y autenticación ✅ · 2. Tipo de negocio y cuestionario ✅
3. Plantilla pública única + vista previa en vivo.
4. Stripe (setup + suscripción, webhooks activar/suspender/reactivar).
5. Subdominios y publicación.
6. Reserva de citas en la web pública y formulario de contacto.
   - Empleados: el cliente elige un empleado o "cualquiera disponible"; los huecos se calculan por empleado (horario del empleado ∩ horario del negocio, servicios que ofrece, citas existentes). Con "cualquiera", se asigna un empleado libre al reservar.
7. Panel del negocio (citas, mensajes, edición de la web, suscripción).
   - Empleados: el dueño crea empleados reservables (nombre, servicios, horario) sin necesidad de invitarlos, y opcionalmente los invita por email para vincular una cuenta.
   - Permisos: el dueño (`Business.userId`) ve todas las citas y es el único que edita web, precios y facturación; un empleado con cuenta (`Staff.userId`) solo ve y gestiona sus propias citas.
8. Emails de confirmación, SEO básico, páginas legales y pulido.

## Permisos por negocio
- Dueño = `Business.userId`. Empleado = `Staff.userId`. Toda consulta a datos de un negocio se filtra por uno de los dos roles en `/lib`, nunca solo en la UI.
- El dueño/propietario nunca se toma de la entrada del cliente, siempre de la sesión (`requireUser()`).
- Un negocio siempre conserva al menos un `Staff` activo (al crear el negocio se crea la ficha del dueño; comprobarlo al desactivar/eliminar empleados).

## Cuestionario
- Borrador en `localStorage` (`lib/questionnaire/draft-storage.ts`) con la forma `PartialBusinessDraft`; la vista previa de la Fase 3 debe leer esa misma forma.
- Esquemas Zod por paso en `lib/questionnaire/schema.ts`; los mensajes de error de Zod son claves de `Questionnaire.errors`.
- Al terminar: `/start/complete` (protegida) llama a `submitDraft`, que crea negocio + servicios + horario + ficha de empleado del dueño en una transacción (`lib/business/create.ts`).

## Comandos
- `npm run dev` / `npm run build` / `npm run lint` / `npm run typecheck` / `npm test` (Vitest)
- `npx prisma migrate dev` para crear/aplicar migraciones; `npx prisma generate` regenera el cliente (también en `postinstall`).
