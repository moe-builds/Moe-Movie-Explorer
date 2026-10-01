import { Clapperboard } from "lucide-react";

export function NoMediaFallbackUI() {
  return (
    <div
      id="empty-state"
      className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800"
    >
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 text-3xl">
        <Clapperboard className="opacity-50" />
      </div>
      <h3 className="text-xl font-bold text-slate-200 mb-1">
        No movies or TV shows found
      </h3>
      <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
        We couldn't find anything matching your active filters or search terms.
        Try clearing search query or changing filters.
      </p>
      {/* Empty State Clear Filters Button */}
      <button
        id="empty-reset-btn"
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition-all"
      >
        Clear Filters & Search
      </button>
    </div>
  );
}
