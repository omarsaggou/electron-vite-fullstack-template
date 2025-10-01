// src/pages/Login
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()

    const handleLogin = () => {
        // TODO: replace with real auth
        navigate('/dashboard')
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 border rounded"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </div>
        </div>
    )
}
