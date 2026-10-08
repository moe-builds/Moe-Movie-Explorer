import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import { useEffect, useState } from "react";

export function VideoPlayer() {
  const navigate = useNavigate();
  const { media_type, id } = useParams();

  const { fetchMovieTrailer, fetchTvTrailer } = useDataContext();

  const [videoData, setVideoData] = useState<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: "Trailer";
    official: boolean;
    id: string;
    published_at: string;
  } | null>(null);

  useEffect(() => {
    async function loadData() {
      if (media_type === "tv") {
        setVideoData(await fetchTvTrailer(Number(id)));
      } else if (media_type === "movie") {
        setVideoData(await fetchMovieTrailer(Number(id)));
      }
    }
    loadData();
  }, [media_type, id, fetchMovieTrailer, fetchTvTrailer]);

  return (
    <div
      id="trailer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg transition-all duration-300"
    >
      <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Trailer Modal Close Button */}
        <button
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <X />
        </button>
        {/* Trailer Video Iframe Container */}
        <div className="aspect-video w-full bg-slate-950 flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src={`https://youtube.com/embed/${videoData?.key}?autoplay=1&mute=0`}
            title="Official Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
