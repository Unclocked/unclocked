> **⚠️ Work in Progress**: This project is still under active development and not yet ready for production use.

# Unclocked - Open Source Time Tracking & Management

<div align="center">
  
  **The Open Source Alternative to Clockodo**
  
  Build and deploy your own time tracking solution with full control over your data.
  
  [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
  
</div>

## 🚀 Overview

Unclocked is a modern, open-source time tracking and project management platform designed as an alternative to Clockodo. Built with the latest web technologies, it offers a seamless experience across web and mobile platforms while giving you complete control over your data and infrastructure.

## ✨ Features

### Core Functionality
- ⏱️ **Time Tracking** - Track time with running timers or manual entries
- 📊 **Project Management** - Organize work by projects and customers
- 👥 **Team Collaboration** - Multi-user support with role-based permissions
- 📱 **Mobile Apps** - Native iOS and Android apps via React Native/Expo
- 🔐 **Authentication** - Secure email/password authentication
- 🏢 **Multi-Organization** - Support for multiple workspaces/organizations
- 📈 **Reports & Analytics** - Insights into time usage and productivity
- 🌐 **PWA Support** - Install as a progressive web app

### Technical Features
- 🔒 **Self-Hosted** - Deploy on your own infrastructure
- 🎯 **Type-Safe** - End-to-end TypeScript with tRPC
- ⚡ **Real-Time Updates** - Live synchronization across devices
- 🎨 **Customizable UI** - Built with shadcn/ui components
- 🔌 **Extensible** - REST APIs for integrations
- 🐳 **Docker Ready** - Easy deployment with Docker Compose

## 🛠️ Tech Stack

- **Frontend**: React, TanStack Router, TailwindCSS, shadcn/ui
- **Mobile**: React Native, Expo
- **Backend**: Hono, tRPC, PostgreSQL, Drizzle ORM
- **Authentication**: Better Auth
- **Runtime**: Bun
- **Monorepo**: Turborepo
- **Code Quality**: Biome, Husky, TypeScript

## 📦 Installation

### Prerequisites
- [Bun](https://bun.sh) (v1.2.17 or higher)
- PostgreSQL (v17 or higher)
- Node.js (v24 or higher)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/unclocked/unclocked.git
cd unclocked
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**
```bash
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
```

4. **Configure your database**
Update the PostgreSQL connection string in `apps/server/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/unclocked"
```

5. **Initialize the database**
```bash
bun db:push
```

6. **Start the development servers**
```bash
bun dev
```

The applications will be available at:
- Web: http://localhost:3001
- API: http://localhost:3000
- Mobile: Use Expo Go app

## 🐳 Docker Deployment

```bash
docker-compose -f docker-compose.dev.yml up
```

## 🏗️ Project Structure

```
unclocked/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   ├── native/      # Mobile application (React Native, Expo)
│   └── server/      # Backend API (Hono, tRPC)
├── packages/        # Shared packages
├── biome.json       # Code formatting & linting config
├── turbo.json       # Turborepo configuration
└── package.json     # Root package.json
```

## 📝 Available Scripts

- `bun dev` - Start all applications in development mode
- `bun build` - Build all applications
- `bun dev:web` - Start only the web application
- `bun dev:native` - Start the React Native/Expo development server
- `bun dev:server` - Start only the server
- `bun check-types` - Check TypeScript types across all apps
- `bun db:push` - Push schema changes to database
- `bun db:studio` - Open database studio UI
- `bun db:migrate` - Run database migrations
- `bun check` - Run Biome formatting and linting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Clockodo](https://www.clockodo.com/)
- Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 🔗 Links

- [Documentation](https://docs.unclocked.dev) (Coming Soon)
- [Demo](https://demo.unclocked.dev) (Coming Soon)
- [Discord Community](https://discord.gg/unclocked) (Coming Soon)

## 💻 Development Status

Unclocked is currently in active development. Core features are being implemented and the API may change. We recommend waiting for v1.0 for production use.