# 🕐 Unclocked

> Open-source time tracking and attendance management application built with Laravel and React. A modern, self-hosted alternative to TimeCamp, Clockodo, Toggl, and other time tracking and attendance solutions.

## ✨ Features

- 📊 **Time Tracking** - Track time across projects and tasks
- 👥 **Attendance Management** - Monitor employee attendance and working hours
- 🏢 **Multi-Organization** - Support for multiple organizations and teams
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- PHP 8.4+
- Node.js 24+
- Composer
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/unclocked.git
cd unclocked

# Install dependencies
composer install
pnpm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations
php artisan migrate

# Start development
composer dev
```

Visit `http://localhost:8000` to see your application running.

## 🛠️ Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 19 + TypeScript
- **Routing**: Inertia.js
- **Styling**: TailwindCSS 4
- **UI Components**: ShadCN/Radix UI
- **Database**: SQLite (default)

## 📝 Development

```bash
# Run tests
composer test

# PHP Code Quality
./vendor/bin/pint              # Format PHP code
./vendor/bin/phpstan analyze    # Static analysis
./vendor/bin/rector process     # Code refactoring

# TypeScript/JavaScript Quality
pnpm run format                 # Format code
pnpm run check                  # Lint code
pnpm run types                  # Type checking

# Build for production
pnpm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [GNU Affero General Public License v3.0](LICENSE).

The AGPL license ensures that any modifications to Unclocked, including when used as a network service, must be shared with the community. This protects the project while allowing organizations to self-host for internal use.
