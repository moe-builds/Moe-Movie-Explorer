import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { type mediaItem } from "../contexts/DataContext";
import { Bookmark } from "lucide-react";

export function MediaItem({ item }: { item: mediaItem }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Link to={`media/${item.media_type}/${item.id}`}>
      <div className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${item.media_type === "movie" ? "bg-indigo-600" : "bg-pink-600"} text-white shadow-md`}
            >
              {item.media_type}
            </span>
            <button
              onClick={() => {
                setIsSaved((prev) => !prev);
              }}
              className={`pointer-events-auto w-8 h-8 rounded-full ${isSaved ? "bg-indigo-600 text-white" : "bg-slate-900/80 text-slate-300 hover:text-white"} flex items-center justify-center backdrop-blur-md border border-slate-700/50 hover:scale-110 transition-all shadow-lg`}
            >
              <Bookmark
                className="w-3.5 h-3.5"
                fill={isSaved ? "currentColor" : "none"}
              />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-bold text-amber-400">
            <i className="fa-solid fa-star text-[10px]"></i>
            <span>rating</span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div className="text-[11px] font-medium text-slate-400 mb-0.5">
              {item.media_type === "movie"
                ? dayjs(item.release_date).format("YYYY")
                : dayjs(item.first_air_date).format("YYYY")}{" "}
              • {item.genre_ids[0] || "Drama"}
            </div>
            <h3 className="font-bold text-white text-base leading-snug group-hover:text-indigo-400 transition-colors line-clamp-1">
              {item.media_type === "movie" ? item.title : item.name}
            </h3>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {item.overview}
          </p>
        </div>
      </div>
    </Link>
  );
}
