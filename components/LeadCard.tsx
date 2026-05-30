interface Lead {
  name: string;
  company: string;
  role: string;
  email?: string;
  website?: string;
  score?: number;
  industry?: string;
  description?: string;
}

export default function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="bg-[#12121a] border border-white/10 rounded-2xl p-5 hover:border-[#00d9f5]/30 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d9f5]/20 to-[#f500f5]/20 flex items-center justify-center font-bold text-white text-sm border border-white/10">
            {lead.name?.[0] || "?"}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{lead.name}</p>
            <p className="text-xs text-gray-500">{lead.role}</p>
          </div>
        </div>
        {lead.score !== undefined && (
          <div className="text-right">
            <p className="text-xs text-gray-500">Score</p>
            <p
              className="text-sm font-bold"
              style={{ color: lead.score >= 80 ? "#00f5a0" : lead.score >= 60 ? "#f5a000" : "#f55" }}
            >
              {lead.score}/100
            </p>
          </div>
        )}
      </div>

      {/* Company */}
      <p className="text-sm text-[#00d9f5] font-medium mb-2">{lead.company}</p>

      {/* Industry */}
      {lead.industry && (
        <span className="text-xs px-2 py-1 rounded-full bg-[#00d9f5]/10 border border-[#00d9f5]/20 text-[#00d9f5]">
          {lead.industry}
        </span>
      )}

      {/* Description */}
      {lead.description && (
        <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2">{lead.description}</p>
      )}

      {/* Contact Info */}
      <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
        {lead.email && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">📧</span>
            <span className="text-xs text-gray-400">{lead.email}</span>
          </div>
        )}
        {lead.website && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">🌐</span>
            <a href={lead.website} target="_blank" rel="noreferrer" className="text-xs text-[#00d9f5] hover:underline">
              {lead.website}
            </a>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 text-xs py-2 rounded-lg bg-[#00d9f5]/10 border border-[#00d9f5]/20 text-[#00d9f5] hover:bg-[#00d9f5]/20 transition-all">
          Add to CRM
        </button>
        <button className="flex-1 text-xs py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          Propose
        </button>
      </div>
    </div>
  );
              }
