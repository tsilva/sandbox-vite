<div align="center">
  <img src="logo.png" alt="sandbox-vite" width="512"/>

  # sandbox-vite

  [![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vite.dev)
  [![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://react.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

  **⚡ A sandbox environment for experimenting with Vite, React, and TypeScript**

  [Vite Docs](https://vite.dev/guide/) · [React Docs](https://react.dev) · [TypeScript Docs](https://www.typescriptlang.org/docs/)
</div>

## Overview

sandbox-vite is an experimental playground for exploring Vite's features and capabilities with React and TypeScript. Use it to test new ideas, learn Vite configuration, or prototype features before integrating them into production projects.

## Features

- **Lightning-fast HMR** - Instant hot module replacement for rapid development
- **TypeScript support** - Full type safety with project references configuration
- **Modern React** - React 18 with hooks and functional components
- **ESLint configured** - Code quality enforcement out of the box
- **Minimal setup** - Ready to experiment immediately

## Quick Start

```bash
cd vite-project
pnpm install
pnpm dev
```

Open http://localhost:5173 to view the app.

## Project Structure

```
sandbox-vite/
├── vite-project/           # Main Vite application
│   ├── src/
│   │   ├── App.tsx         # Root component
│   │   ├── main.tsx        # Entry point
│   │   └── assets/         # Static assets
│   ├── public/             # Public files
│   ├── package.json
│   ├── vite.config.ts      # Vite configuration
│   └── tsconfig.json       # TypeScript config
├── CLAUDE.md               # AI assistant instructions
└── README.md
```

## Development Commands

All commands should be run from the `vite-project/` directory:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Build for production |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build |

## TypeScript Configuration

The project uses TypeScript project references with three configs:

- `tsconfig.json` - Root configuration referencing app and node configs
- `tsconfig.app.json` - Application source code configuration
- `tsconfig.node.json` - Vite config files configuration

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | 6.x | Build tool and dev server |
| React | 18.x | UI framework |
| TypeScript | 5.6 | Type safety |
| ESLint | 9.x | Code linting |
| pnpm | - | Package manager |

## License

MIT
