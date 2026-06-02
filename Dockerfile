FROM oven/bun:1 AS base

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV SKIP_ENV_VALIDATION=1
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# --- Production ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN useradd --system --uid 1001 --create-home nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --chown=1001:1001 /app/.next/static ./.next/static

# Drizzle migration files and runner
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/src/server/db/migrate.ts ./src/server/db/migrate.ts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["./docker-entrypoint.sh"]
