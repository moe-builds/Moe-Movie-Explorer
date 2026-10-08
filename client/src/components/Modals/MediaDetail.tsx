import { useNavigate, useParams } from "react-router-dom";
import { Play, X, Bookmark, Star } from "lucide-react";
import { useDataContext, type mediaItem } from "../../contexts/DataContext";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function MediaDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { fetchMovie } = useDataContext();

  const [media, setMedia] = useState<mediaItem | null>(null);

  useEffect(() => {
    async function loadData() {
      setMedia(await fetchMovie(Number(id)));
    }
    loadData();
  }, [id, fetchMovie]);

  if (media == null) return;

  return (
    <div
      id="detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300 overflow-y-auto"
    >
      {/* Modal Content Container */}
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 transform scale-95 transition-transform duration-300"
        id="modal-container"
      >
        {/* Modal Close Button */}
        <button
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 backdrop-blur-md transition-all cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <X className="text-lg" />
        </button>

        {/* Modal Header Media & Backdrop Header */}
        <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden bg-slate-950">
          {/* Backdrop Image */}
          <img
            id="modal-backdrop"
            src=""
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

          {/* Watch Trailer Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              id="play-trailer-btn"
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-600/90 hover:bg-indigo-600 text-white font-bold text-sm shadow-2xl shadow-indigo-600/50 backdrop-blur-md transform transition-all hover:scale-105 border border-indigo-400/30"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="text-white ml-0.5" />
              </div>
              <span>Watch Trailer</span>
            </button>
          </div>

          {/* Modal Overlay Info (Title, Badges, Watchlist CTA) */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              {/* Metadata Badges Bar */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {/* Media Type Badge */}
                <span
                  id="modal-type"
                  className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-600 text-white uppercase tracking-wider"
                >
                  {media.media_type}
                </span>
                {/* Rating Badge */}
                <span
                  id="modal-rating-badge"
                  className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1"
                >
                  <Star className="text-amber-400" />
                  <span id="modal-rating">8.8</span>
                </span>
                {/* Release Year Badge */}
                <span
                  id="modal-year"
                  className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700"
                >
                  {media.media_type === "movie"
                    ? dayjs(media.release_date).format("YYYY")
                    : dayjs(media.first_air_date).format("YYYY")}
                </span>
                {/* Duration Badge */}

                {media.media_type === "movie" && (
                  <span
                    id="modal-duration"
                    className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700"
                  >
                    {Math.floor(media.runtime! / 60)} h {media.runtime! % 60}{" "}
                    min
                  </span>
                )}
              </div>
              {/* Modal Title */}
              <h2
                id="modal-title"
                className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
              >
                {media.media_type === "movie" ? media.title : media.name}
              </h2>
            </div>

            {/* Modal Add to Watchlist Button */}
            <button
              id="modal-watchlist-btn"
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-sm font-semibold text-white flex items-center gap-2 transition-all shadow-lg shrink-0"
            >
              <Bookmark />
              <span id="modal-watchlist-text">Add to Watchlist</span>
            </button>
          </div>
        </div>

        {/* Modal Body Info Section */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Dynamic Genres List Container */}
          <div className="flex flex-wrap gap-2" id="modal-genres"></div>

          {/* Media Overview Section */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Overview
            </h3>
            <p
              id="modal-overview"
              className="text-slate-300 text-sm sm:text-base leading-relaxed"
            >
              A team of explorers travel through a wormhole in space in an
              attempt to ensure humanity's survival.
            </p>
          </div>

          {/* Director & Cast Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            {/* Director / Creator Field */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-2">
                Director / Creator
              </h4>
              <p id="modal-director" className="text-sm font-medium text-white">
                Christopher Nolan
              </p>
            </div>
            {/* Cast Field */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 mb-2">
                Top Cast
              </h4>
              <p id="modal-cast" className="text-sm font-medium text-white">
                Matthew McConaughey, Anne Hathaway, Jessica Chastain
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
