// src/App.tsx - Complete stack test with SQLite
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store'
import { increment, decrement, reset } from './store/store'
import { Button, Card, StatusBadge, LoadingSpinner } from './components'
import { 
  CheckIcon, 
  DatabaseIcon, 
  RefreshIcon, 
  PlusIcon, 
  TrashIcon, 
  BeakerIcon, 
  MinusIcon,
  ArrowPathIcon,
  RocketIcon,
  SparklesIcon
} from './components/Icons'

// Type definitions for window APIs
declare global {
  interface Window {
    databaseAPI: {
      test: () => Promise<{ success: boolean, message: string, items: any[] }>
      addItem: (message: string) => Promise<{ success: boolean, item?: any, error?: string }>
      getItems: () => Promise<{ success: boolean, items: any[], error?: string }>
      deleteItem: (id: number) => Promise<{ success: boolean, error?: string }>
    }
  }
}

interface TestItem {
  id: number
  message: string
  created_at: string
}

function App() {
  // Redux state
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  // SQLite state
  const [dbItems, setDbItems] = useState<TestItem[]>([])
  const [dbMessage, setDbMessage] = useState('')
  const [dbStatus, setDbStatus] = useState('Click "Test Database" to start...')
  const [loading, setLoading] = useState(false)

  // Load database items
  const loadDbItems = async () => {
    try {
      const result = await window.databaseAPI.getItems()
      if (result.success) {
        setDbItems(result.items)
      }
    } catch (error) {
      setDbStatus(`Error loading items: ${error}`)
    }
  }

  // Test database
  const testDatabase = async () => {
    setLoading(true)
    try {
      const result = await window.databaseAPI.test()
      setDbStatus(result.success ? `✅ ${result.message}` : `❌ ${result.message}`)
      if (result.success) {
        setDbItems(result.items)
      }
    } catch (error) {
      setDbStatus(`❌ Database test failed: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // Add database item
  const addDbItem = async () => {
    if (!dbMessage.trim()) return
    
    setLoading(true)
    try {
      const result = await window.databaseAPI.addItem(dbMessage)
      if (result.success) {
        setDbStatus(`✅ Added: "${dbMessage}"`)
        setDbMessage('')
        await loadDbItems()
      } else {
        setDbStatus(`❌ ${result.error}`)
      }
    } catch (error) {
      setDbStatus(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // Delete database item
  const deleteDbItem = async (id: number) => {
    setLoading(true)
    try {
      const result = await window.databaseAPI.deleteItem(id)
      if (result.success) {
        setDbStatus(`✅ Deleted item ${id}`)
        await loadDbItems()
      } else {
        setDbStatus(`❌ ${result.error}`)
      }
    } catch (error) {
      setDbStatus(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  // Load items on mount
  useEffect(() => {
    loadDbItems()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-float">
              <RocketIcon className="text-white" size={32} />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-shift bg-size-200">
              {{APP_NAME}}
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A modern Electron application with React, TypeScript, SQLite, and Redux
          </p>
        </div>

        {/* Technology Stack Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <StatusBadge status="success" icon={<CheckIcon />}>
            Electron
          </StatusBadge>
          <StatusBadge status="success" icon={<CheckIcon />}>
            React 18
          </StatusBadge>
          <StatusBadge status="success" icon={<CheckIcon />}>
            TypeScript
          </StatusBadge>
          <StatusBadge status="success" icon={<CheckIcon />}>
            TailwindCSS
          </StatusBadge>
          <StatusBadge status="success" icon={<CheckIcon />}>
            Redux Toolkit
          </StatusBadge>
          <StatusBadge status="info" icon={<DatabaseIcon />}>
            SQLite
          </StatusBadge>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 animate-in slide-in-from-left-8 duration-700 delay-300">
          {/* Redux State Management Card */}
          <Card 
            title="State Management"
            subtitle="Redux Toolkit with React hooks integration"
            variant="glass"
            className="backdrop-blur-sm"
          >
            {/* Counter Display */}
            <div className="text-center mb-8">
              <div className="relative">
                <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 transition-all duration-300 animate-counter-pulse">
                  {count}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl -z-10 rounded-full animate-pulse"></div>
              </div>
              
              {/* Counter Controls */}
              <div className="flex gap-3 justify-center">
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => dispatch(decrement())}
                  leftIcon={<MinusIcon />}
                  className="min-w-[120px]"
                >
                  Decrement
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => dispatch(reset())}
                  leftIcon={<ArrowPathIcon />}
                  className="min-w-[100px]"
                >
                  Reset
                </Button>
                <Button
                  variant="success"
                  size="lg"
                  onClick={() => dispatch(increment())}
                  leftIcon={<PlusIcon />}
                  className="min-w-[120px]"
                >
                  Increment
                </Button>
              </div>
            </div>

            {/* Redux Info */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-2">Current State</h4>
              <code className="text-sm text-slate-600">
                counter.value: {count}
              </code>
            </div>
          </Card>

          {/* SQLite Database Card */}
          <Card 
            title="SQLite Database"
            subtitle="Local database with IPC communication"
            variant="glass"
            className="backdrop-blur-sm"
          >
            {/* Database Controls */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={testDatabase}
                  isLoading={loading}
                  leftIcon={!loading ? <BeakerIcon /> : undefined}
                  className="flex-1"
                >
                  {loading ? 'Testing Database...' : 'Test Database'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={loadDbItems}
                  disabled={loading}
                  leftIcon={<RefreshIcon />}
                  size="md"
                >
                  Refresh
                </Button>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={dbMessage}
                  onChange={(e) => setDbMessage(e.target.value)}
                  placeholder="Enter a message to store in database..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90"
                  onKeyPress={(e) => e.key === 'Enter' && !loading && dbMessage.trim() && addDbItem()}
                />
                <Button
                  variant="primary"
                  onClick={addDbItem}
                  disabled={loading || !dbMessage.trim()}
                  leftIcon={<PlusIcon />}
                  isLoading={loading && dbMessage.trim() !== ''}
                >
                  Add
                </Button>
              </div>

              {/* Status Display */}
              <div className="bg-slate-50 border rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    {loading ? (
                      <LoadingSpinner size="sm" color="primary" />
                    ) : (
                      <DatabaseIcon className="text-slate-500" size={16} />
                    )}
                  </div>
                  <p className="text-sm font-mono text-slate-700 flex-1">
                    {dbStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Database Items List */}
            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200 hover:scrollbar-thumb-slate-500">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-slate-800">
                  Stored Items ({dbItems.length})
                </h4>
                {dbItems.length > 0 && (
                  <StatusBadge status="info" size="sm">
                    {dbItems.length} {dbItems.length === 1 ? 'item' : 'items'}
                  </StatusBadge>
                )}
              </div>

              {dbItems.length === 0 ? (
                <div className="text-center py-12">
                  <DatabaseIcon className="mx-auto text-slate-400 mb-4" size={48} />
                  <p className="text-slate-500 mb-2">No items stored yet</p>
                  <p className="text-sm text-slate-400">Add your first message above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dbItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200 group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status="neutral" size="sm">
                            #{item.id}
                          </StatusBadge>
                          <span className="text-sm text-slate-500">
                            {new Date(item.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-800 font-medium">
                          {item.message}
                        </p>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteDbItem(item.id)}
                        disabled={loading}
                        leftIcon={<TrashIcon />}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Success Message */}
        <div className="text-center mt-12">
          <Card variant="glass" className="inline-block backdrop-blur-sm max-w-2xl">
            <div className="flex items-center justify-center gap-3">
              <SparklesIcon className="text-purple-500" size={24} />
              <p className="text-slate-800 font-semibold text-lg">
                Your Electron app with React, TypeScript, SQLite, and Redux is ready!
              </p>
              <SparklesIcon className="text-blue-500" size={24} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App