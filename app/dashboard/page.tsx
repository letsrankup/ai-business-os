"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";

const stats = [
  { title: "SEO Audits Run", value: "24", icon: "🔍", change: "+12%", color: "#00f5a0" },
  { title: "Content Generated", value: "138", icon: "✍️", change: "+34%", color: "#00d9f5" },
  { title: "Leads Discovered", value: "87", icon: "🎯", change: "+8%", color: "#f500f5" },
  { title: "Proposals Sent", value: "19", icon: "📄", change: "+5%", color: "#f5a000" },
  { title: "Active Clients", value: "12", icon: "👥", change: "+2%", color: "#00f5a0" },
  { title: "Revenue (Est.)", value: "$4,200", icon: "💰", change: "+21%", color: "#f5f500" },
];

const recentActivity = [
  { action: "SEO Audit completed", target: "mystore.com", time: "2 min ago", type: "audit" },
  { action: "Blog article generated", target: "Top 10 AI Tools 2025", time: "15 min ago", type: "content" },
  { action: "New lead added", target: "TechCorp Inc.", time: "1 hr ago", type: "lead" },
  { action: "Proposal sent", target: "Startup XYZ", time: "3 hr ago", type: "proposal" },
  { action: "CRM updated", target: "Client: Acme Co.", time: "5 hr ago", type: "crm" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                AI Business <span className="text-[#00f5a0]">OS</span>
              </h1>
              <p className="text-gray-400 mt-1 text-sm">Your complete business intelligence dashboard</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-[#00f5a0]/10 border border-[#00f5a0]/30 text-[#00f5a0] text-sm hover:bg-[#00f5a0]/20 transition-all">
                + New Project
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#00f5a0] text-black text-sm font-bold hover:bg-[#00f5a0]/80 transition-all">
                Launch Agent
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <DashboardCard key={i} {...stat} />
            ))}
          </div>

          {/* Activity + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-[#12121a] border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 text-white">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-[#00f5a0] border border-[#00f5a0]/20">
                        {item.type}
                      </span>
                      <div>
                        <p className="text-sm text-white">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.target}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 text-white">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { label: "Run SEO Audit", href: "/audit", icon: "🔍" },
                  { label: "Generate Content", href: "/content", icon: "✍️" },
                  { label: "Find Leads", href: "/leads", icon: "🎯" },
                  { label: "Create Proposal", href: "/proposal", icon: "📄" },
                  { label: "Manage CRM", href: "/crm", icon: "👥" },
                ].map((action, i) => (
                  <a
                    key={i}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#00f5a0]/10 hover:border-[#00f5a0]/30 border border-transparent transition-all group"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-sm text-gray-300 group-hover:text-[#00f5a0] transition-colors">
                      {action.label}
                    </span>
                    <span className="ml-auto text-gray-600 group-hover:text-[#00f5a0]">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
  }
