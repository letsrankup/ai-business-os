"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function SettingsPage() {
  const [openaiKey, setOpenaiKey] = useState("");
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In production, save to secure backend
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Settings <span className="text-gray-400">& Config</span></h1>
            <p className="text-gray-400 mt-1 text-sm">Manage your API keys and integrations</p>
          </div>

          <div className="max-w-2xl space-y-6">
            {/* API Keys */}
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">🔑 API Keys</h2>
              {[
                { label: "OpenAI API Key", value: openaiKey, setter: setOpenaiKey, placeholder: "sk-..." },
                { label: "Supabase URL", value: supabaseUrl, setter: setSupabaseUrl, placeholder: "https://xxx.supabase.co" },
                { label: "Supabase Anon Key", value: supabaseKey, setter: setSupabaseKey, placeholder: "eyJ..." },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs text-gray-500 mb-2">{field.label}</label>
                  <input
                    type="password"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-[#00f5a0]/40 transition-all"
                  />
                </div>
              ))}
              <button
                onClick={handleSave}
                className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
                  saved ? "bg-[#00f5a0] text-black" : "bg-[#00f5a0]/20 border border-[#00f5a0]/30 text-[#00f5a0] hover:bg-[#00f5a0]/30"
                }`}
              >
                {saved ? "✓ Saved!" : "Save Keys"}
              </button>
            </div>

            {/* Plan */}
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">📦 Current Plan</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#00f5a0] font-bold text-xl">Free Plan</p>
                  <p className="text-gray-400 text-sm mt-1">10 audits/month · 20 content pieces · 5 proposals</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-[#00f5a0] text-black font-bold text-sm hover:bg-[#00f5a0]/80 transition-all">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-[#12121a] border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-red-400 mb-4">⚠️ Danger Zone</h2>
              <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/20 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
                  }
