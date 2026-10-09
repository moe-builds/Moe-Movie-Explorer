import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

// 1. Define fields that are identical across both movies and TV shows
interface BaseMediaItem {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

// 2. Define fields specific to Movies
interface MovieItem extends BaseMediaItem {
  media_type: "movie"; // Literal type constraint
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
  runtime?: number;

  // Explicitly ensure TV fields do not accidentally conflict
  name?: never;
  original_name?: never;
  first_air_date?: never;
  origin_country?: never;
}

// 3. Define fields specific to TV Shows
interface TVItem extends BaseMediaItem {
  media_type: "tv"; // Literal type constraint
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];

  // Explicitly ensure movie fields do not accidentally conflict
  title?: never;
  original_title?: never;
  release_date?: never;
  video?: never;
}

// 4. Combine them into the final mediaItem type
export type mediaItem = MovieItem | TVItem;

type genre = { name: string };

interface DataContextType {
  items: mediaItem[];
  setItems: Dispatch<SetStateAction<mediaItem[]>>;
  fetchTrending: () => void;
  fetchTopRated: () => void;
  fetchMovies: () => void;
  fetchtvshows: () => void;
  fetchMovie: (id: number) => Promise<mediaItem>;
  fetchTvShow: (id: number) => Promise<mediaItem>;
  fetchTvCredits: (id: number) => Promise<
    {
      id: number;
      known_for_department: string;
      name: string;
    }[]
  >;
  fetchMovieCredits: (id: number) => Promise<
    {
      id: number;
      known_for_department: string;
      name: string;
    }[]
  >;
  fetchMovieTrailer: (id: number) => Promise<{
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
  }>;
  fetchTvTrailer: (id: number) => Promise<{
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
  }>;
  MOVIE_GENRES: {
    [key: number]: genre;
    28: genre;
    12: genre;
    16: genre;
    35: genre;
    80: genre;
    99: genre;
    18: genre;
    10751: genre;
    14: genre;
    36: genre;
    27: genre;
    10402: genre;
    9648: genre;
    10749: genre;
    878: genre;
    10770: genre;
    53: genre;
    10752: genre;
    37: genre;
  };
  TV_GENRES: {
    [key: number]: genre;
    10759: genre;
    16: genre;
    35: genre;
    80: genre;
    99: genre;
    18: genre;
    10751: genre;
    10762: genre;
    9648: genre;
    10763: genre;
    10764: genre;
    10765: genre;
    10766: genre;
    10767: genre;
    10768: genre;
    37: genre;
  };
}
export const DataContext = createContext<DataContextType | null>(null);

export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
}
