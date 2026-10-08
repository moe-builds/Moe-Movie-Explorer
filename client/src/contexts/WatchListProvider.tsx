import { type ReactNode } from "react";
import { WatchListContext } from "./WatchListContext";

import type { mediaItem } from "./DataContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function WatchListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<mediaItem[]>("watch_list", []);

  const removeFromWatchList = (item: mediaItem) => {
    setItems((prev) => {
      return prev.filter((i) => i.id !== item.id);
    });
  };

  const addToWatchList = (item: mediaItem) => {
    setItems((prev) => {
      return prev.find((i) => i.id === item.id) ? prev : [...prev, item];
    });
  };

  return (
    <WatchListContext.Provider
      value={{ items, addToWatchList, removeFromWatchList }}
    >
      {children}
    </WatchListContext.Provider>
  );
}
