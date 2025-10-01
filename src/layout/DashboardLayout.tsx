import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function DashboardLayout() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-60 bg-gray-900 text-white flex flex-col">
                <div className="p-4 text-xl font-bold border-b border-gray-700">
                    Sidebar
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="block w-full text-left p-2 rounded hover:bg-gray-700"
                    >
                        Home
                    </button>
                    {/* Add more nav items later */}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="flex justify-between items-center bg-white border-b px-4 py-2 shadow-sm">
                    <div className="text-xl font-bold">🚑 MyApp</div>
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded hover:bg-gray-100"
                        >
                            ⋮
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => navigate('/dashboard/profile')}
                                >
                                    Profile
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => navigate('/dashboard/settings')}
                                >
                                    Settings
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    onClick={() => navigate('/')}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
