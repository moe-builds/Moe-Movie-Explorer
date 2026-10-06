import { createContext, useContext } from "react";

export interface Movie {
  id: string;
  title: string;
  type: string;
  year: number;
  rating: number;
  popularity: number;
  genres: string[];
  duration: string;
  director: string;
  cast: string;
  poster: string;
  backdrop: string;
  overview: string;
  trailer: string;
}

interface DataContextType {
  items: Movie[];
  setItems: React.Dispatch<React.SetStateAction<Movie[]>>;
}
export const DataContext = createContext<DataContextType | null>(null);

export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
}
