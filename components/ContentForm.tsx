"use client";
import { useState } from "react";

interface ContentFormProps {
  contentType: string;
}

const tones = ["Professional", "Casual", "Humorous", "Inspiring", "Educational", "Persuasive"];

export default function ContentForm({ contentType }: ContentFormProps) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keywords, setKeywords] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!topic) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType,
          topic,
          tone,
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          targetAudience: audience,
        }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data.content);
    } catch {
      setError("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form */}
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-bold text-white">Generation Settings</h2>

        <div>
          <label className="block text-xs text-gray-500 mb-2">Topic / Title *</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={`e.g. "Top 10 AI tools for ${contentType === "linkedin" ? "professionals" : "businesses"} in 2025"`}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00d9f5]/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  tone === t
                    ? "bg-[#00d9f5]/20 border border-[#00d9f5]/40 text-[#00d9f5]"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">Target Keywords (comma-separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="AI tools, productivity, automation"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00d9f5]/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-2">Target Audience</label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. Startup founders, Marketing managers"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00d9f5]/50 transition-all"
          />
        </div>

        <button
          onClick={generate}
          disabled={loading || !topic}
          className="w-full py-3 rounded-xl bg-[#00d9f5] text-black font-bold hover:bg-[#00d9f5]/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "✨ Generating..." : "✨ Generate Content"}
        </button>
      </div>

      {/* Output */}
      <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white">Generated Content</h2>
          {result && (
            <button
              onClick={copy}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-all"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          )}
        </div>

        {error && <p className="text-red-400 text-sm mb-4">⚠️ {error}</p>}

        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-3 animate-bounce">✨</div>
              <p className="text-[#00d9f5] text-sm">AI is writing...</p>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="flex-1 overflow-y-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">
              {result}
            </pre>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-600 text-sm">Your content will appear here...</p>
          </div>
        )}
      </div>
    </div>
  );
        }
