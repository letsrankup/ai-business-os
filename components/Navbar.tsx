"use client";
import { useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-16 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden md:flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-3 py-2 w-64">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00f5a0]/10 border border-[#00f5a0]/20">
          <span className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse"></span>
          <span className="text-xs text-[#00f5a0] font-medium">AI Active</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#f500f5] rounded-full"></span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-10 w-72 bg-[#12121a] border border-white/10 rounded-2xl shadow-2xl z-50 p-4">
              <p className="text-sm font-bold text-white mb-3">Notifications</p>
              {["SEO Audit completed for mystore.com", "New lead discovered: TechCorp", "Content generation done"].map((n, i) => (
                <div key={i} className="py-2 border-b border-white/5 last:border-0">
                  <p className="text-xs text-gray-300">{n}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00f5a0] to-[#00d9f5] flex items-center justify-center font-bold text-black text-sm cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
          }
