"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "⚡" },
  { label: "SEO Audit", href: "/audit", icon: "🔍" },
  { label: "Content AI", href: "/content", icon: "✍️" },
  { label: "Proposals", href: "/proposal", icon: "📄" },
  { label: "Leads", href: "/leads", icon: "🎯" },
  { label: "CRM", href: "/crm", icon: "👥" },
];

const bottomItems = [
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

interface SidebarProps {
  open?: boolean;
}

export default function Sidebar({ open = true }: SidebarProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <aside className="w-64 bg-[#0d0d14] border-r border-white/5 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5a0] to-[#00d9f5] flex items-center justify-center text-black font-black text-sm">
            AI
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Business OS</p>
            <p className="text-[#00f5a0] text-xs">Pro Plan</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-xs text-gray-600 uppercase tracking-widest px-3 mb-2">Main</p>
        {navItems.map((item) => {
          const active = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                active
                  ? "bg-[#00f5a0]/10 text-[#00f5a0] border border-[#00f5a0]/20"
                  : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00f5a0]"></span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        {bottomItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* User info */}
        <div className="mt-3 p-3 rounded-xl bg-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f5a0] to-[#00d9f5] flex items-center justify-center text-black font-bold text-xs">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">User</p>
            <p className="text-xs text-gray-500 truncate">user@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
                         }
