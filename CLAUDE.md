# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Unclocked is an open-source time tracking SaaS application built as a modern alternative to commercial solutions like Clockodo and TimeCamp. The application provides comprehensive time tracking capabilities for organizations and their employees.

### Tech Stack
- **Backend**: Laravel 12 (PHP 8.4+)
- **Frontend**: React 19 with TypeScript
- **Bridge**: Inertia.js for seamless SPA experience
- **Styling**: TailwindCSS 4 with dark mode support
- **UI Components**: ShadCN/Radix UI for consistent design
- **Database**: SQLite (default), easily configurable for MySQL/PostgreSQL

### Core Features
- Multi-organization support with employee management
- Time tracking with projects and tasks
- Reporting and analytics
- User authentication with email verification
- Role-based access control
- Responsive design for desktop and mobile

## Development Commands

### Start Development Environment
```bash
# Start all development servers (recommended)
composer dev

# This runs concurrently:
# - PHP development server (localhost:8000)
# - Queue listener
# - Laravel Pail (log viewer)
# - Vite dev server (localhost:5173)

# For SSR development
composer dev:ssr
```

### Testing
```bash
# Run all backend tests
composer test

# Run specific test suites
./vendor/bin/pest --testsuite=Feature
./vendor/bin/pest --testsuite=Unit

# Run a single test file
./vendor/bin/pest tests/Feature/Auth/AuthenticationTest.php

# Watch mode for TDD
./vendor/bin/pest --watch
```

### Code Quality
```bash
# PHP formatting
./vendor/bin/pint

# TypeScript/JavaScript formatting and linting
pnpm run format
pnpm run check
pnpm run types
```

### Build Commands
```bash
# Production build
pnpm run build

# SSR production build
pnpm run build:ssr
```

## Architecture Overview

### Backend Structure (Laravel)

The application follows standard Laravel MVC architecture with Inertia.js integration:

- **Controllers** (`app/Http/Controllers/`): Handle HTTP requests and return Inertia responses
- **Models** (`app/Models/`): Eloquent models with relationships and business logic
- **Middleware** (`app/Http/Middleware/`): Request processing, including `HandleInertiaRequests` for shared data
- **Routes** (`routes/`): Organized into web.php, auth.php, and settings.php

Key patterns:
- Use Inertia::render() to return React components with props
- Form requests for validation (`app/Http/Requests/`)
- Policies for authorization (`app/Policies/`)

### Frontend Structure (React/TypeScript)

The frontend uses a component-based architecture:

- **Pages** (`resources/js/pages/`): Inertia page components receiving props from Laravel
- **Components** (`resources/js/components/`): Reusable UI components based on ShadCN/Radix UI
- **Layouts** (`resources/js/layouts/`): Page layouts (app, auth, settings)
- **Hooks** (`resources/js/hooks/`): Custom React hooks for shared logic
- **Types** (`resources/js/types/`): TypeScript type definitions

Key patterns:
- All components use TypeScript with strict typing
- Functional components with hooks (no class components)
- Mobile-first responsive design with Tailwind CSS
- Dark mode support via appearance settings

### Database

- Uses SQLite by default (database/database.sqlite)
- Migrations in `database/migrations/`
- Models use Laravel's Eloquent ORM with relationships

### Authentication

Full authentication system implemented with:
- Registration, login, logout
- Email verification
- Password reset
- Profile management
- Remember me functionality

## Development Guidelines

### Laravel Development
- Use PHP 8.4+ features (constructor property promotion, named arguments)
- Follow PSR-12 coding standards
- Use Eloquent ORM for database operations
- Always validate input with Form Requests
- Use policies for authorization

### React/TypeScript Development
- All code must be TypeScript (no plain JavaScript)
- Use functional components exclusively
- File naming: kebab-case for React files (e.g., `user-profile.tsx`)
- Import order: React, libraries, components, hooks, types, utils
- Use ShadCN UI components from `resources/js/components/ui/`

### Inertia.js Integration
- Pass data from Laravel to React via Inertia props
- Use `router` from '@inertiajs/react' for navigation
- Handle forms with `useForm` hook from Inertia
- Shared data is configured in `HandleInertiaRequests` middleware

### Testing Approach
- Write feature tests for user-facing functionality
- Use Pest PHP's expressive syntax
- Tests automatically use RefreshDatabase trait
- Mock external services when testing