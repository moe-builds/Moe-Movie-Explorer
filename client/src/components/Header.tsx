import {
  Search,
  Moon,
  Grip,
  Film,
  Tv,
  Flame,
  Play,
  X,
  Bookmark,
  Star,
} from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Version Tag */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Play className="font-bold text-white text-lg ml-0.5" />
            </div>
            <div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                CineStream
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 ml-2 hidden sm:inline-block">
                v2.5
              </span>
            </div>
          </div>

          {/* Global Search Input Bar */}
          <div className="flex-1 max-w-md mx-2 sm:mx-6">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />

              <input
                type="text"
                id="search-input"
                placeholder="Search movies, TV series, directors..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-200 placeholder-slate-400 transition-all shadow-inner"
              />
              {/* Clear Search Button */}
              <button
                id="clear-search"
                className="hidden absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-slate-800 rounded-full w-5 h-5 flex items-center justify-center"
              >
                <X />{" "}
              </button>
            </div>
          </div>

          {/* Top Header Controls (Watchlist & Theme Toggle) */}
          <div className="flex items-center gap-3">
            {/* Watchlist Tab Button */}
            <button
              id="watchlist-tab-btn"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-sm font-semibold text-slate-300 transition-all"
            >
              <Bookmark className="text-indigo-400" />
              <span className="hidden md:inline">Watchlist</span>
              {/* Watchlist Count Badge */}
              <span
                id="watchlist-badge"
                className="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white min-w-[20px] text-center"
              >
                0
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              id="theme-toggle"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-yellow-400 transition-all"
              title="Toggle Theme"
            >
              <Moon className="text-lg" />
            </button>
          </div>
        </div>

        {/* Primary Category Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 border-t border-slate-800/50 py-3 overflow-x-auto no-scrollbar">
          {/* All Explorer Tab */}
          <button
            data-tab="all"
            className="nav-tab flex items-center active px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
          >
            <Grip className="mr-1.5" /> All Explorer
          </button>
          {/* Movies Tab */}
          <button
            data-tab="movie"
            className="nav-tab flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all whitespace-nowrap"
          >
            <Film className="mr-1.5" /> Movies
          </button>
          {/* TV Shows Tab */}
          <button
            data-tab="tv"
            className="nav-tab flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all whitespace-nowrap"
          >
            <Tv className="mr-1.5" /> TV Shows
          </button>
          {/* Trending Tab */}
          <button
            data-tab="trending"
            className="nav-tab flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all whitespace-nowrap"
          >
            <Flame className="mr-1.5 text-amber-500" /> Trending
          </button>
          {/* Top Rated Tab */}
          <button
            data-tab="top_rated"
            className="nav-tab flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all whitespace-nowrap"
          >
            <Star className="mr-1.5 text-yellow-400" /> Top Rated
          </button>
        </nav>
      </div>
    </header>
  );
}
