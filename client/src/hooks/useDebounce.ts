import { useEffect, useState } from "react";

export function useDebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    if (!value) {
      const setState = () => {
        setDebouncedValue(value);
      };
      setState();
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 600);
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
}
