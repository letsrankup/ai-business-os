"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const clients = [
  { id: 1, name: "TechCorp Inc.", email: "hello@techcorp.com", status: "Active", value: "$2,400", stage: "Onboarded", avatar: "T" },
  { id: 2, name: "Startup XYZ", email: "ceo@startupxyz.io", status: "Proposal", value: "$800", stage: "Negotiation", avatar: "S" },
  { id: 3, name: "Acme Solutions", email: "info@acme.com", status: "Active", value: "$5,200", stage: "Retainer", avatar: "A" },
  { id: 4, name: "BlueWave Media", email: "contact@bluewave.co", status: "Lead", value: "$1,200", stage: "Discovery", avatar: "B" },
  { id: 5, name: "NovaTech LLC", email: "team@novatech.com", status: "Inactive", value: "$600", stage: "Closed", avatar: "N" },
];

const stageColors: Record<string, string> = {
  Onboarded: "#00f5a0",
  Negotiation: "#f5a000",
  Retainer: "#00d9f5",
  Discovery: "#f500f5",
  Closed: "#555",
};

const statusColors: Record<string, string> = {
  Active: "#00f5a0",
  Proposal: "#f5a000",
  Lead: "#00d9f5",
  Inactive: "#555",
};

export default function CRMPage() {
  const [search, setSearch] = useState("");
  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Client <span className="text-[#f500f5]">CRM</span></h1>
              <p className="text-gray-400 mt-1 text-sm">Manage all your clients in one place</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-[#f500f5]/20 border border-[#f500f5]/30 text-[#f500f5] text-sm font-bold hover:bg-[#f500f5]/30 transition-all">
              + Add Client
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients..."
            className="w-full bg-[#12121a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#f500f5]/40 transition-all"
          />

          {/* Table */}
          <div className="bg-[#12121a] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-xs text-gray-500 uppercase">
                  <th className="text-left p-4">Client</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Stage</th>
                  <th className="text-left p-4">Value</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((client) => (
                  <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f500f5]/30 to-[#00f5a0]/30 flex items-center justify-center font-bold text-sm">
                          {client.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{client.name}</p>
                          <p className="text-xs text-gray-500">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className="text-xs px-2 py-1 rounded-full border"
                        style={{
                          color: statusColors[client.status] || "#aaa",
                          borderColor: (statusColors[client.status] || "#aaa") + "44",
                          background: (statusColors[client.status] || "#aaa") + "11",
                        }}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm" style={{ color: stageColors[client.stage] || "#aaa" }}>
                        {client.stage}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-bold text-[#00f5a0]">{client.value}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-all">View</button>
                        <button className="text-xs px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-all">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
                                       }
