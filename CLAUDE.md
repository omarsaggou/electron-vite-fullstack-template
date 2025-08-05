# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Template Overview

This is an Electron application template built with React, TypeScript, and Vite. The template provides a complete foundation for desktop applications with SQLite database integration and Redux state management.

### Template Variables

When working with this template, be aware of these placeholder variables that need customization:

- `{{APP_NAME}}` - Application name (used in package.json, database filename, UI)
- `{{APP_DESCRIPTION}}` - Application description for package.json
- `{{AUTHOR_NAME}}` - Author information for package.json
- `{{APP_ID}}` - Bundle identifier for electron-builder (e.g., com.company.appname)

### Architecture

- **Main Process** (`electron/main.ts`): Electron main process with window management and database initialization
- **Preload Script** (`electron/preload.ts`): Secure bridge between main and renderer processes via contextBridge
- **IPC Handlers** (`electron/ipc-handlers.ts`): Database operations exposed through IPC channels
- **Database Manager** (`electron/database.ts`): SQLite database operations using better-sqlite3
- **Renderer Process** (`src/`): React application with Redux store for state management

### Key Technologies

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS 4
- **State Management**: Redux Toolkit with React-Redux
- **Database**: SQLite via better-sqlite3 (requires native compilation)
- **Build System**: Vite + electron-builder
- **Development**: ESLint for linting

## Common Commands

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production (TypeScript + Vite + electron-builder)
npm run lint         # Run ESLint
npm run setup        # Customize template variables (run once after cloning)
```

### Database
```bash
npm run rebuild      # Rebuild native dependencies (better-sqlite3)
```

## Template Customization

### First-Time Setup
After cloning this template:
1. Run `npm run setup` to replace template variables
2. Run `npm install` to install dependencies
3. Run `npm run rebuild` to build native dependencies
4. Run `npm run dev` to start development

### Manual Customization
If not using the setup script, manually replace these template variables:
- Search and replace `{{APP_NAME}}` with your app name
- Search and replace `{{APP_DESCRIPTION}}` with your app description
- Search and replace `{{AUTHOR_NAME}}` with your name
- Search and replace `{{APP_ID}}` with your bundle identifier

## Database Architecture

The template uses a SQLite database with the following setup:

- **Location**: User data directory (`{{APP_NAME}}.db`)
- **Connection**: WAL mode enabled for performance
- **IPC Channels**: 
  - `db:test` - Test database connection
  - `db:add-item` - Add new items
  - `db:get-items` - Retrieve all items
  - `db:delete-item` - Delete items by ID

### Database Schema
```sql
CREATE TABLE test_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Build Configuration

- **Vite Config**: Configured with electron plugin and better-sqlite3 as external dependency
- **Electron Builder**: Supports Windows (NSIS), macOS (DMG), and Linux (AppImage)
- **TypeScript**: Strict mode enabled with ES2020 target

## Development Notes

- Native dependencies (better-sqlite3) require rebuilding after npm install
- Database connection is managed in main process with proper cleanup on app quit
- IPC communication is type-safe with TypeScript interfaces
- Redux store includes a basic counter slice for demonstration
- The template includes example code that should be customized for your specific use case