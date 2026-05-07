import { Outlet, useNavigate, useLocation } from "react-router-dom";

import {
    FaChartPie,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";

import Swal from "sweetalert2";

function MainLayout() {

    const navigate = useNavigate();

    const location = useLocation();

    const handleLogout = async () => {

        const result = await Swal.fire({

            title: "Logout?",

            text: "Are you sure you want to logout?",

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Yes, Logout",

            cancelButtonText: "Cancel",

            background: "#0f172a",

            color: "#ffffff",

            confirmButtonColor: "#ef4444",

            cancelButtonColor: "#334155",

            borderRadius: "20px",

        });

        if (!result.isConfirmed) {
            return;
        }

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="flex min-h-screen bg-gradient-to-br from-black via-slate-950 to-indigo-950 text-white overflow-hidden">

            {/* Sidebar */}
            <div className="w-72 fixed left-0 top-0 h-screen bg-white/10 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col justify-between">

                <div>

                    {/* Logo */}
                    <div className="mb-12">

                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            CRM
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Smart Management
                        </p>

                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">

                        <button
                            onClick={() => navigate("/dashboard")}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                                location.pathname === "/dashboard"
                                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
                                    : "bg-white/5 hover:bg-white/10"
                            }`}
                        >

                            <FaChartPie className="text-lg" />

                            Dashboard

                        </button>

                        <button
                            onClick={() => navigate("/leads")}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                                location.pathname === "/leads"
                                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
                                    : "bg-white/5 hover:bg-white/10"
                            }`}
                        >

                            <FaUsers className="text-lg" />

                            Leads

                        </button>

                    </div>

                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 hover:scale-[1.02] transition-all duration-300 p-4 rounded-2xl shadow-lg shadow-red-500/20"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

            {/* Page Content */}
            <div className="flex-1 ml-72 overflow-y-auto p-8">

                <Outlet />

            </div>

        </div>

    );

}

export default MainLayout;