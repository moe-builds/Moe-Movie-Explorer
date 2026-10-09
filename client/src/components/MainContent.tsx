import { MediaItem } from "./MediaItem";
import { Sliders, ChevronDown, RotateCcw } from "lucide-react";
import { NoMediaFallbackUI } from "./NoMediaFallbackUI";
import { useDataContext } from "../contexts/DataContext";
import { type mediaItem } from "../contexts/DataContext";
import { useCallback, useEffect, useRef, useState } from "react";

export function MainContent() {
  const { items } = useDataContext();

  const [isVisible, setIsVisible] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);

  // This is your callback ref! It executes automatically whenever the target element mounts/unmounts

  const lastItemRef = useCallback((node: HTMLDivElement | null) => {
    // 1. Clean up the previous observer instance
    if (observerRef.current) observerRef.current.disconnect();

    // 2. If the new node exists, attach a fresh observer to it
    if (node) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log("Last item visible! Fetching next page...");
            // loadMore();
          }
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 },
      );

      observerRef.current.observe(node);
    }
  }, []);

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Section Header & Filter Bar */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-sm">
        {/* Title & Counter Display */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sliders className="text-lg" />
          </div>
          <div>
            <h1
              id="section-title"
              className="text-xl font-bold text-white tracking-tight"
            >
              All Movies & TV Series
            </h1>
            <p id="section-counter" className="text-xs text-slate-400">
              Showing 0 media items
            </p>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Genre Filter Dropdown */}
          <div className="relative min-w-[140px] flex-1 sm:flex-initial">
            <select
              id="genre-filter"
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Genres</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Crime">Crime</option>
              <option value="Comedy">Comedy</option>
              <option value="Anime">Anime</option>
              <option value="Adventure">Adventure</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs" />
          </div>

          {/* Sorting Dropdown */}
          <div className="relative min-w-[150px] flex-1 sm:flex-initial">
            <select
              id="sort-filter"
              className="w-full appearance-none pl-3.5 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="popularity-desc">Sort: Most Popular</option>
              <option value="rating-desc">Sort: Highest Rated</option>
              <option value="year-desc">Sort: Newest First</option>
              <option value="year-asc">Sort: Oldest First</option>
              <option value="title-asc">Sort: Title (A-Z)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs" />
          </div>

          {/* Reset Filters Button */}
          <button
            id="reset-filters"
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <RotateCcw /> Reset
          </button>
        </div>
      </section>

      {items.length !== 0 ? (
        // Dynamic Media Items Grid
        <section
          id="media-grid"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {items.map((item: mediaItem, index) => {
            return (
              <MediaItem
                ref={index === items.length - 1 ? lastItemRef : undefined}
                key={item.id}
                item={item}
              />
            );
          })}
        </section>
      ) : (
        // Empty State / No Results Component
        <NoMediaFallbackUI />
      )}
    </main>
  );
}
