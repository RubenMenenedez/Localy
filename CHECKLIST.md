# Checklist de infraestructura

Formato: `- [ ] Qué se necesita — para qué sirve — fase — quién lo hace (yo / Claude)`

## Base de datos
- [x] Proyecto Neon `late-dust-65860167` (rama `production`) enlazado con `neon link` — base de datos de la plataforma — Fase 0 — yo / Claude
- [x] Neon Auth activado (`neon.ts` con `auth: true`, `neon deploy`) — autenticación gestionada (Better Auth) — Fase 0 — Claude
- [x] Rama Neon `development` creada y `.env` apuntando a ella — no desarrollar ni migrar contra `production` — Fase 0 — Claude
- [x] Migración inicial `20260925112807_init` aplicada en `development` — modelo de datos — Fase 1 — Claude
- [ ] Aplicar migraciones en `production` con `prisma migrate deploy` al desplegar — base de datos de producción — Fase 1 — yo / Claude
- [ ] Revisar la retención de historial / restauración en el plan de Neon — recuperación ante pérdida de datos — Fase 0 — yo
- [x] Revocar la API key `3364328` creada por `neon mcp` — seguridad (acceso a toda la cuenta) — Fase 0 — Claude
- [ ] Quitar la entrada del MCP de Neon de `~/.claude.json`, Copilot CLI y VS Code (ya no funciona sin la key) — limpieza — Fase 1 — yo

## Autenticación
- [x] Email/contraseña y Google (claves compartidas de Neon) activos en la rama `development` — inicio de sesión — Fase 1 — Neon (por defecto)
- [ ] Crear OAuth app propia de Google y configurarla en Neon Auth (las claves compartidas son solo para desarrollo y muestran la marca de Neon) — Google en producción — Fase 1 — yo
- [ ] Revisar email/contraseña y Google en la rama `production` — producción — Fase 1 — yo / Claude
- [ ] Añadir el dominio principal como trusted domain (`neon neon-auth domain add https://…`) — redirecciones de auth en producción — Fase 1 — yo / Claude
- [ ] Hacer admin a tu usuario (Console → Auth → Users → ⋯ → Make admin) en cada rama — área `/admin` futura — Fase 1 — yo
- [ ] Desactivar el plugin Organization en Neon Auth si no se va a usar (está activado por defecto) — reducir superficie — Fase 1 — yo / Claude

## Almacenamiento

## Hosting y dominios
- [x] Instalar Git — control de versiones y skills de Neon — Fase 0 — yo
- [x] Inicializar el repositorio git y primer commit — control de versiones — Fase 0 — Claude

## Pagos

## Email
- [ ] SMTP propio en Neon Auth (verificación y reset de contraseña); el SMTP compartido de Neon es solo para desarrollo — emails de auth en producción — Fase 1 — yo

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
- Multi-idioma en alcance (inglés por defecto + español); enfoque i18n pendiente de decisión. `lang="es"` del layout provisional hasta entonces.
- Borrador del cuestionario en el navegador hasta el registro; al registrarse se guarda en BD (`Business.userId` siempre obligatorio).
- Un usuario puede tener varios negocios (`userId` indexado, no único).
- `npm audit` reporta 4 vulnerabilidades altas en dependencias internas del CLI `prisma` (`mysql2`, `deepmerge-ts`), que `@prisma/client` arrastra como peer; la app no las ejecuta y la "solución" automática baja a Prisma 6. Revisar al actualizar Prisma.
- `@neondatabase/auth` 0.5.0-beta fijado a versión exacta — el SDK de Neon Auth aún es beta.
- Usuarios en `neon_auth.user` (gestionado por Neon); no hay modelo `User` en Prisma. `Business.userId` es un UUID indexado sin FK; la propiedad se comprueba en `/lib`.
- Rol de plataforma = `neon_auth.user.role` (`user` / `admin`) del plugin admin — una sola fuente de verdad; sin columna de rol duplicada en Prisma.
- UI de auth prediseñada de `@neondatabase/auth/react/ui` (incluida en el SDK, sin dependencia extra); el provider solo envuelve `/auth`, no las webs públicas.
- Precios en céntimos (`priceCents`), horarios en minutos desde medianoche local y `Business.timezone` (IANA, obligatorio, sin valor por defecto; se detecta del dispositivo en el cuestionario y el dueño puede cambiarlo) para calcular huecos.
- Estados de suscripción: enum que refleja `subscription.status` de Stripe.
