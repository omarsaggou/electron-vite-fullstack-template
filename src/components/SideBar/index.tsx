import { useNavigate } from "react-router-dom"

const SideBar = () => {
    const navigate = useNavigate()
    return (
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
    )
}

export default SideBar
