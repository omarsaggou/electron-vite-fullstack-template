import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Sourcemap configuration for renderer process
  build: {
    sourcemap: process.env.NODE_ENV === 'development' ? true : 'hidden',
    // Improve build performance
    target: 'esnext',
    minify: process.env.NODE_ENV === 'production' ? 'esbuild' : false,
  },
  
  plugins: [
    react(),
    tailwindcss(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
        vite: {
          build: {
            sourcemap: process.env.NODE_ENV === 'development' ? true : 'hidden',
            rollupOptions: {
              external: ['better-sqlite3'] // Important!
            }
          }
        }
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
        vite: {
          build: {
            sourcemap: process.env.NODE_ENV === 'development' ? true : 'hidden',
            rollupOptions: {
              external: ['better-sqlite3'] // Important!
            }
          }
        }
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
  ],
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: true,
  },
  
  // Define for better development experience
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
})
