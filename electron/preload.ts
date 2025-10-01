import { ipcRenderer, contextBridge } from 'electron'

// Database API for renderer process
const databaseAPI = {
  test: () => ipcRenderer.invoke('db:test'),
  addItem: (message: string) => ipcRenderer.invoke('db:add-item', message),
  getItems: () => ipcRenderer.invoke('db:get-items'),
  deleteItem: (id: number) => ipcRenderer.invoke('db:delete-item', id)
}

contextBridge.exposeInMainWorld('databaseAPI', databaseAPI)

// Type definitions for TypeScript
export interface DatabaseAPI {
  test: () => Promise<{ success: boolean, message: string, items: unknown[] }>
  addItem: (message: string) => Promise<{ success: boolean, item?: unknown, error?: string }>
  getItems: () => Promise<{ success: boolean, items: unknown[], error?: string }>
  deleteItem: (id: number) => Promise<{ success: boolean, error?: string }>
}

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})
