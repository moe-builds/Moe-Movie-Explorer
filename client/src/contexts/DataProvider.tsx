import { useCallback, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { DataContext, type mediaItem } from "./DataContext";

interface MyComponentProps {
  children: ReactNode;
}
export function DataProvider({ children }: MyComponentProps) {
  // TODO: Request data from the backend
  const [items, setItems] = useState<mediaItem[]>([]);

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

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <DataContext.Provider
      value={{ items, fetchTrending, fetchTopRated, fetchMovies, fetchtvshows }}
    >
      {children}
    </DataContext.Provider>
  );
}
