import { useEffect, useState } from "react";


import {
    FaUsers,
    FaUserPlus,
    FaCheckCircle,
    FaTrophy,
    FaTimesCircle,
    FaDollarSign
} from "react-icons/fa";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts";

import api from "../services/api";

function DashboardPage() {

    const [stats, setStats] = useState(null);

    const token = localStorage.getItem("token");

    const pieData = [

        {
            name: "New",
            value: stats?.newLeads || 0
        },

        {
            name: "Qualified",
            value: stats?.qualifiedLeads || 0
        },

        {
            name: "Won",
            value: stats?.wonLeads || 0
        },

        {
            name: "Lost",
            value: stats?.lostLeads || 0
        }

    ];

    const COLORS = [
        "#06b6d4",
        "#8b5cf6",
        "#10b981",
        "#ef4444"
    ];

    const barData = [

        {
            name: "Leads",
            total: stats?.totalLeads || 0
        },

        {
            name: "Qualified",
            total: stats?.qualifiedLeads || 0
        },

        {
            name: "Won",
            total: stats?.wonLeads || 0
        }

    ];

    useEffect(() => {

        fetchStats();

    }, []);

    const fetchStats = async () => {

        try {

            const response = await api.get(
                "/dashboard/stats",
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };

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

    if (!stats) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl">
                Loading Dashboard...
            </div>

        );

    }

    return (

        <div className="bg-gradient-to-br from-black via-slate-950 to-indigo-950 text-white relative overflow-hidden p-8">

            {/* Background Glow Effects */}
            <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>

            {/* Header */}
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">

                <div>

                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        CRM Dashboard
                    </h1>

                    <p className="text-gray-400 mt-2 text-lg">
                        Smart Customer Relationship Management
                    </p>

                </div>

                

            </div>

            {/* Stats Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {/* Total Leads */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-300">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-300 text-lg">
                                Total Leads
                            </p>

                            <h2 className="text-5xl font-bold mt-4 text-cyan-400">
                                {stats.totalLeads}
                            </h2>

                        </div>

                        <FaUsers className="text-6xl text-cyan-400 opacity-80" />

                    </div>

                </div>

                {/* New Leads */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-300">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-300 text-lg">
                                New Leads
                            </p>

                            <h2 className="text-5xl font-bold mt-4 text-green-400">
                                {stats.newLeads}
                            </h2>

                        </div>

                        <FaUserPlus className="text-6xl text-green-400 opacity-80" />

                    </div>

                </div>

                {/* Qualified Leads */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-300">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-300 text-lg">
                                Qualified Leads
                            </p>

                            <h2 className="text-5xl font-bold mt-4 text-purple-400">
                                {stats.qualifiedLeads}
                            </h2>

                        </div>

                        <FaCheckCircle className="text-6xl text-purple-400 opacity-80" />

                    </div>

                </div>

                {/* Won Leads */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-300">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-300 text-lg">
                                Won Leads
                            </p>

                            <h2 className="text-5xl font-bold mt-4 text-emerald-400">
                                {stats.wonLeads}
                            </h2>

                        </div>

                        <FaTrophy className="text-6xl text-emerald-400 opacity-80" />

                    </div>

                </div>

                {/* Lost Leads */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-300">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-300 text-lg">
                                Lost Leads
                            </p>

                            <h2 className="text-5xl font-bold mt-4 text-red-400">
                                {stats.lostLeads}
                            </h2>

                        </div>

                        <FaTimesCircle className="text-6xl text-red-400 opacity-80" />

                    </div>

                </div>

                {/* Deal Value */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-300">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-gray-300 text-lg">
                                Total Deal Value
                            </p>

                            <h2 className="text-5xl font-bold mt-4 text-yellow-400">
                                ${stats.totalDealValue}
                            </h2>

                        </div>

                        <FaDollarSign className="text-6xl text-yellow-400 opacity-80" />

                    </div>

                </div>

            </div>

                {/* Charts Section */}
                <div className="relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12">

                    {/* Pie Chart */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-3xl font-bold text-cyan-300 mb-8">
                            Lead Status Distribution
                        </h2>

                        <div className="h-[400px]">

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart>

                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={130}
                                        label
                                    >

                                        {
                                            pieData.map((entry, index) => (

                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />

                                            ))
                                        }

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* Bar Chart */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl">

                        <h2 className="text-3xl font-bold text-purple-300 mb-8">
                            CRM Performance
                        </h2>

                        <div className="h-[400px]">

                            <ResponsiveContainer width="100%" height="100%">

                                <BarChart data={barData}>

                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                                    <XAxis dataKey="name" stroke="#ffffff" />

                                    <YAxis stroke="#ffffff" />

                                    <Tooltip />

                                    <Legend />

                                    <Bar
                                        dataKey="total"
                                        fill="#06b6d4"
                                        radius={[10, 10, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>
        </div>

    );

}

export default DashboardPage;