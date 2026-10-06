import { X } from "lucide-react";

interface VideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <div
      id="trailer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg opacity-0 pointer-events-none transition-all duration-300"
    >
      <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Trailer Modal Close Button */}
        <button
          id="close-trailer"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700"
        >
          <X />
        </button>
        {/* Trailer Video Iframe Container */}
        <div className="aspect-video w-full bg-slate-950 flex items-center justify-center">
          <iframe
            id="trailer-iframe"
            className="w-full h-full"
            src={src}
            title="Trailer"
            frameBorder="0"
            allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
        "
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
