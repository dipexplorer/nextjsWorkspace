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
│   │   ├── pages/           # Next.js pages
│   │   ├── components/      # Site-specific components
│   │   ├── styles/          # Site-specific styles
│   │   ├── public/          # Static assets
│   │   └── package.json     # Site-specific dependencies
│   └── site-b/              # Example application B
│       ├── pages/
│       ├── components/
│       ├── styles/
│       ├── public/
│       └── package.json
├── packages/                # Shared packages
│   ├── ui-components/       # Reusable UI components
│   ├── utils/               # Shared utility functions
│   ├── config/              # Shared configurations (ESLint, TypeScript, etc.)
│   └── design-tokens/       # Design system tokens
├── .github/                 # GitHub workflows and templates
├── docs/                    # Documentation
├── scripts/                 # Build and development scripts
├── package.json             # Root package.json with workspaces config
├── pnpm-workspace.yaml      # pnpm workspace configuration (if using pnpm)
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

   Using yarn:
   ```bash
   yarn install
   ```

   Using pnpm:
   ```bash
   pnpm install
   ```

3. **Environment Setup**

   Copy the example environment files and configure them:
   ```bash
   # For each project
   cp projects/site-a/.env.example projects/site-a/.env.local
   cp projects/site-b/.env.example projects/site-b/.env.local

   # For shared packages if needed
   cp packages/ui-components/.env.example packages/ui-components/.env.local
   ```

## Development Workflow

### Running Applications

To run a specific project in development mode:

```bash
# Using npm
npm run dev:site-a    # Starts site-a on http://localhost:3000
npm run dev:site-b    # Starts site-b on http://localhost:3001

# Using yarn
yarn dev:site-a
yarn dev:site-b

# Using pnpm
pnpm dev:site-a
pnpm dev:site-b
```

### Running All Projects

To run all projects simultaneously (if configured):

```bash
# Using npm
npm run dev:all

# Using yarn
yarn dev:all

# Using pnpm
pnpm dev:all
```

### Working with Shared Packages

When making changes to shared packages:

1. Make your changes in the appropriate package under `/packages/`
2. Build the package:
   ```bash
   npm run build:ui-components  # or yarn/pnpm equivalent
   ```
3. Test your changes in the consuming applications

## Building and Deployment

### Building Projects

Build a specific project for production:

```bash
# Using npm
npm run build:site-a
npm run build:site-b

# Using yarn
yarn build:site-a
yarn build:site-b

# Using pnpm
pnpm build:site-a
pnpm build:site-b
```

### Building All Projects

Build all projects at once:

```bash
# Using npm
npm run build:all

# Using yarn
yarn build:all

# Using pnpm
pnpm build:all
```

### Deployment

Each project can be deployed independently to your preferred hosting platform (Vercel, Netlify, AWS, etc.). Configure deployment settings in each project's `next.config.js` and CI/CD workflows in `.github/workflows/`.

## Package Management

### Adding Dependencies

For project-specific dependencies:

```bash
# Using npm
npm install --workspace=projects/site-a package-name

# Using yarn
yarn workspace site-a add package-name

# Using pnpm
pnpm --filter site-a add package-name
```

For shared package dependencies:

```bash
# Using npm
npm install --workspace=packages/ui-components package-name

# Using yarn
yarn workspace ui-components add package-name

# Using pnpm
pnpm --filter ui-components add package-name
```

### Adding New Projects

1. Create a new directory under `projects/`
2. Initialize a new Next.js application
3. Update the root `package.json` workspaces configuration
4. Add scripts to root `package.json` for the new project

### Adding New Shared Packages

1. Create a new directory under `packages/`
2. Initialize a new package with appropriate configuration
3. Update the root `package.json` workspaces configuration
4. Add build scripts as needed

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
