// electron/database.ts - SQLite Database Manager (ES Module Compatible)
import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'node:path'

export interface TestItem {
  id?: number
  message: string
  created_at?: string
}

class DatabaseManager {
  private db: Database.Database

  constructor() {
    // Use app.getPath to get user data directory - works in ES modules
    const userDataPath = app.getPath('userData')
    const dbPath = path.join(userDataPath, '{{APP_NAME}}.db')
    console.log('📁 Database path:', dbPath)
    
    try {
      this.db = new Database(dbPath)
      
      // Enable WAL mode for better performance
      this.db.pragma('journal_mode = WAL')
      
      this.initializeTable()
      console.log('✅ Database initialized successfully')
    } catch (error) {
      console.error('❌ Database initialization failed:', error)
      throw error
    }
  }

  private initializeTable() {
    try {
      // Create test table
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS test_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          message TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `)
      console.log('✅ Database table initialized')
    } catch (error) {
      console.error('❌ Table initialization failed:', error)
      throw error
    }
  }

  // Test operations
  addTestItem(message: string): TestItem {
    try {
      const stmt = this.db.prepare('INSERT INTO test_items (message) VALUES (?)')
      const result = stmt.run(message)
      
      console.log(`➕ Added item: "${message}" with ID ${result.lastInsertRowid}`)
      
      return {
        id: result.lastInsertRowid as number,
        message,
        created_at: new Date().toISOString()
      }
    } catch (error) {
      console.error('❌ Failed to add item:', error)
      throw error
    }
  }

  getAllItems(): TestItem[] {
    try {
      const stmt = this.db.prepare('SELECT * FROM test_items ORDER BY created_at DESC LIMIT 10')
      const items = stmt.all() as TestItem[]
      console.log(`📊 Retrieved ${items.length} items from database`)
      return items
    } catch (error) {
      console.error('❌ Failed to get items:', error)
      throw error
    }
  }

  deleteItem(id: number): boolean {
    try {
      const stmt = this.db.prepare('DELETE FROM test_items WHERE id = ?')
      const result = stmt.run(id)
      const success = result.changes > 0
      console.log(`🗑️ Delete item ${id}: ${success ? 'success' : 'failed'}`)
      return success
    } catch (error) {
      console.error('❌ Failed to delete item:', error)
      throw error
    }
  }

  // Quick test function
  testDatabase(): { success: boolean, message: string, items: TestItem[] } {
    try {
      console.log('🧪 Running database test...')
      
      // Add a test item
      const testItem = this.addTestItem(`Test message ${Date.now()}`)
      
      // Get all items
      const items = this.getAllItems()
      
      const message = `Database test successful! Added item with ID ${testItem.id}. Total items: ${items.length}`
      console.log(`✅ ${message}`)
      
      return {
        success: true,
        message,
        items
      }
    } catch (error) {
      const errorMessage = `Database test failed: ${error}`
      console.error(`❌ ${errorMessage}`)
      return {
        success: false,
        message: errorMessage,
        items: []
      }
    }
  }

  close() {
    try {
      console.log('🔒 Closing database connection')
      this.db?.close()
    } catch (error) {
      console.error('❌ Error closing database:', error)
    }
  }
}

export default DatabaseManager