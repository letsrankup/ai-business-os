"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import LeadCard from "@/components/LeadCard";

export default function LeadsPage() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("SaaS");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [error, setError] = useState("");

  const discoverLeads = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setLeads([]);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, industry }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setLeads(data.leads || []);
    } catch {
      setError("Failed to discover leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Lead <span className="text-[#00d9f5]">Discovery</span></h1>
            <p className="text-gray-400 mt-1 text-sm">AI finds your ideal prospects automatically</p>
          </div>

          {/* Search Panel */}
          <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-2">Target Description</label>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. B2B SaaS founders in US with 10-50 employees"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00d9f5]/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d9f5]/50 transition-all"
                >
                  {["SaaS", "E-commerce", "Healthcare", "Finance", "Education", "Real Estate", "Marketing"].map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={discoverLeads}
              disabled={loading || !query}
              className="w-full py-3 rounded-xl bg-[#00d9f5] text-black font-bold hover:bg-[#00d9f5]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "🔍 Discovering Leads..." : "🎯 Discover Leads with AI"}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-400">⚠️ {error}</div>
          )}

          {/* Results */}
          {leads.length > 0 && (
            <div>
              <p className="text-sm text-gray-400 mb-4">Found <span className="text-[#00d9f5] font-bold">{leads.length}</span> potential leads</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leads.map((lead, i) => (
                  <LeadCard key={i} lead={lead} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
  }
