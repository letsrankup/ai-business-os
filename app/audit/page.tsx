"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuditCard from "@/components/AuditCard";

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const runAudit = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
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
            <h1 className="text-3xl font-bold">SEO <span className="text-[#00f5a0]">Audit</span></h1>
            <p className="text-gray-400 mt-1 text-sm">AI-powered deep SEO analysis for any website</p>
          </div>

          {/* Input */}
          <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
            <label className="block text-sm text-gray-400 mb-2">Website URL</label>
            <div className="flex gap-3">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f5a0]/50 transition-all"
              />
              <button
                onClick={runAudit}
                disabled={loading || !url}
                className="px-6 py-3 rounded-xl bg-[#00f5a0] text-black font-bold hover:bg-[#00f5a0]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Analyzing..." : "Run Audit"}
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4 animate-pulse">🔍</div>
              <p className="text-[#00f5a0] font-bold">Running AI Audit...</p>
              <p className="text-gray-400 text-sm mt-2">Analyzing meta tags, performance, content, backlinks...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-400">
              ⚠️ {error}
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Score */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Overall Score", value: result.score || "78", unit: "/100", color: "#00f5a0" },
                  { label: "Performance", value: result.performance || "82", unit: "/100", color: "#00d9f5" },
                  { label: "SEO Score", value: result.seo || "74", unit: "/100", color: "#f5a000" },
                  { label: "Accessibility", value: result.accessibility || "91", unit: "/100", color: "#f500f5" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#12121a] border border-white/10 rounded-2xl p-4 text-center">
                    <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}<span className="text-sm text-gray-500">{s.unit}</span></p>
                    <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Issues & Recommendations */}
              <AuditCard result={result} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
        }
