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

## UI/UX Design System

### Design Philosophy
The application follows a professional, structured design inspired by modern SaaS applications like Clockodo. The design emphasizes clarity, consistency, and usability with a clean, enterprise-ready aesthetic.

### Visual Hierarchy & Layout
- **Header Structure**: Consistent page headers with icon + title + description pattern
- **Card-based Design**: Content organized in clean cards with proper spacing
- **Data Tables**: Professional tables for structured data instead of card grids
- **Sidebar Layouts**: Information organized with main content + contextual sidebar
- **Spacing**: Consistent `gap-6` and `p-6` spacing throughout the application
- **Grid System**: Responsive layouts using `lg:grid-cols-3` and `md:grid-cols-2`

### Typography & Icons
- **Headers**: Large, bold headings (`text-3xl font-bold tracking-tight`)
- **Subtext**: Muted descriptions with count information
- **Icon Integration**: Consistent Lucide React icons with proper sizing (`h-5 w-5`, `h-6 w-6`)
- **Icon Containers**: Colored background containers for visual emphasis (`bg-primary/10`)

### Color System & Status Indicators
- **Status Badges**: Consistent badge variants for different states
  - `default`: Active/primary states (blue)
  - `secondary`: Inactive/on-hold states (gray)
  - `outline`: Completed states (outlined)
  - `destructive`: Error/cancelled states (red)
- **Muted Backgrounds**: Subtle `bg-muted/50` for information containers
- **Color-coded Icons**: Context-appropriate colors (blue for email, green for phone, orange for location)

### Interactive Components
- **Professional Tables**: 
  - Structured columns with proper alignment
  - Hover states and integrated actions
  - Hidden action buttons that appear on row hover
  - Dropdown menus for contextual actions
- **Buttons**: Clear hierarchy with primary, outline, and destructive variants
- **Empty States**: Engaging empty states with icons, helpful messaging, and clear CTAs

### Component Patterns
- **Header Pattern**: Icon container + title + status/metadata + action buttons
- **Contact Information**: Color-coded icon boxes with structured layout
- **Quick Stats**: Key metrics in sidebar cards with separators
- **Timeline Display**: Calendar icons with formatted date ranges
- **Budget Display**: Dollar sign icons with prominent number formatting

### Deletion UX
- **Generic Deletion Dialog**: Professional modal with warning icon
- **Visual Indicators**: Alert triangle with destructive color scheme
- **Clear Messaging**: Item-specific confirmation text with item name highlighting
- **Loading States**: Proper spinner and disabled state handling
- **Safety Features**: Two-step confirmation process replacing browser alerts

### Responsive Design
- **Mobile-first**: Responsive breakpoints with proper mobile considerations
- **Flexible Grids**: Adaptive layouts that work across screen sizes
- **Touch-friendly**: Appropriate button sizes and spacing for touch devices

### Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Focus Management**: Keyboard navigation support
- **Screen Readers**: Descriptive labels and ARIA attributes
- **Color Independence**: Information not conveyed by color alone

### Component Architecture
- **Reusable Components**: Generic components like `DeletionDialog` for consistency
- **Prop-based Configuration**: Flexible components that adapt to different contexts
- **Consistent Imports**: Organized import structure for maintainability