// src/App.tsx
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-black p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Official Electron-Vite + Tailwind v4</h1>
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">{count}</div>
          <div className="space-x-4">
            <button 
              onClick={() => setCount(count - 1)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              -1
            </button>
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              +1
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App