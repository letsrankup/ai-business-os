interface DashboardCardProps {
  title: string;
  value: string;
  icon: string;
  change: string;
  color: string;
}

export default function DashboardCard({ title, value, icon, change, color }: DashboardCardProps) {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-[#12121a] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: color + "18", border: `1px solid ${color}30` }}>
          {icon}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            isPositive ? "bg-[#00f5a0]/10 text-[#00f5a0]" : "bg-red-500/10 text-red-400"
          }`}
        >
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-gray-500">{title}</p>
    </div>
  );
}
