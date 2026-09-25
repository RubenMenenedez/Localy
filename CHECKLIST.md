# Checklist de infraestructura

Formato: `- [ ] Qué se necesita — para qué sirve — fase — quién lo hace (yo / Claude)`

## Base de datos
- [x] Proyecto Neon `late-dust-65860167` (rama `production`) enlazado con `neon link` — base de datos de la plataforma — Fase 0 — yo / Claude
- [x] Neon Auth activado (`neon.ts` con `auth: true`, `neon deploy`) — autenticación gestionada (Better Auth) — Fase 0 — Claude
- [ ] Crear una rama Neon de desarrollo — no desarrollar ni migrar contra `production` — Fase 0 — yo / Claude
- [ ] Revisar la retención de historial / restauración en el plan de Neon — recuperación ante pérdida de datos — Fase 0 — yo
- [ ] Revocar la API key `3364328` creada por `neon mcp` si no se va a usar el MCP (acceso a toda la cuenta) — seguridad — Fase 0 — yo

## Almacenamiento

## Hosting y dominios
- [x] Instalar Git — control de versiones y skills de Neon — Fase 0 — yo
- [ ] Inicializar el repositorio git — control de versiones — Fase 0 — yo / Claude

## Pagos

## Email

## Variables de entorno
- [x] `DATABASE_URL` — conexión pooled de la app a Neon — Fase 0 — Claude (vía `neon env pull`)
- [x] `DATABASE_URL_UNPOOLED` — conexión directa para migraciones de Prisma — Fase 0 — Claude (vía `neon env pull`)
- [x] `NEON_AUTH_BASE_URL` — endpoint de Neon Auth — Fase 0 — Claude (vía `neon env pull`)
- [x] `NEON_AUTH_COOKIE_SECRET` — firma de cookies de sesión — Fase 0 — Claude (generado en local)
- [ ] Configurar las mismas variables en el hosting de producción — despliegue — Fase 0 — yo

## Legal

## Decisiones técnicas
- Next.js 16.3 (última estable) con App Router, sin `src/`, alias `@/*` — estructura `/app`, `/components`, `/lib` pedida.
- Prisma 7.10.0 (última estable; la 8 sigue en RC) — Prisma 7 exige driver adapter; se cambiará `@prisma/adapter-pg` por `@prisma/adapter-neon` (recomendado por Neon) en la Fase 1.
- PostgreSQL en Neon y autenticación con Neon Auth (Better Auth gestionado) en lugar de Auth.js — decisión del usuario.
- Migraciones de Prisma con la conexión directa (`DATABASE_URL_UNPOOLED`); la app usa la pooled.
- Cliente Prisma generado en `lib/generated/prisma` (ignorado en git, se regenera en `postinstall`).
- `dotenv` como dependencia — Prisma 7 no carga `.env` por sí solo en `prisma.config.ts`.
- npm como gestor de paquetes — el que viene con Node, sin herramientas extra.
- `lang="es"` en el layout — la plataforma es monoidioma (multi-idioma fuera de alcance).
- `npm audit` reporta 4 vulnerabilidades altas en dependencias internas del CLI `prisma` (`mysql2`, `deepmerge-ts`), que `@prisma/client` arrastra como peer; la app no las ejecuta (usamos `pg`, no MySQL) y la "solución" automática baja a Prisma 6. Revisar al actualizar Prisma.
