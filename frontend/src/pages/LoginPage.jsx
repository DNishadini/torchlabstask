import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            setError("Invalid credentials");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black relative overflow-hidden">

            {/* Animated Glow Effects */}
            <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>

            {/* Login Card */}
            <form
                onSubmit={handleLogin}
                className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-10"
            >

                <div className="text-center mb-8">

                    <h1 className="text-5xl font-extrabold text-white mb-3">
                        CRM
                    </h1>

                    <p className="text-cyan-300 text-lg">
                        Smart Customer Management
                    </p>

                </div>

                {
                    error &&
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl mb-5 text-sm">
                        {error}
                    </div>
                }

                <div className="mb-5">

                    <label className="block text-gray-300 mb-2 font-medium">
                        Email Address
                    </label>

                    <input
                        type="email"
                        placeholder="admin@example.com"
                        className="w-full bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                <div className="mb-6">

                    <label className="block text-gray-300 mb-2 font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl shadow-lg transition-all duration-300
                    ${
                        loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 hover:scale-[1.02]"
                    } text-white`}
                >

                    {
                        loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )
                    }

                </button>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    Powered by React • Node • Supabase
                </div>

            </form>

        </div>

    );

}

export default LoginPage;