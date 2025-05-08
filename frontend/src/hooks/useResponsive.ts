import { useState, useEffect } from 'react';

export function useResponsive(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    //get the media object to check the current screen size
    const media = window.matchMedia(query);
    // sync media match values
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query, matches]);

  return matches;
}
