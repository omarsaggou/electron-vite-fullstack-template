import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
    setMenuOpen: (bool: boolean) => void;
    menuOpen: boolean;
}

const NavBar: React.FC<Props> = ({ setMenuOpen, menuOpen }) => {
    const navigate = useNavigate()

    return (
        <header className="flex justify-between items-center bg-white border-b px-4 pt-2 pb-3 shadow-sm">
            <div className="text-xl font-bold">🚑 Diabetes Management</div>
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
    )
}

export default NavBar
