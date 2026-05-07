import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
    FaStickyNote,
    FaTrash,
    FaSearch,
    FaPlusCircle,
    FaEye
} from "react-icons/fa";

import api from "../services/api";

function LeadsPage() {

    const [leads, setLeads] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("");

    const [leadSourceFilter, setLeadSourceFilter] = useState("");
    
    const [selectedLeadId, setSelectedLeadId] = useState(null);

    const [notes, setNotes] = useState([]);

    const [noteContent, setNoteContent] = useState("");

    const [editingLeadId, setEditingLeadId] = useState(null);

    const [viewLead, setViewLead] = useState(null);

    const [formData, setFormData] = useState({
        leadName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        leadSource: "",
        assignedSalesperson: "",
        status: "New",
        estimatedDealValue: ""
    });

    const token = localStorage.getItem("token");

    useEffect(() => {

        fetchLeads();

    }, [search, statusFilter, leadSourceFilter]);

    const fetchLeads = async () => {

        try {

            let url = "/leads?";

            if (search) {
                url += `search=${search}&`;
            }

            if (statusFilter) {
                url += `status=${statusFilter}&`;
            }

            if (leadSourceFilter) {
                url += `leadSource=${leadSourceFilter}`;
            }

            const response = await api.get(
                url,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            setLeads(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingLeadId) {

                await api.put(
                    `/leads/${editingLeadId}`,
                    formData,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

            } else {

                await api.post(
                    "/leads",
                    formData,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );

            }

            fetchLeads();

            setEditingLeadId(null);

            setFormData({
                leadName: "",
                companyName: "",
                email: "",
                phoneNumber: "",
                leadSource: "",
                assignedSalesperson: "",
                status: "New",
                estimatedDealValue: ""
            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Lead?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Yes, Delete",

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

        try {

            await api.delete(
                `/leads/${id}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            fetchLeads();

            Swal.fire({

                title: "Deleted!",

                text: "Lead deleted successfully.",

                icon: "success",

                background: "#0f172a",

                color: "#ffffff",

                confirmButtonColor: "#06b6d4",

                borderRadius: "20px",

            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleStatusChange = async (id, newStatus) => {

        try {

            await api.put(
                `/leads/${id}`,
                {
                    status: newStatus
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            fetchLeads();

        } catch (error) {

            console.log(error);

        }

    };

    const fetchNotes = async (leadId) => {

        try {

            const response = await api.get(
                `/notes/${leadId}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            setNotes(response.data);

            setSelectedLeadId(leadId);

        } catch (error) {

            console.log(error);

        }

    };

    const handleAddNote = async () => {

        try {

            await api.post(
                `/notes/${selectedLeadId}`,
                {
                    content: noteContent,
                    createdBy: "Admin"
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            setNoteContent("");

            fetchNotes(selectedLeadId);

        } catch (error) {

            console.log(error);

        }

    };

    const handleEdit = (lead) => {

        setEditingLeadId(lead.id);

        setFormData({

            leadName: lead.leadName,
            companyName: lead.companyName,
            email: lead.email,
            phoneNumber: lead.phoneNumber,
            leadSource: lead.leadSource,
            assignedSalesperson: lead.assignedSalesperson,
            status: lead.status,
            estimatedDealValue: lead.estimatedDealValue

        });

    };

    return (

        <div className="bg-gradient-to-br from-black via-slate-950 to-indigo-950 text-white p-8 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-600 opacity-20 blur-3xl rounded-full"></div>

            <div className="relative z-10">

                {/* Header */}
                <div className="mb-10">

                    <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        Leads Management
                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">
                        Manage and track your customer leads
                    </p>

                </div>

                {/* Search + Filter */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">

                    <div className="relative flex-1">

                        <FaSearch className="absolute left-4 top-4 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/10 backdrop-blur-xl border border-white/10 text-white placeholder-gray-400 pl-12 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                        />

                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white/10 backdrop-blur-xl border border-white/10 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    >

                        <option className="bg-slate-900" value="">
                            All Status
                        </option>

                        <option className="bg-slate-900" value="New">
                            New
                        </option>

                        <option className="bg-slate-900" value="Contacted">
                            Contacted
                        </option>

                        <option className="bg-slate-900" value="Qualified">
                            Qualified
                        </option>

                        <option className="bg-slate-900" value="Proposal Sent">
                            Proposal Sent
                        </option>

                        <option className="bg-slate-900" value="Won">
                            Won
                        </option>

                        <option className="bg-slate-900" value="Lost">
                            Lost
                        </option>

                    </select>

                    <select
                        value={leadSourceFilter}
                        onChange={(e) => setLeadSourceFilter(e.target.value)}
                        className="bg-white/10 backdrop-blur-xl border border-white/10 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    >

                        <option className="bg-slate-900" value="">
                            All Sources
                        </option>

                        <option className="bg-slate-900" value="LinkedIn">
                            LinkedIn
                        </option>

                        <option className="bg-slate-900" value="Website">
                            Website
                        </option>

                        <option className="bg-slate-900" value="Referral">
                            Referral
                        </option>

                        <option className="bg-slate-900" value="Cold Email">
                            Cold Email
                        </option>

                        <option className="bg-slate-900" value="Event">
                            Event
                        </option>

                    </select>

                </div>

                {/* Create Lead Form */}
                <form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl mb-10 grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                    <input
                        type="text"
                        name="leadName"
                        placeholder="Lead Name"
                        value={formData.leadName}
                        onChange={handleChange}
                        className="bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <select
                        name="leadSource"
                        value={formData.leadSource}
                        onChange={handleChange}
                        className="bg-black/20 border border-gray-600 text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    >

                        <option className="bg-slate-900" value="">
                            Select Lead Source
                        </option>

                        <option className="bg-slate-900" value="LinkedIn">
                            LinkedIn
                        </option>

                        <option className="bg-slate-900" value="Website">
                            Website
                        </option>

                        <option className="bg-slate-900" value="Referral">
                            Referral
                        </option>

                        <option className="bg-slate-900" value="Cold Email">
                            Cold Email
                        </option>

                        <option className="bg-slate-900" value="Event">
                            Event
                        </option>

                    </select>

                    <input
                        type="text"
                        name="assignedSalesperson"
                        placeholder="Assigned Salesperson"
                        value={formData.assignedSalesperson}
                        onChange={handleChange}
                        className="bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <input
                        type="number"
                        name="estimatedDealValue"
                        placeholder="Estimated Deal Value"
                        value={formData.estimatedDealValue}
                        onChange={handleChange}
                        className="bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                    />

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 text-white font-bold p-4 rounded-2xl shadow-lg shadow-cyan-500/20"
                    >
                       <FaPlusCircle />

                        {
                            editingLeadId
                                ? "Update Lead"
                                : "Create Lead"
                        }
                    </button>

                </form>

                {/* Leads Table */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                    <table className="w-full">

                        <thead className="bg-white/10 text-cyan-300">

                            <tr>

                                <th className="p-5 text-left">
                                    Lead Name
                                </th>

                                <th className="p-5 text-left">
                                    Company
                                </th>

                                <th className="p-5 text-left">
                                    Email
                                </th>

                                <th className="p-5 text-left">
                                    Status
                                </th>

                                <th className="p-5 text-left">
                                    Value
                                </th>

                                <th className="p-5 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                leads.map((lead) => (

                                    <tr
                                        key={lead.id}
                                        className="border-t border-white/10 hover:bg-white/5 transition"
                                    >

                                        <td className="p-5">
                                            {lead.leadName}
                                        </td>

                                        <td className="p-5">
                                            {lead.companyName}
                                        </td>

                                        <td className="p-5">
                                            {lead.email}
                                        </td>

                                        <td className="p-5">

                                            <select
                                                value={lead.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        lead.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="bg-black/20 border border-gray-600 text-white p-3 rounded-xl outline-none"
                                            >

                                                <option className="bg-slate-900" value="New">New</option>
                                                <option className="bg-slate-900" value="Contacted">Contacted</option>
                                                <option className="bg-slate-900" value="Qualified">Qualified</option>
                                                <option className="bg-slate-900" value="Proposal Sent">Proposal Sent</option>
                                                <option className="bg-slate-900" value="Won">Won</option>
                                                <option className="bg-slate-900" value="Lost">Lost</option>

                                            </select>

                                        </td>

                                        <td className="p-5 text-yellow-400 font-bold">
                                            ${lead.estimatedDealValue}
                                        </td>

                                        <td className="p-5 flex gap-3">

                                            <button
                                                onClick={() => setViewLead(lead)}
                                                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 transition text-white px-4 py-2 rounded-xl"
                                            >
                                                <FaEye />
                                                View
                                            </button>

                                            <button
                                                onClick={() => fetchNotes(lead.id)}
                                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition text-white px-4 py-2 rounded-xl"
                                            >
                                                <FaStickyNote />
                                                Notes
                                            </button>

                                            <button
                                                onClick={() => handleEdit(lead)}
                                                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition text-white px-4 py-2 rounded-xl"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(lead.id)}
                                                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition text-white px-4 py-2 rounded-xl"
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

                {
                    viewLead && (

                        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                            <div className="w-full max-w-2xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-white/10 rounded-3xl p-8 shadow-2xl relative">

                                <button
                                    onClick={() => setViewLead(null)}
                                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl"
                                >
                                    X
                                </button>

                                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-8">
                                    Lead Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <p className="text-gray-400">
                                            Lead Name
                                        </p>

                                        <h3 className="text-xl font-bold text-white mt-2">
                                            {viewLead.leadName}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Company
                                        </p>

                                        <h3 className="text-xl font-bold text-white mt-2">
                                            {viewLead.companyName}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Email
                                        </p>

                                        <h3 className="text-xl font-bold text-white mt-2">
                                            {viewLead.email}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Phone Number
                                        </p>

                                        <h3 className="text-xl font-bold text-white mt-2">
                                            {viewLead.phoneNumber}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Lead Source
                                        </p>

                                        <h3 className="text-xl font-bold text-cyan-300 mt-2">
                                            {viewLead.leadSource}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Assigned Salesperson
                                        </p>

                                        <h3 className="text-xl font-bold text-purple-300 mt-2">
                                            {viewLead.assignedSalesperson}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Status
                                        </p>

                                        <h3 className="text-xl font-bold text-green-400 mt-2">
                                            {viewLead.status}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-gray-400">
                                            Estimated Deal Value
                                        </p>

                                        <h3 className="text-xl font-bold text-yellow-400 mt-2">
                                            ${viewLead.estimatedDealValue}
                                        </h3>
                                    </div>

                                    <div className="md:col-span-2">
                                        <p className="text-gray-400">
                                            Created Date
                                        </p>

                                        <h3 className="text-lg font-semibold text-white mt-2">
                                            {
                                                new Date(
                                                    viewLead.createdAt
                                                ).toLocaleString()
                                            }
                                        </h3>
                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                }

                {/* Notes Section */}
                {
                    selectedLeadId && (

                        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl mt-10">

                            <h2 className="text-3xl font-bold text-cyan-300 mb-6">
                                Lead Notes
                            </h2>

                            <div className="flex gap-4 mb-6">

                                <input
                                    type="text"
                                    placeholder="Add note..."
                                    value={noteContent}
                                    onChange={(e) =>
                                        setNoteContent(e.target.value)
                                    }
                                    className="flex-1 bg-black/20 border border-gray-600 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500"
                                />

                                <button
                                    onClick={handleAddNote}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition text-white px-6 rounded-2xl"
                                >
                                    Add
                                </button>

                            </div>

                            <div className="space-y-4">

                                {
                                    notes.map((note) => (

                                        <div
                                            key={note.id}
                                            className="bg-black/20 border border-white/10 p-5 rounded-2xl"
                                        >

                                            <p className="font-bold text-cyan-300">
                                                {note.createdBy}
                                            </p>

                                            <p className="mt-3 text-gray-200">
                                                {note.content}
                                            </p>

                                            <p className="text-sm text-gray-400 mt-3">
                                                {
                                                    new Date(
                                                        note.createdAt
                                                    ).toLocaleString()
                                                }
                                            </p>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default LeadsPage;