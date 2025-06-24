# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Unclocked is an open-source time tracking and project management application, designed as an alternative to Clockodo. It's a monorepo using Turborepo with three main applications:

- **Web App** (`apps/web`): React with TanStack Router, Vite, PWA support
- **Native App** (`apps/native`): React Native with Expo
- **Server** (`apps/server`): Hono with tRPC, PostgreSQL, Drizzle ORM
- **Landing Page** (`apps/landing`): Astro with Cloudflare deployment

## Development Commands

```bash
# Development
bun dev              # Start all apps in development
bun dev:web          # Start only web app
bun dev:server       # Start only server
bun dev:native       # Start native app with Expo

# Database
bun db:push          # Push schema changes to database
bun db:studio        # Open Drizzle Studio for database management
bun db:generate      # Generate migration files
bun db:migrate       # Run migrations

# Code Quality
bun check            # Run Biome formatting and linting
bun check-types      # Run TypeScript type checking
bun build            # Build all apps
```

## Database Setup

1. Start PostgreSQL with Docker:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```
   This runs PostgreSQL on port 5433 (not the default 5432).

2. Create `.env` file in `apps/server`:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres
   CORS_ORIGIN=http://localhost:5173
   BETTER_AUTH_SECRET=your-secret-here
   BETTER_AUTH_URL=http://localhost:3000
   ```

3. Initialize database:
   ```bash
   bun db:push
   ```

## Architecture Overview

### Authentication & Multi-tenancy
- Uses Better Auth for authentication with email/password support
- Built-in organization/workspace management with roles (owner, admin, member)
- Database schema includes users, sessions, organizations, members, and invitations

### API Architecture
- tRPC for type-safe APIs between client and server
- Hono as the server framework
- All API routes defined in `apps/server/src/routes/`

### Frontend Architecture
- React 19.1.0 with TanStack Router for routing
- TailwindCSS 4 with Vite plugin
- shadcn/ui component library
- PWA support configured
- Theme support with next-themes

### Database Schema
- PostgreSQL with Drizzle ORM
- Schema files in `apps/server/src/db/schema/`
- Soft deletes supported (deletedAt timestamps)
- Multi-tenant architecture with organization-based data isolation

## Code Style & Conventions

- **Package Manager**: Bun (v1.2.17)
- **Code Formatting**: Biome with tab indentation and double quotes
- **Import Organization**: Biome auto-organizes imports
- **TailwindCSS Classes**: Biome sorts classes (configured for clsx, cva, cn functions)
- **Git Hooks**: Husky runs Biome on staged files

## Important Notes

1. The project is currently in development (not production-ready)
2. No test framework is configured yet
3. When creating new components, follow existing patterns in the codebase
4. Always check for existing utilities before adding new dependencies
5. The web app runs on http://localhost:5173 and server on http://localhost:3000 by default
6. Database runs on port 5433 (not the standard 5432)