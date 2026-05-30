"use client";
import { useState } from "react";

export default function ProposalForm() {
  const [form, setForm] = useState({
    clientName: "",
    clientBusiness: "",
    projectType: "Web Development",
    projectDescription: "",
    budget: "",
    timeline: "4 weeks",
    yourName: "",
    yourCompany: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const generate = async () => {
    if (!form.clientName || !form.projectDescription) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.proposal);
    } catch {
      setError("Failed to generate proposal.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fields = [
    { key: "yourName", label: "Your Name", placeholder: "John Doe" },
    { key: "yourCompany", label: "Your Company", placeholder: "Acme Agency" },
    { key: "clientName", label: "Client Name *", placeholder: "TechCorp Inc." },
    { key: "clientBusiness", label: "Client Business", placeholder: "SaaS startup" },
    { key: "budget", label: "Budget", placeholder: "$5,000" },
  ];

  const projectTypes = ["Web Development", "Mobile App", "SEO & Marketing", "SaaS Development", "Design", "Consulting"];
  const timelines = ["1 week", "2 weeks", "1 month", "2 months", "3 months", "6 months"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-bold text-white">Proposal Details</h2>

        <div className="grid grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.key} className={f.key === "clientBusiness" || f.key === "budget" ? "" : ""}>
              <label className="block text-xs text-gray-500 mb-1.5">{f.label}</label>
              <input
                type="text"
                value={(form as any)[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a000]/50 transition-all"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Project Type</label>
          <select
            value={form.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#f5a000]/50 transition-all"
          >
            {projectTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Timeline</label>
          <select
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#f5a000]/50 transition-all"
          >
            {timelines.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1.5">Project Description *</label>
          <textarea
            value={form.projectDescription}
            onChange={(e) => update("projectDescription", e.target.value)}
            placeholder="Describe what needs to be built or done..."
            rows={4}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a000]/50 transition-all resize-none"
          />
        </div>

        <button
          onClick={generate}
          disabled={loading || !form.clientName || !form.projectDescription}
          className="w-full py-3 rounded-xl bg-[#f5a000] text-black font-bold hover:bg-[#f5a000]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "📝 Generating..." : "📝 Generate Proposal"}
        </button>
      </div>

      {/* Output */}
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 flex flex-col min-h-[500px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white">Generated Proposal</h2>
          {result && (
            <button onClick={copy} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-all">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">⚠️ {error}</p>}

        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-3 animate-pulse">📄</div>
              <p className="text-[#f5a000] text-sm">Crafting your proposal...</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="flex-1 overflow-y-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">{result}</pre>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-600 text-sm text-center">Fill in the details and click<br/>"Generate Proposal"</p>
          </div>
        )}
      </div>
    </div>
  );
        }
