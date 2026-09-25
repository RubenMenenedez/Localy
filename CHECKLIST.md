# Checklist de infraestructura

Formato: `- [ ] Qué se necesita — para qué sirve — fase — quién lo hace (yo / Claude)`

## Base de datos
- [x] Proyecto Neon `late-dust-65860167` (rama `production`) enlazado con `neon link` — base de datos de la plataforma — Fase 0 — yo / Claude
- [x] Neon Auth activado (`neon.ts` con `auth: true`, `neon deploy`) — autenticación gestionada (Better Auth) — Fase 0 — Claude
- [x] Rama Neon `development` creada y `.env` apuntando a ella — no desarrollar ni migrar contra `production` — Fase 0 — Claude
- [x] Migración inicial `20260925112807_init` aplicada en `development` — modelo de datos — Fase 1 — Claude
- [x] Migraciones `remove_timezone_default` y `add_business_language` aplicadas en `development` — modelo de datos — Fase 1 — Claude
- [ ] Aplicar migraciones en `production` con `prisma migrate deploy` al desplegar — base de datos de producción — Fase 1 — yo / Claude
- [x] Migración `questionnaire_style_options` (26 tipos, objetivo, estilo, tipografías, 4 colores) aplicada en `development` — opciones del cuestionario — Fase 2 — Claude
- [x] Migración `staff_and_business_draft` (`Staff`, `StaffService`, `StaffWorkingHours`, `Appointment.staffId` obligatorio, `Business.status`) aplicada en `development` — reservas por empleado y borradores — Fase 2 — Claude
- [ ] Tabla de invitaciones de empleados (token con hash, email, caducidad) — vincular cuenta a un empleado — Fase 7 — Claude
- [ ] Revisar la retención de historial / restauración en el plan de Neon — recuperación ante pérdida de datos — Fase 0 — yo
- [x] Revocar la API key `3364328` creada por `neon mcp` — seguridad (acceso a toda la cuenta) — Fase 0 — Claude
- [ ] Quitar la entrada del MCP de Neon de `~/.claude.json`, Copilot CLI y VS Code (ya no funciona sin la key) — limpieza — Fase 1 — yo

## Autenticación
- [x] Email/contraseña y Google (claves compartidas de Neon) activos en la rama `development` — inicio de sesión — Fase 1 — Neon (por defecto)
- [ ] Crear OAuth app propia de Google y configurarla en Neon Auth (las claves compartidas son solo para desarrollo y muestran la marca de Neon) — Google en producción — Fase 1 — yo
- [ ] Revisar email/contraseña y Google en la rama `production` — producción — Fase 1 — yo / Claude
- [ ] Añadir el dominio principal como trusted domain (`neon neon-auth domain add https://…`) — redirecciones de auth en producción — Fase 1 — yo / Claude
- [ ] Hacer admin a tu usuario (Console → Auth → Users → ⋯ → Make admin) en cada rama — área `/admin` futura — Fase 1 — yo
- [x] Plugin Organization de Neon Auth desactivado en `development` y `production` (`neon neon-auth config organization update --enabled=false --branch <rama>`) — no se usa; empleados con tablas propias — Fase 2 — Claude
- [ ] Revisar el tema de la UI de acceso: sigue el modo oscuro del sistema mientras el resto de la plataforma es claro — coherencia visual — Fase 2 — Claude (Fase 8)

## Almacenamiento
- [ ] Elegir y configurar almacenamiento de archivos (p. ej. Neon Object Storage, Vercel Blob o S3/R2) — subida de logotipo e imágenes; el paso del cuestionario existe pero no sube nada aún — Fase 2 — yo (cuenta) / Claude (integración)
- [ ] Variables de entorno del almacenamiento en `.env.example` — acceso al bucket — Fase 2 — Claude

## Hosting y dominios
- [x] Instalar Git — control de versiones y skills de Neon — Fase 0 — yo
- [x] Inicializar el repositorio git y primer commit — control de versiones — Fase 0 — Claude

## Pagos

## Email
- [ ] SMTP propio en Neon Auth (verificación y reset de contraseña); el SMTP compartido de Neon es solo para desarrollo — emails de auth en producción — Fase 1 — yo
- [ ] Proveedor de email transaccional para la app (p. ej. Resend) — invitaciones de empleados (Fase 7) y confirmaciones de citas (Fase 8); se adelanta a la Fase 7 — Fase 1 — yo (cuenta) / Claude (integración)
- [ ] Traducir todos los emails de la app vía next-intl (idioma del destinatario: dueño/empleado por su preferencia, cliente por `Business.language`) — Fase 1 — Claude

## Variables de entorno
- [x] `DATABASE_URL` — conexión pooled de la app a Neon — Fase 0 — Claude (vía `neon env pull`)
- [x] `DATABASE_URL_UNPOOLED` — conexión directa para migraciones de Prisma — Fase 0 — Claude (vía `neon env pull`)
- [x] `NEON_AUTH_BASE_URL` — endpoint de Neon Auth — Fase 0 — Claude (vía `neon env pull`)
- [x] `NEON_AUTH_COOKIE_SECRET` — firma de cookies de sesión — Fase 0 — Claude (generado en local)
- [ ] Configurar las mismas variables en el hosting de producción (con los valores de la rama `production` y un secreto nuevo) — despliegue — Fase 0 — yo

## Legal

