# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a sandbox repository for experimenting with Vite. The actual Vite project lives in the `vite-project/` subdirectory, which contains a standard Vite + React + TypeScript setup.

**Important**: All development commands must be run from within the `vite-project/` directory, not from the repository root.

## Development Commands

All commands should be executed from `vite-project/`:

```bash
cd vite-project

# Start development server with HMR
npm run dev

# Build for production (includes TypeScript compilation)
npm run build

# Lint code with ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture

- **Entry point**: `vite-project/src/main.tsx` - Renders the React app into the DOM
- **Root component**: `vite-project/src/App.tsx` - Main application component
- **Build tool**: Vite 6.x with React plugin
- **TypeScript**: Configured with project references (see `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)
- **Linting**: ESLint 9.x with React Hooks and React Refresh plugins

## TypeScript Configuration

The project uses TypeScript project references with separate configurations:
- `tsconfig.json` - Root config that references app and node configs
- `tsconfig.app.json` - Configuration for application code
- `tsconfig.node.json` - Configuration for Vite config files

## Package Manager

The project uses `pnpm` (evidenced by `pnpm-lock.yaml`). Use `pnpm` commands instead of `npm` where possible.

## Important Notes

- **README.md must be kept up to date** with any significant project changes
- This is a sandbox/experimental project for exploring Vite features
- The project structure has the Vite app nested in a subdirectory rather than at the repository root
