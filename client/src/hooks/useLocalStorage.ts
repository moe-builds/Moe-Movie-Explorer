import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [val, setVal] = useState<T>(() => {
    const jsonVal = localStorage.getItem(key);
    if (jsonVal) {
      try {
        return JSON.parse(jsonVal);
      } catch {
        // Fallback in case the stored JSON is malformed
        return typeof defaultValue === "function"
          ? (defaultValue as () => T)()
          : defaultValue;
      }
    } else {
      if (typeof defaultValue === "function") {
        // 4. Safely call and cast the initializer function
        return (defaultValue as () => T)();
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