## Decisiones técnicas
- Next.js 16.3 (última estable) con App Router, sin `src/`, alias `@/*` — estructura `/app`, `/components`, `/lib` pedida.
- Prisma 7.10.0 (última estable; la 8 sigue en RC) con `@prisma/adapter-neon` — Prisma 7 exige driver adapter y Neon recomienda este; Node 22+ trae WebSocket nativo, no hace falta `ws`.
- PostgreSQL en Neon y autenticación con Neon Auth (Better Auth gestionado) en lugar de Auth.js — decisión del usuario.
- Migraciones de Prisma con la conexión directa (`DATABASE_URL_UNPOOLED`); la app usa la pooled.
- Cliente Prisma generado en `lib/generated/prisma` (ignorado en git, se regenera en `postinstall`).
- `dotenv` como dependencia — Prisma 7 no carga `.env` por sí solo en `prisma.config.ts`.
- npm como gestor de paquetes — el que viene con Node, sin herramientas extra.
- i18n con `next-intl` 4.14.7, sin prefijos de idioma en la URL: idioma de la plataforma en la cookie `locale` (por defecto `en`), no interfiere con el enrutado por subdominio de `proxy.ts`. Web pública en `Business.language`.
- Nombres de idioma en el selector con `Intl.DisplayNames` (sin lista de nombres que mantener).
- `zod` 4.3.6 como dependencia directa — la misma versión que ya usa `@neondatabase/auth`, sin duplicados.
- `@neon/env` eliminado (sin uso); `@neon/config` como devDependency (solo lo usa `neon.ts`).
- Empleados con tablas propias (`Staff`, invitaciones en Fase 7) en lugar del plugin Organization — una sola fuente de verdad en nuestra BD, empleados sin cuenta, permisos testeables. Confirmado por el usuario.
- Al crear un negocio se crea una ficha `Staff` del dueño (todos los servicios, horario = horario del negocio); todas las citas tienen `staffId`. Siempre debe quedar al menos un `Staff` activo.
- `Business.status` solo tiene `DRAFT` por ahora; los estados de publicación se añaden en la Fase 5.
- Precios sin moneda por ahora (el cuestionario pide un número); la moneda se decide con Stripe en la Fase 4.
- Paletas y servicios de ejemplo por tipo en `lib/business-types.ts`; las secciones por tipo se definirán con la plantilla (Fase 3).
- 26 tipos de negocio agrupados en sectores; 6 paletas por sector + 20 paletas generales filtrables por estilo (claras, oscuras, cálidas, frías). Cada paleta tiene 4 colores: principal, secundario, acento y fondo.
- Nuevas preguntas del cuestionario guardadas en `Business`: objetivo (`WebsiteGoal`), estilo (`WebsiteStyle`) y tipografías (`FontPairing`). Reglas visuales de cada estilo en `lib/website-styles.ts` y tipografías en `lib/fonts.ts` (next/font, sin dependencias nuevas); las usará también la plantilla pública.
- Migración `questionnaire_style_options`: rellena las columnas nuevas de las filas existentes y elimina los valores por defecto, para que sigan siendo obligatorias.
- El paso de estilo fija por defecto tipografía, posición del texto (`TextAlign`) y títulos en negrita (`boldHeadings`) según el estilo elegido; el dueño puede cambiarlos en el mismo paso (ya no hay paso de tipografías). Migración `style_text_options`.
- Vista previa en vivo (`components/questionnaire/site-preview.tsx`) en el panel derecho del cuestionario a partir del paso 3; la Fase 3 la sustituirá por la plantilla real.
- Vitest 5.0.2 (dev) para tests de lógica crítica; `@types/node` subido a ^24 (runtime Node 24; lo exige Vitest 5).
- Borrador del cuestionario en el navegador hasta el registro; al registrarse se guarda en BD (`Business.userId` siempre obligatorio).
- Un usuario puede tener varios negocios (`userId` indexado, no único).
- `npm audit` reporta 4 vulnerabilidades altas en dependencias internas del CLI `prisma` (`mysql2`, `deepmerge-ts`), que `@prisma/client` arrastra como peer; la app no las ejecuta y la "solución" automática baja a Prisma 6. Revisar al actualizar Prisma.
- `@neondatabase/auth` 0.5.0-beta fijado a versión exacta — el SDK de Neon Auth aún es beta.
- Usuarios en `neon_auth.user` (gestionado por Neon); no hay modelo `User` en Prisma. `Business.userId` es un UUID indexado sin FK; la propiedad se comprueba en `/lib`.
- Rol de plataforma = `neon_auth.user.role` (`user` / `admin`) del plugin admin — una sola fuente de verdad; sin columna de rol duplicada en Prisma.
- UI de auth prediseñada de `@neondatabase/auth/react/ui` (incluida en el SDK, sin dependencia extra); el provider solo envuelve `/auth`, no las webs públicas.
- `Business.language` obligatorio, sin valor por defecto, validado en código contra `locales` (sin enum en BD, para añadir idiomas sin migrar).
- Precios en céntimos (`priceCents`), horarios en minutos desde medianoche local y `Business.timezone` (IANA, obligatorio, sin valor por defecto; se detecta del dispositivo en el cuestionario y el dueño puede cambiarlo) para calcular huecos.
- Estados de suscripción: enum que refleja `subscription.status` de Stripe.
