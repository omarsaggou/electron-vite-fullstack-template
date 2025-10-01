import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar, SideBar } from '../components'

export default function DashboardLayout() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />

                {/* Page content */}
                <main className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
