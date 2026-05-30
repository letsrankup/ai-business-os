"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ContentForm from "@/components/ContentForm";

const contentTypes = [
  { id: "blog", label: "Blog Article", icon: "📝", desc: "Long-form SEO article" },
  { id: "linkedin", label: "LinkedIn Post", icon: "💼", desc: "Professional viral post" },
  { id: "email", label: "Email Campaign", icon: "📧", desc: "High-converting email" },
  { id: "ad", label: "Ad Copy", icon: "📣", desc: "Facebook/Google ads" },
  { id: "product", label: "Product Description", icon: "🛍️", desc: "Conversion-focused copy" },
  { id: "social", label: "Social Media", icon: "📱", desc: "Instagram/Twitter posts" },
];

export default function ContentPage() {
  const [selected, setSelected] = useState("blog");

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Content <span className="text-[#00d9f5]">Generator</span></h1>
            <p className="text-gray-400 mt-1 text-sm">AI-powered content for every channel</p>
          </div>

          {/* Type Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selected === type.id
                    ? "border-[#00d9f5]/60 bg-[#00d9f5]/10 text-white"
                    : "border-white/10 bg-[#12121a] text-gray-400 hover:border-white/20"
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <p className="text-xs font-bold">{type.label}</p>
                <p className="text-xs opacity-60 mt-0.5">{type.desc}</p>
              </button>
            ))}
          </div>

          {/* Form */}
          <ContentForm contentType={selected} />
        </main>
      </div>
    </div>
  );
          }
