# Next.js Multi-Projects Workspace

A comprehensive monorepo solution for managing multiple Next.js applications and shared packages from a single codebase. This workspace enables efficient code sharing, consistent tooling, and streamlined development workflows across multiple projects.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Building and Deployment](#building-and-deployment)
- [Package Management](#package-management)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🏗️ **Monorepo Architecture**: Manage multiple Next.js applications in a single repository
- 📦 **Shared Packages**: Reusable UI components, utilities, and configurations across projects
- 🔄 **Dependency Management**: Centralized dependency management with workspaces
- 🚀 **Optimized Development**: Streamlined development experience with consistent tooling
- 🛠️ **Flexible Configuration**: Individual project customization while maintaining shared standards

## Project Structure

```
next-multi-projects/
├── projects/                 # Individual Next.js applications
│   ├── site-a/              # Example application A
│   │   ├── app/
│   │   ├── components/      # Site-specific components
│   │   ├── public/          # Static assets
│   │   └── package.json     # Site-specific dependencies
│   └── site-b/              # Example application B
│       ├── app/
│       ├── components/
│       ├── public/
│       └── package.json
├── packages/                # Shared packages
├── .github/                 # GitHub workflows and templates
├── package.json             # Root package.json with workspaces
└── README.md                # This file
```

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **Package Manager**: npm (v8+), yarn (v1.22+), or pnpm (v7+)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/next-multi-projects.git
   cd next-multi-projects
   ```

2. **Install dependencies**

   Using npm workspaces:

   ```bash
   npm install
   ```

## Building and Deployment

### Building Projects

Build a specific project for production:

```bash
# Using npm
npm run build:site-a
npm run build:site-b
```

### Building All Projects

Build all projects at once:

```bash
# Using npm
npm run build:all
```

### Deployment

Each project can be deployed independently to your preferred hosting platform (Vercel, Netlify, AWS, etc.). Configure deployment settings in each project's `next.config.js` and CI/CD workflows in `.github/workflows/`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
