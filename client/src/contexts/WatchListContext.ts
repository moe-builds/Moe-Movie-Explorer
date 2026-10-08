import { createContext, useContext } from "react";
import type { mediaItem } from "./DataContext";

interface WatchListContextType {
  items: mediaItem[];
  addToWatchList: (item: mediaItem) => void;
  removeFromWatchList: (item: mediaItem) => void;
}

export const WatchListContext = createContext<WatchListContextType | null>(
  null,
);

export function useWatchList() {
  const context = useContext(WatchListContext);
  if (!context) {
    throw new Error("useWatchList must be used within a WatchListProvider");
  }
  return context;
}
