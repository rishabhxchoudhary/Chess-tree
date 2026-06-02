#!/bin/sh
set -e

echo "Running database migrations..."
bun run src/server/db/migrate.ts
echo "Migrations complete."

echo "Starting Chess Tree..."
exec bun run server.js
