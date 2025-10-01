# Electron + React + TypeScript + SQLite Template

A modern Electron application template built with React, TypeScript, Vite, SQLite, and Redux Toolkit.

## ✨ Features

- **🚀 Electron** - Cross-platform desktop app framework
- **⚛️ React 18** - Modern React with hooks and functional components
- **🏗️ TypeScript** - Type-safe development
- **⚡ Vite** - Fast development server and build tool
- **🎨 TailwindCSS 4** - Utility-first CSS framework
- **🗄️ SQLite** - Local database with better-sqlite3
- **🏪 Redux Toolkit** - Predictable state management
- **📦 Electron Builder** - Package and distribute your app

## 🚀 Quick Start

### 1. Use This Template

Click the "Use this template" button or clone the repository:

```bash
git clone <your-repo-url>
cd <your-app-name>
```

### 2. Customize Your App

Run the setup script to customize the template:

```bash
npm run setup
```

This will prompt you for:
- App name
- App description
- Author information
- App ID (bundle identifier)

### 3. Install Dependencies

```bash
npm install
```

### 4. Rebuild Native Dependencies

```bash
npm run rebuild
```

### 5. Start Development

```bash
npm run dev
```

## 📁 Project Structure

```
├── electron/               # Electron main process
│   ├── main.ts             # Main process entry point
│   ├── preload.ts          # Preload script for security
│   ├── ipc-handlers.ts     # IPC handlers for database
│   └── database.ts         # SQLite database manager
├── src/                    # React renderer process
│   ├── components/         # React components
│   ├── store/              # Redux store and slices
│   └── App.tsx             # Main React component
├── public/                 # Static assets
└── dist-electron/          # Built electron files
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run rebuild      # Rebuild native dependencies
npm run setup        # Customize template (run once)
```

## 🗄️ Database

The template includes a fully configured SQLite database:

- **Location**: User data directory (`diabetes management.db`)
- **Features**: WAL mode, TypeScript interfaces, IPC communication
- **Operations**: Create, read, update, delete with type safety

### Database API

The renderer process can interact with the database through secure IPC:

```typescript
// Test database connection
await window.databaseAPI.test()

// Add item
await window.databaseAPI.addItem("Hello World")

// Get all items
await window.databaseAPI.getItems()

// Delete item
await window.databaseAPI.deleteItem(1)
```

## 🏪 State Management

Redux Toolkit is configured with:
- Type-safe store configuration
- Example counter slice
- React-Redux hooks integration

## 🔒 Security

The template follows Electron security best practices:
- Context isolation enabled
- Node integration disabled in renderer
- Secure IPC communication via preload script

## 📦 Building & Distribution

Build your app for distribution:

```bash
npm run build
```

This creates platform-specific installers in the `release/` directory.

### Supported Platforms

- **Windows**: NSIS installer (.exe)
- **macOS**: DMG installer (.dmg)
- **Linux**: AppImage (.AppImage)

## 🎨 Customization

### Styling
- TailwindCSS 4 is pre-configured
- Modify `src/index.css` for global styles
- Component-specific styles in individual files

### Database Schema
- Modify `electron/database.ts` to add your tables
- Update TypeScript interfaces for type safety
- Add new IPC handlers in `electron/ipc-handlers.ts`

### App Icon & Metadata
- Replace icons in `public/` directory
- Update `electron-builder.json5` for build configuration
- Modify `package.json` metadata

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Troubleshooting

### Common Issues

**SQLite build errors:**
```bash
npm run rebuild
```

**TypeScript errors:**
```bash
npm run lint
```

**Development server not starting:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [TailwindCSS Documentation](https://tailwindcss.com)
