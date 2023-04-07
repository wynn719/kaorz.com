import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>();

  useEffect(() => {
    let mediaQuery = window!.matchMedia(query);

    setMatches(mediaQuery.matches);

    function update() {
      mediaQuery = window!.matchMedia(query);
      setMatches(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, [query]);

  return {
    matches,
  };
}
