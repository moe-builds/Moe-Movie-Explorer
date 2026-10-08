import { useCallback, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { DataContext, type mediaItem } from "./DataContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface MyComponentProps {
  children: ReactNode;
}
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
        fetchTrending,
        fetchTopRated,
        fetchMovies,
        fetchtvshows,
        fetchMovie,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
