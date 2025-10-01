// src/pages/Login
import { useNavigate } from 'react-router-dom'
import bgLogin from '../../assets/bg-login.jpg'
import { Button } from '../../components'
export default function Login() {
    const navigate = useNavigate()

    const handleLogin = () => {
        // TODO: replace with real auth
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
            <div className="max-w-screen-xl m-4 sm:m-10 bg-white shadow-lg rounded-lg flex flex-1 overflow-hidden">
                {/* Left side: Form */}
                <div className="lg:w-1/2 xl:w-5/12 p-8 sm:p-12 flex flex-col justify-center">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src={bgLogin} alt="App logo" className="w-24 h-24 object-contain" />
                    </div>

                    {/* Title */}
                    <h1 className="text-secondary text-2xl xl:text-3xl font-extrabold text-center mb-6">
                        Login to Your Account
                    </h1>

                    {/* Form */}
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <Button
                            onClick={handleLogin}
                            className="w-full py-3 mt-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:cursor-pointer hover:bg-primary-hover transition duration-300"
                        >
                            Login
                        </Button>
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-sm text-gray-600 text-center">
                        Don’t have an account?{" "}
                        <a href="#" className="text-accent hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>

                {/* Right side: Illustration */}
                <div className="hidden lg:flex flex-1 bg-indigo-50 items-center justify-center">
                    <img
                        className="w-full h-full bg-contain bg-center bg-no-repeat"
                        src={bgLogin}
                    />
                </div>
            </div>
        </div>
    )
}
