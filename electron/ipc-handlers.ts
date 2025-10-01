// electron/ipc-handlers.ts - IPC for database operations (ES Module Compatible)
import { ipcMain } from 'electron'
import DatabaseManager from './database'

let dbManager: DatabaseManager | null = null

export function setupDatabaseIPC() {
  console.log('🔧 Setting up database IPC handlers...')
  
  try {
    dbManager = new DatabaseManager()
    console.log('✅ Database IPC handlers initialized successfully')
  } catch (error) {
    console.error('❌ Failed to initialize database:', error)
    // Don't return - still set up handlers to show errors to UI
  }

  // Test database connection
  ipcMain.handle('db:test', async () => {
    try {
      if (!dbManager) {
        return {
          success: false,
          message: 'Database not initialized',
          items: []
        }
      }
      return dbManager.testDatabase()
    } catch (error) {
      console.error('❌ Database test error:', error)
      return {
        success: false,
        message: `Database test failed: ${error}`,
        items: []
      }
    }
  })

  // Add test item
  ipcMain.handle('db:add-item', async (_, message: string) => {
    try {
      if (!dbManager) {
        return {
          success: false,
          error: 'Database not initialized'
        }
      }
      
      const item = dbManager.addTestItem(message)
      return {
        success: true,
        item,
        message: `Added: "${message}"`
      }
    } catch (error) {
      console.error('❌ Add item error:', error)
      return {
        success: false,
        error: `Failed to add item: ${error}`
      }
    }
  })

  // Get all items
  ipcMain.handle('db:get-items', async () => {
    try {
      if (!dbManager) {
        return {
          success: false,
          error: 'Database not initialized',
          items: []
        }
      }
      
      const items = dbManager.getAllItems()
      return {
        success: true,
        items
      }
    } catch (error) {
      console.error('❌ Get items error:', error)
      return {
        success: false,
        error: `Failed to get items: ${error}`,
        items: []
      }
    }
  })

  // Delete item
  ipcMain.handle('db:delete-item', async (_, id: number) => {
    try {
      if (!dbManager) {
        return {
          success: false,
          error: 'Database not initialized'
        }
      }
      
      const success = dbManager.deleteItem(id)
      return {
        success,
        message: success ? `Deleted item ${id}` : `Failed to delete item ${id}`
      }
    } catch (error) {
      console.error('❌ Delete item error:', error)
      return {
        success: false,
        error: `Failed to delete item: ${error}`
      }
    }
  })

  console.log('🎉 All database IPC handlers registered')
}

export function cleanupDatabase() {
  if (dbManager) {
    console.log('🧹 Cleaning up database...')
    try {
      dbManager.close()
      dbManager = null
    } catch (error) {
      console.error('❌ Error during database cleanup:', error)
    }
  }
}