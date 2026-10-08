import { createContext, useContext } from "react";

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

interface DataContextType {
  items: mediaItem[];
  fetchTrending: () => void;
}
export const DataContext = createContext<DataContextType | null>(null);

export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
}
