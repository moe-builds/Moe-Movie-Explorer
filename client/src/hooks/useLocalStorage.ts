import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage(
  key: string,
  defaultValue: string | (() => void),
): [string, Dispatch<SetStateAction<string>>] {
  const [val, setVal] = useState(() => {
    const jsonVal = localStorage.getItem(key);
    if (jsonVal) {
      return JSON.parse(jsonVal);
    } else {
      if (typeof defaultValue === "function") {
        return defaultValue();
      } else {
        return defaultValue;
      }
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);

  return [val, setVal];
}
