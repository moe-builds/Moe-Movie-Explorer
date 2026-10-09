import { useCallback, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { DataContext, type mediaItem } from "./DataContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface MyComponentProps {
  children: ReactNode;
}

const MOVIE_GENRES = {
  28: {
    name: "Action",
  },
  12: {
    name: "Abenteuer",
  },
  16: {
    name: "Animation",
  },
  35: {
    name: "Komödie",
  },
  80: {
    name: "Krimi",
  },
  99: {
    name: "Dokumentarfilm",
  },
  18: {
    name: "Drama",
  },
  10751: {
    name: "Familie",
  },
  14: {
    name: "Fantasy",
  },
  36: {
    name: "Historie",
  },
  27: {
    name: "Horror",
  },
  10402: {
    name: "Musik",
  },
  9648: {
    name: "Mystery",
  },
  10749: {
    name: "Liebesfilm",
  },
  878: {
    name: "Science Fiction",
  },
  10770: {
    name: "TV-Film",
  },
  53: {
    name: "Thriller",
  },
  10752: {
    name: "Kriegsfilm",
  },
  37: {
    name: "Western",
  },
};
const TV_GENRES = {
  10759: {
    name: "Action & Adventure",
  },
  16: {
    name: "Animation",
  },
  35: {
    name: "Komödie",
  },
  80: {
    name: "Krimi",
  },
  99: {
    name: "Dokumentarfilm",
  },
  18: {
    name: "Drama",
  },
  10751: {
    name: "Familie",
  },
  10762: {
    name: "Kids",
  },
  9648: {
    name: "Mystery",
  },
  10763: {
    name: "News",
  },
  10764: {
    name: "Reality",
  },
  10765: {
    name: "Sci-Fi & Fantasy",
  },
  10766: {
    name: "Soap",
  },
  10767: {
    name: "Talk",
  },
  10768: {
    name: "War & Politics",
  },
  37: {
    name: "Western",
  },
};

export function DataProvider({ children }: MyComponentProps) {
  const [items, setItems] = useState<mediaItem[]>([]);
  const [activeTab, setActiveTab] = useLocalStorage("tabs", "movies");

  const fetchTrending = useCallback(async () => {
    const res = await axios.get("/api/trending");
    const verifiedResults = res.data as mediaItem[];
    setItems(verifiedResults);
  }, []);
  const fetchTopRated = useCallback(async () => {
    const res = await axios.get("/api/top_rated");
    const verifiedResults = res.data as mediaItem[];
    setItems(verifiedResults);
  }, []);
  const fetchMovies = useCallback(async () => {
    const res = await axios.get("/api/movies");
    const verifiedResults = res.data as mediaItem[];
    setItems(verifiedResults);
  }, []);
  const fetchtvshows = useCallback(async () => {
    const res = await axios.get("/api/tvshows");
    const verifiedResults = res.data as mediaItem[];
    setItems(verifiedResults);
  }, []);

  const fetchMovie = useCallback(async (id: number) => {
    const res = await axios.get(`/api/movie/${id}`);
    const verifiedResults = res.data as mediaItem;
    return verifiedResults;
  }, []);
  const fetchTvShow = useCallback(async (id: number) => {
    const res = await axios.get(`/api/tv/${id}`);
    const verifiedResults = res.data as mediaItem;
    return verifiedResults;
  }, []);

  const fetchTvCredits = useCallback(async (id: number) => {
    try {
      const res = await axios.get(`/api/tv/credits/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }, []);
  const fetchMovieCredits = useCallback(async (id: number) => {
    try {
      const res = await axios.get(`/api/movie/credits/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchMovieTrailer = async (id: number) => {
    try {
      const res = await axios.get(`/api/movie/videos/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTvTrailer = async (id: number) => {
    try {
      const res = await axios.get(`/api/tv/videos/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeTab === "movies") {
      fetchMovies();
    } else if (activeTab === "tv") {
      fetchtvshows();
    } else if (activeTab === "trending") {
      fetchTrending();
    } else if (activeTab === "top_rated") {
      fetchTopRated();
    }
  }, [activeTab, fetchMovies, fetchtvshows, fetchTrending, fetchTopRated]);

  return (
    <DataContext.Provider
      value={{
        items,
        setItems,
        fetchTrending,
        fetchTopRated,
        fetchMovies,
        fetchtvshows,
        fetchMovie,
        fetchTvShow,
        fetchTvCredits,
        fetchMovieCredits,
        fetchMovieTrailer,
        fetchTvTrailer,
        MOVIE_GENRES,
        TV_GENRES,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
