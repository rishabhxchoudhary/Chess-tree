#!/bin/sh
set -e

echo "Running database migrations..."
bunx drizzle-kit push --force
echo "Migrations complete."

echo "Starting Chess Tree..."
exec bun run server.js
