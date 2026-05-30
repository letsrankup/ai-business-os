interface AuditResult {
  issues?: string[];
  recommendations?: string[];
  keywords?: string[];
  summary?: string;
}

export default function AuditCard({ result }: { result: AuditResult }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Issues */}
      <div className="bg-[#12121a] border border-red-500/20 rounded-2xl p-6">
        <h3 className="text-base font-bold text-red-400 mb-4">⚠️ Issues Found</h3>
        {result.issues && result.issues.length > 0 ? (
          <ul className="space-y-2">
            {result.issues.map((issue, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                {issue}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No critical issues found.</p>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-[#12121a] border border-[#00f5a0]/20 rounded-2xl p-6">
        <h3 className="text-base font-bold text-[#00f5a0] mb-4">✅ Recommendations</h3>
        {result.recommendations && result.recommendations.length > 0 ? (
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-[#00f5a0] mt-0.5 flex-shrink-0">✓</span>
                {rec}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No recommendations available.</p>
        )}
      </div>

      {/* Keywords */}
      {result.keywords && result.keywords.length > 0 && (
        <div className="bg-[#12121a] border border-[#00d9f5]/20 rounded-2xl p-6">
          <h3 className="text-base font-bold text-[#00d9f5] mb-4">🔑 Target Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map((kw, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-[#00d9f5]/10 border border-[#00d9f5]/20 text-[#00d9f5]">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {result.summary && (
        <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">📋 AI Summary</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{result.summary}</p>
        </div>
      )}
    </div>
  );
            }
